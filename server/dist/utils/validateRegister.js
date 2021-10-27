"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (options) => {
    if (options.clubName.length <= 2) {
        return [
            {
                field: "username",
                message: "the username must be longer than 2 characters",
            },
        ];
    }
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }
    if (options.password.length <= 3) {
        return [
            {
                field: "password",
                message: "the password must be longer than 3 characters",
            },
        ];
    }
    if (options.clubName.includes("@")) {
        return [
            {
                field: "username",
                message: "cannot include '@' sign",
            },
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map