import { useMemo, useState } from 'react';
import { useApiUrl, useCustom, useTranslate } from '@pankod/refine-core';
import { Typography, DatePicker, NumberField } from '@pankod/refine-antd';

import { IJobs } from 'interfaces';
import './style.less';

export const TotalJobs: React.FC = () => {
  const t = useTranslate();
  const API_URL = useApiUrl();

  const url = `${API_URL}/jobs`;
  const { data, isLoading } = useCustom<{
    data: IJobs[];
    total: number;
    trend: number;
  }>({
    url,
    method: 'get',
  });

  return (
    <div className="daily-revenue-wrapper">
      <div className="title-area">
        <div className="title-area__amount">
          <Typography.Title level={3}>
            {t('dashboard.totalJobs.title')}
          </Typography.Title>
          <div className="title-area__number">
            <NumberField
              style={{ fontSize: 36 }}
              strong
              value={data?.data.total ?? 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
