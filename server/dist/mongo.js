"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo = void 0;
const react_querybuilder_1 = require("react-querybuilder");
class Mongo {
    constructor(data) {
        var _a;
        this.dict = {
            $gt: ">",
            $lt: "<",
            $gte: ">=",
            $lte: "<=",
            $eq: "=",
            $ne: "!=",
        };
        this.data = (_a = JSON.parse((0, react_querybuilder_1.formatQuery)(data, "json"))) !== null && _a !== void 0 ? _a : null;
    }
    getObjKey(obj, value) {
        return Object.keys(obj).find(key => obj[key] === value);
    }
    createQuery(data = this.data) {
        let temp = { ["$" + data.combinator]: [] };
        for (let item of data.rules) {
            if (item.rules) {
                const sub = this.createQuery(item);
                temp["$" + data.combinator].push(sub);
            }
            else {
                temp["$" + data.combinator].push({ [item.field]: { [this.getObjKey(this.dict, item.operator)]: item.value } });
            }
        }
        return temp;
    }
}
exports.Mongo = Mongo;
