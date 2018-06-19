/**
 * 环图控件，使用闭包封装起来
 */
(function() {

// 检查 eview 命名空间是否存在，如果不存在创建出来
if (typeof eview === 'undefined') {
	// 这里是全局变量
	eview = {};
}
	
if (typeof window.$eview === 'undefined') {
	window.$eview = {};
}

// 获取全局 $eview 引用
var eview = window.$eview;
var angular = eview.angular;

if (typeof angular === 'undefined') {
	angular = window.angular;
}

eview.angularModule = eview.directives_basic;

if (typeof eview.angularModule === 'undefined') {
	eview.angularModule = angular.module('directives_basic', []);
}

/**
 * 环图类
 * @param options 绘图选项
 */
var RingChart = function(options) {
	//所有属于类的函数都在本 if 内定义，使得一个类只有一个函数实例
	if (typeof RingChart._initialized === 'undefined') {
		/**
		 * 将比例规范化，变为 [0, 100] 的整数
		 * @param value 待标准化的数值
		 */
		RingChart.prototype.normalizeRatio = function(value) {
			if (typeof value === 'undefined') {
				return 0;
			}
			
			if (value < 0) {
				value = 0;
			}
			else if (value > 100) {
				value = 100;
			}
			else {
				value = Math.round(value);
			}
			
			return value;
		};
		
		/** 在绑定的 element 上绘图，数据直接使用设置好的，无参 */
		RingChart.prototype.drawChart = function(value) {
			// 绘制图形，以下单位都是 px
			var c = this.canvas;
			var ctx = c.getContext('2d');
			
			// 获取相关尺寸和圆心，在这里 h 不一定要等于 w
			var w = c.width;
			var h = c.height;
			var deltaR = this.ringWidth;
			var radius = h / 2;
			var cx = h / 2;
			var cy = h / 2;
			
			// 设置背景颜色
			var bgColor = this.backgroundColor;
			
			// 文本水平居中对齐
			ctx.textAlign = 'center';
			// 垂直方向对齐基线为中心
			ctx.textBaseline = 'middle';
			
			// 将 value 规范化
			if (angular.isArray(value)) {
				for (var i = 0; i < value.length; i++) {
					value[i] = this.normalizeRatio(value[i]);
				}
			}
			else {
				value = this.normalizeRatio(value);
			}
			
			// 清洗背景
			//ctx.fillStyle = bgColor;
			//ctx.fillRect(0, 0, w, h);
			
			// 绘制底部的阴影，如果是 IE8 则不绘制
		    if (typeof G_vmlCanvasManager === 'undefined') {
		    	var gradientShadow = ctx.createRadialGradient(cx, h - 5, 0, cx, h, h);
		    	gradientShadow.addColorStop(0.1, 'rgba(150, 150, 150, 0.8)');
		    	gradientShadow.addColorStop(0.3, 'rgba(150, 150, 150, 0)');
		    	ctx.fillStyle = gradientShadow;
		    	ctx.shadowBlur = 20;
		    	ctx.shadowColor = '#000000';
		    	ctx.fillRect(0, h + 3, h, 3);
		    	ctx.shadowBlur = 0;
	    	}
			
			if (this.type === 'health') {
				// 获取数据对应的颜色
				for (var cidx = 0; cidx < this.colorThreshold.length; cidx++) {
					if (value <= this.colorThreshold[cidx]) {
						break;
					}
				}
				
				if (cidx >= this.colorThreshold.length) {
					cidx--;
				}
				
				// 健康度图有渐变色，先用渐变色填充整个区域
				var grd = ctx.createLinearGradient(0, 0, 0, h);
				grd.addColorStop(0, this.colorSetTop[cidx]);
				grd.addColorStop(1, this.colorSetBottom[cidx]);
				ctx.fillStyle = grd;
				
				if (value >= 100) {
					// 绘制完整的圆
					ctx.beginPath();
					ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fill();
					
					// 填充中间部分
					ctx.fillStyle = bgColor;
					ctx.beginPath();
					ctx.arc(cx, cy, radius - deltaR, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fill();
					var r = radius - deltaR;	
					for( var i = 0 ; i < Math.round( Math.PI * r ) ; i++ ){
					var angle = ( i / Math.round( Math.PI * r )) * 360;
						ctx.clearRect( cx , cy , Math.sin( angle * ( Math.PI / 180 )) * r , Math.cos( angle * ( Math.PI / 180 )) * r );
					}
				}
				else if (value <= 0) {
					// 绘制完整的圆
					ctx.fillStyle = this.restPartColor;
					ctx.beginPath();
					ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fill();
					
					// 填充中间部分
					ctx.fillStyle = bgColor;
					ctx.beginPath();
					ctx.arc(cx, cy, radius - deltaR, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fill();
					var r = radius - deltaR;	
					for( var i = 0 ; i < Math.round( Math.PI * r ) ; i++ ){
					var angle = ( i / Math.round( Math.PI * r )) * 360;
						ctx.clearRect( cx , cy , Math.sin( angle * ( Math.PI / 180 )) * r , Math.cos( angle * ( Math.PI / 180 )) * r );
					}
				}
				else {
					// 绘制有效部分
					var endArc = (1.5 * Math.PI + value / 100 * 2 * Math.PI) % (2 * Math.PI);
					ctx.beginPath();
					ctx.arc(cx, cy, radius, 1.5 * Math.PI, endArc, false);
					ctx.arc(cx, cy, radius - deltaR, endArc, 1.5 * Math.PI, true);
					ctx.closePath();
					ctx.fill();
					
					// 绘制剩余部分
					//ctx.fillStyle = this.restPartColor;
					ctx.fillStyle = "rgba(255,255,255,0.3)";
					ctx.beginPath();
					ctx.arc(cx, cy, radius, 1.5 * Math.PI, endArc, true);
					ctx.arc(cx, cy, radius - deltaR, endArc, 1.5 * Math.PI, false);
					ctx.closePath();
					ctx.fill();
				}
				
				// 绘制文本
				if (this.showText) {
					ctx.clearRect(40,40,50,50);
					ctx.fillStyle = this.textColorSet[cidx];
					ctx.font = 'bold ' + this.fontSize + 'px ' + this.fontName;
					ctx.fillText(value + this.ratioUnit, cx, cy);
				}
			}
			else if (this.type === 'multiple') {
				ctx.lineWidth = this.separatorWidth;
				ctx.strokeStyle = bgColor;
				radius -= this.separatorWidth;
				
				// 求解各个区域结束的弧度
				var startRadian = 1.5 * Math.PI;
				var endRadian = startRadian;
				for (var i = 0, sum = startRadian; i < value.length; i++) {
					// 保存上一次结束的弧度作为起始弧度
					startRadian = endRadian;
					
					sum = sum + value[i] / 100 * 2 * Math.PI;
	
					// 平移和求余，得到本段终点
					endRadian = sum % (2 * Math.PI);
	
					// 区域面积为 0，此处如果不作处理，IE8 使用 excanvas 可能会导致区域未关闭，填充色溢出到别的区域
					if (value[i] <= 0) {
						continue;
					}
					// 特殊处理当前比例大于等于 100 的情况，此时绘制完整的圆形即可，并且绘制后一定结束绘制循环
					if (value[i] >= 100) {
						startRadian = 0;
						endRadian = 2 * Math.PI;
					}
	
					// 绘制扇形区域
					ctx.beginPath();
					ctx.arc(cx, cy, radius, startRadian, endRadian, false);
					ctx.lineTo(cx, cy);
					ctx.closePath();
					ctx.fillStyle = this.colorSet[i];
					ctx.stroke();
					ctx.fill();
					
					// 此时累和弧度超过一圈，说明已经绘制满，跳出绘制循环
					if (sum >= 3.5 * Math.PI) {
						break;
					}
				}
				
				// 绘制剩余部分
				ctx.fillStyle = this.restPartColor;
				if (1.5 * Math.PI === sum) {
					// 说明全部都是 0，直接绘制剩余部分
					ctx.beginPath();
					ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
					ctx.lineTo(cx, cy);
					ctx.closePath();
					ctx.fill();
				}
				else if (endRadian < 1.5 * Math.PI) {
					// 不是绘制了一个圆的情况
					ctx.beginPath();
					ctx.arc(cx, cy, radius, endRadian, 1.5 * Math.PI, false);
					ctx.lineTo(cx, cy);
					ctx.closePath();
					ctx.fill();
				}
				
				// 内部填充一个背景色圆
				ctx.fillStyle = bgColor;
				ctx.beginPath();
				ctx.arc(cx, cy, radius - deltaR, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
				
				// 绘制圈内文本
				if (this.showText) {
					if (this.colorIndex === undefined) {
						// 未定义过文本颜色索引，用第一个区域的颜色
						ctx.fillStyle = this.colorSet[0];
					}
					else {
						ctx.fillStyle = this.colorSet[this.colorIndex];
					}
					
					ctx.font = 'bold ' + this.fontSize + 'px ' + this.fontName;
					ctx.fillText(value[0] + this.ratioUnit, cx, cy);
				}
			}
			else if (this.type === 'legend') {
				// 绘制纯色圆环，用于图例
				// 绘制完整的圆
				if (this.colorIndex === undefined) {
					// 未定义过文本颜色索引，用第一个区域的颜色
					ctx.fillStyle = this.colorSet[0];
				}
				else {
					ctx.fillStyle = this.colorSet[this.colorIndex];
				}
				
				ctx.beginPath();
				ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
				
				// 填充中间部分
				ctx.fillStyle = bgColor;
				ctx.beginPath();
				ctx.arc(cx, cy, radius - deltaR, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		};
		
		/** 初始化参数，扩展 defaults 和 options 后调用 */
		RingChart.prototype.init = function() {
			// 根据 type 来配置默认颜色集合，默认环图宽度
			if (this.config.type === 'health') {
				if (this.config.colorSetTop === undefined) {
					this.config.colorSetTop = ['#D5D5D5', '#FF4621', '#FFB700', '#72CE17'];
				}
				
				if (this.config.colorSetBottom === undefined) {
					this.config.colorSetBottom = ['#D5D5D5', '#E92820', '#F7820D', '#16B44A'];
				}
				
				if (this.config.ringWidth === undefined) {
					this.config.ringWidth = 20;
				}
			}
			else if (this.config.type === 'multiple') {
				if (this.config.colorSet === undefined) {
					this.config.colorSet = ['#1FBE5C', '#F7820D', '#F3CE02', '#97DB10', '#1DCFEF', '#33A6FF', '#FE4F88', '#DB5CFF', '#D5D5D5'];
				}
				
				if (this.config.ringWidth === undefined) {
					this.config.ringWidth = 15;
				}
			}
			else if (this.config.type === 'legend') {
				if (this.config.colorSet === undefined) {
					this.config.colorSet = ['#1FBE5C', '#F7820D', '#F3CE02', '#97DB10', '#1DCFEF', '#33A6FF', '#FE4F88', '#DB5CFF', '#D5D5D5'];
				}
				
				if (this.config.ringWidth === undefined) {
					this.config.ringWidth = 3;
				}
			}
			
			// 默认高度
			if (this.config.height === undefined) {
				this.config.height = 130;
			}
			
			// 默认宽度
			if (this.config.width === undefined) {
				this.config.width = 130;
			}
			
			this.canvas = this.config.canvas;
			this.data = this.config.data;
			this.type = this.config.type;
			this.colorThreshold = this.config.colorThreshold;
			this.colorSetTop = this.config.colorSetTop;
			this.colorSetBottom = this.config.colorSetBottom;
			this.colorSet = this.config.colorSet;
			this.textColorSet = this.config.textColorSet;
			this.restPartColor = this.config.restPartColor;
			this.backgroundColor = this.config.backgroundColor;
			this.showText = this.config.showText;
			this.ratioUnit = this.config.ratioUnit;
			this.fontName = this.config.fontName;
			this.fontSize = this.config.fontSize;
			this.colorIndex = this.config.colorIndex;
			this.ringRadius = this.config.ringRadius;
			this.separatorWidth = this.config.separatorWidth;
			this.ringWidth = this.config.ringWidth;
			
			delete this.config;
		}
		
		// 标记为 true 以后，new 新的 ringChart 将不会再次创建这些函数
		RingChart._initialized = true;
	}
	
	var defaults = {
		// canvas 元素对象
		canvas: undefined,
		// 数据集合，健康度时为一个数值，多区域时为一个数组，保存了各个部分的比例，都是 [0, 100] 整数
		data: undefined,
		// 环比图类型，health 为健康度; multiple 为多区域; legend 图例
		type: 'health',
		// 颜色阈值集合，只有在健康度时可用，保存了从小到大填充相同颜色的比例阈值
		colorThreshold: [0, 39, 79, 100],
		// 健康度专用颜色集合，colorSetTop 为顶部色，colorSetBottom 为底部色，两者颜色相同则填充为纯色，不同为渐变色
		colorSetTop: undefined,
		colorSetBottom: undefined,
		// 多区域图专用颜色集合，按顺序对应数据项，颜色不够时用最后一个颜色继续填充
		colorSet: undefined,
		// 中间文本颜色，健康度时为对应阈值的颜色
		textColorSet: ['#D5D5D5', '#F21414', '#F7820D', '#1FBE5C'],
		// 为填充部分的颜色
		restPartColor: '#D5D5D5',
		// 背景色
		backgroundColor: 'white',
		// 是否显示中心文本
		showText: true,
		// 比例单位文本，会追加在中心文字后面
		ratioUnit: '',
		// 中心文本字体颜色
		fontName: 'Arial',
		// 中心文本字号，单位像素
		fontSize: 44,
		// 制定文本颜色取文本颜色集合中的索引，多区域时可用，未定义则使用第一个区域颜色; legend 类型时用作填充色索引
		colorIndex: undefined,
		// 环宽度，单位像素，传入数值
		ringRadius: undefined,
		// 区域间距，只有多区域类型可用
		separatorWidth: 1,
		// 环宽度，单位像素
		ringWidth: undefined
	};
	
	this.config = $.extend(defaults, options);
	
	this.init();
};

eview.angularModule.directive('esightRingChart', function() {
	var directiveObj = {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<canvas ng-transclude></canvas>',
		scope: {
			data: '@',
			options: '@'
		},
		link: function($scope, element, attrs) {
			// 为 IE8 兼容
			if (typeof G_vmlCanvasManager !== 'undefined')
			{
				// 如果全局存在 G_vmlCanvasManager，说明使用了 excanvas.js
				G_vmlCanvasManager.initElement(element[0]);
			}
			
			$scope.options = $scope.$parent.$eval(attrs.options);
			
			if (typeof $scope.options === 'undefined') {
				$scope.options= {};
			}
			
			$scope.options.data = $scope.$parent.$eval(attrs.data);
			$scope.options.canvas = element[0];
			
			$scope.ringChart = new RingChart($scope.options);
			
			// 使用父类的 watch，这样才能监视到真正的数据
			$scope.$parent.$watch(attrs.data, function(value)
			{
				$scope.ringChart.drawChart(value);
			}, true);
		}
	};
	
	return directiveObj;
});

})();