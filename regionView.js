//network.addInteractionListener(function (e) { 
//    if("clickElement"===e.kind)
//    {
//        var node = network.getElementAt(e);
//        if(node instanceof twaver.Node)
//        {
//            var name = node.getClient("node_name");
//            var type = node.getClient("node_type");
//            if(type==="RegionNode")
//            {
////                alarmInRegionBox.clear();//清空区域钻取box
//                
//                alarmBoxView.removeChild(tableDom1);
//                document.body.removeChild(alarmBoxView);
//                
//                document.body.removeChild(view);
//                document.body.removeChild(threatLevelView);
//                document.body.removeChild(topRiskAssetBoxView);
//                document.body.removeChild(topRiskCountryBoxView);
//                document.body.removeChild(topRiskRegionBoxView);
//
//                initRegionView();
//            }
//        }
//     }   
//});

    

//初始化区域钻取数据
function initRegionView()
{
    document.body.appendChild(regionInBoxView);
    regionInBoxNetWork.adjustBounds(viewBounds);
    regionInBoxView.style.backgroundColor = 'rgba(3,20,39,1)';//背景颜色
    regionInBoxNetWork.setDragToPan(false);//设置network是否可以拖拽移动
    twaver.Styles.setStyle('select.style', 'none');//设置选中的样式
    regionInBoxNetWork.setDragToPan(false);//设置network是否可以拖拽移动
    
    initTableInRegion(); 
    initAssetGroup();
    initUserGroup();

    var node = new twaver.Node();
    node.setClient("node_name","backButton");
    node.setImage('gradient6');
    node.setLocation(viewBounds.width-1650,20);
    regionInBox.add(node);

    regionInBoxNetWork.addInteractionListener(function(e){
        if("clickElement"===e.kind)
        {
            var node = regionInBoxNetWork.getElementAt(e);
            if(node instanceof twaver.Node)
            {
                var name = node.getClient("node_name");
                if(name==="backButton")
                {
                    alarmInRegionBox.clear();//清空区域钻取box
                    regionInBox.clear();
                    
                   table2.getColumnBox().clear();
                   alarmInRegionBoxView.removeChild(tableDom2);
                   document.body.removeChild(alarmInRegionBoxView);
                    
                   document.body.removeChild(regionInBoxView); 
                   document.body.removeChild(assetGroupBoxView);
                   document.body.removeChild(userGroupBoxView);
                   document.body.appendChild(view);
                   document.body.appendChild(threatLevelView);
                   document.body.appendChild(topRiskAssetBoxView);
                   document.body.appendChild(topRiskCountryBoxView);
                   document.body.appendChild(topRiskRegionBoxView);
                    
                   alarmBoxView.appendChild(tableDom1);
                   alarmBoxView.appendChild(alarmDiv);
                   document.body.appendChild(alarmBoxView);
//                   initTable();
                }
            }
        }
    
    })

}

//资产、资产组
function initAssetGroup()
{
    document.body.appendChild(assetGroupBoxView);
    assetGroupBoxNetWork.adjustBounds({x:viewBounds.width-1650,y:viewBounds.height-700,width:1600, height:170});
    assetGroupBoxNetWork.getView().style.backgroundColor = 'rgba(2,10,24,0.5)';//背景颜色
    assetGroupBoxNetWork.setDragToPan(false);//设置network是否可以拖拽移动
    var div = document.getElementById("assetGroupPanel");
    
    assetGroupBoxView.appendChild(div);      
}
    

//用户组
function initUserGroup()
{
    document.body.appendChild(userGroupBoxView);
    userGroupBoxNetWork.adjustBounds({x:viewBounds.width-1650,y:viewBounds.height-500,width:1600, height:170});
    userGroupBoxNetWork.getView().style.backgroundColor = 'rgba(2,10,24,0.5)';//背景颜色
    userGroupBoxNetWork.setDragToPan(false);//设置network是否可以拖拽移动
    var div = document.getElementById("userGroupPanel");
    
    userGroupBoxView.appendChild(div);      
}

//初始化区域威胁事件
function initTableInRegion() {

	document.body.appendChild(alarmInRegionBoxView);
//	var table2 = new twaver.controls.Table(alarmInRegionBox);
	for(var i=0;i<=4;i++)
	{
		var from1 = new twaver.Node({
                name: 'from',
				image:"unvisble",
                location: {
                    x: 100,
                    y: 100
                }
            });
			
			from1.setClient('height', 55);
			from1.setClient('font.color', "white");
			from1.setClient('level', i);
			from1.setClient('sn', i);
			from1.setClient('attname', "a"+i);
			from1.setClient('onthreatip', "1.3.3.3");
			from1.setClient('onthreatuser', "user"+i);
			from1.setClient('onthreatregion', "region2");
			from1.setClient('occtime', formateTime(new Date(), "yyyy-MM-dd hh:mm:ss"));
			from1.setClient('durtime', formateTime(new Date(), "yyyy-MM-dd hh:mm:ss"));
			from1.setClient('revtime', formateTime(new Date(), "yyyy-MM-dd hh:mm:ss"));
			from1.setClient('operate', new Image());
            alarmInRegionBox.add(from1);
	
	}

	alarmInRegionBoxNetWork.adjustBounds({x:viewBounds.width-1650,y:viewBounds.height-300,width:1030, height:250});
	alarmInRegionBoxView.style.backgroundColor = 'rgba(3,11,25,0.5)';//背景颜色
	alarmInRegionBoxNetWork.setDragToPan(false);//设置network是否可以拖拽移动
//	var div = document.getElementById("attckDetailPanel");
	alarmInRegionBoxView.appendChild(alarmDiv);

  var tableHeader = tablePane2.getTableHeader().getView();
  var tbHeader = tablePane2.getTableHeader();
  tbHeader.setColumnLineColor('black');
  tableHeader.style.backgroundColor = 'rgba(34,47,77,0.4)';

  tableDom2.style.position = 'absolute';
//  tableDom2.style.bottom = '0px';
//   tableDom2.style.right = '0px';
  tableDom2.style.width = "1200px";
  tableDom2.style.height = "500px";
  tablePane2.getTableHeader().setHeight(32); 
  //tablePane.getView().setHeight(32); 
  // tableDom.style.backgroundColor = 'rgba(255,0,0,1)';
  // document.body.appendChild(tableDom);
  table2.setRowHeight(34); //设置行高
  table2.setRowLineColor("rgba(7,16,33,0.1)"); 
  table2.setEditable(true); 
  table2.setFocusOnClick (false);
  table2.isMakeVisibleOnSelected(true); 
  table2.updateCurrentEditor=function(e)
  {
	//alert(123);
	var ad = table2.getDataAt(e);
	console.log(ad);
	var column = table2.getColumnAt(e);
        console.log(column.getName());
  }
  
  table2.getView().onmousedown = null;
  alarmInRegionBoxView.appendChild(tableDom2);
  window.onresize = function () {
    tablePane2.invalidate();
  }
  var columwidth = 100;
  //序号
	  createColumn(table2, 'SN', 'sn', 'client', 'i',70);
	  //威胁等级
	  createColumn(table2, '威胁等级', 'level', 'client', 'i');
	  //'威胁名称'
	  createColumn(table2, '威胁名称', 'attname', 'client','string',columwidth);
	  
	  //'受攻击ip'
	  createColumn(table2, '受威胁IP', 'onthreatip', 'client','string',columwidth);
	  //'受攻击用户'
	  createColumn(table2, '受威胁用户', 'onthreatuser', 'client','string',columwidth);
	  //'受攻击区域'
	  createColumn(table2, '受威胁区域', 'onthreatregion', 'client','string',columwidth);
	  //'威胁源国家/区域'
	  createColumn(table2, '最近发生时间', 'occtime', 'client','string',columwidth);
	  //'威胁源IP'
	  createColumn(table2, '持续时间', 'durtime', 'client','string',columwidth);
	  //'第一次发生时间'
	  createColumn(table2, '检测时间', 'revtime', 'client','string',columwidth);
	  //'状态'
	  createColumn(table2, '处理状态', 'status', 'client','string',columwidth);
	  //'状态'
	  createColumn(table2, '操作', 'operate', 'client','string',70);

//威胁等级，威胁名称，受威胁IP 受威胁区域，最近发生时间，持续时间，检测时间，处理状态，操作
table2.onCellRendered = function (params) {
	    var div = params.div;
	    var data = params.data;
	    var level = data.getClient("level");
	    var color = 'rgba(41,255,0,1)';
	    if(null!=level)
	    {
	    	color = colors[level];
	    }
	    div.style.color = color;
	    div.style.textAlign = 'center';
		div.style.border = 'none';
		/*div.style.borderStyle = 'none';
		div.style.borderTopStyle = 'none';
		div.style.borderBottomStyle = 'none';
		div.style.borderLeftStyle = 'none';
		div.style.borderRightStyle = 'none';
		var cssText = div.style.cssText;
		
		div.style.cssText = cssText.replace("solid","none");*/
	    if(params.rowIndex && params.rowIndex%2 === 1){
	      div.style.backgroundColor = 'rgba(34,47,77,0.4)'; //设置表头的背影颜色
	    }else{
	    	div.style.backgroundColor = 'rgba(7,16,33,0.1)'; //设置表头的背影颜色
	    }
	  };
  table2.setMakeVisibleOnSelected(true);
  box2.getSelectionModel().addSelectionChangeListener(function(e){
    var lastSelectedData = box2.getSelectionModel().getLastData();
    var selectModel = box.getSelectionModel();
    selectModel.setSelection(lastSelectedData);
    if(lastSelectedData instanceof FlowLink) {
      var link = lastSelectedData;
      window.flowLinks.forEach(function(link){
        link.s('link.width',0.1);
      });
      link.s('link.width',1);
    }
  });
}