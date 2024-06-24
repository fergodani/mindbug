import { Ability } from "./ability";

export interface Card {
    name: string;
    power: number;
    keywords: string[];
    ability?: Ability;
    image: string;
    minPowerBlock?: number;
}