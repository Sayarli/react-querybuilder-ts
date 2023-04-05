export interface RulesProps{
    label?:string,
    combinator?:string,
    id?: string,
    field?: string,
    operator?: string,
    value?: any
    rules?: RulesProps[]
    
}

export interface DataProps{
    label?: string,
    combinator: string,
    rules: RulesProps[]
}