import { Icons } from "@pankod/refine-antd";

import { ApplicationURLCreate, ApplicationURLEdit, ApplicationURLList } from "pages/applicationUrl";
import { JobCreate, JobList, JobEdit, JobShow } from "pages/jobs";
import { PlayBookCreate, PlayBookDesign, PlayBookEdit, PlayBookList } from "pages/playbooks";
import { CourseCreate, CourseEdit, CourseList, CourseShow } from "pages/courses";

import { LessonCreate, LessonDesign, LessonEdit, LessonList } from "pages/lessons";
import { UseCaseCreate, UseCaseEdit, UseCaseList } from "pages/useCases";

import { UsersList, UserShow, UsersCreate, UsersEdit } from "pages/users";
import { RoleCreate, RoleList, RoleEdit } from "pages/roles";
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
      create: RoleCreate,
      edit: RoleEdit,
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
      create: ApplicationURLCreate,
      edit: ApplicationURLEdit,
      options: { route: Resource.APPLICATION_URL },
    },
    {
      name: Resource.JOB,
      parentName: "jobs-design",
      list: JobList,
      create: JobCreate,
      edit: JobEdit,
      show: JobShow,
      options: { route: Resource.JOB },
    },
    {
      name: Resource.PLAYBOOK,
      parentName: "play-design",
      list: PlayBookList,
      create: PlayBookCreate,
      edit: PlayBookEdit,
      show: PlayBookDesign,
      options: { route: Resource.PLAYBOOK },
    },
    {
      name: Resource.COURSE,
      parentName: "learning-design",
      list: CourseList,
      create: CourseCreate,
      edit: CourseEdit,
      options: { route: Resource.COURSE },
      show: CourseShow,
    },
    {
      name: Resource.LESSON,
      parentName: "learning-design",
      list: LessonList,
      create: LessonCreate,
      edit: LessonEdit,
      show: LessonDesign,
      options: { label: "Lesson Templates", route: Resource.LESSON },
    },
    {
      name: Resource.USE_CASE,
      list: UseCaseList,
      create: UseCaseCreate,
      edit: UseCaseEdit,
      icon: <Icons.ReadOutlined />,
    },
  ];
};
