import SimpleDataProvider from "@pankod/refine-simple-rest";
import apiProvider from "./apiProvider";
import { API_URL } from "../constants";

export const dataProvider = {
  ...SimpleDataProvider(`${API_URL}/v1`, apiProvider),
  update: async ({ resource, id, variables }: any) => {
    const url = `${API_URL}/v1/${resource}/${id}`;
    const { data } = await apiProvider.put(url, variables);
    return {
      data,
    };
  },
};
