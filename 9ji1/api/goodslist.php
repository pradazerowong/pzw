<?php
	
    // $id = isset($_POST["id"])? $_POST["id"] : "1";
 


    // echo $id;
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "jiuji";

	$conn = new mysqli($servername,$username,$password,$dbname);
	$conn->set_charset('utf8');

	$goodsListSql = 'select * from goodslist';
	$result = $conn->query($goodsListSql);
	$goodsListArr = $result -> fetch_all(MYSQLI_ASSOC);
	
	// array_push($goodsListArr,$id);

	
	echo json_encode($goodsListArr);

	$result->close();
	$conn->close();
	
?>