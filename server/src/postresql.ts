import { formatQuery } from "react-querybuilder";
import {IDatabase} from "./interface";

class PostgreSQL implements IDatabase {
    query : any;
    db : any;
    sort : any;

    constructor(db: any, query?: any, sort?: any) {
        this.query = formatQuery(query, "parameterized") ?? null;
        this.db = db;
        this.sort = sort ?? null;
    }

    processSQL(sql: any) : any {
        let i = 0;
        return sql
          .replace(/\?/g, () => {
            i++;
            return `$${i}`;
          })
          .replace(
            /\b(date|order_date|ship_date) (=|!=|<|>|<=|>=) (\$\d+)\b/gi,
            `$1 $2 $3::date`
          );
      };

    createQuery(data: any = this.query): any {
        const whereClause = this.processSQL(this.query.sql);
        const order = this.sort ? `ORDER BY ${this.sort}` : "";
        return `SELECT * FROM ${this.db} WHERE ${whereClause} `+ order;
        //Cypher Version
        //return `MATCH ${this.db.charAt(0).toLowerCase()}:${this.db} WHERE ${whereClause} + order`
    }
}

export { PostgreSQL };