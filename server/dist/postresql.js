"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQL = void 0;
const react_querybuilder_1 = require("react-querybuilder");
class PostgreSQL {
    constructor(db, query, sort) {
        var _a;
        this.query = (_a = (0, react_querybuilder_1.formatQuery)(query, "parameterized")) !== null && _a !== void 0 ? _a : null;
        this.db = db;
        this.sort = sort !== null && sort !== void 0 ? sort : null;
    }
    processSQL(sql) {
        let i = 0;
        return sql
            .replace(/\?/g, () => {
            i++;
            return `$${i}`;
        })
            .replace(/\b(date|order_date|ship_date) (=|!=|<|>|<=|>=) (\$\d+)\b/gi, `$1 $2 $3::date`);
    }
    ;
    createQuery(data = this.query) {
        const whereClause = this.processSQL(this.query.sql);
        const order = this.sort ? `ORDER BY ${this.sort}` : "";
        return `SELECT * FROM ${this.db} WHERE ${whereClause} ` + order;
    }
}
exports.PostgreSQL = PostgreSQL;
