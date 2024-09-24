import db from "../config/db";

const getAllSuppliers = async () => {
    try {
        const sql = "select supplierid, companyname, contactname, contacttitle,address,city,phone, created_at from suppliers";

        const [data, fields] = await db.query(sql);

        if (data) {
            return {
                EM: "Get suppliers success.",
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

const createNewSupplier = async (rawData) => {
    try {

        const sql =
            "insert into `suppliers`(`companyname`, `contactname`, `contacttitle`, `address`, `city`, `phone`) value (?, ?, ?, ?, ?, ?)";

        const values = [rawData.companyName, rawData.contactName, rawData.contactTitle, rawData.address, rawData.city, rawData.phone];

        const [data, fields] = await db.query(sql, values);

        if (data) {
            return {
                EM: "New suppliers created successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {
                EM: "Creating a new suppliers failed",
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

const deleteSupplier = async (rawData) => {
    try {
        const sql = "delete from suppliers where supplierId = ? limit 1";

        const values = [rawData.supplierId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "Delete supplier successfully",
                EC: 0,
                DT: rawData,
            };
        } else {

            return {
                EM: "Supplier not exist",
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


const updateSupplier = async (rawData) => {
    try {

        const sql = "update suppliers set contactname = ?,contacttitle = ?,address = ?,city = ?,phone = ? where supplierId = ?";

        const values = [rawData.contactName, rawData.contactTitle, rawData.address, rawData.city, rawData.phone, rawData.supplierId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "A supplier updated successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {

                EM: "Updated a new supplier failed",
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
    getAllSuppliers,
    createNewSupplier,
    updateSupplier,
    deleteSupplier
};
