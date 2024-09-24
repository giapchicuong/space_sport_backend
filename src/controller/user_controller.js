import userServices from '../services/user_service'

const readFunc = async (req, res) => {
    try {
        const data = await userServices.getAllUser();

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
        const data = await userServices.createNewUser(req.body);

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

const updateFunc = async (req, res) => {
    try {
        const data = await userServices.updateUser(req.body);

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

const getUserAccount = (req, res) => {
    try {
        return res.status(200).json({
            EM: "Get user account successfully",
            EC: 0,
            DT: {
                accessToken: req.token,
                email: req.user.email,
                groupId: req.user.groupId,
            },
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
    updateFunc,
    getUserAccount,
};