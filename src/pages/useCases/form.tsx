import { IResourceComponentsProps, useTranslate, useShow, useList } from "@pankod/refine-core";
import { Form, Input, Collapse } from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { UseCaseTable } from "./table";

import { usePanelHeader } from "hooks/common";
import { useParams } from "react-router-dom";
import { IJob, IRole, IUseCase } from "interfaces";
import { useEffect, useState } from "react";

export const UseCaseForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { Panel } = Collapse;
  const { action, id } = useParams();
  const isEdit = action === "edit";

  const { queryResult } = useShow<IUseCase>();
  const useCase = queryResult.data?.data;
  const [useCaseTableData, setUseCaseTableData] = useState([]) as Array<any>;

  const useCaseConfig = useCase?.table_config;

  useEffect(() => {
    const tableData = setTimeout(() => setUseCaseTableData(JSON.parse(useCaseConfig)), 1000);
    return () => clearTimeout(tableData);
  }, [useCaseConfig]);

  // role value for column data in matrix table
  let roleIDs = Array();
  useCaseTableData.roles?.map((item: any, index: any) => {
    roleIDs.push(item.Id);
  });

  const roleResult = useList<IRole>({
    resource: "roles",
  });

  const roleOptionsArray: any = [];
  roleIDs.filter((item) => {
    const colFilter = roleResult.data?.data.filter((col: any) => col.id === item);
    if (colFilter?.length === 1) {
      roleOptionsArray.push(colFilter);
    }
  });

  const columns: any = [{ headerName: "Job Name", field: "job", rowDrag: true, editable: false }];
  roleOptionsArray.map(function (values: any, index: any) {
    const val = values[0];
    const obj = {
      headerName: "Role",
      field: "role",
      // checkboxSelection: true,
      cellRenderer: "checkboxRenderer",
      id: val.id,
      cellRendererParams: (param: any) => {
        return {
          customCheck: param.value !== undefined ? true : undefined,
        };
      },
    };
    if (val && val.name) {
      obj.headerName = val.name.toUpperCase();
      obj.field = val.name.replace(/\s-/g, "").toLocaleLowerCase();
      columns.push(obj);
    }
  });

  // jobs data from table config for rows in matrix table

  let jobIDs = Array();
  useCaseTableData.jobs?.map((item: any, index: any) => {
    jobIDs.push(item.Id);
  });

  const jobResult = useList<IJob>({
    resource: "jobs",
  });

  const jobsOptionsArray: any = [];
  jobIDs.filter((item) => {
    const rowFilter = jobResult.data?.data.filter((row: any) => row.id === item);
    if (rowFilter?.length === 1) {
      jobsOptionsArray.push(rowFilter);
    }
  });

  const rowData: any = [];
  jobsOptionsArray?.map(function (values: any, index: any) {
    const val = values[0];
    const obj = { job: "", status: "", id: 1, role_ids: [] };
    if (val && val.name) {
      obj.job = val.name;
      obj.role_ids = val.role_ids;
      (obj.id = val.id), rowData.push(obj);
    }
  });

  // checked and unchecked data functionality

  return (
    <CreateOrEditForm>
      <Panel key='1' header={usePanelHeader("Details", "Name, Description and Roles")}>
        <Form.Item
          label={t("use-cases.fields.title")}
          name='name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder='Enter Name' />
        </Form.Item>

        <Form.Item label={t("use-cases.fields.description")} name='description'>
          <Input.TextArea placeholder='Enter Description' />
        </Form.Item>
      </Panel>
      {isEdit && (
        <Panel header={usePanelHeader("Designer", "Page content")} key='2' style={{ padding: "0" }}>
          {id ? (
            <UseCaseTable
              colHeader={columns}
              rowHeader={rowData}
              useCaseTableConfig={useCaseTableData}
            />
          ) : null}
        </Panel>
      )}
    </CreateOrEditForm>
  );
};
