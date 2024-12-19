import * as fs from "node:fs";
import {NoParamCallback, ObjectEncodingOptions, PathOrFileDescriptor, WriteFileOptions} from "node:fs";
import {Abortable} from "node:events";
import Employee from '../models/Employee';

const EMPLOYEES_DATA_FILE= "db.txt";

export default class EmployeeRepository {
    private fsReadable:{
        (path: PathOrFileDescriptor, options: (({
            encoding?: null | undefined;
            flag?: string | undefined
        } & Abortable) | undefined | null), callback: (err: (NodeJS.ErrnoException | null), data: Buffer) => void): void;
        (path: PathOrFileDescriptor, options: (({
            encoding: BufferEncoding;
            flag?: string | undefined
        } & Abortable) | BufferEncoding), callback: (err: (NodeJS.ErrnoException | null), data: string) => void): void;
        (path: PathOrFileDescriptor, options: ((ObjectEncodingOptions & {
            flag?: string | undefined
        } & Abortable) | BufferEncoding | undefined | null), callback: (err: (NodeJS.ErrnoException | null), data: (string | Buffer)) => void): void;
        (path: PathOrFileDescriptor, callback: (err: (NodeJS.ErrnoException | null), data: Buffer) => void): void
    };
    private fsWritable:{
        (file: PathOrFileDescriptor, data: (string | NodeJS.ArrayBufferView), options: WriteFileOptions, callback: NoParamCallback): void;
        (path: PathOrFileDescriptor, data: (string | NodeJS.ArrayBufferView), callback: NoParamCallback): void
    };

    constructor() {
        this.fsReadable = fs.readFile;
        this.fsWritable = fs.writeFile;
    }

    // private path = "db.txt";


    read (callback :(err: Error| null, data: string) => void ):void {
    this.fsReadable(EMPLOYEES_DATA_FILE,'utf-8',callback);
    }


    write (employee: Employee) {
       this.fsWritable(this.path, JSON.stringify(employee)+'\n', () =>{})
    };

    writeAll (... employees: Employee[]) {
        this.fsWritable(EMPLOYEES_DATA_FILE, JSON.stringify(employees, null, 2), 'utf-8',()=>{})
    }
}