const { Model } = require("objection");

class Region extends Model {
    static get tableName() {
        return "regions";
    }
}

module.exports = Region;