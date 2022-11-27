"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./config/typeorm.config");
const employees_module_1 = require("./employees/employees.module");
const category_module_1 = require("./category/category.module");
const product_module_1 = require("./product/product.module");
const currency_module_1 = require("./currency/currency.module");
const warehouse_module_1 = require("./warehouse/warehouse.module");
const clients_module_1 = require("./clients/clients.module");
const orders_module_1 = require("./orders/orders.module");
const consumptions_module_1 = require("./consumptions/consumptions.module");
const salary_module_1 = require("./salary/salary.module");
const payment_module_1 = require("./payment/payment.module");
const statistica_module_1 = require("./statistica/statistica.module");
const ingredients_module_1 = require("./ingredients/ingredients.module");
const branch_module_1 = require("./branch/branch.module");
const company_module_1 = require("./company/company.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.TypeOrmConfig),
            employees_module_1.EmployeesModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            currency_module_1.CurrencyModule,
            warehouse_module_1.WarehouseModule,
            clients_module_1.ClientsModule,
            orders_module_1.OrdersModule,
            consumptions_module_1.ConsumptionsModule,
            salary_module_1.SalaryModule,
            payment_module_1.PaymentModule,
            statistica_module_1.StatisticaModule,
            ingredients_module_1.IngredientsModule,
            branch_module_1.BranchModule,
            company_module_1.CompanyModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map