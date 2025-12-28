import { JSX } from "react/jsx-runtime";

export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

export interface MenuListItem {
  id: number;
  name: string;
  isPublished: boolean;
  isSystem: boolean;
}

// If you plan to fetch details with items later
export interface MenuItem {
  id: number;
  parentId: number | null;
  entityId: number | null;
  name: string;
  customLink: string;
  displayOrder: number;
}

export interface MenuDetails {
  map(arg0: (menuItem: any) => JSX.Element): import("react").ReactNode;
  id: number;
  name: string;
  isPublished: boolean;
  items: MenuItem[];
}