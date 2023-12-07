import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";

import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  updateEdge,
  MarkerType,
  // getIncomers,
  // getOutgoers,
  Panel,
  useReactFlow,

} from "reactflow";
import toast, { Toaster } from "react-hot-toast";
import dagre from "dagre";

import { v4 as uuidv4 } from "uuid";
import CustomInputNode from "../../components/FlowComponents/Nodes/CustomInputNode";
import CustomEdge from "../../components/FlowComponents/CustomEdge";
import { edgeArrowId } from "../../helpers";
import Fab from "@mui/material/Fab";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import MemoryIcon from "@mui/icons-material/Memory";
import {
  MainContainer,
  LeftChartContent,
  SidebarLayout,
  ReactFLowWrapper,
  MobileMenuBtn,
  SubmitBox,
  SaveInput,
} from "./style";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { FlowAuthApi } from "../../Context/FlowAuth";
import axios from "axios";
import { Layout, Sidebar } from "../../components";
import "reactflow/dist/style.css";
import { Box, Typography } from "@mui/material";
import ResizeRotateNode from "../../components/ResizeRotateNode/ResizeRotateNode";
import { HoverContext } from "../../Context/HoverContext";




const flowKey = "example-flow";

const DataFlow = () => {
  const {
    data: flowAuth,
    loading: axiosLoading,
    error: axiosError,
  } = FlowAuthApi();
  const { getNodes } = useReactFlow();
  const UpdateNodes = getNodes();
  const { setViewport } = useReactFlow();
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const nodeWidth = 172;
  const nodeHeight = 36;
  const getLayoutedElements = (nodes, edges, direction = "TB") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });
    dagre.layout(dagreGraph);
    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? "left" : "top";
      node.sourcePosition = isHorizontal ? "right" : "bottom";
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
      return node;
    });
    return { nodes, edges };
  };
  const nodeTypes = useMemo(
    () => ({
      customInput: CustomInputNode,
      resizeRotate: ResizeRotateNode,
    }),
    []
  );
  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    [],
    []
  );

  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [flowModules, setFlowModules] = useState([]);
  const [parent, setParent] = useState();
  const [menu, setMenu] = useState(null);
  const [flowCheck, setFlowCheck] = useState(false);
  const [flowInputValue, setFlowInputValue] = useState();
  const [flowSave, setFlowSave] = useState(false);
  const [flowSaveValue, setFlowSaveValue] = useState();
  const ref = useRef(null);

  const onConnect = useCallback(
    (params) => {
      if (!params?.source || !params?.target) {
        return;
      }
      const source = params?.source;
      const target = params.target;
      const newDecisionLineEdge = source.match(/decision/g);
      const newEdgeId = edgeArrowId(source, target);

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            id: newEdgeId,
            type: "custom",
            animated: false,
            style: { stroke: "white" },
            data: {
              text: newDecisionLineEdge ? "Enter your line" : "",
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  useEffect(() => {
    if (flowAuth?.AccessToken) {
      const AccessToken = flowAuth?.AccessToken;
      axios
        .get("https://api.innobetaforge.com/FlowModules", {
          headers: {
            AccessToken: AccessToken,
          },
        })
        .then((response) => {
          setFlowModules(response.data);
        })
        .catch((err) => {});
    }
  }, [flowAuth]);

  const groupedNodeData = flowModules.reduce((acc, node) => {
    const category = node.Module_Category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(node);
    return acc;
  }, {});

  // Convert the grouped object back to an array of objects
  const groupedNodeDataArray = Object.keys(groupedNodeData).map((category) => {
    return {
      Module_Category: category,
      Module_Items: groupedNodeData[category],
    };
  });

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        let x = 0;
        let y = 0;
        if (node.id === parent) {
          x = node.position.x;
          y = node.position.y;
        }
        return node;
      })
    );
  }, [parent, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.selected === true) {
          node.data = {
            ...node.data,
          };
          node.style = { ...node.style };
        }
        return node;
      })
    );
  }, [setNodes]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const inputType = event.dataTransfer.getData(
        "application/reactflow/inputType"
      );
      const Module_Category = event.dataTransfer.getData(
        "application/reactflow/Module_Category"
      );
      const Module_Info = event.dataTransfer.getData(
        "application/reactflow/Module_Info"
      );
      const Module_Inputs = event.dataTransfer.getData(
        "application/reactflow/Module_Inputs"
      );
      const Module_Outputs = event.dataTransfer.getData(
        "application/reactflow/Module_Outputs"
      );
      const Module_SubCategory = event.dataTransfer.getData(
        "application/reactflow/Module_SubCategory"
      );
      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("application/reactflow/label");
      const bgCol = event.dataTransfer.getData("application/reactflow/color");
      const InputArray = JSON.parse(inputType);

      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      let newNode;
      if (type === "customInput") {
        newNode = {
          id: `${uuidv4()}`,
          type,
          position,
          data: {
            label: `${label}`,
            Module_Elements: InputArray,
            isLocked: false,
            clearInput: false,
            Module_Category: Module_Category,
            Module_Info: Module_Info,
            Module_Inputs: Module_Inputs,
            Module_Outputs: Module_Outputs,
            Module_SubCategory: Module_SubCategory,
          },
          style: {
            backgroundColor: "transparent",
            // width: 300,
            height: "auto",
            borderRadius: 6,
            borderColor: "#1111",
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = (event, node) => {
    event.preventDefault();
    setFlowCheck(false);
  };
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  const graphStyles = { width: "100%", height: "1000px", Background: "white" };
  const proOptions = { hideAttribution: true };

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();
      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = reactFlowWrapper.current.getBoundingClientRect();

      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 1500 && event.clientY,
        left: event.clientX < pane.width - 1500 && event.clientX,
        right: event.clientX >= pane.width - 1500 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 1500 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => [
    setMenu(null),
    [setMenu],
    setFlowCheck(false),
    setFlowSave(false),
  ]);
  const [isMobile, setIsMobile] = useState(true);
  const handleMobileBar = () => {
    setIsMobile(!isMobile);
  };

  const saveFlow = (elements, setOpenMenuClick) => {
    const flow = reactFlowInstance.toObject();

    const DataFlowJson = {
      FlowName: flowSaveValue,
      dataFlow: [flow],
    };
    const jsonData = JSON.stringify(DataFlowJson);

    localStorage.setItem(flowKey, JSON.stringify(jsonData));

    const postData = async () => {
      const AccessToken = flowAuth?.AccessToken;

      try {
        const url = "https://api.innobetaforge.com/FlowSave";
        const headers = {
          AccessToken: AccessToken,
          "Content-Type": "application/json",
        };

        // Make a POST request with Axios
        const response = await axios.post(url, DataFlowJson, {
          headers: headers,
        });

        // Handle the response here if needed

        toast.success("Saved Successfully");
        if (flowSaveValue) {
          setFlowSave(null);
          setFlowSaveValue(false);
        }
      } catch (error) {
        toast.error("Something went wrong, Try again later");
        // Handle errors here
      }
    };
    if (flowSaveValue) {
      if (flow.nodes.length > 0) {
        postData();
      } else {
        toast.error("No Data To Submit");
      }
    } else {
      toast.error("Flow Name Is Required");
    }
  };

  const flowRun = () => {
    const flow = reactFlowInstance.toObject();

    const newEdgeData = {
      nodes: flow.nodes.map((node) => {
        const moduleId = node.id;
        const matchedInputs = flow.edges
          .filter((edge) => edge.target === moduleId)
          .map((edge) => {
            const sourceId = edge.source;
            const matchedNode = flow.nodes.find((n) => n.id === sourceId);
            const newMachedWithID = matchedNode.data;
            newMachedWithID.id = matchedNode.id;
            return newMachedWithID;
          });

        const matchedOutputs = flow.edges
          .filter((edge) => edge.source === moduleId)
          .map((edge) => {
            const targetId = edge.target;
            const matchedNode = flow.nodes.find((n) => n.id === targetId);
            const newMachedWithID = matchedNode.data;
            newMachedWithID.id = matchedNode.id;
            return newMachedWithID;
          });

        return {
          ...node,
          Module_Inputs: matchedInputs,
          Module_Outputs: matchedOutputs,
        };
      }),
      edges: flow.edges,
    };

    const newData = {};
    let moduleCount = 1;

    newEdgeData.nodes.forEach((node) => {
      const moduleId = node.id;
      const moduleLabel = node.data.label;
      let moduleInputs = node.Module_Inputs;
      let moduleOutputs = node.Module_Outputs;

      const moduleInfo = {
        Module_Name: moduleLabel,
        Module_UUID: moduleId,
        Module_Element: [],
        Module_Inputs: [],
        Module_Outputs: [],
      };

      // Extract Module_Elements data
      if (node.data.Module_Elements) {
        node.data.Module_Elements.forEach((element) => {
          moduleInfo.Module_Element.push({
            Element_Label: element.Element_Label,
            Element_Value:
              element.Updated_Default_Value || element.Default_Value,
          });
        });
      }

      // Extract Module_Inputs data
      moduleInputs.forEach((input) => {
        const inputPort = node.data.Module_Inputs;

        moduleInfo.Module_Inputs.push({
          Input_Port: inputPort,
          Module_Name: input.label,
          Module_UUID: input.id,
        });
      });

      // Extract Module_Outputs data
      moduleOutputs.forEach((output) => {
        const outputPort = node.data.Module_Outputs;

        moduleInfo.Module_Outputs.push({
          Output_Port: outputPort,
          Module_Name: output.label,
          Module_UUID: output.id,
        });
      });

      // Store the transformed data with unique keys
      newData[moduleCount] = moduleInfo;
      moduleCount++;
    });

    const DataFlowJson = {
      FlowName: flowInputValue,
      dataFlow: [newData],
    };

    const jsonData = JSON.stringify(DataFlowJson);

    const postData = async () => {
      const AccessToken = flowAuth?.AccessToken;

      try {
        const url = "https://api.innobetaforge.com/FlowRun";
        const headers = {
          AccessToken: AccessToken,
          "Content-Type": "application/json",
        };
        const response = await axios.post(
          url,
          { jsonData },
          {
            headers: headers,
          }
        );

        // Handle the response here if needed
        toast.success("Submit Successfully");
        if (flowInputValue) {
          setFlowCheck(null);
          setFlowInputValue(false);
        }
        // setFlowCheck(false)
      } catch (error) {
        // Handle errors here
        console.error("Error:", error);
        toast.error("Something went wrong, Try again later");
      }
    };

    if (flowInputValue) {
      if (flow.nodes.length > 0) {
        postData();
      } else {
        toast.error("No Data To Submit");
      }
    } else {
      toast.error("Flow Name Is Required");
    }
  };

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const Savedflow = JSON.parse(localStorage.getItem(flowKey));
      const ParseFlow = JSON.parse(Savedflow);
      const flow = ParseFlow.dataFlow[0];
      if (flow.nodes.length > 0) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  useEffect(() => {
    onRestore();
  }, []);

  const onEdgeClick = (e, f) => {
    const tagName = e.target?.tagName;
    if (tagName == "BUTTON")
      setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== f.id));
  };
  const { isHovered, handleHover } = useContext(HoverContext);
  return (
    <Layout>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <MainContainer>
        <MobileMenuBtn onClick={() => handleMobileBar()}>
          {isMobile ? (
            <svg
              className="sidebarBtn"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                fill="rgba(240,238,238,1)"
              ></path>
            </svg>
          ) : (
            <svg
              className="sidebarBtn"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M2 18H9V20H2V18ZM2 11H11V13H2V11ZM2 4H22V6H2V4ZM20.674 13.0251L21.8301 12.634L22.8301 14.366L21.914 15.1711C21.9704 15.4386 22 15.7158 22 16C22 16.2842 21.9704 16.5614 21.914 16.8289L22.8301 17.634L21.8301 19.366L20.674 18.9749C20.2635 19.3441 19.7763 19.6295 19.2391 19.8044L19 21H17L16.7609 19.8044C16.2237 19.6295 15.7365 19.3441 15.326 18.9749L14.1699 19.366L13.1699 17.634L14.086 16.8289C14.0296 16.5614 14 16.2842 14 16C14 15.7158 14.0296 15.4386 14.086 15.1711L13.1699 14.366L14.1699 12.634L15.326 13.0251C15.7365 12.6559 16.2237 12.3705 16.7609 12.1956L17 11H19L19.2391 12.1956C19.7763 12.3705 20.2635 12.6559 20.674 13.0251ZM18 18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14C16.8954 14 16 14.8954 16 16C16 17.1046 16.8954 18 18 18Z"
                fill="rgba(255,255,255,1)"
              ></path>
            </svg>
          )}
        </MobileMenuBtn>
        <SidebarLayout className={`${isMobile && `sidebarActive`}`}>
          <Sidebar groupedNodeDataArray={groupedNodeDataArray} />
        </SidebarLayout>
        <LeftChartContent>
          <ReactFLowWrapper>
            <ReactFlow
            
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onNodeContextMenu={onNodeContextMenu}
              onEdgeUpdate={onEdgeUpdate}
              connectionLineType="default"
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              style={graphStyles}
              onDragOver={onDragOver}
              ref={reactFlowWrapper}
              nodes={nodes}
              edges={edges}
              zoomOnScroll={!isHovered}
              proOptions={proOptions}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onEdgeClick={onEdgeClick}
              maxZoom={3}
              minZoom={0.2}
            >
              
              <Controls />
              <Background gap={8} color="#767575" />
              <Panel position="bottom-right" className="Panel-Buttons">
                <Fab
                  size="medium"
                  color="error"
                  aria-label="add"
                  onClick={() => [setNodes([]), setEdges([])]}
                >
                  <DeleteForeverIcon />
                </Fab>

                {flowSave ? (
                  <Box
                    position="relative"
                    style={{ zIndex: "10" }}
                    className="input-animation-box"
                  >
                    <Fab
                      onClick={() => saveFlow([{ nodes: nodes, edges: edges }])}
                      color="secondary"
                      aria-label="edit"
                      size="medium"
                      position="relative"
                      style={{ zIndex: "10" }}
                    >
                      <DoneOutlineOutlinedIcon
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                          position: "relative",
                          zIndex: "2",
                        }}
                      />
                    </Fab>
                    <SaveInput className="slideInAnimation">
                      <Typography
                        component="p"
                        fontSize="14px"
                        marginLeft="20px"
                      >
                        Flow Name
                      </Typography>
                      <input
                        type="text"
                        required
                        className="nodeTextField"
                        placeholder="Text Input"
                        onChange={(e) => setFlowSaveValue(e.target.value)}
                      />
                    </SaveInput>
                  </Box>
                ) : (
                  <Fab
                    onClick={() => [setFlowSave(true), setFlowCheck(false)]}
                    color="secondary"
                    aria-label="edit"
                    size="medium"
                  >
                    <SaveIcon />
                  </Fab>
                )}

                {flowCheck ? (
                  <Box
                    position="relative"
                    style={{ zIndex: "10" }}
                    className="input-animation-box"
                  >
                    <Fab
                      onClick={() => flowRun([{ nodes: nodes, edges: edges }])}
                      color="success"
                      position="relative"
                      style={{ zIndex: "10" }}
                    >
                      <DoneOutlineOutlinedIcon
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                          position: "relative",
                          zIndex: "2",
                        }}
                      />
                    </Fab>
                    <SubmitBox className="slideInAnimation">
                      <Typography
                        component="p"
                        fontSize="14px"
                        marginLeft="20px"
                      >
                        Flow Name
                      </Typography>
                      <input
                        type="text"
                        required
                        className="nodeTextField"
                        placeholder="Text Input"
                        onChange={(e) => setFlowInputValue(e.target.value)}
                      />
                    </SubmitBox>
                  </Box>
                ) : (
                  <Fab
                    onClick={() => [setFlowCheck(true), setFlowSave(false)]}
                    color="success"
                  >
                    <MemoryIcon style={{ width: "1.9em", height: "1.9em" }} />
                  </Fab>
                )}
              </Panel>

             
              {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
              
            </ReactFlow>
          </ReactFLowWrapper>
        </LeftChartContent>
      </MainContainer>
    </Layout>
  );
};
export default DataFlow;
