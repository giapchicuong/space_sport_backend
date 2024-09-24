import db from "../config/db";

const getAllGroups = async () => {
    try {
        const sql = "select groupid, groupname, groupdescription, created_at FROM `groups`";

        const [data, fields] = await db.query(sql);

        if (data) {
            return {
                EM: "Get groups success.",
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

const createNewGroup = async (rawData) => {
    try {

        const sql =
            "insert into `groups`(`groupname`, `groupdescription`) value (?, ?)";

        const values = [rawData.groupName, rawData.groupDescription];

        const [data, fields] = await db.query(sql, values);

        if (data) {
            return {
                EM: "New group created successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {
                EM: "Creating a new group failed",
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

const deleteGroup = async (rawData) => {
    try {
        const sql = "delete from `groups` where groupid = ? limit 1";

        const values = [rawData.groupId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "Delete group successfully",
                EC: 0,
                DT: rawData,
            };
        } else {

            return {
                EM: "Group not exist",
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


const updateGroup = async (rawData) => {
    try {

        const sql = "update `groups` set groupname = ?,groupdescription = ? where groupid = ?";

        const values = [rawData.groupName, rawData.groupDescription, rawData.groupId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "A group updated successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {

                EM: "Updated a new group failed",
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
    getAllGroups,
    createNewGroup,
    updateGroup,
    deleteGroup
};
