var DB = require("../models").models;

var managerCreate = function() {
	return DB.Manager.create({
		name: "Bob",
		email: "bob@bob.com",
		office_number: "344-444-2121",
		cell_number: "212-212-2121"
	});
};

var artistCreate = function() {
	return DB.Artist.create({
    name: 'Not right yet',
    photoUrl: 'www.zombo.com',
    nationality: 'Zombie',
    instrument: 'Brains',
    home_address: 'Atlanta'
  });
};
managerCreate()
artistCreate()
.then(function() {
	process.exit();
})
