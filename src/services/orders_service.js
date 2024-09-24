import db from "../config/db";

const getAllOrders = async () => {
    try {
        const sql =
            `select orders.orderId, users.userName,  order_status.orderStatusId, order_status.statusName, invoices.totalAmount, orders.created_at 
        from orders
        inner join users on users.userid = orders.userid
        inner join order_status on order_status.orderstatusid = orders.orderstatusid
        inner join invoices on invoices.orderid = orders.orderid`;

        const [data, fields] = await db.query(sql);

        if (data) {
            return {
                EM: "Get orders success.",
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

const createNewOrder = async (rawData) => {
    try {

        const sql =
            "insert into `orders`(`userid`,`orderstatusid`) value (?, ?)";

        const values = [rawData.userId, 2];

        const [data, fields] = await db.query(sql, values);

        if (data) {
            return {
                EM: "New order created successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {
                EM: "Creating a new order failed",
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

const deleteOrder = async (rawData) => {
    try {
        const sql = "delete from orders where orderid = ? limit 1";

        const values = [rawData.orderId];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "Delete order successfully",
                EC: 0,
                DT: rawData,
            };
        } else {

            return {
                EM: "Order not exist",
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


const updateOrder = async (rawData) => {
    try {

        const sql = "update orders set orderstatusid = ? where orderid = ?";

        const values = [rawData.orderstatusid, rawData.orderid];

        const [data, fields] = await db.query(sql, values);

        if (data.affectedRows > 0) {

            return {
                EM: "A order updated successfully",
                EC: 0,
                DT: rawData,
            };
        } else {
            return {

                EM: "Order a new product failed",
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
    getAllOrders,
    createNewOrder,
    deleteOrder,
    updateOrder
};
