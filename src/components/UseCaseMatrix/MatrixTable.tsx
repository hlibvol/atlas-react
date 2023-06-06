import React, { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useUpdate } from "@refinedev/core";
import { ColDef, GetRowIdParams, ICellRendererParams } from "ag-grid-community";
import { Resource } from "services/enums";

interface customColDef extends ColDef {
  roleId: number;
}
interface CustomICellRendererParams extends ICellRendererParams {
  colDef: customColDef;
}
interface TData {
  jobName: string;
  jobId: number;
  roleIds: number[];
}
interface MatrixTableProps {
  columnDefs: customColDef[];
  rowData: TData[];
  onJobChange: (value: number[]) => void;
  onRoleChange: (value: number[]) => void;
}

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  sortable: true,
  filter: true,
  resizable: true,
};

export const MatrixTable: React.FC<MatrixTableProps> = (props) => {
  const { columnDefs, rowData, onJobChange, onRoleChange } = props;
  const gridRef = useRef();
  const { mutate } = useUpdate();
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);

  const handleCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    params: CustomICellRendererParams
  ) => {
    const roleId = params.colDef?.roleId;
    const oldJobRoleIds = params.data?.roleIds;
    const newJobRoleIds = event.target.checked
      ? [...oldJobRoleIds, roleId]
      : oldJobRoleIds.filter((id: number) => id !== roleId);

    // @ts-ignore
    const rowNode = gridRef.current?.api?.getRowNode(params.data.jobId);
    rowNode.setData({
      ...rowNode.data,
      roleIds: newJobRoleIds,
    });

    mutate({
      resource: Resource.JOB,
      id: params.data.jobId,
      values: {
        role_ids: newJobRoleIds,
      },
      successNotification: false,
      mutationMode: "optimistic",
    });
  };

  const checkboxRendererComponent = useCallback(
    (params: CustomICellRendererParams) => {
      return (
        <input
          type='checkbox'
          checked={params.data?.roleIds?.includes(params.colDef?.roleId)}
          onChange={(e) => handleCheckBoxChange(e, params)}
        />
      );
    },
    [rowData]
  );

  const onDragStopped = () => {
    const jobIds = [] as number[];
    const roleIds = [] as number[];

    // @ts-ignore
    gridRef.current?.api.forEachNode((rowNode) => {
      jobIds.push(rowNode.data.jobId);
    });

    // @ts-ignore
    gridRef.current?.api.getColumnDefs().forEach((col) => {
      if (col.roleId !== undefined) {
        roleIds.push(col.roleId);
      }
    });

    const oldJobIds = rowData.map((item) => item.jobId);
    const oldRoleIds = columnDefs.map((item) => item.roleId).filter((item) => item !== undefined);

    if (jobIds.length > 0 && oldJobIds.length > 0 && jobIds.join() !== oldJobIds.join()) {
      onJobChange(jobIds);
    }
    if (roleIds.length > 0 && oldRoleIds.length > 0 && roleIds.join() !== oldRoleIds.join()) {
      onRoleChange(roleIds);
    }
  };

  return (
    <div style={gridStyle} className='ag-theme-alpine ag-style '>
      <AgGridReact
        // @ts-ignore
        ref={gridRef}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        suppressMoveWhenRowDragging={true}
        animateRows={true}
        rowData={rowData}
        columnDefs={columnDefs}
        onDragStopped={onDragStopped}
        sideBar={true}
        getRowStyle={(params) => (params.node.rowPinned ? { fontWeight: "bold" } : undefined)}
        /* getRowId is important to keep here so getRowNode can identify correct row */
        getRowId={(param: GetRowIdParams) => param.data.jobId}
        components={{
          checkboxRenderer: checkboxRendererComponent,
        }}
      />
    </div>
  );
};
