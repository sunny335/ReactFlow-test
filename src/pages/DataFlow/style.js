import styled from "styled-components";

export const TabContainer = styled.div`
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
`

export const MainContainer = styled.div`
    display:flex;
    gap:20px;
    height:calc(100vh - 100px);
    background:#0F1219;
    padding-right: 15px;
    padding-left: 15px;

@media (max-width: 1000px) {
    height:calc(100vh - 84px);
    padding-right: 4px;
    padding-left: 4px;

    .sidebarActive{
        display: block !important;
        position: absolute;
        left: 5px;
        top: 135px;
        z-index: 1000;
        padding: 16px;
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
}
`
export const LeftChartContent = styled.div`
    width:100%;
    background:  #0F1219;
    padding: 30px;
    background-color: #1F2337;
    box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.07);
    border-radius:20px;
    flex:1;
    position: relative;
@media (max-width:1000px ) {
   padding :10px ;
}

.Panel-Buttons{
    position: absolute;
    right: 0;
    bottom: 0;
 display: flex;
 flex-direction: column;
 align-items: center;
 gap: 15px;
}
.css-19kzrtu{
    padding: 0;
}
.react-flow__controls-button{
    background-color: #272f3e !important;
    
    border: none;
}

.react-flow__controls-button svg {
    fill: #fff;
}
.react-flow__controls{
    border-radius: 10px;
    overflow: hidden;
}
`
export const SidebarLayout = styled.div`
/* width:20%; */
background:  #0F1219;
box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.07);
max-width:22%;
min-width:230px;
display: block;
@media (max-width: 1000px) {
    display: none;
}
.Mui-expanded {
    margin: 0px 0 !important;
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

.sideBarBox div[role="tabpanel"] > div{
padding: 0;
}

.sidebarScroll{
    max-height:calc(100vh - 240px);
    overflow-y:auto;
    padding-right:5px;
    overflow-x: hidden;
@media (max-width: 1023px) {
    max-height: calc(100vh - 310px) !important;
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
    .sidebarActive{
    display: block !important;
    position: absolute;
    left: 10px;
    top: 140px;
    z-index: 1000;
    
    padding: 16px;
    border-radius: 25px;
    box-shadow: -1px 1px 20px 1px #321a3d;
    & .sidebarScroll{
    max-height: calc(100vh - 200px) !important;
}
    }
}

.sideBarBox .MuiAccordion-root{
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 0px !important;
    
}
`
export const Label = styled.div`

background: #7e7e7e;
color:#fff;
padding:10px;


`

export const DataInforMation = styled.div`

padding:10px;
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
`

export const SubmitTag = styled.button`
    margin:16px 0;
    padding:10px 20px;
    cursor:pointer;
    background:#4c7a34;
    border:1px solid transparent;
    color:#fff;
    border-radius:10px;
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

export const ReactFLowWrapper = styled.div`
    height: calc(100vh - 150px);
    @media (max-width: 1000px) {
        height: calc(100vh - 100px);
    }
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
        display: block;
    }
`

export const MobileMenuBtn = styled.div`
    position: absolute;
    top: 80px;
    left: 0;
    z-index: 10;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin: 4px;
    .sidebarBtn{
        background: #3F164B;
        border-radius: 10px;
        padding: 5px;
    }

    @media (min-width: 1024px) {
        display: none;
    }
`

export const SubmitBox = styled.div`
    
    width: 400px;
    height: 50px;
    right: 10px;
    overflow: hidden;
    top: 3px;
    background-color: #424242;
    position: absolute;
    z-index: 0;
    border-radius: 100px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 30px;
    animation: slideIn 0.5s ease-in-out;
    @media (max-width: 767px) {
        width: 315px;
        gap: 10px;
    }
    .nodeTextField{
    background-color: #1F2337;
    color: #fff;
    border: none;
    height: 28px;
    border-radius: 4px;
    padding: 0 4px;
    outline: none;
    max-width: 200px;
    width: 100%;
    appearance: none;
    @media (max-width: 767px) {
        max-width: 142px;
    }
   
 }

 .nodeTextField:focus{
    border: none;
 }

 input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

/* .slideInAnimation {
  animation: slideIn 0.5s ease-in-out;
} */

@keyframes slideIn {
    from {
    width: 0px;
  }
  to {
    width: 400px;
  }
}

`


export const SaveInput = styled.div`
    width: 400px;
    overflow: hidden;
    height: 50px;
    right: 5px;
    top: 0;
    background-color: #424242;
    position: absolute;
    z-index: 0;
    border-radius: 100px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 30px;
    animation: slideIn 0.5s ease-in-out;
    @media (max-width: 767px) {
        width: 315px;
        gap: 10px;
    }
    .nodeTextField{
    background-color: #1F2337;
    color: #fff;
    border: none;
    height: 28px;
    border-radius: 4px;
    padding: 0 4px;
    outline: none;
    max-width: 210px;
    width: 100%;
    appearance: none;
    @media (max-width: 767px) {
        width: 150px;
        
    }
   
 }

 .nodeTextField:focus{
    border: none;
 }

 input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

/* .slideInAnimation {
  animation: slideIn 0.5s ease-in-out;
} */

@keyframes slideIn {
  from {
    width: 0px;
  }
  to {
    width: 400px;
  }
}

`