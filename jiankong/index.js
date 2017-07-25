window.onload=function(){
function time(){
	var time=document.getElementById("time");
	var now = new Date();
	var year =now.getFullYear();
	var month=now.getMonth()+1;
	var date =now.getDate();
	var h    =now.getHours();
	h=h<10?0+""+h:h;
	var m    =now.getMinutes();
	m=m>10?m:0+""+m;
	var s    =now.getSeconds();
	s=s<10?0+""+s:s;
	var ss=now.getMilliseconds();
	var str=null;
    str = year+"-"+month+"-"+date+" "+h+":"+m+":"+s
	time.innerHTML=str;
}
time();
setInterval(time,1000);
// d5 cavs_1
/*分析对比 图一start*/ 
var cavs_1=document.getElementById('cavs_1');
var myChart_1 = echarts3.init(cavs_1);
var option = {
    tooltip: {
        trigger:"axis"
    },
    color:["rgb(218,109,78)","rgb(84,177,179)"],
    grid:{
    	show:false
    },
    toolbox: {
       show:false
    },
    legend: {
        data:['go','sub'],
        textStyle:{
        	color:"rgb(236,238,239)"
        }
    },
    xAxis: [
        {
            type: 'category',
            data: ['6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00','2:00','4:00'],
            axisLine:{
            	show:false
            },
            splitLine:{
            	show:false
            },
           axisLabel:{
           	textStyle:{
           		color:"rgb(236,238,239)"
           	}
           },
           axisTick:{
           	show:false
           },
           axisLine:{

           	lineStyle:{

           		color:"rgb(236,238,239)"
           	}
           }
        }
    ],
    yAxis: [
        {
            type: 'value',    
            axisLabel: {
                formatter: '{value} ml'
            },
            splitLine:{
            	show:true,
            	lineStyle:{
            		color:"rgb(88,94,95)"
            	}
            },
            axisLabel:{
           	textStyle:{
           		color:"rgb(236,238,239)"
           	}
           },
           axisTick:{
           	show:false
           },
           axisLine:{
           	lineStyle:{
           		color:"rgb(236,238,239)"
           	}
           }
        }
    ],
    series: [
        {
            name:'go',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'sub',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        }
    ]
};
myChart_1.setOption(option);
var btn_1=document.getElementById("btn_1");
var data_1=[22.0, 104.9, 27.0, 123.2, 25.6, 76.7, 55.6, 162.2, 32.6, 220.0, 96.4, 31.3]
btn_1.onclick=function(){
  console.log(1);
	option.series[0].data=data_1;
	myChart_1.setOption(option);
}
// d6 cavs_2
var myChart_2 =echarts3.init(document.getElementById("cavs_2"));

/*------日历 start-------*/ 
/*-------日历1 start-------------*/ 
  var rili={
    nowDate:0,          //保存今天几号
    days:0,             //得到具体天数
    week:0,             //返回星期几
    year:0,             //保存 年
    month:0,            //保存 月      
    show:function(){
        if(this.year==0){
      this.createBox()
    }
      $("#dbfx_main").html("");
      var riqi=$("#dbfx_riqi").html();
      console.log("riqi",riqi);
      if(!riqi){
        return
      }
      var year =riqi.split("年")[0];     //得到年
      var month=parseInt(riqi.split("年")[1])
      console.log("riqi",year)
      console.log("riqi",month)
      this.week=this.getWeek(year+"/"+month+"/1");//返回星期几
      this.days=this.getDays(year,month);    
      this.nowDate=new Date().getDate();     
      var flag =document.createDocumentFragment()
      for(var i=0;i<this.week-1;i++){
        var div=document.createElement("div")
        div.innerHTML='0';
        div.style.color="rgba(0,0,0,0)"
        flag.appendChild(div) 
      }
      for(var i=0;i<this.days;i++){
        var div=document.createElement("div")
        div.innerHTML=i+1
        if(i==this.nowDate-1){
        div.style.color="red"
        div.style.backgroundColor="blue"
        }
        flag.appendChild(div)
      }
      for(var i=0;i<42-(this.week-1)-this.days;i++){
        var div=document.createElement("div")
        div.innerHTML=0;
        div.style.color="rgba(0,0,0,0)"

        flag.appendChild(div) 
      }
      $("#dbfx_main")[0].appendChild(flag)
    },
    createBox:function(){
      /*
          <span id="dbfx_black" class="dbfx_black"><</span>
          <span id="dbfx_riqi">2016年10月</span>
          <span id="dbfx_go" class="dbfx_go">></span>
          <ul class="dbfx_week">
            <li class="dbfx_first">一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li>日</li>
          </ul>
          <div id="dbfx_main" class="dbfx_main">
            
          </div>
      */ 
      if(this.year==0){
      var year=new Date().getFullYear();
      var m = new Date().getMonth()+1;
      this.year=year;
      this.month=m;
    }
      var str ='<span id="dbfx_black" class="dbfx_black"><</span>\
          <span id="dbfx_riqi">'+this.year+'年'+this.month+'月</span>\
          <span id="dbfx_go" class="dbfx_go">></span>\
          <ul class="dbfx_week">\
            <li class="dbfx_first">一</li>\
            <li>二</li>\
            <li>三</li>\
            <li>四</li>\
            <li>五</li>\
            <li>六</li>\
            <li>日</li>\
          </ul>\
          <div id="dbfx_main" class="dbfx_main">\
          </div>'
          $($(".dbfx_rili_title")[0]).html(str)
    },
    getAllYear:function(){//这个方法 点击年获得前后几年的日期
        var ul=$("<ul></ul>")
        var year = new Date().getFullYear();
        for(var i=7;i>=0;i--){
          var li =$("<li class='y-li'></li>")
          $(li).html(year-i)
          $(ul).append(li)
        }
        $($(".dbfx_rili_title")[0]).html(ul)
    }, 
    getDays:function(year,yue){
      if(yue==1||yue==3||yue==5||yue==7||yue==8||yue==10||yue==12){
        return 31;
      }else if(yue==4||yue==6||yue==9||yue==11){
        return 30;
      }else {
        if((year%4==0&&year%100!=0)||year%400==0){
          return 29
        }else{
          return 28
        }
      }   
    },
    getWeek:function(stringTime){
      if(new Date(stringTime).getDay()==0){
        return 7
      }
      return new Date(stringTime).getDay()
      },
      setTime:function(e){  //点击返回按钮设置相应事件 2016年10月->2016年11月
      var riqi=$("#dbfx_riqi").html();
      var year =riqi.split("年")[0];     //得到年
      var month=parseInt(riqi.split("年")[1])//得到月
      if(e.id=="dbfx_go"){
        if(this.month<12){
        this.month++
        $("#dbfx_riqi").html(this.year+"年"+this.month+"月");
        // $("#dbfx_ipt").val('1234');

        // $("#dbfx_riqi")[0].innerHTML="12312";
        console.log($("#dbfx_riqi")[0])
       }else{
        this.month=1
        this.year++
        $("#dbfx_riqi").html(this.year+"年"+this.month+"月")
       }
      }else if(e.id=="dbfx_black"){
        console.log("black");
        if(month>1){
        this.month--
        $("#dbfx_riqi").html(this.year+"年"+this.month+"月")
       }else{
        this.month=12
        this.year--
        $("#dbfx_riqi").html(this.year+"年"+this.month+"月")
       }
      }
      }
}
// 点后>按钮
$($(".dbfx_rili_title")[0]).delegate("#dbfx_go","click",function(){
    var riqi =$("#dbfx_riqi").html()
    var year =riqi.split("年")[0];         //得到年
    var month=parseInt(riqi.split("年")[1])//得到月
    var yearNow=new Date().getFullYear();   
    var monthNow=new Date().getMonth();
    var dateNow =new Date().getDate();
    console.log(this)
    rili.setTime(this);
    rili.show();
    $("#dbfx_main div").each(function(i,v){
      v.style.backgroundColor="#fff";
      if(v.style.color=="red"){
      v.style.color="black"
      }
    })
    if(year==yearNow&&month==monthNow){
      $("#dbfx_main div").each(function(i,v){
        if(v.innerHTML==dateNow){
          v.style.backgroundColor="blue"
          v.style.color="red"
        }   
      })
    }
})
$($(".dbfx_rili_title")[0]).delegate("#dbfx_riqi","click",function(){
  rili.getAllYear()
})
$($(".dbfx_rili_title")[0]).delegate("ul>li","click",function(){
  rili.year=this.innerHTML
  rili.createBox()
  rili.show()
})
 // 点击<按钮
$($(".dbfx_rili_title")[0]).delegate("#dbfx_black","click",function(){
    var riqi=$("#dbfx_riqi").html();
    var year =riqi.split("年")[0];         //得到年
    var month=parseInt(riqi.split("年")[1])-1//得到月
    var yearNow=new Date().getFullYear();   
    var monthNow=new Date().getMonth()+1;
    var dateNow =new Date().getDate();
    rili.setTime(this);
    rili.show();
    $("#dbfx_main div").each(function(i,v){
      v.style.backgroundColor="#fff";
    if(v.style.color=="red"){
      v.style.color="black";
    }
    })
      if(year==yearNow&&month==monthNow){
      $("#dbfx_main div").each(function(i,v){
        if(v.innerHTML==dateNow){
          v.style.backgroundColor="blue"
          v.style.color="red"
        }   
      })
    }
})

  // 给#main 下的div注册点击事件
  $($(".dbfx_rili_title")[0]).delegate("#dbfx_main>div","click",function(){
      if(this.innerHTML!=0){
      var self=this;
      var riqi=$("#dbfx_riqi").html();
      var year =riqi.split("年")[0];     //得到年
      var month=parseInt(riqi.split("年")[1])//得到月
      $("#dbfx_main div").each(function(i,v){
        if(v.style.backgroundColor!="blue"){
          v.style.backgroundColor="#fff"
        }
    })
      if(this.style.backgroundColor!="blue"){
      this.style.backgroundColor="#ccc"
    }
      $("#dbfx_ipt").val(year+"/"+month+"/"+self.innerHTML)
    }
  })
  rili.show();
  $("#dbfx_ipt").click(function(){
    $("#dbfx_d2").show()
  })
  $("#dbfx_d2").mouseleave(function(){
    $(this).hide()
  })
  /*----日历1 end----*/ 

  /*------日历2 start-------*/
       var rili_2={
    nowDate:0,          //保存今天几号
    days:0,             //得到具体天数
    week:0,             //返回星期几
    year:0,             //保存 年
    month:0,            //保存 月      
    show:function(){
        if(this.year==0){
      this.createBox()
    }
      $("#dbfx_main_2").html("");
      var riqi=$("#dbfx_riqi_2").html();
      var year =riqi.split("年")[0];     //得到年
      var month=parseInt(riqi.split("年")[1])
      this.week=this.getWeek(year+"/"+month+"/1");//返回星期几
      this.days=this.getDays(year,month);    
      this.nowDate=new Date().getDate();     
      var flag =document.createDocumentFragment()
      for(var i=0;i<this.week-1;i++){
        var div=document.createElement("div")
        div.innerHTML='0';
        div.style.color="rgba(0,0,0,0)"
        flag.appendChild(div) 
      }
      for(var i=0;i<this.days;i++){
        var div=document.createElement("div")
        div.innerHTML=i+1
        if(i==this.nowDate-1){
        div.style.color="red"
        div.style.backgroundColor="blue"
        }
        flag.appendChild(div)
      }
      for(var i=0;i<42-(this.week-1)-this.days;i++){
        var div=document.createElement("div")
        div.innerHTML=0;
        div.style.color="rgba(0,0,0,0)"

        flag.appendChild(div) 
      }
      $("#dbfx_main_2")[0].appendChild(flag)
    },
     getAllYear:function(){//这个方法 点击年获得前后几年的日期
        var ul=$("<ul></ul>")
        var year = new Date().getFullYear();
        for(var i=7;i>=0;i--){
          var li =$("<li class='y-li'></li>")
          $(li).html(year-i)
          $(ul).append(li)
        }
        $($(".dbfx_rili_title")[1]).html(ul)
    }, 
    createBox:function(){
      /*
          <span id="dbfx_black_2" class="dbfx_black"><</span>
          <span id="dbfx_riqi_2">2016年10月</span>
          <span id="dbfx_go_2" class="dbfx_go">></span>
          <ul class="dbfx_week">
            <li class="dbfx_first">一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li>日</li>
          </ul>
          <div id="dbfx_main_2" class="dbfx_main">
            
          </div>
      */ 
      if(this.year==0){
      var year=new Date().getFullYear();
      var m = new Date().getMonth()+1;
      this.year=year;
      this.month=m;
    }
      var str ='<span id="dbfx_black_2" class="dbfx_black"><</span>\
          <span id="dbfx_riqi_2">'+this.year+'年'+this.month+'月</span>\
          <span id="dbfx_go_2" class="dbfx_go">></span>\
          <ul class="dbfx_week">\
            <li class="dbfx_first">一</li>\
            <li>二</li>\
            <li>三</li>\
            <li>四</li>\
            <li>五</li>\
            <li>六</li>\
            <li>日</li>\
          </ul>\
          <div id="dbfx_main_2" class="dbfx_main">\
          </div>'
          $($(".dbfx_rili_title")[1]).html(str)
    },
    getDays:function(year,yue){
      if(yue==1||yue==3||yue==5||yue==7||yue==8||yue==10||yue==12){
        return 31;
      }else if(yue==4||yue==6||yue==9||yue==11){
        return 30;
      }else {
        if((year%4==0&&year%100!=0)||year%400==0){
          return 29
        }else{
          return 28
        }
      }   
    },
    getWeek:function(stringTime){
      if(new Date(stringTime).getDay()==0){
        return 7
      }
      return new Date(stringTime).getDay()
      },
      setTime:function(e){  //点击返回按钮设置相应事件 2016年10月->2016年11月
      var riqi=$("#dbfx_riqi_2").html();
      var year =riqi.split("年")[0];     //得到年
      var month=parseInt(riqi.split("年")[1])//得到月
      if(e.id=="dbfx_go_2"){
        if(month<12){
        month++
        $("#dbfx_riqi_2").html(year+"年"+month+"月")
       }else{
        month=1
        year++
        $("#dbfx_riqi_2").html(year+"年"+month+"月")
       }
      }else if(e.id=="dbfx_black_2"){
        console.log("black");
        if(month>1){
        month--
        $("#dbfx_riqi_2").html(year+"年"+month+"月")
       }else{
        month=12
        year--
        $("#dbfx_riqi_2").html(year+"年"+month+"月")
       }
      }
      }
}
$($(".dbfx_rili_title")[1]).delegate("#dbfx_go_2","click",function(){
   var riqi=$("#dbfx_riqi_2").html();
    var year =riqi.split("年")[0];         //得到年
    var month=parseInt(riqi.split("年")[1])//得到月
    var yearNow=new Date().getFullYear();   
    var monthNow=new Date().getMonth();
    var dateNow =new Date().getDate();
    rili_2.setTime(this);
    rili_2.show();
    $("#dbfx_main_2 div").each(function(i,v){
      v.style.backgroundColor="#fff";
      if(v.style.color=="red"){
      v.style.color="black"
      }
    })
    if(year==yearNow&&month==monthNow){
      $("#dbfx_main_2 div").each(function(i,v){
        if(v.innerHTML==dateNow){
          v.style.backgroundColor="blue"
          v.style.color="red"
        }   
      })
    }
})
$($(".dbfx_rili_title")[1]).delegate("#dbfx_black_2","click",function(){
    var riqi=$("#dbfx_riqi_2").html();
    var year =riqi.split("年")[0];         //得到年
    var month=parseInt(riqi.split("年")[1])-1//得到月
    var yearNow=new Date().getFullYear();   
    var monthNow=new Date().getMonth()+1;
    var dateNow =new Date().getDate();
    rili_2.setTime(this);
    rili_2.show();
    $("#dbfx_main_2 div").each(function(i,v){
      v.style.backgroundColor="#fff";
    if(v.style.color=="red"){
      v.style.color="black";
    }
    })
      if(year==yearNow&&month==monthNow){
      $("#dbfx_main_2 div").each(function(i,v){
        if(v.innerHTML==dateNow){
          v.style.backgroundColor="blue"
          v.style.color="red"
        }   
      })
    }
})
 
  // 给#main 下的div注册点击事件
  $($(".dbfx_rili_title")[1]).delegate("#dbfx_main_2>div","click",function(){
     console.log(1)
      if(this.innerHTML!=0){
      var self=this;
      var riqi=$("#dbfx_riqi_2").html();
      var year =riqi.split("年")[0];     //得到年
      var month=parseInt(riqi.split("年")[1])//得到月
      $("#dbfx_main_2 div").each(function(i,v){
        if(v.style.backgroundColor!="blue"){
          v.style.backgroundColor="#fff"
        }
    })
      if(this.style.backgroundColor!="blue"){
      this.style.backgroundColor="#ccc"
    }
      $("#dbfx_ipt_2").val(year+"/"+month+"/"+self.innerHTML)
    }
  })
  
  rili_2.show();
  $("#dbfx_ipt_2").click(function(){
    $("#dbfx_d2_2").show()
  })
  $("#dbfx_d2_2").mouseleave(function(){
    $(this).hide()
  })
  // 扩展点击标题出现年份
$($(".dbfx_rili_title")[1]).delegate("#dbfx_riqi_2","click",function(){
  rili_2.getAllYear()
})
$($(".dbfx_rili_title")[1]).delegate("ul>li","click",function(){
  rili_2.year=this.innerHTML
  rili_2.createBox()
  rili_2.show()
})
  /*------日历2 end-------*/ 
/*------日历 end---------*/ 
/*分析对比图一end*/ 

/*分析对比图二start*/ 
var option_2 = {
    tooltip: {
        trigger:"axis"
    },
    color:["rgb(218,109,78)","rgb(84,177,179)"],
    grid:{
    	show:false,
    	width:"80%",
    	height:"80%",
    	top:"10%"
    },
    toolbox: {
       show:false
    },
    legend: {
        data:['go','sub'],
        textStyle:{
        	color:"rgb(236,238,239)"
        }
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap:false,
            data: ['6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00','2:00','4:00'],
            axisLine:{
            	show:false
            },
            splitLine:{
            	show:false
            },
           axisLabel:{
           	textStyle:{
           		color:"rgb(236,238,239)"
           	}
           },
           axisTick:{
           	show:false
           },
           axisLine:{

           	lineStyle:{

           		color:"rgb(236,238,239)"
           	}
           }
        }
    ],
    yAxis: [
        {
            type: 'value',    
            axisLabel: {
                formatter: '{value} ml'
            },
            splitLine:{
            	show:true,
            	lineStyle:{
            		color:"rgb(88,94,95)"
            	}
            },
            axisLabel:{
           	textStyle:{
           		color:"rgb(236,238,239)"
           	}
           },
           axisTick:{
           	show:false
           },
           axisLine:{
           	lineStyle:{
           		color:"rgb(236,238,239)"
           	}
           }
        }
    ],
    series: [
        {
            name:'go',
            type:'line',
            areaStyle: {normal: {}},
            data:[112.0, 24.9, 7.0, 13.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 16.4, 3.3]
        },
        {
            name:'sub',
            type:'line',
            areaStyle: {normal: {}},
            data:[2.6, 15.9, 29.0, 56.4, 38.7, 170.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3]
        }
    ]
};
myChart_2.setOption(option_2);
var data_2=[22.0, 104.9, 27.0, 123.2, 25.6, 76.7, 55.6, 162.2, 32.6, 220.0, 96.4, 31.3]
$("#btn_2").click(function(){
  option_2.series[0].data=data_2;
  myChart_2.setOption(option_2);
})

/*分析对比图二end*/ 

/*分析对比图三start*/ 

var myChart_3 =echarts3.init(document.getElementById("cavs_3"));
var option_3 = {
    tooltip: {
        trigger:"axis"
    },
    color:["rgb(218,109,78)","rgb(84,177,179)"],
    grid:{
    	show:false,
    	width:"80%",
    	height:"80%",
    	top:"10%"
    },
    toolbox: {
       show:false
    },
    legend: {
        data:['go','sub'],
        textStyle:{
        	color:"rgb(236,238,239)"
        }
    },
    xAxis: [
        {
            type: 'category',
             boundaryGap:false,
            data: ['6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00','2:00','4:00'],
            axisLine:{
            	show:false
            },
            splitLine:{
            	show:false
            },
           axisLabel:{
           	textStyle:{
           		color:"rgb(236,238,239)"
           	}
           },
           axisTick:{
           	show:false
           },
           axisLine:{

           	lineStyle:{

           		color:"rgb(236,238,239)"
           	}
           }
        }
    ],
    yAxis: [
        {
            type: 'value',    
            axisLabel: {
                formatter: '{value} ml'
            },
            splitLine:{
            	show:true,
            	lineStyle:{
            		color:"rgb(88,94,95)"
            	}
            },
            axisLabel:{
           	textStyle:{
           		color:"rgb(236,238,239)"
           	}
           },
           axisTick:{
           	show:false
           },
           axisLine:{
           	lineStyle:{
           		color:"rgb(236,238,239)"
           	}
           }
        }
    ],
    series: [
        {
            name:'go',
            type:'line',
            smooth:true,
            symbolSize:1,
            showSymbol:false,
            data:[2.0, 4.9, 7.0, 23.2, 15.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'sub',
            type:'line',
            smooth:true,
            symbolSize:1,
            showSymbol:false,
            data:[102.6, 65.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 16.0, 32.3]
        }
    ]
};
myChart_3.setOption(option_3);
var data_3=[22.0, 104.9, 27.0, 123.2, 25.6, 76.7, 55.6, 162.2, 32.6, 220.0, 96.4, 31.3]
$("#btn_3").click(function(){
  option_3.series[0].data=data_3;
  myChart_3.setOption(option_3);
})
/*分析对比图三end*/ 


//divs 切换
var lis=document.querySelectorAll(".content_d2 ul li")
var divs=document.querySelectorAll(".divs");
 for(var i=0,j=lis.length;i<j;i++){
 	lis[i].index=i;
 	lis[i].onclick=function(){
 		for(var j=0,k=divs.length;j<k;j++){
 			divs[j].style.display="none"
 			lis[j].style.color="#fff"
 		}
 		divs[this.index].style.display="block";
 		this.style.color="rgb(249,158,45)";
 	}
 }

/*csjc map1*/
var csjc_cavs=document.getElementById('csjc_cavs');
var myChart_4 = echarts3.init(csjc_cavs);
var option_4 = {
    tooltip: {
        trigger:"axis"
    },
    color:["rgb(218,109,78)","rgb(84,177,179)"],
    grid:{
      show:false,
      width:"80%",
      height:"80%",
      top:"10%"
    },
    toolbox: {
       show:false
    },
    legend: {
        data:['go'],
        show:false,
        textStyle:{
          color:"rgb(236,238,239)"
        }
    },
    xAxis: [
        {
            type: 'category',
            data: ['6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','00:00','2:00','4:00'],
            axisLine:{
              show:false
            },
            splitLine:{
              show:false
            },
           axisLabel:{
            textStyle:{
              color:"rgb(236,238,239)"
            }
           },
           axisTick:{
            show:false
           },
           axisLine:{
            lineStyle:{
              color:"rgb(236,238,239)"
            }
           }
        }
    ],
    yAxis: [
        {
            type: 'value',    
            axisLabel: {
                formatter: '{value} ml'
            },
            splitLine:{
              show:true,
              lineStyle:{
                color:"rgb(88,94,95)"
              }
            },
            axisLabel:{
            textStyle:{
              color:"rgb(236,238,239)"
            }
           },
           axisTick:{
            show:false
           },
           axisLine:{
            lineStyle:{
              color:"rgb(236,238,239)"
            }
           }
        }
    ],
    series: [
        {
            name:'go',
            type:'bar',
            data:[100,90,66,70,60,50,40,30,20,10,5,11]
        }
    ]
};
myChart_4.setOption(option_4);

myChart_4.on('click',function(e){
  console.log(e.name=="2:00")
switch(e.name){
  case "6:00":
  $("#fxpg_nt1").html("5");
  $("#fxpg_nt2").html("6");
  $("#fxpg_nt3").html("7");
  $("#fxpg_nt4").html("1");
  $("#fxpg_nt5").html("1");
  break;
  case "8:00":
  $("#fxpg_nt1").html("2");
  $("#fxpg_nt2").html("4");
  $("#fxpg_nt3").html("1");
  $("#fxpg_nt4").html("5");
  $("#fxpg_nt5").html("2");
  break;
  case "10:00":
  $("#fxpg_nt1").html("6");
  $("#fxpg_nt2").html("6");
  $("#fxpg_nt3").html("2");
  $("#fxpg_nt4").html("3");
  $("#fxpg_nt5").html("3");
  break;
  case "12:00":
  $("#fxpg_nt1").html("7");
  $("#fxpg_nt2").html("2");
  $("#fxpg_nt3").html("3");
  $("#fxpg_nt4").html("4");
  $("#fxpg_nt5").html("4");
  break;
  case "14:00":
  $("#fxpg_nt1").html("7");
  $("#fxpg_nt2").html("5");
  $("#fxpg_nt3").html("2");
  $("#fxpg_nt4").html("2");
  $("#fxpg_nt5").html("5");
  break;
  case "16:00":
  $("#fxpg_nt1").html("5");
  $("#fxpg_nt2").html("2");
  $("#fxpg_nt3").html("1");
  $("#fxpg_nt4").html("4");
  $("#fxpg_nt5").html("6");
  break;
  case "18:00":
  $("#fxpg_nt1").html("6");
  $("#fxpg_nt2").html("4");
  $("#fxpg_nt3").html("3");
  $("#fxpg_nt4").html("2");
  $("#fxpg_nt5").html("7");  
  break;
  case "20:00":
  $("#fxpg_nt1").html("7");
  $("#fxpg_nt2").html("8");
  $("#fxpg_nt3").html("9");
  $("#fxpg_nt4").html("2");
  $("#fxpg_nt5").html("3");
  break;
  case "22:00":
  $("#fxpg_nt1").html("3");
  $("#fxpg_nt2").html("4");
  $("#fxpg_nt3").html("7");
  $("#fxpg_nt4").html("2");
  $("#fxpg_nt5").html("4");
  break;
  case "00:00":
  $("#fxpg_nt1").html("6");
  $("#fxpg_nt2").html("3");
  $("#fxpg_nt3").html("9");
  $("#fxpg_nt4").html("2");
  $("#fxpg_nt5").html("2");
  break;
  case "2:00":
  $("#fxpg_nt1").html("4");
  $("#fxpg_nt2").html("3");
  $("#fxpg_nt3").html("1");
  $("#fxpg_nt4").html("9");
  $("#fxpg_nt5").html("5");
  break;
  case "4:00":
  $("#fxpg_nt1").html("4");
  $("#fxpg_nt2").html("3");
  $("#fxpg_nt3").html("2");
  $("#fxpg_nt4").html("7");
  $("#fxpg_nt5").html("7");
  break;
}
});
/*csjc map2*/
var csjc_cavs2=document.getElementById('csjc_cavs2');
var myChart_5 = echarts3.init(csjc_cavs2);
var option_5 = {
    tooltip: {
        trigger:"axis"
    },
    color:["rgb(218,109,78)","rgb(84,177,179)"],
    grid:{
      show:false
    },
    toolbox: {
       show:false
    },
    legend: {
        data:['go','sub'],
        textStyle:{
          color:"rgb(236,238,239)"
        }
    },
    xAxis: [
        {
            type: 'category',
            data: ['6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00','2:00','4:00'],
            axisLine:{
              show:false
            },
            splitLine:{
              show:false
            },
           axisLabel:{
            textStyle:{
              color:"rgb(236,238,239)"
            }
           },
           axisTick:{
            show:false
           },
           axisLine:{

            lineStyle:{

              color:"rgb(236,238,239)"
            }
           }
        }
    ],
    yAxis: [
        {
            type: 'value',    
            axisLabel: {
                formatter: '{value} ml'
            },
            splitLine:{
              show:true,
              lineStyle:{
                color:"rgb(88,94,95)"
              }
            },
            axisLabel:{
            textStyle:{
              color:"rgb(236,238,239)"
            }
           },
           axisTick:{
            show:false
           },
           axisLine:{
            lineStyle:{
              color:"rgb(236,238,239)"
            }
           }
        }
    ],
    series: [
        {
            name:'go',
            type:'line',
            data:[40.0, 43.9, 17.0, 23.2, 33.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 21.3]
        },
        {
            name:'sub',
            type:'line',
            data:[2.6, 75.9, 9.0, 2.4, 8.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        }
    ]
};
myChart_5.setOption(option_5);
/*数据读取部分*/
setInterval(function(){
  $(".csjc_data_span").fadeOut(1000,function(){
  $(".csjc_data_span").fadeIn(200,function(){
    $(".csjc_data .nt2").html(parseInt($(".csjc_data .nt2").html())+200);
    var title=parseInt($(".csjc_data .nt2").html());
    $(".n1").html(parseInt($(".csjc_data .nt2").html()));
    $(".n1").attr("title",title)
  })
  });
},1200)



/*csjc*/ 

// lssj
/*--------·page start----------*/
  $("#ul-page").delegate("li","click",function(){
    $("#ul-page li").each(function(){
      $(this).removeClass("page-click");
      $(this).addClass("page");
    })
    $(this).addClass("page-click");
  })
var setPage={
     arr:[
    ],                   //保存着数据
     pageArr:[],         //page[number] for [1,2,3,4,5]
     maxLen:8,           //page[max ge]  控制页数
     index:0,            //页数index 
     init:function(){
      this.restart();
      this.getPage();
      this.getItem();
     },
     restart:function(){
      this.index=0;
      $("#lssj_page_input").val(1)
     },
     getItem:function(){
      this.maxLen=this.maxLen>this.arr.length?this.arr.length:this.maxLen;
      $("#ul-item").html('');
      var frag=document.createDocumentFragment();
        for(var i=this.index*this.maxLen;i<this.index*this.maxLen+this.maxLen;i++){
          if(this.arr[i]!==undefined){
          var li=document.createElement("li");  
          var ul=document.createElement("ul");  
              ul.id="ul-item-2";
          for(var key in this.arr[i]){
             var li2=document.createElement("li");
                 li2.innerHTML=this.arr[i][key];
                 ul.appendChild(li2); 
          }   
              li.appendChild(ul);
              frag.appendChild(li);
            }
        }
        $("#ul-item").append(frag);   

     },
     getPage:function(){
      $("#ul-page").html("");
      this.pageArr=[];
      var frag=document.createDocumentFragment()
        for(var i=0;i<Math.ceil(this.arr.length/this.maxLen);i++){
          this.pageArr.push(i+1);
        }
        if(this.pageArr.length<=5){
        for(var i=0;i<this.pageArr.length;i++){
           var li=document.createElement("li");
         li.innerHTML=i+1;
         frag.appendChild(li)
        }
      } else{
          for(var i=0;i<5;i++){
             if(i==0){
              var li = document.createElement("li");
              li.innerHTML=i+1;
              frag.appendChild(li)
             }else if(i==1){
              var li = document.createElement("li");
              li.innerHTML="...";
              frag.appendChild(li)
             }else if(i==2){
               var li = document.createElement("li");
              li.innerHTML=parseInt(this.pageArr.length/2);
              frag.appendChild(li)
             }else if(i==3){
 var li = document.createElement("li");
              li.innerHTML="...";
              frag.appendChild(li)
             }else if(i==4){
               var li = document.createElement("li");
              li.innerHTML=this.pageArr.length;
              frag.appendChild(li)
             }
          }
      }
        console.log("pageArr",this.pageArr);
        $("#ul-page").append(frag)
        $("#ul-page li").each(function(){
            $(this).addClass("page");
        })
        $($("#ul-page li")[0]).addClass("page-click");
     }
}
$("#ul-page").delegate("li","click",function(){
            if(parseInt(this.innerHTML)-0){
             setPage.index=this.innerHTML-1;
             $("#lssj_page_input").val(this.innerHTML)
             setPage.getItem();
           }
        })
// 跳转到下一页
  $("#lssj_go").click(function(){
    if(setPage.index<setPage.pageArr.length-1){
      var num = setPage.index+1;    // 1
      setPage.index=setPage.pageArr[num-1]; //1
      setPage.getItem();
      $("#lssj_page_input").val(setPage.index+1)
      if(setPage.pageArr.length<=5){
      $("#ul-page li").removeClass("page-click");
      $($("#ul-page li")[num]).addClass("page-click");
    }
      if(setPage.pageArr.length>5){                 
        $("#ul-page li").removeClass("page-click");
      }
    }
  })
  // 返回上一页
  $("#lssj_back").click(function(){
    if(setPage.index>=1){
     var num = setPage.index-1;      // 1
      setPage.index=setPage.pageArr[num]-1;
      setPage.getItem();
      $("#lssj_page_input").val(setPage.index+1)
      if(setPage.pageArr.length<=5){
       $("#ul-page li").removeClass("page-click");
      $($("#ul-page li")[num]).addClass("page-click")
    }
    if(setPage.pageArr.length>5){                    
        $("#ul-page li").removeClass("page-click");
      }
    }
  })
  // 点击确认按钮跳转到指定页数
 $("#lssj_page_btn").click(function(){
     var num = $("#lssj_page_input").val();
     if(num<=setPage.pageArr.length){
     setPage.index=num-1;
     setPage.getItem();
     if(setPage.pageArr.length<=5){
       $("#ul-page li").removeClass("page-click");
      $($("#ul-page li")[num-1]).addClass("page-click")
    }
   }
 })
//点击搜索按钮出现数据
$("#lssj_search").click(function(){
  console.log($("#lssj_v2").val())
  if($("#lssj_v2")[0].selectedOptions[0].innerHTML=="2012-10-04"){
  setPage.arr=[{a:"1a",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a2",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a3",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a4",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a5",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a6",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a7",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a8",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a9",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a10",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a11",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a12",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a13",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a14",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a15",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a16",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a17",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a18",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a19",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a20",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a21",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a22",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a23",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a24",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a25",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a26",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a27",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a28",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a29",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a30",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a31",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a32",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a33",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a34",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a35",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a36",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a37",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a38",b:"b",c:"xx",d:"yy",e:"zz"}]
  }else{
  setPage.arr=[{a:"1a",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a2",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a3",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a4",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a5",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a6",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a7",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a8",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a9",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a10",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a11",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a12",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a13",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a14",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a15",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a16",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a17",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a18",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a19",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a20",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a21",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a22",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a23",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a24",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a25",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a26",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a27",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a28",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a29",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a30",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a31",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a32",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a33",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a34",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a35",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a36",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a37",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a38",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a39",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a40",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a41",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a42",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a43",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a44",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a45",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a46",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a47",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a48",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a49",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a50",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a51",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a52",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a53",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a54",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a55",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a56",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a57",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a58",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a59",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a60",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a61",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a62",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a63",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a64",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a65",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a66",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a67",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a68",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a69",b:"b",c:"xx",d:"yy",e:"zz"},
       {a:"a70",b:"b2",c:"xx2",d:"yy",e:"zz"},
       {a:"a71",b:"b3",c:"xx3",d:"yy",e:"zz"},
       {a:"a72",b:"b4",c:"xx4",d:"yy",e:"zz"},
       {a:"a73",b:"b5",c:"xx5",d:"yy",e:"zz"},
       {a:"a74",b:"b",c:"xx",d:"yy",e:"zz"}]
  }
  setPage.init();
})
/*分页结束*/ 


 /*------yxjc start------*/
 $("#T").click(function(){
  console.log(1)
    $(".yxjc_modal").fadeIn(200)
 }) 
 $("#yxjc_modal_close").click(function(){
   $(".yxjc_modal").fadeOut(200)
 })

 yxjc_modal_cavs

 var yxjc_cavs=document.getElementById('yxjc_modal_cavs');
var yxjc_myChart= echarts3.init(yxjc_cavs);

var yxjc_option = {
    title: {
        text: '',
        subtext: ''
    },
    tooltip: {
        formatter:function(f){
          return f.seriesName+":"+f.data
        }
    },
    legend: {
      show:false,
        data:['IP访问量']
    },
    toolbox: {
        show: false,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: (function (){
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        }
    ],
    yAxis: [
      
        {
            type: 'value',
            scale: true,
            name: 'IP量',
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [
        {
            name:'IP访问量',
            type:'bar',
            color:"#e4393c",
            yAxisIndex: 0,
            data:(function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })()
        }
    ]
};
count = 11;
timeTicket = setInterval(function (){
    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

    var data0 = yxjc_option.series[0].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
  

    yxjc_option.xAxis[0].data.shift();
    yxjc_option.xAxis[0].data.push(axisData);
  yxjc_myChart.setOption(yxjc_option);
}, 2100);




 /*------yxjc end------*/ 
}//end