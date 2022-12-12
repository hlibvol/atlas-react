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
  const defaultProps = {
    breadcrumb: false,
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
