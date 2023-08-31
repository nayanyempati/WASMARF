import { HowTo } from "./howto.types"

export interface Countermeasures{
    CountermeasureId:number,
    CountermeasureName:string
    HowTo:HowTo,
    CountermeasurePriority:number,
    CountermeasureSolution:string,
    CountermeasureToken:StreamPipeOptions,
    custom:boolean

}