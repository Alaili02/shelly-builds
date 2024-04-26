import styled from "styled-components";
import Select from "react-select";
import { SimulacraImages } from "../../../res/simulacra";
import { SimulacraNameT } from "../../../res/logic/types/WeaponTypes";
import { Keywords } from "../../../store/data";

const SplashPickWrapper = styled.div`
    width: 100%;
    grid-column: 2/3; grid-row: 1/2;
    align-self: center;
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;
    box-sizing: border-box;
    overflow: visible;
`

const Header = styled.h1`
    text-shadow: none;
    height: fit-content;
    box-sizing: border-box;
    margin-bottom: 0.5vw;
    font-size: 1.5vw; font-weight: 900;
    text-align: center;
    border-top: 0.125vw solid #DDD;
    border-bottom: 0.125vw solid #DDD;
`

const Span = styled.span`
    font-size: 1.5vw;
    /* padding: 0 0.5vw; */
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    display: block;
    margin: 0;
`


const SplashPick = (props: {
    options: {label:string,value:[SimulacraNameT, 0|1]}[], 
    CurrentImage: {label:string,value:[SimulacraNameT, 0|1]}, 
    ChangeImage: (arg0:{label:string,value:[SimulacraNameT, 0|1]})=>void
    }) => {

    return (
        <SplashPickWrapper>
            <Header>Image</Header>
            {/* <Span>Drag and Drop Image</Span> */}
            {/* <Span>Select</Span> */}
            <Select 
                menuShouldScrollIntoView={false}
                options={props.options}
                value={props.CurrentImage}
                isOptionDisabled={option => option===props.options[0]}
                onChange={(option)=>(option)?props.ChangeImage(option):false}
                styles={{
                    container: (base) => ({
                        ...base,
                        overflow: "visible",
                        fontFamily: "inherit",
                        fontSize: "1.5vw",
                        height: "100%",
                        color: "#DDD",
                    }),
                    control: (base) => ({
                        ...base,
                        borderRadius: 0,
                        backgroundColor: "inherit",
                        fontFamily: "inherit",
                        minHeight: "unset",
                        boxShadow: "none",
                        border: "none",
                        height: "100%",
                        borderBottom: "0.125vw solid #DDD",
                        ":hover": {
                            color: "#222",
                            backgroundColor: "#DDD",
                            borderBottom: "0.125vw solid #DDD",
                        },
                        "::selection": {
                            backgroundColor: "red"
                        }
                    }),
                    option: (base, { isFocused, isDisabled }) => ({
                        ...base,
                        backgroundColor: isDisabled?"#111":isFocused?"#333":"#DDD",
                        color: isDisabled?"#222":isFocused?"#DDD":"#222",
                        ":hover": {
                            color: isDisabled?"#222":"#DDD",
                            backgroundColor: isDisabled?"#111":"#333",
                        }
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: "inherit",
                    }),
                    input: (base) => ({
                        ...base,
                        color: "inherit"
                    }),
                    indicatorsContainer: (base) => ({
                        display: "none"
                    }),
                }}
            />
        </SplashPickWrapper>
    );
}

export default SplashPick;