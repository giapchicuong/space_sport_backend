require("dotenv").config();
import jwt from "jsonwebtoken";

const nonSecurePaths = [
    "/login",
    "/logout",
    "/register",
];

const createAccessJwt = (payload) => {
    let key = process.env.JWT_SECRET;

    let token = null;

    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        });

    } catch (error) {

        console.log(error);
    }
    return token;
};

const createRefreshJwt = (payload) => {

    let key = process.env.JWT_SECRET;

    let token = null;

    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });
    } catch (error) {

        console.log(error);
    }
    return token;
};

const verifyToken = (token) => {

    let key = process.env.JWT_SECRET;

    let decoded = null;
    try {

        decoded = jwt.verify(token, key);
    } catch (error) {

        if (error instanceof jwt.TokenExpiredError) {

            return "TokenExpiredError";
        }

        console.log(error);
    }
    return decoded;
};

const extractToken = (req) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {

        return req.headers.authorization.split(" ")[1];
    }

    return null;
};

const checkUserJwt = async (req, res, next) => {

    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;

    let tokenFromHeader = extractToken(req);

    if ((cookies && cookies.accessToken) || tokenFromHeader) {

        let accessToken = cookies.accessToken || tokenFromHeader;

        let decoded = verifyToken(accessToken);

        if (decoded && decoded !== "TokenExpiredError") {

            decoded.accessToken = accessToken;

            decoded.refreshToken = cookies.refreshToken;

            req.user = decoded;

            next();
        } else if (decoded && decoded === "TokenExpiredError") {

            if (cookies && cookies.refreshToken) {

                let data = await handleRefreshToken(cookies.refreshToken);

                let newAccessToken = data.newAccessToken;

                let newRefreshToken = data.newRefreshToken;

                if (newAccessToken && newRefreshToken) {

                    res.cookie("accessToken", newAccessToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "strict",
                        maxAge: 900 * 1000,
                    });

                    res.cookie("refreshToken", newRefreshToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "strict",
                        maxAge: 3600 * 1000,
                    });
                }
                return res.status(405).json({
                    EC: -1,
                    DT: "",
                    EM: "Need to retry with new token",
                });
            }
        } else {

            return res.status(401).json({
                EC: -1,
                DT: "",
                EM: "Verify token fail",
            });
        }
    } else {

        return res.status(401).json({
            EC: -1,
            DT: "",
            EM: "Not authenticated the user",
        });
    }
};

const handleRefreshToken = async (refreshToken) => {

    let newAccessToken = "";

    let newRefreshToken = "";

    let decoded = verifyToken(refreshToken);

    if (decoded) {

        let payload = {
            email: decoded.email,
            avatar: decoded.avatar,
            groupId: decoded.groupId,
        };

        newAccessToken = createAccessJwt(payload);

        newRefreshToken = createRefreshJwt(payload);
    }
    return { newAccessToken, newRefreshToken };
};

module.exports = {
    createAccessJwt,
    createRefreshJwt,
    verifyToken,
    checkUserJwt,
};
