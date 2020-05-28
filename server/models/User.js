const { Model } = require("objection");

class User extends Model {
    static get tableName() {
        return "users";
    }
    
    static async singleOrDefault (query) {
        let result = await this.query().select().where(query).limit(1);
        return result[0];
    }
}

module.exports = User;