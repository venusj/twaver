
function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function fullScreen() {
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;

    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
        // for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }

}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function toFullscreen(id)
{
	if(id=="fullscreen")
	{
		launchFullscreen(document.documentElement);
		$("#fullscreen").css({"display":"none"});
		$("#exitfullscreen").css({"display":""});
		fullscreen = true;
	}
	else
	{
		exitFullscreen();
		$("#fullscreen").css({"display":""});
		$("#exitfullscreen").css({"display":"none"});
		fullscreen = false;
	}
}

   function formateTime(x,y) {
      var z = {M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
      y = y.replace(/(M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-2)});
      return y.replace(/(y+)/g,function(v) {return x.getFullYear().toString().slice(-v.length)});
    }
	

function changeMap(id)
{
	if(id=="tochina")
	{
		
	}
}

function zoomChange(id)
{
	if(id=="zoomin")
	{
		network.zoomIn();
	}
	else
	{
		network.zoomOut();
	}
}

function registerImage() {
twaver.Util.registerImage('unvisble', {
  w: 1,
  h: 1,
  line: {
    width: 1,
    color: '#EC6C00'
  },
  v: [
    {
      shape: 'line',
	  visible: false
    },
    {
      shape: 'line',
	  visible: false
    }
  ]
});
  twaver.Util.registerImage('locate', {
    "w": 42.771,
    "h": 43,
    "origin": {
      "x":-0.05,
      "y": -0.1
    },
    //"clip": true,
    "v": [
    {
      "shape": "ellipse",
      "cx": 8.432,
      "cy": 5.531,
      "rx": 5,
      "ry": 0,
      "fill": "#F42525"
    },
    {
      "shape": "path",
      "data": "M23,0c12.702,0,23,10.327,23,23.065C46,35.804,31.654,56.152,23,62C14.437,56.335,0,35.804,0,23.065C0,10.327,10.297,0,23,0z",
      "fill": function(data)
			{
				var value = getColor(data.getClient('c_value'));
				return value;
			},
	  "gradient": function(data){
				var value = data.getClient('c_value');
				var color;
				if(value<20)
				{
					color = "#1BD6AE";
				}
				else if(value<40)
				{
					color = "#1BD6AE";
				}
				else if(value<60)
				{
					color = "#FDF900";
				}
				else if(value<80)
				{
					color = "#FFA134";
				}
				else
				{
				//#C99292
					color = "#C99292";
				}
					return {type: 'linear.south',color: color};
			}		
    },
   {
      shape: 'text',
      text: function(data){
             var value = data.getClient('c_value');
             return value;
		},
      textAlign: 'right',
      textBaseline: 'bottom',
	  fill: 'white',
	  font: '28px Arial, bolder',
      x: function(data){
             var value = data.getClient('c_value');
			 if(value>=100)
			 {
				 return 44;
			 }
			 else if(value == 0)
			 {
				return 30;
		     }
             return 38;
		},
      y: 38
    },{
      shape: 'text',
      text: function(data){
             var value = data.getClient('c_name');
             return value;
		},
      textAlign: 'right',
      textBaseline: 'bottom',
	  fill: 'white',
	  font: '20px Arial, bolder',
      x: function(data){
          var value = data.getClient('c_name').length;
          return 30+10*(value-1)/2;
		},
      y: 95
    }
    ]
  });
  twaver.Util.registerImage('circle', {
    v: [
    {
      shape: 'vector',
      name: ''
    },
    {
      shape: 'circle',
      r: 0,
      rel: true,
      alpha: 0.7,
      fill: 'blue',
      visible: function (data) {
        return !data.getClient('hide');
      },
      gradient: function (data) {
        if(data._animates[1].r.current >= 0.5) {
          if(data.getClient('depository') === 'depository'){
            setTimeout(function(){
              box.remove(data);
            },300);
          }
        }
        return {
          type: 'radial',
          r: data._animates[1].r.current * data.getWidth(),
          fx: 0,
          fy: 0,
          stop: [
          {
            offset: 1,
            color: data.getClient('color')
          },
          {
            offset: 0.5,
            color: 'rgba(255, 255, 255, 0)'
          },
          {
            offset: 0,
            color: 'rgba(255, 255, 255, 0)'
          }
          ]
        };
      },
      animate: 
      [
      {
        attr: 'r',
        from: 0,
        to: 0.5,
        repeat: 1,
        reverse: false,
        dur: 1500,
        interval: 400,
        easing: 'easeOut'
      },
      {
        attr: 'alpha',
        from: 1,
        to: 0,
        repeat: 1,
        reverse: false,
        delay: 800,
        dur: 1500,
      }
      ]
    },
    ]
  });
  twaver.Util.registerImage('threatsrc',{
				"w": 20,
				"h": 20,
				"origin": {
				"x": 0,
				"y": 0
				},
				"clip": true,
				"translate": {
				"x": 0,
				"y": 0
				},
				"v": [
				{
				"shape": "g",
				"v": [
				{
				"shape": "path",
				"data": "M10,0L3,9h4l-1,7l7-9H9L10,0z",
				"fill": "#FFFF14",
				"fillRule": "evenodd"
				}
				]
				}
				]
				});
				twaver.Util.registerImage('gradient1', {
					  w: 180,
					  h: 18,
					 //clip:true,
					  v: [
					  /*{
					  shape: 'vector',
					  name: 'gradient2',
					  //align:"right",
					  textAlign: 'right',
					  x:-35,
					  y:8
						},
						 {
						  shape: 'ellipse',
						  cx: -10,
						  cy: 0,
						  rx: function(data){
							var value = data.getClient('c_width');
							return value/2;
							},
						  ry: 15,
						  fill: '#0089C1',
						  gradient: {
							type: 'linear.west',
							color: '#61B6D8'
						  }
						},*/
						{
						  shape: 'text',
						  text: function(data){
								var value = data.getClient('c_width');
								 return value/2;
							},
						  textAlign: 'right',
						  textBaseline: 'top',
						  fill: '#2AECFF',
						  font: '13px arial bold',
						 x: 88,
						 // y: 10.55
						},
						{
						  shape: 'text',
						  text: function(data){
								 var value = data.getClient('c_name');
								 return value;
							},
						  textAlign: 'left',
						  textBaseline: 'bottom',
						  fill: '#2B9CD5',
						  font: '12px arial bold',
						 x:-90
						 /*function(data){
							var value = data.getClient('c_width');
							return -value/2;
						}*/
						 // y: 10
						}
					  ]
					});
					twaver.Util.registerImage('gradient2', {
					  w: function(data){
							var value = data.getClient('c_width');
							return value;
						},
					  h: 7,
					  clip:true,
					  lineWidth: 0.1,
					  v: [
					  {
						  shape: 'ellipse',
						  cx: function(data){
							var value = data.getClient('c_width');
							if(value/2<10)
							{
								return -8;
							}
							return -86+value/2;
						  },
						  cy: 0,
						  rx: 82,
						  ry: 15,
						  fill: function(data){
								var value = data.getClient('c_color');
								return value;
						  },
						  gradient: 
						  function(data){
								var value = data.getClient('c_score');
								var color;
								if(value<20)
								{
									color = "#1BD6AE";
								}
								else if(value<40)
								{
									color = "#1BD6AE";
								}
								else if(value<60)
								{
									color = "#FDF900";
								}
								else if(value<80)
								{
									color = "#FFA134";
								}
								else
								{
									color = "#B7616D";
								}
								return {type: 'linear.east',color: color};
						  }
						  /*{
							type: 'linear.east',
							color: 
						  }*/
						}
					  ]
					});
     twaver.Util.registerImage('gradient3', {
					  w: 40,
					  h: 20,
					 //clip:true,
					  v: [					  
						{
						  shape: 'text',
						  text: function(data){
								 var value = data.getClient('c_name');
								 return value;
							},
						  textAlign: 'left',
						  textBaseline: 'bottom',
                          fill: '#2B9CD5',
						  font: '12px arial bold',
						 x:-25					 
						}
					  ]
					});
                twaver.Util.registerImage('gradient4', {
					  w: 12,
					  h: function(data){
							var value = data.getClient('c_height');
							//console.log(value);
							return value+10;
						},
					  clip:true,
					  lineWidth: 0.1,
					  v: [
					  {
						  shape: 'ellipse',
						  cx: 0,
						  cy: function(data){
								var value = data.getClient('c_height');
                            
								if(value/2<10)
								{
									return 8;
								}
								//console.log( 120-(value/2));
							return 148-(value/2);
							},
						  rx: 25,
						  ry: 135,
                          fill: function(data){
							var value = data.getClient('c_color');
                            
							return value;
							},
						  gradient: function(data){
								var value = data.getClient('c_score');
								var color;
								if(value<20)
								{
									color = "#1BD6AE";
								}
								else if(value<40)
								{
									color = "#1BD6AE";
								}
								else if(value<60)
								{
									color = "#FDF900";
								}
								else if(value<80)
								{
									color = "#FFA134";
								}
								else
								{
									color = "#B7616D";
								}
								return {type: 'linear.north',color: color};
						  }
						}
					  ]
					});
                    twaver.Util.registerImage('gradient5', {
					  w: 30,
					  h: 30,
					  //clip:true,
					  lineWidth: 1,
                      lineColor: function(data){
							var value = data.getClient('c_color');
							return value;
							},
					  v: [
                          {
						  shape: 'text',
						  text: function(data){
								 var value = data.getClient('c_name');
                                 var value2 = data.getClient('c_num');
								 return value+'\n'+value2;
							},
						  textAlign: 'center',
						  textBaseline: 'top',
                          fill: function(data){
							var value = data.getClient('c_color');
							return value;
							},
						  //fill: '#2B9CD5',
						  font: '12px arial bold',
						 x:0,
                         y:25
						},
					  {
						  shape: 'ellipse',
						  cx: 0,
						  cy: 30,
						  rx: function(data){
							var value = data.getClient('c_R');
                            
							return value/4;
							},
						  ry: function(data){
							var value = data.getClient('c_R');
                            
							return value/4;
							},
                          fill: 'rgba(255,255,255,0.1)'
						}
					  ]
					});
         twaver.Util.registerImage('gradient6', {
					  w: 50,
					  h: 40,
					  v: [					  
						{
						  shape: 'text',
						  text: "返回",
						  textAlign: 'left',
						  textBaseline: 'bottom',
                          fill: '#2B9CD5',
						  font: '14px arial bold',
						 x:-15,
                         y:20
						}
					  ]
					});
      twaver.Util.registerImage('threatsrc2',{
				"w": 28,
				"h": 28,
				"origin": {
				"x": 0,
				"y": 0
				},
//				"clip": true,
				"translate": {
				"x": 0,
				"y": 0
				},
				"v": [
                {
                    shape: 'ellipse',
						  cx: 8,
						  cy: 8,
						  rx: 8,
						  ry: 8,
                          fill: "#FFFF14"
                },
				{
				"shape": "g",
				"v": [
				{
				"shape": "path",
				"data": "M10,0L3,9h4l-1,7l7-9H9L10,0z",
				"fill": "black",
				"fillRule": "evenodd"
				}
				]
				}
				]
				});
	twaver.Util.registerShape('triangle1', function (g, shapeData, data, view) {
		  var rect = shapeData.rect;
		  g.moveTo(rect.x + rect.w / 2, -rect.y/3);
		  g.lineTo(-(rect.x + rect.w), -(rect.y + rect.h));
		  g.lineTo(-rect.x, -(rect.y + rect.h));
		  g.closePath();
		});	
		twaver.Util.registerShape('triangle2', function (g, shapeData, data, view) {
		  var rect = shapeData.rect;
		  g.moveTo(-rect.x/3, rect.x + rect.w / 2);
		  g.lineTo(-(rect.x + rect.w), rect.y + rect.h);
		  g.lineTo(-(rect.x + rect.w), -(rect.y + rect.h));
		  g.closePath();
		});	
	twaver.Util.registerImage('regionImage',{
			  w: 20,
			  h: 20,
			  v: [
				{
					shape: 'circle',
					r: 50,
					cx: -36,
					cy: 0,
					lineColor: '#FFE1BB',
					lineWidth: 0.1,
					fill: function(data)
						{
							var value = getColor(data.getClient("c_score"));
							return value;
						},
				},{
				shape: 'text',
				  text: function(data)
				  {
					  return data.getClient("c_score");
				  },
				  textAlign: 'center',
				  textBaseline: 'bottom',
				  fill: 'white',
				  x: -45,
				  y: 35,
				  font: '60px Arial,bolder',
				}
			  ]
			});		
	twaver.Util.registerImage('regionImage1',{
			  w: 20,
			  h: 20,
			  v: [
				{
					shape: 'circle',
					r: 50,
					cx: -36,
					cy: 0,
					lineColor: '#FFE1BB',
					lineWidth: 0.1,
					fill: function(data)
						{
							var value = getColor(data.getClient("c_score"));
							return value;
						},
				},
				//'triangle2'
				{
				  shape: 'triangle1',
				  rect: { x: -1, y: -1, w: 2, h: 2 },
				  lineWidth: 10,
				  lineColor: '#FFE1BB'
				},{
				shape: 'text',
				  text: function(data)
				  {
					  return data.getClient("c_score");
				  },
				  textAlign: 'center',
				  textBaseline: 'bottom',
				  fill: 'white',
				  x: -50,
				  y: 35,
				  font: '60px Arial,bolder',
				}
			  ]
			});
			twaver.Util.registerImage('regionImage2',{
			  w: 20,
			  h: 20,
			  v: [
				{
					shape: 'circle',
					r: 50,
					cx: -36,
					cy: 0,
					lineColor: '#FFE1BB',
					lineWidth: 0.1,
					fill: function(data)
						{
							var value = getColor(data.getClient("c_score"));
							return value;
						},
				},
				//'triangle2'
				{
				  shape: 'triangle2',
				  rect: { x: -1, y: -1, w: 2, h: 2 },
				  lineWidth: 10,
				  lineColor: '#FFE1BB'
				},{
				shape: 'text',
				  text: function(data)
				  {
					  return data.getClient("c_score");
				  },
				  textAlign: 'center',
				  textBaseline: 'bottom',
				  fill: 'white',
				  x: -50,
				  y: 35,
				  font: '60px Arial,bolder',
				}
			  ]
			});

}

function lnglatToXY (lng, lat,width,height) {
  lng -= 5;
  lat -= 19;
  var L = 6381372 * Math.PI * 2;
  var W=L;
  var H=L/2;
  var mill=2.3;
  var x = lng * Math.PI / 180;
  var y = lat * Math.PI / 180;
  y=1.25 * Math.log( Math.tan( 0.25 * Math.PI + 0.4 * y ) );
  x = ( W / 2 ) + ( W / (2 * Math.PI) ) * x;  
  y = ( H / 2 ) - ( H / ( 2 * mill ) ) * y;  
  var scaleX = W/width;
  var scaleY = H/height;

  return {x: bounds.x + x/scaleY, y:bounds.y + y/scaleY}; 
}

function getColor(val)
{
	if(val<20)
	{
		return "#06CC49";
	}
	else if(val<40)
	{
		return "#009AE7";
	}
	else if(val<60)
	{
	    return "#FFCC00";
	}
	else if(val<80)
	{
		return "#FFA235";
	}
	else
	{
		return "#DD1000";
	}
}

function getBrowser(){
     var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
     if (isOpera) {
         return "Opera"
     }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
         return "FF";
     } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
   return "Chrome";
  }
     if (userAgent.indexOf("Safari") > -1) {
         return "Safari";
     } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
         return "IE";
     }; //判断是否IE浏览器
}

	function registerNormalImage(url, name) {
	 var image = new Image();
	 image.src = url;
	 image.onload = function() {
		 twaver.Util.registerImage(name, image, image.width, image.height);
		 image.onload = null;
		 network.invalidateElementUIs();
		 };
	 }
	 
	 //为toolbar绑定点击事件
	function bindToolBarClickEvent()
	{
		$("#toolbarDiv").find("td").each(function(e)
		{
			var currentEle = $(this);  
		
			 currentEle.click(function(){ 
				//获取当前td的index，从0开始
				var cellIndex = currentEle.get(0).cellIndex;
				/*console.log(document.body.scrollHeight);
				console.log(document.body.clientHeight);
				console.log(document.body.scrollWidth);
				console.log(window.screen.width);*/
				//console.log(currentEle);
				//console.log(currentEle.get(0).cellIndex);
				if(cellIndex==0||cellIndex==1)
				{
					changeImage(0,threatLevelView);
				}
				else if(cellIndex==2||cellIndex==3)
				{
					changeImage(2,topRiskAssetBoxView);
				}
				else if(cellIndex==4||cellIndex==5)
				{
					changeImage(4,topRiskRegionBoxView);
				}
				else if(cellIndex==6||cellIndex==7)
				{
					changeImage(6,topRiskCountryBoxView);
				}
				else if(cellIndex==8||cellIndex==9)
				{
					changeImage(8,alarmBoxView);
				}
				else if(cellIndex==14||cellIndex==15)
				{
					if($("#toolbarDiv").find("td").eq(15).find("img:eq(0)").css("display")=="none")
					{
						$("#toolbarDiv").find("td").eq(15).find("img:eq(1)").css({"display":"none"});
						$("#toolbarDiv").find("td").eq(15).find("img:eq(0)").css({"display":""});
						//需要关闭全网威胁图表
						$("#toolbarDiv").find("td").eq(14).find("span").css("color","#2B9CD5");	
						//changeImage(8,alarmBoxView);
						flowLinks.forEach(function(e)
						{
							if(e.getClient('linkType')=="static")
							{
								e.s('link.color', "yellow").s('link.width', 1);
								e.s('arrow.to',true);
							}
						});
					}
					else
					{
						//需要打开全网威胁图表
						$("#toolbarDiv").find("td").eq(15).find("img:eq(0)").css({"display":"none"});
						$("#toolbarDiv").find("td").eq(15).find("img:eq(1)").css({"display":""});
						$("#toolbarDiv").find("td").eq(14).find("span").css("color","#1C4758");
						//changeImage(8,alarmBoxView);
						flowLinks.forEach(function(e)
						{
							if(e.getClient('linkType')=="static")
							{
								e.s('link.color', "rgba(2,10,24,0.1)").s('link.width', 0.1);
								e.s('arrow.to',false);
							}
						});
					}	
				}
				else if(cellIndex==16||cellIndex==17)
				{
					if($("#toolbarDiv").find("td").eq(17).find("img:eq(0)").css("display")=="none")
					{
						$("#toolbarDiv").find("td").eq(17).find("img:eq(1)").css({"display":"none"});
						$("#toolbarDiv").find("td").eq(17).find("img:eq(0)").css({"display":""});
						//需要关闭全网威胁图表
						$("#toolbarDiv").find("td").eq(16).find("span").css("color","#2B9CD5");	
						//changeImage(8,alarmBoxView);
						flowLinks.forEach(function(e)
						{
							if(e.getClient('linkType')=="dynamic")
							{
								e.s('link.color', "yellow").s('link.width', 1);
								e.s('arrow.to',true);
							}
						});
					}
					else
					{
						//需要打开全网威胁图表
						$("#toolbarDiv").find("td").eq(17).find("img:eq(0)").css({"display":"none"});
						$("#toolbarDiv").find("td").eq(17).find("img:eq(1)").css({"display":""});
						$("#toolbarDiv").find("td").eq(16).find("span").css("color","#1C4758");
						//changeImage(8,alarmBoxView);
						flowLinks.forEach(function(e)
						{
							if(e.getClient('linkType')=="dynamic")
							{
								e.s('link.color', "rgba(2,10,24,0.1)").s('link.width', 0.1);
								e.s('arrow.to',false);
							}
						});
						
					}	
				}
			 });
		});
	}

	function changeImage(index,view)
	 {
		if($("#toolbarDiv").find("td").eq(index).find("img:eq(0)").css("display")=="none")
		{
			$("#toolbarDiv").find("td").eq(index).find("img:eq(1)").css({"display":"none"});
			$("#toolbarDiv").find("td").eq(index).find("img:eq(0)").css({"display":""});
			//需要关闭全网威胁图表
			$("#toolbarDiv").find("td").eq(index+1).find("span").css("color","#2B9CD5");	
			document.body.appendChild(view);
		}
		else
		{
			//需要打开全网威胁图表
			$("#toolbarDiv").find("td").eq(index).find("img:eq(0)").css({"display":"none"});
			$("#toolbarDiv").find("td").eq(index).find("img:eq(1)").css({"display":""});
			$("#toolbarDiv").find("td").eq(index+1).find("span").css("color","#1C4758");
			document.body.removeChild(view);
		}		
	 }
	 
	function G(s)
	{
		return document.getElementById(s);
	}
	
	//console.log(assetPicLi);
    function getStyle(obj, attr){
    	if(obj.currentStyle){
    		return obj.currentStyle[attr];
    	}else{
    		return getComputedStyle(obj, false)[attr];
    	}
    }
    
    function Animate(obj, json){
    	if(obj.timer){
    		clearInterval(obj.timer);
    	}
    	obj.timer = setInterval(function(){
    		for(var attr in json){
    			var iCur = parseInt(getStyle(obj, attr));
    			iCur = iCur ? iCur : 0;
    			var iSpeed = (json[attr] - iCur) / 5;
    			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
    			obj.style[attr] = iCur + iSpeed + 'px';
    			if(iCur == json[attr]){
    				clearInterval(obj.timer);
    			}
    		}
    	}, 30);
    }	
	
	function renderTable(params)
	{
		var div = params.div;
		var data = params.data;
		var level = data.getClient("level");
		var color = 'rgba(41,255,0,1)';
		if(null!=level)
		{
			color = "#2FD6FF";
		}
		div.style.color = color;
		div.style.textAlign = 'center';
		div.style.border = 'none';
		if(params.rowIndex && params.rowIndex%2 === 1){
		  div.style.backgroundColor = 'rgba(34,47,77,0.4)'; //设置表头的背影颜色
		}else{
			div.style.backgroundColor = 'rgba(7,16,33,0.1)'; //设置表头的背影颜色
		}
		if(params.column.getName() === '操作'){
			var image = new Image(); 
			image.src = './image/operate.png';
			image.id = data.getClient("sn");
			image.style.marginTop="10px";
			image.style.cursor="pointer";
			image.onclick = function(e)
			{
				//alert(JSON.stringify(e));
				console.log(e.target.id);
			}
			div.appendChild(image);
		}
		else if(params.column.getName() === '威胁等级')
		{
			var image = new Image(); 
			
			var level = data.getClient("level");
			image.style.marginTop="10px";
			//image.style.cursor="pointer";
			if(level==1)
			{
				image.src ='./image/lower_toolbar.png'; 
			}
			else if(level==2)
			{
				image.src =  './image/low_toolbar.png'; 
			}
			else if(level==3)
			{
				image.src =  './image/middle_toolbar.png'; 
			}
			else if(level==4)
			{
				image.src = './image/high_toolbar.png';  
			}
			else
			{
				image.src = './image/higher_toolbar.png';   
			}	
			div.appendChild(image);
		}
	}