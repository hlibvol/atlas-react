import React from "react";
import { Form, useSelect, Select } from "@pankod/refine-antd";
import { Resource } from "services/enums";
import { useTranslate } from "@pankod/refine-core";
import { useAppSelector } from "redux/hooks";
import { IRole } from "interfaces";

type ISelectProps = {
  isMulti?: boolean;
};

export const RoleSelect: React.FC<ISelectProps> = ({ isMulti = true }) => {
  const { activeField, resource } = useAppSelector((state) => state.drawer);
  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: Resource.ROLE,
    optionLabel: "name",
    optionValue: "id",
  });
  const t = useTranslate();
  return (
    <>
      <Form.Item
        label={t(`${resource}.fields.process-role`)}
        name={isMulti ? "role_ids" : "role_id"}
      >
        <Select
          {...roleSelectProps}
          // @ts-ignore
          filterOption={(input, option) => (option?.label ?? "").includes(input)}
          placeholder={`Select role${isMulti ? "s" : ""}}`}
          mode={isMulti ? "multiple" : undefined}
          autoFocus={activeField === "role_ids"}
          tabIndex={3}
        />
      </Form.Item>
    </>
  );
};
