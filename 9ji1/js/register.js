jQuery(function($){
	$regUserID = $("#userUID");
	$idTxt = $("#userUID").next();
	$regUserpwd = $("#userpwd3");
	$pwdTxt = $("#userpwd3").next();
	$regUserpwd2 = $("#userpwd4");
	$pwdTxt2 = $("#userpwd4").next();
	$regUsermobile = $("#usermobile");
	$registerBtn = $("#regbut2");

	$regUserID.blur(function(){
		var _regUserID = $regUserID.val();
		 if(!/^[\u4e00-\u9fa5a-z0-9]{4,16}$/.test(_regUserID)){
            $idTxt.html("你的用户名不满足条件，请重新输入");
            return false;
        }
      
   			console.log(_regUserID);
   		$.ajax({
			url:"../api/register.php",
			type:"get",
			dataType:"json",
			success: succFunction1,
			error:function(){console.log(111);}
		})
		function succFunction1(){
	$.ajax({
		url:"../api/register.php",
		type:"get",
		data:{"_regUserID":_regUserID},
		dataType:"json",
		success: succFunction2,
		error:function(){console.log(222);}
	})
	function succFunction2(data){
		if(data == "true"){
	            $idTxt.html("你的用户名可以使用");
	        }else if(data == "false"){
	            $idTxt.html("你的用户名已经被使用,请使用其他用户名");
	        }
	}
}
        
	})
	
	$regUserpwd.blur(function(){
		var _regUserpwd = $regUserpwd.val();
        if(!/^[a-z0-9]{6,}$/.test(_regUserpwd)){
            $pwdTxt.html("你的密码不满足条件，请重新输入");
            console.log("11");
            return false;
        }else if(/^[a-z0-9]{6,}$/.test(_regUserpwd)){
        	$pwdTxt.html("你的密码可以使用");
        	return true;
        }
        // console.log(666);
    })
  	$regUserpwd2.blur(function(){
   		var _regUserpwd = $regUserpwd.val();
   		var _regUserpwd2 = $regUserpwd2.val();
        if(_regUserpwd2 !== _regUserpwd){
            $pwdTxt2.html("密码输入错误，请重新输入");
            return false;
        }else if(_regUserpwd2 === _regUserpwd){
        	$pwdTxt2.html("你的密码可以使用");
        	return true;
        }
	})
	
	$registerBtn.on("click",function(){
		_regUserID = $regUserID.val();
   		_regUserpwd = $regUserpwd.val();
		if($idTxt.html()=="你的用户名可以使用"&&$pwdTxt.html()=="你的密码可以使用"&&$pwdTxt2.html()=="你的密码可以使用"){
			alert("注册成功");
			$.ajax({
				url:"../api/register.php",
				type:"get",
				data:{_regUserID:_regUserID,_regUserpwd:_regUserpwd},
				dataType:"json",
				error:function(){console.log(ddd);}
			})
		}else{
			alert("请输入用户名和密码");
		}
	})
})

