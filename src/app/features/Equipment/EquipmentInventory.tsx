import styled from "styled-components";
import { EquipmentImages, EquipmentSlotImages } from "../../../res/equipment";
import { AllEquipmentTypes, EquipmentKey, EquipmentPieceI, EquipmentRarityKey, StatKeyT } from "../../../res/logic/types/EquipmentTypes";
import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { addNewEquipmentPieceToArmory, selectAllEquipmentFromArmory } from "../../../store/equipmentInventorySlice";
import { IconSVG } from "../../../res/icon";
import { useDispatch } from "react-redux";
import { ReactComponent as ArrowNoBorderSVG } from "../../../res/svg/ArrowNoBorder.svg";
import { ReactComponent as AddSVG } from "../../../res/svg/Add.svg";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import SearchInput from "../Reusable/SearchInput";
import { ColorValue } from "../../../res/logic/data/UIValues";
import { EquipmentRarityPicker, EquipmentTypePicker } from "./CustomArmoryInput";
import { v4 as uuid } from "uuid";
import { selectEquippedEquipmentLoadout, setEquippedEquipmentPiece } from "../../../store/loadoutSlice";


const EquipmentInventoryWrapper = styled.div`
    height: 100%; width: 100%;
    grid-column: 1/2; grid-row: 1/3;
    display: grid;
    grid-template-rows: auto auto auto auto auto 1fr;
`

const EquipmentFilterBarWrapper = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 6vh;
    overflow: hidden;
    justify-items: center;
`

const EquipmentSlotImage = styled.img<{active:boolean}>`
    opacity: ${props => props.active?"1":"0.4"};
    filter: ${props => props.active?"drop-shadow(0 0 2px rgba(255, 255, 255, 0.6))":"none"};
    height: 100%; aspect-ratio: 1/1;
    padding: 0.125vw;
    box-sizing: border-box;
    cursor: pointer;
    transition: opacity 0.1s ease, filter 0.1s ease;
    &:hover {
        opacity: ${props => props.active?"1":"0.6"};
        filter: ${props => props.active?"drop-shadow(0 0 2px rgba(255, 255, 255, 1))":"drop-shadow(0 0 2px rgba(255, 255, 255, 0.4))"};
    }
`

const EquipmentItemsWrapper = styled.div`
    display: grid;
    overflow-y: scroll;
    scrollbar-width: thin;
    height: 100%;
    grid-auto-rows: 10vh;
`

const EquipmentItemWrapper = styled.div<{isPreview:boolean}>`
    display: grid;
    grid-template-columns: 8vh 1fr 4%;
    grid-template-rows: 100%;
    background-color: ${props => props.isPreview?"#444":"inherit"};
    box-sizing: border-box;
    border-top: 0.125vw solid rgba(255, 255, 255, 0.6);
    padding: 0.5vh;
    :last-child {
        border-bottom: 0.125vw solid rgba(255, 255, 255, 0.6);
    }
`
const EquipmentItemImage = styled.img<{equipped:boolean}>`
    height: 100%; width: auto; aspect-ratio: 1/1;
    box-sizing: border-box;
    border: ${props => props.equipped?"0.125vw solid #EEE":"0.125vw solid rgba(0,0,0,0)"};
    border-radius: 100%;
    cursor: pointer;
    transition: border 0.1s ease;
    &:hover {
        border: ${props => props.equipped?"0.125vw solid #EEE":"0.125vw solid rgba(238, 238, 238, 0.4)"};
    }
`
const EquipmentStatsWrapper = styled.div`
    display: grid;
    grid-column: 2/3;
    /* grid-template-columns: 15% 1fr 15% 1fr 15% 1fr; */
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 50% 50%;
    place-items: center;
    grid-auto-flow: column;
`
const StatSVGWrapper = styled.div`
    box-sizing: border-box;
    height: 100%; width: auto; aspect-ratio: 1/1;
`
const StatTextWrapper = styled.span<{color:string}>`
    font-size: 2.5vh;
    color: ${props => props.color};
`
const MagnifyingLensSVGWrapper = styled(SVGWrapper)`    
    padding: 20px;
    box-sizing: border-box;
    background-color: #444;
    opacity: 0.4;
    border: 0.125vw solid white;
    cursor: pointer;
    transition: opacity 0.1s ease, background-color 0.1s ease;
    &:hover {
        background-color: #666;
        opacity: 1;
    }
`

const SortBarWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 2vw 1fr auto;
    align-items: center;
    justify-content: start;
`
const SortSpan = styled.span`
    padding-left: 1vw;
    box-sizing: border-box;
    font-size: 1.25vw;
    font-family: inherit;
    line-height: inherit;
`
const SortIconSVGWrapper = styled(SVGWrapper)`
    & svg {
        width: 2vw; height: 2vw;
    }
`
const SortDirIconWrapper = styled(SVGWrapper)<{sortDirection: -1|1}>`
    transform: ${props => props.sortDirection===1?"rotate(180deg)":"none"};
    cursor: pointer;
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

const SortBar = (props: {currentStat: StatKeyT|"default", setCurrentStat: any, sortDirection: -1|1, setSortDirection: any}) => {
    return (
        <SortBarWrapper>
            <SortSpan>Sort by:</SortSpan>
            <SortIconSVGWrapper><IconSVG IconKey={props.currentStat==="default"?"Empty":props.currentStat} color="#FFF"/></SortIconSVGWrapper>
            <SearchInput CurrentStat={props.currentStat} HandleKeyChange={props.setCurrentStat}/>
            <SortDirIconWrapper onClick={() => props.setSortDirection(props.sortDirection * -1)} sortDirection={props.sortDirection}><ArrowNoBorderSVG /></SortDirIconWrapper>
        </SortBarWrapper>
    )
}

const SelectBarWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 1vh;
`
const SelectItem = styled.span<{active:boolean}>`
    margin-bottom: 0.5vw;
    font-size: 1.25vw;
    text-align: center;
    box-sizing: border-box;
    border-bottom: ${props => props.active?"0.125vw solid rgb(238, 238, 238)":"0.125vw solid rgba(238, 238, 238, 0)"};
    width: fit-content;
    cursor: pointer;
    transition: border-bottom 0.1s ease;
    &:hover {
        border-bottom: ${props => props.active?"0.125vw solid rgb(238, 238, 238)":"0.125vw solid rgba(238, 238, 238, 0.4)"};
    }
`
const SelectBar = (props: {activeSelect:number, setActiveSelect: any}) => {
    return (
        <SelectBarWrapper>
            <SelectItem active={props.activeSelect===1} onClick={() => props.setActiveSelect(1)}>Show All</SelectItem>
            <SelectItem active={props.activeSelect===2} onClick={() => props.setActiveSelect(2)}>Equipped<br />Only</SelectItem>
            <SelectItem active={props.activeSelect===3} onClick={() => props.setActiveSelect(3)}>Unequipped<br />Only</SelectItem>
        </SelectBarWrapper>
    );
}

const EquipmentStat = (props: {statKey: StatKeyT | 'Empty', value: number}) => {
    return (
        <>
            <StatSVGWrapper><IconSVG IconKey={props.statKey} color={ColorValue[props.statKey]} /></StatSVGWrapper>
            <StatTextWrapper color={ColorValue[props.statKey]}>{props.value}{props.statKey.endsWith("%")?"%":""}</StatTextWrapper>
        </>
            
    );
}
const EquipmentItem = (props: {item: EquipmentPieceI, equipped: boolean, sortBy: StatKeyT|'default', isPreview: boolean, setPreviewItemID: (arg0:{ID:string,type:(EquipmentKey|"")})=>void}) => {
    const dispatch = useDispatch();
    return (
        <EquipmentItemWrapper isPreview={props.isPreview} onClick={() => props.setPreviewItemID({ID:props.item.ID, type:props.item.EquipmentType})}>
            <EquipmentItemImage 
                src={EquipmentImages[props.item.Rarity][props.item.EquipmentType]} 
                equipped={props.equipped} 
                onClick={() => {
                    if (props.equipped) dispatch(setEquippedEquipmentPiece({
                        ID: '',
                        EquipmentType: props.item.EquipmentType
                    }));
                    else dispatch(setEquippedEquipmentPiece({
                        ID: props.item.ID,
                        EquipmentType: props.item.EquipmentType
                    }));
                } }/>
            <EquipmentStatsWrapper>
                {
                    (Object.keys(props.item.random) as (StatKeyT | 'Empty')[])
                        .sort((a,b) => (b === props.sortBy)? 1:0)
                        .map((statKey) => <EquipmentStat key={statKey} statKey={statKey} value={props.item.random[statKey]??0} />)
                }
            </EquipmentStatsWrapper>
            {/* <MagnifyingLensSVGWrapper>
                <MagnifyingLensSVG />
            </MagnifyingLensSVGWrapper> */}
        </EquipmentItemWrapper>
    );
}

const EquipmentFilterBar = (props: {slotFilter: SlotFilterT, setSlotFilter: any, activeSlotCount: number, setActiveSlotCount: any}) => {
    const slotImage = EquipmentSlotImages;

    const handleClick = (equipmentkey: EquipmentKey) => {
        if (props.activeSlotCount === 12) {
            props.setActiveSlotCount(1);
            props.setSlotFilter({
                ...AllFalseSlotFilter,
                [equipmentkey]: true
            });
        // turning off the last active slot should active everything back
        } else if (props.activeSlotCount === 1 && props.slotFilter[equipmentkey] === true) {
            props.setActiveSlotCount(12);
            props.setSlotFilter(AllTrueSlotFilter);
        // toggle
        } else {
            if (props.slotFilter[equipmentkey] === true) {
                props.setActiveSlotCount(props.activeSlotCount - 1);
                props.setSlotFilter({
                    ...props.slotFilter,
                    [equipmentkey]: false
                });
            }
            else {
                props.setActiveSlotCount(props.activeSlotCount + 1);
                props.setSlotFilter({
                    ...props.slotFilter,
                    [equipmentkey]: true
                });
            }
        }
    }

    return (
        <EquipmentFilterBarWrapper>
            {AllEquipmentTypes.map(equipmentType =>
                    <EquipmentSlotImage key={equipmentType} src={slotImage[equipmentType]} onClick={(e) => handleClick(equipmentType)} active={props.slotFilter[equipmentType]}/>
            )}
        </EquipmentFilterBarWrapper>
    );
}

const AllTrueSlotFilter = {
    "Helm": true,
    "Spaulders": true,
    "Armor": true,
    "Bracers": true,
    "Belt": true,
    "Gloves": true,
    "LegGuards": true,
    "Boots": true,
    "Engine": true,
    "Visor": true,
    "Reactor": true,
    "Exoskeleton": true,
}
const AllFalseSlotFilter = {
    "Helm": false,
    "Spaulders": false,
    "Armor": false,
    "Bracers": false,
    "Belt": false,
    "Gloves": false,
    "LegGuards": false,
    "Boots": false,
    "Engine": false,
    "Visor": false,
    "Reactor": false,
    "Exoskeleton": false,
}

const Header = styled.h1`
    text-shadow: none;
    margin: 0.5vw;
    font-size: 1.5vw;
    border-bottom: 0.125vw solid #DDD;
    border-top: 0.125vw solid #DDD;
    box-sizing: border-box;
`
type SlotFilterT = {[slot in EquipmentKey]: boolean}
const EquipmentInventory = (props: {previewItemID: string, setPreviewItemID: (arg0:{ID:string,type:(EquipmentKey|"")})=>void}) => {
    const AllEquipment = useAppSelector(selectAllEquipmentFromArmory);
    const equipmentLoadout = useAppSelector(selectEquippedEquipmentLoadout);

    const [activeSlotCount, setActiveSlotCount] = useState<number>(12);
    const [activeSelect, setActiveSelect] = useState<1|2|3>(1);
    const [sortBy, setSortBy] = useState<StatKeyT|"default">("default");
    const [sortDirection, setSortDirection] = useState<-1|1>(-1);
    const [slotFilter, setSlotFilter] = useState<SlotFilterT>(AllTrueSlotFilter);

    let filteredItems:EquipmentPieceI[] = [];

    (Object.keys(AllEquipment) as EquipmentKey[])
        .filter(equipmentKey => slotFilter[equipmentKey] == true)
        .forEach(equipmentKey => filteredItems = [...filteredItems, ...Object.values(AllEquipment[equipmentKey])])

    if (activeSelect === 2) filteredItems = filteredItems.filter(item => equipmentLoadout[item.EquipmentType] && equipmentLoadout[item.EquipmentType].ID === item.ID);
    else if (activeSelect === 3) filteredItems = filteredItems.filter(item => !equipmentLoadout[item.EquipmentType] || equipmentLoadout[item.EquipmentType].ID !== item.ID);

    if (sortBy !== "default")
        filteredItems.sort((a, b) => {
            return sortDirection * ((a.random[sortBy]??0) - (b.random[sortBy]??0))
        });


    return (
        <EquipmentInventoryWrapper>
            <Header>Equipment Inventory</Header>
            <EquipmentFilterBar slotFilter={slotFilter} setSlotFilter={setSlotFilter} activeSlotCount={activeSlotCount} setActiveSlotCount={setActiveSlotCount}/>
            <NewItemBar setPreviewItemID={props.setPreviewItemID}/>
            <SortBar currentStat={sortBy??"default"} setCurrentStat={setSortBy} sortDirection={sortDirection} setSortDirection={setSortDirection} />
            <SelectBar activeSelect={activeSelect} setActiveSelect={setActiveSelect}/>
            <EquipmentItemsWrapper>
                {filteredItems.map(item => <EquipmentItem setPreviewItemID={props.setPreviewItemID} isPreview={item.ID===props.previewItemID} key={item.ID} item={item} equipped={equipmentLoadout[item.EquipmentType]?.ID === item.ID} sortBy={sortBy} />)}
            </EquipmentItemsWrapper>
        </EquipmentInventoryWrapper>
    );
}

const NewItemBarWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    padding-bottom: 0.5vw;
    align-items: center;
    justify-content: start;
`
const AddSVGWrapper = styled(SVGWrapper)`
    margin-right: 1vw;
    cursor: pointer;
    box-sizing: border-box;
    fill: #DDD;
    transition: background-color 0.1s ease, fill 0.1s ease;
    & svg {
        width: 2vw; height: 2vw;
    }
    &:hover {
        background-color: #DDD;
    }
    &:hover path {
        fill: #333 !important;
    }
`

const NewItemBar = (props: {setPreviewItemID: (arg0:{ID:string,type:(EquipmentKey|"")})=>void}) => {
    const [equipmentType, setEquipmentType] = useState<EquipmentKey>("Helm");
    const [equipmentRarity, setEquipmentRarity] = useState<EquipmentRarityKey>("Fortress");
    const dispatch = useDispatch();

    const CreateNewItem = () => {
        const newPieceID = uuid();

        dispatch(addNewEquipmentPieceToArmory({
                'ID': newPieceID,
                'EquipmentType': equipmentType,
                'EquipmentRarity': equipmentRarity
        }));
        props.setPreviewItemID({
            'ID': newPieceID,
            'type': equipmentType,
        });
    }

    return (
        <NewItemBarWrapper>
            <SortSpan>Add new:</SortSpan>
            <EquipmentRarityPicker CustomStyle={{fontSize: "1.25vw"}} Rarity={equipmentRarity} HandleRarityChange={setEquipmentRarity}/>
            <EquipmentTypePicker CustomStyle={{fontSize: "1.25vw"}} EquipmentRarity={equipmentRarity} EquipmentType={equipmentType} HandleTypeChange={setEquipmentType}/>
            <AddSVGWrapper onClick={CreateNewItem}><AddSVG /></AddSVGWrapper>
        </NewItemBarWrapper>    
    );
}

export default EquipmentInventory;