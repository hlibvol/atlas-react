import { useTranslate, IResourceComponentsProps } from "@refinedev/core";
import { Resource } from "services/enums";
import List from "components/Resource/list";
import { TagField } from "@refinedev/antd";

export const TeamList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  return <List resource={Resource.TEAM} />;
};
