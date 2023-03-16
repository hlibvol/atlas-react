import React from "react";
import { Refine } from "@pankod/refine-core";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import routerProvider from "@pankod/refine-react-router-v6";
import {
  ConfigProvider,
  notificationProvider,
  Layout,
  ErrorComponent,
  Collapse,
} from "@pankod/refine-antd";
import de_DE from "antd/lib/locale/de_DE";
import { authProvider, dataProvider } from "./services/providers";

import "styles/antd.less";

import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";
import { useTranslation } from "react-i18next";
import { Header, Title } from "components";
import { useResources } from "hooks/resource";
import { Editor } from "components/Editor-New";
import { CourseContent } from "components/course-content";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };
  const locale = i18nProvider.getLocale();

  return (
    <RefineKbarProvider>
      <ConfigProvider locale={locale === "de" ? de_DE : undefined}>
        <Refine
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                path: "/forgot-password",
                element: <AuthPage type='forgotPassword' />,
              },
              {
                path: "/update-password",
                element: <AuthPage type='updatePassword' />,
              },
              {
                path: "/editor/:resource/:itemId",
                element: <Editor />,
              },
              {
                path: "/courses/:itemId",
                element: <CourseContent />,
              },
            ],
          }}
          dataProvider={dataProvider}
          authProvider={authProvider()}
          i18nProvider={i18nProvider}
          DashboardPage={DashboardPage}
          LoginPage={() => <AuthPage type='login' />}
          Title={Title}
          Header={Header}
          Layout={Layout}
          options={{
            reactQuery: {
              devtoolConfig: false,
              clientConfig: {
                defaultOptions: {
                  queries: {
                    refetchOnWindowFocus: false,
                    refetchOnReconnect: false,
                    retry: false,
                  },
                },
              },
            },
            breadcrumb: false,
            redirect: {
              afterCreate: "edit",
              afterEdit: false,
            },
          }}
          resources={useResources()}
          notificationProvider={notificationProvider}
          catchAll={<ErrorComponent />}
        />
      </ConfigProvider>
    </RefineKbarProvider>
  );
};

export default App;
