import React from "react";
import { Button, Drawer, List, Space, Table } from "@pankod/refine-antd";

import type { ColumnsType } from "antd/es/table";
import { Action, Resource } from "services/enums";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import { openDrawer, closeDrawer } from "redux/slices/drawerSlice";
import { BaseRecord, useTranslate } from "@pankod/refine-core";
import {
  useDefaultColumns,
  usePageSize,
  useTableActionProps,
  useTableProps,
  defaultColumnProps,
} from "./hooks";
import { CreateForm, EditForm, ShowForm } from "./forms";

type ABResourceProps = {
  resource: Resource;
  columns: ColumnsType<BaseRecord>;
  hasDefaultColumns?: boolean;
  renderFields: (record: BaseRecord) => JSX.Element;
  renderShow: (record: BaseRecord) => JSX.Element;
};

const ABResource: React.FC<ABResourceProps> = (props) => {
  const { action, itemId, title } = useAppSelector((state) => state.drawer);
  const { resource, columns, hasDefaultColumns = true, renderFields, renderShow } = props;

  const tableProps = useTableProps(resource);
  const tableActionProps = useTableActionProps({ resource });
  const pageSize = usePageSize();
  const defaultColumns = useDefaultColumns({ resource });
  const t = useTranslate();

  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(closeDrawer());
  };

  const _columns: ColumnsType<BaseRecord> = [
    ...(hasDefaultColumns ? defaultColumns : []),
    ...columns,
    tableActionProps,
  ];

  return (
    <>
      <List
        canCreate
        createButtonProps={{
          onClick: () => {
            dispatch(openDrawer({ resource, action: Action.CREATE }));
          },
        }}
      >
        <Table
          rowKey='id'
          {...tableProps}
          {...(pageSize && { pagination: { ...tableProps.pagination, pageSize } })}
          columns={_columns.map((item) => ({ ...item, ...defaultColumnProps }))}
        ></Table>
      </List>
      <Drawer
        title={action === Action.CREATE ? t(`${resource}.titles.create`) : title}
        width='40%'
        onClose={onClose}
        visible={action === Action.CREATE || action === Action.EDIT || action === Action.VIEW}
        bodyStyle={{ paddingBottom: 80 }}
        // extra={drawerInfo?.extra}
        extra={
          <Space>
            {/* <Button onClick={onClose}>Cancel</Button> */}
            {action === Action.CREATE && (
              <Button onClick={onClose} type='primary'>
                Save
              </Button>
            )}
          </Space>
        }
      >
        {action === Action.CREATE && (
          <CreateForm resource={resource} renderFields={renderFields} hasDefaultColumns />
        )}

        {action === Action.EDIT && (
          <EditForm
            itemId={itemId as number}
            resource={resource}
            renderFields={renderFields}
            hasDefaultColumns
          />
        )}

        {action === Action.VIEW && (
          <ShowForm itemId={itemId as number} resource={resource} renderShow={renderShow} />
        )}
      </Drawer>
    </>
  );
};

export default ABResource;
