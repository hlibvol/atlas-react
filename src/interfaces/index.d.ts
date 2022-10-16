export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  hashed_password: string;
  is_designer: boolean;
  is_active: boolean;
  is_superuser: boolean;
  role_id: IRole;
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
  status: 'error' | 'success' | 'done' | 'uploading' | 'removed';
  type: string;
  uid: string;
  url: string;
}

export interface IRole {
  id: number;
  name: string;
}
export interface IAppUrl {
  id: number;
  name: string;
  url: string;
}
export interface IJob {
  id: number;
  name: string;
  description: string;
  roles: IRole[];
  role_ids: number[];
  application_url: IAppUrl;
  application_url_id: number;
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

export interface ICourse {
  id: number;
  name: string;
  description: string;
  duration: string;
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
