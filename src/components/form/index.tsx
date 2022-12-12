import React from "react";
import { Create, Edit, Form, useForm } from "@pankod/refine-antd";
import { useParams } from "react-router-dom";

type ICreateOrEditProps = {
  children: React.ReactNode;
};

export const CreateOrEditForm: React.FC<ICreateOrEditProps> = ({ children }) => {
  const { action } = useParams();
  const { formProps, saveButtonProps, queryResult } = useForm();
  const isEdit = action === "edit";
  const getForm = () => (
    <Form {...formProps} layout='vertical'>
      {children}
    </Form>
  );

  return isEdit ? (
    <Edit isLoading={queryResult?.isFetching} saveButtonProps={saveButtonProps} breadcrumb={false}>
      {getForm()}
    </Edit>
  ) : (
    <Create isLoading={queryResult?.isFetching} saveButtonProps={saveButtonProps}>
      {getForm()}
    </Create>
  );
};
