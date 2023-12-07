import styled from "styled-components";

export const HeaderLayout = styled.div`
    background-color: #0f1219;
    width:100%;
    height:80px;
    display:flex;
    align-items:center;
    padding:0 12px;
    box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.07);
    margin-bottom:1px;

    a{
        color:#fff;
        text-decoration:none;
    }

    a:hover{
    text-decoration:none; 
    }
`;
export const TextSmall = styled.div`
    text-align:right;
    margin:0;
    font-size:14px;
    color:#ffa834;
    margin-right: -65px;
`;

export const HeaderMainTitle = styled.div`
    font-size:30px;
    font-family: centuryGothic;
`
export const Line = styled.div`
    height: 6px;
    background-color: #3f164b;
    max-width: 100%;
    border-radius: 100vmax;
    margin: 0 6px;
`