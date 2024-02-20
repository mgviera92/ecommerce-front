import styled from "styled-components"

const StyledInput = styled.input`
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: "Kanit", sans-serif;
    font-weight: 500;
    font-style: normal;

`;

export default function Input(props) {
    return <StyledInput {...props}/>
}