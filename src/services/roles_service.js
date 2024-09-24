import db from "../config/db";

const getAllRoles = async () => {
    try {
        const sql = "select roleid, url, description created_at from roles";

        const [data, fields] = await db.query(sql);

        if (data) {
            return {
                EM: "Get roles success.",
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

const createNewRole = async (rawData) => {
    try {

        const sql =
            "insert into `roles`(`url`, `description`) value (?, ?)";

        const values = [rawData.url, rawData.description];

        const [data, fields] = await db.query(sql, values);

        if (data) {
            return {
                EM: "New role created successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {
                EM: "Creating a new role failed",
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

const deleteRole = async (rawData) => {
    try {
        const sql = "delete from roles where roleid = ? limit 1";

        const values = [rawData.roleId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "Delete role successfully",
                EC: 0,
                DT: rawData,
            };
        } else {

            return {
                EM: "Role not exist",
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


const updateRole = async (rawData) => {
    try {

        const sql = "update roles set url = ?,description = ? where roleid = ?";

        const values = [rawData.url, rawData.description, rawData.roleId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "A role updated successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {

                EM: "Updated a new role failed",
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
    getAllRoles,
    createNewRole,
    updateRole,
    deleteRole
};
