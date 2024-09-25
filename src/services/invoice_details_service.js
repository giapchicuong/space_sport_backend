
const createInvoiceDetailsAndUpdateInventory = async (connection, invoiceId, products) => {
    for (const item of products) {

        const sqlInsertInvoiceDetail = "insert into `invoice_details` (quantity,unitprice,totalprice,invoiceid,productid) values (?, ?, ?, ?, ?)";

        const totalPrice = item.unitPrice * item.quantity;

        const valuesInsertInvoiceDetail = [item.quantity, item.unitPrice, totalPrice, invoiceId, item.productId];

        await connection.query(sqlInsertInvoiceDetail, valuesInsertInvoiceDetail);

        const sqlUpdateInventoryEntries = "update `inventory_entries` set quantity = quantity - ? where productid = ?";

        const valuesUpdateInventoryEntries = [item.quantity, item.productId];

        await connection.query(sqlUpdateInventoryEntries, valuesUpdateInventoryEntries);
    }
};

module.exports = {
    createInvoiceDetailsAndUpdateInventory
};