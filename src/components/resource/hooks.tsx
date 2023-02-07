import {
  Button,
  DeleteButton,
  EditButton,
  Form,
  Input,
  Space,
  TableProps,
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

import { openDrawer, closeDrawer } from "redux/slices/drawerSlice";
import { Resource, Action } from "services/enums";
import { useAppDispatch } from "redux/hooks";

export const defaultColumnProps = {
  ellipsis: true,
};

type TablePropsType = TableProps<BaseRecord> & {
  sorter: CrudSorting | undefined;
};

export const useTableProps = (props: unknown) => {
  const { tableProps, sorter } = useTable({
    // @ts-ignore
    ...props,
    initialPageSize: 25,
    hasPagination: false,
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
      render: (description: string) => extractContent(description),
    },
  ];
};

type TableActionProps = {
  resource: Resource;
  disabledEdit?: boolean;
  disabledDelete?: boolean;
};

export const useTableActionProps = (props: TableActionProps) => {
  const t = useTranslate();
  const dispatch = useAppDispatch();
  const { disabledEdit, disabledDelete, resource } = props;
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
    width: 120,
    fixed: "right" as FixedType,
  };
};

export const usePageSize = () => {
  const [pageSize, setPageSize] = useState<number | null>(null);
  const tableHeight = document.getElementsByClassName("ab-custom-table")[0]?.clientHeight;

  const rowHeight = 41;
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
        <Input placeholder={`Enter ${t(`${resource}.fields.title`)}`} />
      </Form.Item>
      <Form.Item label={t(`${resource}.fields.description`)} name='description'>
        {/* @ts-ignore */}
        <RichTextEditor placeholder={`Enter ${t(`${resource}.fields.description`)}..`} />
      </Form.Item>
    </>
  );
};

export const useDrawerName = (resource: string) => {
  const t = useTranslate();

  return t(`${resource}.drawer`);
};
