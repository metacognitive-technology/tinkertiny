// vis setup
initVis = () => {
  defaultOptions = {
      interaction: {
        hover: true,
        navigationButtons: false,
        multiselect: true,
        dragView: true,
        selectConnectedEdges: false
      },
      manipulation: {
          enabled: false,
          addNode: (nodeData,callback) => {
            nodeData.label = window.latestNodeLabel
            callback(nodeData)
            network.body.container.style.cursor = 'auto';
          },
          addEdge: (edgeData,callback) => {
            edgeData.label = window.latestEdgeLabel
            callback(edgeData)
            network.body.container.style.cursor = 'auto';
          }
      },
      configure: {
        enabled: true,
        container: $('#vis-config')[0],
        showButton: true
      },
      layout: {
        improvedLayout: false
      },
      physics: true,
      nodes: {
        shape: "box",
        labelHighlightBold: true,
        font: {
          face: 'arial'
        },
        hidden: false,
        borderWidth: 1,
        color: {
          hover: {
            border: '#ffff00',
            background: '#0066cc'
          },
          highlight: {
            border: '#ff0000',
            background: '#ffff00'
          }
        }
      },
      edges: {
        hidden: false,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        },
        color: {
          highlight: '#ff0000',
          hover: '#0066cc'
        }
      }
    }

    
  data = getScaleFreeNetwork(25)
  window.network = new vis.Network($('#mynetwork')[0], data, defaultOptions);
}

// utilities

function getScaleFreeNetwork(nodeCount) {
    const nodes = [];
    const edges = [];
    const connectionCount = [];
  
    // randomly create some nodes and edges
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: i,
        label: 'Node '+String(i),
      });
  
      connectionCount[i] = 0;
  
      // create edges in a scale-free-network way
      if (i == 1) {
        const from = i;
        const to = 0;
        edges.push({
          from: from,
          to: to,
        });
        connectionCount[from]++;
        connectionCount[to]++;
      } else if (i > 1) {
        const conn = edges.length * 2;
        const rand = Math.floor(Math.random() * conn);
        let cum = 0;
        let j = 0;
        while (j < connectionCount.length && cum < rand) {
          cum += connectionCount[j];
          j++;
        }
  
        const from = i;
        const to = j;
        edges.push({
          from: from,
          to: to,
          label: 'label'
        });
        connectionCount[from]++;
        connectionCount[to]++;
      }
    }
  
    return { nodes: nodes, edges: edges };
  }
  
 // widget setup

 initWidgets = () => {
  var minWidth = 35
  var toolbarWidth = 1200
  $("#toolbarMain").jqxToolBar({
    width: toolbarWidth, height: 35, tools: 'button button | button button button | toggleButton | button button | button button button | button button | button | button   ',
    initTools: function (type, index, tool, menuToolInitialization) {
         switch (index) {
            case 0:
              var button = $("<i title='Load a JSON file' class=' buttonIcon fa-regular fa-floppy-disk fa-xl' />" )
              tool.append(button)
              tool.on("click", function () {loadNetworkFromJSONFile()})
              tool.jqxButton({ width: minWidth });
              break;
            case 1:
              var button = $("<i title='Save a JSON file' class=' buttonIcon fa-regular fa-floppy-disk-pen fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {saveNetworkJSONToFile()})
              tool.jqxButton({ width: minWidth });
              break;
            case 2:
              var button = $("<i title='Select all nodes' class=' buttonIcon fa-regular fa-square-ellipsis fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {selectAll()})
              tool.jqxButton({ width: minWidth });
              break;
            case 3:
              var button = $("<i title='Invert selections' class=' buttonIcon fa-solid fa-square-ellipsis fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {invertSelections()})
              tool.jqxButton({ width: minWidth });
              break;
            case 4:
              var button = $("<i title='No selections' class=' buttonIcon fa-regular fa-square fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {selectNone()})
              tool.jqxButton({ width: minWidth });
              break;
            case 5:
              var button = $("<i title='Toggle auto edge selection' class=' buttonIcon fa-regular fa-code-merge fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {toggleAutoEdgeSelection()})
              tool.jqxToggleButton({ width: minWidth, toggled: false });
              break;
            case 6:
              var button = $("<i title='Grow selections' class=' buttonIcon fa-regular fa-arrows-maximize fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {growSelections()})
              tool.jqxButton({ width: minWidth });
              break;
            case 7:
              var button = $("<i title='Shrink selections' class=' buttonIcon fa-regular fa-arrows-minimize fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {shrinkSelections()})
              tool.jqxButton({ width: minWidth });
              break;
            case 8:
              var button = $("<i title='Cut selections' class=' buttonIcon fa-solid fa-scissors' />" )
              tool.append(button);
              tool.on("click", function () {cutSelections()})
              tool.jqxButton({ width: minWidth });
              break;
            case 9:
              var button = $("<i title='Copy selections' class=' buttonIcon fa-regular fa-copy fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {copySelections()})
              tool.jqxButton({ width: minWidth });
              break;
            case 10:
              var button = $("<i title='Paste selections' class=' buttonIcon fa-regular fa-paste fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {pasteSelections()})
              tool.jqxButton({ width: minWidth });
              break;
            case 11:
              var button = $("<i title='Clone selections' class=' buttonIcon fa-regular fa-seedling fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {cloneSelections()})
              tool.jqxButton({ width: minWidth });
              break;
            case 12:
              var button = $("<i title='Delete selections' class=' buttonIcon fa-regular fa-trash-can fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {deleteSelections()})
              tool.jqxButton({ width: minWidth });
              break;
            case 13:
              var button = $("<i title='Edit selections' class=' buttonIcon fa-regular fa-pen-to-square fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {editSelections()})
              tool.jqxButton({ width: minWidth });
              break; 
            case 14:
              var button = $("<i  title='Fit to window' class=' buttonIcon fa-regular fa-expand-wide fa-lg  ' />" )
              tool.append(button);
              tool.on("click", function () {network.fit()})
              tool.jqxButton({ width: minWidth  });
              break;
            }
    }
  });
  $("#toolbarArrangeAndHideShow").jqxToolBar({
    width: toolbarWidth, height: 35, tools: "toggleButton | button button button | button button | button button button button | button button | button button button button button button | button button button button | button button button button ",
    initTools: function (type, index, tool, menuToolInitialization) {
         switch (index) {
            case 0:
              var button = $("<i title='Toggle physics' class=' buttonIcon fa-regular fa-atom fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {togglePhysicsGlobally()})
              tool.jqxToggleButton({ width: minWidth,  toggled: true });
              break;
            case 1:
              var button = $("<span title='Start simulation'><i  class=' buttonIcon fa-solid fa-play fa-xl' />&nbsp;A</span>" )
              tool.append(button);
              tool.on("click", function () {startSimulation()})
              tool.jqxButton({ width: minWidth + 5 });
              break;
            case 2:
              var button = $("<span title='Stop simulation'><i  class=' buttonIcon fa-solid fa-stop fa-xl' />&nbsp;A</span>" )
              tool.append(button);
              tool.on("click", function () {stopSimulation()})
              tool.jqxButton({ width: minWidth + 5 });
              break;
            case 3:
              var button = $("<span title='Stabilize simulation'><i  class=' buttonIcon fa-solid fa-weight-hanging fa-xl' />&nbsp;A</span>" )
              tool.append(button);
              tool.on("click", function () {stabilizeSimulation()})
              tool.jqxButton({ width: minWidth + 5 });
              break;
            case 4:
              var button = $("<span title='Add physics'><i  class=' buttonIcon fa-solid fa-atom fa-xl' />&nbsp;A</span>" )
              tool.append(button);
              tool.on("click", function () {addPhysicsToNodes()})
              tool.jqxButton({ width: minWidth + 5 });
              break;
            case 5:
              var button = $("<span title='Remove physics'><i  class=' buttonIcon fa-light fa-atom fa-xl' />&nbsp;R</span>" )
              tool.append(button);
              tool.on("click", function () {removePhysicsFromNodes()})
              tool.jqxButton({ width: minWidth + 5});
              break;
            case 6:
              var button = $("<span title='Lock X'><i  class=' buttonIcon fa-solid fa-lock fa-lg' />X</span>" )
              tool.append(button);
              tool.on("click", function () {lockNodesX(true)})
              tool.jqxButton({ width: minWidth });
              break;
            case 7:
              var button = $("<span title='Unlock X'><i  class=' buttonIcon fa-regular fa-unlock fa-lg' />X</span>" )
              tool.append(button);
              tool.on("click", function () {lockNodesX(false)})
              tool.jqxButton({ width: minWidth });
              break;
            case 8:
              var button = $("<span title='Lock Y'><i  class=' buttonIcon fa-solid fa-lock fa-lg' />Y</span>" )
              tool.append(button);
              tool.on("click", function () {lockNodesY(true)})
              tool.jqxButton({ width: minWidth });
              break;
            case 9:
              var button = $("<span title='Unlock Y'><i  class=' buttonIcon fa-regular fa-unlock fa-lg' />Y</span>" )
              tool.append(button);
              tool.on("click", function () {lockNodesY(false)})
              tool.jqxButton({ width: minWidth });
              break;
            case 10:
              var button = $("<i title='Use graph layout' class=' buttonIcon fa-solid fa-chart-network fa-lg' />" )
              tool.append(button);
              tool.on("click", function () {useGraphLayout()})
              tool.jqxButton({ width: minWidth});
              break;
            case 11:
              var button = $("<i  title='Use tree layout' class=' buttonIcon fa-regular fa-sitemap fa-lg' />" )
              tool.append(button);
              tool.on("click", function () {useTreeLayout()})
              tool.jqxButton({ width: minWidth});
              break;
            case 12:
              var button = $("<i  title='Distribute randomly' class=' buttonIcon fa-regular fa-dice-five fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {randomizeNodeLocations()})
              tool.jqxButton({ width: minWidth });
              break;
            case 13:
              var button = $("<i  title='Align middle' class=' buttonIcon fa-regular fa-objects-align-center-vertical fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {alignNodeMiddles()})
              tool.jqxButton({ width: minWidth });
              break;
            case 14:
              var button = $("<i  title='Align center' class=' buttonIcon fa-regular fa-objects-align-center-horizontal fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {alignNodeCenters()})
              tool.jqxButton({ width: minWidth });
              break;
            case 15:
              var button = $("<i  title='Distribute horizontally' class=' buttonIcon fa-regular fa-ellipsis fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {distributeHorizontally()})
              tool.jqxButton({ width: minWidth });
              break;
            case 16:
              var button = $("<i  title='Distribute vertically' class=' buttonIcon fa-solid fa-ellipsis-vertical fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {distributeVertically()})
              tool.jqxButton({ width: minWidth });
              break;
            case 17:
              var button = $("<i   title='Distribute radially'class=' buttonIcon fa-regular fa-circle-dashed fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {distributeRadially()})
              tool.jqxButton({ width: minWidth });
              break;
            case 18:
              var button = $("<span title='Hide nodes'><i  class=' buttonIcon fa-regular fa-eye-slash fa-lg' />&nbsp;&nbsp;N</span>" )
              tool.append(button);
              tool.on("click", function () {hideNodes(true)})
              tool.jqxButton({ width: minWidth + 10});
              break;
            case 19:
              var button = $("<span title='Show nodes'><i  class=' buttonIcon fa-regular fa-eye fa-lg' />&nbsp;&nbsp;N</span>" )
              tool.append(button);
              tool.on("click", function () {hideNodes(false)})
              tool.jqxButton({ width: minWidth + 10});
              break;
            case 20:
              var button = $("<span title='Hide edges'><i  class=' buttonIcon fa-regular fa-eye-slash fa-lg' />&nbsp;&nbsp;E</span>" )
              tool.append(button);
              tool.on("click", function () {hideEdges(true)})
              tool.jqxButton({ width: minWidth + 10});
              break;
            case 21:
              var button = $("<span title='Show edges'><i  class=' buttonIcon fa-regular fa-eye fa-lg' />&nbsp;&nbsp;E</span>" )
              tool.append(button);
              tool.on("click", function () {hideEdges(false)})
              tool.jqxButton({ width: minWidth + 10});
              break;
            case 22:
              var button = $("<span title='Hide node labels'><i  class=' buttonIcon fa-regular fa-eye-slash fa-lg' />&nbsp;&nbsp;NL</span>" )
              tool.append(button);
              tool.on("click", function () {hideNodeLabels(true)})
              tool.jqxButton({ width: minWidth + 17});
              break;
            case 23:
              var button = $("<span title='Show node labels'><i  class=' buttonIcon fa-regular fa-eye fa-lg' />&nbsp;&nbsp;NL</span>" )
              tool.append(button);
              tool.on("click", function () {hideNodeLabels(false)})
              tool.jqxButton({ width: minWidth + 16});
              break;
            case 24:
              var button = $("<span title='Hide edge labels'><i  class=' buttonIcon fa-regular fa-eye-slash fa-lg' />&nbsp;&nbsp;EL</span>" )
              tool.append(button);
              tool.on("click", function () {hideEdgeLabels(true)})
              tool.jqxButton({ width: minWidth + 15});
              break;
            case 25:
              var button = $("<span title='Show edge labels'><i  class=' buttonIcon fa-regular fa-eye fa-lg ' />&nbsp;&nbsp;EL</span>" )
              tool.append(button);
              tool.on("click", function () {hideEdgeLabels(false)})
              tool.jqxButton({ width: minWidth + 15});
              break;             
            }
    }
  });
  $("#toolbarAddAndStyle").jqxToolBar({
    width: toolbarWidth, height: 35, tools: 'button combobox | button combobox | custom custom input | custom input | button button button button button | button button button button',
    initTools: function (type, index, tool, menuToolInitialization) {
         switch (index) {
            case 0:
              var button = $("<i  title='Add node' class=' buttonIcon fa-solid fa-circle-plus fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {network.body.container.style.cursor = 'crosshair'; addNode()})
              tool.jqxButton({ width: minWidth });
              break;
            case 1:
              sourceList = ['  Enter new node label','cept','name','attribute','pizza']
              tool.jqxComboBox({ width: 200, source: sourceList, selectedIndex: 1 })
              window.latestNodeLabel = 'cept'
              tool.on('change', function (event) 
                {
                    var args = event.args;
                    if (args) {
                      var index = args.index;
                      var item = args.item;
                      var label = item.label;
                      var value = item.value;
                      if(value == '  Enter new node label'){
                        newLabel = prompt('Enter a new node label:')
                        sourceList.push(newLabel)
                        sourceList = _.sortBy(_.uniq(sourceList))
                        tool.jqxComboBox({ source: sourceList, selectedIndex: _.indexOf(sourceList,newLabel) })
                        nodeLabelSelected(newLabel)
                      }else{
                        nodeLabelSelected(value)
                      }
                  }
                }); 
              break
            case 2:
              var button = $("<i  title='Add edge' class=' buttonIcon fa-solid fa-link fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {network.body.container.style.cursor = 'crosshair';addEdge()})
              tool.jqxButton({ width: minWidth });
              break;
            case 3:
              sourceList = ['  Enter new edge label','is-a','has-a','composes']
              tool.jqxComboBox({ width: 200, source: sourceList, selectedIndex: 1 })
              window.latestEdgeLabel = 'is-a'
              tool.on('change', function (event) 
                {
                    var args = event.args;
                    if (args) {
                      var index = args.index;
                      var item = args.item;
                      var label = item.label;
                      var value = item.value;
                      if(value == '  Enter new edge label'){
                        newLabel = prompt('Enter a new edge label:')
                        sourceList.push(newLabel)
                        sourceList = _.sortBy(_.uniq(sourceList))
                        tool.jqxComboBox({ source: sourceList, selectedIndex: _.indexOf(sourceList,newLabel) })
                        edgeLabelSelected(newLabel)
                      }else{
                        edgeLabelSelected(value)
                      }
                  }
                }); 
              break
            case 4:
              var picker = $('<div class="swatch" title="Change node color"><input onchange="changeNodeColor(this.value)" type=color placeholder="#ff0000" id="nodeBackgroundColorNormal" >&nbsp;Node</div>')
              tool.append(picker)
              break;
            case 5:
              var picker = $('<div class="swatch"  title="Change node border"><input onchange="changeNodeBorderColor(this.value)" type=color placeholder="#00ff00" id="nodeBorderColorNormal" >&nbsp;Border</div>')
              tool.append(picker)
              break;
            case 6:
              tool.jqxInput({ width: 30, placeHolder: "#" });
              tool.on('change', function (event) {
                  changeNodeBorderWidth($(tool).val())
              })
              break;
            case 7:
              var picker = $('<div class="swatch" title="Change edge color"><input onchange="changeEdgeColor(this.value)" type=color placeholder="#0000ff" id="edgeColorNormal" >&nbsp;Edge</div>')
              tool.append(picker)
              break;
            case 8:
              tool.jqxInput({ width: 30, placeHolder: "#" });
              tool.on('change', function (event) {
                  changeEdgeWidth($(tool).val())
              })
              break;
            case 9:
              var button = $("<img  title='Change node shape' style='margin-top: -5px;' src='./dev/images/lozenge-icon.png' />" )
              tool.append(button);
              tool.on("click", function () {changeNodeShape('ellipse')})
              tool.jqxButton({ width: minWidth });
              break;
            case 10:
              var button = $("<i  title='Change node shape'  class=' buttonIcon fa-regular fa-square fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {changeNodeShape('box')})
              tool.jqxButton({ width: minWidth });
              break;
            case 11:
              var button = $("<i  title='Change node shape'  class=' buttonIcon fa-regular fa-star fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {changeNodeShape('star')})
              tool.jqxButton({ width: minWidth });
              break;
            case 12:
              var button = $("<i  title='Change node shape'  class=' buttonIcon fa-regular fa-diamond fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {changeNodeShape('diamond')})
              tool.jqxButton({ width: minWidth });
              break;
            case 13:
              var button = $("<i  title='Change node shape'  class=' buttonIcon fa-regular fa-circle fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {changeNodeShape('circle')})
              tool.jqxButton({ width: minWidth });
              break;
            case 14:
              var button = $("<i  title='Change edge arrow to right'  class=' buttonIcon fa-regular fa-right-long fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {changeEdgeArrows('to')})
              tool.jqxButton({ width: minWidth });
              break;
            case 15:
              var button = $("<i  title='Change edge arrow to left'  class=' buttonIcon fa-regular fa-left-long fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {changeEdgeArrows('from')})
              tool.jqxButton({ width: minWidth });
              break;
            case 16:
              var button = $("<i  title='Change arrow to both'  class=' buttonIcon fa-regular fa-left-right fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {changeEdgeArrows('to, from')})
              tool.jqxButton({ width: minWidth });
              break;
            case 17:
              var button = $("<i  title='Change arrow to none'  class=' buttonIcon fa-regular fa-horizontal-rule fa-xl' />" )
              tool.append(button);
              tool.on("click", function () {changeEdgeArrows('')})
              tool.jqxButton({ width: minWidth });
              break;
  
            }
          }
        });
      
 }


 // widget functions
 selectedOrAllNodeIds = () => {
  var nids = network.getSelectedNodes()
  if (nids.length == 0) {nids = network.body.data.nodes.getIds()}
  return nids
 }

 selectedOrAllEdgeIds = () => {
  var eids = network.getSelectedEdges()
  if (eids.length == 0) {eids = network.body.data.edges.getIds()}
  return eids
 }

 randomizeNodeLocations = () => {
  var nids = selectedOrAllNodeIds()
  viewWidth = $('#mynetwork').width()
  viewHeight = $('#mynetwork').height()
  nids.forEach((nid)=>{
    network.body.nodes[nid].x = viewWidth/2 - _.random(viewWidth)
    network.body.nodes[nid].y = viewHeight/2 - _.random(viewHeight)
  })
  network.redraw()
}

alignNodeMiddles = () => {
  var nids = selectedOrAllNodeIds()
  var topMost = -999999
  var bottomMost = 999999
  nids.forEach((nid)=>{
    topMost = Math.max(topMost, network.body.nodes[nid].y)
    bottomMost = Math.min(bottomMost, network.body.nodes[nid].y)
  })
  var middle =((topMost - bottomMost)/2) + bottomMost
  nids.forEach((nid)=>{
    network.body.nodes[nid].y = middle
  })
  network.redraw()
}

alignNodeCenters = () => {
  var nids = selectedOrAllNodeIds()
  var leftMost = -999999
  var rightMost = 999999
  nids.forEach((nid)=>{
    rightMost = Math.max(rightMost, network.body.nodes[nid].x)
    leftMost = Math.min(leftMost, network.body.nodes[nid].x)
  })
  var center =((rightMost - leftMost)/2) + leftMost
  nids.forEach((nid)=>{
    network.body.nodes[nid].x = center
  })
  network.redraw()
}

distributeHorizontally = () => {
  var nids = selectedOrAllNodeIds()
  var leftMost = 999999
  var rightMost = -999999
  nids.forEach((nid)=>{
    rightMost = Math.max(rightMost, network.body.nodes[nid].x)
    leftMost = Math.min(leftMost, network.body.nodes[nid].x)
  })
  var deltaX =(rightMost - leftMost)/(nids.length - 1)
  var newX = rightMost
  nids.forEach((nid)=>{
    network.body.nodes[nid].x = newX
    newX = newX - deltaX
  })
  network.redraw()
}

distributeVertically = () => {
  var nids = selectedOrAllNodeIds()
  var topMost = 999999
  var bottomMost = -999999
  nids.forEach((nid)=>{
    bottomMost = Math.max(bottomMost, network.body.nodes[nid].y)
    topMost = Math.min(topMost, network.body.nodes[nid].y)
  })
  var deltaY =(bottomMost - topMost)/(nids.length - 1)
  var newY = bottomMost
  nids.forEach((nid)=>{
    network.body.nodes[nid].y = newY
    newY = newY - deltaY
  })
  network.redraw()
}

distributeRadially = () => {
  var nids = selectedOrAllNodeIds()
  var topMost = 999999
  var bottomMost = -999999
  nids.forEach((nid)=>{
    bottomMost = Math.max(bottomMost, network.body.nodes[nid].y)
    topMost = Math.min(topMost, network.body.nodes[nid].y)
  })
  var leftMost = 999999
  var rightMost = -999999
  nids.forEach((nid)=>{
    rightMost = Math.max(rightMost, network.body.nodes[nid].x)
    leftMost = Math.min(leftMost, network.body.nodes[nid].x)
  })
  var centerY = ((bottomMost - topMost)/2) + topMost
  var centerX = ((rightMost - leftMost)/2) + leftMost
  var radius = Math.min((rightMost - leftMost, bottomMost - topMost)) * 0.5
  var delta =Math.PI*2/nids.length
  angle = 0
  nids.forEach((nid)=>{
    newX = centerX + radius * Math.cos(angle)
    newY = centerY + radius * Math.sin(angle)
    network.body.nodes[nid].y = newY
    network.body.nodes[nid].x = newX
    angle = angle + delta
  })
  network.redraw()
}

changeOptionsForSelectedNodes = (newOptions) => {
  var nids = network.getSelectedNodes()
  nids.forEach((nid)=>{
    network.nodesHandler.body.data.nodes.getDataSet().update( _.extend({id: nid},newOptions))
  })
}

changeOptionsForNodes = (newOptions) => {
  var nids = selectedOrAllNodeIds()
  nids.forEach((nid)=>{
    network.nodesHandler.body.data.nodes.getDataSet().update( _.extend({id: nid},newOptions))
  })
}

changeOptionsForEdges = (newOptions) => {
  var eids = selectedOrAllEdgeIds()
  eids.forEach((eid)=>{
    network.edgesHandler.body.data.edges.getDataSet().update( _.extend({id: eid},newOptions))
  })
}

changeOptionsForSelectedEdges = (newOptions) => {
  var eids = network.getSelectedEdges()
  eids.forEach((eid)=>{
    network.edgesHandler.body.data.edges.getDataSet().update( _.extend({id: eid},newOptions))
  })
}

addPhysicsToNodes = () => {
  changeOptionsForNodes({physics:true})
}

removePhysicsFromNodes = () => {
  changeOptionsForNodes({physics:false})
}

togglePhysicsGlobally = () => {
  network.physics.physicsEnabled = !network.physics.physicsEnabled
  if(network.physics.physicsEnabled){network.startSimulation()}
}

startSimulation = () => {
  network.startSimulation()
}

stopSimulation = () => {
  network.stopSimulation()
}

stabilizeSimulation = () => {
  network.stabilize()
}

toggleAutoEdgeSelection = () => {
  network.selectionHandler.options.selectConnectedEdges = !network.selectionHandler.options.selectConnectedEdges
}

lockNodesX = (flag) => {
  changeOptionsForNodes({fixed:{x:flag}})
}

lockNodesY = (flag) => {
  changeOptionsForNodes({fixed:{y:flag}})
}

useTreeLayout = () => {
   var options = {
    layout:{
      hierarchical: true
    }
  }
  network.setOptions(options);
}

useGraphLayout = () => {
  var options = {
   layout:{
     hierarchical: false
   }
 }
 network.setOptions(options);
}

hideNodes = (flag) => {
  changeOptionsForNodes({hidden:flag})
}

hideEdges = (flag) => {
  changeOptionsForEdges({hidden:flag})
}

hideNodeLabels = (flag) => {
  var nids = selectedOrAllNodeIds()
  var nds = network.nodesHandler.body.data.nodes.getDataSet()
  if(flag){
    nids.forEach((nid)=>{
      n = nds.get(nid)
      if (!n.cachedLabel){
        n.cachedLabel = n.label
      }
      nds.update({id: nid, label: null, title:n.cachedLabel, widthConstraint: {minimum: 1,maximum: 1} })
    })
  }else{
    nids.forEach((nid)=>{
      n = nds.get(nid)
      nds.update( {id: nid, label: n.cachedLabel, widthConstraint: false})
      delete n.cachedLabel
    })
  }
  network.redraw()
}

hideEdgeLabels = (flag) => {
  var eids = selectedOrAllEdgeIds()
  var eds = network.edgesHandler.body.data.edges.getDataSet()
  if(flag){
    eids.forEach((eid)=>{
      e = eds.get(eid)
      if (!e.cachedLabel){
        e.cachedLabel = e.label
      }
      eds.update({id: eid, label: ' '})
    })
  }else{
    eids.forEach((eid)=>{
      e = eds.get(eid)
      eds.update( {id: eid, label: e.cachedLabel})
      delete e.cachedLabel
    })
  }
  network.redraw()
}


networkToPreJSON = () => {
  var eds = network.edgesHandler.body.data.edges.getDataSet()
  var nds = network.nodesHandler.body.data.nodes.getDataSet()
  return {nodes: nds.get(), edges: eds.get()}
}

loadNetworkFromJSON = (json) => {
  var eds = network.edgesHandler.body.data.edges.getDataSet()
  var nds = network.nodesHandler.body.data.nodes.getDataSet()
  eds.clear()
  nds.clear()
  nds.add(json.nodes)
  eds.add(json.edges)
  network.redraw()
}

saveNetworkJSONToFile = () => {
  var contents = JSON.stringify(networkToPreJSON())
  var blob = new Blob([contents], { type: "application/json;charset=utf-8" })
  fileName = prompt('Enter the file name to save:  (*.json)')
   saveAs(blob,fileName);
}

loadNetworkFromJSONFile = () => {
  var input = document.createElement('input');
  input.type = 'file';
  input.accepts = 'application/json'
  input.onchange = e => { 
     var file = e.target.files[0]; 
     var reader = new FileReader();
     reader.readAsText(file,'UTF-8');
     reader.onload = readerEvent => {
        var content = readerEvent.target.result; // this is the content!
        loadNetworkFromJSON(JSON.parse(content))
     }
  }
  input.click();
}

selectAll = () => {
  var nds = network.nodesHandler.body.data.nodes.getDataSet()
  network.selectNodes(nds.getIds())
}

invertSelections = () => {
  var nds = network.nodesHandler.body.data.nodes.getDataSet()
  var selections = network.getSelectedNodes()
  network.selectNodes([])
  network.selectNodes(_.difference(nds.getIds(),selections))
}

selectNone = () => {
  network.selectNodes([])
}

growSelections = () => {
  nids = network.getSelectedNodes()
  eids = network.getSelectedEdges()
  selections = {nodes: _.union([],nids), edges: _.union([],eids)}
  nids.forEach( (nid) => {
    selections.edges.push(network.getConnectedEdges(nid))
  })
  eids.forEach( (eid) => {
    selections.nodes.push(network.getConnectedNodes(eid))
  })
  selections.nodes = _.uniq(_.flatten(selections.nodes))
  selections.edges = _.uniq(_.flatten(selections.edges))
  network.setSelection(selections)
}

shrinkSelections = () => {
  var eds = network.edgesHandler.body.data.edges.getDataSet()
  var nids = network.getSelectedNodes()
  var eids = network.getSelectedEdges()
  var selections = {nodes: [], edges: []}
  nids.forEach( (nid) => {
    var ces = _.intersection(network.getConnectedEdges(nid), eids)
    var cns = _.intersection(network.getConnectedNodes(nid), nids)
    if((ces.length == 1)&(cns.length == 0)){ // if only one edge is selected, keep the node as root
      selections.nodes.push(nid)
    }
    if(cns.length > 1){ // if there are > 1 neighbor nodes, then this nod can be a root
      selections.nodes.push(nid)
    }
    if((ces.length > 1)|(ces.length ==0)){ // if many edges, node is a root
      selections.nodes.push(nid)
    }
  })
  var eids = network.getSelectedEdges()
  eids.forEach( (eid) => {
    var edge = eds.get(eid)
    var cns = _.intersection(network.getConnectedNodes(eid), nids)
    if(cns.length > 1){ // if I have both nodes I am safe for this shrink
      selections.edges.push(eid)
    }
    var fces = network.getConnectedEdges(edge.from)
    var tces = network.getConnectedEdges(edge.to)
    if(false){ // both my nodes have other edges
      selections.edges.push(eid)
    }
  })
  network.setSelection({nodes:[],edges:[]})
  network.setSelection(selections)
}

window.copyBuffer = {nodes:[],edges:[]}

copySelections = () => {
  var eds = network.edgesHandler.body.data.edges.getDataSet()
  var nds = network.nodesHandler.body.data.nodes.getDataSet()
  var selections = network.getSelection()
  copyBuffer = {nodes: nds.get(selections.nodes), edges: eds.get(selections.edges)}
}

cutSelections = () => {
  copySelections()
  deleteSelections()
}

pasteSelections = () => {
  var eds = network.edgesHandler.body.data.edges.getDataSet()
  var nds = network.nodesHandler.body.data.nodes.getDataSet()
  var nodesToAdd = []
  var edgesToAdd = []
  var newNodeIdMap = {}
  var nextNodeIdForMe = nextNodeId()
  copyBuffer.nodes.forEach( (node) => {
    if (nds.get(node.id)){// node with this id exists in the graph, so clone it and add it, otherwise, just restore it
      var newId = nextNodeIdForMe
      nextNodeIdForMe ++
      newNodeIdMap[node.id] = newId
      clone = _.clone(node)
      clone.id = newId
      nodesToAdd.push(clone)
    }else{
      nodesToAdd.push(node)
    }
  })
  copyBuffer.edges.forEach( (edge) => {
    if (eds.get(edge.id)){// edge with this id exists in the graph, so clone it and add it after mapping its nodes, otherwise restore it
      var newId = nextEdgeId()
      clone = _.clone(edge)
      clone.id = newId
      theEdge = clone
    }else{
      theEdge = edge
    }
    if(newNodeIdMap[edge.from]){ // node has been cloned, so get its new id and install it
      theEdge.from = newNodeIdMap[edge.from]
    }
    if(newNodeIdMap[edge.to]){ // node has been cloned, so get its new id and install it
      theEdge.to = newNodeIdMap[edge.to]
    }  
    edgesToAdd.push(theEdge)
    }
  )
  nds.add(nodesToAdd)
  eds.add(edgesToAdd)
}

nextNodeId = () => {
  // get the next largest node id
  var nds = network.nodesHandler.body.data.nodes.getDataSet()
  return _.max(nds.getIds()) + 1
}

nextEdgeId = () => {
  return _.uniqueId()
}

cloneSelections = () => {
  copySelections()
  pasteSelections()
}

deleteSelections = () => {
  var eds = network.edgesHandler.body.data.edges.getDataSet()
  var nds = network.nodesHandler.body.data.nodes.getDataSet()
  var selections = network.getSelection()
  var edgesToRemove = selections.edges
  selections.nodes.forEach( (nid) => {
    ces = network.getConnectedEdges(nid)
    ces.forEach( (eid) => {
      edgesToRemove.push(eid)
    })
  })
  eds.remove(_.uniq(edgesToRemove))
  nds.remove(selections.nodes)
}

changeNodeColor = (color) => {
  changeOptionsForSelectedNodes({color:{background:color, highlight:{background: 'yellow',border:'red'}}})
}

changeNodeBorderColor = (color) => {
  changeOptionsForSelectedNodes({color:{border:color, highlight:{background: 'yellow',border:'red'}}})
}

changeNodeBorderWidth = (width) => {
  changeOptionsForSelectedNodes({borderWidth: width})
}

changeEdgeColor = (color) => {
  changeOptionsForSelectedEdges({color:{color:color, highlight: 'red'}})
}

changeEdgeWidth = (width) => {
  changeOptionsForSelectedEdges({width: width, hoverWidth:  function (width) {return width*2},selectionWidth: function (width) {return width*2}})
}

changeNodeShape = (shape) => {
  changeOptionsForSelectedNodes({shape: shape})
}

changeEdgeArrows = (arrows) => {
  changeOptionsForSelectedEdges({arrows: arrows})
}

addEdgeWidthInput = (input) => {
  debugger
}

window.latestNodeLabel = 'unknown'

nodeLabelSelected = (label) => {
  changeOptionsForSelectedNodes({label: label})
  window.latestNodeLabel = label
}

window.latestEdgeLabel = 'unknown'

edgeLabelSelected = (label) => {
  changeOptionsForSelectedEdges({label: label})
  window.latestEdgeLabel = label
}

addNode = () => {
  network.addNodeMode()
}

addEdge = () => {
  network.addEdgeMode()
}