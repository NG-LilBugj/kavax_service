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
                bookmark_id: bookmark.getDataValue('id')
            })
        }
        catch (e) {
            return { success: false, error: e }
        }
    }

}
