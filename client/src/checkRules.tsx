import { DataProps, RulesProps } from "./interface";

function checkRules(rule:RulesProps){
    console.log(rule)
    
    let query = ` MATCH `;
    //const labelLetter = data.label?data.label.charAt(0).toLowerCase():"n";
    const labelLetter = "n";
    console.log( `${labelLetter}.${rule.field} ${rule.operator} ${rule.value}\n`)
    return  `${labelLetter}.${rule.field} ${rule.operator} ${rule.value}\n `;



    // if(data.rules?.length === 0){
    //     if(!data.label){
    //         query += `(n) \n `;
    //     } 
    //     else{
    //         query += `(n:tbd)`
    //     }
        
        
    //     /*else{
    //         query += `(${labelLetter}:${data.label})\n `;
    //     }
    //     */
    // } 
    // else {
    //     query+=`(${labelLetter}:tbd)\n WHERE `
        
    //     const mergedRules = data.rules?.reduce((acc, rule:RulesProps) => {
    //         if(!rule.label){
    //             return acc + `${labelLetter}.${rule.field} ${rule.operator} ${rule.value}\n ${data.combinator?.toUpperCase()}  `;
    //         } else{
    //             return acc;
    //         }
    //         }, "");


    //     const finalMergedRules = mergedRules?.slice(0, -5);
    //     query += finalMergedRules;

    //     }

    //     query += `RETURN (${labelLetter?labelLetter:"n"})`
    // return query;
 
}

export default checkRules