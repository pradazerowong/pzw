jQuery(function($){
	$.ajax({
		url:"../api/goodslist.php",
		type:"get",
		dataType:"json",
		success: succFunction12
	})

	function succFunction12(data){
		console.log(data);
		$.ajax({
			url:"../api/cart.php",
			type:"get",
			dataType:"json",
			success: succFunction13
		})
	}
	function succFunction13(goods){
		console.log(goods);
		var $cartItemBro = $(".b-cart-title");
		var str = "";
		var totalPrice = 0;
		for(var i=0;i<goods.length;i++){
			var subtotal = (goods[i].gQty*goods[i].gPrice).toFixed(2);
			totalPrice += Number(subtotal)
			str+=`<div class="b-cart-item" data-id="${goods[i].gID}">
				<div>
					<div class="b-cart-check">
						<label class="checkbox b-radio-box">
							<input type="checkbox">
						</label>
					</div> 
					<div class="b-cart-product-box">
						<div class="b-invalid-mark-"></div> 
						<div class="b-product">
							<a href="" target="_blank" class="fl b-pro-img-box">
								<img src="../images/goods/70x70/${goods[i].gImage}">
							</a>
							<div class="b-product-title">
								<h5>
									<a href="" target="_blank">${goods[i].gName} ${goods[i].gSize}
									</a>
								</h5>
								<div style="margin-top:10px"></div> 
								<div class="b-jiuji-serviceCur"></div> 
								<div class="b-jiuji-server">
									<a href="javascript:;">
									<i class="b-baoxiu"></i>选服务
									</a>
								</div>
							</div>
						</div> 
						<div class="b-unit-price">
							<b>￥</b>
							<b class="price">${goods[i].gPrice}</b>
						</div> 
						<div class="b-discount">0.00</div> 
						<div class="b-count">
							<a href="javascript:;" class="minusBtn">-</a> 
							<input type="text" disabled="disabled" class="countTxt" value="${goods[i].gQty}"> 
							<a href="javascript:;" class="plusBtn">+</a>
						</div> 
						<div class="b-sum">
							<b>￥</b>
							<b class="b-subtotal">${subtotal}</b>
						</div> 
						<div class="b-action">
							<a href="javascript:;" class="b-move-to-favorate">移入收藏夹</a> 
							<a href="javascript:;" class="b-cart-del">删除</a>
						</div>
					</div>
				</div>
			</div>`

		}
		$totalPrice = $(".b-cart-total").find("p").find("b");
		$totalPrice.html(totalPrice.toFixed(2));

		$cartItemBro.next().html(str);
		var $qtyBox = $(".b-cart-product-box");
		var $minusBtn = $(".minusBtn");
		$qtyBox.on("click",function(e){
			var target = e.target;
			if(target.className == "minusBtn"){
				var $countTxt = $(target).next();
				var _countTxt = $countTxt.val();
			
				var $gID = $(target).closest(".b-cart-item").attr("data-id");
				if(_countTxt>1){
					$countTxt.val( _countTxt -1);

				}
				var $gQty = $countTxt.val();
				getQty($gQty,$gID,goods);

			}else if(target.className == "plusBtn"){
				var $countTxt = $(target).prev();
				var _countTxt = $countTxt.val();

				var $gID = $(target).closest(".b-cart-item").attr("data-id");
				if(_countTxt>0){
					$countTxt.val( Number(_countTxt) +1);
					var $gQty = $countTxt.val(); 
				}
				getQty($gQty,$gID,goods);

			}else if(target.className == "b-cart-del"){
				var $curCartItem = $(target).closest(".b-cart-item");

				var $gID = $curCartItem.attr("data-id");
				$curCartItem.remove();
				var $gQty = 0;
				getQty($gQty,$gID,goods);

			}
			window.location.reload();

		})
		jisuan();

	}
	

	function getQty($gQty,$gID,goods){
		$gQty= Number($gQty);
		$gID= Number($gID);
		$.ajax({
		url:"../api/cart.php",
		type:"post",
		data:{gQty2:$gQty,gID2:$gID},
		dataType:"json",
		success: succFunction14,
		error:function(){console.log(222);}

		})
	}
	function succFunction14(data){
		console.log(data);

	jisuan();

	}
	function jisuan(){
		var subtotal = document.getElementsByClassName("b-subtotal");
		console.log(subtotal[0]);

		var price = document.getElementsByClassName("price");

		var allCountTxt = document.getElementsByClassName("countTxt");
		$totalQty = $(".b-cart-total").find("p").find("span");
	

		var totalQty = 0;
		
		for(var i=0;i<subtotal.length;i++){
			subtotal[i].innerHTML = (allCountTxt[i].value * price[i].innerHTML).toFixed(2);
			totalQty += Number(allCountTxt[i].value);
		
			
		}
		$totalQty.html(totalQty);
	


	}
	function biaoge(){
		var checkAll = document.querySelector("#all");
		

	}
	
})

