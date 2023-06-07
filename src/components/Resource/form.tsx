import React, { useEffect } from "react";
import { Form, Spin, Button, Modal, FormInstance, Space } from "antd";
import { DeleteButton, useForm } from "@refinedev/antd";
import { Action, Resource } from "services/enums";
import { BaseRecord, GetOneResponse } from "@refinedev/core";
import {
  closeDrawer,
  openDrawer,
  setDrawerFooter,
  setDrawerOnClose,
  setDrawerExtra,
} from "redux/slices/drawerSlice";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { IDrawerField } from "interfaces";
import { Tabs } from "./tabs";

type DrawerFormProps = {
  resource: Resource;
  renderFields?: (record: BaseRecord, form: FormInstance) => IDrawerField[];
  footer?: JSX.Element | null;
};

export const DrawerForm: React.FC<DrawerFormProps> = (props) => {
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const { resource, renderFields = () => null, footer } = props;
  const dispatch = useAppDispatch();

  const { formProps, formLoading, queryResult, onFinish, form } = useForm({
    id: itemId,
    resource,
    action: action,
    onMutationSuccess: (data: GetOneResponse) => {
      const { id, name } = data.data;
      dispatch(openDrawer({ resource, action: Action.EDIT, itemId: id, title: name }));
    },
    warnWhenUnsavedChanges: true,
  });

  const currentRecord = queryResult?.data?.data;
  const isExternal = currentRecord?.source_id ? true : false;

  const defaultOnClose = () => {
    dispatch(closeDrawer());
  };

  const handleValuesChange = () => {
    const newRecord: BaseRecord = form.getFieldsValue();
    let hasChanges = false;
    for (const key in newRecord) {
      // eslint-disable-next-line no-prototype-builtins
      if (newRecord.hasOwnProperty(key)) {
        // eslint-disable-next-line no-prototype-builtins
        if ((currentRecord && currentRecord[key] !== newRecord[key]) || !currentRecord) {
          hasChanges = true;
          break;
        }
      }
    }
    if (hasChanges) {
      const drawerOnClose = form.isFieldsTouched()
        ? () => {
            Modal.confirm({
              title: "Unsaved changes",
              content: "Are you sure you want to leave? You have unsaved changes.",
              onOk: defaultOnClose,
            });
          }
        : defaultOnClose;
      dispatch(setDrawerOnClose(drawerOnClose));
    }
  };

  formProps.onValuesChange = handleValuesChange;

  const getActionButtons = () => {
    return (
      <Space>
        <Button
          loading={formLoading}
          onClick={() => {
            form
              .validateFields()
              .then(() => {
                onFinish(); // or form.submit()
              })
              .catch((errorInfo) => {
                console.log(errorInfo);
              });
          }}
          type='primary'
          disabled={isExternal}
        >
          Save
        </Button>
        {action == Action.EDIT ? (
          <DeleteButton
            resource={resource}
            recordItemId={itemId}
            disabled={isExternal}
            hideText
            onSuccess={defaultOnClose}
          />
        ) : null}
      </Space>
    );
  };

  useEffect(() => {
    dispatch(setDrawerFooter(footer));
    dispatch(setDrawerExtra(getActionButtons()));
    dispatch(setDrawerOnClose(defaultOnClose));
  }, [formLoading]);

  return (
    <Spin spinning={formLoading}>
      <Form {...formProps} layout='vertical'>
        <Tabs
          record={currentRecord}
          resource={resource}
          fields={renderFields(currentRecord ?? {}, form)}
        />
        {/* <SaveButton {...saveButtonProps}>Save</SaveButton> */}
      </Form>
    </Spin>
  );
};
