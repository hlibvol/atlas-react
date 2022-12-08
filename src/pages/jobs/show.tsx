import { IResourceComponentsProps, useShow, useGetIdentity } from '@pankod/refine-core';

import { Typography, TagField, Show, UrlField, Tag } from '@pankod/refine-antd';
import { PlayCircleOutlined, AntDesignOutlined } from '@ant-design/icons';

import { IJob } from 'interfaces';

export const JobShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult: jobQueryResult } = useShow<IJob>();
  const { data, isLoading } = jobQueryResult;
  const job = data?.data;

  const { Title, Text } = Typography;
  const { data: user } = useGetIdentity();

  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        title: job?.name,
      }}
    >
      {!isLoading ? (
        <>
          <Title level={5}>Description</Title>
          <Text>
            <Text>{job?.description}</Text>
          </Text>

          <Title level={5}>Process Role</Title>
          <Text>
            {job?.roles.map((item, idx) => {
              return <TagField key={idx} color='blue' value={item.name}></TagField>;
            })}
          </Text>
          <Title level={5}>More options</Title>
          <Text>
            <Tag>
              <UrlField
                target='_blank'
                value={`ab:job/executor/${user?.id}/${job?.id}/${(Math.random() + 1)
                  .toString(36)
                  .substring(2)}`}
              >
                <PlayCircleOutlined />
                &nbsp;&nbsp;Execute Job
              </UrlField>
            </Tag>
            {user.is_designer ? (
              <Tag>
                <UrlField
                  target='_blank'
                  value={`ab:job/designer/${user?.id}/${job?.id}/${(Math.random() + 1)
                    .toString(36)
                    .substring(2)}`}
                >
                  <AntDesignOutlined />
                  &nbsp;&nbsp;Open Designer
                </UrlField>
              </Tag>
            ) : null}
          </Text>
        </>
      ) : null}
    </Show>
  );
};
