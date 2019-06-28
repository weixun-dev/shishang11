window.onload=function(){
	$.get("http://47.104.244.134:8080/goodsbytid.do",{
				tid:13,
				page:1,
				limit:13
			}).done(data=>{
				var oWrap = document.getElementById("main");
				var data=data.data
				var data1=data.shift();
				console.log(data)
				var str=""
				for(var i in data){
				str += `<li>
				<a href="detail.html?id=${data[i].id}">
				<img src="${data[i].picurl}">
				</a>
				<p id="name">${data[i].name}</p>
				<p>${data[i].price}元</p>
				<input type="button" data-id="${data[i].id}" value="添加购物车" id="gou">
			</li>`;
			}
			oWrap.innerHTML = str;
			var aInput = document.querySelectorAll("input")	;
			//console.log(aInput);
			for(let i = 0; i < aInput.length; i++){
				aInput[i].onclick = function(){
					if(localStorage.getItem("token")==null){
				alert("请登录您的账号")
			}else{
				var id  =this.getAttribute("data-id");
					$.get("http://47.104.244.134:8080/cartsave.do",{
					gid:$(this).attr("data-id"),
					token:localStorage.getItem("token")
			}).done(data=>{
				console.log(data)
			})
			}
					
				}
			}
			
					
			
			})
			
	
				
}



				
			
	
	