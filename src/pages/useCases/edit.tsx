import { IResourceComponentsProps, useShow, useTranslate } from "@pankod/refine-core";

import { Edit, Form, Input, useForm, Row, Col, Typography, Divider } from "@pankod/refine-antd";

const { Text } = Typography;
import { UseCaseTable } from "./table";

// import CheckboxRenderer from "./CheckboxRenderer";

import { IUseCase, IRole, IJob } from "interfaces";

export const UseCaseEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<IUseCase>();
  const { queryResult: userQueryResult } = useShow<IUseCase>();
  const useCase = userQueryResult.data?.data;

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
    <Edit isLoading={queryResult?.isFetching} saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout='vertical'
        initialValues={{
          isActive: true,
          ...formProps.initialValues,
        }}
      >
        <Row gutter={20} wrap>
          <Col xs={24} lg={12}>
            <Form.Item
              label={t("use-cases.fields.title")}
              name='name'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label={t("use-cases.fields.description")} name='description'>
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/* <button className="btn btn-primary mb-3" onClick={this.onAddRow}>Add Row</button>
       */}
      <Divider />
      <UseCaseTable colHeader={columns} rowHeader={rowData} />
    </Edit>
  );
};
