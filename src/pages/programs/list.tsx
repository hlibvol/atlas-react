import { useTranslate, IResourceComponentsProps, BaseRecord } from "@pankod/refine-core";
import { Resource } from "services/enums";
import Drawer from "components/Resource/drawer";
import List from "components/Resource/list";
import { TagField, Typography } from "@pankod/refine-antd";

export const ProgramList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const columns = [
    {
      dataIndex: ["programs.source_id"],
      title: t("programs.fields.source"),
      render: (id: number, program: BaseRecord) => (
        <TagField
          color={program.source_id ? "cyan" : "green"}
          value={program.source_id ? t(`status.external`) : t(`status.internal`)}
        />
      ),
    },
    {
      dataIndex: "programs.id",
      title: t("programs.fields.updated-by"),
      width: 120,
      render: (id: number, program: BaseRecord) => (
        <>
          {program.updated_by ? (
            <Typography.Text>{program.updated_by}</Typography.Text>
          ) : (
            <Typography.Text type='secondary'>No Updated</Typography.Text>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <List columns={columns} resource={Resource.PROGRAMS} />
      <Drawer />
    </>
  );
};
