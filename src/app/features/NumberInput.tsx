import styled from "styled-components";

const Input = styled.input`
    background-color: inherit;
    outline: none;
    border: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    font-family: inherit;
    color: inherit;

    padding: 0;
    margin: 0;
    width: 100%; height: 100%;

    text-align: center;
    font-size: 3vh;
    font-weight: 900;
    text-shadow: 2px 2px 2px black;
`

const NumberInput = (props: {value: number, minValue: number, maxValue: number, ExceedMax: any, UpdateValue: any, CustomStyle: any}) => {

    const HandleChange = (stringValue: string) => {
        if (stringValue === '') {
            props.UpdateValue(0);
        } else {
            let intValue = parseInt(stringValue);
            if (props.minValue <= intValue && intValue <= props.maxValue) {
                console.log(intValue);
                props.UpdateValue(intValue);
            } else props.ExceedMax();
        }
    }

    return (
        <Input type='number' style={{...props.CustomStyle}} value={props.value.toString()}
            onChange={e => HandleChange(e.target.value)} />
    );
}

export default NumberInput;