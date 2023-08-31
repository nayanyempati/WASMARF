import { DateTime } from "luxon"

export interface Survey{
    SectionId:number
    SectionName:string
    SectionToken:string
    CreatedOn:DateTime
}