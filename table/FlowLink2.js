function FlowLink () {
  FlowLink.superClass.constructor.apply(this, arguments);
}

twaver.Util.ext(FlowLink, twaver.Link, {
  curentTime:function(){ 
    var now = new Date();
    var year = now.getFullYear();       
    var month = now.getMonth() + 1;     
    var day = now.getDate();            
    var hh = now.getHours();            
    var mm = now.getMinutes();          

    var clock = year + "-";

    if(month < 10)
      clock += "0";

    clock += month + "-";

    if(day < 10)
      clock += "0";

    clock += day + " ";

    if(hh < 10)
      clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0'; 
    clock += mm; 
    return(clock); 
  } ,
  getVectorUIClass: function() {
    return FlowLinkUI;
  },
  playAnimate:function(dur){
    var time = this.curentTime();
    this.setClient('time',time);
    this.animate.play();
  },
  setAnimate:function(dur) {
    var dur = dur || 1200;
    var self = this;
    var fNode, tNode;
    this.animate = new twaver.Animate({
      from: 0,
      to: 0.96,
      //repeat: 2,
	  repeat: Number.POSITIVE_INFINITY,
      reverse: false,
      dur: dur,
      onPlay: function() {
        var box = self.getClient('box');
        if(!box) return;
        var fromNode = self.getFromNode();
        var fl = fromNode.getLocation();
        var color = self.getStyle('arrow.from.shadow.color');
        fNode = new twaver.Node({
          image:'circle',
          width:100,
          height:100,
          location:{x:fl.x ,y:fl.y},
          clients:{
            'depository':'depository',
            'color': color,
            'radius': 100,
          }
        });
        box.add(fNode);
        self.s('arrow.from',true);
      },
      onUpdate: function (value) {
        self.s('arrow.from.xoffset',value);
        network.invalidateElementUIs();
      },
      onDone: function () {
        self.s('arrow.from',false);
        var box = self.getClient('box');

        if(!box) return;
        var toNode = self.getToNode();
        var tl = toNode.getLocation();
		//动态线显示完成后立即删除
		if(self.getClient("linkType")=="dynamic")
		{
			box.removeById(self.getId()); 
		}
		
        tNode = new twaver.Node({
          image:'circle',
          width:100,
          height:100,
          location:{x:tl.x,y:tl.y},
          clients:{
            'depository':'depository',
            'color': 'red',
            'radius': 100,
          }
        });
        box.add(tNode);
        box.remove(fNode);
      }
    });
}
});

function FlowLinkUI () {
  FlowLinkUI.superClass.constructor.apply(this, arguments);
}

twaver.Util.ext(FlowLinkUI, twaver.vector.LinkUI, {
    paintBody: function (ctx) {
      FlowLinkUI.superClass.paintBody.call(this, ctx);

      var link = this.getElement();
      if(link.getClient('over')) return;
      var fillColor = link.getClient('fillColor');
      var shadowColor = link.getClient('shadowColor');
      var tail = link.getClient('tail');
      var percent = link.getClient('percent');
      var paths = this.getLinkPoints();
      var offset = this.getLineLength() * percent;
      var tailFactor = link.getClient('tailFactor') || 1.5;
      var tailRadius = link.getClient('tailRadius') || 2;
      var point;

      for (var i = 0, count = tail; i < count; i++) {
        var v = i / count;
        point = _twaver.math.calculatePointInfoAlongLine(paths, true, offset - (count - i)*tailFactor, 0).point;
        ctx.globalAlpha = v * v;
        ctx.shadowBlur = 10;
        ctx.shadowColor = shadowColor;
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(point.x, point.y, tailRadius, 0, Math.PI * 2, false);
        ctx.fill();
      }
      for (var i = 0, count = tail; i < count; i++) {
        var v = i / count;
        point = _twaver.math.calculatePointInfoAlongLine(paths, true, offset - (count - i)*1, 0).point;
        ctx.globalAlpha = v * v;
        ctx.shadowBlur = 1;
        ctx.shadowColor = shadowColor;
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2, false);
        ctx.fill();
      }
   }
 });