var db = require('./db')

module.exports = {

	getById: function(id, callback){

		var sql = "select * from admin where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
},
	validate: function(user, callback){
		var sql ="select * from admin where aname=? and apass=?";
		db.getResults(sql, [user.username, user.password], function(result){

			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});	
	},
	getAll: function(callback){
		var sql = "select * from admin";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	insert: function(user, callback){

		var sql ="insert into admin values('', ?, ?, ?)";
		db.execute(sql, [user.username, user.password], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql ="update admin set aname=?, acontact=?, apass=? where id=?";
	
		db.execute(sql, [admin.aname, admin.acontact, admin.apass, admin.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "delete from admin where id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}



