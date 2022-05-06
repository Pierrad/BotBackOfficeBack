const crypto = require("crypto");

exports.generateId = (idLength) => {
    return crypto.randomBytes(idLength).toString("hex");
};
