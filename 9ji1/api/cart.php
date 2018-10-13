<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "jiuji";

	$conn = new mysqli($servername,$username,$password,$dbname);
	$conn->set_charset('utf8');


	// $cartRes = $conn->query('select * from cart');
	// $cartArr = $cartRes -> fetch_all(MYSQLI_ASSOC);
	

	$gID = isset($_POST["gID"])? $_POST["gID"] : 0;
	$gName = isset($_POST["gName"])? $_POST["gName"] : "";
	$gPrice = isset($_POST["gPrice"])? $_POST["gPrice"] : 0;
	$gTypeID = isset($_POST["gTypeID"])? $_POST["gTypeID"] : 1;
	$gIntro = isset($_POST["gIntro"])? $_POST["gIntro"] : "";
	$gImage = isset($_POST["gImage"])? $_POST["gImage"] : "";
	$gQty = isset($_POST["gQty"])? $_POST["gQty"] : 1;
	$gSize = isset($_POST["gSize"])? $_POST["gSize"] : "";
	$gID2 = isset($_POST["gID2"])? $_POST["gID2"] : $gID;
	$gQty2 = isset($_POST["gQty2"])? $_POST["gQty2"] : $gQty;



	$result = $conn->query('select * from cart where gID="'.$gID.'"');
	$goodsArr = $result -> fetch_all(MYSQLI_ASSOC);
	

	if(count($goodsArr)==0&&$gID!=0&&$gQty2==$gQty){
		$inseted = $conn -> query('insert into cart (gID,gName,gPrice,gTypeID,gIntro,gImage,gQty,gSize) values ("'.$gID.'","'.$gName.'","'.$gPrice.'","'.$gTypeID.'","'.$gIntro.'","'.$gImage.'","'.$gQty.'","'.$gSize.'")');  
	}else if(count($goodsArr)!=0&&$gID!=0&&$gQty2==$gQty){
		$qtyRes = $conn->query('select gQty from cart where gID="'.$gID.'"');
		$qtyArr = $qtyRes -> fetch_all(MYSQLI_ASSOC);

		$gQty = $qtyArr[0]["gQty"]+1;
		$updateQty = $conn -> query('update cart set gQty="'.$gQty.'" where gID="'.$gID.'"');
		// update MyGuests set name='Mary' where id=1;
	}else if($gQty2!=$gQty){
		if($gQty2==0){
			$del = $conn -> query('delete from cart where gID="'.$gID2.'"');
		}else{
			$updateQty = $conn -> query('update cart set gQty="'.$gQty2.'" where gID="'.$gID2.'"');
		}

	}

	 
	 
		



	$Res = $conn->query('select * from cart');
	$Arr = $Res -> fetch_all(MYSQLI_ASSOC);
	echo json_encode($Arr);

	// $result = $conn->query('select * from cart where gQty="'
	// 	.$loginName.'" and userpassword="'.$userpwd.'"');
	// $goodsListArr = $result -> fetch_all(MYSQLI_ASSOC);
	
	
	// echo json_encode($goodsListArr);
	
	

	$result->close();
	$conn->close();
	
?>