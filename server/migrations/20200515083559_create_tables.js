exports.up = function (knex) {
    return knex.schema
        // Seeed this info
        .createTable("regions", table => {
            table.increments("id");
            table.string("region");
        })
        .createTable("activitytypes", table => {
            table.increments("id");
            table.string("type");
        })
        .createTable("users", table => {
            table.increments("id");
            table.string("email");
            table.string("nickname");
            table.string("password");
            table.integer("userscore");

            table.integer("region_id").unsigned().notNullable();
            table.foreign("region_id").references("regions.id");

            table.timestamp("created_at").defaultTo(knex.fn.now());
        }) // activities
        .createTable("activities", table => {
            table.increments("id");
            table.string("activity").notNullable();
            table.boolean("done").defaultTo(false); 

            table.integer("activity_type_id").unsigned().notNullable();
            table.foreign("activity_type_id").references("activitytypes.id");

            table.integer("user_id").unsigned().notNullable();
            table.foreign("user_id").references("users.id");
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("users")
        .dropTableIfExists("activities")
        .dropTableIfExists("regions")
        .dropTableIfExists("activitytypes");
};