import bcrypt from "bcryptjs";
import db from "../config/db";
var salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {

    var hash = bcrypt.hashSync(password, salt);

    return hash;
};

const checkPassword = (password, hashPassword) => {

    return bcrypt.compareSync(password, hashPassword);
};

const checkEmailExist = async (email) => {
    try {

        const sql = "select * from users where email=?";

        const values = [email];

        const [user, fields] = await db.query(sql, values);

        if (user.length !== 0) {

            console.log(user);

            return true;
        }

        return false;
    } catch (error) {

        console.log(error);

        return {
            EM: "Some thing went wrong in service ...",
            EC: -2,
        };
    }
};

module.exports = {
    hashPassword,
    checkPassword,
    checkEmailExist,
};
