
/**
 *  继承twaver.Link,重写实现了流动link样式
 */
 function FlowLink () {
  FlowLink.superClass.constructor.apply(this, arguments);
  var self = this;
  this.animate = new twaver.Animate({
    from: 0,
    to: 1,
    repeat: 1,
    reverse: false,
    delay:0,
    dur: 2000,
    onUpdate: function (value) {
      self.setClient('percent',value);
      network.invalidateElementUIs();
    },
    onDone: function () {
      self.setClient('tail',2);
      var box = self.getClient('box');
      if(!box) return;
      var toNode = self.getToNode();
      var nNode = new twaver.Node({
        image:'circle',
        width: 100,
        height: 100,
        location:toNode.getLocation(),
        clients:{
          'depository':'depository',
          'color': 'red',
          'radius': 100,
        }
      });
      box.add(nNode);
      box.remove(self);
    }
  });
}

twaver.Util.ext(FlowLink, twaver.Link, {
  getVectorUIClass: function() {
    return FlowLinkUI;
  },
  playAnimate:function(){
    var fromNode = this.getFromNode();
    var fNode = new twaver.Node({
      image:'circle',
      width: 100,
      height: 100,
      location:fromNode.getLocation(),
      clients:{
        'depository':'depository',
        'color': 'green',
        'radius': 100,
      }
    });
    box.add(fNode);
    this.animate.play();
  }
});

function FlowLinkUI () {
  FlowLinkUI.superClass.constructor.apply(this, arguments);
}

twaver.Util.ext(FlowLinkUI, twaver.vector.LinkUI, {
  validateImpl:function() {
    FlowLinkUI.superClass.validateImpl.call(this);
  },
  paintBody: function (ctx) {
    var link = this.getElement();
    if (link.getClient('show')) {
      FlowLinkUI.superClass.paintBody.call(this, ctx);
    }
    var fillColor = link.getClient('fillColor');
    var shadowColor = link.getClient('shadowColor');
    var tail = link.getClient('tail');
    var percent = link.getClient('percent');
    var paths = this.getLinkPoints();
    var offset = this.getLineLength() * percent;
    var point;
    for (var i = 0, count = tail; i < count; i++) {
      var v = i / count;
      point = _twaver.math.calculatePointInfoAlongLine(paths, true, offset - (count - i)*2.5, 0).point;
      ctx.globalAlpha = v * v;
      ctx.shadowBlur = 5;
      ctx.shadowColor = shadowColor;
      ctx.beginPath();
      ctx.fillStyle = fillColor;
      ctx.arc(point.x, point.y, 2, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }
});