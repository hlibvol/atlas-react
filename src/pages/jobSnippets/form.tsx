import { BaseRecord, IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Form, Input } from "antd";
import { DrawerForm } from "components/Resource/form";
import { IJobSnippets } from "interfaces";
import { Resource } from "services/enums";

export const JobSnippetsForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const renderFields = (user: IJobSnippets | BaseRecord) => {
    return [
      {
        tabKey: "1",
        field: (
          <>
            <Form.Item label={t("job-snippets.fields.steps")} name='steps'>
              <Input placeholder='Enter Steps' />
            </Form.Item>
          </>
        ),
      },
    ];
  };

  return <DrawerForm resource={Resource.JOB_SNIPPETS} renderFields={renderFields} />;
};
