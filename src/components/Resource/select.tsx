import React from "react";
import { Form, Select } from "antd";
import { useSelect } from "@refinedev/antd";
import { DefaultOptionType } from "antd/lib/select";
import { Resource } from "services/enums";
import { useTranslate } from "@refinedev/core";
import { useAppSelector } from "redux/hooks";

type ISelectProps = {
  resource: Resource;
  name: string;
  isMulti?: boolean;
  required?: boolean;
  disabledField?: boolean;
  options?: DefaultOptionType[];
  onChange?: () => void;
  placeholder?: string;
  label?: string;
};

export const SelectResource: React.FC<ISelectProps> = (props) => {
  const { resource, name, options, isMulti, onChange, required, placeholder, disabledField } =
    props;
  const { activeField, resource: formResource } = useAppSelector((state) => state.drawer);
  const { selectProps } = useSelect({
    resource: resource,
    optionLabel: resource == Resource.USER ? "first_name" : "name",
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
          {...(disabledField ? { disabled: true } : null)}
          autoFocus={activeField === name}
          {...(onChange && { onChange })}
          {...(options && { options })}
        />
      </Form.Item>
    </>
  );
};
