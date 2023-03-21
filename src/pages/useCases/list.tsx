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
  return (
    <>
      <List resource={Resource.USE_CASE} />
      <Drawer />
    </>
  );
};
