let paths = new Set(["/", "/users", "/bot"]);

exports.isAuthorizedRoute = (req) => {
    return (paths.has("/"+req.originalUrl.split("/")[1]));
};

