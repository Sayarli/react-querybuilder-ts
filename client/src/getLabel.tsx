
import {RuleGroupType} from "react-querybuilder";

function getLabel(queryCypher:RuleGroupType){

    console.log()
    if (queryCypher.rules.length > 0) {
        const field = (queryCypher.rules[0]).field;
        if(field =="order_id" || field == "order_priority"||field=="order_date"){
           return ("Order");
        }
        else if(field == "unit_sold" || field == "unit_price"||field == "unit_cost"){
            return("Unit");
        }
        else if(field == "total_revenue" || field == "total_cost" || field == "total_profit"){
            return("Total")
        }
      } 
}

export default getLabel