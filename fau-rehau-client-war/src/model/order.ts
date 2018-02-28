export class Order {
    name: string;
    customer: string;
    ammount: number ;
    bonus:number = 0;
    lightWeight: number = 0;
    midWeight: number = 0;
    proWeight: number = 0;
    pts: number;

    constructor(lightWeight: number, midWeight: number, proWeight: number) {
        this.pts = lightWeight * 10 + midWeight * 20 + proWeight * 30;
        this.lightWeight = lightWeight;
        this.midWeight = midWeight;
        this.proWeight = proWeight;
    }
}