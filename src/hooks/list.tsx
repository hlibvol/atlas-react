import {
  Button,
  DeleteButton,
  EditButton,
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
  useGetIdentity,
  useNavigation,
  useTranslate,
} from "@pankod/refine-core";
import { FixedType } from "rc-table/lib/interface";
import { useEffect, useState } from "react";
import { extractContent } from "services/utils";

import { openDrawer, removeActiveField } from "redux/slices/drawerSlice";
import { Resource, Action } from "services/enums";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  UserOutlined,
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

export const useTableProps = (props: unknown = {}) => {
  const { tableProps, sorter } = useTable({
    // @ts-ignore
    ...props,
    initialPageSize: 1000,
    hasPagination: false,
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
    pagination: false,
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
  hasRoles: boolean | undefined;
  previewButton: boolean | undefined;
  designerButton: boolean | undefined;
  hasJobs: boolean | undefined;
  hasUseCases: boolean | undefined;
  hasPlaybook: boolean | undefined;
  hasScreen: boolean | undefined;
  roleJobsMatrix: boolean | undefined;
  hasExcutive: boolean | undefined;
  disabledEdit?: boolean;
  disabledDelete?: boolean;
};

export const useTableActionProps = (props: TableActionProps) => {
  const t = useTranslate();
  const dispatch = useAppDispatch();
  const { showUrl } = useNavigation();
  const { data: user } = useGetIdentity();
  const {
    disabledEdit,
    disabledDelete,
    resource,
    hasRoles,
    hasJobs,
    hasUseCases,
    hasPlaybook,
    hasScreen,
    roleJobsMatrix,
    hasExcutive,
    previewButton,
    designerButton,
  } = props;
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
          {previewButton && (
            <Button
              icon={<EyeOutlined />}
              size='small'
              type='primary'
              ghost
              href={showUrl(resource, record.id ? record.id : "")}
              target='_blank'
              title={`Preview ${resource}`}
              style={{ color: "#1890ff", border: "1px solid #1890ff" }}
            />
          )}
          {designerButton && (
            <Button
              icon={<PlayCircleOutlined />}
              size='small'
              type='primary'
              ghost
              href={`/editor/${resource}/${record.id}`}
              target='_blank'
              title={`Design ${resource}`}
              style={{ color: "#22075e", border: "1px solid #22075e" }}
            />
          )}
          {hasJobs && (
            <Button
              size='small'
              type='primary'
              title='Associated Jobs'
              ghost
              onClick={() => {
                dispatch(
                  openDrawer({
                    resource: resource,
                    action: Action.EDIT,
                    itemId: record.id,
                    activeField: "job_ids",
                  })
                );
              }}
            >
              J
            </Button>
          )}
          {hasUseCases && (
            <Button
              size='small'
              type='primary'
              title='Associated Use Cases'
              style={{ color: "#1890ff", border: "1px solid #1890ff" }}
              ghost
              onClick={() => {
                dispatch(
                  openDrawer({
                    resource: resource,
                    action: Action.EDIT,
                    itemId: record.id,
                    activeField: "use_case_ids",
                  })
                );
              }}
            >
              U
            </Button>
          )}
          {hasPlaybook && (
            <Button
              size='small'
              type='primary'
              title='Associated Playbook'
              ghost
              onClick={() => {
                dispatch(
                  openDrawer({
                    resource: resource,
                    action: Action.EDIT,
                    itemId: record.id,
                    activeField: "playbook_ids",
                  })
                );
              }}
            >
              P
            </Button>
          )}
          {hasScreen && (
            <Button
              size='small'
              type='primary'
              title='Associated Screen'
              ghost
              onClick={() => {
                dispatch(
                  openDrawer({
                    resource: resource,
                    action: Action.EDIT,
                    itemId: record.id,
                    activeField: "screen_ids",
                  })
                );
              }}
            >
              S
            </Button>
          )}
          {roleJobsMatrix && (
            <Button
              icon={<SettingOutlined />}
              size='small'
              type='primary'
              title='Role-Job Matrix'
              ghost
              href={`/use-cases/${record.id}`}
              target='_blank'
            />
          )}
          {hasExcutive && (
            <Space>
              {user.is_designer && (
                <Button
                  type='primary'
                  size='small'
                  icon={<AntDesignOutlined />}
                  target='_blank'
                  title={t("buttons.design-job")}
                  href={`ab:job/designer/${user?.id}/${record.id}/${(Math.random() + 1)
                    .toString(36)
                    .substring(2)}`}
                />
              )}
              <Button
                type='primary'
                size='small'
                icon={<PlayCircleOutlined />}
                target='_blank'
                title={t("buttons.execute-job")}
                href={`ab:job/executor/${user?.id}/${record.id}/${(Math.random() + 1)
                  .toString(36)
                  .substring(2)}`}
              />
            </Space>
          )}
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
          <DeleteButton {...buttonProps(record.id, disabledDelete)} />
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
  tableProps?: TablePropsType;
  tableActionProps?: TableActionProps;
};

export const useListProps = (props: ListProps) => {
  const { resource, tableProps: _tableProps, tableActionProps: _tableActionProps } = props;

  const tableProps = useTableProps(_tableProps);
  // const pageSize = usePageSize();

  const resources = useResources();
  const {
    hasDefaultFields,
    hasRoles,
    hasJobs,
    hasUseCases,
    hasPlaybook,
    hasScreen,
    roleJobsMatrix,
    hasExcutive,
    previewButton,
    designerButton,
  } = resources.find((r) => r.name === resource) ?? {};
  const tableActionProps = useTableActionProps({
    ..._tableActionProps,
    resource,
    hasRoles,
    previewButton,
    designerButton,
    hasJobs,
    hasUseCases,
    hasPlaybook,
    hasScreen,
    roleJobsMatrix,
    hasExcutive,
  });
  const defaultColumns = hasDefaultFields ? useDefaultColumns({ resource }) : [];
  return { tableProps, tableActionProps, defaultColumns };
};
