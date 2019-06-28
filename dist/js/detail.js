$(function(){
	var idnum = location.search.split("=")[1];
	console.log(idnum)
	
	$.get("http://47.104.244.134:8080/goodsbyid.do",{
				id:idnum
			}).done(data=>{
				console.log(data);
				var str="";
				var oDiv=document.getElementById("preview")
				console.log(data.picurl);
				console.log(data.name);
				console.log(data.price);
					str+= `
				<img src="${data.picurl}">
				`
				oDiv.innerHTML+=str;
				$("#title").append("<p>"+data.name+"</p>")
				$("#price").append("<p>"+data.price+"元</p>")
				$("#bigArea").append("<img src="+data.picurl+">")
			})
			$("#plus").click(function(){
				$(".num").val(parseInt($(".num").val())+1)
			})
			$("#minues").click(function(){
				$(".num").val(parseInt($(".num").val())-1)
				if($(".num").val()<=1){
					$(".num").val(1)
				}
			})
			
			$("#preview").mouseover(function(){
					$("#zoom").css("display","block");
					$("#bigArea").css("display","block");
				})
			$("#preview").mouseout(function(){
					$("#zoom").css("display","none");
					$("#bigArea").css("display","none");
				})
			$("#preview").mousemove(function(event){
					var num=document.documentElement.clientWidth
					var x = event.pageX - $("#zoom").get(0).offsetWidth/2-num*0.2;
					var y = event.pageY - $("#zoom").get(0).offsetHeight/2-130;
					//console.log(event.pageX,event.pageY);
					//console.log(x,y);
					//console.log($("#zoom").get(0).offsetWidth/2)
					var maxWid = $("#preview").width() - $("#zoom").width();
					var maxHei = $("#preview").height() - $("#zoom").height();
					//console.log(maxWid,maxHei)
					//console.log($("#preview").width(),$("#zoom").width())
					x = x<=0?0 : x>=maxWid?maxWid : x;
					y = y<=0?0 :y>=maxHei?maxHei :y;
					//console.log(x,y);
					$("#zoom").css({"left":x+"px"})
					$("#zoom").css({"top":y+"px"})
					
					
					$("#bigArea img").css({"left":-x/$('#preview').width()*$('#bigArea img').width()+"px"})
					$("#bigArea img").css({"top":-y/$('#preview').height()*$('#bigArea img').height()+"px"})
					//console.log(-x/$('#preview').width()*$('#bigArea img').width())
				})
			

function addCart(){
					var token = localStorage.getItem("token");
					$.get("http://47.104.244.134:8080/cartsave.do",{
						gid:idnum,
						token:token}).done(data=>{
							
						})
	}
		
	$(".btn").click(function(){
					if(localStorage.getItem("token")==null){
						alert("请先登录");
						window.location.href="logon.html";
					}else{
						for(var i=0;i<parseInt($(".num").val());i++){
							addCart();
						}
						
					}
				})
		
		/*$(".btn").click(function(){

				$.get("http://47.104.244.134:8080/cartsave.do",{
				gid:idnum,
				token:localStorage.getItem("token")
			}).done(data=>{
				//console.log(data);
				$.get("http://47.104.244.134:8080/cartlist.do",{
				token:localStorage.getItem("token")
			}).done(data=>{
				console.log(data)
				$.each(data, function(i,v){
					//console.log(i,v)
					//console.log(v.gid,idnum)
					if(v.gid==idnum){
					$.get("http://47.104.244.134:8080/cartupdate.do",{
				id:data[i].id,
				gid:data[i].gid,
				num:$(".num").val(),
				//num:0,
				token:localStorage.getItem("token")
			}).done(data=>{
				console.log(data)
			})	
					}
			
					
				})
				
			})	
			})
			
			
			
			})*/
			
			
			
			
				
		
			
})
