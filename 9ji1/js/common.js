function cartRender(goods){
	var $cartItemParent = $(".cart-item-parent");

	console.log($cartItemParent);
	var str = "";
	for(var i=0;i<goods.length;i++){
		str +=`<div class="cart-item clearfix" data-id="${goods[i].gID}">
		 	<div>
		 		<div class="cart-product-box">
		 			<div class="product">
		 				<a href="" target="_blank" class="pro-img-box"><img src="../images/goods/70x70/${goods[i].gImage}"></a>
		 				<div class="product-title">
		 					<h5><a href="" target="_blank">${goods[i].gName} ${goods[i].gSize}</a></h5>
		 					<div class="cart-mini-price-box">
		 						<i>￥</i>
		 						<b>${goods[i].gPrice}</b>
		 						&times;
		 						<span class="count mini-count">
									<a href="javascript:;" class="minusBtn">-</a>
									<input type="text" disabled="disabled" value="${goods[i].gQty}">
									<a href="javascript:;" class="plusBtn">+</a>
								</span>
								<a href="javascript:;" class="cart-mini-del">删除</a>
							</div>
		 					<div style="margin-top: 10px"></div>
							<div class="jiuji-serviceCur">
							</div>
							<div class="jiuji-service" style="margin-top: 10px;overflow: hidden;">
								<a href="" target="_blank">
									<i class="baoxiu"></i>
									选服务
								</a>
							</div>
						</div>
					</div>
		 		</div>
			</div>
		</div>`
	}
	
	$cartItemParent.html(str);
	var $priceBox = $(".cart-mini-price-box");
	var $minusBtn = $(".minusBtn");
	// var $countTxt = $(".minusBtn").next();
	// var _countTxt = $countTxt.val();
	console.log($minusBtn);


	jisuan();

	$priceBox.on("click",function(e){
		var target = e.target;
		console.log(target);
		if(target.className == "minusBtn"){
			var $countTxt = $(target).next();
			var _countTxt = $countTxt.val();
			var $gID = $(target).closest(".cart-item").attr("data-id");
			if(_countTxt>1){
				$countTxt.val( _countTxt -1);
			}
			var $gQty = $countTxt.val();
			console.log($gID);
			getQty($gQty,$gID,goods);
		}else if(target.className == "plusBtn"){
			var $countTxt = $(target).prev();
			var _countTxt = $countTxt.val();
			var $gID = $(target).closest(".cart-item").attr("data-id");
			if(_countTxt>0){
				$countTxt.val( Number(_countTxt) +1);
				var $gQty = $countTxt.val(); 
			}
			getQty($gQty,$gID,goods);

		}else if(target.className == "cart-mini-del"){
			var $curCartItem = $(target).closest(".cart-item");
			var $gID = $curCartItem.attr("data-id");
			// totalQty =  Number(totalQty-$(target).prev().find("input").val());
			$curCartItem.remove();
			var $gQty = 0;
			getQty($gQty,$gID,goods);

		}
		jisuan();
		
	})

	
console.log(location.href);
}
function getQty($gQty,$gID,goods){
	$gQty= Number($gQty);
	$gID= Number($gID);
	console.log(typeof($gQty));
	if(location.href.indexOf("index.html") == -1){
		$.ajax({
		url:"../api/cart.php",
		type:"post",
		data:{gQty2:$gQty,gID2:$gID},
		dataType:"json",
		success: succFunction9,
		error:function(){console.log(222);}

		})
	}else if(location.href.indexOf("index.html") > 0){
		$.ajax({
		url:"api/cart.php",
		type:"post",
		data:{gQty2:$gQty,gID2:$gID},
		dataType:"json",
		success: succFunction9,
		error:function(){console.log(222);}

		})
	}
	
	function succFunction9(data){
		console.log(data);

	}
}

function jisuan(){
	var $totalQty = $(".cart-mini-total").find("span");
		var $totalPrice = $(".cart-mini-total").find("b");

		// $(".count").find("input").addClass("qtyTxt");
		var count = document.getElementsByClassName("count");
		var priceBox = document.getElementsByClassName("cart-mini-price-box");
		var totalQty = 0;
		var totalPrice =0;
		console.log(count[0].children[1]);
		for(var i=0;i<count.length;i++){
			var _price = Number(priceBox[i].children[1].innerHTML);
			var _qty = count[i].children[1].value;
			console.log(count[i].children[1]);
	 		totalQty += _qty*1;
	 		totalPrice += _qty*_price;
			console.log(totalPrice);

		}

		$totalQty.html(totalQty);
		$totalPrice.html("￥"+totalPrice.toFixed(2));
}