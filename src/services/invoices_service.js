

const createNewInvoices = async (connection, totalAmount, rawData, orderId) => {
    const sqlInsertInvoice =
        "insert into `invoices`(totalamount, description, invoicetypeid, invoicestatusid, paymentmethodid, orderid, userid) values (?, ?, ?, ?, ?, ?, ?)";

    const valuesInsertInvoice = [totalAmount, rawData.description, rawData.invoiceTypeId, 3, rawData.paymentMethodId, orderId, rawData.userId];

    const [dataInsertInvoice] = await connection.query(sqlInsertInvoice, valuesInsertInvoice);

    if (dataInsertInvoice.affectedRows > 0 && dataInsertInvoice.insertId) {

        return dataInsertInvoice.insertId;
    } else {

        throw new Error("Creating invoice failed");
    }
};

module.exports = {
    createNewInvoices
};

