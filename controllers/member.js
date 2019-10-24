var express = require('express');

var memberModel = require('./../models/member-model');


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
router.get('/mlogin', function(request, response){
	response.render('member/mlogin');
});

router.post('/mlogin', function(request, response){
	
	var member = {
		mname: request.body.mname,
		mpass: request.body.mpass
	};

	memberModel.validate(member, function(status){
		if(status){
			response.cookie('mname', request.body.aname);
			response.redirect('/home');
		}else{
			response.send('invalid membername/password');		
		}
	});

});



router.get('/registration', function(request, response){
	response.render('member/registration');
});


router.post('/registration', function(request, response){

	var member = {
		mname: request.body.mname,
		mcontact: request.body.mcontact,
		mpass: request.body.mpass,
		
		id: request.params.id
	};

	memberModel.insert(member, function(status){
		
		if(status){
			response.redirect('/member/mlogin');
		}else{
			response.redirect('/member/registration');
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



