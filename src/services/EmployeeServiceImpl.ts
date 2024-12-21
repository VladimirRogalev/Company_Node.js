import {EmployeeService} from './EmployeeService';
import Employee from '../models/Employee';
import EmployeeRepository from '../dao/EmployeeRepository';

export class EmployeeServiceImpl implements EmployeeService {

    private employeeRepository: EmployeeRepository = new EmployeeRepository();
    private employees: Employee[] = [];


    getAllEmployees(): Employee[] {
        return this.employeeRepository.readAll();
    }

    addEmployee(employee: Employee): boolean {
        if (this.getAllEmployees().findIndex(elem => elem.id === employee.id) === -1) {
            this.employeeRepository.write(employee);
            return true;
        }
        return false;
    }

    deleteEmployee(id: number): Employee | null {
        let allEmployees = this.getAllEmployees();
        const index = this.getAllEmployees().findIndex(elem => elem.id === id);
        const victim = this.getAllEmployees().at(index) as Employee;
        if (index === -1) {
            return null;
        }
        allEmployees.splice(index, 1);
        this.employeeRepository.writeAll(allEmployees);
        return victim;
    }
}