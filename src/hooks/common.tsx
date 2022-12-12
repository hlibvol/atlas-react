import { Typography } from "@pankod/refine-antd";

export const usePanelHeader = (title: string, description = "") => {
  const { Text } = Typography;
  return (
    <Text strong>
      {title} &nbsp;<Text type='secondary'>{description}</Text>
    </Text>
  );
};
