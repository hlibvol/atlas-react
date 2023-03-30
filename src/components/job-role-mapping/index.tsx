import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Form, Select, useSelect } from "@pankod/refine-antd";

import { Col, Row, SelectProps } from "antd";
import { IUseCase, IRole, IJob } from "interfaces";
import { useMany, useOne, useShow, useUpdate } from "@pankod/refine-core";
import { useLocation } from "@pankod/refine-react-router-v6";
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
  const location = useLocation();
  const id = location.pathname.split("/")?.[2] || "";
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
        id,
        values: { table_config: configData },
        mutationMode: "optimistic",
        successNotification: false,
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
  let roleData = useCaseTableConfig?.roles || [];
  let jobData = useCaseTableConfig?.jobs || [];
  const handleChange = (value: any) => {
    if (value.length > roleData.length) {
      value.map((v: any) => {
        roleData?.filter(({ Id }: any) => v == Id)?.[0] ||
          roleData.push({
            Id: v,
            width: 120,
            order: roleData?.length,
          });
      });
      updateMatrixData(roleData, jobData);
    }
  };

  const rowHandleChange = (value: any) => {
    if (value.length > jobData.length) {
      value.map((v: any) => {
        jobData?.filter(({ Id }: any) => v == Id)?.[0] ||
          jobData.push({
            Id: v,
            order: jobData?.length,
          });
      });
      updateMatrixData(roleData, jobData);
    }
  };

  const handleDeselectRole = (value: any) => {
    roleData = roleData?.filter(({ Id }: any) => value !== Id);
    updateMatrixData(roleData, jobData);
  };
  const handleDeselectJob = (value: any) => {
    jobData = jobData?.filter(({ Id }: any) => value !== Id);
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
        checkUncheckedFunctionality(roleDataId);
        param.setValue(checked);
      }
      if (param.value === true) {
        const removedRoleId = roleDataId.filter((roleId: any) => roleId !== param.colDef.id);
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

  const dropEnd = (event: any) => {
    const draggedRowID = event?.node?.data?.id;
    const newPosition = event?.overIndex;

    const _jobData = jobData.map((j: any, i: any) => {
      return { ...j, order: i };
    });
    const draggedJobData = _jobData?.filter((a: any) => a.Id == draggedRowID);

    const updatedDraggedJobData = draggedJobData?.map((v: any) => {
      return { ...v, order: newPosition };
    })?.[0];

    const filteredJobData = _jobData?.filter((a: any) => a.Id !== draggedRowID);

    const updatedOrderJobData = filteredJobData?.map((val: any, index: any) => {
      if (val.order == newPosition || val.order > newPosition) {
        return { ...val, order: index + 1 };
      } else {
        return { ...val, order: index };
      }
    });

    updatedDraggedJobData && updatedOrderJobData?.push(updatedDraggedJobData);

    const sortedJobData = updatedOrderJobData.sort((a: any, b: any) => {
      return a.order - b.order;
    });
    updateMatrixData(roleData, sortedJobData);
  };

  const columnDropEnd = (event: any) => {
    const draggedRowID = event.column.colDef.id;
    const newPosition = event.toIndex;
    const _roleData = roleData.map((j: any, i: any) => {
      return { ...j, order: i + 1 };
    });
    const draggedRoleData = _roleData?.filter((a: any) => a.Id == draggedRowID);

    const updatedDraggedRoleData = draggedRoleData?.map((v: any) => {
      return { ...v, order: newPosition };
    })?.[0];
    const filteredRoleData = _roleData?.filter((a: any) => a.Id !== draggedRowID);
    const updatedOrderRoleData = filteredRoleData?.map((val: any, index: any) => {
      if (val.order == newPosition || val.order > newPosition) {
        return { ...val, order: index + 2 };
      } else {
        return { ...val, order: index + 1 };
      }
    });

    updatedDraggedRoleData && updatedOrderRoleData?.push(updatedDraggedRoleData);

    const sortedRoleData = updatedOrderRoleData.sort((a: any, b: any) => {
      return a.order - b.order;
    });
    updateMatrixData(sortedRoleData, jobData);
  };

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
  const JobSelect = ({ minWidth }: any) => (
    <Select
      style={{ minWidth }}
      mode='multiple'
      placeholder='Please Select Jobs'
      optionFilterProp='children'
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      // filterSort={(optionA, optionB) =>
      //   (optionA?.label ?? "")
      //     .toLowerCase()
      //     .localeCompare((optionB?.label ?? "").toLowerCase())
      // }
      onChange={rowHandleChange}
      options={jobOptionsFun()}
      defaultValue={jobData.map((j: any) => j?.Id)}
      onDeselect={handleDeselectJob}
    />
  );

  const RoleSelect = ({ minWidth }: any) => (
    <Select
      style={{ minWidth }}
      mode='multiple'
      showSearch
      placeholder='Search to Select'
      optionFilterProp='children'
      onChange={handleChange}
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={roleOptionsFun()}
      defaultValue={roleData.map((j: any) => j?.Id)}
      onDeselect={handleDeselectRole}
    />
  );

  return (
    <>
      <Row justify={"space-between"}>
        <Col>
          <Form.Item label='Jobs'>
            <JobSelect minWidth={300} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label='Roles'>
            <RoleSelect minWidth={300} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
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
        </div>
      </Row>
    </>
  );
};
