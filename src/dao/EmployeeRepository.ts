import * as fs from 'node:fs';
import Employee from '../models/Employee';


export default class EmployeeRepository {
    private readonly filePath: string;

    constructor(filePath: string = './db.txt') {
        this.filePath = filePath;
    }


    readAll(): Employee[] {
        try {
            const res = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(res) as Employee[];
        } catch (err: any) {
            console.error(`Error -> ${err}`);
            return [];
        }
    }


    write(employee: Employee) {
        try {
            const employees = this.readAll();
            employees.push(employee);
            this.writeAll(employees);
            return true;
        } catch (err: any) {
            return false;
        }
    };

    writeAll(employees: Employee[]) {
        try {
            console.log(employees)
            const data = JSON.stringify(employees, null,2);
            fs.writeFileSync(this.filePath, data, 'utf-8');
            console.log('Success');
            return true;
        } catch (err: any) {
            console.log(err);
            return false;

        }
    }
}