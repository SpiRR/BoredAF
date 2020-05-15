exports.seed = function(knex) {
 
    return knex("users").del()
      .then( function() {
        return knex("users").insert([
          { id: 1, email: "stinewebdevtest@gmail.com", nickname: 'Merinaraa', password: 'ssssssss', userscore: 0, region_id: 1 }          
        ])
      })
  
  };
  