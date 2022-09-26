import {
  useTranslate,
  IResourceComponentsProps,
  useShow,
  useNavigation,
  HttpError,
  useList,
  useMany,
} from '@pankod/refine-core';

import {
  Card,
  Space,
  Row,
  Col,
  Grid,
  Typography,
  Table,
  TagField,
  TextField,
  Show,
  Title,
  Tag,
} from '@pankod/refine-antd';

import { IRole, IPlayBook } from 'interfaces';

const { useBreakpoint } = Grid;

export const PlayBookShow: React.FC<IResourceComponentsProps> = () => {
  const { xl } = useBreakpoint();
  const { queryResult: playbookQueryResult } = useShow<IPlayBook>();
  const playbook = playbookQueryResult.data?.data;

  const t = useTranslate();
  const { show } = useNavigation();
  const { Title, Text } = Typography;

  return (
    <Show>
      <Title level={5}>Title</Title>
      <Text>{playbook?.name}</Text>

      <Title level={5}>Description</Title>
      <Text>
        <Tag>{playbook?.description}</Tag>
      </Text>

      <Title level={5}>Process Role</Title>
      <Text>{playbook?.roles.map((role) => role.name).join(', ')}</Text>
    </Show>
  );
};
