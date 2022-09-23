import SimpleDataProvider from '@pankod/refine-simple-rest';
import apiProvider from './apiProvider';
import { Config } from '../config';

export const dataProvider = {
  ...SimpleDataProvider(`${Config.apiEndpoint}/v1`, apiProvider),
  update: async ({ resource, id, variables }: any) => {
    const url = `${Config.apiEndpoint}/v1/${resource}/${id}`;
    const { data } = await apiProvider.put(url, variables);
    return {
      data,
    };
  },
};
