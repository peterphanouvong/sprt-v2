"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorDetailToObject = void 0;
const errorDetailToObject = (errorDetailString) => {
    const matches = errorDetailString.match(/\((.*?)\)/g);
    if (!matches)
        return null;
    return matches.map((s) => s.slice(1, s.length - 1));
};
exports.errorDetailToObject = errorDetailToObject;
//# sourceMappingURL=errorDetailToObject.js.map