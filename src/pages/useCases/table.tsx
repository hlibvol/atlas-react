import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Select, useSelect } from "@pankod/refine-antd";

import { Col, Row, SelectProps } from "antd";
import { IUseCase, IRole, IJob } from "interfaces";
import { useShow, useUpdate } from "@pankod/refine-core";
interface IfirstChildProps {
  colHeader: any;
  rowHeader: any;
}

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  sortable: true,
  filter: true,
  resizable: true,
};

export const UseCaseTable: React.FC<IfirstChildProps> = ({ colHeader, rowHeader }) => {
  const { mutate } = useUpdate();
  const [rowHeaderData, setRowHeaderData] = useState([]) as Array<any>;
  const [columnData, setColumnData] = useState([]) as Array<any>;
  const { queryResult: userQueryResult } = useShow<IUseCase>();
  const useCase = userQueryResult.data?.data;

  useEffect(() => {
    setColumnData(colHeader);
    setRowHeaderData(rowHeader);
  }, [colHeader, rowHeader]);

  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: "roles",
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: jobSelectProps } = useSelect<IJob>({
    resource: "jobs",
    optionLabel: "name",
    optionValue: "id",
  });

  const updateMatrixData = (roleId: any, jobId: any) => {
    mutate(
      {
        resource: "use-cases",
        id: useCase?.id || "",
        values: { role_ids: roleId, job_ids: jobId },
        mutationMode: "optimistic",
      },
      {
        onError: (error, variables, context) => {
          console.log("data error", error);
        },
        onSuccess: (data, variables, error) => {
          setColumnData(data.data.roles);
        },
      }
    );
  };
  const handleChange = (value: string[]) => {
    const jobId = useCase?.job_ids;
    const roleId = useCase?.role_ids;
    roleId?.push(Number(value));
    updateMatrixData(roleId, jobId);
  };

  const rowHandleChange = (value: string[]) => {
    const jobId = useCase?.job_ids;
    const roleId = useCase?.role_ids;
    jobId?.push(Number(value));
    updateMatrixData(roleId, jobId);
  };

  const mapping = [
    {
      id: [1, 6, 1, true],
    },
    {
      id: [1, 7, 1, false],
    },
    {
      id: [1, 8, 1, true],
    },
    {
      id: [1, 7, 3, false],
    },
    {
      id: [1, 8, 3, true],
    },
    {
      id: [1, 6, 3, false],
    },
  ];

  const checkboxRendererComponent = (param: any) => {
    const deafultMapping = [1, param.node.data.id, param.colDef.id];
    mapping.map((key, index) => {
      if (
        param.customCheck === undefined &&
        deafultMapping[0] === key.id[0] &&
        deafultMapping[1] === key.id[1] &&
        deafultMapping[2] === key.id[2]
      ) {
        param.setValue(key.id[3]);
      }
    });
    const checkedHandler = (e: any) => {
      let checked = e.target.checked;
      let colId = param.column.colId;
      param.setValue(checked);
    };

    return (
      <>
        <input type='checkbox' onChange={checkedHandler} checked={param.value} />
      </>
    );
  };

  const frameworkComponents: any = {
    checkboxRenderer: checkboxRendererComponent,
  };

  const dropEnd = (event: any) => {};

  const columnDropEnd = (event: any) => {};

  const onGridReady = useCallback((params: any) => {}, []);

  const roleOptionsFun = () => {
    const roleOptionsArray = Array();
    roleSelectProps?.options?.filter((value, index, array) => {
      const colFilter = columnData.filter(
        (col: any) => col?.headerName?.toLowerCase() === value?.label?.toString().toLowerCase()
      );
      if (colFilter.length === 0) {
        roleOptionsArray.push(value);
      }
    });
    return roleOptionsArray;
  };

  const jobOptionsFun = () => {
    const jobOptionsArray = Array();
    jobSelectProps?.options?.filter((value, index, array) => {
      const rowFilter = rowHeaderData.filter(
        (row: any) => row?.job?.toLowerCase() === value?.label?.toString().toLowerCase()
      );
      if (rowFilter.length === 0) {
        jobOptionsArray.push(value);
      }
    });
    return jobOptionsArray;
  };

  return (
    <>
      <div className='App'>
        <Row>
          <Col span={8}>
            <div className='ant-page-header-heading-left'>
              <span className='ant-page-header-heading-title'>Usecase Job Role Mapping</span>
            </div>
          </Col>
          <Col span={8} offset={8}>
            <Select
              showSearch
              style={{ float: "right" }}
              placeholder='Search to Select'
              optionFilterProp='children'
              onChange={handleChange}
              filterOption={(input, option) => (option?.label ?? "").includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={roleOptionsFun()}
            />
          </Col>
        </Row>

        <div className='ag-theme-alpine ag-style inner-col'>
          <AgGridReact
            defaultColDef={defaultColDef}
            rowDragManaged={true}
            suppressMoveWhenRowDragging={true}
            animateRows={true}
            rowData={rowHeaderData}
            columnDefs={[...columnData]}
            onGridReady={onGridReady}
            onRowDragEnd={(event) => dropEnd(event)}
            onColumnMoved={(event) => columnDropEnd(event)}
            sideBar={true}
            getRowStyle={function (params) {
              if (params.node.rowPinned) {
                return { fontWeight: "bold" };
              }
            }}
            // pinnedBottomRowData= {[inputRow]}
            // pinnedBottomRowData= {createData(1, 'Bottom')}
            frameworkComponents={frameworkComponents}
          ></AgGridReact>
        </div>
        <Select
          style={{ width: "100%", float: "right" }}
          placeholder='Please Select Jobs'
          optionFilterProp='children'
          filterOption={(input, option) => (option?.label ?? "").includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          onChange={rowHandleChange}
          options={jobOptionsFun()}
        />
      </div>
    </>
  );
};
