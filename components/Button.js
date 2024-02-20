import styled, { css } from "styled-components";


export const ButtonStyle = css`
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    border: 0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    font-family: "Kanit", sans-serif;
    font-weight: 500;
    font-style: normal;
    svg{
        height: 16px;
        margin-right: 5px;
    }
    ${props => props.block && css`
        display: block;
        width: 100%;
    `}

    ${props => props.white && !props.outline && css`
        background-color: #fff;
        color: #000;
    `}
    ${props => props.white && props.outline && css`
        background-color: transparent;  
        color: #fff;
        border: 1px solid #fff;
    `}
    ${props => props.black && !props.outline && css`
        background-color: #000;
        color: #fff;
    `}
    ${props => props.black && props.outline && css`
        background-color: transparent;
        color: #000;
        border: 1px solid #000;
    `}
    ${props => props.primary && !props.outline && css`
        background-color: #9b59b6; 
        color: #fff;
        border: 1px solid #9b59b6;
    `}
    ${props => props.primary && props.outline && css`
    background-color: transparent; 
    color: #9b59b6;
    border: 1px solid #9b59b6;
`}
    ${props => props.size === 'l' && css`
        font-size: 1.2rem;
        padding: 10px 20px;
        svg{
            height: 20px;
        }

    `}
`

const StyledButton = styled.button`
    ${ButtonStyle}
`;


export default function Button({children,...rest}) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    )
}


