import {EventEmitter} from "node:events";

export const eventEmitter = new EventEmitter();

eventEmitter.on('userAdded', (employee: string, userCity: string) => {
    console.log(`${employee} is added`);
});

eventEmitter.on('UserDeleted',(employee: string)=>{
    console.log(`${employee} is deleted`);
})
eventEmitter.on('error',err => console.error())