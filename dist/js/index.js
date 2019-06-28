$(function(){
	$(window).scroll(function(){
		var st = $(this).scrollTop();
		if(st >=160){
		$("#top").css({"position":"fixed","top":"20px"});
	}else{
		$("#top").css({"top":"160px","position":"absolute"});
	}
	})
	$("#top p").eq(1).click(function(){
					$("body,html").animate({"scrollTop":0},200)	
				})

	$("#top p").eq(2).click(function(){
		
		console.log($("#top img").eq(1).attr('src'))
		if($("#top img").eq(1).attr("src")=="imgs/2345_image_file_copy_1.jpg"){
			$("#top img").eq(1).attr("src","imgs/flyban_close.jpg")
			$("#top p").eq(0).css("display","block")
		}else{
			$("#top img").eq(1).attr("src","imgs/2345_image_file_copy_1.jpg")
			$("#top p").eq(0).css("display","none")
		}
		
	})
	//展示首页
	var oWrap = document.getElementById("main");
			var ml = 10;
	for(var i = 0; i < 3; i++){ //行
		for(var j = 0; j < 4; j++){ //列
			var oDiv = document.createElement("img");
			oWrap.appendChild(oDiv);
			oDiv.style.left = j*(290+ml) + "px";
			oDiv.style.top = i*(400+80) + "px";	
				}		
				}
	
	$.get("data.json",function(data){
				console.log(data)
				$("#main img").each(function(i){
					
				$(this).attr("src",data[i].imgsrc)
				
				})
					
				
			
	})
	
	
	
	
	
	//请求数据
	/*$.get("http://47.104.244.134:8080/goodsbytid.do",{
				tid:13,
				page:1,
				limit:10
	}).done(data=>{
				console.log(data.data);
				$.each(data.data, function(index,value) {
					console.log(value.picurl)
					//var img=value.picurl.replace("//","")
					//console.log(img)
					//$("#main").html("<img src="+value.picurl+"/>")
					//$("#main").html("<img src='//img12.360buyimg.com/n7/s230x230_jfs/t19513/186/1027434391/438862/1b6bfdbd/5ab5a467N8857d921.jpg!cc_230x230.jpg' />")
				})
			})*/
		//二级菜单
		$.get("http://47.104.244.134:8080/goodstypelist.do",{l:1}).done(data=>{
				console.log(data);
				$.each(data, function(index,value) {
					console.log(value);
					$("#list-wrap").append("<li>"+value.name+"</li>")
					$("#list-wrap li").eq(index).mouseover(function(){
						$("#list-inner").css("display","block")
						$("#list-inner").text("")
						$.get("http://47.104.244.134:8080/goodstypelist.do",{l:2}).done(data=>{
							console.log(data);
							for(var i=0;i<data.length;i++){
								console.log(value.id)
								console.log(data[i].parentid,value.id)
								if(data[i].parentid==value.id){
									if(data[i].parentid==12){
									$("#list-inner").append("<span><a href='productlist.html'>"+data[i].name+"</a></span>")
				
								}else{
									$("#list-inner").append("<span><a href='productlist.html'>"+data[i].name+"</a></span>")
								}
									
								}
								
								
							}
							
							//console.log(data[index].parentid,value.id)
							
						

						})
						
						
					})
					
					
				});
				/*$("#list-inner span").mouseleave(function(){
					$("#list-inner").css("display","none")
				})*/
	
			})
 		/*$("#list-inner").mouseout(function(){
 			$("#list-inner").css("display","none")
 		})*/
 		var name=localStorage.getItem("username")
 		if(name){
 			$("#regist a").html("<span>欢迎</span>"+name).removeAttr("href")
 			$("#logon a").html("已登录").removeAttr("href")
 		}
 		$("#unlogon").click(function(){
 			$("#regist a").html("注册").attr("href","regist.html")
 			$("#logon a").html("登录").attr("href","logon.html")
 			localStorage.removeItem("username")
 			localStorage.removeItem("token")
 		})
})
