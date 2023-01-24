import React, { useEffect } from "react";
import { Create, Edit, Form, useForm, Collapse } from "@pankod/refine-antd";
import { useParams, useSearchParams } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
import _ from "lodash";
type ICreateOrEditProps = {
  children: React.ReactNode;
};

export const CreateOrEditForm: React.FC<ICreateOrEditProps> = ({ children }) => {
  const { action, id } = useParams();
  const [searchParams] = useSearchParams();
  const activeKey = searchParams.get("key");
  const isEdit = action === "edit";
  const { formProps, queryResult, onFinish, form } = useForm({ id: id });
  const [lastValues, setLastValues] = React.useState<any>();
  const getForm = () => (
    <Form {...formProps} layout='vertical' onBlur={handleChanges}>
      <Collapse
        defaultActiveKey={activeKey ? [activeKey] : ["1"]}
        style={{ gap: "8px" }}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        {children}
      </Collapse>
    </Form>
  );

  useEffect(() => {
    if (queryResult?.data?.data) {
      setLastValues(_.omit(queryResult.data.data, "id"));
    }
  }, [queryResult?.data?.data]);

  const handleChanges = () => {
    form
      .validateFields()
      .then((values) => {
        if (!_.isEqual(values, lastValues)) {
          setLastValues(values);
          onFinish(); // or form.submit()
        }
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const defaultProps = {
    isLoading: queryResult?.isFetching,
    footerButtons: <div style={{ display: "none" }}></div>,
    ...(isEdit ? { title: queryResult?.data?.data.name } : {}),
  };

  return isEdit ? (
    <Edit {...defaultProps}>{getForm()}</Edit>
  ) : (
    <Create {...defaultProps}>{getForm()}</Create>
  );
};
