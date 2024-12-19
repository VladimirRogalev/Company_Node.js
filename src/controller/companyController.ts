import {EmployeeService} from "../services/EmployeeService";
import Employee from "../models/Employee";
import {eventEmitter} from "../events/eventEmitter";

export default class CompanyController {
    private employeeService: EmployeeService;

    constructor(employeeService: EmployeeService) {
        this.employeeService = employeeService;
    }

    getAllEmployees (){
        return this.employeeService.getAllEmployees();
    }

    async addEmployee(employeeDto: unknown) {
        const employee= this.employeeService.addEmployee(employeeDto as Employee);
        employee&& eventEmitter.emit('userAdded', (employeeDto as Employee).name)
        return employee ;
    }

    async deleteEmployee(employeeDto: unknown) {
        const victim = this.employeeService.deleteEmployee((employeeDto as { id: number }).id)!;
        eventEmitter.emit('UserDeleted', victim.name);
        return victim;
    }
}