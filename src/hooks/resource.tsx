import {
  BankOutlined,
  LinkOutlined,
  ReadOutlined,
  BookOutlined,
  FundProjectionScreenOutlined,
  TeamOutlined,
  ApartmentOutlined,
  TableOutlined,
} from "@ant-design/icons";

import { ApplicationURLForm, ApplicationURLList } from "pages/applicationUrl";
import { JobForm, JobList } from "pages/jobs";
import { PlayBookList, PlaybookForm, PlayBookShow } from "pages/playbooks";
import { CourseForm, CourseList } from "pages/courses";

import { LessonForm, LessonList, LessonShow } from "pages/lessons";
import { UseCaseForm, UseCaseList } from "pages/useCases";

import { UsersList, UserForm } from "pages/users";
import { RoleForm, RoleList } from "pages/roles";
import { ProgramForm, ProgramList } from "pages/programs";
import { Resource } from "services/enums";
import { ScreenForm, ScreenList } from "pages/screens";
import { CostCenterForm, CostCenterList } from "pages/costCenters";
import { PortfolioForm, PortfolioList } from "pages/portfolios";

export const useResources = () => {
  return [
    {
      name: "organization-design",
      meta: { label: "Org Design", icon: <BankOutlined rev={undefined} /> },
    },
    {
      name: "jobs-design",
      meta: { label: "Jobs Design", icon: <LinkOutlined rev={undefined} /> },
    },
    {
      name: "play-design",
      meta: { label: "Play Design", icon: <ReadOutlined rev={undefined} /> },
    },
    {
      name: "learning-design",
      meta: { label: "Learning Design", icon: <BookOutlined rev={undefined} /> },
    },
    {
      name: Resource.PORTFOLIO,
      parentName: "organization-design",
      list: PortfolioList,
      form: PortfolioForm,
      hasDefaultFields: true,
      meta: { route: Resource.PORTFOLIO },
      tabs: [{ name: "Associated Data", icon: ApartmentOutlined }],
    },
    {
      name: Resource.PROGRAM,
      parentName: "organization-design",
      list: ProgramList,
      form: ProgramForm,
      hasDefaultFields: true,
      meta: { route: Resource.PROGRAM },
      tabs: [{ name: "Associated Data", icon: ApartmentOutlined }],
    },
    {
      name: Resource.TEAM,
      parentName: "organization-design",
      list: RoleList,
      form: RoleForm,
      hasDefaultFields: true,
      meta: { route: Resource.TEAM },
    },
    {
      name: Resource.COST_CENTER,
      parentName: "organization-design",
      list: CostCenterList,
      form: CostCenterForm,
      hasDefaultFields: true,
      meta: { route: Resource.COST_CENTER },
    },
    {
      name: Resource.ROLE,
      parentName: "organization-design",
      list: RoleList,
      form: RoleForm,
      hasDefaultFields: true,
      meta: { route: Resource.ROLE },
      tabs: [{ name: "Associated Data", icon: ApartmentOutlined }],
    },
    {
      name: Resource.USER,
      parentName: "organization-design",
      list: UsersList,
      form: UserForm,
      hasDefaultFields: false,
      meta: { route: Resource.USER },
    },
    {
      name: Resource.APPLICATION_URL,
      parentName: "jobs-design",
      form: ApplicationURLForm,
      list: ApplicationURLList,
      meta: { route: Resource.APPLICATION_URL },
      hasDefaultFields: true,
      tabs: [{ name: "Associated Jobs", icon: TeamOutlined }],
    },
    {
      name: Resource.JOB,
      parentName: "jobs-design",
      list: JobList,
      form: JobForm,
      meta: { route: Resource.JOB },
      hasDefaultFields: true,
      tabs: [{ name: "Associated Data", icon: ApartmentOutlined }],
    },
    {
      name: Resource.PLAYBOOK,
      parentName: "play-design",
      list: PlayBookList,
      form: PlaybookForm,
      show: PlayBookShow,
      meta: { route: Resource.PLAYBOOK },
      hasDefaultFields: true,
      tabs: [{ name: "Associated Roles", icon: TeamOutlined }],
    },
    {
      name: Resource.COURSE,
      parentName: "learning-design",
      list: CourseList,
      form: CourseForm,
      hasDefaultFields: true,
      meta: { route: Resource.COURSE },
    },
    {
      name: Resource.LESSON,
      parentName: "learning-design",
      list: LessonList,
      form: LessonForm,
      show: LessonShow,
      hasDefaultFields: true,
      meta: { label: "Lesson Templates", route: Resource.LESSON },
    },
    {
      name: Resource.USE_CASE,
      list: UseCaseList,
      form: UseCaseForm,
      meta: { route: Resource.USE_CASE, icon: <ReadOutlined rev={undefined} /> },
      hasDefaultFields: true,
      tabs: [{ name: "Role - Job Matrix", icon: TableOutlined }],
    },
    {
      name: Resource.SCREEN,
      list: ScreenList,
      form: ScreenForm,
      meta: {
        route: Resource.SCREEN,
        label: "Screens",
        icon: <FundProjectionScreenOutlined rev={undefined} />,
      },
      hasDefaultFields: true,
    },
  ];
};
