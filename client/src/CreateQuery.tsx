import { DataProps, RulesProps } from "./interface";
import checkRules from "./checkRules";

function CreateQuery(data:DataProps|RulesProps){
  let query = ""

  

  if(data.rules?.length === 0 || !data.rules){
    query += checkRules(data);
  }
  else{
    query += `\nWHERE `
    data.rules?.map((rule, index) => {
      
      query += `${(index > 0 && !rule.rules) ? data.combinator?.toUpperCase():""} ${CreateQuery(rule)}`;
    })
      
    }
    console.log(query)
    return query
    
  }
export default CreateQuery  