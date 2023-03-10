import {
  useTranslate,
  IResourceComponentsProps,
  useNavigation,
  BaseRecord,
} from "@pankod/refine-core";
import { UrlField, Tag } from "@pankod/refine-antd";
import { Resource } from "services/enums";
import { IJob, IRole, IUseCase } from "interfaces";
import Drawer from "components/resource/drawer";
import List from "components/resource/list";

export const UseCaseList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { editUrl } = useNavigation();
  const columns = [
    {
      dataIndex: ["roles"],
      title: t("use-cases.fields.use-case-role"),
      render: (id: number, useCase: BaseRecord) => {
        return useCase.roles?.map((role: IRole) => (
          <Tag color='blue'>
            <UrlField value={editUrl(Resource.ROLE, role.id)}>{role.name}</UrlField>
          </Tag>
        ));
      },
    },
    {
      dataIndex: ["jobs"],
      title: t("use-cases.fields.use-case-job"),
      render: (id: number, useCase: BaseRecord) => {
        return useCase?.jobs.map((job: IJob) => (
          <Tag color='blue'>
            <UrlField value={editUrl(Resource.JOB, job.id)}>{job.name}</UrlField>
          </Tag>
        ));
      },
    },
  ];

  return (
    <>
      <List columns={columns} resource={Resource.USE_CASE} />
      <Drawer />
    </>
  );
};
