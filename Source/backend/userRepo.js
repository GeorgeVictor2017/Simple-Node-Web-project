var express = require("express");

var router = express.Router();

var i18n = require("i18n");
i18n.configure({
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    directory: __dirname + '/locales'
});

var users = [
	{id: 1, name: "Loc Cao", major: "Web Developer", dob: "1/1/1989", gender: "Male"},
	{id: 2, name: "Hanh Nguyen", major: "Tester", dob: "1/11/1990", gender: "Female"},
	{id: 3, name: "Tuan Cao", major: "Accountant", dob: "21/2/1989", gender: "Male"}
];

router.get('/', function (req, res) {
	i18n.setLocale(req.params.lang ? req.params.lang : null);
	res.json({code: 200});
});

router.get('/users', function (req, res) {
	console.log(req.params.lang);
	i18n.setLocale(req.params.lang ? req.params.lang : null);
	console.log("Get user list successfully!");
	res.json({code: 200, message: i18n.__('getUserList'), result: users});
});

router.post('/add-user', function (req, res) {
	i18n.setLocale(req.params.lang ? req.params.lang : null);
	var newUser = {id: users.length + 1, name: req.body.name, major: req.body.major, dob: req.body.dob, gender: req.body.gender};
	users.push(newUser);
	console.log(newUser.name + " has been created successfully!");
	res.json({code: 200, message: i18n.__('createUser'), result: users});
});

router.put('/edit-user', function (req, res) {
	i18n.setLocale(req.params.lang ? req.params.lang : null);
	// var editUser = {id: req.body.id, name: req.body.name, major: req.body.major, dob: req.body.dob, gender: req.body.gender};
	for (var i=0; i < users.length; i++) {
	  if (users[i].id == req.body.id) {
	    users[i].name = req.body.name;
	    users[i].major = req.body.major;
	    users[i].dob = req.body.dob;
	    users[i].gender = req.body.gender;
	    console.log(users[i].name + " has been updated successfully!");
	    break;
	  }
	}	
	// users.push(newUser);
	res.json({code: 200, message: i18n.__('editUser'), result: users});
});

router.post('/delete-user', function (req, res) {
	console.log(req.params.lang);
	i18n.setLocale(req.params.lang ? req.params.lang : null);
	for (var i=0; i < users.length; i++) {
	  if (users[i].id == req.body.id) {
	    var index = users.indexOf(users[i]);
	    users.splice(index, 1);
	    break;
	  }
	}	
	console.log("deleted user successfully!");
	res.json({code: 200, message: i18n.__('deleteUser'), result: users});
});

module.exports = router;
