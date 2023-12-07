import * as React from 'react';
import "../index";
import { useState } from "react";
import { Box } from "@mui/system";
import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import {
  TabContainer,
  InputWrapper,
  SubCategory,
  SubCategoryText,
  TooltipData
} from "./style";
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Sidebar = ({groupedNodeDataArray}) => {
  const [TabValue, setValue] = React.useState(0);
  const [searchInput, setSearch] = useState('');
  const [openTooltips, setOpenTooltips] = useState({});

  const handleTooltipOpen = (tooltipId) => {
    setOpenTooltips({ ...openTooltips, [tooltipId]: true });
  };
  const handleTooltipClose = (tooltipId) => {
    setOpenTooltips({ ...openTooltips, [tooltipId]: false });
  };
  const onDragStart = (event, inputType,Module_Category,Module_Elements,Module_Info,Module_Inputs,Module_Name,Module_Outputs,Module_SubCategory) => {
    event.dataTransfer.setData("application/reactflow", "customInput");
    event.dataTransfer.setData("application/reactflow/Module_Category", Module_Category);
    event.dataTransfer.setData("application/reactflow/Module_Info", Module_Info);
    event.dataTransfer.setData("application/reactflow/Module_Inputs", Module_Inputs);
    event.dataTransfer.setData("application/reactflow/Module_Outputs", Module_Outputs);
    event.dataTransfer.setData("application/reactflow/Module_SubCategory", Module_SubCategory);
    event.dataTransfer.setData("application/reactflow/label", Module_Name);
    event.dataTransfer.setData("application/reactflow/color", "#42a5f5");
    event.dataTransfer.setData("application/reactflow/inputType", JSON.stringify(Module_Elements));
    event.dataTransfer.effectAllowed = "move";
  
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClearSearch = () => {
    setSearch("");
  };
  return (
    <Box className="sideBarBox">
      <Box textAlign={`center`} margin="8px 2px">
        <InputWrapper>
          <FormControl variant="standard">
            <Input
              id="input-with-icon-adornment"
              placeholder='Search'
              className='searchInput'
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon style={{ stroke: "#f3a233", fill: "#f3a233" }} />
                </InputAdornment>
              }
              endAdornment={
                searchInput && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch} edge="end">
                      <ClearIcon style={{ stroke: "#f3a233", fill: "#f3a233" }} />
                    </IconButton>
                  </InputAdornment>
                )
              }
              onChange={(e) => setSearch(e.target.value)}
              value={searchInput}

            />
          </FormControl>
        </InputWrapper>

      </Box>
      <TabContainer>
        <Tabs
          value={TabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Modules" {...a11yProps(0)} />
          <Tab label="Templates" {...a11yProps(1)} />
        </Tabs>
      </TabContainer>
      <CustomTabPanel value={TabValue} index={0} className="sidebarScroll">
        
{groupedNodeDataArray.map((nodeData)=> { 
  
  const SubGroupedNodeData = nodeData.Module_Items.reduce((acc, node) => {
    const category = node.Module_SubCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(node);
    return acc;
  }, {});
  const SubGroupedNodeDataArray = Object.keys(SubGroupedNodeData).map(category => {
    return {
      Module_SubCategory: category,
      Module_Items: SubGroupedNodeData[category]
    };
  });
  

  return (<Accordion style={{borderRadius:"14px"}} defaultExpanded={true}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography fontSize={"14px"}>{nodeData?.Module_Category}</Typography>
    </AccordionSummary>
    <AccordionDetails >
      {SubGroupedNodeDataArray.map((item,i)=> <>
        <SubCategory>
        <SubCategoryText>{item.Module_SubCategory}</SubCategoryText>
        <div className='line'></div>
      </SubCategory>
        <Box
        
        mt={1}
        mb={1}
        display="flex"
        justifyContent={`center`}
        flexDirection="column"
        alignItems={`center`}
      >
        {item.Module_Items.map((object, key) => (searchInput ? object?.Module_Name?.includes(searchInput) : true) && (
          <Box width={"100%"} >
    
            <Box
              draggable
              onDragStart={(event) =>
                onDragStart(event, object.inputType, 
                  object?.Module_Category,
                  object?.Module_Elements,
                  object?.Module_Info,
                  object?.Module_Inputs,
                  object?.Module_Name,
                  object?.Module_Outputs,
                  object?.Module_SubCategory)
              }
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#313D16"}
              padding={"0 10px"}
              height={"32px"}
              borderRadius={"100vmax"}
              marginBottom={"3px"}
              className="node-drag"
              style={{ cursor: "grab" }}
            >
              <Box key={key}
                color={"#B0B52C"}
                fontSize={"14px"}
              >
                {object.Module_Name}
              </Box>
              <Box height={"24px"}>
              <ClickAwayListener onClickAway={() => handleTooltipClose(object.Module_Name)}>
                <Tooltip open={openTooltips[object.Module_Name] || false}
                  onClose={() => handleTooltipClose(object.Module_Name)} key={object.Module_Name} title={object?.Module_Info} placement="right"
                  disableFocusListener
                   disableHoverListener
                  disableTouchListener
                  arrow>
                  <InfoOutlinedIcon onClick={() => handleTooltipOpen(object.Module_Name)} />
                </Tooltip>
                </ClickAwayListener>

              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      </>)}
    </AccordionDetails>
  </Accordion>)})}
      </CustomTabPanel>
      <CustomTabPanel value={TabValue} index={1}>
        Nai kichu
      </CustomTabPanel>
    </Box>
  );
};
export default Sidebar;
