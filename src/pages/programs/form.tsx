import { Col, Form, Input, Row, Tag, Typography } from "antd";
import {
  BaseRecord,
  IResourceComponentsProps,
  useGetIdentity,
  useTranslate,
} from "@refinedev/core";

import { DrawerForm } from "components/Resource/form";
import { IProgram, ITeam, IUser } from "interfaces";
import { useAppSelector } from "redux/hooks";
import { Action, Resource } from "services/enums";
import { SelectResource } from "components/Resource/select";

export const ProgramForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const { data: user } = useGetIdentity<IUser>();

  const renderFields = (program: IProgram | BaseRecord) => (
    <>
      <SelectResource resource={Resource.PORTFOLIO} name='portfolio_id' />

      <SelectResource resource={Resource.TEAM} name='team_id' />

      {itemId && action === Action.EDIT ? (
        <>
          <Row>
            <Col span={11}>
              <Form.Item label={t("programs.fields.updated_by_user")} name='updated_by_user'>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Form.Item label={t("programs.fields.created_by_user")} name='created_by_user'>
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
            <pre>Created By: {user?.first_name}</pre>
          </Typography>
        </Col>
      )}
    </>
  );
  return <DrawerForm resource={Resource.PROGRAM} renderFields={renderFields} />;
};
