export type PageId =
  | "home"
  | "waybill"
  | "cargo"
  | "scod"
  | "wallet"
  | "account"
  | "about";

export type OrderStatus =
  | "Teslim Edildi"
  | "Yolda"
  | "Bekliyor"
  | "İptal"
  | "İade";

export interface NavItem {
  id: PageId;
  icon: string;
  label: string;
  badge?: string;
  badgeColor?: "default" | "green";
  submenu?: string[];
}

export interface StatCard {
  label: string;
  value: string;
  sub: string;
  icon: string;
  trend: number;
  iconColor?: "default" | "green" | "red" | "yellow" | "blue";
}

export interface Order {
  id: string;
  customer: string;
  address: string;
  cargo: string;
  amount: string;
  status: OrderStatus;
  date: string;
  barcode: string;
}

export interface CargoCompany {
  id: number;
  name: string;
  logo: string;
  price: string;
  scod: boolean;
  active: boolean;
  deliveryTime: string;
}

export interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: string;
  type: "in" | "out";
  method: string;
}

export interface PaymentMethod {
  id: string;
  icon: string;
  label: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  storeName: string;
  email: string;
  phone: string;
  address: string;
}

export interface SecurityOption {
  id: string;
  icon: string;
  label: string;
  description: string;
  type: "toggle" | "button";
}