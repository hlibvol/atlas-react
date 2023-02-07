import {
  Button,
  DeleteButton,
  EditButton,
  Form,
  Input,
  Space,
  TableProps,
  Typography,
  useTable,
} from "@pankod/refine-antd";
import {
  BaseKey,
  BaseRecord,
  CrudSorting,
  OpenNotificationParams,
  useTranslate,
} from "@pankod/refine-core";
import RichTextEditor from "components/RichTextEditor";
import { FixedType } from "rc-table/lib/interface";
import { useEffect, useState } from "react";
import { extractContent } from "services/utils";

import { openDrawer } from "redux/slices/drawerSlice";
import { Resource, Action } from "services/enums";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { UserOutlined } from "@ant-design/icons";

export const defaultColumnProps = {
  ellipsis: true,
};

type TablePropsType = TableProps<BaseRecord> & {
  sorter: CrudSorting | undefined;
};

export const useTableProps = (props: unknown = {}) => {
  const { tableProps, sorter } = useTable({
    // @ts-ignore
    ...props,
    initialPageSize: 25,
    hasPagination: false,
    syncWithLocation: false,
    initialSorter: [
      {
        field: "name",
        order: "asc",
      },
    ],
  });
  return {
    ...tableProps,
    rowKey: "id",
    pagination: {
      ...tableProps.pagination,
      showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} items`,
    },
    size: "small",
    className: "ab-custom-table",
    sorter,
  } as TablePropsType;
};

type defaultColumnProps = {
  resource: Resource;
};

export const useDefaultColumns = (props: defaultColumnProps) => {
  const { resource } = props;
  const t = useTranslate();
  const dispatch = useAppDispatch();
  return [
    {
      title: t(`${resource}.fields.title`),
      dataIndex: "name",
      render: (name: string, record: BaseRecord) => (
        <Button
          type='link'
          onClick={() => {
            dispatch(
              openDrawer({
                resource: resource,
                action: Action.VIEW,
                itemId: record.id,
              })
            );
          }}
        >
          {name}
        </Button>
      ),
    },
    {
      title: t(`${resource}.fields.description`),
      dataIndex: "description",
      render: (description: string, record: BaseRecord) => (
        <div
          onDoubleClick={() => {
            dispatch(
              openDrawer({
                resource: resource,
                action: Action.EDIT,
                itemId: record.id,
                activeField: "description",
              })
            );
          }}
        >
          {extractContent(description) || (
            <Typography.Text type='secondary' italic>
              No description
            </Typography.Text>
          )}
        </div>
      ),
    },
  ];
};

type TableActionProps = {
  resource: Resource;
  hasRoles: boolean;
  disabledEdit?: boolean;
  disabledDelete?: boolean;
};

export const useTableActionProps = (props: TableActionProps) => {
  const t = useTranslate();
  const dispatch = useAppDispatch();
  const { disabledEdit, disabledDelete, resource, hasRoles } = props;
  const buttonProps = (id: BaseKey | undefined, disabled: boolean | string | undefined) => {
    return {
      hideText: true,
      size: "small" as const,
      recordItemId: id,
      ...(!disabled
        ? {}
        : {
            errorNotification: () => {
              return {
                description: disabled,
                type: "error",
              } as OpenNotificationParams;
            },
          }),
    };
  };
  return {
    title: t("table.actions"),
    dataIndex: "actions",
    render: (_: unknown, record: BaseRecord) => (
      <Space>
        {hasRoles && (
          <Button
            icon={<UserOutlined />}
            size='small'
            type='primary'
            ghost
            onClick={() => {
              dispatch(
                openDrawer({
                  resource: resource,
                  action: Action.EDIT,
                  itemId: record.id,
                  activeField: "role_ids",
                })
              );
            }}
          />
        )}
        <EditButton
          {...buttonProps(record.id, disabledEdit)}
          onClick={() =>
            dispatch(
              openDrawer({
                resource: resource,
                action: Action.EDIT,
                itemId: record.id,
              })
            )
          }
        />
        <DeleteButton {...buttonProps(record.id, disabledDelete)} />
      </Space>
    ),
    width: 135,
    fixed: "right" as FixedType,
  };
};

export const usePageSize = () => {
  const [pageSize, setPageSize] = useState<number | null>(null);
  const tableHeight = document.getElementsByClassName("ab-custom-table")[0]?.clientHeight;

  const rowHeight = 49;
  const headerHeight = 39;
  const footerHeight = 25;

  useEffect(() => {
    if (tableHeight) {
      setPageSize(Math.floor((tableHeight - headerHeight - footerHeight) / rowHeight));
    }
  }, [tableHeight]);

  /* Use below code for testing only */

  // useLayoutEffect(() => {
  //   const handleResize = () => {
  //     const tableHeight = document.getElementsByClassName("ab-custom-table")[0]?.clientHeight;
  //     if (tableHeight) {
  //       setPageSize(Math.floor((tableHeight - headerHeight - footerHeight) / rowHeight));
  //     }
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return pageSize;
};

export const useDefaultFormItems = (resource: string) => {
  const { activeField } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  return (
    <>
      <Form.Item
        label={t(`${resource}.fields.title`)}
        name='name'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          placeholder={`Enter ${t(`${resource}.fields.title`)}`}
          autoFocus={activeField === "name"}
        />
      </Form.Item>
      <Form.Item label={t(`${resource}.fields.description`)} name='description'>
        {/* @ts-ignore */}
        <RichTextEditor
          placeholder={`Enter ${t(`${resource}.fields.description`)}..`}
          autoFocus={activeField === "description"}
        />
      </Form.Item>
    </>
  );
};

type ListProps = {
  resource: Resource;
  hasRoles: boolean;
  tableProps?: TablePropsType;
  tableActionProps?: TableActionProps;
};

export const useListProps = (props: ListProps) => {
  const {
    resource,
    tableProps: _tableProps,
    tableActionProps: _tableActionProps,
    hasRoles,
  } = props;
  const tableProps = useTableProps(_tableProps);
  const pageSize = usePageSize();
  const tableActionProps = useTableActionProps({ ..._tableActionProps, resource, hasRoles });
  const defaultColumns = useDefaultColumns({ resource });
  return { tableProps, pageSize, tableActionProps, defaultColumns };
};
