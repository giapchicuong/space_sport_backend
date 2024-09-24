import db from "../config/db";

const getAllProducts = async () => {
    try {
        const sql = "select productid, productname, unit, unitprice, image, categoryid, supplierid, created_at from products";

        const [data, fields] = await db.query(sql);

        if (data) {
            return {
                EM: "Get products success.",
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

const createNewProduct = async (rawData) => {
    try {

        const sql =
            "insert into `products`(`productname`, `unit`, `unitprice`, `image`, `categoryid`, `supplierid`) value (?, ?, ?, ?, ?, ?)";

        const values = [rawData.productName, rawData.unit, rawData.unitPrice, rawData.image, rawData.categoryId, rawData.supplierId];

        const [data, fields] = await db.query(sql, values);

        if (data) {
            return {
                EM: "New product created successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {
                EM: "Creating a new product failed",
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

const deleteProduct = async (rawData) => {
    try {
        const sql = "delete from products where productid = ? limit 1";

        const values = [rawData.productId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "Delete product successfully",
                EC: 0,
                DT: rawData,
            };
        } else {

            return {
                EM: "Product not exist",
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


const updateProduct = async (rawData) => {
    try {

        const sql = "update products set productname = ?,unitprice = ?,image = ?,categoryid = ?,supplierid = ? where productid = ?";

        const values = [rawData.productName, rawData.unitPrice, rawData.image, rawData.categoryId, rawData.supplierId, rawData.productId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "A product updated successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {

                EM: "Updated a new product failed",
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
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct
};
