"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dictionary = void 0;
class Dictionary {
    constructor() {
        this.items = {};
        this.count = 0;
    }
    ContainsKey(key) {
        return this.items.hasOwnProperty(key);
    }
    Count() {
        return this.count;
    }
    Add(key, value) {
        if (!this.items.hasOwnProperty(key))
            this.count++;
        this.items[key] = value;
    }
    Remove(key) {
        const val = this.items[key];
        delete this.items[key];
        this.count--;
        return val;
    }
    Item(key) {
        return this.items[key];
    }
    Keys() {
        const keySet = [];
        for (const prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }
        return keySet;
    }
    Values() {
        const values = [];
        for (const prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }
        return values;
    }
}
exports.Dictionary = Dictionary;
//# sourceMappingURL=Dictionary.js.map