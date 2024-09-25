
const createNewOrderDetails = async (connection, orderId, products) => {
    let totalAmount = 0;

    for (const item of products) {
        const sql = "insert into `order_details` (`orderid`,`productid`,`unitprice`,`quantity`) values (?, ?, ?, ?)";

        const values = [orderId, item.productId, item.unitPrice, item.quantity];

        await connection.query(sql, values);

        totalAmount += item.unitPrice * item.quantity;
    }

    return totalAmount;
};


module.exports = {
    createNewOrderDetails
};
