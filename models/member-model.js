var db = require('./db')

module.exports = {

	getById: function(id, callback){

		var sql = "select * from member where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
},
	validate: function(member, callback){
		var sql ="select * from member where mname=? and mpass=?";
		db.getResults(sql, [member.mname, member.mpass], function(result){

			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});	
	},
	getAll: function(callback){
		var sql = "select * from member";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	insert: function(member, callback){

		var sql ="insert into member values('', ?, ?, ?)";
		db.execute(sql, [member.mname, member.mcontact, member.mpass], function(status){
			callback(status);
		});
	},
	update: function(member, callback){
		var sql ="update member set mname=?, mcontact=?, mpass=? where id=?";
	
		db.execute(sql, [member.mname, member.mcontact, member.mpass, member.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "delete from member where id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}



