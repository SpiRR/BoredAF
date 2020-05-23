exports.up = function (knex) {
    return knex.schema
        .createTable("users", table => {
            table.increments("id");
            table.string("email");
            table.string("nickname");
            table.string("password");
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
         // activities
        .createTable("activities", table => {
            table.increments("id");
            table.string("activity").notNullable();
            table.string("type");
            table.boolean("done").defaultTo(false); 
            table.integer("user_id").unsigned().notNullable();
            table.foreign("user_id").references("users.id");
        })

};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("users")
        .dropTableIfExists("activities")
};