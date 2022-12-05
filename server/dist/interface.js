"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSQL = void 0;
function convertSQL(database, query) {
    return database.createQuery(query);
}
exports.convertSQL = convertSQL;
