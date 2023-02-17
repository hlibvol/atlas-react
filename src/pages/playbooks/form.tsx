import React, { useEffect } from "react";

import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Button, Form, Select, useSelect } from "@pankod/refine-antd";

import { CreateForm, EditForm } from "components/resource/form";
import { IPlayBook, IRole } from "interfaces";
import { Action, Resource } from "services/enums";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import { setDrawerFooter } from "redux/slices/drawerSlice";

export const PlaybookForm: React.FC<IResourceComponentsProps> = () => {
  const { action, itemId, activeField } = useAppSelector((state) => state.drawer);
  const dispatch = useAppDispatch();
  const resource = Resource.PLAYBOOK;
  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: Resource.ROLE,
    optionLabel: "name",
    optionValue: "id",
  });
  const t = useTranslate();
  const renderFields = (playbook: IPlayBook | BaseRecord) => (
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
  );

  useEffect(() => {
    if (itemId && action === Action.EDIT) {
      const footer = (
        <Button href={`/editor/${resource}/${itemId}`} target='_blank' type='primary'>
          Open Designer
        </Button>
      );
      dispatch(setDrawerFooter(footer));
    }
  }, [itemId]);

  return (
    <>
      {action === Action.CREATE && (
        <CreateForm resource={resource} renderFields={renderFields} hasDefaultColumns />
      )}

      {action === Action.EDIT && (
        <EditForm
          itemId={itemId as number}
          resource={resource}
          renderFields={renderFields}
          hasDefaultColumns
        />
      )}
    </>
  );
};
