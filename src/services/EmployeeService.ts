import Employee from "../models/Employee";

export interface EmployeeService{
    getAllEmployees(): Employee[];
    addEmployee(employee: Employee): boolean;
    deleteEmployee(id: number): Employee | null;
}