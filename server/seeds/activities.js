exports.seed = function(knex) {
 
    return knex("activities").del()
      .then( function() {
        return knex("activities").insert([
          { id: 1, activity: "Learn class components React", type: "education", done: false, user_id: 1}          
        ])
      })
  
  };
  