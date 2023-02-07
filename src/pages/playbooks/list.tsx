import React from "react";
import { Resource } from "services/enums";
import ABResource from "components/resource";

import { ABDivider, HTMLContent, TagList } from "components/core";
import { IPlayBook, IRole } from "interfaces";
import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, Select, useSelect } from "@pankod/refine-antd";

export const PlayBookList: React.FC<IResourceComponentsProps> = () => {
  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: Resource.ROLE,
    optionLabel: "name",
    optionValue: "id",
  });
  const t = useTranslate();
  const columns = [
    {
      dataIndex: "roles",
      title: t("playbooks.fields.process-role"),
      render: (roles: IRole[]) => <TagList resource={Resource.ROLE} records={roles} />,
    },
  ];

  const renderFields = (playbook: IPlayBook | BaseRecord) => (
    <Form.Item label={t("playbooks.fields.process-role")} name='role_ids'>
      <Select
        {...roleSelectProps}
        // @ts-ignore
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        placeholder='Select roles'
        mode='multiple'
      />
    </Form.Item>
  );

  const renderShow = (playbook: IPlayBook | BaseRecord) => (
    <>
      <ABDivider>{t("playbooks.fields.description")}</ABDivider>
      {playbook?.description && <HTMLContent>{playbook.description}</HTMLContent>}

      <ABDivider>Associated Roles</ABDivider>
      {playbook?.roles && <TagList resource={Resource.ROLE} records={playbook.roles} />}
    </>
  );

  return (
    <ABResource
      columns={columns}
      resource={Resource.PLAYBOOK}
      renderShow={renderShow}
      renderFields={renderFields}
    />
  );
};
