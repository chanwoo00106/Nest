"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
let ItemsService = class ItemsService {
    constructor() {
        this.items = [
            {
                id: '645783563478',
                name: 'Item One',
                qty: 100,
                description: 'this is item one',
            },
            {
                id: '347860281545',
                name: 'Item Two',
                qty: 100,
                description: 'this is item two',
            },
        ];
    }
    findeAll() {
        return this.items;
    }
    findOne(id) {
        return this.items.find((i) => i.id === id);
    }
};
ItemsService = __decorate([
    (0, common_1.Injectable)()
], ItemsService);
exports.ItemsService = ItemsService;
//# sourceMappingURL=items.service.js.map