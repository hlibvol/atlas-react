import { IResourceComponentsProps, useShow, useTranslate } from '@pankod/refine-core';

import {
  Edit,
  Form,
  useForm,
  Row,
  Col,
  Typography,
  Card,
  Button,
  SaveButton,
  Show,
} from '@pankod/refine-antd';

const { Text } = Typography;

import { IPlayBook } from 'interfaces';
import { Editor } from 'components/designer/editor';

export const PlayBookDesign: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { queryResult: playbookQueryResult } = useShow<IPlayBook>();
  const playbook = playbookQueryResult.data?.data;
  const source_id = playbook?.id;

  return (
    <Show title={playbook?.name} headerButtons={() => <></>}>
      <Row gutter={20} wrap>
        <Col xs={24} lg={24}>
          <Card style={{ height: '100%' }}>
            {source_id ? <Editor source='playbooks' source_id={source_id} /> : null}
          </Card>
        </Col>
      </Row>
    </Show>
  );
};
