const { Model } = require("objection");

class Activity extends Model {
    static get tableName() {
        return "activities";
    }
    
    static async singleOrDefault (query) {
        let result = await this.query().select().where(query).limit(1);
        return result[0];
    }
}

module.exports = Activity;