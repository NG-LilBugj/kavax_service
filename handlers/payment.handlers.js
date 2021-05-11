const { Payment } = require("../db/models/payment.model");
const { Process } = require("../db/models/process.model");

module.exports = {

    estimateCost: async (data) => {
        try {
            const process = await Process.update({ estimated_cost: data.cost }, {
                where: { device_id: data.deviceId }
            });
            if (process.getDataValue('estimated_cost') === data.cost) {
                return { success: true }
            }
            else throw new Error("Process has not been updated");
        }
        catch (e) {
            return { success: false, error: e }
        }
    },

    shipPayment: async (data) => {
        try {
            const process = await Process.findOne({ where: { device_id: data.deviceId } });
            const payment = await Payment.create({
                payment_sum: data.sum,
                client_id: data.userId,
                process_id: process.getDataValue("id")
            });
            if (payment.getDataValue("id")) {
                return { success: true, payment };
            }
            else throw new Error("Payment error");
        }
        catch (e) {
            return { success: true, error: e };
        }
    }

}
