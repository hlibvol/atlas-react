import { Icons } from "@pankod/refine-antd";

import { ApplicationURLForm, ApplicationURLList } from "pages/applicationUrl";
import { JobForm, JobList, JobShow } from "pages/jobs";
import { PlayBookShow, PlayBookForm, PlayBookList } from "pages/playbooks";
import { CourseForm, CourseList } from "pages/courses";

import { LessonForm, LessonList, LessonShow } from "pages/lessons";
import { UseCaseForm, UseCaseList } from "pages/useCases";

import { UsersList, UserShow, UsersCreate, UsersEdit } from "pages/users";
import { RoleForm, RoleList, RoleShow } from "pages/roles";
import { Resource } from "services/enums";

export const useResources = () => {
  return [
    {
      name: "user-management",
      icon: <Icons.UsergroupAddOutlined />,
      options: { label: "User Management" },
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
      name: Resource.ROLE,
      parentName: "user-management",
      list: RoleList,
      create: RoleForm,
      edit: RoleForm,
      show: RoleShow,
      options: { route: Resource.ROLE },
    },
    {
      name: Resource.USER,
      parentName: "user-management",
      list: UsersList,
      show: UserShow,
      create: UsersCreate,
      edit: UsersEdit,
      options: { route: Resource.USER },
    },
    {
      name: Resource.APPLICATION_URL,
      parentName: "jobs-design",
      list: ApplicationURLList,
      create: ApplicationURLForm,
      edit: ApplicationURLForm,
      options: { route: Resource.APPLICATION_URL },
    },
    {
      name: Resource.JOB,
      parentName: "jobs-design",
      list: JobList,
      create: JobForm,
      edit: JobForm,
      show: JobShow,
      options: { route: Resource.JOB },
    },
    {
      name: Resource.PLAYBOOK,
      parentName: "play-design",
      list: PlayBookList,
      create: PlayBookForm,
      edit: PlayBookForm,
      show: PlayBookShow,
      options: { route: Resource.PLAYBOOK },
    },
    {
      name: Resource.COURSE,
      parentName: "learning-design",
      list: CourseList,
      create: CourseForm,
      edit: CourseForm,
      options: { route: Resource.COURSE },
    },
    {
      name: Resource.LESSON,
      parentName: "learning-design",
      list: LessonList,
      create: LessonForm,
      edit: LessonForm,
      show: LessonShow,
      options: { label: "Lesson Templates", route: Resource.LESSON },
    },
    {
      name: Resource.USE_CASE,
      list: UseCaseList,
      create: UseCaseForm,
      edit: UseCaseForm,
      icon: <Icons.ReadOutlined />,
    },
  ];
};
