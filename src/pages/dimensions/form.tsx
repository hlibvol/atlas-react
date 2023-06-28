import { Avatar, Card, Col, Form, List, Row, Select } from "antd";
import { BaseRecord, IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { DrawerForm } from "components/Resource/form";
import { IDimension, IQuestion } from "interfaces";
import { Resource } from "services/enums";
import { SelectResource } from "components/Resource/select";
import { useState } from "react";

export const DimensionForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const OPTIONS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filteredOptions = OPTIONS;

  const renderFields = (dimension: IDimension | BaseRecord) => {
    return [
      {
        tabKey: "2",
        field: (
          <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className='gutter-row' flex='1 1 100px'>
                <SelectResource resource={Resource.ASSESSMENT} name='assessment_id' />
                <Form.Item
                  name='baseline_value'
                  label={t("dimensions.fields.baseline_value")}
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder='Select Baseline'
                    value={selectedItems}
                    onChange={setSelectedItems}
                    style={{ width: "100%" }}
                    options={filteredOptions.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  name='ideal_value'
                  label={t("dimensions.fields.ideal_value")}
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder='Select Ideal Value'
                    value={selectedItems}
                    onChange={setSelectedItems}
                    style={{ width: "100%" }}
                    options={filteredOptions.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </Form.Item>
              </Col>
              {dimension?.questions?.length ? (
                <>
                  <Col className='gutter-row' flex='0 1 500px'>
                    <Card title={t("dimensions.fields.questions")}>
                      <List
                        itemLayout='horizontal'
                        dataSource={dimension?.questions}
                        renderItem={(item: IQuestion, index) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar>{index + 1}</Avatar>}
                              description={item.name}
                            />
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                </>
              ) : (
                <></>
              )}
            </Row>
          </>
        ),
      },
    ];
  };
  return <DrawerForm resource={Resource.DIMENSION} renderFields={renderFields} />;
};
