import {
  EditButton,
  Space,
  DeleteButton,
  useTable,
  TableProps,
  UrlField,
  Form,
  Input,
} from "@pankod/refine-antd";
import {
  BaseRecord,
  useTranslate,
  CrudSorting,
  BaseKey,
  OpenNotificationParams,
  useNavigation,
} from "@pankod/refine-core";
import type { FixedType } from "rc-table/lib/interface";
import { extractContent } from "services/utils";
import RichTextEditor from "components/RichTextEditor";
import { useEffect, useState } from "react";

type TablePropsType = TableProps<BaseRecord> & {
  sorter: CrudSorting | undefined;
};

export const defaultColumnProps = {
  ellipsis: true,
};

export const useDefaultColumns = (resource: string) => {
  const t = useTranslate();
  const { showUrl } = useNavigation();
  return [
    {
      title: t(`${resource}.fields.title`),
      dataIndex: "name",
      render: (name: string, record: BaseRecord) =>
        record.id ? <UrlField value={showUrl(resource, record.id)}>{name}</UrlField> : name,
    },
    {
      title: t(`${resource}.fields.description`),
      dataIndex: "description",
      render: (description: string) => extractContent(description),
    },
  ];
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

type TableActionProps = {
  disabledEdit?: string | boolean;
  disabledDelete?: string | boolean;
};

export const useTableActionProps = (
  props: TableActionProps = {
    disabledEdit: false,
    disabledDelete: false,
  }
) => {
  const t = useTranslate();
  const { disabledEdit, disabledDelete } = props;
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
