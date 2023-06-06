import React from "react";
import { Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import legacyRouterProvider from "@refinedev/react-router-v6/legacy";
import { notificationProvider, ErrorComponent } from "@refinedev/antd";
import { ConfigProvider } from "antd";
import de_DE from "antd/lib/locale/de_DE";
import { authProvider, dataProvider } from "./services/providers";

import "styles/antd.less";

import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";
import { useTranslation } from "react-i18next";
import { useResources } from "hooks/resource";
import { useRoutes } from "hooks/routes";
import { Layout } from "components/Layouts";

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
          legacyRouterProvider={{
            ...legacyRouterProvider,
            routes: useRoutes(),
          }}
          dataProvider={dataProvider}
          legacyAuthProvider={authProvider()}
          i18nProvider={i18nProvider}
          DashboardPage={DashboardPage}
          LoginPage={() => <AuthPage type='login' />}
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
