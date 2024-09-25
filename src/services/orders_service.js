import db from "../config/db";
import orderDetailsService from './order_details_service'
import invoicesService from './invoices_service'
import invoicesDetailsService from './invoice_details_service'

const getAllOrders = async () => {
    try {
        const sql =
            `select orders.orderId, users.userName,  order_status.orderStatusId, order_status.statusName, invoices.totalAmount, payment_method.paymentMethodId,payment_method.methodName, orders.created_at from orders
            left join users on users.userid = orders.userid
            left join order_status on order_status.orderstatusid = orders.orderstatusid
            left join invoices on invoices.orderid = orders.orderid
            left join payment_method on payment_method.paymentmethodid = invoices.paymentmethodid
            order by orders.created_at desc
            `;

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

const createOrder = async (connection, userId, orderStatusId) => {

    const sql = "insert into `orders`(`userid`,`orderstatusid`) value (?, ?)";

    const values = [userId, orderStatusId];

    const [data] = await connection.query(sql, values);

    if (data.affectedRows > 0 && data.insertId) {

        return data.insertId;
    } else {

        throw new Error("Creating order failed");
    }
};

const updateOrder = async (connection, orderStatusId, orderId) => {

    const sql = "update orders set orderstatusid = ? where orderid = ?";

    const values = [orderStatusId, orderId];

    const [data] = await connection.query(sql, values);


    if (data.affectedRows > 0) {

        return true
    } else {

        throw new Error("Updated order failed");
    }

};


const createNewOrder = async (rawData) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const orderId = await createOrder(connection, rawData.userId, 2);

        const totalAmount = await orderDetailsService.createNewOrderDetails(connection, orderId, rawData.products)

        const invoiceId = await invoicesService.createNewInvoices(connection, totalAmount, rawData, orderId)

        await invoicesDetailsService.createInvoiceDetailsAndUpdateInventory(connection, invoiceId, rawData.products);

        await updateOrder(connection, 1, orderId)

        await connection.commit();

        return {
            EM: "New orders created successfully",
            EC: 0,
            DT: rawData,
        };
    } catch (error) {

        await connection.rollback();

        console.log(error);

        return {
            EM: "Some thing went wrong in service ...",
            EC: -2,
        };
    } finally {

        connection.release();
    }
}




module.exports = {
    getAllOrders,
    createNewOrder,
    updateOrder
};
