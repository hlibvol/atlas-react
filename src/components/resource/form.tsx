import React, { useEffect } from "react";
import _ from "lodash";
import {
  Form,
  useForm,
  Spin,
  SaveButton,
  Input,
  Button,
  useSelect,
  Select,
  Modal,
} from "@pankod/refine-antd";
import { Action, Resource } from "services/enums";
import { BaseRecord, GetOneResponse, useShow, useTranslate } from "@pankod/refine-core";
import {
  closeDrawer,
  openDrawer,
  removeActiveField,
  setDrawerFooter,
  setDrawerOnClose,
  setDrawerTitle,
} from "redux/slices/drawerSlice";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import RichTextEditor from "components/RichTextEditor";
import { useResources } from "hooks/resource";
import { IRole } from "interfaces";

/* Implicit save */
/*
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

  const handleChanges = () => {
    form
      .validateFields()
      .then((values) => {
        if (!_.isEqual(values, lastValues)) {
          setLastValues(values);
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
*/

export const useDefaultFormItems = (resource: string) => {
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
        />
      </Form.Item>
      <Form.Item label={t(`${resource}.fields.description`)} name='description'>
        {/* @ts-ignore */}
        <RichTextEditor
          placeholder={`Enter ${t(`${resource}.fields.description`)}..`}
          autoFocus={activeField === "description"}
          tabIndex={2}
        />
      </Form.Item>
    </>
  );
};

export const useRoleItem = () => {
  const { activeField } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: Resource.ROLE,
    optionLabel: "name",
    optionValue: "id",
  });
  return (
    <>
      <Form.Item label={t("playbooks.fields.process-role")} name='role_ids'>
        <Select
          {...roleSelectProps}
          // @ts-ignore
          filterOption={(input, option) => (option?.label ?? "").includes(input)}
          placeholder='Select roles'
          mode='multiple'
          autoFocus={activeField === "role_ids"}
          tabIndex={3}
        />
      </Form.Item>
    </>
  );
};

type DrawerFormProps = {
  resource: Resource;
  renderFields?: (record: BaseRecord) => JSX.Element;
  footer?: JSX.Element | null;
};

export const DrawerForm: React.FC<DrawerFormProps> = (props) => {
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const { resource, renderFields = () => null, footer } = props;

  const resources = useResources();
  const { hasDefaultFields, hasRoles } = resources.find((r) => r.name === resource) ?? {};

  const defaultFormItems = hasDefaultFields ? useDefaultFormItems(resource) : null;
  const roleFormItem = hasRoles ? useRoleItem() : null;

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
  const record = queryResult?.data?.data;

  useEffect(() => {
    if (record) dispatch(setDrawerTitle(record.name));
  }, [record]);

  formProps.onValuesChange = () => {
    const drawerOnClose = form.isFieldsTouched()
      ? () => {
          Modal.confirm({
            title: "Unsaved changes",
            content: "Are you sure you want to leave? You have unsaved changes.",
            onOk: () => {
              dispatch(closeDrawer());
            },
          });
        }
      : () => {
          dispatch(closeDrawer());
        };
    dispatch(setDrawerOnClose(drawerOnClose));
  };

  useEffect(() => {
    dispatch(
      setDrawerFooter(
        <>
          {footer}
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
        </>
      )
    );
  }, [formLoading]);

  return (
    <Spin spinning={formLoading}>
      <Form {...formProps} layout='vertical'>
        {defaultFormItems}
        {roleFormItem}
        {renderFields({})}
        {/* <SaveButton {...saveButtonProps}>Save</SaveButton> */}
      </Form>
    </Spin>
  );
};
