$(function(){
	$.get("http://47.104.244.134:8080/cartlist.do",{
				token:localStorage.getItem("token")
			}).done(data=>{
				console.log(data)
				
				$.each(data, function(i) {
		var str=""		
		str += `
		<li data-id="${data[i].id} data-gid="${data[i].gid}">
			<input class="chk" type="checkbox">
			<img src="${data[i].goods.picurl}"/>
			<span id="name">${data[i].goods.name}</span>
			<span id="price">${data[i].goods.price}</span>
			<span class="minus">-</span>
			<input type="text" class="num" value="${data[i].count}">
			<span class="plus">+</span>
			<span class="perPrice">${data[i].count*data[i].goods.price}</span>
			<span class="del">删除</span>
		</li>
		`;
		$("#main").append(str)
		var ainput=document.querySelectorAll(".num")
		console.log(ainput[i].value)
		var ali=document.querySelectorAll("li")
		var achk=document.getElementsByClassName("chk")
		//减
		$(".minus").eq(i).click(function(){
			var num=ainput[i].value
			ainput[i].value-=1
			if(ainput[i].value<=1){
				ainput[i].value=1
			}
			$.get("http://47.104.244.134:8080/cartupdate.do",{
				id:data[i].id,
				gid:data[i].gid,
				num:-1,
				token:localStorage.getItem("token")
			}).done(data=>{
				console.log(data)
				console.log($(".num").eq(i).val())
				$.get("http://47.104.244.134:8080/cartlist.do",{
				token:localStorage.getItem("token")
			}).done(data=>{
				console.log(data[i].count)
				if(data[i].count==0){
				$(".perPrice").eq(i).html(0)
					$.get("http://47.104.244.134:8080/cartupdate.do",{
				id:data[i].id,
				gid:data[i].gid,
				num:0,
				token:localStorage.getItem("token")
			}).done(data=>{
				//$(".perPrice").eq(i).html(0)
				$(this).parent().remove()
				$("#totle").html(getPrice())
			})
			
				}else{
					$(".perPrice").eq(i).html(data[i].count*data[i].goods.price)
					$("#totle").html(getPrice())
				}
				
			})
				
	
		})
		})
		
		//点击加好
		
		$(".plus").eq(i).click(function(){
			var num=parseInt(ainput[i].value) 
					ainput[i].value=1+num
			$.get("http://47.104.244.134:8080/cartupdate.do",{
				id:data[i].id,
				gid:data[i].gid,
				num:1,
				token:localStorage.getItem("token")
			}).done(data=>{
				console.log(data)
				//$(".perPrice").eq(i).html($(".num").eq(i).val()*$("#price").eq(i).text())
				$.get("http://47.104.244.134:8080/cartlist.do",{
				token:localStorage.getItem("token")
			}).done(data=>{
				console.log(data)
				//console.log(data[i].count*data[i].goods.price)
				$(".perPrice").eq(i).html(data[i].count*data[i].goods.price)
				$("#totle").html(getPrice())
				})
			})
			
		})
		
		//点击删除
		$(".del").eq(i).click(function(){
			
			$.get("http://47.104.244.134:8080/cartupdate.do",{
				id:data[i].id,
				gid:data[i].gid,
				num:0,
				token:localStorage.getItem("token")
			}).done(data=>{
				console.log(data)
				console.log($(this))
				$(this).parent().remove()
				$("#totle").html(getPrice())
				
			})
				
		})
		
		//修改数据
	
		var numPre=$(".num").val()
		$(".num").blur(function(){
			var numNow=$(".num").val()
			$.get("http://47.104.244.134:8080/cartupdate.do",{
				id:data[i].id,
				gid:data[i].gid,
				num:numNow-numPre,
				token:localStorage.getItem("token")
			}).done(data=>{
				console.log(data)
				console.log(data)
				$.get("http://47.104.244.134:8080/cartlist.do",{
				token:localStorage.getItem("token")
			}).done(data=>{
				$(".perPrice").eq(i).html(data[i].count*data[i].goods.price)})
				$("#totle").html(getPrice())
			})
		})
		//console.log(i)
		//选框
				$("#checkAll").click(function(){
					$(".chk").prop("checked",$(this).prop("checked"));
					$("#totle").html(getPrice())
				})
				$(".chk").click(function(){
					if($(".chk:checked").length==$(".chk").length){
						$("#checkAll").prop("checked",true);
					}else{
						$("#checkAll").prop("checked",false);
					}
				})
				
	getPrice = function(){
		console.log("aa")
	aNums = document.querySelectorAll(".num");
	aPerPrice = document.querySelectorAll(".perPrice");
	aPrice = document.querySelectorAll("#price");
	var aChk=document.getElementsByClassName("chk");
	for(let i = 0; i <aPerPrice.length; i++){
		//console.log(i)
		aPerPrice[i].innerText = aNums[i].value * aPrice[i].innerText;
	}
	var totals = 0;
	for(let i = 0; i <aChk.length;i++){
		if(aChk[i].checked){
			totals += parseInt(aPerPrice[i].innerText);
			//totals += parseInt($(".perPrice").eq(i).text())
		}
		console.log(totals)
	}
	return totals
	console.log(totals)
}
	
	//点击选框
	$(".chk").eq(i).click(function(){
	    //getPrice()
		$("#totle").html(getPrice())
	})

		})


				
			})
		
})
			