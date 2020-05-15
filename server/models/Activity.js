const { Model } = require("objection");

class Activity extends Model {
    static get tableName() {
        return "activities";
    }
}

module.exports = Activity;