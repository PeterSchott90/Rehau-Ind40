import { Machine } from "./machine";

export class Player {
    name: string;
    currentScore: number = 0;
    currentMoney: number = 100000;
    lightWeight: number = 0;
    midWeight: number = 0;
    proWeight: number = 0;
    groupId: number = undefined;
    playerId : number = undefined;
    role: string = undefined;
    machines: Machine[];
    brokenMachines: Machine[];
}