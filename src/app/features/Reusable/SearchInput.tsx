import styled from "styled-components";
import { useState } from "react";
import { AllStatKeys, StatKeyT } from "../../../res/logic/types/EquipmentTypes";
import { Keywords } from "../../../store/data";

const SearchInputWrapper = styled.div`height: 100%;`


const Select = styled.select`
    & {
        appearance: none;
        outline: none;
        border: none;
        font-size: 1.25vw;
        font-family: inherit;
        cursor: pointer;
        line-height: inherit;
        color: inherit;
        background-color: inherit;
        text-align: center;
        transition: all 0.2s ease;
        width: 100%; height: 100%;
        border-bottom: 0.125vw solid #EEE;
        box-sizing: border-box;
    }
    :hover {
        background-color: white;
        color: #333;
    }
    > option {
        background-color: #333;
        color: white;
    }
    > option:disabled {
        color: gray;
        background-color: #111;
    }
    > option:hover {
        background: white;
        color: #333;
    }
`

const SearchInput = (props: {CurrentStat: StatKeyT|"default", HandleKeyChange: any}) => {

    const sortedKeys = [...AllStatKeys].sort();
    const HandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.HandleKeyChange(event.target.value);
    }

    return (
        <SearchInputWrapper>
            <Select tabIndex={-1} onChange={HandleChange} value={props.CurrentStat} >
                <option key="default" value="default">default</option>
                {sortedKeys.map((statKey) => 
                    <option 
                        key={statKey} 
                        value={statKey} 
                        disabled={props.CurrentStat === statKey}>
                            {Keywords.English.Stat[statKey]}
                    </option>
                )}
            </Select>
        </SearchInputWrapper>
    )
}

export default SearchInput;