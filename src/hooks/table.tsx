import {
  ShowButton,
  EditButton,
  Space,
  DeleteButton,
  useTable,
  TableProps,
} from "@pankod/refine-antd";
import {
  BaseRecord,
  useTranslate,
  CrudSorting,
  BaseKey,
  OpenNotificationParams,
} from "@pankod/refine-core";
import type { FixedType } from "rc-table/lib/interface";

type TablePropsType = TableProps<BaseRecord> & {
  sorter: CrudSorting | undefined;
};

export const useTableProps = (props: unknown) => {
  const additionalProps = {
    initialPageSize: 25,
    syncWithLocation: true,
  };
  // @ts-ignore
  const { tableProps, sorter } = useTable({ ...props, ...additionalProps });
  return {
    ...tableProps,
    rowKey: "id",
    pagination: {
      ...tableProps.pagination,
      showTotal: (total) => `Total ${total} items`,
    },
    size: "small",
    className: "ab-custom-table",
    sorter,
  } as TablePropsType;
};

type TableActionProps = {
  hideShow?: boolean;
  disabledEdit?: string | boolean;
  disabledDelete?: string | boolean;
};

export const useTableActionProps = (
  props: TableActionProps = {
    hideShow: false,
    disabledEdit: false,
    disabledDelete: false,
  }
) => {
  const t = useTranslate();
  const { hideShow, disabledEdit, disabledDelete } = props;
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
        <EditButton {...buttonProps(record.id, disabledEdit)} />
        {!hideShow && <ShowButton hideText size='small' recordItemId={record.id} />}
        <DeleteButton {...buttonProps(record.id, disabledDelete)} />
      </Space>
    ),
    width: 120,
    fixed: "right" as FixedType,
  };
};
