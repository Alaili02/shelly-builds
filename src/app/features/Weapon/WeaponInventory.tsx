import { useState } from "react";
import styled from "styled-components";
import WeaponData from "../../../res/logic/data/WeaponData";
import { selectWeaponInventory } from "../../../store/weaponInventorySlice";
import { SimulacraNameT, WeaponElementT, WeaponResonanceT, WeaponType } from "../../../res/logic/types/WeaponTypes";
import { ReactComponent as ArrowNoBorderSVG } from "../../../res/svg/ArrowNoBorder.svg";
import WeaponFilterBar from "./WeaponFilterBar";
import WeaponItem from "./WeaponInventoryItem";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import Select from "react-select";
import { useAppSelector } from "../../hooks";
import { selectEquippedWeapons } from "../../../store/loadoutSlice";
import { emptyWeaponState } from "../../../res/logic/data/WeaponStateData";

const WeaponInventoryWrapper = styled.div`
    height: 100%; width: 100%;
    grid-column: 1/2; grid-row: 3/4;
    display: grid;
    grid-template-rows: auto 6vh auto 1fr;
`

const WeaponItemsWrapper = styled.div`
    display: grid;
    overflow-y: scroll;
    scrollbar-width: thin;
    height: 100%;
    grid-auto-rows: 6.5vw;
`


const SortBarWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    justify-content: start;
    overflow: visible;
    margin-bottom: 0.5vw;
`
const SortSpan = styled.span`
    padding-left: 1vw;
    box-sizing: border-box;
    font-size: 1.25vw;
    font-family: inherit;
    line-height: inherit;
`
const SortDirIconWrapper = styled(SVGWrapper)<{sortDirection: -1|1}>`
    transform: ${props => props.sortDirection===1?"rotate(180deg)":"none"};
    cursor: pointer;
    height: 100%;
    margin-right: 1vw;
    box-sizing: border-box;
    transition: transform 0.1s ease, background-color 0.1s ease, stroke 0.1s ease;
    & svg {
        width: 2vw; height: 2vw;
    }
    &:hover {
        background-color: #DDD;
    }
    &:hover path {
        stroke: #333 !important;
    }
`

const SortBar = (props: {sortBy: "default"|"Advancement"|"Level", setSortBy: any, sortDirection: -1|1, setSortDirection: any}) => {
    return (
        <SortBarWrapper>
            <SortSpan>Sort by:</SortSpan>
            <Select 
                onChange={(entry)=>(entry?props.setSortBy(entry.value):false)}
                options={[{label:"default",value:"default"},{label:"Advancement",value:"Advancement"},{label:"Level",value:"Level"}]}
                value={{label:props.sortBy,value:props.sortBy}}
                styles={{
                    container: (base) => ({
                        ...base,
                        overflow: "visible",
                        fontFamily: "inherit",
                        fontSize: "1.25vw",
                        height: "100%",
                        color: "#DDD",
                    }),
                    control: (base) => ({
                        ...base,
                        borderRadius: 0,
                        backgroundColor: "inherit",
                        fontFamily: "inherit",
                        boxShadow: "none",
                        minHeight: "unset",
                        border: "none",
                        height: "100%",
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
            {/* <SearchInput CurrentStat={props.currentStat} HandleKeyChange={props.setCurrentStat}/> */}
            <SortDirIconWrapper onClick={() => props.setSortDirection(props.sortDirection * -1)} sortDirection={props.sortDirection}><ArrowNoBorderSVG /></SortDirIconWrapper>
        </SortBarWrapper>
    )
}

const WeaponInventory = (props: {}) => {
    const equippedWeapons = useAppSelector(selectEquippedWeapons);
    const weaponInventoryState = useAppSelector(selectWeaponInventory);
    const [weaponElementFilter, setWeaponElementFilter] = useState<WeaponElementT>();
    const [weaponResonanceFilter, setWeaponResonanceFilter] = useState<WeaponResonanceT>();
    const [sortWeaponBy, setSortWeaponBy] = useState<"default"|"Advancement"|"Level">("default");
    const [sortWeaponByDirection, setSortWeaponByDirection] = useState<-1|1>(-1);

    let items:WeaponType[] = [];
    let filteredItems = (Object.keys(WeaponData) as SimulacraNameT[])
        .filter(simulacraKey => 
            weaponElementFilter?
                weaponResonanceFilter?
                    WeaponData[simulacraKey].Element === weaponElementFilter && WeaponData[simulacraKey].WeaponResonance === weaponResonanceFilter
                    :
                    WeaponData[simulacraKey].Element === weaponElementFilter
                :
                weaponResonanceFilter?
                    WeaponData[simulacraKey].WeaponResonance === weaponResonanceFilter
                    :
                    true
            );
    if (sortWeaponBy === "default") filteredItems.sort();
    else if (sortWeaponBy === "Advancement") filteredItems.sort((a,b) => (weaponInventoryState[b]?.AscensionLevel??0) - (weaponInventoryState[a]?.AscensionLevel??0));
    else if (sortWeaponBy === "Level") filteredItems.sort((a,b) => (weaponInventoryState[b]?.Level??0) - (weaponInventoryState[a]?.Level??0));
    if (sortWeaponByDirection===1) filteredItems.reverse();

    filteredItems.forEach(simulacraKey => items = [...items, WeaponData[simulacraKey]]);

    return (
        <WeaponInventoryWrapper>
            <WeaponFilterBar 
                weaponElementFilter={weaponElementFilter} 
                setWeaponElementFilter={setWeaponElementFilter} 
                weaponResonanceFilter={weaponResonanceFilter} 
                setWeaponResonanceFilter={setWeaponResonanceFilter}
            />
            <SortBar 
                sortBy={sortWeaponBy}
                setSortBy={setSortWeaponBy}
                sortDirection={sortWeaponByDirection}
                setSortDirection={setSortWeaponByDirection}
            />
            <WeaponItemsWrapper>
                {items.map(weaponData =>
                    <WeaponItem 
                        weaponData={weaponData}
                        weaponState={weaponInventoryState[weaponData.SimulacraName]??emptyWeaponState}
                        // isEquipped={equippedWeapons.includes(weaponData.WeaponName)}
                        isEquippedIndex={
                            equippedWeapons[1]===weaponData.WeaponName?1:
                            equippedWeapons[2]===weaponData.WeaponName?2:
                            equippedWeapons[3]===weaponData.WeaponName?3:
                            0
                        }
                        key={weaponData.WeaponName} />
                    )}
            </WeaponItemsWrapper>

        </WeaponInventoryWrapper>
    );
}


export default WeaponInventory;