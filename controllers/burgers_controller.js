const express = require("express");

var burger = require("../models/burger.js");


module.exports = function(app) {
	app.get("/", function(req,res){
		burger.all(function(result){
			res.render("index",{burgers:result.reverse() });

		})


	})

	app.get("/api/devour/:id", function(req,res){
		var id = req.params.id;
		burger.update(id, {devoured: true}, function(result){
			burger.all(function(result){
				console.log("render")
				res.redirect("/")
			})
		})
	})

	app.post("/api/new/", function(req,res){
		var burger_name = req.body.name;
		console.log(burger_name)
		burger.create(burger_name, function(result){
			res.redirect("/")
		})
	})

}

// id,objColVals,callback