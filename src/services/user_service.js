import db from "../config/db";
import checkValidService from './check_valid_service'

const getAllUser = async () => {
    try {
        const sql = "select userid,lastname,firstname,username,email,phone,sex,groupid,created_at FROM users";

        const [data, fields] = await db.query(sql);

        if (data) {
            return {
                EM: "Get data success.",
                EC: 0,
                DT: data,
            };
        } else {
            return {
                EM: "Get data fail.",
                EC: 1,
                DT: [],
            };
        }

    } catch (error) {
        console.log(error);

        return {
            EM: "Some thing went wrong in service ...",
            EC: -2,
        };
    }
}

const createNewUser = async (rawData) => {
    try {
        // Check email exist
        let isEmailExist = await checkValidService.checkEmailExist(rawData.email);

        if (isEmailExist) {
            return {
                EM: "The email is already exist",
                EC: 1,
                DT: "email",
            };
        }

        // Hass password
        const hassPass = checkValidService.hashPassword(rawData.password);

        const sql =
            "insert into `users`(`lastname`, `firstname`,`username`,`email`,`phone`,`password`,`sex`,`groupid`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        const values = [rawData.lastName, rawData.firstName, rawData.userName, rawData.email, rawData.phone, hassPass, rawData.sex, rawData.groupId,];

        const [data, fields] = await db.query(sql, values);

        if (data) {
            return {
                EM: "New user created successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {
                EM: "Creating a new user failed",
                EC: 2,
                DT: [],
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


const updateUser = async (rawData) => {
    try {

        const sql = "update users set lastname = ?,firstname = ?,sex = ?,groupid = ? where userid = ?";

        const values = [rawData.lastName, rawData.firstName, rawData.sex, rawData.groupId, rawData.userId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "A user updated successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {

                EM: "Updated a new user failed",
                EC: 2,
                DT: [],
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
    getAllUser,
    createNewUser,
    updateUser,
};
