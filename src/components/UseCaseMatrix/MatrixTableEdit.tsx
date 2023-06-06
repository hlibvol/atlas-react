import React, { useMemo } from "react";

import { useOne, useUpdate } from "@refinedev/core";
import { Col, Form, Row, Select } from "antd";
import { Show, useSelect } from "@refinedev/antd";
import { SmileOutlined } from "@ant-design/icons";
import { Resource } from "services/enums";
import { IJob, IRole, IUseCase } from "interfaces";
import { useParams } from "react-router-dom";
import { MatrixTable } from "./MatrixTable";
import { ColDef } from "ag-grid-community";

interface customColDef extends ColDef {
  roleId: number;
}

export const MatrixTableEdit: React.FC = () => {
  const { mutate } = useUpdate();
  const { itemId } = useParams();
  const queryResult = useOne<IUseCase>({ resource: Resource.USE_CASE, id: Number(itemId) });
  const useCase = queryResult.data?.data;

  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: Resource.ROLE,
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: jobSelectProps } = useSelect<IJob>({
    resource: Resource.JOB,
    optionLabel: "name",
    optionValue: "id",
  });

  const orderedRoles = useCase?.role_ids?.map((roleId) =>
    useCase.roles.find((role) => role.id === roleId)
  ) as IRole[];

  const orderedJobs = useCase?.job_ids?.map((jobId) =>
    useCase.jobs.find((job) => job.id === jobId)
  ) as IJob[];

  const rowData =
    orderedJobs?.length > 0
      ? orderedJobs.map((job) => {
          return {
            jobName: job?.name || "Job Loading....",
            jobId: job?.id,
            roleIds: job?.role_ids,
          };
        })
      : [];

  const columnDefs = useMemo(() => {
    return [
      {
        headerName: "Job Name",
        field: "jobName",
        rowDrag: true,
        editable: false,
        sortable: false,
        lockPosition: "left",
        cellClass: "locked-col",
        pinned: "left",
        width: 250,
      } as customColDef,
      ...(orderedRoles
        ? orderedRoles.map((role) => {
            return {
              cellRenderer: "checkboxRenderer",
              headerName: role?.name || "Role Loading....",
              field: "role-" + role?.id,
              roleId: role?.id,
              sortable: false,
              filter: false,
              resizable: false,
            } as customColDef;
          })
        : []),
    ];
  }, [useCase]);

  const onJobChange = (value: number[]) => {
    mutate({
      id: Number(itemId),
      resource: Resource.USE_CASE,
      values: {
        job_ids: value,
      },
      successNotification: false,
      mutationMode: "optimistic",
    });
  };

  const onRoleChange = (value: number[]) => {
    mutate({
      id: Number(itemId),
      resource: Resource.USE_CASE,
      values: {
        role_ids: value,
      },
      successNotification: false,
      mutationMode: "optimistic",
    });
  };

  return (
    <Show
      title={useCase && useCase.name ? useCase.name : "Use case"}
      isLoading={queryResult.isLoading || !useCase}
      canEdit
      goBack={<SmileOutlined rev={undefined} />}
      headerProps={{
        subTitle: "(Job - Role Matrix)",
      }}
    >
      <Row justify={"space-between"}>
        <Col>
          <Form.Item label='Jobs'>
            <Select
              options={jobSelectProps.options}
              style={{ minWidth: 300 }}
              mode='multiple'
              placeholder='Select Jobs'
              value={useCase?.job_ids || []}
              onSelect={(value: number) => onJobChange(useCase?.job_ids?.concat(value) || [value])}
              onDeselect={(value: number) =>
                onJobChange(useCase?.job_ids?.filter((id) => id !== value) || [])
              }
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label='Roles'>
            <Select
              options={roleSelectProps.options}
              style={{ minWidth: 300 }}
              mode='multiple'
              placeholder='Select Roles'
              value={useCase?.role_ids || []}
              onSelect={(value: number) =>
                onRoleChange(useCase?.role_ids?.concat(value) || [value])
              }
              onDeselect={(value: number) =>
                onRoleChange(useCase?.role_ids?.filter((id) => id !== value) || [])
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <MatrixTable
          rowData={rowData}
          columnDefs={[...columnDefs]}
          onJobChange={onJobChange}
          onRoleChange={onRoleChange}
        />
      </Row>
    </Show>
  );
};
