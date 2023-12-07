import React, { useState, useEffect, useRef, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import html2canvas from "html2canvas";
import { Button, } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import axios from "axios";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataExplorerApi } from '../../Context/DataExplorerViewInfoApi';
import toast, { Toaster } from 'react-hot-toast';
import Papa from 'papaparse';


import {
  TabContainer,
  MainContainer,
  LeftChartContent,
  Sidebar,
  DataInforMation,
  GroupChecks,
  ColorsLine,
  LegendSelect,
  LegendSettingsWrapper,
  PageRoot,
  DownloadButton,
  AccordionScrollContainer,
  InformationBox,
  SubmitTag,
  StartTag,
  MobileSideBarDiv,
  DateTimeBox,
  GreenBtn
} from "./Style";
import { appTheme } from "scichart-example-dependencies";
import {
  EAutoRange,
  EExecuteOn,
  FastLineRenderableSeries,
  MouseWheelZoomModifier,
  NumberRange,
  NumericAxis,
  RubberBandXyZoomModifier,
  SciChartOverview,
  SciChartSurface,
  XyDataSeries,
  ZoomExtentsModifier,
  ZoomPanModifier,
  IThemeProvider,
  SciChartJSLightTheme,
  SciChartJsNavyTheme,
  SciChartJSDarkv2Theme,
  LegendModifier,
  ELegendPlacement,
  ELegendOrientation,
  VerticalLineAnnotation,
  ELabelPlacement,
  IFillPaletteProvider,
  IStrokePaletteProvider,
  EFillPaletteMode,
  EStrokePaletteMode,
  parseColorToUIntArgb,
  IRenderableSeries,
  DateTimeNumericAxis,
  EAxisAlignment,
  XAxisDragModifier,
  YAxisDragModifier,
  PinchZoomModifier,
  EXyDirection,
  LeftAlignedOuterVerticallyStackedAxisLayoutStrategy,
  RightAlignedOuterVerticallyStackedAxisLayoutStrategy,
  easing,
} from "scichart";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { HoverContext } from "../../Context/HoverContext";
import { stringify } from "uuid";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class ThresholdPaletteProvider {
  constructor(yThresholdValue, yColor, xThresholdValue, xColor) {
    this.fillPaletteMode = EFillPaletteMode.GRADIENT;
    this.strokePaletteMode = EStrokePaletteMode.GRADIENT;
    this.yThresholdValue = yThresholdValue;
    this.yColor = parseColorToUIntArgb(yColor);
    this.xThresholdValue = xThresholdValue;
    this.xColor = parseColorToUIntArgb(xColor);
  }

  onAttached(parentSeries) { }

  onDetached() { }

  overrideFillArgb(xValue, yValue, index, opacity) {
    if (xValue > this.xThresholdValue) {
      return this.xColor;
    }
    if (yValue > this.yThresholdValue) {
      return this.yColor;
    }
    return undefined;
  }

  overrideStrokeArgb(xValue, yValue, index, opacity) {
    return yValue > this.yThresholdValue ? this.yColor : undefined;
  }
}

// const divElementId = "chart";
const divOverviewId = "overview";




// ////////////////////////////////////////
const DataExplorer = React.memo((props) => {

const divElementId = `chart`;
// ${Math.random().toString(36).substring(7)}
  const { data: streamInfo } = DataExplorerApi();
  const sciChartRef = useRef(null);
  const [TabValue, setValue] = React.useState(0);
  const [DomainFilter, SetDomainFilter] = React.useState([]);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    gridColor: "#264B9322",
    backgorundColor: "#E4F5FC",
    AxisText: "#1F3D68",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedInputVlues, setSelectedInputValues] = useState({
    chartTheme: "navy",
    TagName: "",
    TagCount: 0,
  });
  const [checkedItems, setCheckedItems] = useState({
    AutoScaleOnce: true,
    AutoScaleAlways: false,
    displayMarkers: true,
    showGrid: false,
    LayoutDefault: true,
  });
  const [LegendPosition, setLegendPosition] = useState("top-left");
  const [LegendOrientation, setLegendOrientation] = useState("horizontal");
  const [DataSetChart, setDataSetChart] = useState([]);
  const [Markers, setMarkers] = useState([]);
  const [DefaultMarkers, setDefaultMarkers] = useState([]);
  const [MarkerTemplates, setMarkerTemplates] = useState([])
  const [loader, setLoader] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [MarkerPlace, setMarkerPlace] = useState([]);
  const [DataDownloadButton, setDataDownloadButton] = useState("");
  const [markerPoisition, setmarkerPoisition] = React.useState([]);
  const [ChartCVSDataJson, setChartCVSDataJson] = React.useState([]);
  const [Submitsuccess, setSubmitSuccess] = React.useState(false);
  const [annotations, setAnnotations] = React.useState([]);
  const [MergedAnnotationArray, setMergedAnnotationArray] = React.useState([]);
  const [renderCount, setRenderCount] = useState(0);
  const [NewMarkers, setNewMarker] = React.useState([]);
  const [mobileSidebar, setMobileSidebar] = React.useState(true)
  const [TagTemplate, setTagTemplate] = React.useState(null);
  const [AnnotationSubmit, setAnnotationSubmit] = useState(false);
  const [MarketInputValue, setMarkerInputValue] = useState({});
  const [DeleteMarkers, setDeleteMarkers] = useState({});
  const [confirmationStates, setConfirmationStates] = useState({});
  const [confirmationTimers, setConfirmationTimers] = useState({});
  const [SciSurface, setSciSurface] = useState(null);
  const [currentDrag, setcurrentDrag] = useState(null);
  const [createSurface, setCreateSurface] = useState(null);
  const [surfaceRange, setSurfaceRange] = useState(null);
  const [surfaceRangex, setSurfaceRangex] = useState(null);

  const tabDataRef = useRef(null)



  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(0);


  const resizeHeight = cardHeight - 100;
  useEffect(() => {
    const observeCard = () => {
      const card = cardRef.current;
      if (!card) return;

      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          const newHeight = entry.contentRect.height;
          setCardHeight(newHeight);
        }
      });

      resizeObserver.observe(card);

      return () => {
        resizeObserver.disconnect();
      };
    };

    observeCard();
  }, []);


  const { isHovered, handleHover } = useContext(HoverContext);

  const handleMouseEnter = () => {
    handleHover(true);
  };

  const handleMouseLeave = () => {
    handleHover(false);
  };


  useEffect(() => {

    if (SciSurface) {

      if (SciSurface == "renderInput") {

      }
      else {
        const filterDragValue = MergedAnnotationArray.filter((templateMarker) => templateMarker.Marker_Set_Name == currentDrag.split("-")[0])

        filterDragValue.map((templateMarker) => {
          templateMarker.Markers.map((D) => {
            const keys = Object.keys(D);
            const dynamicPropertyName = keys[0];
            const nameWithGroup = templateMarker.Marker_Set_Name + "-" + dynamicPropertyName;
            // Set a timer for 2 seconds
            const timestamp = D[dynamicPropertyName];
            const timestampInMilliseconds = timestamp * 1000;
            // Create a new Date object
            const dateObject = new Date(timestampInMilliseconds);
            // Extract UTC date components
            const year = dateObject.getUTCFullYear();
            const month = dateObject.getUTCMonth() + 1; // Month is zero-indexed
            const day = dateObject.getUTCDate();
            // Extract UTC time components
            const hours = dateObject.getUTCHours();
            const minutes = dateObject.getUTCMinutes();
            const seconds = dateObject.getUTCSeconds();
            const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            // // Create a formatted date string
            const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

            const timeTarget = {
              target: {
                value: formattedTime,
                name: 'time',
              }
            }
            const DateTarget = {
              target: {
                value: formattedDate,
                name: 'date',
              }
            }

            handleMarkersInput(timeTarget, nameWithGroup, formattedDate, "for-chart")
            handleMarkersInput(DateTarget, nameWithGroup, formattedDate, "for-chart")
          })
        }
        )

        const Timer = setTimeout(() => {
          // setSciSurface("render");
        }, 100);
      }

    }


  }, [SciSurface])

  const onDragEnded = () => {
    setSciSurface("ended");

    // Handle any other logic you need when the drag ends
  };

  const maxTimestamp = markerPoisition[markerPoisition.length - 1];
  const minTimestamp = markerPoisition[0];

  const Markers2 = Markers;



  const handleMobileSidebar = () => {
    setMobileSidebar(!mobileSidebar)
  }

  // chart markers and themes
  const handleChartThemes = (event, fieldName) => {
    handleCheckboxChange(event.target.value);
    setSelectedInputValues({
      ...selectedInputVlues,
      [fieldName]: event.target.value,
    });
  };

  const handleMarkersInput = (e, dynamicPropertyName, formattedDate, formattedTime) => {
    const { name, value } = e.target;

    // Update the state with the new value
    setMarkerInputValue(prevValues => ({
      ...prevValues,
      [dynamicPropertyName]: {
        ...prevValues[dynamicPropertyName],
        [name]: value,
      },
    }));

    // If the input is a date input and time is not selected, update the time
    if (name === 'date' && !MarketInputValue[dynamicPropertyName]?.time) {
      setMarkerInputValue(prevValues => ({
        ...prevValues,
        [dynamicPropertyName]: {
          ...prevValues[dynamicPropertyName],
          time: prevValues[dynamicPropertyName]?.time || formattedTime,
        },
      }));
    }

    // If the input is a time input and date is not selected, update the date
    if (name === 'time' && !MarketInputValue[dynamicPropertyName]?.date) {
      setMarkerInputValue(prevValues => ({
        ...prevValues,
        [dynamicPropertyName]: {
          ...prevValues[dynamicPropertyName],
          date: prevValues[dynamicPropertyName]?.date || formattedDate,
        },
      }));
    }
    if (formattedTime !== "for-chart") {
      setSciSurface("renderInput");
    }

  };

  const handleMarkerInput = (event) => {
    setTagTemplate(event.target.value);

  };

  // legend position and orientation
  const handleLegendPosition = (event) => {
    setLegendPosition(event.target.value);
  };

  const handleLegendOrientation = (event) => {
    setLegendOrientation(event.target.value);
  };

  const handleCheckboxChange = (itemName) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName], // Toggle the checkbox value
    }));
  };

  const handleDeleteMarkersProgress = (itemName) => {

    setConfirmationStates((prevStates) => ({
      ...prevStates,
      [itemName]: true,
    }));

    // Set a timer for 2 seconds
    const timer = setTimeout(() => {
      // Reset the confirmation state after 2 seconds
      setConfirmationStates((prevStates) => ({
        ...prevStates,
        [itemName]: false,
      }));
    }, 2000);

    // Save the timer ID in the state
    setConfirmationTimers((prevTimers) => ({
      ...prevTimers,
      [itemName]: timer,
    }));
  };

  const handleDeleteMarkers = (itemName) => {

    setConfirmationStates((prevStates) => ({
      ...prevStates,
      [itemName]: true,
    }));

    // Set a timer for 2 seconds
    const timer = setTimeout(() => {
      // Reset the confirmation state after 2 seconds
      setConfirmationStates((prevStates) => ({
        ...prevStates,
        [itemName]: false,
      }));
    }, 2000);

    // Save the timer ID in the state
    setConfirmationTimers((prevTimers) => ({
      ...prevTimers,
      [itemName]: timer,
    }));

    setDeleteMarkers((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName], // Toggle the checkbox value
    }));
    const DeleteMarker = Markers &&
      Markers.filter((item) => item.Marker_Set_Name !== itemName);
    setMarkers(DeleteMarker);
    const DeleteMarkerTemplate = MarkerPlace &&
      MarkerPlace.filter((item) => item.Marker_Set_Name !== itemName);
    setMarkerPlace(DeleteMarkerTemplate);


  };

  // Function to handle the actual removal when confirmation is confirmed
  const handleConfirmRemove = (markerSetName) => {
    // Add your logic here to perform the actual removal

    // Clear the confirmation timer
    clearTimeout(confirmationTimers[markerSetName]);

    // Reset the confirmation state
    setConfirmationStates((prevStates) => ({
      ...prevStates,
      [markerSetName]: false,
    }));
  };


  // Cleanup function to clear the timer when the component unmounts
  useEffect(() => {
    return () => {
      Object.values(confirmationTimers).forEach((timer) => {
        if (typeof timer === 'number') {
          clearTimeout(timer);
        }
      });
    };
  }, [confirmationTimers]);

  // set the active tab value in a state
  const handleChange = (event, newValue) => {
    event.stopPropagation();
    setValue(newValue);
  };

  // function for set the color property in a state
  const handleColorChange = (color) => {
    setSelectedColor((prevSelectedColor) => ({
      ...prevSelectedColor,
      [selectedItem]: color.hex,
    }));
  };

  const handleColorPopup = (item) => {
    setSelectedItem(item);
    setDisplayColorPicker(!displayColorPicker);
  };


  function groupDataByDomain(apiData) {
    const groupedData = [];
    if (apiData) {
      apiData.forEach(dataset => {
        dataset.Info.forEach(info => {
          info.DataTypes.forEach(dataType => {
            Object.keys(dataType).forEach(key => {
              const domain = dataType[key][0].Domain;
              const dataStreams = dataType[key][0].DataStreams;
              const units = dataType[key][0].Units;
              const x_axis = dataType[key][0].x_axis;
              groupedData.push({
                Dataset_ID: dataset.Dataset_ID,
                Source_ID: dataset.Source_ID,
                Dataset_Name: dataset.Dataset_Name,
                DataType: key,
                DataStreams: dataStreams,
                Units: units,
                Domain: domain,
                x_axis: x_axis
              });
            });
          });
        });
      });
    }
    return groupedData;
  }

  const handlerAnnotationSubmit = () => {
    setAnnotationSubmit(true)
    setTimeout(() => {
      setAnnotationSubmit(false);
    }, 5000);
  }

  useEffect(() => {
    const data = groupDataByDomain(streamInfo?.Available_Datasets);
    SetDomainFilter(data)
  }, [streamInfo]);

  // const TabFilter = DomainFilter.filter((item) => TabValue == 0 ? item.Domain == "Time" : item.Domain == "Frequency");
  const TabFilter = DomainFilter;
  let ColorsCheckBoxes = TabFilter;




  // download chart png file
  const downloadAsPng = () => {

    const elementToCapture = document.getElementById("element-to-capture");

    html2canvas(elementToCapture).then((canvas) => {

      const pngUrl = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;

      downloadLink.download = "chart.png";

      document.body.appendChild(downloadLink);

      downloadLink.click();

      document.body.removeChild(downloadLink);
    });
  };

  // Function to group data by a specified key and return as a list of array objects
  function groupDataByKey(dataArray, key) {
    const groupedData = {};
    dataArray.forEach(dataItem => {
      const keyValue = dataItem[key];
      if (!groupedData[keyValue]) {
        groupedData[keyValue] = {
          Dataset_ID: dataItem.Dataset_ID,
          Source_ID: dataItem.Source_ID,
          Dataset_Name: dataItem.Dataset_Name,
          Data: []
        };
      }

      // Exclude the key from the grouped data object
      const { [key]: ignoredKey, ...restData } = dataItem;
      groupedData[keyValue].Data.push(restData);
    });

    // Convert the grouped data object to an array of objects
    const groupedDataArray = Object.values(groupedData).map(group => group);

    return groupedDataArray;
  }
  const groupedChartData = groupDataByKey(TabFilter, "Dataset_Name");


  //   {
  //     "Dataset_ID": "646f67993c12c8257b43bd2b",
  //     "Source_ID": "646f67993c14c8257b433d2b",
  //     "Dataset_Name": "Raw_Data",
  //     "Data": [
  //       {
  //         "Dataset_ID": "646f67993c12c8257b43bd2b",
  //         "Source_ID": "646f67993c14c8257b433d2b",
  //         "DataType": "Acceleration",
  //         "DataStreams": [
  //           "ACC_X",
  //           "ACC_Y",
  //           "ACC_Z"
  //         ],
  //         "Units": "mG",
  //         "Domain": "Time",
  //         "x_axis": "Epoch_Stamp_ms"
  //       },
  //       {
  //         "Dataset_ID": "646f67993c12c8257b43bd2b",
  //         "Source_ID": "646f67993c14c8257b433d2b",
  //         "DataType": "Temperature",
  //         "DataStreams": [
  //           "CTemp",
  //           "ITemp",
  //           "ETemp"
  //         ],
  //         "Units": "C",
  //         "Domain": "Time",
  //         "x_axis": "Epoch_Stamp_ms"
  //       },
  //       {
  //         "Dataset_ID": "646f67993c12c8257b43bd2b",
  //         "Source_ID": "646f67993c14c8257b433d2b",
  //         "DataType": "Pressure",
  //         "DataStreams": [
  //           "EPressure"
  //         ],
  //         "Units": "KPa",
  //         "Domain": "Time",
  //         "x_axis": "Epoch_Stamp_ms"
  //       },
  //       {
  //         "Dataset_ID": "646f67993c12c8257b43bd2b",
  //         "Source_ID": "646f67993c14c8257b433d2b",
  //         "DataType": "PPG",
  //         "DataStreams": [
  //           "PPG_Red",
  //           "PPG_IR"
  //         ],
  //         "Units": "arb",
  //         "Domain": "Time",
  //         "x_axis": "Epoch_Stamp_ms"
  //       },
  //       {
  //         "Dataset_ID": "646f67993c12c8257b43bd2b",
  //         "Source_ID": "646f67993c14c8257b433d2b",
  //         "DataType": "GSR",
  //         "DataStreams": [
  //           "GSR"
  //         ],
  //         "Units": "arb",
  //         "Domain": "Time",
  //         "x_axis": "Epoch_Stamp_ms"
  //       },
  //       {
  //         "Dataset_ID": "646f67993c12c8257b43bd2b",
  //         "Source_ID": "646f67993c14c8257b433d2b",
  //         "DataType": "ECG",
  //         "DataStreams": [
  //           "ECG"
  //         ],
  //         "Units": "arb",
  //         "Domain": "Time",
  //         "x_axis": "ECG_Timestamp_Epoch"
  //       }
  //     ]
  //   },
  //   {
  //     "Dataset_ID": "646f67993c12c8257b43bd2b",
  //     "Source_ID": "646f67993c12c8257123bd2b",
  //     "Dataset_Name": "Downsampled_Data",
  //     "Data": [
  //       {
  //         "Dataset_ID": "646f67993c12c8257b43bd2b",
  //         "Source_ID": "646f67993c12c8257123bd2b",
  //         "DataType": "ACC_10",
  //         "DataStreams": [
  //           "ACC_X_10",
  //           "ACC_Y_10",
  //           "ACC_Z_10"
  //         ],
  //         "Units": "mG",
  //         "Domain": "Time",
  //         "x_axis": "Epoch_Stamp_ms"
  //       },
  //       {
  //         "Dataset_ID": "646f67993c12c8257b43bd2b",
  //         "Source_ID": "646f67993c12c8257123bd2b",
  //         "DataType": "Temp_10",
  //         "DataStreams": [
  //           "CTemp_10",
  //           "ITemp_10",
  //           "ETemp_10"
  //         ],
  //         "Units": "C",
  //         "Domain": "Time",
  //         "x_axis": "Epoch_Stamp_ms"
  //       }
  //     ]
  //   },
  //   {
  //     "Dataset_ID": "646f67993c12c8257b43bd2b",
  //     "Source_ID": "646f67993c12c8257b43bd2b",
  //     "Dataset_Name": "Processed_CXW45",
  //     "Data": [
  //       {
  //         "Dataset_ID": "646f67993c12c8257b43bd2b",
  //         "Source_ID": "646f67993c12c8257b43bd2b",
  //         "DataType": "R1234",
  //         "DataStreams": [
  //           "R1",
  //           "R2",
  //           "R3"
  //         ],
  //         "Units": "mG",
  //         "Domain": "Time",
  //         "x_axis": "Epoch_Stamp_ms"
  //       },
  //       {
  //         "Dataset_ID": "646f67993c12c8257b43bd2b",
  //         "Source_ID": "646f67993c12c8257b43bd2b",
  //         "DataType": "PT234",
  //         "DataStreams": [
  //           "T123",
  //           "T6578",
  //           "T9747"
  //         ],
  //         "Units": "C",
  //         "Domain": "Time",
  //         "x_axis": "Epoch_Stamp_ms"
  //       }
  //     ]
  //   }
  // ];




  // ////////////////////////////////////

  // to make a get request to the api endpoint
  const fetchData = (datasetId) => {
    const DatasetID = datasetId
    const AccessToken = streamInfo?.AccessToken
    const DataFormat = "csv"
    const ViewURL = streamInfo?.ViewURL
    const apiUrl = ViewURL;
    setLoader(true);
    // Making the GET request with Axios
    axios.get(apiUrl, {
      headers: {
        'DataFormat': DataFormat,
        'DatasetID': DatasetID,
        'AccessToken': AccessToken
      }
    })
      .then(response => {

        const results = Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
        });


        setDataSetChart(results.data);
        setLoader(false);
        setSuccess(true);
      })
      .catch(error => {
        setLoader(false);
      });
  };



  useEffect(() => {
    if (Markers.length) {
      const DefaultMarkerData = localStorage.getItem("Markers");
      setDefaultMarkers(JSON.parse(DefaultMarkerData))
    }
  }, [Markers]);


  const MarkersCheck = Markers2

  const TemplateFilteredData = MarkerTemplates && MarkerTemplates.filter(item2 => {
    return !MarkersCheck.some(item1 => item1.Marker_Set_Name === item2.Marker_Set_Name);
  });



  const handleTemplate = () => {
    const filterMarker = TemplateFilteredData.filter((item) => item.Marker_Set_Name == TagTemplate);
    const a = [...MarkerPlace, ...filterMarker]
    setMarkerPlace(a);
    setDeleteMarkers({})

  }

  const settings = {
    selectedColor: selectedColor,
    checkedItems: checkedItems,
    charts: ColorsCheckBoxes,
    placement: LegendPosition,
    orientation: LegendOrientation,
    chartThemes: selectedInputVlues?.chartTheme,
    TagName: selectedInputVlues?.TagName,
    // TagCount: selectedInputVlues?.TagCount,
    DataSetChart: DataSetChart,
    loader: loader,
    Markers: Markers2,
    MarkerPlace: MarkerPlace,
    viewInfo: streamInfo,
  };

  const markerCenterPosition = markerPoisition.length / 2;

  const handleClick = () => {
    setSubmitSuccess(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSubmitSuccess(false);
  };

  useEffect(() => {
    let updatedAnnotation = [];

    if (annotations.length) {
      const filterDataAnnotation = Markers2 && Markers2.map((marker) => {
        const filteredItems = annotations.filter((items) => {
          return items.labelValueProperty.split("-")[0] === marker.Marker_Set_Name;
        });

        const annotationObjects = filteredItems.map((items) => {
          const propertyName = items.labelValueProperty.split("-")[1];
          const propertyValue = items.x1;
          return { [propertyName]: propertyValue };
        });

        updatedAnnotation.push(annotationObjects);
      });

      const updatedMarkers = Markers2 && Markers2.map((marker, i) => {
        marker.Markers = updatedAnnotation[i];
        return marker;
      });

      let updatedAnnotationTemplate = [];

      const filterDataAnnotationTemplate = MarkerPlace.map((marker) => {
        const filteredItems = annotations.filter((items) => {
          return items.labelValueProperty.split("-")[0] === marker.Marker_Set_Name;
        });

        const annotationObjects = filteredItems.map((items) => {
          const propertyName = items.labelValueProperty.split("-")[1];
          const propertyValue = items.x1;
          return { [propertyName]: propertyValue };
        });

        updatedAnnotationTemplate.push(annotationObjects);
      });

      const apiResponse = MarkerPlace;
      const newArray = updatedAnnotationTemplate;

      function generateMarkerID() {
        return Date.now(); // You can use any method to generate a unique ID
      }

      // Extract marker tags from the API response
      const markerTags = apiResponse.reduce((acc, curr) => {
        acc.push(...curr.Marker_Tags);
        return acc;
      }, []);

      // Merge arrays based on matching keys
      const mergedArray = apiResponse.map((marker, i) => {
        const mergedMarker = {
          Markers: []
        };

        marker.Marker_Tags.forEach((tag) => {
          if (markerTags.includes(tag)) {
            const correspondingItem = newArray[i].find(item => Object.keys(item)[0] === tag);
            if (correspondingItem) {
              const key = Object.keys(correspondingItem)[0];
              const markerObject = {};
              markerObject[key] = correspondingItem[key];
              mergedMarker.Markers.push(markerObject);
            }
          }
        });
        // Create a new object without Marker_Tags property
        const { Marker_Tags, ...markerWithoutTags } = marker;
        return {
          Marker_ID: generateMarkerID(),
          ...markerWithoutTags,
          ...mergedMarker
        };
      });

      const newMergedArray = [...updatedMarkers, ...mergedArray];
      setMergedAnnotationArray(newMergedArray);
    }
    else {
      setMergedAnnotationArray([]);
    }



  }, [annotations, MarkerPlace, MarketInputValue])

  // Function to make the POST request
  const postData = async () => {
    const AccessToken = streamInfo?.AccessToken
    const ID = streamInfo?.Source_ID
    try {
      const url = 'https://api.innobetaforge.com/UploadMarkers';
      const headers = {
        'AccessToken': AccessToken,
        'ID': ID,
      };

      // Make a POST request with Axios
      const response = await axios.post(url, MergedAnnotationArray, {
        headers: headers
      });

      handleClick();
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  };



  const fetchMarkerData = async () => {
    const AccessToken = streamInfo?.AccessToken;
    const ID = streamInfo?.Source_ID;
    const apiUrl = "https://api.innobetaforge.com/GetMarkers";

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'ID': ID,
          'AccessToken': AccessToken
        }
      });

      // Check if Markers array is empty
      if (!response.data || response.data.length === 0) {
        // Retry logic (e.g., retrying after a delay)
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
        return fetchMarkerData(); // Retry fetching data
      }

      setMarkers(response.data);

      // const immutableData = List(response.data).toArray();
      localStorage.setItem("Markers", JSON.stringify(response.data));

    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    }

    const apiUrl2 = "https://api.innobetaforge.com/MarkerTemplates";
    axios.get(apiUrl2, {
      headers: {
        'ID': ID,
        'AccessToken': AccessToken
      }
    })
      .then(response => {
        setMarkerTemplates(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    if (streamInfo?.AccessToken) {
      fetchMarkerData();
    }
  }, [streamInfo]);




  useEffect(() => {
    if (AnnotationSubmit) {
      postData();
    }
  }, [AnnotationSubmit])


  // ////////////////////////////////////////////////

  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 20) - str.charCodeAt(i);
      hash = (hash * 8.3) + str.charCodeAt(i);
      hash = (hash * 113) - str.charCodeAt(i);
    }
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - color.length) + color;
  }

  function stringToColor2(str, id) {
    // Add a unique identifier to the input string
    const uniqueIdentifier = id; // Replace this with a unique identifier
    const combinedString = uniqueIdentifier + str;
    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
      const charCode = combinedString.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
    }
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - color.length) + color;
  }

  const filteredData = settings.charts?.filter((item) => checkedItems[item.DataType]);





  // ///////////////////////////////////

  // no change/////////////////

  useEffect(() => {
    // Inside your useEffect where you add annotations
    const createdAnnotations = [];
    const customTheme = {
      ...new SciChartJSLightTheme(),
      axisBandsFill: "#83D2F511",
      axisBorder: "#1F3D68",
      gridBackgroundBrush: "white",
      gridBorderBrush: "white",
      loadingAnimationForeground: "#6495ED77",
      loadingAnimationBackground: "#E4F5FC",
      majorGridLineBrush: selectedColor?.gridColor || "#264B9322",
      minorGridLineBrush: selectedColor?.gridColor || "#264B9306",
      sciChartBackground: selectedColor?.backgorundColor || "#E4F5FC",
      tickTextBrush: selectedColor?.AxisText || "#1F3D68",
      axisTitleColor: selectedColor?.AxisText || "#1F3D68",
      strokePalette: ["#264B93", "#A16DAE", "#C52E60"],
      fillPalette: ["#264B9333", "#A16DAE33", "#C52E6033"],
    };


    // ////////////////


    SciChartSurface.create(
      divElementId,
      {
        theme:
          selectedInputVlues?.chartTheme === "navy"
            ? new SciChartJsNavyTheme()
            : selectedInputVlues?.chartTheme === "dark"
              ? new SciChartJSDarkv2Theme()
              : selectedInputVlues?.chartTheme === "light"
                ? new SciChartJSLightTheme()
                : customTheme,
      }
    ).then(({ sciChartSurface, wasmContext }) => {
      // ///////////////////////////////////
      sciChartSurface.annotations.clear();
      sciChartSurface.xAxes.items = [];
      sciChartSurface.renderableSeries.clear();
      sciChartSurface.yAxes.items = [];
      sciChartSurface.chartModifiers.items = [];

      // sciChartSurface.rendered.handlers=[];
      // sciChartSurface.chartModifiers.items= [];

      surfaceRangex
        ? sciChartSurface.xAxes.add(
          new DateTimeNumericAxis(wasmContext, {
            visibleRange: new NumberRange(
              parseFloat(surfaceRangex.min),
              parseFloat(surfaceRangex.max)
            ),
            axisTitle: "Timestamp",
            drawMajorGridLines: checkedItems?.showGrid || false,
            drawMinorGridLines: checkedItems?.showGrid || false,
            drawMajorTickLines: checkedItems?.showGrid || false,
            axisAlignment: EAxisAlignment.Bottom,
          })
        )
        : sciChartSurface.xAxes.add(
          new DateTimeNumericAxis(wasmContext, {
            axisTitle: "Timestamp",
            drawMajorGridLines: checkedItems?.showGrid || false,
            drawMinorGridLines: checkedItems?.showGrid || false,
            drawMajorTickLines: checkedItems?.showGrid || false,
            axisAlignment: EAxisAlignment.Bottom,
          })
        );

      !filteredData.length &&
        sciChartSurface.yAxes.add(
          new NumericAxis(wasmContext, {
            axisAlignment: EAxisAlignment.Left,
            autoRange: checkedItems?.AutoScaleAlways
              ? EAutoRange.Always
              : EAutoRange.Once,
            growBy: new NumberRange(0.1, 0.1),
            drawMajorGridLines: checkedItems?.showGrid || false,
            drawMinorGridLines: checkedItems?.showGrid || false,
            drawMajorTickLines: checkedItems?.showGrid || false,
            maxAutoTicks: 50,
          })
        );

      checkedItems?.LayoutDefault
        ? filteredData &&
        filteredData.forEach((item, i) =>
          surfaceRange
            ? sciChartSurface.yAxes.add(
              new NumericAxis(wasmContext, {
                axisTitle: `${item.DataType}-${item.Units}`,
                id: `${i + 1}`,
                visibleRange: new NumberRange(
                  parseFloat(surfaceRange.min),
                  parseFloat(surfaceRange.max)
                ),
                autoRange: checkedItems?.AutoScaleAlways
                  ? EAutoRange.Always
                  : EAutoRange.Once,
                drawMajorGridLines: checkedItems?.showGrid || false,
                drawMinorGridLines: checkedItems?.showGrid || false,
                drawMajorTickLines: checkedItems?.showGrid || false,
                axisAlignment: i % 2 == 0
                  ? EAxisAlignment.Right
                  : EAxisAlignment.Left,
              })
            )
            : sciChartSurface.yAxes.add(
              new NumericAxis(wasmContext, {
                axisTitle: `${item.DataType}-${item.Units}`,
                id: `${i + 1}`,
                autoRange: checkedItems?.AutoScaleAlways
                  ? EAutoRange.Always
                  : EAutoRange.Once,
                drawMajorGridLines: checkedItems?.showGrid || false,
                drawMinorGridLines: checkedItems?.showGrid || false,
                drawMajorTickLines: checkedItems?.showGrid || false,
                axisAlignment: i % 2 == 0
                  ? EAxisAlignment.Right
                  : EAxisAlignment.Left,
              })
            )
        )
        : filteredData &&
        filteredData.forEach((item, i) =>
          item.DataStreams.map((items, index) =>
            sciChartSurface.yAxes.add(
              new NumericAxis(wasmContext, {
                axisTitle: `${items}`,
                axisTitleStyle: {
                  fontSize:
                    filteredData.length < 2
                      ? 18
                      : filteredData.length < 3
                        ? 14
                        : 9,
                },
                id: `${items + 1}`,
                visibleRange: new NumberRange(-1000, 1000),
                autoRange: checkedItems?.AutoScaleAlways
                  ? EAutoRange.Always
                  : EAutoRange.Once,
                growBy: new NumberRange(0.1, 0.1),
                drawMajorGridLines: checkedItems?.showGrid || false,
                drawMinorGridLines: checkedItems?.showGrid || false,
                drawMajorTickLines: checkedItems?.showGrid || false,
                axisAlignment: EAxisAlignment.Left,
              })
            )
          )
        );

      // /////////////////////

      // Marker annotation drag
      const onAnnotationDrag = (args) => {
        // Update the x position of the annotation based on the dragged position
        const updatedAnnotations = annotations.map((annotation) => {
          setcurrentDrag(args.labelValueProperty);
          if (annotation.labelValueProperty == args.labelValueProperty) {
            return {
              ...annotation,
              x1: args.x1, // Update the x position of the annotation
            };
          }
          return annotation;
        });
        setAnnotations(updatedAnnotations);
      };

      const thresholdPalette = new ThresholdPaletteProvider(
        4,
        appTheme.MutedOrange,
        200,
        appTheme.VividTeal
      );

      // Showing the Markers if checked from settings
      if (filteredData.length > 0 && checkedItems?.displayMarkers) {
        if (settings.Markers.length == NewMarkers.length) {
        } else {
          settings.Markers &&
            settings.Markers.map((item) => {
              const MarkerColor = stringToColor(item.Marker_Set_Name);
              if (DeleteMarkers[item.Marker_Set_Name]) {
              }
              else if (checkedItems[item.Marker_Set_Name]) {

              }
              else {
                item.Markers.map((marker, i) => {
                  const keys = Object.keys(marker);
                  const dynamicPropertyName = keys[0];
                  const nameWithGroup =
                    item.Marker_Set_Name + "-" + dynamicPropertyName;

                  if (MarketInputValue.hasOwnProperty(nameWithGroup)) {
                    const inputValue = MarketInputValue[nameWithGroup];
                    const inputDateAndTime =
                      inputValue.date + "T" + inputValue.time;
                    const dateTimeString = `${inputValue.date}T${inputValue.time}Z`;
                    const unixTimestamp = Math.floor(
                      new Date(dateTimeString).getTime() / 1000
                    );

                    // Update the x1 value with the time from MarketInputValue
                    const verticalLineAnnotation = new VerticalLineAnnotation({
                      x1: unixTimestamp, // Update x1 with the time value
                      strokeThickness: 3,
                      isEditable: true,
                      showLabel: true,
                      stroke: selectedColor[nameWithGroup] || MarkerColor,
                      axisLabelFill:
                        selectedColor[nameWithGroup] || MarkerColor,
                      axisLabelStroke: appTheme.ForegroundColor,
                      labelPlacement: ELabelPlacement.TopRight,
                      labelValue:
                        item.Marker_Set_Name + "-" + dynamicPropertyName,
                      onDrag: (args) => {
                        onAnnotationDrag(verticalLineAnnotation);
                        thresholdPalette.xThresholdValue =
                          verticalLineAnnotation.x1;
                        sciChartSurface.invalidateElement();
                      },
                      onDragEnded,
                    });

                    sciChartSurface.annotations.add(verticalLineAnnotation);

                    createdAnnotations.push(verticalLineAnnotation);
                  } else {
                    // No match found, create the annotation as it is

                    const verticalLineAnnotation = new VerticalLineAnnotation({
                      x1: parseFloat(marker[dynamicPropertyName]),
                      strokeThickness: 3,
                      isEditable: true,
                      showLabel: true,
                      stroke: selectedColor[nameWithGroup] || MarkerColor,
                      axisLabelFill:
                        selectedColor[nameWithGroup] || MarkerColor,
                      axisLabelStroke: appTheme.ForegroundColor,
                      labelPlacement: ELabelPlacement.TopRight,
                      labelValue:
                        item.Marker_Set_Name + "-" + dynamicPropertyName,
                      onDrag: (args) => {
                        onAnnotationDrag(verticalLineAnnotation);
                        thresholdPalette.xThresholdValue =
                          verticalLineAnnotation.x1;
                        sciChartSurface.invalidateElement();
                      },
                      onDragEnded,
                    });

                    sciChartSurface.annotations.add(verticalLineAnnotation);
                    createdAnnotations.push(verticalLineAnnotation);
                  }
                });
              }
            });
        }
      }
      // ////////////////////////////

      if (settings.MarkerPlace) {
        settings.MarkerPlace &&
          settings.MarkerPlace.map((item) => {
            const MarkerColor = stringToColor(item.Marker_Set_Name);

            if (DeleteMarkers[item.Marker_Set_Name]) {
            } else {
              item.Marker_Tags.map((marker, i) => {
                const nameWithGroup = item.Marker_Set_Name + "-" + marker;
                const keys = Object.keys(marker);
                // const dynamicPropertyName = keys[0];
                let defaultXValue;
                item.Default_Locations.map((data) => {
                  const defaultKeys = Object.keys(data);
                  const dynamicPropertyName = defaultKeys[0];

                  if (marker == dynamicPropertyName) {
                    defaultXValue = data[dynamicPropertyName];
                  }
                });

                if (MarketInputValue.hasOwnProperty(nameWithGroup)) {
                  const inputValue = MarketInputValue[nameWithGroup];
                  const inputDateAndTime =
                    inputValue.date + "T" + inputValue.time;
                  const dateTimeString = `${inputValue.date}T${inputValue.time}Z`;
                  const unixTimestamp = Math.floor(
                    new Date(dateTimeString).getTime() / 1000
                  );
                  const verticalLineAnnotation2 = new VerticalLineAnnotation({
                    x1: unixTimestamp,

                    strokeThickness: 3,
                    isEditable: true,
                    showLabel: true,
                    stroke: selectedColor[nameWithGroup] || MarkerColor,
                    axisLabelFill:
                      selectedColor[nameWithGroup] || MarkerColor,
                    axisLabelStroke: appTheme.ForegroundColor,
                    labelPlacement: ELabelPlacement.TopRight,
                    labelValue: item.Marker_Set_Name + "-" + marker,
                    onDrag: (args) => {
                      onAnnotationDrag(verticalLineAnnotation2);
                      thresholdPalette.xThresholdValue =
                        verticalLineAnnotation2.x1;
                      sciChartSurface.invalidateElement();
                    },

                    onDragEnded,
                  });
                  sciChartSurface.annotations.add(verticalLineAnnotation2);
                  createdAnnotations.push(verticalLineAnnotation2);
                } else {
                  const verticalLineAnnotation2 = new VerticalLineAnnotation({
                    x1:
                      Number(defaultXValue) + Number(minTimestamp),

                    strokeThickness: 3,
                    isEditable: true,
                    showLabel: true,
                    stroke: selectedColor[nameWithGroup] || MarkerColor,
                    axisLabelFill:
                      selectedColor[nameWithGroup] || MarkerColor,
                    axisLabelStroke: appTheme.ForegroundColor,
                    labelPlacement: ELabelPlacement.TopRight,
                    labelValue: item.Marker_Set_Name + "-" + marker,
                    onDrag: (args) => {
                      onAnnotationDrag(verticalLineAnnotation2);
                      thresholdPalette.xThresholdValue =
                        verticalLineAnnotation2.x1;
                      sciChartSurface.invalidateElement();
                    },
                    onDragEnded,
                  });
                  sciChartSurface.annotations.add(verticalLineAnnotation2);

                  createdAnnotations.push(verticalLineAnnotation2);
                }
              });
            }
          });
      }
    
      setAnnotations(createdAnnotations);
      // /////////////////////////

      // Adding the Xvalues and Yvalues based on CSV data
      filteredData &&
        filteredData.map((item, i) => {
          item.DataStreams.map((Dstream, t) => {
            const Y = [];
            const X = [];
            const name = Dstream + `${(t * 10000 * 2000 / 100)}`;
            const MarkerColor = stringToColor2(Dstream, name);

            DataSetChart.map((ChartValue, k) => {
              const TimeStampFilter = ChartValue[item.x_axis];
              if (TimeStampFilter) {
                Y.push(parseFloat(ChartValue[Dstream]));
                X.push(parseFloat(TimeStampFilter));
              }
            });

            if (X && Y) {
              setmarkerPoisition(X);
              sciChartSurface.renderableSeries.add(
                new FastLineRenderableSeries(wasmContext, {
                  yAxisId: `${(checkedItems?.LayoutDefault ? i : Dstream) + 1}`,
                  dataSeries: new XyDataSeries(wasmContext, {
                    xValues: X,
                    yValues: Y,
                  }),
                  strokeThickness: 3,
                  stroke: selectedColor[Dstream] || MarkerColor,
                })
              );
            }
          });
        });

      // Add Overview chart. This will automatically bind to the parent surface
      // displaying its series. Zooming the chart will zoom the overview and vice versa
      SciChartOverview.create(
        sciChartSurface,
        divOverviewId,
        {
          theme: settings.chartThemes == "navy"
            ? new SciChartJsNavyTheme()
            : settings.chartThemes == "dark"
              ? new SciChartJSDarkv2Theme()
              : settings.chartThemes == "light"
                ? new SciChartJSLightTheme()
                : customTheme,
        }
      );

      sciChartSurface.backgroundProperty = settings.chartThemes == "navy"
        ? "#203253"
        : settings.chartThemes == "dark"
          ? "#37373A"
          : settings.chartThemes == "light"
            ? "#f9f9f9"
            : "#E4F4Fc";

      const verticallyStacked = [
        new YAxisDragModifier(),
        new XAxisDragModifier(),
        new RubberBandXyZoomModifier({
          xyDirection: EXyDirection.XDirection,
          executeOn: EExecuteOn.MouseRightButton,
          easingFunction: easing.outExpo,
        }),
        new MouseWheelZoomModifier({ xyDirection: EXyDirection.YDirection }),
        new ZoomExtentsModifier(),
      ];

      const LayoutDefault = [
        new ZoomPanModifier({
          xyDirection: EXyDirection.XyDirection,
          enableZoom: true,
          horizontalGrowFactor: 0.005,
          verticalGrowFactor: 0.005,
        }),
        new ZoomExtentsModifier(),
        new YAxisDragModifier(),
        new XAxisDragModifier(),
        new MouseWheelZoomModifier(),
        new PinchZoomModifier({
          horizontalGrowFactor: 0.005,
          verticalGrowFactor: 0.005,
        }),
        new RubberBandXyZoomModifier({
          executeOn: EExecuteOn.MouseRightButton,
          easingFunction: easing.outExpo,
          isAnimated: true,
          animationDuration: 400,
          fill: "#FFFFFF33",
          stroke: "#FFFFFF77",
          strokeThickness: 1,
        }),
      ];
      // //////////////////////
      const layoutZoom = checkedItems?.LayoutDefault ? LayoutDefault : verticallyStacked;

      sciChartSurface.chartModifiers.add(
        ...layoutZoom,
        new LegendModifier({
          showCheckboxes: true,
          showSeriesMarkers: true,
          showLegend: true,
          placement: LegendPosition == "top-left" ? ELegendPlacement.TopLeft : LegendPosition == "top-right" ? ELegendPlacement.TopRight : LegendPosition == "bottom-left" ? ELegendPlacement.BottomLeft : ELegendPlacement.BottomRight,
          orientation: LegendOrientation == "vertical" ? ELegendOrientation.Vertical : ELegendOrientation.Horizontal,
        })
      );

      // checkedItems?.LayoutDefault ? null : sciChartSurface.layoutManager.leftOuterAxesLayoutStrategy = new LeftAlignedOuterVerticallyStackedAxisLayoutStrategy();
      // checkedItems?.LayoutDefault ? null : sciChartSurface.layoutManager.rightOuterAxesLayoutStrategy = new RightAlignedOuterVerticallyStackedAxisLayoutStrategy();
      if (!checkedItems?.LayoutDefault) {
        sciChartSurface.layoutManager.leftOuterAxesLayoutStrategy = new LeftAlignedOuterVerticallyStackedAxisLayoutStrategy();
        sciChartSurface.layoutManager.rightOuterAxesLayoutStrategy = new RightAlignedOuterVerticallyStackedAxisLayoutStrategy();
      }


      sciChartSurface.yAxes.get(0).visibleRangeChanged.subscribe((args) => {
        const min = args.visibleRange.min.toFixed(2);
        const max = args.visibleRange.max.toFixed(2);

        const message = { min, max };

        sciChartSurface.yAxes.get(0).visibleRangeProperty = new NumberRange(parseFloat(message.min), parseFloat(message.max));
        setSurfaceRange(message);
      });

      sciChartSurface.xAxes.get(0).visibleRangeChanged.subscribe((args) => {
        const min = args.visibleRange.min.toFixed(2);
        const max = args.visibleRange.max.toFixed(2);
        const message = { min, max };
        sciChartSurface.xAxes.get(0).visibleRangeProperty = new NumberRange(parseFloat(message.min), parseFloat(message.max));
        setSurfaceRangex(message);
      });

      if (SciSurface == "renderInput") {
        setSciSurface("");
        setRenderCount(9);
        if (renderCount < 10) {
          setRenderCount(prevCount => prevCount + 1);
        }
      }

    })

  }, [DataSetChart, checkedItems, selectedColor, checkedItems, settings.Markers, settings.MarkerPlace, annotations.length, TabValue, renderCount, LegendPosition, LegendOrientation, MarketInputValue, DeleteMarkers, SciSurface]);


  // no change ////////////////

  // //////////////////////////////

  // Convert and download JSON data into CSV format

  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(','));
    return `${header}\n${rows.join('\n')}`;
  };

  const downloadCSV = (data) => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Post request when template marker is removed

  const postRemoveData = (d) => {
    const data = JSON.stringify(d);

    // Function to make the POST request
    const postData = async () => {
      const AccessToken = streamInfo?.AccessToken;
      const ID = streamInfo?.Source_ID;

      try {
        const url = 'https://api.innobetaforge.com/RemoveMarker';
        const headers = {
          'AccessToken': AccessToken,
          'ID': ID,
        };

        // Make a POST request with Axios
        const response = await axios.post(url, data, {
          headers: headers
        });

        toast.success("Marker removed");

      } catch (error) {
        // Handle errors here
        console.error('Error:', error);
      }
    };

    postData();
  };

  useEffect(() => {
    if (surfaceRangex) {
      const filteredDataStreams = surfaceRangex && DataSetChart.map(stream => {
        const filteredStream = {};
        filteredData.forEach(item => {
          item.DataStreams.forEach(dataStream => {
            if (stream[dataStream] && stream[item.x_axis] && stream['Timestamp'] && (parseFloat(stream[item.x_axis]) > parseFloat(surfaceRangex.min)) && (parseFloat(stream[item.x_axis]) < parseFloat(surfaceRangex.max))) {
              filteredStream['Timestamp'] = stream['Timestamp'];
              filteredStream[item.x_axis] = stream[item.x_axis];
              filteredStream[dataStream] = stream[dataStream];
            }
          });
        });
        return filteredStream;
      }).filter(filteredStream => Object.keys(filteredStream).length > 0);
      setChartCVSDataJson(filteredDataStreams);
    }
  }, [surfaceRangex]);

  return (
    <PageRoot ref={cardRef}>
      {/* <Toaster
        position="top-center"
        reverseOrder={false}
      /> */}

      <MainContainer  >
        {/* Chart Content */}
        <LeftChartContent >
          <TabContainer>
            <Tabs
              value={TabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
              style={{
                background:"#414141",
                border:"none"
              }}
            >
              <Tab className="resFont" label="Chart" {...a11yProps(0)} />
              <Tab className="resFont" label="Data" {...a11yProps(1)} />
              <Tab className="resFont" label="Tags" {...a11yProps(2)} />
              <Tab className="resFont" label="Setting" {...a11yProps(3)} />
            </Tabs>
          </TabContainer>
       
            <CustomTabPanel onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} value={TabValue} index={0} className="tab-pannel">
              <Box id="element-to-capture" className="" >
                <Box className="chart-wrapper">
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={Submitsuccess} autoHideDuration={6000} onClose={handleClose}>
                    <Alert style={{ color: "#fff" }} onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Submit Success
                    </Alert>
                  </Snackbar>
                  <div className="chart-main-wrapper" style={{ display: "flex", flexDirection: "column", height: "94%" }}>
                    <div
                      className={`${loader ? "loading-chart" : "default-chart"} ${(DataSetChart.length && filteredData.length) ? "" : "add-data-message"}`}
                      id={divElementId}
                      style={{ flexBasis: "85%", flexGrow: 4, flexShrink: 7, }}
                    />
                    {/* <div
                    id={divOverviewId}
                    style={{
                      flexBasis: "10%",
                      height: "40px",
                      border: "1px solid #000",
                      borderRadius: "10px"
                    }}
                  /> */}
                  </div>
                </Box>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={TabValue} index={1} className="tab-pannel nopan nodrag" >
              <Box id="element-to-capture-1" className="tabData" style={{ maxHeight: `${resizeHeight}px` }}>
                <Box maxWidth="300px">
                  {groupedChartData && groupedChartData.map((items, g) => <div>
                    <Box display={"flex"} justifyContent={"space-between"} marginTop={"8"}>
                      <Box fontSize={{ xs: "14px", md: "16px" }}>
                        {items?.Dataset_Name}
                      </Box>
                      <Button onClick={() => [fetchData(items?.Dataset_ID), setDataDownloadButton(items?.Dataset_Name)]} disabled={DataDownloadButton == items?.Dataset_Name && Success} style={{ textTransform: "inherit", color: "white" }}>
                        {DataDownloadButton == items?.Dataset_Name ? Success ? "Loaded" : loader ? "Loading" : "Load Data" : "Load Data"}
                      </Button>
                    </Box>
                    {items.Data && items.Data?.map((item, i) =>
                      <Box>
                        <GroupChecks key={i} >
                          <input
                            className="nopan nodrag"
                            type="checkbox"
                            id={item.DataType}
                            checked={
                              checkedItems[item.DataType] ||
                              false
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              
                            }}
                            onChange={() =>

                              
                              handleCheckboxChange(
                                item.DataType
                              )
                            }
                          />
                          <label onClick={(e) => {
                              e.stopPropagation();
                              
                            }} htmlFor={item.DataType}>
                            <Box display="inline" fontSize={{ xs: "14px", md: "16px" }}>{item.DataType} </Box>

                            <Box fontSize={{ xs: "10px", md: "12px" }} paddingLeft={"40px"} lineHeight={'1'}>
                              {
                                item?.DataStreams.map((streamData) =>
                                  <p>{streamData}</p>
                                )
                              }
                            </Box>
                          </label>
                        </GroupChecks>
                      </Box>
                    )}
                  </div>)
                  }
                </Box>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={TabValue} index={2} className="tab-pannel">
              <div id="element-to-capture-2" className="tabTags nopan nodrag" style={{ maxHeight: `${resizeHeight}px` }}>
                <div>
                  
                  <DataInforMation>
                    <Box marginTop={1} >
                      <Box display={"flex"} gap={1} alignItems={"center"}>
                        <input
                          type="checkbox"
                          onClick={(e) => {
                            e.stopPropagation();
                            
                          }}
                          id={"displayMarkers"}
                          checked={checkedItems["displayMarkers"] || false}
                          onChange={() =>
                            handleCheckboxChange("displayMarkers")
                          }
                        />
                        <Box onClick={(e) => {
                              e.stopPropagation();
                              
                            }} component="label" fontSize={{ xs: "14px", md: "16px" }} htmlFor={"displayMarkers"}>
                          Display markers
                        </Box>
                      </Box>
                    </Box>

                    <Box marginTop={2}>
                      <Typography fontSize={{ xs: "14px", md: "16px" }}>Tag Settings</Typography>
                      {/* <Box
                      display={"flex"}
                      gap={3}
                      alignItems={"center"}
                      marginTop={2}
                    >
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Tag Template
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={TagTemplate}

                          label="Tag Settings"
                          onChange={(event) =>
                            handleMarkerInput(event)
                          }
                        >
                          {TemplateFilteredData && TemplateFilteredData.map((item) => {
                            // MarkerPlace
                            // !DeleteMarkers[item.Marker_Set_Name] && 
                            const optionsFilter = MarkerPlace && MarkerPlace.filter((items) => items.Marker_Set_Name == item.Marker_Set_Name)[0]?.Marker_Set_Name

                            if (MarkerPlace) {
                              return optionsFilter !== item.Marker_Set_Name && <MenuItem value={item.Marker_Set_Name}>{item.Marker_Set_Name}</MenuItem>
                            }
                            else {
                              return <MenuItem value={item.Marker_Set_Name}>{item.Marker_Set_Name}</MenuItem>
                            }

                          }
                          )}

                        </Select>
                      </FormControl>
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      gap={3}
                      marginTop={2}
                    >
                      <StartTag
                        onClick={() =>
                          handleTemplate()
                        }
                      >
                        Place Tag
                      </StartTag>
                      <SubmitTag onClick={() => handlerAnnotationSubmit()}>Submit Tag</SubmitTag>
                    </Box> */}
                    </Box>
                    <Box component="h4" marginTop={"15"} marginBottom="0px" fontSize={{ xs: "14px", md: "16px" }}>Marker Colours</Box>
                    <Box>
                      <DataInforMation>

                        {Markers &&
                          Markers.map((item) =>

                            item.Markers && item.Markers.length ? <div>
                              <Box display="flex" margin="0" marginY={"10px"} gap={1} alignItems={'center'} >
                                <input
                                  type="checkbox"
                                  id={item.Marker_Set_Name}
                                  checked={checkedItems[item.Marker_Set_Name] || false}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    
                                  }}
                                  onChange={() =>
                                    handleCheckboxChange(item.Marker_Set_Name)
                                  }
                                />
                                <Box onClick={(e) => {
                              e.stopPropagation();
                              
                            }} component="label" margin="0" htmlFor={item.Marker_Set_Name}>
                                  {item.Marker_Set_Name}
                                </Box>

                                {/* {confirmationStates[item.Marker_Set_Name] ? <Button
                                onClick={() => [handleDeleteMarkers(item.Marker_Set_Name)]}
                                style={{
                                  textTransform: "inherit",
                                  color: confirmationStates[item.Marker_Set_Name] ? "red" : "inherit",
                                  fontWeight: confirmationStates[item.Marker_Set_Name] ? "bold" : "normal",
                                  height: "20px"
                                }}
                              >
                                Confirm Remove
                              </Button>
                                :
                                <Button
                                  onClick={() => handleDeleteMarkersProgress(item.Marker_Set_Name)}
                                  disabled={confirmationStates[item.Marker_Set_Name]}
                                  style={{
                                    textTransform: "inherit",
                                    height: "20px",
                                    color: "#fff"
                                  }}
                                >
                                  Remove
                                </Button>} */}
                              </Box>

                              <div style={{ marginBottom: "10" }}>
                                {item.Markers.map((D) => {
                                  const keys = Object.keys(D);
                                  const dynamicPropertyName = keys[0];
                                  const nameWithGroup = item.Marker_Set_Name + '-' + dynamicPropertyName;
                                  let chartMarkerTimeStamp;
                                  MergedAnnotationArray.map((ChartMarkerValue) => {

                                    if (ChartMarkerValue.Marker_Set_Name == item.Marker_Set_Name) {
                                      ChartMarkerValue.Markers.map((UpdatedChartData) => {
                                        const Updatedkeys = Object.keys(UpdatedChartData);
                                        const UpdatedDynamicPropertyName = Updatedkeys[0];
                                        if (UpdatedDynamicPropertyName == dynamicPropertyName) {
                                          chartMarkerTimeStamp = UpdatedChartData[UpdatedDynamicPropertyName];
                                        }
                                      })
                                    }
                                  });
                                  let DefaultMarkersTimeStamp;
                                  DefaultMarkers.map((ChartMarkerValue) => {

                                    if (ChartMarkerValue.Marker_Set_Name == item.Marker_Set_Name) {
                                      ChartMarkerValue.Markers.map((UpdatedChartData) => {
                                        const Updatedkeys = Object.keys(UpdatedChartData);
                                        const UpdatedDynamicPropertyName = Updatedkeys[0];
                                        if (UpdatedDynamicPropertyName == dynamicPropertyName) {
                                          DefaultMarkersTimeStamp = UpdatedChartData[UpdatedDynamicPropertyName];
                                        }
                                      })
                                    }
                                  });

                                  const timestamp = chartMarkerTimeStamp;
                                  const timestampInMilliseconds = timestamp * 1000;
                                  // Create a new Date object
                                  const dateObject = new Date(timestampInMilliseconds);
                                  // Extract UTC date components
                                  const year = dateObject.getUTCFullYear();
                                  const month = dateObject.getUTCMonth() + 1; // Month is zero-indexed
                                  const day = dateObject.getUTCDate();
                                  // Extract UTC time components
                                  const hours = dateObject.getUTCHours();
                                  const minutes = dateObject.getUTCMinutes();
                                  const seconds = dateObject.getUTCSeconds();
                                  const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
                                  // // Create a formatted date string
                                  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

                                  // Default Time Stamps 
                                  const DefaultTimestamp = DefaultMarkersTimeStamp;
                                  const DefaultTimestampInMilliseconds = DefaultTimestamp * 1000;
                                  // Create a new Date object
                                  const DefaultDateObject = new Date(DefaultTimestampInMilliseconds);
                                  // Extract UTC date components
                                  const DefaultYear = DefaultDateObject.getUTCFullYear();
                                  const DefaultMonth = DefaultDateObject.getUTCMonth() + 1; // Month is zero-indexed
                                  const DefaultDay = DefaultDateObject.getUTCDate();
                                  // Extract UTC time components
                                  const DefaultHours = DefaultDateObject.getUTCHours();
                                  const DefaultMinutes = DefaultDateObject.getUTCMinutes();
                                  const DefaultSeconds = DefaultDateObject.getUTCSeconds();
                                  const DefaultFormattedTime = `${DefaultHours < 10 ? '0' + DefaultHours : DefaultHours}:${DefaultMinutes < 10 ? '0' + DefaultMinutes : DefaultMinutes}:${DefaultSeconds < 10 ? '0' + DefaultSeconds : DefaultSeconds}`;
                                  // // Create a formatted date string
                                  const DefaultFormattedDate = `${DefaultYear}-${DefaultMonth < 10 ? '0' + DefaultMonth : DefaultMonth}-${DefaultDay < 10 ? '0' + DefaultDay : DefaultDay}`;

                                  return (
                                    <>
                                      <Box display='flex' gap="10px">
                                        <ColorsLine
                                          key={dynamicPropertyName}
                                          onClick={() => handleColorPopup(nameWithGroup)}
                                        >
                                          <div
                                            style={{
                                              background:
                                                selectedColor[nameWithGroup] || stringToColor(item.Marker_Set_Name),
                                              height: "15px",
                                              width: "15px",
                                              cursor: "pointer",
                                            }}
                                          ></div>
                                          <Box fontSize={{ xs: "14px", md: "16px" }}>{dynamicPropertyName}</Box>

                                        </ColorsLine>
                                        {/* {formattedDate && formattedTime && <DateTimeBox>
                                        <input
                                          id={nameWithGroup + '_date'}
                                          name="date"
                                          placeholder="date"
                                          className="dateInput"
                                          type="date"
                                          value={formattedDate}

                                          onChange={(e) => handleMarkersInput(e, nameWithGroup, formattedDate, formattedTime)}
                                        />
                                        |
                                        <input
                                          id={nameWithGroup + '_time'}
                                          name="time"
                                          placeholder="date"
                                          className="timeInput"
                                          type="time"

                                          value={formattedTime}
                                          onChange={(e) => handleMarkersInput(e, nameWithGroup, formattedDate, formattedTime)}
                                        />
                                      </DateTimeBox>} */}

                                      </Box>
                                      {/* {(timestamp < minTimestamp || timestamp > maxTimestamp) &&

                                      <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <span style={{ fontSize: "12", color: "red", textAlign: "left", display: "block" }}>Selected value is out of range</span>
                                        <Button size="small" style={{
                                          color: "#ffa834",
                                          textTransform: "capitalize"
                                        }} onClick={() => {
                                          const timeTarget = {
                                            target: {
                                              value: DefaultFormattedTime,
                                              name: 'time',
                                            }
                                          }
                                          const DateTarget = {
                                            target: {
                                              value: DefaultFormattedDate,
                                              name: 'date',
                                            }
                                          }
                                          handleMarkersInput(timeTarget, nameWithGroup, DefaultFormattedDate, DefaultFormattedTime)
                                          handleMarkersInput(DateTarget, nameWithGroup, DefaultFormattedDate, DefaultFormattedTime)
                                        }}>Reset</Button>
                                      </Box>} */}
                                    </>
                                  )
                                }
                                )}
                              </div>
                            </div> : null
                          )}

                        {MergedAnnotationArray.map((templateMarker) =>
                          MarkerPlace &&
                          MarkerPlace.map((item) => {

                            return templateMarker.Marker_Set_Name == item.Marker_Set_Name && (

                              <div>
                                <Box display="flex" margin="0" alignItems={"center"} justifyContent="space-between" >
                                  <h5>
                                    {item.Marker_Set_Name}
                                  </h5>
                                  {confirmationStates[item.Marker_Set_Name] ? <Button
                                    onClick={() =>
                                      [handleDeleteMarkers(item.Marker_Set_Name),

                                      handleConfirmRemove(item.Marker_Set_Name),
                                      postRemoveData(item)
                                      ]}
                                    style={{
                                      textTransform: "inherit",
                                      color: confirmationStates[item.Marker_Set_Name] ? "red" : "inherit",
                                      fontWeight: confirmationStates[item.Marker_Set_Name] ? "bold" : "normal",
                                      height: "20px"
                                    }}
                                  >
                                    Confirm Remove
                                  </Button>
                                    :
                                    <Button
                                      onClick={() => handleDeleteMarkersProgress(item.Marker_Set_Name)}
                                      disabled={confirmationStates[item.Marker_Set_Name]}
                                      style={{
                                        textTransform: "inherit",
                                        height: "20px"
                                      }}
                                    >
                                      Remove
                                    </Button>}
                                </Box>

                                <div>
                                  {templateMarker.Markers.map((D) => {
                                    const keys = Object.keys(D);
                                    const dynamicPropertyName = keys[0];

                                    const nameWithGroup = item.Marker_Set_Name + "-" + dynamicPropertyName;
                                    let chartMarkerTimeStamp;

                                    let DefaultTimeStamp;
                                    MarkerTemplates.map((defaultLocation) => {
                                      defaultLocation.Default_Locations.map((DefaultT) => {

                                        if (item.Marker_Set_Name == defaultLocation.Marker_Set_Name) {
                                          const Defaultkeys = Object.keys(DefaultT);
                                          const DefaultPropertyName = Defaultkeys[0];
                                          DefaultTimeStamp = Number(DefaultT[DefaultPropertyName]) + Number(minTimestamp);

                                        }

                                      })
                                    });

                                    const timestamp = D[dynamicPropertyName];
                                    const timestampInMilliseconds = timestamp * 1000;
                                    // Create a new Date object
                                    const dateObject = new Date(timestampInMilliseconds);
                                    // Extract UTC date components
                                    const year = dateObject.getUTCFullYear();
                                    const month = dateObject.getUTCMonth() + 1; // Month is zero-indexed
                                    const day = dateObject.getUTCDate();
                                    // Extract UTC time components
                                    const hours = dateObject.getUTCHours();
                                    const minutes = dateObject.getUTCMinutes();
                                    const seconds = dateObject.getUTCSeconds();
                                    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
                                    // // Create a formatted date string
                                    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

                                    const DefaultTimestamp = DefaultTimeStamp;
                                    const DefaultTimestampInMilliseconds = DefaultTimestamp * 1000;
                                    // Create a new Date object
                                    const DefaultDateObject = new Date(DefaultTimestampInMilliseconds);
                                    // Extract UTC date components
                                    const DefaultYear = DefaultDateObject.getUTCFullYear();
                                    const DefaultMonth = DefaultDateObject.getUTCMonth() + 1; // Month is zero-indexed
                                    const DefaultDay = DefaultDateObject.getUTCDate();
                                    // Extract UTC time components
                                    const DefaultHours = DefaultDateObject.getUTCHours();
                                    const DefaultMinutes = DefaultDateObject.getUTCMinutes();
                                    const DefaultSeconds = DefaultDateObject.getUTCSeconds();
                                    const DefaultFormattedTime = `${DefaultHours < 10 ? '0' + DefaultHours : DefaultHours}:${DefaultMinutes < 10 ? '0' + DefaultMinutes : DefaultMinutes}:${DefaultSeconds < 10 ? '0' + DefaultSeconds : DefaultSeconds}`;
                                    // // Create a formatted date string
                                    const DefaultFormattedDate = `${DefaultYear}-${DefaultMonth < 10 ? '0' + DefaultMonth : DefaultMonth}-${DefaultDay < 10 ? '0' + DefaultDay : DefaultDay}`;


                                    return (
                                      <>
                                        <Box display='flex' gap="10px">
                                          <ColorsLine
                                            key={D}
                                            onClick={() => handleColorPopup(nameWithGroup)}
                                          >
                                            <div
                                              style={{
                                                background:
                                                  selectedColor[nameWithGroup] || stringToColor(item.Marker_Set_Name),
                                                height: "15px",
                                                width: "15px",
                                                cursor: "pointer",
                                              }}
                                            ></div>
                                            <Box>{dynamicPropertyName}</Box>
                                          </ColorsLine>
                                          {formattedDate && formattedTime && <DateTimeBox>
                                            <input
                                              id={nameWithGroup + '_date'}
                                              name="date"
                                              placeholder="date"
                                              className="dateInput"
                                              type="date"
                                              value={formattedDate}

                                              onChange={(e) => handleMarkersInput(e, nameWithGroup, formattedDate, formattedTime)}
                                            />
                                            |
                                            <input
                                              id={nameWithGroup + '_time'}
                                              name="time"
                                              placeholder="date"
                                              className="timeInput"
                                              type="time"

                                              value={formattedTime}
                                              onChange={(e) => handleMarkersInput(e, nameWithGroup, formattedDate, formattedTime)}
                                            />
                                          </DateTimeBox>
                                          }
                                        </Box>
                                        {(timestamp < minTimestamp || timestamp > maxTimestamp) &&

                                          <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <span style={{ fontSize: "12", color: "red", textAlign: "left", display: "block" }}>Selected value is out of range</span>
                                            <Button size="small" style={{
                                              color: "#ffa834",
                                              textTransform: "capitalize"
                                            }} onClick={() => {
                                              const timeTarget = {
                                                target: {
                                                  value: DefaultFormattedTime,
                                                  name: 'time',
                                                }
                                              }
                                              const DateTarget = {
                                                target: {
                                                  value: DefaultFormattedDate,
                                                  name: 'date',
                                                }
                                              }
                                              handleMarkersInput(timeTarget, nameWithGroup, DefaultFormattedDate, DefaultFormattedTime)
                                              handleMarkersInput(DateTarget, nameWithGroup, DefaultFormattedDate, DefaultFormattedTime)
                                            }}>Reset</Button>
                                          </Box>}
                                      </>
                                    )
                                  }
                                  )}
                                </div>
                              </div>
                            )
                          }
                          )
                        )}

                      </DataInforMation>
                      {selectedItem !== "backgorundColor" &&
                        selectedItem !== "gridColor" &&
                        selectedItem !== "AxisText" &&
                        displayColorPicker &&
                        selectedItem && (
                          <>
                            <Box
                              onClick={() => handleColorPopup(1)}
                              position={"fixed"}
                              left={0}
                              right={0}
                              bottom={0}
                              top={0}
                            ></Box>
                            <Box
                              position={"fixed"}
                              top={"40%"}
                              right={"370px"}
                              zIndex={19}
                            >
                              <SketchPicker
                                color={selectedColor[selectedItem]}
                                onChangeComplete={handleColorChange}
                              />
                            </Box>
                          </>
                        )}
                    </Box>
                  </DataInforMation>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={TabValue} index={3} className="tab-pannel">
              <div id="element-to-capture-3" className="tabSetting nopan nodrag" style={{ maxHeight: `${resizeHeight}px` }}>
                <Box>
                  {/* <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={Submitsuccess} autoHideDuration={6000} onClose={handleClose}>
                    <Alert style={{ color: "#fff" }} onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Submit Success
                    </Alert>
                  </Snackbar> */}
                  <Box maxWidth="300px">
                    {/* change  Line Color  */}
                    <Box fontSize={{ xs: "14px", md: "16px" }} marginTop={"10"}>Line Colours</Box>
                    <Box>
                      <DataInforMation>
                        {ColorsCheckBoxes &&
                          ColorsCheckBoxes.filter((item) => checkedItems[item.DataType] == true).map((items) =>
                            <div>
                              {items.DataStreams.map((D, j) => {
                                const name = D + `${(j * 10000 * 2000 / 100)}`
                                const MarkerColor = stringToColor2(D, name);
                                return (
                                  <ColorsLine
                                    key={D}
                                    onClick={() => handleColorPopup(D)}
                                  >
                                    <div
                                      style={{
                                        background:
                                          selectedColor[D] || MarkerColor,
                                        height: "15px",
                                        width: "15px",
                                        cursor: "pointer",
                                      }}
                                    ></div>
                                    <Box fontSize={{ xs: "14px", md: "16px" }}>{D}</Box>
                                  </ColorsLine>
                                )
                              }

                              )}
                            </div>
                          )}
                      </DataInforMation>
                      {selectedItem !== "backgorundColor" &&
                        selectedItem !== "gridColor" &&
                        selectedItem !== "AxisText" &&
                        displayColorPicker &&
                        selectedItem && (
                          <>
                            <Box
                              onClick={() => handleColorPopup(1)}
                              position={"fixed"}
                              left={0}
                              right={0}
                              bottom={0}
                              top={0}
                            ></Box>
                            <Box
                              position={"fixed"}
                              top={"40%"}
                              right={"370px"}
                              zIndex={19}
                            >
                              <SketchPicker
                                color={selectedColor[selectedItem]}
                                onChangeComplete={handleColorChange}
                              />
                            </Box>
                          </>
                        )}
                    </Box>

                    {/* Layout  */}
                    <GroupChecks>
                      <Box component='p' fontSize={{ xs: "14px", md: "16px" }}>Layout</Box>
                      <input
                        type="radio"
                        onClick={(e) => {
                          e.stopPropagation();
                          
                        }}
                        id={"LayoutDefaults"}
                        defaultChecked={checkedItems["LayoutDefault"] || false}
                        name="Layout"
                        onChange={() => handleCheckboxChange("LayoutDefault")}
                      />
                      <Box component="label" fontSize={{ xs: "14px", md: "16px" }} onClick={(e) => {
                              e.stopPropagation();
                              
                            }} htmlFor={"LayoutDefaults"}>{"Default"}</Box>
                      <input
                        name="Layout"
                        type="radio"
                        onClick={(e) => {
                          e.stopPropagation();
                          
                        }}
                        id={"LayoutStacked"}
                        defaultChecked={checkedItems["Stacked"] || false}
                        onChange={() => handleCheckboxChange("LayoutDefault")}
                      />
                      <Box component="label" fontSize={{ xs: "14px", md: "16px" }} onClick={(e) => {
                              e.stopPropagation();
                              
                            }} htmlFor={"LayoutStacked"}>{"Stacked"}</Box>
                      <p></p>
                    </GroupChecks>
                    {/* Auto Range  */}
                    <GroupChecks>
                      <Box component='p' fontSize={{ xs: "14px", md: "16px" }}>Auto Scale</Box>
                      <input
                        type="radio"
                        id={"AutoRangeOnce"}
                        onClick={(e) => {
                          e.stopPropagation();
                          
                        }}
                        // checked={checkedItems["AutoScaleOnce"] || false}
                        defaultChecked={!checkedItems["AutoScaleAlways"] || false}
                        name="AutoScale"
                        onChange={() => handleCheckboxChange("AutoScaleAlways")}
                      />
                      <Box component="label" fontSize={{ xs: "14px", md: "16px" }} onClick={(e) => {
                              e.stopPropagation();
                              
                            }} htmlFor={"AutoRangeOnce"}>{"Once"}</Box>
                      <input
                        name="AutoScale"
                        type="radio"
                        id={"AutoRangeAlways"}
                        onClick={(e) => {
                          e.stopPropagation();
                          
                        }}
                        defaultChecked={checkedItems["AutoScaleAlways"] || false}
                        // checked={checkedItems["AutoScaleAlways"] || false}
                        onChange={() => handleCheckboxChange("AutoScaleAlways")}
                      />
                      <Box component="label" fontSize={{ xs: "14px", md: "16px" }} onClick={(e) => {
                              e.stopPropagation();
                              
                            }} htmlFor={"AutoRangeAlways"}>{"Always"}</Box>
                      <p></p>
                    </GroupChecks>
                    {/* change chart grid color  */}
                    <GroupChecks>
                      <input
                        type="checkbox"
                        onClick={(e) => {
                          e.stopPropagation();
                          
                        }}
                        id={"showGrid"}
                        checked={checkedItems["showGrid"] || false}
                        onChange={() => handleCheckboxChange("showGrid")}
                      />
                      <Box component="label" fontSize={{ xs: "14px", md: "16px" }} onClick={(e) => {
                              e.stopPropagation();
                              
                            }} htmlFor={"showGrid"}>{"Show grid"}</Box>
                    </GroupChecks>
                    {/* change chart Theme  */}
                    <Box marginTop={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Chart Themes
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          className="resFont"
                          value={selectedInputVlues?.chartTheme}
                          label="Chart Themes"
                          onChange={(event) =>
                            handleChartThemes(event, "chartTheme")
                          }
                        >
                          <MenuItem className="resFont" value={"dark"}>Dark Theme</MenuItem>
                          <MenuItem value={"navy"}>Navy Theme</MenuItem>
                          <MenuItem value={"light"}>Light Theme</MenuItem>
                          <MenuItem value={"custom"}>Custom Theme</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    {selectedInputVlues?.chartTheme == "custom" && (
                      <Box marginTop={2}>
                        <Box fontSize={{ xs: "14px", md: "16px" }} >Custom Theme Colors</Box>
                        <DataInforMation>
                          <ColorsLine
                            onClick={() =>
                              handleColorPopup("backgorundColor")
                            }
                          >
                            <div
                              style={{
                                background:
                                  selectedColor["backgorundColor"] ||
                                  "#E4F5FC",
                                height: "15px",
                                width: "15px",
                                cursor: "pointer",
                              }}
                            ></div>
                            <Box fontSize={{ xs: "14px", md: "16px" }} >Background color</Box>
                          </ColorsLine>
                          <ColorsLine
                            onClick={() => handleColorPopup("gridColor")}
                          >
                            <div
                              style={{
                                background:
                                  selectedColor["gridColor"] || "#264B9322",
                                height: "15px",
                                width: "15px",
                                cursor: "pointer",
                              }}
                            ></div>
                            <Box>Grid color</Box>
                          </ColorsLine>
                          <ColorsLine
                            onClick={() => handleColorPopup("AxisText")}
                          >
                            <div
                              style={{
                                background:
                                  selectedColor["AxisText"] || "#1F3D68",
                                height: "15px",
                                width: "15px",
                                cursor: "pointer",
                              }}
                            ></div>
                            <Box fontSize={{ xs: "14px", md: "16px" }} >Axis Text color</Box>
                          </ColorsLine>
                        </DataInforMation>
                        {displayColorPicker &&
                          !ColorsCheckBoxes.includes(selectedItem) &&
                          selectedItem && (
                            <>
                              <Box
                                onClick={() => handleColorPopup(1)}
                                position={"fixed"}
                                left={0}
                                right={0}
                                bottom={0}
                                top={0}
                              ></Box>
                              <Box
                                position={"fixed"}
                                top={"50%"}
                                right={"370px"}
                                zIndex={19}
                              >
                                <SketchPicker
                                  color={selectedColor[selectedItem]}
                                  onChangeComplete={handleColorChange}
                                />
                              </Box>
                            </>
                          )}
                      </Box>
                    )}
                    {/* change legend position  */}
                    <LegendSettingsWrapper>
                      <LegendSelect>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Legend Position
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={LegendPosition}
                            label="Legend Position"
                            onChange={handleLegendPosition}
                          >
                            <MenuItem value={"top-left"}>Top-left</MenuItem>
                            <MenuItem value={"top-right"}>Top-right</MenuItem>
                            <MenuItem value={"bottom-left"}>
                              Bottom-left
                            </MenuItem>
                            <MenuItem value={"bottom-right"}>
                              Bottom-right
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </LegendSelect>
                      <LegendSelect>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Orientation
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={LegendOrientation}
                            label="Orientation"
                            onChange={handleLegendOrientation}
                          >
                            <MenuItem value={"vertical"}>Vertical</MenuItem>
                            <MenuItem value={"horizontal"}>
                              Horizontal
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </LegendSelect>
                    </LegendSettingsWrapper>
                  </Box>
                </Box>
              </div>
            </CustomTabPanel>
         



        </LeftChartContent>
        {/* Setting and sidebar */}




        {/* sidebar */}




        {/* <MobileSideBarDiv onClick={handleMobileSidebar}>
          {
            mobileSidebar ?
              <svg className="sidebarBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z" fill="rgba(240,238,238,1)"></path></svg> :
              <svg className="sidebarBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2 18H9V20H2V18ZM2 11H11V13H2V11ZM2 4H22V6H2V4ZM20.674 13.0251L21.8301 12.634L22.8301 14.366L21.914 15.1711C21.9704 15.4386 22 15.7158 22 16C22 16.2842 21.9704 16.5614 21.914 16.8289L22.8301 17.634L21.8301 19.366L20.674 18.9749C20.2635 19.3441 19.7763 19.6295 19.2391 19.8044L19 21H17L16.7609 19.8044C16.2237 19.6295 15.7365 19.3441 15.326 18.9749L14.1699 19.366L13.1699 17.634L14.086 16.8289C14.0296 16.5614 14 16.2842 14 16C14 15.7158 14.0296 15.4386 14.086 15.1711L13.1699 14.366L14.1699 12.634L15.326 13.0251C15.7365 12.6559 16.2237 12.3705 16.7609 12.1956L17 11H19L19.2391 12.1956C19.7763 12.3705 20.2635 12.6559 20.674 13.0251ZM18 18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14C16.8954 14 16 14.8954 16 16C16 17.1046 16.8954 18 18 18Z" fill="rgba(255,255,255,1)"></path></svg>
          }
        </MobileSideBarDiv> */}
      </MainContainer>
   
      {
        TabValue == 0 &&

        <Box display="flex" marginTop="-20px">
          <GreenBtn onClick={(e) => [
            e.stopPropagation(),
            downloadCSV(ChartCVSDataJson)
          ]}>

            <Box className="" width="20px" marginTop="10px">
              <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TimelineIcon"><path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"></path></svg>
            </Box>
          </GreenBtn>
          <GreenBtn onClick={(e) => [e.stopPropagation(),downloadAsPng()]}>

            <Box className="" width="20px" marginTop="10px">
              <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ImageIcon"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></svg>
            </Box>
          </GreenBtn>

        </Box>
      }
    </PageRoot>

  );
});
export default DataExplorer;
