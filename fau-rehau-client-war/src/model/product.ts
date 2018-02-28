import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { OrderAttribute } from '../model/order-attribute';

export class Product {
    type: string;
    ammount: number;
    status: string;
    pts: number;
    name: string;
    time: Date;
    currentProgress: number = 0;
    id: number;
    fauRehauAttributes: OrderAttribute[] = new Array<OrderAttribute>();

    constructor() {
        this.fauRehauAttributes.push(new OrderAttribute());
        this.fauRehauAttributes.push(new OrderAttribute());
        this.fauRehauAttributes.push(new OrderAttribute());
    }
}