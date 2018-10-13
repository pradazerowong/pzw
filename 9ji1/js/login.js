jQuery(function(){
	$username = $("#txtUser");
	$usernameTxt = $("#txtUser").parent().next();
	$userpwd = $("#Userpwd");
	$userpwdTxt = $("#Userpwd").parent().next();
	$loginBtn = $("#logbtn");

	$username.blur(function(){
		var _username = $username.val();
		console.log(_username);

		$.ajax({
			url:"../api/login.php",
			type:"get",
			data:{"_username":_username},
			dataType:"json",
			success: succFunction4,
			error:function(){console.log(111);}
		})
		function succFunction4(data){
			console.log(data);
			$.ajax({
				url:"../api/login.php",
				type:"get",
				data:{"_username":_username},
				dataType:"json",
				success: succFunction5,
				error:function(){console.log(222);}
			})
			function succFunction5(data){
				console.log(typeof(data));
				console.log($usernameTxt);
				data = data.split(" ")
				console.log(data[0]);
				if(data[0] == "false"){
						$usernameTxt.css("display","block");
			            $usernameTxt.html("用户名不存在");
			        }else if(data[0] == "true"){
						$usernameTxt.css("display","none");
			            // $usernameTxt.html("请输入您的密码");
			        }
			}
		}
	})

	$loginBtn.on("click",function(){
		_username = $username.val();
   		_userpwd = $userpwd.val();
   		$.ajax({
			url:"../api/login.php",
			type:"get",
			data:{"_username":_username,"_userpwd":_userpwd},
			dataType:"json",
			success: succFunction6,
			error:function(){console.log(555);}
		})
		function succFunction6(data){
			console.log(data);
			data = data.split(" ")
			console.log(data[1]);
			if(data[1] == "false"){
				alert("用户名或密码错误，请重新输入");
	        }else if(data[1] == "true"){
				alert("登录成功");
	            // $usernameTxt.html("请输入您的密码");
	        }
		}
		// if($usernameTxt.css()=="你的用户名可以使用"&&$pwdTxt.html()=="你的密码可以使用"&&$pwdTxt2.html()=="你的密码可以使用"){
		// 	alert("注册成功");
		// 	$.ajax({
		// 		url:"../api/register.php",
		// 		type:"get",
		// 		data:{_regUserID:_regUserID,_regUserpwd:_regUserpwd},
		// 		dataType:"json",
		// 		error:function(){console.log(ddd);}
		// 	})
		// }else{
		// 	alert("请输入用户名和密码");
		// }
	})
	
})
