var db = require('../models');
var Manager = db.models.Manager;

function index(req, res) {
	Manager.findAll().then(function(managers) {
		res.json(managers);
	});
}

function show(req, res) {
 Manager.findById(req.params.id)
 .then(function(manager){
   // if(!manager) return err(res, "not found"); //will throw error look up synatax -- might be req,res,err
   //Manager.sing();
   //manager.shout();
   res.json(manager);
 }); 
}

function create(req, res) {
		console.log('managers -- update')

 Manager.create(req.body).then(function(manager){
   // if(!manager) return err(res, "not saved"); //will throw error look up synatax -- might be req,res,err
   res.json(manager);
 });
}

function update(req, res){
	Manager.findById(req.params.id)
	.then(function(manager){
		if(!manager) return error(res, "not found");
		console.log('consolelog',req.body)
		return manager.updateAttributes(req.body);
	})
	.then(function(manager){
		res.json(manager);
	});
}

function destroy(req, res) {
	Manager.findById(req.params.id)
	.then(function(manager){
		// if(!manager) return err(res, "not found");
		return manager.destroy();
	})
	.then(function(){
		res.redirect("/managers");
	});
}


module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;