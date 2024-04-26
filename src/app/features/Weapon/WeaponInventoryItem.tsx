import styled from "styled-components"
import { ElementImages, ResonanceImages } from "../../../res/element";
import { OutputMatrixImages } from "../../../res/matrix";
import { WeaponImages } from "../../../res/weapon";
import { Keywords } from "../../../store/data";
import { MatrixType, selectMatrixSetFromInventory } from "../../../store/matrixInventorySlice";
import { useAppSelector } from "../../hooks";
import OutputAdvancementStars from "../Output/OutputAdvancementStars";
import { MatrixSlotT, WeaponNameT, WeaponStateT, WeaponType } from "../../../res/logic/types/WeaponTypes";
import { useDispatch } from "react-redux";
import { selectMatrixLoadout, setEquippedWeapon } from "../../../store/loadoutSlice";

const WeaponItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2vw 40% auto;
    /* grid-template-columns: 12vh 2vw auto 1fr; */
    grid-template-rows: 100%;
    box-sizing: border-box;
    border-top: 0.125vw solid rgba(255, 255, 255, 0.6);
    align-items: center;
    :last-child {
        border-bottom: 0.125vw solid rgba(255, 255, 255, 0.6);
    }
`
const WeaponItemImage = styled.img`
    height: auto; width: 100%; object-fit: contain;
    box-sizing: border-box;
    `
    // margin-left: 0.5vw;
    // transition: border 0.1s ease;
    // cursor: pointer;
    // border: ${props => props.isEquipped?"0.125vw solid rgba(238, 238, 238, 1)":"0.125vw solid rgba(238, 238, 238, 0)"};
    // border-radius: 100%;
    // &:hover {
    //     border: 0.125vw solid rgba(238, 238, 238, 0.4);
    // }

const WeaponItemSpan = styled.span`
    font-size: 1vw;
    overflow: visible;
    :first-child {
        font-weight: 900;
        font-size: 1.5vw;
    }
`
// const WeaponItemTitleWrapper = styled.div`
//     height: 100%;
//     display: flex;
//     flex-flow: column nowrap;

// `
// const WeaponTagWrapper = styled.div`
//     height: 100%;
//     display: flex;
//     flex-flow: column nowrap;
//     justify-content: flex-start;
// `
const WeaponTagImg = styled.img`
    height: auto; width: 100%;
    object-fit: contain;
`

const WeaponDetailsWrapper = styled.div`
    display: grid;
    height: fit-content;
    width: 100%;
    grid-template-columns: 2vw 1fr;
    box-sizing: border-box;
    padding-left: 0.5vw;
    grid-column-gap: 0.5vw; grid-row-gap: 0.25vw;
    grid-template-rows: auto auto auto;
    justify-content: center;
    align-items: center;
    & svg {
        filter: none;
    }
`

const WeaponItemMatricesWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    flex-flow: row nowrap;
    /* margin-left: auto; */
    width: 6vw; height: 100%;
    padding-right: 0.5vw;
`
const WeaponItemMatrixImg = styled.img<{order:number}>`
    width: 3vw;
    object-fit: contain;
    width: 100%; height: 100%;
    order: ${props => props.order};
`
const WeaponItemMatrixEmpty = styled.div`
    flex-basis: 1;
    width: 100%;
`
const WeaponItemLevel = styled.span`
    font-size: 1.25vw;
    text-align: center;
`


const WeaponItem = (props: {weaponData: WeaponType, weaponState: WeaponStateT, isEquippedIndex: 0|1|2|3}) => {
    const dispatch = useDispatch();
    const { SimulacraName, Element, WeaponResonance, WeaponName } = props.weaponData;
    
    const MatrixLoadoutIDs = useAppSelector(state => selectMatrixLoadout(state, props.weaponState.Equips));
    const MatricesState = useAppSelector(state => selectMatrixSetFromInventory(state, MatrixLoadoutIDs));

    const HandleEquip = (order: 1|2|3) => {
        if (props.isEquippedIndex === order) {
            dispatch(setEquippedWeapon({
                order: order,
                weaponName: ""
            }));
        } else {
            dispatch(setEquippedWeapon({
                order: order,
                weaponName: WeaponName
            }));
        }
    }

    return (
        <WeaponItemWrapper>
            <WeaponItemImage src={WeaponImages[WeaponName]} />

            <WeaponEquipPickerWrapper>
                <WeaponEquipPick onClick={()=>HandleEquip(1)} active={props.isEquippedIndex===1}><span>1</span></WeaponEquipPick>
                <WeaponEquipPick onClick={()=>HandleEquip(2)} active={props.isEquippedIndex===2}><span>2</span></WeaponEquipPick>
                <WeaponEquipPick onClick={()=>HandleEquip(3)} active={props.isEquippedIndex===3}><span>3</span></WeaponEquipPick>
            </WeaponEquipPickerWrapper>

            <WeaponDetailsWrapper>
                <WeaponTagImg src={ElementImages[Element]} />
                <WeaponItemSpan style={{fontWeight: "900", fontSize: "1.5vw"}}>{Keywords.English.Simulacra[SimulacraName]}</WeaponItemSpan>

                <WeaponTagImg src={ResonanceImages[WeaponResonance]} />
                <WeaponItemSpan>{Keywords.English.Weapon[WeaponName]}</WeaponItemSpan>
                
                <WeaponItemLevel>{props.weaponState.Level}</WeaponItemLevel>
                <OutputAdvancementStars Active={props.weaponState.AscensionLevel+1} Count={6} CustomStyle={{margin: 0, justifyContent: "flex-start", filter: "none"}} OnClick={()=>{}} />
            </WeaponDetailsWrapper>

            <WeaponItemMatricesWrapper>
                {(Object.keys(MatricesState) as MatrixSlotT[]).map((slot,i) => (MatricesState[slot] !== undefined)?
                    <WeaponItemMatrixImg order={(i<2)?i:i===2?3:2} key={slot} src={OutputMatrixImages[(MatricesState[slot] as MatrixType).Type]} />:
                    <WeaponItemMatrixEmpty key={slot} />
                )}
            </WeaponItemMatricesWrapper>
        </WeaponItemWrapper>
    );
}

const WeaponEquipPickerWrapper = styled.div`
    width: 2vw; height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr 1fr;
`
const WeaponEquipPick = styled.div<{active:boolean}>`
    width: 100%; height: 100%;
    background-color: #444;
    opacity: ${props => props.active?"1":"0.2"};
    color: ${props => props.active?"#DDD":"#DDD"};
    font-size: 1.5vw;
    text-align: center;
    display: flex;
    place-content: center; place-items: center;
    transition: opacity 0.1s ease;
    cursor: pointer;
    &:hover {
        opacity: ${props => props.active?"1":"0.8"};
    }
`

export default WeaponItem;