import { DataProps, RulesProps } from "./interface";

function checkRules(data:DataProps|RulesProps, labelNumber:number){
    let query = ` MATCH `;
    const labelLetter = data.label?data.label.charAt(0).toLowerCase():"n";
    if(data.rules?.length === labelNumber){
        if(!data.label){
            query += `(n) \n `;
        } else{
            query += `(${labelLetter}:${data.label})\n `;
        }

    } 
    else if(data.rules?.length === labelNumber + 1)
    {
        query += `(${labelLetter}:${data.label})\n WHERE ${labelLetter}.${data.rules[0].field} ${data.rules[0].operator} ${data.rules[0].value}\n `
    } 
    else {
        query+=`(${labelLetter}:${data.label})\n WHERE `
        
        const mergedRules = data.rules?.reduce((acc, rule:RulesProps) => {
            if(!rule.label){
                return acc + `${labelLetter}.${rule.field} ${rule.operator} ${rule.value}\n ${data.combinator?.toUpperCase()}  `;
            } else{
                return acc;
            }
            }, "");


        const finalMergedRules = mergedRules?.slice(0, -5);
        query += finalMergedRules;

        }

        query += `RETURN (${labelLetter?labelLetter:"n"})`
        if(labelNumber === 1 && data.rules.length > 1){
            query += `\n UNION ALL\n `
        }
    return query;
 
}

export default checkRules