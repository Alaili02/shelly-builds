import { Input } from "../../Styles/PrimaryStyles";
import { AllEquipmentTypes, AllRarities, AllStatKeys, EquipmentKey, EquipmentRarityKey, StatKeyT } from '../../../res/logic/types/EquipmentTypes';
import { Keywords } from '../../../store/data';
import styled from 'styled-components';
import { getEquipmentValidKeys } from "../../../res/logic/EquipmentLogic";
import { ColorValue } from "../../../res/logic/data/UIValues";
import SSelect, { components } from 'react-select';
import { SingleValue, StylesConfig, Theme, ThemeConfig } from "react-select/dist/declarations/src";

const Select = styled.select`
    & {
        appearance: none;
        outline: none;
        border: none;
        font-family: inherit;
        cursor: pointer;
        line-height: inherit;
        color: inherit;
        background-color: inherit;
        text-align: center;
        transition: all 0.1s ease;
        width: 100%; height: 100%;
        font-size: 1.5vw;
        box-sizing: border-box;
        border-bottom: 0.125vw solid #DDD;
    }
    :hover {
        background-color: #DDD;
        color: #333;
    }
    > option {
        background-color: #333;
        color: #DDD;
    }
    > option:disabled, > option:checked {
        color: gray;
        background-color: #111;
    }
    > option:hover {
        background: #333;
        color: #DDD ;
    }
`

const CustomSelect = styled.select<{color:string}>`
    appearance: none;
    outline: none;
    border: none;
    font-family: inherit;
    cursor: pointer;
    line-height: inherit;
    text-align: center;
    transition: color 0.1s ease, background-color 0.1s ease;
    width: 100%; height: 100%;
    font-size: 1.5vw;
    box-sizing: border-box;
    background-color: #222;
    border-bottom: 0.125vw solid ${props => props.color};
    color: ${props => props.color};
    &:hover {
        color: #333;
        background-color: ${props => props.color};
    }
    /* & > option:checked {
        color: #111 !important;
        background-color: red !important;
    } */

`
const CustomOption = styled.option<{color:string}>`
    color: #333 !important;
    background-color: ${props => props.color} !important;
    &:disabled {
        color: gray !important;
        background-color: #222 !important;
    }
    &:hover {
        color: #111 !important;
        background-color: red !important;
    }


`

export const EquipmentTypePicker = (props: {CustomStyle:any, EquipmentRarity: EquipmentRarityKey, EquipmentType: EquipmentKey, HandleTypeChange: any}) => {
    const HandleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        props.HandleTypeChange(event.target.value);
    }

    return (
        <Select style={props.CustomStyle} tabIndex={-1} onChange={HandleChange} value={props.EquipmentType}>
            {AllEquipmentTypes.map((equipmentType: EquipmentKey) => 
                <option key={equipmentType} value={equipmentType}>
                    {Keywords.English.Equipment.Type[props.EquipmentRarity][equipmentType]}
                </option>)}
        </Select>
    );
}

export const EquipmentRarityPicker = (props: {CustomStyle:any, Rarity: EquipmentRarityKey, HandleRarityChange: any}) => {
    const HandleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        props.HandleRarityChange(event.target.value);
    }

    return (
        <Select style={props.CustomStyle} tabIndex={-1} onChange={HandleChange} value={props.Rarity}>
            {AllRarities.map((rarity: EquipmentRarityKey) => <option key={rarity} value={rarity}>{Keywords.English.Equipment.Rarity[rarity]}</option>)}
        </Select>
    );
}

export const RandomEnhancementInput = (props: {
        EquipmentType:EquipmentKey, 
        RandomStat:StatKeyT|'Empty', 
        value:number, Keys:StatKeyT[], 
        HandleStatChange: any, 
        HandleKeyChange: any
    }) => {

    const options = (getEquipmentValidKeys(props.EquipmentType) as (StatKeyT|'Empty')[]).sort().map((stat) => ({value: stat, label: Keywords.English.Stat[stat]}));

    const HandleChange = (entry: SingleValue<{value:StatKeyT|'Empty', label:string}>) => {
        if (entry) props.HandleKeyChange(props.RandomStat, entry.value);
    }

    return (
        <>
            {/* <CustomSelect tabIndex={-1} onChange={HandleChange} value={props.RandomStat} color={ColorValue[props.RandomStat]}>
                {ValidKeys.map((validKey) => 
                    <CustomOption 
                        color={ColorValue[validKey]}
                        key={validKey} 
                        value={validKey} 
                        disabled={props.Keys.includes(validKey as StatKeyT) || validKey==='Empty'}>
                            {Keywords.English.Stat[validKey as StatKeyT]}
                    </CustomOption>
                )}
            </CustomSelect> */}
            <SSelect 
                onChange={HandleChange}
                value={{value:props.RandomStat as StatKeyT|'Empty', label:Keywords.English.Stat[props.RandomStat]}}
                options={options}
                isOptionDisabled={(entry) => props.Keys.includes(entry.value as StatKeyT) || entry.value==='Empty'} 
                isSearchable 
                menuShouldScrollIntoView={false}
                menuPlacement={"top"}
                styles={{
                    container: (base) => ({
                        ...base,
                    }),
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        minHeight: 'unset',
                        outline: 'none',
                        boxShadow: 'none',
                        border: 'none',
                        borderRadius: 0,
                        backgroundColor: 'inherit',
                        fontFamily: "inherit",
                        fontSize: "1.5vw",
                        borderBottom: '0.125vw solid '+ColorValue[props.RandomStat],
                        color: ColorValue[props.RandomStat],
                        ":hover": {
                            color: "#222",
                            borderColor: ColorValue[props.RandomStat],
                            backgroundColor: ColorValue[props.RandomStat],
                        }
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        padding: "0 0.125vw"
                    }),
                    singleValue:(baseStyles, state) => ({
                        ...baseStyles,
                        color: "inherit"
                    }),
                    option: (baseStyles, { data, isDisabled, isFocused, isSelected }) => ({
                        ...baseStyles,
                        fontFamily: "inherit",
                        fontSize: "1.5vw",
                        backgroundColor: isDisabled?"#111":isFocused?"#333":ColorValue[data.value as StatKeyT],
                        color: isDisabled?"#222":isFocused?ColorValue[data.value as StatKeyT]:"#333",
                        ":hover": {
                            color: isDisabled?"#222":ColorValue[data.value as StatKeyT],
                            backgroundColor: isDisabled?"#111":"#333"
                        }
                    }),
                    menuList: base => ({
                        ...base,
                        maxHeight: "50vh" // your desired height
                    }),
                    indicatorsContainer: base => ({
                        display: "none"
                    }),
                    input: (base) => ({
                        ...base,
                        color: "inherit"
                    })
                  }}
            />
            <RandomStatInput 
                type='number' value={props.value} color={ColorValue[props.RandomStat]}
                onChange={(event) => props.HandleStatChange(event.target.value, props.RandomStat)} />
        </>
    );
}

const RandomStatInput = styled(Input)<{color:string}>`
    color: ${props => props.color};
    border-bottom-color:${props => props.color};
    &:hover {
        background-color: ${props => props.color} !important;
    }
`