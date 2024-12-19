import {EmployeeService} from './EmployeeService';
import Employee from "../models/Employee";
import EmployeeRepository from '../dao/EmployeeRepository';
import {eventEmitter} from '../events/eventEmitter';

export class EmployeeServiceImpl implements EmployeeService {

    private employeeRepository: EmployeeRepository = new EmployeeRepository();
    private employees: Employee[] = [];
    constructor() {
        this.employeeRepository.read((err, data) => {
            if(err) {
                eventEmitter.emit("error", err)
            } else {
                this. employees = JSON.parse(data);
            }
        })
    }

    getAllEmployees(): Employee[] {
        return this.employees;
    }

    addEmployee(employee: Employee): boolean {
        if(this.employees.findIndex(elem => elem.id === employee.id) === -1){
            this.employees.push(employee);
            this.employeeRepository.writeAll(...this.employees);
            return true;
        }
        return false;
    }

    deleteEmployee(id: number): Employee | null {
        const index = this.employees.findIndex(elem => elem.id === id);
        const victim = this.employees.at(index) as Employee;
        if(index === -1) {
            return null;
        }
        this.employees.splice(index, 1)
        this.employeeRepository.writeAll(...this.employees);
        return victim;
    }
}