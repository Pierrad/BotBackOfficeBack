let paths = new Set(["/", "/users", "/files"]);

exports.isAuthorizedRoute = (req) => {
    return (paths.has("/"+req.originalUrl.split("/")[1]));
};

