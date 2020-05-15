exports.seed = function(knex) {
 
    return knex("activitytypes").del()
      .then( function() {
        return knex("activitytypes").insert([
          { id: 1, type: "Education" },
          { id: 2, type: "Recreational" },
          { id: 3, type: "Social" },
          { id: 4, type: "DIY" },
          { id: 5, type: "Charity" },
          { id: 6, type: "Cooking" },
          { id: 7, type: "Relaxation" },
          { id: 8, type: "Music" },
          { id: 9, type: "Busywork" }
          
        ])
      })
  
  };
  