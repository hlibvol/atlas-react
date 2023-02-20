import React from "react";

import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Button, Form, Select, useSelect } from "@pankod/refine-antd";

import { DrawerForm } from "components/resource/form";
import { IPlayBook, IRole } from "interfaces";
import { Action, Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";

export const PlaybookForm: React.FC<IResourceComponentsProps> = () => {
  const { action, itemId, activeField } = useAppSelector((state) => state.drawer);
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

  const footer =
    itemId && action === Action.EDIT ? (
      <Button href={`/editor/${resource}/${itemId}`} target='_blank'>
        Open Designer
      </Button>
    ) : null;

  return (
    <DrawerForm resource={resource} renderFields={renderFields} footer={footer} hasDefaultColumns />
  );
};
