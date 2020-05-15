exports.seed = function(knex) {
 
  return knex("regions").del()
    .then( function() {
      return knex("regions").insert([
        { id: 1, region: "Europe" },
        { id: 2, region: "Asia" },
        { id: 3, region: "USA" },
        { id: 4, region: "Oceania" }// Australia, New Zealand
        
      ])
    })

};
