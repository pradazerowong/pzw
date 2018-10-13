<?php
	
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "jiuji";

	$conn = new mysqli($servername,$username,$password,$dbname);
	$conn->set_charset('utf8');

	$logSql = 'select * from userlogin';
	$result = $conn->query($logSql);
	$logSqlArr = $result -> fetch_all(MYSQLI_ASSOC);
	$loginName = isset($_GET["_username"])? $_GET["_username"] : "";
	$userpwd = isset($_GET["_userpwd"])? $_GET["_userpwd"] : "";
	
	


	$loginNameRes = $conn -> query('select * from userlogin where username="'
		.$loginName.'"');
	$loginNameArr = $loginNameRes -> fetch_all(MYSQLI_ASSOC);


	$userpwdRes = $conn -> query('select * from userlogin where username="'
		.$loginName.'" and userpassword="'.$userpwd.'"');
	$userpwdArr = $userpwdRes -> fetch_all(MYSQLI_ASSOC);


	if(count($loginNameArr) != 0&&count($userpwdArr) == 0){
        echo json_encode("true false");
    }else if(count($loginNameArr) == 0||count($userpwdArr) == 0){
        echo json_encode("false false");
    }else if(count($userpwdArr) != 0){
    	echo json_encode("true true");
    }
		       
	
 //    $userpwdRes = $conn -> query('select * from userlogin where username="'
	// 	.$loginName.'" and userpassword="'.$userpwd.'"');
	// $userpwdArr = $userpwdRes -> fetch_all(MYSQLI_ASSOC);
	// if($loginNameArr != []){
	// 	if(count($userpwdArr) == 0){
 //        	echo json_encode("false");
	// 	}else if(count($userpwdArr) != 0){
 //        echo json_encode("true");
	// 	}
	// }	

	// if($regUserIDRes!=[]||$$username!=""){
	// 	if(count($regUserIDArr) != 0){
 //        	return;
	//     }else if(count($regUserIDArr) == 0&&$username!=""){
	//     	$inseted = $conn -> query('insert into userlogin (username,userpassword) values ("'.$username.'","'.$regUserpwd.'")');  
	//     }

	// }


	
    
	// echo json_encode($logSqlArr);
	$result->close();
	$conn->close();
	
?>

