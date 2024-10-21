import { Ability } from "./ability";

export interface Card {
    name: string;
    power: number;
    extraPower: number;
    keywords: string[];
    ability?: Ability;
    image: string;
    minPowerBlock?: number;
}