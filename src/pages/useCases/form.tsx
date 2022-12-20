import { IResourceComponentsProps, useTranslate, useShow } from "@pankod/refine-core";
import { Form, Input, Collapse } from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { UseCaseTable } from "./table";

import { usePanelHeader } from "hooks/common";
import { useParams } from "react-router-dom";
import { IUseCase } from "interfaces";

export const UseCaseForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { Panel } = Collapse;
  const { action, id } = useParams();
  const isEdit = action === "edit";

  const { queryResult } = useShow<IUseCase>();
  const useCase = queryResult.data?.data;

  const columns: any = [{ headerName: "Job Name", field: "job", rowDrag: true, editable: false }];
  useCase?.roles.map(function (val, index) {
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

  const rowData: any = [];
  useCase?.jobs.map(function (val, index) {
    const obj = { job: "", status: "", id: 1 };
    console.log(val);
    if (val && val.name) {
      obj.job = val.name;
      (obj.id = val.id), rowData.push(obj);
    }
  });

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
          {id ? <UseCaseTable colHeader={columns} rowHeader={rowData} /> : null}
        </Panel>
      )}
    </CreateOrEditForm>
  );
};
