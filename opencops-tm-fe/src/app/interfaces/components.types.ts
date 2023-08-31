import { DateTime } from "luxon"

export interface Components{
    ComponentId:number
    ComponentName:string
    ComponentDescription:string
    ComponentStatus:number
    ComponentType:string
    ModifiedOn:DateTime
}