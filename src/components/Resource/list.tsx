import React from "react";
import { Input, List as AntDList, Table, Typography } from "@pankod/refine-antd";
import type { ColumnsType } from "antd/es/table";
import { Action, Resource } from "services/enums";
import { useAppDispatch } from "redux/hooks";
import { openDrawer } from "redux/slices/drawerSlice";
import { BaseRecord } from "@pankod/refine-core";
import { defaultColumnProps, useListProps } from "../../hooks/list";
import { getObjectValuesAsArray, toTitleCase } from "services/utils";

const { Search } = Input;
const { Text } = Typography;

type ABListProps = {
  resource: Resource;
  columns?: ColumnsType<BaseRecord>;
  renderActions?: (record: BaseRecord) => JSX.Element;
};

const List: React.FC<ABListProps> = (props) => {
  const { resource, columns = [], renderActions } = props;
  const { tableProps, tableActionProps, defaultColumns } = useListProps({
    resource,
    renderActions,
  });
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const dataSource = searchQuery
    ? tableProps.dataSource?.filter(
        (record) =>
          getObjectValuesAsArray(record)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ?? []
      )
    : tableProps.dataSource;

  const _columns: ColumnsType<BaseRecord> = [...defaultColumns, ...columns, ...tableActionProps];
  const title = toTitleCase(resource.replace("-", " "));

  return (
    <AntDList
      canCreate
      title={
        <>
          {title}{" "}
          <Text type='secondary' style={{ fontSize: "12px" }}>
            {dataSource?.length ?? 0} items{" "}
          </Text>
        </>
      }
      headerButtons={({ defaultButtons }) => (
        <>
          <Search
            placeholder='Search..'
            allowClear
            onChange={(value) => setSearchQuery(value.target.value)}
            style={{ width: 300 }}
          />
          {defaultButtons}
        </>
      )}
      createButtonProps={{
        onClick: () => {
          dispatch(openDrawer({ resource, action: Action.CREATE }));
        },
      }}
    >
      <Table
        rowKey='id'
        {...tableProps}
        dataSource={dataSource}
        scroll={{ y: "calc(100vh - 230px)" }}
        columns={_columns.map((item) =>
          // @ts-ignore
          item.dataIndex !== "actions" ? { ...defaultColumnProps, ...item } : item
        )}
      ></Table>
    </AntDList>
  );
};

export default List;
