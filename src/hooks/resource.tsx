import { Icons } from "@pankod/refine-antd";

import { ApplicationURLForm, ApplicationURLList } from "pages/applicationUrl";
import { JobForm, JobList } from "pages/jobs";
import { PlayBookList, PlaybookForm, PlayBookShow } from "pages/playbooks";
import { CourseForm, CourseList } from "pages/courses";

import { LessonForm, LessonList, LessonShow } from "pages/lessons";
import { UseCaseForm, UseCaseList } from "pages/useCases";

import { UsersList, UserForm } from "pages/users";
import { RoleForm, RoleList } from "pages/roles";
import { Resource } from "services/enums";
import { ScreenForm, ScreenList } from "pages/screens";

export const useResources = () => {
  return [
    {
      name: "organization-design",
      icon: <Icons.BankOutlined />,
      options: { label: "Org Design" },
    },
    {
      name: "jobs-design",
      icon: <Icons.LinkOutlined />,
      options: { label: "Jobs Design" },
    },
    {
      name: "play-design",
      icon: <Icons.ReadOutlined />,
      options: { label: "Play Design" },
    },
    {
      name: "learning-design",
      icon: <Icons.BookOutlined />,
      options: { label: "Learning Design" },
    },
    {
      name: Resource.PORTFOLIOS,
      parentName: "organization-design",
      list: RoleList,
      form: <RoleForm />,
      hasDefaultFields: true,
      options: { route: Resource.PORTFOLIOS },
    },
    {
      name: Resource.TOFTS,
      parentName: "organization-design",
      list: RoleList,
      form: <RoleForm />,
      hasDefaultFields: true,
      options: { route: Resource.TOFTS },
    },
    {
      name: Resource.TEAMS,
      parentName: "organization-design",
      list: RoleList,
      form: <RoleForm />,
      hasDefaultFields: true,
      options: { route: Resource.TEAMS },
    },
    {
      name: Resource.COST_CENTER,
      parentName: "organization-design",
      list: RoleList,
      form: <RoleForm />,
      hasDefaultFields: true,
      options: { route: Resource.COST_CENTER },
    },
    {
      name: Resource.ROLE,
      parentName: "organization-design",
      list: RoleList,
      form: <RoleForm />,
      hasDefaultFields: true,
      options: { route: Resource.ROLE },
      hasJobs: true,
      hasUseCases: true,
      hasPlaybook: true,
    },
    {
      name: Resource.USER,
      parentName: "organization-design",
      list: UsersList,
      form: <UserForm />,
      hasDefaultFields: false,
      options: { route: Resource.USER },
    },
    {
      name: Resource.APPLICATION_URL,
      parentName: "jobs-design",
      form: <ApplicationURLForm />,
      list: ApplicationURLList,
      options: { route: Resource.APPLICATION_URL },
      hasDefaultFields: true,
      hasJobs: true,
    },
    {
      name: Resource.JOB,
      parentName: "jobs-design",
      list: JobList,
      form: <JobForm />,
      options: { route: Resource.JOB },
      hasDefaultFields: true,
      hasRoles: true,
      hasUseCases: true,
      hasScreen: true,
      hasExcutive: true,
    },
    {
      name: Resource.PLAYBOOK,
      parentName: "play-design",
      list: PlayBookList,
      form: <PlaybookForm />,
      show: PlayBookShow,
      options: { route: Resource.PLAYBOOK },
      hasDefaultFields: true,
      hasRoles: true,
      previewButton: true,
      designerButton: true,
    },
    {
      name: Resource.COURSE,
      parentName: "learning-design",
      list: CourseList,
      form: <CourseForm />,
      hasDefaultFields: true,
      options: { route: Resource.COURSE },
    },
    {
      name: Resource.LESSON,
      parentName: "learning-design",
      list: LessonList,
      form: <LessonForm />,
      show: LessonShow,
      hasDefaultFields: true,
      options: { label: "Lesson Templates", route: Resource.LESSON },
      previewButton: true,
      designerButton: true,
    },
    {
      name: Resource.USE_CASE,
      list: UseCaseList,
      form: <UseCaseForm />,
      icon: <Icons.ReadOutlined />,
      options: { route: Resource.USE_CASE },
      hasDefaultFields: true,
      roleJobsMatrix: true,
    },
    {
      name: Resource.SCREEN,
      list: ScreenList,
      form: <ScreenForm />,
      options: { route: Resource.SCREEN, label: "Screens" },
      hasDefaultFields: true,
      icon: <Icons.FundProjectionScreenOutlined />,
      hasJobs: true,
    },
  ];
};
