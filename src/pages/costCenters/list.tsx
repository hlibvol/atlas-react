import { useTranslate, IResourceComponentsProps, BaseRecord } from "@pankod/refine-core";
import { Resource } from "services/enums";
import Drawer from "components/Resource/drawer";
import List from "components/Resource/list";
import { TagField, Typography } from "@pankod/refine-antd";

export const CostCenterList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const columns = [
    {
      dataIndex: ["costcenters.source_id"],
      title: t("cost-centers.fields.source"),
      render: (id: number, costcenter: BaseRecord) => (
        <TagField
          color={costcenter.source_id ? "cyan" : "green"}
          value={costcenter.source_id ? t(`status.external`) : t(`status.internal`)}
        />
      ),
    },
    {
      dataIndex: "costcenters.id",
      title: t("cost-centers.fields.updated-by"),
      width: 120,
      render: (id: number, costcenter: BaseRecord) => (
        <>
          {costcenter.updated_by ? (
            <Typography.Text>{costcenter.updated_by}</Typography.Text>
          ) : (
            <Typography.Text type='secondary'>No Updated</Typography.Text>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <List columns={columns} resource={Resource.COST_CENTER} />
      <Drawer />
    </>
  );
};
