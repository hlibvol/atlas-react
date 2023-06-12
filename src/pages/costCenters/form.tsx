import { Form, Input } from "antd";
import { BaseRecord, IResourceComponentsProps, useTranslate } from "@refinedev/core";

import { DrawerForm } from "components/Resource/form";
import { ICostCenter } from "interfaces";
import { Resource } from "services/enums";

export const CostCenterForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const renderFields = (costCenter: ICostCenter | BaseRecord) => {
    return [
      {
        field: (
          <Form.Item label={t("cost-centers.fields.hr_rate")} name='hr_rate'>
            <Input placeholder='Enter Hourly Rate' disabled={!!costCenter.source_id} />
          </Form.Item>
        ),
      },
    ];
  };
  return <DrawerForm renderFields={renderFields} resource={Resource.COST_CENTER} />;
};
