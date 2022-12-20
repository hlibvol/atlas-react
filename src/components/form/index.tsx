import React from "react";
import { Create, Edit, Form, useForm, Collapse } from "@pankod/refine-antd";
import { useParams } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";

type ICreateOrEditProps = {
  children: React.ReactNode;
};

export const CreateOrEditForm: React.FC<ICreateOrEditProps> = ({ children }) => {
  const { action, id } = useParams();
  const isEdit = action === "edit";
  const { formProps, saveButtonProps, queryResult } = useForm({ id: id });
  const getForm = () => (
    <Form {...formProps} layout='vertical'>
      <Collapse
        defaultActiveKey={["1"]}
        style={{ gap: "8px" }}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        {children}
      </Collapse>
    </Form>
  );

  const defaultProps = {
    isLoading: queryResult?.isFetching,
    saveButtonProps,
    ...(isEdit ? { title: queryResult?.data?.data.name } : {}),
  };

  return isEdit ? (
    <Edit {...defaultProps}>{getForm()}</Edit>
  ) : (
    <Create {...defaultProps}>{getForm()}</Create>
  );
};
