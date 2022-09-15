import { Dayjs } from "dayjs";

export interface IOrderChart {
  count: number;
  status:
    | "waiting"
    | "ready"
    | "on the way"
    | "delivered"
    | "could not be delivered";
}

export interface IOrderTotalCount {
  total: number;
  totalDelivered: number;
}

export interface ISalesChart {
  date: string;
  title: "Order Count" | "Order Amount";
  value: number;
}

export interface IOrderStatus {
  id: number;
  text: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_designer: boolean;
  is_active: boolean;
  is_superuser: boolean;
  role_id: IRole;
  avatar: IFile[];
  address: IAddress[];
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

export interface IEvent {
  date: string;
  status: string;
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
  application_url_id: IAppUrl;
}

export interface ICourier {
  id: number;
  name: string;
  surname: string;
  email: string;
  gender: string;
  gsm: string;
  createdAt: string;
  accountNumber: string;
  licensePlate: string;
  address: string;
  avatar: IFile[];
  store: IStore;
}
export interface IOrder {
  id: number;
  user: IUser;
  createdAt: string;
  products: IProduct[];
  status: IOrderStatus;
  adress: IAddress;
  store: IStore;
  courier: ICourier;
  events: IEvent[];
  orderNumber: number;
  amount: number;
}

export interface IProduct {
  id: number;
  name: string;
  isActive: boolean;
  description: string;
  images: IFile[];
  createdAt: string;
  price: number;
  category: ICategory;
  stock: number;
}

export interface ICategory {
  id: number;
  title: string;
  isActive: boolean;
}

export interface IOrderFilterVariables {
  q?: string;
  store?: string;
  user?: string;
  createdAt?: [Dayjs, Dayjs];
  status?: string;
}

export interface IUserFilterVariables {
  q: string;
  status: boolean;
  is_active: boolean;
}

export interface ICourier {
  id: number;
  name: string;
  surname: string;
  gender: string;
  gsm: string;
  createdAt: string;
  isActive: boolean;
  avatar: IFile[];
}

export interface IReview {
  id: number;
  order: IOrder;
  user: IUser;
  star: number;
  createDate: string;
  status: "pending" | "approved" | "rejected";
  comment: string[];
}
