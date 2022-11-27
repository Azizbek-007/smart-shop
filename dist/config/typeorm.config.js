"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.TypeOrmConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'sx48Bq3A68NvPun',
    database: 'smart_shop',
    autoLoadEntities: true,
    synchronize: true,
    cache: {
        duration: 30000
    }
};
//# sourceMappingURL=typeorm.config.js.map