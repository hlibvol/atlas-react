import { DeleteButton, EditButton, useTable } from "@refinedev/antd";
import { Space, TableProps, Tooltip, Typography, Button } from "antd";
import {
  BaseKey,
  BaseRecord,
  CrudSorting,
  OpenNotificationParams,
  useGetIdentity,
  useNavigation,
  useTranslate,
} from "@refinedev/core";
import { FixedType } from "rc-table/lib/interface";
import { useEffect, useState } from "react";
import { extractContent } from "services/utils";

import { openDrawer } from "redux/slices/drawerSlice";
import { Resource, Action } from "services/enums";
import { useAppDispatch } from "redux/hooks";
import {
  EyeOutlined,
  PlayCircleOutlined,
  AntDesignOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useResources } from "hooks/resource";

export const defaultColumnProps = {
  ellipsis: true,
  sorter: true,
};

type TablePropsType = TableProps<BaseRecord> & {
  sorter: CrudSorting | undefined;
};

export const useTableProps = () => {
  const { tableProps, sorter } = useTable({
    pagination: { mode: "off", pageSize: 1000 },
    initialSorter: [
      {
        field: "updated_at",
        order: "desc",
      },
    ],
  });
  return {
    ...tableProps,
    rowKey: "id",
    // pagination: {
    //   ...tableProps.pagination,
    //   showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} items`,
    // },
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
                action: Action.EDIT,
                itemId: record.id,
                activeField: "name",
                title: record?.name,
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
  renderActions?: (record: BaseRecord) => JSX.Element;
  disabledEdit?: boolean;
  disabledDelete?: boolean;
};

export const useTableActionProps = (props: TableActionProps) => {
  const t = useTranslate();
  const dispatch = useAppDispatch();
  const { showUrl } = useNavigation();
  const { data: user }: BaseRecord = useGetIdentity();
  const { disabledEdit, disabledDelete, resource, renderActions } = props;
  const tooltipLabel = t(`${resource}.fields.resourceLabel`);
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

  return [
    {
      title: "Updated",
      dataIndex: "updated_at",
      render: (updated_at: string, record: BaseRecord) =>
        updated_at || record?.created_at ? (
          <Typography.Text type='secondary' italic>
            {moment(moment.utc(updated_at || record?.created_at).toDate())
              .local()
              .fromNow()}
          </Typography.Text>
        ) : null,
    },
    {
      title: t("table.actions"),
      dataIndex: "actions",
      render: (_: unknown, record: BaseRecord) => (
        <Space>
          {renderActions && renderActions(record)}
          <Tooltip title={`Edit ${tooltipLabel}`} color='green'>
            <EditButton
              {...buttonProps(record.id, disabledEdit)}
              onClick={() =>
                dispatch(
                  openDrawer({
                    resource: resource,
                    action: Action.EDIT,
                    itemId: record.id,
                    activeField: "name",
                    title: record?.name,
                  })
                )
              }
            />
          </Tooltip>
          <Tooltip title={`Delete ${tooltipLabel}`} color='green'>
            <DeleteButton {...buttonProps(record.id, disabledDelete)} />
          </Tooltip>
        </Space>
      ),
      width: 230,
      fixed: "right" as FixedType,
    },
  ];
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

type ListProps = {
  resource: Resource;
  renderActions?: (record: BaseRecord) => JSX.Element;
};

export const useListProps = (props: ListProps) => {
  const { resource, renderActions } = props;

  const tableProps = useTableProps();
  // const pageSize = usePageSize();

  const resources = useResources();
  const { hasDefaultFields } = resources.find((r) => r.name === resource) ?? {};
  const tableActionProps = useTableActionProps({
    resource,
    renderActions,
  });
  const defaultColumns = hasDefaultFields ? useDefaultColumns({ resource }) : [];
  return { tableProps, tableActionProps, defaultColumns };
};
