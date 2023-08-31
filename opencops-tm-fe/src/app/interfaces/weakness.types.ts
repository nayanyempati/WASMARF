import { Countermeasures } from "./countermeasures.types";

export interface Weakness
{
    WeaknessId: number;
    WeaknessName: string;
    WeaknessToken: string;
    WeaknessCwes: string;
    WeaknessRiskRating: string;
    Countermeasures:Countermeasures
    WeaknessDescription:string
    WeaknessCategory:string
}


