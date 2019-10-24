var express = require('express');

var adminModel = require('./../models/admin-model');


var router = express.Router();

/*
router.get('*', function(request, response, next){

	if(request.cookies['username'] != null){
		next();
	}else{
		response.redirect('/logout');
	}

});

*/
router.get('/alogin', function(request, response){
	response.render('admin/alogin');
});

router.post('/alogin', function(request, response){
	
	var admin = {
		aname: request.body.aname,
		apass: request.body.apass
	};

	adminModel.validate(admin, function(status){
		if(status){
			response.cookie('aname', request.body.aname);
			response.redirect('/admin/alogin');
		}else{
			response.send('invalid adminname/password');		
		}
	});

});



router.get('/registration', function(request, response){
	response.render('admin/registration');
});


router.post('/registration', function(request, response){

	var admin = {
		aname: request.body.aname,
		acontact: request.body.acontact,
		apass: request.body.apass,
		
		id: request.params.id
	};

	adminModel.insert(admin, function(status){
		
		if(status){
			response.redirect('/admin/alogin');
		}else{
			response.redirect('/admin/registration');
		}
	});
	
});




















router.get('/userList', function(request, response){
		
		userModel.getAll(function(results){
			response.render('user/index', {users: results});		
		});	
});

router.get('/edit/:id', function(request, response){

	userModel.getById(request.params.id, function(result){
		response.render('user/edit', result);
	});
	
});

router.post('/edit/:id', function(request, response){

	var user = {
		username: request.body.username,
		password: request.body.password,
		id: request.params.id
	};

	userModel.update(user, function(status){
		
		if(status){
			response.redirect('/user/userlist');
		}else{
			response.redirect('/user/edit/'+request.params.id);
		}
	});
	
});

///////delete////////////////////
router.get('/delete/:id', function(request, response){
	
	userModel.getById(sql, function(result){
		response.rendirect("user/delete", {user: result[0]});
	})
});

router.post('/delete/:id', function(request, response){

	userModel.delete(sql, function(status){	
		if(status){
			response.redirect("/user/userList");
		}else{
			response.redirect("/user/delete/"+request.params.id);	
		}
	})
});





///////details/////////////

router.get('/details/:id', function(request, response){

	userModel.getById(request.params.id, function(result){
		response.render("user/details", result);
	})
});

module.exports = router;



