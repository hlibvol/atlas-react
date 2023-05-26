import { Form, Input } from "@pankod/refine-antd";
import { BaseRecord, IResourceComponentsProps, useOne, useTranslate } from "@pankod/refine-core";

import { DrawerForm } from "components/Resource/form";
import { ICostCenter } from "interfaces";
import { useAppSelector } from "redux/hooks";
import { Resource } from "services/enums";

export const CostCenterForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { itemId } = useAppSelector((state) => state.drawer);
  const { data } = useOne<ICostCenter>({
    resource: Resource.PROGRAM,
    id: Number(itemId),
  });

  const renderFields = (costCenter: ICostCenter | BaseRecord) => (
    <>
      <Form.Item label={t("cost-centers.fields.hrRate")} name='hr_rate'>
        <Input
          placeholder='Enter Hourly Rate'
          {...(costCenter.source_id ? { disabled: true } : null)}
        />
      </Form.Item>
    </>
  );
  return (
    <DrawerForm
      renderFields={renderFields}
      isExternal={data?.data.source_id}
      resource={Resource.COST_CENTER}
    />
  );
};
