"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const mongoose_1 = require("mongoose");
const mongo_1 = require("./mongo");
const interface_1 = require("./interface");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const postresql_1 = require("./postresql");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const pg = (0, pg_promise_1.default)({});
exports.db = pg("postgres://postgres:12345@localhost:5432/sampledb?sslmode=disable");
//----------------------
(0, mongoose_1.connect)('mongodb://localhost/deneme-db');
app.use(express_1.default.static(path_1.default.join(__dirname, '/../../client/build')));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../../client/build/index.html'));
});
app.post('/api/sales', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.body;
    const mongoQuery = new mongo_1.Mongo(query);
    const postgreQuery = new postresql_1.PostgreSQL("sales", query, "order_id");
    let data = [];
    try {
        // const temp = convertSQL(mongoQuery);
        // console.log("MongoDB: "+JSON.stringify(temp));
        // data = await Deneme.find(temp);
        // -----------------------
        const temp2 = (0, interface_1.convertSQL)(postgreQuery);
        console.log("PostgreSQL: " + JSON.stringify(temp2));
        data = yield exports.db.any(temp2, postgreQuery.query.params);
    }
    catch (error) {
        console.log(error);
        res.json({ data: [], error });
        return;
    }
    res.json({ data, error: null });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server1 is running at https://localhost:${port}`);
});
