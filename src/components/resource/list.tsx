import React, { useEffect } from "react";
import { Input, List as AntDList, Table } from "@pankod/refine-antd";

import type { ColumnsType } from "antd/es/table";
import { Action, Resource } from "services/enums";

import { useAppDispatch } from "redux/hooks";
import { openDrawer } from "redux/slices/drawerSlice";
import { BaseRecord } from "@pankod/refine-core";
import { defaultColumnProps, useListProps } from "../../hooks/list";
import { getObjectValuesAsArray } from "services/utils";

const { Search } = Input;

type ABListProps = {
  resource: Resource;
  columns?: ColumnsType<BaseRecord>;
};

const List: React.FC<ABListProps> = (props) => {
  const { resource, columns = [] } = props;
  const { tableProps, tableActionProps, defaultColumns } = useListProps({
    resource,
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

  return (
    <AntDList
      canCreate
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
        scroll={{ y: "calc(100vh - 290px)" }}
        // {...(pageSize && { pagination: { ...tableProps.pagination, pageSize } })}
        columns={_columns.map((item) =>
          // @ts-ignore
          item.dataIndex !== "actions" ? { ...item, ...defaultColumnProps } : item
        )}
      ></Table>
    </AntDList>
  );
};

export default List;
