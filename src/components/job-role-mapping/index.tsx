import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Select, useSelect } from "@pankod/refine-antd";

import { Col, Row, SelectProps } from "antd";
import { IUseCase, IRole, IJob } from "interfaces";
import { useMany, useOne, useShow, useUpdate } from "@pankod/refine-core";
interface IfirstChildProps {
  colHeader: any;
  rowHeader: any;
  useCaseTableConfig: any;
}

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  sortable: true,
  filter: true,
  resizable: true,
};

export const UseCaseTable: React.FC<IfirstChildProps> = ({
  colHeader,
  rowHeader,
  useCaseTableConfig,
}) => {
  const { mutate } = useUpdate();
  const [rowHeaderData, setRowHeaderData] = useState(rowHeader) as Array<any>;
  const [columnData, setColumnData] = useState(colHeader) as Array<any>;
  const [columnHeaderData, setColumnHeaderData] = useState([]) as Array<any>;
  const [rowNameHeaderData, setRowNameHeaderData] = useState([]) as Array<any>;
  const { queryResult: userQueryResult } = useShow<IUseCase>();
  const useCase = userQueryResult.data?.data;
  useEffect(() => {
    setColumnHeaderData(colHeader);
    setRowNameHeaderData(rowHeader);
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
    const configData = JSON.stringify({ roles: roleId, jobs: jobId });
    mutate(
      {
        resource: "use-cases",
        id: useCase?.id || "",
        values: { table_config: configData },
        mutationMode: "optimistic",
      },
      {
        onError: (error, variables, context) => {
          console.log("data error", error);
        },
        onSuccess: (data, variables, error) => {
          // setColumnHeaderData(data.data.roles);
          // setRowHeaderData(rowHeaderData);
          // console.log("update", rowHeader);
        },
      }
    );
  };
  const handleChange = (value: string) => {
    const roleData = useCaseTableConfig?.roles;
    const jobData = useCaseTableConfig?.jobs;
    roleData.push({
      Id: value,
      width: 120,
      order: roleData?.length,
    });

    updateMatrixData(roleData, jobData);
  };

  const rowHandleChange = (value: string) => {
    const roleData = useCaseTableConfig?.roles;
    const jobData = useCaseTableConfig?.jobs;
    jobData.push({
      Id: value,
      order: jobData?.length,
    });

    updateMatrixData(roleData, jobData);
  };

  let mapping = Array();
  let status = false;
  const checkboxRendererComponent = (param: any) => {
    const deafultMapping = [useCase?.id, param.node.data.id, param.colDef.id];
    mapping?.map((key: any, index: any) => {
      if (
        param.customCheck === undefined &&
        deafultMapping[0] === key.id[0] &&
        deafultMapping[1] === key.id[1] &&
        deafultMapping[2] === key.id[2]
      ) {
        param.setValue(key.id[3]);
      }
    });

    const checkUncheckedFunctionality = (roleId: any) => {
      mutate(
        {
          resource: "jobs",
          id: param.data.id || "",
          values: { role_ids: roleId },
          mutationMode: "optimistic",
        },
        {
          onError: (error, variables, context) => {
            console.log("data error", error);
          },
          onSuccess: (data, variables, error) => {
            console.log("value", data.data);
            param.setValue(param.value);
            // setColumnData(data.data.roles);
          },
        }
      );
    };

    const jobData = useOne({ resource: "jobs", id: param.data.id });

    const checkedHandler = (e: any) => {
      const roleDataId = jobData.data?.data.role_ids;
      const checkedValue: any[] = param.colDef.id;
      let checked = e.target.checked;
      let colId = param.column.colId;
      if (param.value === false) {
        roleDataId?.push(checkedValue);
        console.log("add", roleDataId);
        checkUncheckedFunctionality(roleDataId);
        param.setValue(checked);
      }
      if (param.value === true) {
        const removedRoleId = roleDataId.filter((roleId: any) => roleId !== param.colDef.id);
        console.log("remove", removedRoleId);
        checkUncheckedFunctionality(removedRoleId);
        param.setValue(checked);
      }
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

  const onGridReady = useCallback((params: any) => {
    rowHeaderData?.map((item: any, index: any) => {
      columnData?.map((coldata: any, i: any) => {
        if (coldata.id != undefined) {
          if (item?.role_ids.includes(coldata?.id)) {
            status = true;
          } else {
            status = false;
          }
          const jobVariable = {
            id: [useCase?.id, item?.id, coldata?.id, status],
          };
          mapping.push(jobVariable);
        }
      });
    });
  }, []);

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
            <div className='ant-col ant-form-item-label'>
              <label className='ant-page-header-heading-title'>Usecase Job Role Mapping</label>
            </div>
          </Col>
          <Col span={8} offset={8}>
            <Select
              showSearch
              style={{ float: "right", bottom: "4px" }}
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
            rowData={rowNameHeaderData}
            columnDefs={[...columnHeaderData]}
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
          />
          <Select
            style={{ width: "100%", float: "right" }}
            placeholder='Please Select Jobs'
            optionFilterProp='children'
            filterOption={(input, option) => (option?.label ?? "").includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            onChange={rowHandleChange}
            options={jobOptionsFun()}
          />
        </div>
      </div>
    </>
  );
};
