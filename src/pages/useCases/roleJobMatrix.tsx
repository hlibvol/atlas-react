import React, { useEffect, useState } from "react";

import { IResourceComponentsProps, useShow, useList } from "@pankod/refine-core";
import { Icons, Show } from "@pankod/refine-antd";
import { Resource } from "services/enums";
import { UseCaseTable } from "components/job-role-mapping";
import { IJob, IRole, IUseCase } from "interfaces";
import { useParams } from "react-router-dom";

export const UseCaseDesign: React.FC<IResourceComponentsProps> = () => {
  const resource = Resource.USE_CASE;

  const { itemId } = useParams();

  const { queryResult } = useShow<IUseCase>({ id: itemId });
  const useCase = queryResult.data?.data;
  const [useCaseTableData, setUseCaseTableData] = useState([]) as Array<any>;

  const useCaseConfig = useCase?.table_config;

  useEffect(() => {
    const tableData = setTimeout(
      () => useCaseConfig && setUseCaseTableData(JSON.parse(useCaseConfig)),
      1000
    );
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

  const columns: any = [
    {
      headerName: "Job Name",
      field: "job",
      rowDrag: true,
      editable: false,
      sortable: false,
      lockPosition: "left",
      cellClass: "locked-col",
      pinned: "left",
      width: 250,
    },
  ];
  roleOptionsArray.map(function (values: any, index: any) {
    const val = values[0];
    const obj = {
      headerName: "Role",
      field: "role",
      // checkboxSelection: true,
      cellRenderer: "checkboxRenderer",
      id: val.id,
      sortable: false,
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
  return (
    <Show
      title={useCase && useCase.name ? useCase.name : "Use case"}
      isLoading={queryResult.isLoading}
      canEdit
      goBack={<Icons.SmileOutlined />}
      headerProps={{
        subTitle: "(Job - Role Matrix)",
      }}
    >
      <UseCaseTable colHeader={columns} rowHeader={rowData} useCaseTableConfig={useCaseTableData} />
    </Show>
  );
};
