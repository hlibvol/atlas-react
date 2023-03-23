import { IResourceComponentsProps, useShow } from "@pankod/refine-core";
import { Show } from "@pankod/refine-antd";
import { IPlayBook } from "interfaces";

export const PlayBookShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult: playbookQueryResult } = useShow<IPlayBook>();
  const playbook = playbookQueryResult.data?.data;
  return (
    <Show title={playbook ? playbook.name + " (Preview)" : ""}>
      <h1>Hi</h1>
    </Show>
  );
};
