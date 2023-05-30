import { Col, Form, Input, Row, Select, Tag, Typography, useSelect } from "@pankod/refine-antd";
import {
  BaseRecord,
  IResourceComponentsProps,
  useGetIdentity,
  useTranslate,
} from "@pankod/refine-core";

import { DrawerForm } from "components/Resource/form";
import { IPortfolio, IProgram, ITeam } from "interfaces";
import { useAppSelector } from "redux/hooks";
import { Action, Resource } from "services/enums";

export const ProgramForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const { data: user } = useGetIdentity();

  const { selectProps: teamSelectProps } = useSelect<ITeam>({
    resource: Resource.TEAM,
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: portfolioSelectProps } = useSelect<IPortfolio>({
    resource: Resource.PORTFOLIO,
    optionLabel: "name",
    optionValue: "id",
  });

  const renderFields = (program: IProgram | BaseRecord) => (
    <>
      <Form.Item label={t("programs.fields.portfolio")} name='portfolio_id' required>
        <Select
          {...portfolioSelectProps}
          placeholder='Select Parent Portfolio'
          {...(program.source_id ? { disabled: true } : null)}
        />
      </Form.Item>

      <Form.Item label={t("programs.fields.programTeams")} name='team_id'>
        <Select
          {...teamSelectProps}
          placeholder='Select Teams'
          {...(program.source_id ? { disabled: true } : null)}
        />
      </Form.Item>

      {itemId && action === Action.EDIT ? (
        <>
          <Row>
            <Col span={11}>
              <Form.Item label={t("programs.fields.updated-by")} name='updated_by'>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Form.Item label={t("programs.fields.created-by")} name='created_by'>
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <>
            <h4 style={{ fontWeight: "bold" }}>Associated Teams</h4>
            {program?.teams?.map((team: ITeam) => {
              return (
                <Tag color='default' style={{ fontSize: "13px" }}>
                  {team.name}
                </Tag>
              );
            })}
          </>
        </>
      ) : (
        <Col span={11}>
          <Typography>
            <pre>Created By: {user.name}</pre>
          </Typography>
        </Col>
      )}
    </>
  );
  return <DrawerForm resource={Resource.PROGRAM} renderFields={renderFields} />;
};
