jQuery(function($){
	var id = decodeURI(location.search).slice(4);

    $.ajax({
		url:"../api/goodslist.php",
		type:"get",
		dataType:"json",
		success: succFunction
	})

	function succFunction(data){
		var goods = eval(data).slice(0,-1);
		// var id = Number(eval(data).slice(-1));
		var idx = id-1;
		var $iweizhi = $("#iweizhi");
		var $bigPic = $(".jqzoom");
		var $gName = $(".d_h2").children();
		var $gIntro = $(".miaoshu");
		var $gPrice = $("#spprice");
		$iweizhi.html(" "+goods[idx].gName);
		$bigPic.attr("src","../images/goods/440x440/"+goods[idx].gImage);
		$gName.html(goods[idx].gName+' '+goods[idx].gSize);
		$gIntro.html(goods[idx].gIntro);
		$gPrice.html(goods[idx].gPrice);

		$.ajax({
			url:"../api/cart.php",
			type:"post",
			dataType:"json",
			success: succFunction8
		})
		function succFunction8(data){
			cartRender(data);
		}

		var $toshop = $("#toshop");
		var goodsData = JSON.stringify(goods[idx]);
		console.log(goodsData);
		$toshop.on("click",function(){
			alert("成功添加入购物车");
			// cartRender(goods,idx);
			$.ajax({
				url:"../api/cart.php",
				type:"post",
				data: {gID:goods[idx].gID,gName:goods[idx].gName,gPrice:goods[idx].gPrice,gTypeID:goods[idx].gTypeID,gIntro:goods[idx].gIntro,gImage:goods[idx].gImage,gSize:goods[idx].gSize},
				dataType:"json",
				success: succFunction7,
				error:function(){console.log(111);}
			})
			function succFunction7(data){
			
				cartRender(data);
				
				window.location.reload();


			}
		

		})

	}
	




});



