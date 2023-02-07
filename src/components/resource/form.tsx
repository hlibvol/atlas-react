import React, { useEffect } from "react";
import _ from "lodash";
import { Form, useForm, Spin, SaveButton } from "@pankod/refine-antd";
import { Action, Resource } from "services/enums";
import { BaseRecord, GetOneResponse, useShow } from "@pankod/refine-core";
import { useDefaultFormItems } from "../../hooks/list";
import { openDrawer, setDrawerTitle } from "redux/slices/drawerSlice";
import { useAppDispatch } from "redux/hooks";

type EditFormProps = {
  itemId: number;
  resource: Resource;
  renderFields: (record: BaseRecord) => JSX.Element;
  hasDefaultColumns?: boolean;
};

export const EditForm: React.FC<EditFormProps> = (props) => {
  const { itemId, resource, renderFields, hasDefaultColumns } = props;
  const defaultFormItems = useDefaultFormItems(resource);
  const { formProps, queryResult, onFinish, form } = useForm({
    id: itemId,
    resource,
    action: Action.EDIT,
    successNotification: false,
    mutationMode: "optimistic",
  });
  const record = queryResult?.data?.data;
  const [lastValues, setLastValues] = React.useState<unknown>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (record) {
      setLastValues(_.omit(record, "id"));
      dispatch(setDrawerTitle(record.name));
    }
  }, [record]);

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
  });
  return (
    <Form {...formProps} layout='vertical'>
      {hasDefaultColumns && defaultFormItems}
      {renderFields({})}
      <SaveButton {...saveButtonProps}>Save</SaveButton>
    </Form>
  );
};

type ShowProps = {
  itemId: number;
  resource: Resource;
  renderShow: (record: BaseRecord) => JSX.Element;
};

export const ShowForm: React.FC<ShowProps> = ({ itemId, resource, renderShow }) => {
  const { queryResult } = useShow({ id: itemId, resource });
  const dispatch = useAppDispatch();
  const record = queryResult.data?.data;
  useEffect(() => {
    if (record) {
      dispatch(setDrawerTitle(record.name));
    }
  }, [record]);
  return <Spin spinning={queryResult.isLoading}>{record ? renderShow(record) : null}</Spin>;
};
