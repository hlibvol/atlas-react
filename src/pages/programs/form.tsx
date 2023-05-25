import { Col, Form, Input, Row, Select, Space, Typography, useSelect } from "@pankod/refine-antd";
import {
  BaseRecord,
  IResourceComponentsProps,
  useGetIdentity,
  useOne,
  useTranslate,
} from "@pankod/refine-core";

import { DrawerForm } from "components/Resource/form";
import { IPortfolio, IProgram, ITeams } from "interfaces";
import { useAppSelector } from "redux/hooks";
import { Action, Resource } from "services/enums";

export const ProgramForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const { data: user } = useGetIdentity();

  const { selectProps: teamSelectProps } = useSelect<ITeams>({
    resource: Resource.TEAM,
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: portfolioSelectProps } = useSelect<IPortfolio>({
    resource: Resource.PORTFOLIO,
    optionLabel: "name",
    optionValue: "id",
  });

  const { data } = useOne<IProgram>({
    resource: Resource.PROGRAM,
    id: Number(itemId),
  });

  const renderFields = (programTeam: IProgram | BaseRecord) => (
    <>
      <Form.Item label={t("programs.fields.associatedTeams")} name='team_id'>
        <Select
          {...teamSelectProps}
          placeholder='Select Teams'
          {...(programTeam.source_id ? { disabled: true } : null)}
        />
      </Form.Item>

      <Form.Item label={t("programs.fields.portfolio")} name='portfolio_id'>
        <Select
          {...portfolioSelectProps}
          placeholder='Select Parent Portfolio'
          {...(programTeam.source_id ? { disabled: true } : null)}
        />
      </Form.Item>

      {itemId && action === Action.EDIT ? (
        <Row>
          <Col span={11}>
            <Form.Item label={t("programs.fields.updated-by")} name='updated_by'>
              <Input placeholder='Updated By' disabled value={programTeam.updated_by} />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Form.Item label={t("programs.fields.created-by")} name='created_by'>
              <Input placeholder='Created By' disabled value={programTeam.created_by} />
            </Form.Item>
          </Col>
        </Row>
      ) : (
        <Col span={11}>
          <Typography>
            <pre>Created By: {user.name}</pre>
          </Typography>
          <Form.Item name='created_by'>
            <Input type='hidden' defaultValue='mysite' />
          </Form.Item>
        </Col>
      )}
    </>
  );
  return (
    <DrawerForm
      resource={Resource.PROGRAM}
      isExternal={data?.data.source_id}
      renderFields={renderFields}
    />
  );
};
