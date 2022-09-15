import React, { useEffect } from "react";
import { Refine } from "@pankod/refine-core";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import routerProvider from "@pankod/refine-react-router-v6";
import {
  Icons,
  ConfigProvider,
  notificationProvider,
  Layout,
  ErrorComponent,
} from "@pankod/refine-antd";
import jsonServerDataProvider from "@pankod/refine-simple-rest";
import de_DE from "antd/lib/locale/de_DE";
import { authProvider } from "authProvider";
import axios, { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";

import "styles/antd.less";
import "dayjs/locale/de";

import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";
import { UsersList, UserShow, UsersCreate, UsersEdit } from "./pages/users";
import { RoleCreate, RoleList, RoleEdit } from "./pages/roles";
import { useTranslation } from "react-i18next";
import { Header, Title, OffLayoutArea } from "components";
import { BikeWhiteIcon, PizzaIcon } from "components/icons";

import { TOKEN_KEY, API_URL } from "./services/constants";
import {
  ApplicationURLCreate,
  ApplicationURLEdit,
  ApplicationURLList,
} from "pages/applicationUrl";
import { JobCreate, JobList } from "pages/jobs";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    if (request.headers) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      request.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return request;
});

const App: React.FC = () => {
  const dataProvider = jsonServerDataProvider(`${API_URL}/v1`, axiosInstance);

  // const dataProvider = {
  //   ...jsonServerDataProvider(`${API_URL}/v1`, axiosInstance),
  //   update: async ({ resource, id, variables }:any) => {
  //     const url = `${apiUrl}/${resource}/${id}`;

  //     const { data } = await httpClient.put(url, variables);

  //     return {
  //       data,
  //     };
  //   },
  // };

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const locale = i18nProvider.getLocale();

  useEffect(() => {
    if (locale === "de") {
      dayjs.locale("de");
    } else {
      dayjs.locale("en");
    }
  }, [locale]);

  return (
    <RefineKbarProvider>
      <ConfigProvider locale={locale === "de" ? de_DE : undefined}>
        <Refine
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                path: "/register",
                element: <AuthPage type="register" />,
              },
              {
                path: "/reset-password",
                element: <AuthPage type="resetPassword" />,
              },
              {
                path: "/update-password",
                element: <AuthPage type="updatePassword" />,
              },
            ],
          }}
          dataProvider={dataProvider}
          authProvider={authProvider(axiosInstance)}
          i18nProvider={i18nProvider}
          OffLayoutArea={OffLayoutArea}
          DashboardPage={DashboardPage}
          LoginPage={() => <AuthPage type="login" />}
          Title={Title}
          Header={Header}
          Layout={Layout}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
          resources={[
            {
              name: "roles",
              list: RoleList,
              create: RoleCreate,
              edit: RoleEdit,
            },
            {
              name: "users",
              list: UsersList,
              show: UserShow,
              create: UsersCreate,
              edit: UsersEdit,
              icon: <Icons.UsergroupAddOutlined />,
            },
            {
              name: "application-urls",
              list: ApplicationURLList,
              create: ApplicationURLCreate,
              edit: ApplicationURLEdit,
            },
            {
              name: "jobs",
              list: JobList,
              create: JobCreate,
              // edit: JobEdit,
            },
          ]}
          notificationProvider={notificationProvider}
          catchAll={<ErrorComponent />}
        />
      </ConfigProvider>
    </RefineKbarProvider>
  );
};

export default App;
