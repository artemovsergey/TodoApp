import { IBase } from "./base";

export interface Priority extends IBase {
    title:string,
    color:string 
}

export enum PriorityEnum{
    low,
    middle,
    senior
}
