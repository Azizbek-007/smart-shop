"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employees_module_1 = require("../employees/employees.module");
const categories_entity_1 = require("./categories.entity");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./category.service");
let CategoryModule = class CategoryModule {
};
CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([categories_entity_1.categories]), employees_module_1.EmployeesModule],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService]
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;
//# sourceMappingURL=category.module.js.map