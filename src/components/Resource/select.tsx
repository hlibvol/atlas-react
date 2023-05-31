import React from "react";
import { Form, useSelect, Select } from "@pankod/refine-antd";
import { DefaultOptionType } from "antd/lib/select";
import { Resource } from "services/enums";
import { BaseRecord, useTranslate } from "@pankod/refine-core";
import { useAppSelector } from "redux/hooks";

type ISelectProps = {
  resource: Resource;
  name: string;
  isMulti?: boolean;
  required?: boolean;
  options?: DefaultOptionType[];
  onChange?: () => void;
  placeholder?: string;
  label?: string;
};

export const SelectResource: React.FC<ISelectProps> = (props) => {
  const { resource, name, options, isMulti, onChange, required, label, placeholder } = props;
  const { activeField, resource: formResource } = useAppSelector((state) => state.drawer);
  const { selectProps } = useSelect<BaseRecord>({
    resource: resource,
    optionLabel: label ?? "name",
    optionValue: "id",
    queryOptions: {
      enabled: options ? false : true,
    },
  });
  const t = useTranslate();
  const filedLabel = t(`${formResource}.fields.${name}`);
  return (
    <>
      <Form.Item
        label={filedLabel}
        name={name}
        rules={[
          {
            required: required,
          },
        ]}
      >
        <Select
          {...selectProps}
          placeholder={placeholder ?? `Select ${filedLabel}`}
          mode={isMulti ? "multiple" : undefined}
          autoFocus={activeField === name}
          {...(onChange && { onChange })}
          {...(options && { options })}
        />
      </Form.Item>
    </>
  );
};
