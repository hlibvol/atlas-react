import React, { useEffect } from "react";
import _ from "lodash";
import { Form, useForm, Spin, SaveButton } from "@pankod/refine-antd";
import { Action, Resource } from "services/enums";
import { BaseRecord, GetOneResponse, useShow, useUpdate } from "@pankod/refine-core";
import { useDefaultFormItems } from "../../hooks/list";
import { openDrawer, removeActiveField, setDrawerTitle } from "redux/slices/drawerSlice";
import { useAppDispatch } from "redux/hooks";
import { useMutation } from "@tanstack/react-query";

type EditFormProps = {
  itemId: number;
  resource: Resource;
  renderFields: (record: BaseRecord) => JSX.Element;
  hasDefaultColumns?: boolean;
};

export const EditForm: React.FC<EditFormProps> = (props) => {
  const { itemId, resource, renderFields, hasDefaultColumns } = props;
  const defaultFormItems = useDefaultFormItems(resource);
  const { formProps, queryResult, onFinish, form, formLoading } = useForm({
    id: itemId,
    resource,
    action: Action.EDIT,
    successNotification: false,
    mutationMode: "optimistic",
    submitOnEnter: true,
  });
  const record = queryResult?.data?.data;
  const [lastValues, setLastValues] = React.useState<unknown>();
  const dispatch = useAppDispatch();
  const { mutate } = useUpdate();

  useEffect(() => {
    if (record) {
      setLastValues(_.omit(record, "id"));
      dispatch(
        setDrawerTitle(
          <>
            {record.name} <Spin size='small' spinning={formLoading}></Spin>
          </>
        )
      );
    }
  }, [record, formLoading]);

  // useEffect(() => {
  //   // Call the API to save the form data
  //   const saveData = async () => {
  //     console.log(lastValues);
  //     onFinish();
  //     // onFinish();
  //     // Your API call to save data here
  //   };

  //   // Save the form data every 5 seconds
  //   const intervalId = setInterval(saveData, 5000);

  //   return () => clearInterval(intervalId);
  // }, [lastValues]);

  const handleChanges = () => {
    form
      .validateFields()
      .then((values) => {
        if (!_.isEqual(values, lastValues)) {
          setLastValues(values);
          // mutate({
          //   resource: resource,
          //   values: values,
          //   id: itemId,
          //   successNotification: false,
          //   mutationMode: "optimistic",
          //   background: true,
          // });
          if (!_.isEmpty(values)) {
            dispatch(removeActiveField());
            onFinish(); // or form.submit()
          }
        }
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  return (
    <Spin spinning={!record}>
      <Form {...formProps} layout='vertical' onBlur={handleChanges}>
        {hasDefaultColumns && defaultFormItems}
        {record && renderFields(record)}
      </Form>
    </Spin>
  );
};

type CreateFormProps = {
  resource: Resource;
  renderFields: (record: BaseRecord) => JSX.Element;
  hasDefaultColumns?: boolean;
};

export const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { resource, renderFields, hasDefaultColumns } = props;
  const defaultFormItems = useDefaultFormItems(resource);
  const dispatch = useAppDispatch();

  const onSuccess = (data: GetOneResponse) => {
    const { id } = data.data;
    dispatch(openDrawer({ resource, action: Action.EDIT, itemId: id }));
  };

  const { formProps, saveButtonProps } = useForm({
    resource,
    action: Action.CREATE,
    onMutationSuccess: onSuccess,
    submitOnEnter: true,
  });
  return (
    <Form {...formProps} layout='vertical'>
      {hasDefaultColumns && defaultFormItems}
      {renderFields({})}
      <SaveButton {...saveButtonProps}>Save</SaveButton>
    </Form>
  );
};
