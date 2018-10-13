

(function(){

	$.ajax({
		url:"../api/goodslist.php",
		type:"get",
		aysnc:false,
		dataType:"json",
		success: succFunction1
	})
	$.ajax({
			url:"../api/cart.php",
			type:"post",
			dataType:"json",
			success: succFunction10
		})
})();
function succFunction1(str){
	var $guessLast = $(".guess-last");
	var $guessStill = $(".guess-still");
	var $goodsList = $(".goodsList");
	var goods = eval(str).slice(0,-1);//数组对象
	console.log(goods);
	goods.unshift({});
	var str ="";
	pinjie2();
	$goodsList.html(str);
	var priceClick = 0;
	$priceSortBtn=$("#price-sort-btn");
	$sortDirection=$(".sort-direction");
	$pointer=$(".pointer").children();

	$priceSortBtn.on("click",{goods,priceClick},function(){
		$priceSortBtn.css({color:"#c80f1e",fontWeight:"bold"});
		$pointer.css({color:"#333"});

		var goods2 =[];
		priceClick++;
    	console.log(priceClick);

		var str ="";
		for(var i=0;i<goods.length;i++){
			var {gID,gImage,gName,gIntro,gSize,gPrice,gTypeID} = goods[i];

				if(gTypeID==1 && i!=0 && goods[i].gName!=goods[i-1].gName){	
				console.log(i,gID);
				goods2.push(goods[i]);		
				
			}
		};
		console.log(goods2);
		if(priceClick%2 == 1){
			$sortDirection.css("transform","rotate(180deg)");
			goods2.sort(function(a,b){
			return a.gPrice-b.gPrice;
			})
		}else if(priceClick%2 == 0){
			$sortDirection.css("transform","rotate(0)");
			goods2.sort(function(a,b){
			return b.gPrice-a.gPrice;
			})
		}
		
		for(var i=0;i<goods2.length;i++){
			var {gID,gImage,gName,gIntro,gSize,gPrice,gTypeID} = goods2[i];

		
			str += `<li data-id="${gID}">
					<a href="javascript:void(0)" class="main-pic-link">
						<img src="../images/goods/440x440/${gImage}">
					</a>
					<div>
						<a href="" class="same-pic-link">
							<img src="../images/goods/70x70/${gImage}">
						</a>
						<a href="" class="same-pic-link">
							<img src="../images/goods/70x70/${goods[i+1].gImage}">
						</a>
					</div>
					<a href="javascript:void(0)" class="gName">${gName} ${gSize} ${gIntro}</a>
					<p class="price">￥ <span>${gPrice}</span></p>
				</li>`
			
		};		
		$goodsList.html(str);	
	})


	str = '<h4 class="box-title">浏览了最终购买了</h4>';
	goods.shift();
	for(var i=0;i<6;i++){
		var {gID,gImage,gName,gIntro,gSize,gPrice,gTypeID} = goods[i];

		if(gTypeID==1){
			pinjie();
		}
	};
	$guessLast.html(str);

	str = '<h4 class="box-title">浏览了还购买了</h4>';

	for(var i=28;i<34;i++){
		var {gID,gImage,gName,gIntro,gSize,gPrice,gTypeID} = goods[i];

		if(gTypeID==2){
			pinjie();
		}
	};
	console.log(str);
	$guessStill.html(str);


	$mainPicParent=$(".main-pic-link").parent();
	$guessItemParent=$(".guess-item").parent();

	console.log($mainPicParent);
	$mainPicParent.on("click",function(e){
		var target = e.target;
		var id = target.parentElement.parentElement.getAttribute("data-id");
		// var url = "../api/goodslist.php?id=";
        if(target.parentElement.className == "main-pic-link"){
   //      	$.ajax({
   //      		type:"post",
			// 	url:url,
			// 	aysnc:false,
			// 	data:{"id":id},
			// 	dataType:"json",
			// 	success: succFunction2,
			// 	error:function(){console.log(111);}
			// })
			succFunction2(id);
        }
	
		
		console.log(id);
	})
	$guessItemParent.on("click",function(e){
		var target = e.target;

		if(target.className == "guess-item"){
			var id = target.getAttribute("data-id");
			console.log(id);

			succFunction2(id);
		}
	})
	function succFunction2(id){
		location.href = "details.html?id="+id;
		console.log(data);
	}


	





	// console.log(666);
	function pinjie(){
		return str += `<a href="javascript:;" class="guess-item" data-id="${gID}">
					<img src="../images/goods/70x70/${gImage}" class="gImg">				
					<div>
						<p class="gName">${gName}</p>
						<p class="gPrice">￥${gPrice}</p>
						
					</div>	
				</a>`
	}
	function pinjie2(){
		
	for(var i=0;i<goods.length;i++){
	var {gID,gImage,gName,gIntro,gSize,gPrice,gTypeID} = goods[i];

		if(gTypeID==1 && i!=0 && goods[i].gName!=goods[i-1].gName){	
		console.log(i,gID);		
			str += `<li data-id="${gID}">
					<a href="javascript:void(0)" class="main-pic-link">
						<img src="../images/goods/440x440/${gImage}">
					</a>
					<div>
						<a href="" class="same-pic-link">
							<img src="../images/goods/70x70/${gImage}">
						</a>
						<a href="" class="same-pic-link">
							<img src="../images/goods/70x70/${goods[i+1].gImage}">
						</a>
					</div>
					<a href="javascript:void(0)" class="gName">${gName} ${gSize} ${gIntro}</a>
					<p class="price">￥ <span>${gPrice}</span></p>
				</li>`
			}
		};		
		
	}
}

function succFunction10(data){
	console.log(data);
	cartRender(data);
}
