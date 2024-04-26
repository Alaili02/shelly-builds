import styled from "styled-components";
import { Fragment } from "react";
import { MaxValidPlayerLevel } from "../../../res/logic/data/CharacterData";
import { AllSuppressorKeys, selectCharacterState, selectCustomStats, setCustomStat, setPlayerCrew, setPlayerLevel, setPlayerName, setPlayerSuppressor } from "../../../store/characterSlice";
import { setToast } from "../../../store/toastSlice";
import { useAppSelector } from "../../hooks";
import NumberInput from "../NumberInput";
import Select from "react-select";
import { CustomStatKeyT } from "../../../res/logic/types/EquipmentTypes";
import { Keywords } from "../../../store/data";
import { IconSVG } from "../../../res/icon";
import { ColorValue } from "../../../res/logic/data/UIValues";
import { Input, SVGWrapper } from "../../Styles/PrimaryStyles";
import { useDispatch } from "react-redux";

const CharacterDetailsWrapper = styled.div`
    /* background-color: #444; */
    grid-row: 1/3; grid-column: 3/4;;
    width: 100%; height: 100%;
    box-sizing: border-box;
    padding: 0.5vw;
    display: grid;
    grid-template-columns: auto 50%;
    grid-template-rows: auto 1fr;
    grid-row-gap: 1vh;
    grid-column-gap: 0.5vw;
    overflow: visible;
    align-items: flex-start;
`

const DetailsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-auto-rows: auto;
    align-items: center;
    border: 0.125vw solid #DDD;
    padding: 0.5vw;
    box-sizing: border-box;
    overflow: visible;

    input {
        background-color: inherit;
        font-family: inherit;
        color: #DDD;
        font-size: 1.5vw;
        outline: none;
        border: none;
        border-bottom: 0.125vw solid #DDD;
        box-sizing: border-box;
        transition: background-color 0.1s ease, color 0.1s ease;
        padding: 0.25vw;
        &:hover {
            background-color: #DDD;
            color: #222;
        }
    }
`

const Label = styled.span`
    font-size: 1.5vw;
    color: #DDD;
    width: fit-content;
    text-align: center;
    width: 100%;
    
    `

const CustomStatWrapper = styled.div`
    grid-column: 2/3;
    grid-row: 1/3;
    /* padding: 0 0.5vw; */
    /* align-items: center; */
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    /* grid-column: 2/3;
    grid-row: 1/3; */
    /* overflow-y: scroll;
    scrollbar-width: thin;
    grid-template-columns: 2vw 1fr 30%;
    grid-auto-rows: auto; */
`

const CustomStatScrollWrapper = styled.div`
    height: 100%;
    display: grid;
    align-items: center;
    overflow-y: scroll;
    scrollbar-width: thin;
    grid-template-columns: 2vw 1fr 30%;
    grid-auto-rows: auto;
`

const CustomStatHeader = styled.h1`
    grid-column: 1/4;
    height: 2vw;
    margin-bottom: 0.25vw;
    text-shadow: none;
    font-size: 1.5vw;
    box-sizing: border-box;
    border-top: 0.125vw solid #DDD;
    border-bottom: 0.125vw solid #DDD;
`

const StatLabel = styled(Label)<{color:string}>`
    font-size: 1.5vw;
    padding: 0.4vw;
    height: 100%;
    grid-column: 2/3;
    text-align: left;
    overflow: visible;
    color: ${props => props.color};
    box-sizing: border-box;
    border-bottom: 0.125vw solid ${props => props.color};
`

const RandomStatInput = styled(Input)<{color:string}>`
    color: ${props => props.color};
    font-size: 1.5vw;
    height: 100%;
    border-bottom-color:${props => props.color};
    transition: color 0.1s ease, background-color 0.1s ease;
    &:hover {
        color: #222;
        background-color: ${props => props.color} !important;
    }
`



const IconSVGWrapper = styled(SVGWrapper)`
    & svg {
        width: 2vw; height: 2vw;
    }
`

const options = AllSuppressorKeys.map(i => ({label:i,value:i}));
const CharacterDetails = () => {
    const dispatch = useDispatch();
    const characterState = useAppSelector(selectCharacterState);
    const customStats = useAppSelector(selectCustomStats);

    const { Name, Crew, Level, Suppressor } = characterState;
    return (
        <CharacterDetailsWrapper>
            <DetailsWrapper>
                <Label>Name</Label>
                <input type="text" placeholder="optional" value={Name} onChange={(e) => dispatch(setPlayerName(e.target.value))}/>

                <Label>Crew</Label>
                <input type="text" placeholder="optional" value={Crew} onChange={(e) => dispatch(setPlayerCrew(e.target.value))}/>

                <Label>Level</Label>
                <NumberInput 
                    value={Level}
                    minValue={0}
                    maxValue={MaxValidPlayerLevel}
                    UpdateValue={(newValue: number) => {dispatch(setPlayerLevel(newValue))}}
                    ExceedMax={()=> dispatch(setToast({
                        active: true,
                        color: 'rgba(256, 150, 150, 0.4)',
                        message: `Max player level is ${MaxValidPlayerLevel}`
                    }))}
                    CustomStyle={{height:"auto", textShadow: "none", fontWeight: 500, textAlign: 'left'}} />

                <Label>Suppressor</Label>
                {/* <input type="text" placeholder="optional" value={Suppressor}/> */}
                <Select 
                    menuShouldScrollIntoView={false}
                    onChange={(entry)=>{if (entry) dispatch(setPlayerSuppressor(entry.value))}}
                    options={options}
                    value={{label:Suppressor,value:Suppressor}}
                    styles={{
                        valueContainer: (base) => ({
                            ...base,
                            padding: 0,
                            paddingLeft: "0.125vw",
                        }),
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
                            boxShadow: "none",
                            border: "none",
                            minHeight: 'unset',
                            borderBottom: "0.125vw solid #DDD",
                            ":hover": {
                                color: "#222",
                                backgroundColor: "#DDD",
                                borderBottom: "0.125vw solid #DDD",
                            }
                        }),
                        option: (base, { isFocused }) => ({
                            ...base,
                            backgroundColor: isFocused?"#333":"#DDD",
                            color: isFocused?"#DDD":"#222",
                            ":hover": {
                                color: "#DDD",
                                backgroundColor: "#333",
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
            </DetailsWrapper>

            <CustomStatWrapper>
                <CustomStatHeader>Custom Stat Input</CustomStatHeader>
                <CustomStatScrollWrapper>
                    <CustomStat stat={"Attack"} value={(customStats["Attack"]??0)} />
                    <CustomStat stat={"HP"} value={(customStats["HP"]??0)} />
                    <CustomStat stat={"HP%"} value={(customStats["HP%"]??0)} />
                    <CustomStat stat={"Resistance"} value={(customStats["Resistance"]??0)} />

                    <CustomStat stat={"Crit"} value={(customStats["Crit"]??0)} />
                    <CustomStat stat={"CritRate%"} value={(customStats["CritRate%"]??0)} />
                    <CustomStat stat={"CritDamage%"} value={(customStats["CritDamage%"]??0)} />

                    <CustomStat stat={"PurePhysicalAttack"} value={(customStats["PurePhysicalAttack"]??0)} />
                    <CustomStat stat={"PhysicalAttack%"} value={(customStats["PhysicalAttack%"]??0)} />
                    <CustomStat stat={"PhysicalDamage%"} value={(customStats["PhysicalDamage%"]??0)} />
                    <CustomStat stat={"PhysicalResistance"} value={(customStats["PhysicalResistance"]??0)} />
                    <CustomStat stat={"PhysicalResistance%"} value={(customStats["PhysicalResistance%"]??0)} />
                    <CustomStat stat={"PureFlameAttack"} value={(customStats["PureFlameAttack"]??0)} />
                    <CustomStat stat={"FlameAttack%"} value={(customStats["FlameAttack%"]??0)} />
                    <CustomStat stat={"FlameDamage%"} value={(customStats["FlameDamage%"]??0)} />
                    <CustomStat stat={"FlameResistance"} value={(customStats["FlameResistance"]??0)} />
                    <CustomStat stat={"FlameResistance%"} value={(customStats["FlameResistance%"]??0)} />

                    <CustomStat stat={"PureFrostAttack"} value={(customStats["PureFrostAttack"]??0)} />
                    <CustomStat stat={"FrostAttack%"} value={(customStats["FrostAttack%"]??0)} />
                    <CustomStat stat={"FrostDamage%"} value={(customStats["FrostDamage%"]??0)} />
                    <CustomStat stat={"FrostResistance"} value={(customStats["FrostResistance"]??0)} />
                    <CustomStat stat={"FrostResistance%"} value={(customStats["FrostResistance%"]??0)} />

                    <CustomStat stat={"PureVoltAttack"} value={(customStats["PureVoltAttack"]??0)} />
                    <CustomStat stat={"VoltAttack%"} value={(customStats["VoltAttack%"]??0)} />
                    <CustomStat stat={"VoltDamage%"} value={(customStats["VoltDamage%"]??0)} />
                    <CustomStat stat={"VoltResistance"} value={(customStats["VoltResistance"]??0)} />
                    <CustomStat stat={"VoltResistance%"} value={(customStats["VoltResistance%"]??0)} />

                    <CustomStat stat={"PureAlteredAttack"} value={(customStats["PureAlteredAttack"]??0)} />
                    <CustomStat stat={"AlteredResistance"} value={(customStats["AlteredResistance"]??0)} />
                    <CustomStat stat={"AlteredResistance%"} value={(customStats["AlteredResistance%"]??0)} />
                </CustomStatScrollWrapper>
            </CustomStatWrapper>

        </CharacterDetailsWrapper>
    );
}

const CustomStat = (props: {stat: CustomStatKeyT, value: number}) => {
    const dispatch = useDispatch();
    const HandleChange = (value: string) => {
        let actualValue = 0;
        if (value !== '') {
            let floatValue = parseFloat(value);
            if (0 <= floatValue) actualValue = floatValue;
        } 
        dispatch(setCustomStat({
            'StatKey': props.stat,
            'Value': actualValue
        }));
    }

    return (
        <>
            <IconSVGWrapper><IconSVG IconKey={props.stat} color={ColorValue[props.stat]} /></IconSVGWrapper>
            <StatLabel color={ColorValue[props.stat]}>{Keywords.English.Stat[props.stat]}</StatLabel>
            <RandomStatInput 
                type='number' value={props.value} color={ColorValue[props.stat]}
                onChange={(event) => {HandleChange(event.target.value)}} />
        </>
    );
}


export default CharacterDetails;