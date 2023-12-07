import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { Handle, NodeResizer, Position, useReactFlow } from "reactflow";
import { useNodeDataChange } from "../../../hooks/useNodeDataChange";
import {
  NodeWrapper,
  NodeBody,
  NodeField,
  NodeTitle,
  NodeCheck,
  InputWrapper,
  ChartDiv,
} from "./style";
import {
  Slider,
  Checkbox,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";
import DataExplorer from "../../../components/DataExplorer/DataExplorer";
// import DataExplorer from "../../../components/DataExplorerChart/DataExplorer";
const flowKey = "example-flow";

export const CustomNodeLayout = (props) => {
  const { nodeProps, fields } = props;
  const { getNode, setNodes, addNodes, setEdges, getNodes } = useReactFlow();
  const UpdateNodes = getNodes();
  const { changeNodeName } = useNodeDataChange();
  const [SavedFlow, setSavedFlow] = useState(null);
  const [checkstate, setcheckstate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [SavedDefaultValue, setDefaultValue] = useState(null);
  const nodeElement = getNode(nodeProps.id);
  const [elements, setElements] = useState([nodeProps]);
  const [searchInput, setSearch] = useState("");
  const [sliderValue, setSildeValue] = useState(0);
  const [clear, setClear] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const handleClearSearch = () => {
    setSearch("");
  };
  const divElementId = `chart${Math.random().toString(36).substring(7)}`;
  const Element_Options = nodeElement?.data.Module_Elements[0]?.Element_Options;
  const Updated_Default_Value =
    nodeElement?.data?.Module_Elements[0]?.Updated_Default_Value;

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const Savedflow = JSON.parse(localStorage.getItem(flowKey));
      const ParseFlow = JSON.parse(Savedflow);
      const flow = ParseFlow.dataFlow[0];
      if (flow) {
        setSavedFlow(flow);
      }
    };
    restoreFlow();
  }, []);

  useEffect(() => {
    onRestore();
  }, []);

  useEffect(() => {
    if (SavedFlow) {
      setLoading(false);
      const filterFLow =
        SavedFlow &&
        SavedFlow.nodes.filter((item) => item.id == nodeProps.id)[0]?.data;
      setDefaultValue(filterFLow);
    }
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [SavedFlow]);

  const currentNodeInputClear = nodeProps.data.clearInput;

  const clearInputValues = () => {
    const parentDiv = document.getElementById(nodeProps.id);
    const inputElements = parentDiv.querySelectorAll('input[type="text"]');
    inputElements.forEach((input) => {
      input.value = nodeElement.data.Module_Elements[0].Default_Value;
    });
    const inputNumberElements = parentDiv.querySelectorAll(
      'input[type="number"]'
    );
    inputNumberElements.forEach((input) => {
      input.value = nodeElement.data.Module_Elements[0].Default_Value;
    });
    const checkboxElements = parentDiv.querySelectorAll(
      'input[type="checkbox"]'
    );
    checkboxElements.forEach((checkbox) => {
      checkbox.checked = false;
    });
    const radioInputs = parentDiv.querySelectorAll('input[name="group"]');
    radioInputs.forEach((input) => {
      input.checked = false;
    });

    const selectElements = parentDiv.querySelectorAll("select");

    selectElements.forEach((select) => {
      select.selectedIndex = nodeElement.data.Module_Elements[0].Default_Value;
    });
  };

  const clearNodeInputs = useCallback(() => {
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        if (node.id == nodeProps.id) {
          const clear = node.data.clearInput ? false : true;
          return {
            ...node,
            data: {
              ...node.data,
              clearInput: false,
            },
          };
        }
        return node;
      });
    });
  }, [nodeProps.id, setNodes]);

  useEffect(() => {
    if (currentNodeInputClear || clear) {
      clearNodeInputs();
      setSearch("");
      clearInputValues();
      setSildeValue(0);
      setClear(false);
    }
  }, [currentNodeInputClear, clear]);

  const renderInputField = (field) => {
    const { type, label, options, Updated_Default_Value } = field;
    const defaultValue =
      SavedDefaultValue !== null
        ? SavedDefaultValue?.Module_Elements[0].Updated_Default_Value ||
        field.defaultValue
        : field.defaultValue;
    const blockInvalidChar = (e) =>
      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  
    switch (type) {

      case "Numeric_Input":
        return (
          <NodeField>
            <NodeTitle htmlFor="text">{label}</NodeTitle>
            <input
              className="nodeTextField"
              type="number"
              onKeyDown={blockInvalidChar}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name={label}
              defaultValue={defaultValue || ""}
              onChange={(e) =>
                changeNodeName(nodeProps.id, type, e.target.value)
              }
            />
          </NodeField>
        );
      case "Drop_Down":
        return (
          <NodeField>
            <NodeTitle htmlFor="text">{label}</NodeTitle>
            <div className="select">
              <select
                className="nopan nodrag"
                name={label}
                defaultValue={defaultValue}
                onChange={(e) =>
                  changeNodeName(nodeProps.id, type, e.target.value)
                }
              >
                {options.map((option) => (
                  <option
                    className="nopan nodrag"
                    key={option.value}
                    value={option.value}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </NodeField>
        );

      case "Selection_List":
        return (
          <>
            <NodeField>
              <InputWrapper>
                <FormControl variant="standard">
                  <Input
                    id="input-with-icon-adornment"
                    placeholder="Search"
                    className="searchInput"
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon
                          style={{ stroke: "#f3a233", fill: "#f3a233" }}
                        />
                      </InputAdornment>
                    }
                    endAdornment={
                      searchInput && (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClearSearch} edge="end">
                            <ClearIcon
                              style={{ stroke: "#f3a233", fill: "#f3a233" }}
                            />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                    onChange={(e) => setSearch(e.target.value)}
                    value={searchInput}
                  />
                </FormControl>
              </InputWrapper>
            </NodeField>

            <Box
              component="div"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="10px"
            >
              <Button
                onClick={() => {
                  const parentDiv = document.getElementById(nodeProps.id);
                  const checkboxElements = parentDiv.querySelectorAll(
                    'input[type="checkbox"]'
                  );
                  checkboxElements.forEach((checkbox) => {
                    checkbox.checked = true;
                  });

                  const mappedNodes = UpdateNodes.map((node) => {
                    if (node.id === nodeProps.id) {
                      const updatedModuleElements =
                        node.data.Module_Elements.map((input) => {
                          const updatedInput = { ...input };
                          updatedInput.Updated_Default_Value = [];
                          return updatedInput;
                        });
                      return {
                        ...node,
                        data: {
                          ...node.data,
                          Module_Elements: updatedModuleElements,
                        },
                      };
                    }
                    return node;
                  });

                  setNodes(mappedNodes);
                  setTimeout(() => {
                    options.map((object) =>
                      changeNodeName(nodeProps.id, type, object)
                    );
                  }, 300);
                }}
                variant="contained"
                disabled={
                  Element_Options?.length == Updated_Default_Value?.length
                }
                size="small"
                style={{ background: "#1f2337", fontSize: "12px" }}
              >
                Select all
              </Button>

              <Button
                onClick={(e) => {
                  setClear(true);
                  options.map((object) =>
                    changeNodeName(nodeProps.id, "Clear-all", object)
                  );
                }}
                disabled={
                  Element_Options?.length !== Updated_Default_Value?.length
                }
                variant="contained"
                size="small"
                style={{ background: "#1f2337", fontSize: "12px" }}
              >
                Clear
              </Button>
            </Box>

            {options.map((object) => {
              const filterCheck =
                defaultValue && Array.isArray(defaultValue)
                  ? defaultValue.filter((checkValue) => checkValue == object)[0]
                  : "";
              return (
                (searchInput ? object.includes(searchInput) : true) && (
                  <NodeField>
                    <NodeCheck className="form-check">
                      <NodeTitle>
                        <label for="vehicle1"> {object}</label>
                      </NodeTitle>
                      <div
                        style={{
                          position: "relative",
                          height: "18px",
                          width: "18px",
                        }}
                      >
                        <input
                          className="nopan nodrag custom-checkbox"
                          type="checkbox"
                          id={object}
                          name={object}
                          defaultChecked={filterCheck == object ? true : false}
                          value={checkstate ? "" : object}
                          onClick={(e) => {
                            e.stopPropagation();
                            changeNodeName(nodeProps.id, type, e.target.value);
                          }}
                        />
                      </div>
                    </NodeCheck>
                  </NodeField>
                )
              );
            })}
          </>
        );

      case "radio":
        return (
          <div>
            {options.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={label}
                  value={option.value}
                  checked={elements[label] === option.value}
                  onChange={(e) =>
                    changeNodeName(nodeProps.id, type, e.target.value)
                  }
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      case "slider":
        return (
          <NodeField>
            <NodeTitle htmlFor="text">Slider Label</NodeTitle>
            <Slider
              size="small"
              step="1"
              aria-label="Small"
              value={sliderValue}
              valueLabelDisplay="auto"
              style={{ width: "167px" }}
              onChange={(e) => setSildeValue(e.target.value)}
              className="nopan nodrag"
            />
          </NodeField>
        );

      case "searchBox":
        return (
          <>
            <InputWrapper>
              <FormControl variant="standard">
                <Input
                  id="input-with-icon-adornment"
                  placeholder="Search"
                  className="searchInput"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon
                        style={{ stroke: "#f3a233", fill: "#f3a233" }}
                      />
                    </InputAdornment>
                  }
                  endAdornment={
                    searchInput && (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClearSearch} edge="end">
                          <ClearIcon
                            style={{ stroke: "#f3a233", fill: "#f3a233" }}
                          />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                  onChange={(e) => setSearch(e.target.value)}
                  value={searchInput}
                />
              </FormControl>
            </InputWrapper>
          </>
        );

      case "Interactive_Chart":
        return (
          <ChartDiv>
            
              <NodeResizer minWidth={650} minHeight={550} />
              <Box flex="1" minHeight="350px" display="flex" flexDirection="column" className="nopan nodrag">
                <DataExplorer   id={nodeProps.id}/>
              </Box>
           
          </ChartDiv>


        );
      default:
        return null;
    }
  };
  return (
    <Box minHeight={nodeProps?.data?.label == "Charting" ? "550px" : "auto"} minWidth={nodeProps?.data?.label == "Charting" ? "650px" : "100%"} width={nodeProps?.data?.label == "Charting" ? "100%" : "300px"} height="100%" display="flex" flexDirection="column" borderRadius="10px" overflow="hidden" id={nodeProps.id} className={nodeProps?.data?.label === "Charting" && "chartBox"}>
      {nodeElement.data.Module_Inputs ? (
        <Handle
          type="target"
          position={Position.Left}
          style={{
            top: "60px",
            background: "#ffa834",
            border: "1px solid black",
            height: "12px",
            width: "12px",
            left: "-7px",
          }}
        />
      ) : null}
      <Box component="h2" sx={{ background: "#313D16" }} margin="0" padding="5px 12px" fontSize="14px">{nodeProps?.data?.label}</Box>
      <NodeBody>
        {/* <NodeTitle>{nodeElement.data.Module_Inputs}</NodeTitle> */}

        {nodeProps?.data?.label === "Charting" ? <Box component="p" sx={{ background: "#414141" }}
          margin= "-7px 0 -1px -3px"
          width="78px"
          height="48px"
          position="relative"
          zIndex="1"
          padding="0 12px"
          fontSize="14px"
          top="20px"
          left="1px"
          display="flex"
          justifyContent="center"
          alignItems="center"

        >{nodeElement.data.Module_Inputs}</Box> : <NodeTitle>{nodeElement.data.Module_Inputs}</NodeTitle>}

        {!loading &&
          nodeElement?.data?.Module_Elements.map((element) => {
            const Module_Elements = {
              type: element.Element_Type,
              options: element.Element_Options,
              label: element.Element_Label,
              defaultValue: element.Default_Value,
              Updated_Default_Value: element.Updated_Default_Value,
            };
            return renderInputField(Module_Elements);
          })}
        <NodeTitle style={{ textAlign: "right" }}>
          {nodeElement.data.Module_Outputs}
        </NodeTitle>
      </NodeBody>

      {nodeElement.data.Module_Outputs ? (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            bottom: "20px",
            top: "unset",
            background: "#c2185b",
            border: "1px solid black",
            height: "12px",
            width: "12px",
            right: "-7px",
          }}
        />
      ) : null}
    </Box>
  );
};
