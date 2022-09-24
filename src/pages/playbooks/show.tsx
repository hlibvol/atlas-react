import {
  useTranslate,
  IResourceComponentsProps,
  useShow,
  useNavigation,
  HttpError,
  useList,
  useOne,
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

  // const { data: roles, isLoading } = useList<IRole>({
  //   resource: 'roles',
  // });

  const { data: roles, isLoading } = useOne<IRole>({
    resource: 'roles',
    id: playbook?.role_ids.id || '',
    queryOptions: {
      enabled: !!playbook?.role_ids.id,
    },
  });

  const t = useTranslate();
  const { show } = useNavigation();
  const { Title, Text } = Typography;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{playbook?.name}</Text>

      <Title level={5}>Description</Title>
      <Text>
        <Tag>{playbook?.description}</Tag>
      </Text>

      <Title level={5}>Process Role</Title>
      <Text>{roles?.data.name}</Text>
    </Show>
  );
};
