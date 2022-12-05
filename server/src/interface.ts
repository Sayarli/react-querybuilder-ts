interface IDatabase{
    createQuery: (query: any)=>any;
}

function convertSQL(database:IDatabase, query?: any){
    return database.createQuery(query);
}

export {IDatabase,convertSQL};