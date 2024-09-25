import ordersServices from '../services/orders_service'

const readFunc = async (req, res) => {
    try {
        const data = await ordersServices.getAllOrders();

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
};
const createFunc = async (req, res) => {
    try {
        const data = await ordersServices.createNewOrder(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
};


module.exports = {
    readFunc,
    createFunc,
};