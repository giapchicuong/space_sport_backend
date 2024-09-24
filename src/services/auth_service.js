import db from '../config/db'
import checkValidService from './check_valid_service'
import JwtAction from '../middleware/jwt_action'

const registerService = async (rawData) => {
    try {
        // Check email exist
        let isEmailExist = await checkValidService.checkEmailExist(rawData.email);

        if (isEmailExist) {

            return {
                EM: "The email is already exist",
                EC: 1,
                DT: 'email',
            };
        }
        // Hass password
        const hassPass = checkValidService.hashPassword(rawData.password);

        const sql =
            "insert into `users`(`lastname`, `firstname`,`username`,`email`,`phone`,`password`,`sex`,`groupid`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        const values = [rawData.lastName, rawData.firstName, rawData.userName, rawData.email, rawData.phone, hassPass, rawData.sex, 3,];

        const [data, fields] = await db.query(sql, values);

        if (data) {

            return {
                EM: "A user is created successfully",
                EC: 0,
                DT: rawData,
            };
        } else {

            return {
                EM: "A user is created fail",
                EC: 1,
            };
        }
    } catch (error) {

        console.log(error);

        return {
            EM: "Some thing went wrong in service ...",
            EC: -2,
        };
    }
};

const loginService = async (rawData) => {
    try {
        const sql = "select * from users where email=?";

        const values = [rawData.email];

        const [datas, fields] = await db.query(sql, values);


        if (datas.length > 0) {

            const data = datas[0];

            const hashedPassword = data.Password;

            const isCorrectPassword = checkValidService.checkPassword(
                rawData.password,
                hashedPassword
            );

            if (isCorrectPassword) {

                const payload = {
                    email: data.Password,
                    groupId: data.GroupID,
                };

                let accessToken = JwtAction.createAccessJwt(payload);

                let refreshToken = JwtAction.createRefreshJwt(payload);

                return {
                    EM: "Login successfully",
                    EC: 0,
                    DT: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        email: data.Email,
                    },
                };
            } else {

                return {
                    EM: "Your email/phone number or password is incorrect!",
                    EC: 1,
                    DT: "",
                };
            }
        } else {

            return {
                EM: "Your email/phone number or password is incorrect!",
                EC: 1,
                DT: "",
            };
        }
    } catch (error) {

        console.log(error);

        return {
            EM: "Some thing went wrong in service ...",
            EC: -2,
        };
    }
};

module.exports = {
    registerService,
    loginService
};
