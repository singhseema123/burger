var orm = require("../config/orm.js");

var burger = {
	all: function(callback){
		orm.selectAll("burgers", callback)
	},
	create: function(burger_name,callback) {

		orm.insertOne("burgers",
			["burger_name","devoured"],
			[burger_name,false],
			callback);
	},
	update: function(id,objColVals,callback) {
		var condition = "id = " + id;
		orm.updateOne("burgers",objColVals, condition, callback);
	}

}

module.exports = burger;
