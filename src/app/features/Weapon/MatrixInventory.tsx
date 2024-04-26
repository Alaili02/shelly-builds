import styled from "styled-components";
import { useState } from "react";
import { AllMatrixSlots, MatrixSlotT } from "../../../res/logic/types/WeaponTypes";
import { selectEquippedWeapons } from "../../../store/loadoutSlice";
import { MatrixType, selectMatrixInventoryState } from "../../../store/matrixInventorySlice";
import { selectMatrixLoadoutIDsFromWeaponLoadout } from "../../../store/weaponInventorySlice";
import { ReactComponent as ArrowNoBorderSVG } from "../../../res/svg/ArrowNoBorder.svg";
import { useAppSelector } from "../../hooks";
import Select from "react-select";
import MatrixInventoryItem from "./MatrixInventoryItem";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import { IconSVG } from "../../../res/icon";
import AddMatrixBar from "./AddMatrixBar";

const MatrixInventoryWrapper = styled.div`
    height: 100%; width: 100%;
    grid-row: 3/4;
    display: grid;
    grid-template-rows: auto auto auto auto 1fr;
`

const MatrixItemsWrapper = styled.div`
    display: grid;
    overflow-y: scroll;
    scrollbar-width: thin;
    height: 100%;
    grid-auto-rows: 5vw;
`

const Header = styled.h1`
    text-shadow: none;
    margin: 0.5vw;
    font-size: 1.5vw;
    border-bottom: 0.125vw solid #DDD;
    border-top: 0.125vw solid #DDD;
    box-sizing: border-box;
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
            <SortDirIconWrapper onClick={() => props.setSortDirection(props.sortDirection * -1)} sortDirection={props.sortDirection}><ArrowNoBorderSVG /></SortDirIconWrapper>
        </SortBarWrapper>
    )
}


const MatrixIconSVGWrapper = styled(SVGWrapper)<{active:boolean}>`
    opacity: ${props => props.active?"1":"0.2"};
    transition: opacity 0.1s ease;
    cursor: pointer;
    &:hover {
        opacity: ${props => props.active?"1":"0.6"};
    }
    & svg {
        width: 3vw; height: 3vw;
    }
`
const SlotFilterBarWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding: 0.5vw 0;
    box-sizing: border-box;
`
const SlotFilterBar = (props: {slotFilter: MatrixSlotT|undefined, setSlotFilter: any}) => {
    return (
        <SlotFilterBarWrapper>
            {AllMatrixSlots.map(Slot => 
                <MatrixIconSVGWrapper 
                    key={Slot}
                    active={props.slotFilter===undefined||Slot===props.slotFilter} 
                    onClick={() => (props.slotFilter&&props.slotFilter===Slot)?props.setSlotFilter():props.setSlotFilter(Slot)}
                    >
                    <IconSVG IconKey={Slot} color="#EEE"/>
                </MatrixIconSVGWrapper>
                )}
        </SlotFilterBarWrapper>
    );
}

const MatrixInventory = () => {
    const [sortMatrixBy, setSortMatrixBy] = useState<"default"|"Advancement"|"Level">("default");
    const [sortMatrixByDirection, setSortMatrixByDirection] = useState<-1|1>(-1);

    const [slotFilter, setSlotFilter] = useState<MatrixSlotT>();

    const equippedWeapons = useAppSelector(selectEquippedWeapons);
    const matrixLoadoutIDs = useAppSelector(state => selectMatrixLoadoutIDsFromWeaponLoadout(state, equippedWeapons));
    const matrices = useAppSelector(selectMatrixInventoryState);

    let filteredMatrices:MatrixType[] = [];
    (Object.keys(matrices) as MatrixSlotT[]).forEach(slot => {
        if (!slotFilter || slotFilter && slot === slotFilter)
        filteredMatrices = [...filteredMatrices, ...Object.values(matrices[slot])]
    });

    if (sortMatrixBy === "default") filteredMatrices.sort();
    else if (sortMatrixBy === "Advancement") filteredMatrices.sort((a,b) => (b.Ascension??0) - (a.Ascension??0));
    else if (sortMatrixBy === "Level") filteredMatrices.sort((a,b) => (b.Level??0) - (a.Level??0));
    if (sortMatrixByDirection===1) filteredMatrices.reverse();


    return (
        <MatrixInventoryWrapper>
            <SlotFilterBar 
                slotFilter={slotFilter}
                setSlotFilter={setSlotFilter}
            />
            <AddMatrixBar />
            <SortBar 
                sortBy={sortMatrixBy}
                setSortBy={setSortMatrixBy}
                sortDirection={sortMatrixByDirection}
                setSortDirection={setSortMatrixByDirection}
            />
            <MatrixItemsWrapper>
                {filteredMatrices.map(m => <MatrixInventoryItem key={m.ID} data={m} matrixLoadoutIDs={matrixLoadoutIDs} isEquippedIndex={2}/>)}
            </MatrixItemsWrapper>
        </MatrixInventoryWrapper>
    );
}

export default MatrixInventory;