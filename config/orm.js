var connection = require("./connection.js");

function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}



var orm  = {
	selectAll: function(table,callback){
		var query = "SELECT * FROM " + table + ";";
		connection.query(query,function(err,data){
			if(err) throw err;
			callback(data);
		})

	},
	insertOne: function(table, cols,vals, callback) {
		var queryString = "INSERT INTO " + table
		+"(" + cols.toString() +")" 
		+ "VALUES (" + vals.map(function(val){return "?"}).toString()
		+ ") ";
	    console.log(queryString);

	    connection.query(queryString, vals, function(err, result) {
	      if (err) throw err;
	   
	      callback(result);
	    });
	},
	updateOne: function(table, objColVals, condition, callback) {
	    var queryString = "UPDATE " + table;

	    queryString += " SET ";
	    queryString += objToSql(objColVals);
	    queryString += " WHERE ";
	    queryString += condition;

	    console.log(queryString);
	    connection.query(queryString, function(err, result) {
	      if (err) {
	        throw err;
	      }
	      console.log("updated")
	      callback(result);
	    });

	}
}

module.exports = orm;