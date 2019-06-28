$(function(){
	var flag = false;
	var flag1 = false;
	$("#title span").eq(0).css({"color":"#e4393c","font-weight":"900"})
	$("#title span").each(function(){
		/*$(this).mouseover(function(){
			console.log(flag)
			flag = false
		var index=$(this).index()
		$("#title span").eq(index).addClass("hover")
		})*/
		/*$(this).mouseout(function(flag){
		var index=$(this).index()
		console.log(flag)
		if(flag.bulbbes==false){
			console.log(flag)
			$("#title span").eq(index).css({"color":"#000","font-weight":"300"})
			//$("#title span").eq(index).removeClass("hover")
		}
		if(flag.bulbbes==true){
			$("#title span").eq(index).css({"color":"#e4393c","font-weight":"900"})
		}
		//$("#title span").eq(index).removeClass("hover")
		})*/
		//点击时效果
		$(this).click(function(){
			flag=true
			console.log($(this).index())
			if($(this).index()==1){
				console.log(flag)
				$("#login-pc").css({"display":"block"})
				$("#login-phone").css({"display":"none"})
				$("#login-bottom").css({"marginTop":"255px"})
				$("#title span").eq(1).addClass("hover")
				$("#title span").eq(1).css({"color":"#e4393c","font-weight":"900"})
				$("#title span").eq(0).css({"color":"#000","font-weight":"300"})
				//$("this").unbind("mouseover")
			}
			if($(this).index()==0){
				$("#login-pc").css({"display":"none"})
				$("#login-phone").css({"display":"block"})
				$("#login-bottom").css({"marginTop":"0px"})
				$("#title span").eq(0).addClass("hover")
				$("#title span").eq(0).css({"color":"#e4393c","font-weight":"900"})
				$("#title span").eq(1).css({"color":"#000","font-weight":"300"})
			}
		})
	})
	$("#phone").mouseover(function(){
		$("#phone img").eq(0).stop().animate({left:20},200)
		
		$("#phone img").eq(1).css({"display":"block"})
		
	})
	
	$("#phone").mouseout(function(){
		//console.log("aaa")
		$("#phone img").eq(0).stop().animate({left:95},200)
		$("#phone img").eq(1).css("display","none")
	})
	
	$("#num").click(function(){
		if(flag1==true){
			$("#num").children().css("borderColor","#cecece")
			$("#num span").css({"borderColor":"##cecece","border-right":"none"})
			$("#num span").css({"background-position":"0 -48px"})
			$("#pass").children().css("borderColor","#e4393c")
			$("#pass span").css({"borderColor":"#e4393c","border-right":"none"})
			$("#pass span").css({"background-position":"-48px -96px"})
		}else{
			$("#num span").css({"background-position":"0px -48px"})
			$("#pass span").css({"background-position":"-48px 0px"})
		}
		if($("#pass input").val("")==false){
			
		}
		
	})
	$("#pass").click(function(){
		if(flag1==true){
			console.log(flag1)
			$("#num").children().css("borderColor","#e4393c")
			$("#num span").css({"borderColor":"#e4393c","border-right":"none"})
			$("#num span").css({"background-position":"0 -96px"})
			$("#pass").children().css("borderColor","#cecece")
			$("#pass span").css({"borderColor":"#cecece","border-right":"none"})
			$("#pass span").css({"background-position":"-48px -48px"})
		}if(flag1==false){
			$("#pass span").css({"background-position":"-48px -48px"})
			$("#num span").css({"background-position":"0px 0px"})
		}
		
	})
	
	$("#btn").click(function(){
		flag1=true
		$("#pass").children().css("borderColor","#e4393c")
		$("#pass span").css({"borderColor":"#e4393c","border-right":"none"})
		$("#num input").focus()
		$("#num span").css({"background-position":"0px -48px"})
		$("#worn").css({"display":"block"})
		$("#num").children().css("borderColor","#cecece")
		$("#num span").css({"borderColor":"#cecece","border-right":"none"})
		/*if($("#num input").val("")){
		$("#pass span").css({"background-position":"-48px -96px"})
		}*/
		if($("#num input").val()&&$("#pass input").val()){
			console.log("aaa")
			$("#worn").css({"display":"none"})
			$("#pass").children().css("borderColor","#cecece")
			$("#pass span").css({"borderColor":"#cecece","border-right":"none"})
			$.post("http://47.104.244.134:8080/userlogin.do",{name:$("#txt").val(),password:$("#pas").val()}).done(data=>{
				console.log(data);
				if(data.code==0){
					location.href="index.html";
					var name = $("#num input").val()
					console.log(name)
					localStorage.setItem("username",$("#num input").val());
					localStorage.setItem("token",data.data.token)
				}
			})
		}
		
	})
	$("#num input").bind('input propertychange',function(){
		$("#num-x").css({"display":"block"})
	})
	$("#pass input").bind('input propertychange',function(){
		$("#pass-x").css({"display":"block"})
	})
	$("#num-x").click(function(){
		$("#num input").val("");
		$("#num-x").css({"display":"none"})
		$("#num input").focus()
		
	
	})
	$("#pass-x").click(function(){
		$("#pass input").val("");
		$("#pass-x").css({"display":"none"})
		$("#pass input").focus()
	})
	/*function open(){
	var ss = window.open('index.htmll');
	//window.location = 'study.html';
	}*/
	//请求数据
	//$.post("http://47.104.244.134:8080/userlogin.do",{name:"aaaa_xxxz",password:111111}).done(data=>{
			//	console.log(data);
		//	})
	
})


