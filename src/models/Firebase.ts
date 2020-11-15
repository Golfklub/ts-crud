import { Staff } from "./Staff";

export interface FirebaseContextInterface {
  getStaff: (id: string) => Promise<Staff>;
  getStaffList: () => Promise<Record<string, Staff>>;
  createStaff: (
    firstName: string,
    lastName: string,
    age: string,
    description: string
  ) => Promise<any>;
  editStaff: (
    id: string,
    firstName: string,
    lastName: string,
    age: string,
    description: string
  ) => Promise<any>;
  deleteStaff: (id: string) => Promise<any>;
}
