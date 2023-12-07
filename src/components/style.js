import styled from "styled-components";

export const TabContainer = styled.div`
    margin-bottom: 10px;

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
        background :#120639;
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
export const Sidebar = styled.div`
    width:19%;
    background:  #0F1219;
    box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.07);
    max-width:250px;
    min-width:250px;

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
        max-height: 44px;
        min-height: 44px;
    }

    .sidebarScroll{
        max-height:calc(100vh - 150px);
        overflow-y:auto;
        padding-right:5px;
        overflow-x: hidden;
    @media (max-width: 1023px) {
        max-height: calc(100vh - 340px) !important;
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
export const GroupLabel = styled.div`
    margin-bottom:5px;
`

export const InputWrapper = styled.div`
    height:100%;
    border: none !important;
    margin: 20px 0;
    border-radius: 20px;
    overflow: hidden;
    padding: 0 22px;
    background-color: #1f2337;

    .MuiFormControl-root{
        width: 100%;
    }

    input{
        border: 0;
        color: #ffa834;
    }

    path{
        stroke: #ffa834;
    }

    .MuiInputBase-formControl{
        border: 0 !important;
    }

    .MuiInputBase-formControl:before{
        content: unset !important;
    }

    .MuiInput-underline:after{
        content: unset !important;
    }

    &:after {
        outline: none !important;
        border: none !important;
    }
`
export const SubCategory = styled.div`
    position: relative;
    margin: 0 6px;
    .line{
        width: 100%;
        height: 1px;
        background-color: #717371; 
        position  : absolute;
        top: 8px;
        bottom: 0;
        left: 0;
        z-index: 1;
    }
`
export const SubCategoryText = styled.div`
    width: max-content;
    text-align: center;
    font-size: 12px;
    color: #717371;
    background-color: #1F2337;
    position: relative;
    display: block;
    z-index:10 !important;
    margin: 0 auto;
    padding: 0 8px;
`