import React from 'react';
import { Refine } from '@pankod/refine-core';
import { RefineKbarProvider } from '@pankod/refine-kbar';
import routerProvider from '@pankod/refine-react-router-v6';
import {
  Icons,
  ConfigProvider,
  notificationProvider,
  Layout,
  ErrorComponent,
} from '@pankod/refine-antd';
import de_DE from 'antd/lib/locale/de_DE';
import { authProvider, dataProvider } from './services/providers';

import 'styles/antd.less';

import { DashboardPage } from './pages/dashboard';
import { AuthPage } from './pages/auth';
import { UsersList, UserShow, UsersCreate, UsersEdit } from './pages/users';
import { RoleCreate, RoleList, RoleEdit } from './pages/roles';
import { useTranslation } from 'react-i18next';
import { Header, Title } from 'components';

import {
  ApplicationURLCreate,
  ApplicationURLEdit,
  ApplicationURLList,
} from './pages/applicationUrl';
import { JobCreate, JobList, JobEdit, JobShow } from './pages/jobs';
import {
  PlayBookCreate,
  PlayBookDesign,
  PlayBookEdit,
  PlayBookList,
} from './pages/playbooks';
import {
  CourseCreate,
  CourseEdit,
  CourseList,
  CourseShow,
} from 'pages/courses';

import {
  LessonCreate,
  LessonDesign,
  LessonEdit,
  LessonList,
} from './pages/lessons';

import { UseCaseCreate, UseCaseEdit, UseCaseList } from './pages/useCases';

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
      <ConfigProvider locale={locale === 'de' ? de_DE : undefined}>
        <Refine
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                path: '/register',
                element: <AuthPage type="register" />,
              },
              {
                path: '/reset-password',
                element: <AuthPage type="resetPassword" />,
              },
              {
                path: '/update-password',
                element: <AuthPage type="updatePassword" />,
              },
              {
                path: '/design-page',
                element: <AuthPage type="updatePassword" />,
              },
            ],
          }}
          dataProvider={dataProvider}
          authProvider={authProvider()}
          i18nProvider={i18nProvider}
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
              name: 'roles',
              list: RoleList,
              create: RoleCreate,
              edit: RoleEdit,
              icon: <Icons.TagsOutlined />,
            },
            {
              name: 'users',
              list: UsersList,
              show: UserShow,
              create: UsersCreate,
              edit: UsersEdit,
              icon: <Icons.UsergroupAddOutlined />,
            },
            {
              name: 'application-urls',
              list: ApplicationURLList,
              create: ApplicationURLCreate,
              edit: ApplicationURLEdit,
              icon: <Icons.LinkOutlined />,
            },
            {
              name: 'jobs',
              list: JobList,
              create: JobCreate,
              edit: JobEdit,
              show: JobShow,
              icon: <Icons.SolutionOutlined />,
            },
            {
              name: 'playbooks',
              list: PlayBookList,
              create: PlayBookCreate,
              edit: PlayBookEdit,
              show: PlayBookDesign,
              icon: <Icons.ReadOutlined />,
            },
            {
              name: 'courses',
              list: CourseList,
              create: CourseCreate,
              edit: CourseEdit,
              show: CourseShow,
              icon: <Icons.BookOutlined />,
            },
            {
              name: 'lessons',
              list: LessonList,
              create: LessonCreate,
              edit: LessonEdit,
              show: LessonDesign,
              icon: <Icons.ReadOutlined />,
            },
            {
              name: 'use-cases',
              list: UseCaseList,
              create: UseCaseCreate,
              edit: UseCaseEdit,
              icon: <Icons.ReadOutlined />,
            },
          ]}
          notificationProvider={notificationProvider}
          catchAll={<ErrorComponent />}
          reactQueryDevtoolConfig={false}
        />
      </ConfigProvider>
    </RefineKbarProvider>
  );
};

export default App;
