import styled from "styled-components";

// export const NodeWrapper = styled.div`
//     max-width: 300px;
//     width: 100%;
//     border-radius: 10px;
//     overflow: hidden;
//         h2{
//             background: #313D16;
//             /* width: 300px; */
//             margin: 0;
//             padding: 5px 12px;
//             font-size: 14px;
//         }   
        
//     .chartBox{
//         max-width: 800px !important;
//         width: 100%;
//     }
// `
export const NodeBody = styled.div`
    background: #424242;
    padding: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;

 .nodeTextField{
    background-color: #1F2337;
    color: #fff;
    border: none;
    height: 28px;
    border-radius: 4px;
    padding: 0 4px;
    outline: none;
    max-width: 167px;
    width: 100%;
    appearance: none;
 }

 .nodeTextField:focus{
    border: none;
 }

 input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
`
export const NodeTextField = styled.input`
`
export const NodeField = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    input{
        color: #fff;
        background-color: #fff;
    }
    .css-onq2f6-MuiSlider-thumb{
        color: #fff;
    }
    .css-1aycfkc-MuiSlider-root{
        color: #fff; 
    }
    .select{
        position: relative;
    }
    select{
        background-color: #1F2337;
        color: #fff;
        width: 167px;
        border: none;
        height: 28px;
        border-radius: 4px;
        padding: 0 4px;
        z-index: 10;
        position: relative;
    &:focus{
        border: none;
    }
    &:after{
        content: '';
        background-color: #FFA834;
        width: 20px;
        height: 26px;
        display: flex;
        justify-content:center ;
        align-items: center;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath d='M12 16L6 10H18L12 16Z' %3E%3C/path%3E%3C/svg%3E");
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
    }
    .css-1aycfkc-MuiSlider-root{
        color: #fff;
    }
    
}

`

export const NodeTitle = styled.p`
    font-size: 14px;
    width: 100%;
    /* background-color: #424242; */
    
`

export const NodeCheck = styled.div`
    background-color: #1F2337 !important;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 2px 4px;
    margin-bottom:1px;

    p{
        margin: 0;
    }

    input[type="checkbox"]{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: 0;
        border: 1px solid yellow !important;
        background-color: red !important;
        &:before{
            content: "";
            display: inline-block;
            border-radius: 2px;
            background: #1F2337;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 1;
            border: 1px solid #ffa834;
        }
        &:checked:before{
            content: "";
            display: inline-block;
            border-radius: 2px;
            background: #ffa834;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 1;
        }
        &:checked:after{
            content: "";
            display: inline-block;
            height: 5px;
            width: 10px;
            border-bottom: 3px solid #fff;
            border-left: 3px solid #fff;
            background: transparent;
            position: absolute;
            left: 2.5px;
            z-index: 2;
            top: 4px;
            transform: rotate(308deg);

        }
    }
`
export const InputWrapper = styled.div`
    height:100%;
    border: none !important;
    margin: 0px 0 10px;
    border-radius: 20px;
    overflow: hidden;
    padding: 0 8px;
    background-color: #1f2337;
    width: 100%;

    .MuiFormControl-root{
        width: 100%;
    }

    input{
        border: 0;
        color: #ffa834;
        background: transparent;
        padding: 4px 0;
        font-size: 14px;
    }

    & svg{
        height: 16px;
        width: 16px;
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


export const ChartDiv = styled.div`

flex: 1;
display: flex;
flex-direction: column;
min-width: 550px;
min-height: 350px;

  .react-flow__resize-control.line.top,
  .react-flow__resize-control.line.right,
  .react-flow__resize-control.line.left,
  .react-flow__resize-control.line.bottom,
  .react-flow__resize-control.handle.top.left,
  .react-flow__resize-control.handle.top.right,
  .react-flow__resize-control.handle.bottom.left
  {
    display: none !important;
  }

  .react-flow__resize-control.handle.bottom.right{
    left: 98% !important;
    top: 98% !important;
    position: absolute;
    &:after{
        content: " ";
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='12' height='12' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' transform='matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,0,0)'%3E%3Cpath d='M21 19V21H19V19H21ZM17 19V21H15V19H17ZM13 19V21H11V19H13ZM9 19V21H7V19H9ZM5 19V21H3V19H5ZM21 15V17H19V15H21ZM5 15V17H3V15H5ZM5 11V13H3V11H5ZM16 3C18.6874 3 20.8817 5.12366 20.9954 7.78322L21 8V13H19V8C19 6.40893 17.7447 5.09681 16.1756 5.00512L16 5H11V3H16ZM5 7V9H3V7H5ZM5 3V5H3V3H5ZM9 3V5H7V3H9Z' fill='%23fff'%3E%3C/path%3E%3C/svg%3E");
background-repeat: no-repeat no-repeat;
background-position: center center;
background-size: cover;
background-color: #424242;
height: 30px;
    width: 30px;
    position: absolute;
    top: -20px;
    bottom: 0;
    left: -17px;
    right: 0;
    z-index: 2;
    border-radius: 10px;
    }
  }
`

// input check-box customize. checkbox border blue and check icon also red
