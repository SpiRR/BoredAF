const { Model } = require("objection");

class ActivityType extends Model {
    static get tableName() {
        return "activitytypes";
    }
}

module.exports = ActivityType;