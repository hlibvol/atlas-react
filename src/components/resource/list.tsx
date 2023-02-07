import React from "react";
import { List as AntDList, Table } from "@pankod/refine-antd";

import type { ColumnsType } from "antd/es/table";
import { Action, Resource } from "services/enums";

import { useAppDispatch } from "redux/hooks";
import { openDrawer } from "redux/slices/drawerSlice";
import { BaseRecord } from "@pankod/refine-core";
import { defaultColumnProps, useListProps } from "../../hooks/list";

type ABListProps = {
  resource: Resource;
  columns: ColumnsType<BaseRecord>;
  hasDefaultColumns?: boolean;
  hasRoles?: boolean;
};

const List: React.FC<ABListProps> = (props) => {
  const { resource, columns, hasDefaultColumns = true, hasRoles = false } = props;
  const { tableProps, pageSize, tableActionProps, defaultColumns } = useListProps({
    resource,
    hasRoles,
  });
  const dispatch = useAppDispatch();

  const _columns: ColumnsType<BaseRecord> = [
    ...(hasDefaultColumns ? defaultColumns : []),
    ...columns,
    tableActionProps,
  ];

  return (
    <AntDList
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
    </AntDList>
  );
};

export default List;
