import db from "../config/db";

const getAllCategories = async () => {
    try {
        const sql = "select categoryid, categoryname,description,image,created_at from categories";

        const [data, fields] = await db.query(sql);

        if (data) {
            return {
                EM: "Get categories success.",
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

const createNewCategory = async (rawData) => {
    try {

        const sql =
            "insert into `categories`(`categoryname`, `description`,`image`) value (?, ?, ?)";

        const values = [rawData.categoryName, rawData.desciption, rawData.image];

        const [data, fields] = await db.query(sql, values);

        if (data) {
            return {
                EM: "New category created successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {
                EM: "Creating a new category failed",
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

const deleteCategory = async (rawData) => {
    try {
        const sql = "delete from categories where categoryid = ? limit 1";

        const values = [rawData.categoryId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "Delete category successfully",
                EC: 0,
                DT: rawData,
            };
        } else {

            return {
                EM: "Category not exist",
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


const updateCategory = async (rawData) => {
    try {

        const sql = "update categories set categoryname = ?,description = ?,image = ? where categoryid = ?";

        const values = [rawData.categoryName, rawData.desciption, rawData.image, rawData.categoryId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "A category updated successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {

                EM: "Updated a new category failed",
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
    getAllCategories,
    createNewCategory,
    deleteCategory,
    updateCategory,
};
