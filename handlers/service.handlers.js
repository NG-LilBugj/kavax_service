const { BOOKMARK_TYPES, PROCESS_STATUSES } = require("../constants");
const { Bookmark } = require("../db/models/bookmark.model");
const { Device } = require("../db/models/device.model");
const { Process } = require("../db/models/process.model");

module.exports = {

    getDevice: async (id) => {
        try {
            const device = await Device.findOne({ where: { id } })
            return { success: true, device }
        }
        catch (e) {
            return { success: false, error: e }
        }
    },

    deliverDevice: async (data) => {
        try {
            const device = await Device.create({ model: data.model, owner_id: data.userId, image: data.image });
            const bookmark = await Bookmark.create({ type: BOOKMARK_TYPES["1"] })
            await Process.create({
                status: PROCESS_STATUSES["1"],
                estimated_cost: data.estimatedCost,
                device_id: device.getDataValue("id"),
                bookmark_id: bookmark.getDataValue('id')
            })
        }
        catch (e) {
            return { success: false, error: e }
        }
    },

    shipDevice: async (deviceId) => {
        try {
            const process = await Process.findOne({ where: { device_id: deviceId } });
            if (process.getDataValue('status') === PROCESS_STATUSES["4"]){
                const device = Device.destroy({ where: { id: deviceId } });
                return { success: true, device: device }
            }
            else {
                throw new Error("Device is not ready to be shipped");
            }
        }
        catch (e) {
            return { success: false, error: e }
        }
    }

}
