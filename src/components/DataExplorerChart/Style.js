import styled from "styled-components";

export const TabContainer = styled.div`

margin-left: 100px;
button {
    flex:1 1;
    max-width:100%;
    color:#fff;
}
.css-3sx0hq-MuiTabs-indicator{
    background: none !important;
}

.MuiButtonBase-root {
    flex: 1 1;
    max-width: 100%;
    color: #fff;
    background :#181818;
    border: 1px solid black;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    
}

.MuiTabs-flexContainer button[aria-selected="true"]{
    color: #73BC53 !important;
    opacity:1 !important;
    background: #1F2C1E !important;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}


`;

export const MainContainer = styled.div`
display:flex;
gap:20px;
flex-direction: column;
flex: 1;
/* height:calc(var(--app-height) - 100px); */
/* background:#0F1219; */
/* padding-right: 15px;
padding-left: 15px; */
@media (max-width: 1000px) {
    /* height:calc(var(--app-height) - 115px); */
    padding-left: 2px;
    padding-right: 2px;
    .chart-main-wrapper{
        /* height:calc(var(--app-height) - 150px) !important;    */
    }
    .default-chart{
        /* height:calc(var(--app-height) - 200px) !important;   */
        flex: unset !important; 
    }
}


@media (max-width: 1023px) {
    .sidebar{
        display: none;
    }
    .sidebarActive{
    display: block !important;
    position: absolute;
    right: 2px;
    top: 97px;
    z-index: 1000;
    padding: 8px;
    border-radius: 25px;
    box-shadow: -1px 1px 20px 1px #321a3d;
}
   
}
.loading-chart{
    position: relative;
    
}
.loading-chart:after{
   position: absolute;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   content: "Loading...";
   text-align: center;
   justify-content: center;
   align-items: center;
   display: flex;
   margin: 0 auto;
   z-index: 100;  
}

.add-data-message{
    position: relative; 
}

.add-data-message:after{
   position: absolute;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   content: "Please load and add your desired dataset to the chart from the sidebar";
   text-align: center;
   justify-content: center;
   align-items: center;
   display: flex;
   margin: 0 auto;
   z-index: 100;  
   @media (max-width: 1000px) {
    font-size: 12px;
    margin: 0 50px;
   }
}


`
export const LeftChartContent = styled.div`
    width:100%;
    /* max-width: 500px; */
    background:  #0F1219;
    /* padding: 30px; */
    /* min-height: 400px; */
    /* max-height: 400px; */
    height: 100%;
    position: relative;
    top: -26px;
    display: flex;
flex-direction: column;
    background-color: #1F2337;
    box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.07);
    border-radius:20px;
    flex:1;
    @media (max-width: 1000px) {
        padding: 0px;

    }
    .tab-pannel{
 flex: 1;
 display: flex;
flex-direction: column;

    }
    .tab-pannel > div{
 flex: 1;
 display: flex;
flex-direction: column;

    }
    .tab-pannel > div > p{
 flex: 1;
 display: flex;
flex-direction: column;

    }
    #element-to-capture{
        flex: 1;
 display: flex;
flex-direction: column;
    }
    .chart-wrapper{
        flex: 1;
 display: flex;
flex-direction: column; 
    }
    .chart-main-wrapper{
        flex: 1;
 display: flex;
flex-direction: column;  
    }
    .tab-pannel[hidden]{
 flex: auto;
 display: flex;
flex-direction: column;
height: 0;
max-height: 0;
overflow: hidden;

    }
    /* .tab-pannel div{
 flex: 1;
 display: flex;
flex-direction: column;

    }
    .tab-pannel p{
 flex: 1;
 display: flex;
flex-direction: column;

    } */
    .resFont{
        font-size: 14px;
            @media (max-width: 1000px) {
                font-size   :12px ;
            }
    }
    #scichart-root{
        max-height: calc(var(--app-height) - 130px);
        width: 100%;
    
    }
    .css-19kzrtu{
        padding: 0;
    }
    .add-data-message{
        aspect-ratio: auto !important;
    }
    .tabData,.tabTags{
        max-height: 315px !important;
        overflow-y: auto !important;
        margin: 20px 4px 0 14px;
        &::-webkit-scrollbar{
    width:8px; 
    height: 4px;
}
&::-webkit-scrollbar-track{
    -webkit-box-shadow:inset 0 0 1px rgba(0,0,0,0.3);
    background:#ddd;
    border-radius:6px;
    
}
&::-webkit-scrollbar-thumb{
    background:#711696;
    border-radius:6px;
    outline:0px solid #fff;   
}
    }


    .tabSetting{
        
        max-height: 315px !important;
        overflow-y: auto !important;
        margin: 20px 4px 0 14px;
        &::-webkit-scrollbar{
    width:8px; 
    height: 4px;
}
&::-webkit-scrollbar-track{
    -webkit-box-shadow:inset 0 0 1px rgba(0,0,0,0.3);
    background:#ddd;
    border-radius:6px;
    
}
&::-webkit-scrollbar-thumb{
    background:#711696;
    border-radius:6px;
    outline:0px solid #fff;   
}
    
    }

`
export const Sidebar = styled.div`
    width:19%;
    background:  #0F1219;
    box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.07);
    max-width:360px;
    min-width:360px;
    @media (max-width: 1000px) {
        max-width:350px;
        min-width:350px;
    }
    .css-qoi9-MuiPaper-root-MuiAccordion-root.Mui-expanded {
        margin: 0px 0 !important;
    }
    .css-1tmu6hb-MuiButtonBase-root-MuiAccordionSummary-root{
        border-bottom: 1px solid #ddd;
        background:  #0F1219;
    }

    .MuiCollapse-vertical{}
    .MuiAccordionDetails-root{
        background-color:  #1F2237;
        border-bottom-right-radius: 18px;
    }
div[role="button"]{
    background: #3F164B;
    border: none;
    max-height: 40px;
    min-height: 40px;
    font-size: 14px !important;
}

.sidebarScroll{
    max-height:calc(var(--app-height) - 110px);
overflow-y:auto;
padding-right:5px;
overflow-x: hidden;
@media (max-width: 1023px) {
    max-height: calc(var(--app-height) - 240px) !important;
    /* max-width: 250px;
    width: 100%; */
}
&::-webkit-scrollbar{
    width:8px; 
    height: 4px;
}
&::-webkit-scrollbar-track{
    -webkit-box-shadow:inset 0 0 1px rgba(0,0,0,0.3);
    background:#ddd;
    border-radius:6px;
    
}
&::-webkit-scrollbar-thumb{
    background:#711696;
    border-radius:6px;
    outline:0px solid #fff;   
}

}




.sideBarBox{
    background: #0F1219;
    overflow: hidden;
}

.sticky-section{
    position: sticky;
    top: 0;
    z-index: 10;
}

.sideBarBox .MuiAccordion-root{
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 1px !important;
}
`
export const Label = styled.div`
background: #7e7e7e;
color:#fff;
padding:10px;

`

export const DataInforMation = styled.div`

padding:10px 5px;
width: 300px;
`

export const InformationBox = styled.div`
display: flex;
 span{
  flex: 1 1 ;
 }
`

export const GroupLabel = styled.div`
margin-bottom:5px;
`

export const GroupChecks = styled.div`

padding-left:10px;
label{
    margin-left:6px;
}

`

export const ColorsLine = styled.div`
    align-items:center;
    display:flex;
    gap:10px;
    span{
        color: white;
    }

`

export const InforMationScollBarContent = styled.div`
    max-height:200px;
    overflow-y:auto;
`

export const LegendSelect = styled.div`
    flex:1;
    margin-top:20px;
`

export const LegendSettingsWrapper = styled.div`
    display:flex;
    gap:10px;
`

export const PageRoot = styled.div`
    height:100%;
    width:100%;
    display: flex;
    flex-direction: column;
    flex: 1;
`
export const DownloadButton = styled.button`
    margin-top:16px;
    cursor:pointer;
    margin-left:20px;
    border:0;
    background:transparent;
    &:hover{
        svg{
            transform: scale(1.2);
        }
    }
    svg{
        fill: #fff;
    }
`

export const ButtonTrim = styled.button`
    margin:16px 0;
    padding:10px 20px;
    cursor:pointer;
    background:#840705;
    border:1px solid transparent;
    color:#fff;
    border-radius:10px;
`

export const StartTag = styled.button`
    margin:16px 0;
    padding:10px 20px;
    cursor:pointer;
    background:#ffa834;
    border:1px solid transparent;
    color:#fff;
    border-radius:10px;
    @media (max-width: 1000px) {
        padding: 7px 5px;
    }
`

export const SubmitTag = styled.button`
    margin:16px 0;
    padding:10px 20px;
    cursor:pointer;
    background:#4c7a34;
    border:1px solid transparent;
    color:#fff;
    border-radius:10px;
    @media (max-width: 1000px) {
        padding: 7px 5px;
    }
`
export const AccordionScrollContainer = styled.div`

`
export const OtherContent = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`


export const MobileSideBarDiv = styled.div`
    width:6%;
    display: none;
    .sidebarBtn{
        background: #3F164B;
        border-radius: 10px;
        padding: 5px;
    }
@media (max-width: 1023px) {
    width:50px;
    display: block;
    position: absolute;
    right: 2px;
    top: 45px;
}
`

export const DateTimeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #223459    ;
    border-radius: 3px;
    margin-bottom: 3px;
    width: 100%;
    font-size: 8px !important;

    .dateInput, .timeInput{
        appearance: none;
        border: none;
        background-color: transparent;         
        color: inherit;
    }    
    
    input[type="date"] {
        display:block;
        position:relative;
        padding:2px;
        max-width: 95px;
        width: 100%;
        font-size:12px;
        font-family:monospace;
        border:none;
        background:
            transparent
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='12' height='12'%3E%3Cpath d='M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z' fill='rgba(255,255,255,1)'%3E%3C/path%3E%3C/svg%3E")
            right 0
            center
            no-repeat;
            cursor:pointer;
    }

    input[type="time"] {
        display:block;
        position:relative;
        padding:2px;
        max-width: 105px;
        width: 100%;
        font-size:12px;
        font-family:monospace;
        border:none;
        background:
            transparent
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='12' height='12'%3E%3Cpath d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z' fill='rgba(255,255,255,1)'%3E%3C/path%3E%3C/svg%3E")
            right 0
            center
            no-repeat;
            cursor:pointer;
    }

    ::-webkit-datetime-edit {}
    ::-webkit-datetime-edit-fields-wrapper {}
    ::-webkit-datetime-edit-month-field:hover,
    ::-webkit-datetime-edit-day-field:hover,
    ::-webkit-datetime-edit-year-field:hover {
        background:rgba(0, 120, 250, 0.1);
    }

    ::-webkit-datetime-edit-text {
        /* opacity:0; */
    }

    ::-webkit-clear-button,
    ::-webkit-inner-spin-button {
        display:none;
    }

    ::-webkit-calendar-picker-indicator {
        position:absolute;
        width:100%;
        height:100%;
        top:0;
        right:0;
        bottom:0;
        opacity:0;
        cursor:pointer;
        color:rgba(0, 120, 250, 1);
        background:rgba(0, 120, 250, 1);
    }

    input[type="date"]:hover::-webkit-calendar-picker-indicator { 
        opacity:0.05; 
    }   

    input[type="date"]:hover::-webkit-calendar-picker-indicator:hover { 
        opacity:0.15; 
    }
    
`

export const GreenBtn = styled.div`
    border: 0;
    margin: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='CloudRoundedIcon'%3E%3Cpath d='M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z' fill='rgba(136,230,122,1)'%3E%3C/path%3E%3C/svg%3E");
background-repeat: no-repeat no-repeat;
background-position: center center;
background-size: cover;
background-size: contain;

width: 50px;
height: 40px;
display: flex;
justify-content: center;
align-items: center;

`