import React, { useEffect } from "react";
import { Form, Spin, Input, Button, Modal, FormInstance } from "antd";
import { useForm } from "@refinedev/antd";
import { Action, Resource } from "services/enums";
import { BaseRecord, GetOneResponse, useTranslate } from "@refinedev/core";
import {
  closeDrawer,
  openDrawer,
  setDrawerFooter,
  setDrawerOnClose,
} from "redux/slices/drawerSlice";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import RichTextEditor from "components/RichTextEditor";
import { useResources } from "hooks/resource";

export const useDefaultFormItems = (resource: string, isExternal = false) => {
  const { activeField } = useAppSelector((state) => state.drawer);

  const t = useTranslate();
  return (
    <>
      <Form.Item
        label={t(`${resource}.fields.title`)}
        name='name'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          placeholder={`Enter ${t(`${resource}.fields.title`)}`}
          autoFocus={!activeField}
          tabIndex={1}
          {...(isExternal ? { disabled: true } : null)}
        />
      </Form.Item>
      <Form.Item label={t(`${resource}.fields.description`)} name='description'>
        {/* @ts-ignore */}
        <RichTextEditor
          placeholder={`Enter ${t(`${resource}.fields.description`)}..`}
          autoFocus={activeField === "description"}
          tabIndex={2}
          readOnly={isExternal}
        />
      </Form.Item>
    </>
  );
};

type DrawerFormProps = {
  resource: Resource;
  renderFields?: (record: BaseRecord, form: FormInstance) => JSX.Element;
  footer?: JSX.Element | null;
};

export const DrawerForm: React.FC<DrawerFormProps> = (props) => {
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const { resource, renderFields = () => null, footer } = props;

  const resources = useResources();
  const { hasDefaultFields } = resources.find((r) => r.name === resource) ?? {};
  const dispatch = useAppDispatch();

  const { formProps, formLoading, queryResult, onFinish, form } = useForm({
    id: itemId,
    resource,
    action: action,
    onMutationSuccess: (data: GetOneResponse) => {
      const { id } = data.data;
      dispatch(openDrawer({ resource, action: Action.EDIT, itemId: id }));
    },
    warnWhenUnsavedChanges: true,
  });

  const currentRecord = queryResult?.data?.data;
  const isExternal = currentRecord?.source_id ? true : false;

  const defaultFormItems = hasDefaultFields ? useDefaultFormItems(resource, isExternal) : null;

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

  useEffect(() => {
    dispatch(
      setDrawerFooter(
        <>
          {footer}
          {!isExternal && (
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
              style={{ float: "right" }}
            >
              Save
            </Button>
          )}
        </>
      )
    );
    dispatch(setDrawerOnClose(defaultOnClose));
  }, [formLoading]);

  return (
    <Spin spinning={formLoading}>
      <Form {...formProps} layout='vertical'>
        {defaultFormItems}
        {renderFields(queryResult?.data?.data ?? {}, form)}
        {/* <SaveButton {...saveButtonProps}>Save</SaveButton> */}
      </Form>
    </Spin>
  );
};
