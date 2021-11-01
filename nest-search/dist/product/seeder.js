"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("@nestjs/mongoose");
const nestjs_seeder_1 = require("nestjs-seeder");
const product_entity_1 = require("./product.entity");
const product_seeder_1 = require("./product.seeder");
(0, nestjs_seeder_1.seeder)({
    imports: [
        mongoose_1.MongooseModule.forRoot('mongodb://localhost/nest_search'),
        mongoose_1.MongooseModule.forFeature([{ name: product_entity_1.Product.name, schema: product_entity_1.ProductSchema }]),
    ],
}).run([product_seeder_1.ProductSeeder]);
//# sourceMappingURL=seeder.js.map