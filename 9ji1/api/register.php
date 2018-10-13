<?php
	
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "jiuji";

	$conn = new mysqli($servername,$username,$password,$dbname);
	$conn->set_charset('utf8');

	$loginSql = 'select * from userlogin';
	$result = $conn->query($loginSql);
	$logSqlArr = $result -> fetch_all(MYSQLI_ASSOC);
	

	$regUserID = isset($_GET["_regUserID"])? $_GET["_regUserID"] : "";
	$regUserpwd = isset($_GET["_regUserpwd"])? $_GET["_regUserpwd"] : "";
	
	$regUserIDRes = $conn -> query('select * from userlogin where username="'
		.$regUserID.'"');
	$regUserIDArr = $regUserIDRes -> fetch_all(MYSQLI_ASSOC);
	if($regUserIDRes!=[]||$regUserID!=""){
		if(count($regUserIDArr) != 0){
        echo json_encode("false");
        // return;
	    }else if(count($regUserIDArr) == 0&&$regUserID!=""){
	    	// $inseted = $conn -> query('insert into userlogin (username) values ("'.$regUserID.'")');
	        echo json_encode("true");

	    }else if(count($regUserIDArr) == 0&&$regUserID=="") {
	        echo json_encode("true");
	    }

	}
	if($regUserIDRes!=[]||$regUserID!=""){
		if(count($regUserIDArr) != 0){
        	return;
	    }else if(count($regUserIDArr) == 0&&$regUserID!=""&&$regUserpwd!=""){
	    	$inseted = $conn -> query('insert into userlogin (username,userpassword) values ("'.$regUserID.'","'.$regUserpwd.'")');  
	    }
	    // else if(count($regUserIDArr) == 0&&$regUserID=="") {
	    //     echo json_encode("true");
	    // }

	}


	
    
	// echo json_encode($logSqlArr);
	$result->close();
	$conn->close();
	
?>