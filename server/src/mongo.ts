import { formatQuery } from "react-querybuilder";
import {IDatabase} from "./interface";

class Mongo implements IDatabase {
    dict: any = {
        $gt: ">",
        $lt: "<",
        $gte: ">=",
        $lte: "<=",
        $eq: "=",
        $ne: "!=",
    };

    data : any;

    constructor(data?: any) {
        this.data = JSON.parse(formatQuery(data, "json")) ?? null;
    }

    getObjKey(obj: any, value: any): any {
        return Object.keys(obj).find(key => obj[key] === value);
    }

    createQuery(data: any = this.data): any {
        let temp: any = { ["$" + data.combinator]: [] };
        for (let item of data.rules) {
            if (item.rules) {
                const sub = this.createQuery(item);
                temp["$" + data.combinator].push(sub);
            }
            else {
                temp["$" + data.combinator].push({ [item.field]: { [this.getObjKey(this.dict, item.operator)]: item.value } });
            }
        }
        return temp
    }
}

export { Mongo };