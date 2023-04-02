export interface IBaseResource {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  hashed_password: string;
  is_designer: boolean;
  is_active: boolean;
  is_superuser: boolean;
  role_id: number;
  avatar: IFile[];
  address: string;
}

export interface IAddress {
  text: string;
  coordinate: [string, string];
}

export interface IFile {
  name: string;
  percent: number;
  size: number;
  status: "error" | "success" | "done" | "uploading" | "removed";
  type: string;
  uid: string;
  url: string;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  job_ids: number[];
}
export interface IAppUrl {
  id: number;
  name: string;
  description: string;
  url: string;
  job_ids: Array[];
  application_type_id: number;
}
export interface IJob {
  id: number;
  name: string;
  description: string;
  roles: IRole[];
  role_ids: number[];
  application_url: IAppUrl;
  application_url_id: number;
  application_type_id: number;
  application_type: IAppType;
  is_template: boolean;
}
export interface IUserFilterVariables {
  q: string;
  status: boolean;
  is_active: boolean;
}

export interface IPlayBook {
  id: number;
  name: string;
  description: string;
  roles: IRole[];
  role_ids: number[];
  page_content: string;
}

export interface ICourseItem {
  id: number;
  item_id: number;
  item_order: number;
  item_title: string;
  item_type: string;
}

export interface ICourse {
  id: number;
  name: string;
  description: string;
  duration: string;
  items: ICourseItem[];
  enroll_required: boolean;
  passing_percentage: number;
}

export interface ILesson {
  id: number;
  name: string;
  description: string;
  duration: number;
  page_content: string;
  is_template: boolean;
}

export interface IUseCase {
  id: number;
  name: string;
  description: string;
  roles: IRole[];
  role_ids: number[];
  table_config: any;
  jobs: IJob[];
  job_ids: number[];
}

export interface IScreen {
  id: number;
  name: string;
  description: string;
  screen_url: string;
  application_type_id: number;
  application_type: IAppType;
}

export interface IAppType {
  id: number;
  name: string;
  description: string;
}
