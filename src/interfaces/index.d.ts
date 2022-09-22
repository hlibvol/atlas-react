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
  status: "error" | "success" | "done" | "uploading" | "removed";
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
export interface IJobs {
  id: number;
  name: string;
  description: string;
  // applications: IAppUrl;
  application_url_id: { id: number };
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
  roles: IRole;
  page_content: string;
}
