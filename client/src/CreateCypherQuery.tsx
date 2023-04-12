import { DataProps, RulesProps } from "./interface";
import checkRules from "./checkRules";

function CreateCypherQuery(data:DataProps|RulesProps){
  let query = ""
  
  if(data.rules?.length === 0 || !data.rules){
    query += checkRules(data);
  }
  else{
    query += `\nWHERE `
    data.rules?.map((rule, index) => {
      
      query += `${(index > 0 && !rule.rules) ? data.combinator?.toUpperCase():""} ${CreateCypherQuery(rule)}`;
    })
      
    }
    console.log(query)
    return query
    
  }
export default CreateCypherQuery  