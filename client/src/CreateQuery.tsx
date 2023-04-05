import { DataProps, RulesProps } from "./interface";
import checkRules from "./checkRules";

function CreateQuery(data:DataProps|RulesProps){
  let query = ""
  const labelFound = data.rules?.some((rule) => rule.label);
  query = checkRules(data, labelFound? 1 : 0);

  if(labelFound && data.rules){
      const labelIndex = data.rules.findIndex((rule) => rule.label);
      query += CreateQuery(data.rules[labelIndex]);
      console.log(query)
    }
    return query
    
  }
export default CreateQuery  