import styled from "styled-components";
import WeaponData, { MaxWeaponLevel } from "../../../res/logic/data/WeaponData";
import { emptyWeaponState } from "../../../res/logic/data/WeaponStateData";
import { OutputMatrixImages } from "../../../res/matrix";
import { WeaponImages } from "../../../res/weapon";
import { selectEquippedWeaponLoadout, selectMatrixLoadoutEntry, selectMatrixLoadoutName } from "../../../store/loadoutSlice";
import { selectMatrixSetFromInventory } from "../../../store/matrixInventorySlice";
import { selectWeaponInventory, selectWeaponStats, setWeaponAscension, setWeaponLevel } from "../../../store/weaponInventorySlice";
import { MatrixSlotT, WeaponNameT, WeaponToSimulacra, WeaponStateT, SimulacraNameT } from "../../../res/logic/types/WeaponTypes";
import { useAppSelector } from "../../hooks";
import WeaponLoadoutPicker from "./WeaponLoadoutPicker";
import { IconSVG } from "../../../res/icon";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import { Keywords } from "../../../store/data";
import NumberInput from "../NumberInput";
import { setToast } from "../../../store/toastSlice";
import { useDispatch } from "react-redux";
import MatrixSet from "./MatrixSet";
import MatrixLoadoutPicker from "./MatrixLoadoutPicker";
import AdvancementStars from "../Equipment/AdvancementStars";


const WeaponEquippedWrapper = styled.div`
    width: 100%; height: 100%;
`
const Header = styled.h1`
    text-shadow: none;
    margin: 0.5vw;
    font-size: 1.5vw;
    border-bottom: 0.125vw solid #DDD;
    border-top: 0.125vw solid #DDD;
    box-sizing: border-box;
`
const WeaponItemsWrapper = styled.div`
    display: grid;
    height: fit-content;
    overflow: visible;
    padding: 0.5vw;
    grid-column-gap: 0.5vw;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100%;
`
const WeaponItemWrapper = styled.div`
    width: 100%; height: 100%;
    overflow: visible;
    display: grid;
    grid-template-columns: 1.75vw 1fr 2vw 1fr;
    grid-template-rows: 1.75vw auto auto auto auto auto;
    /* grid-auto-rows: auto; */

    /* grid-template-columns: 1.75vw 30% 2vw 1fr;
    grid-template-rows: 1fr 1fr 1fr; */

    align-content: start;
`
const WeaponItemImage = styled.img`
    /* grid-area: x; */
    grid-column: 2/3;
    grid-row: 1/5;
    box-sizing: border-box;
    width: 100%; height: 100%;
    object-fit: contain;
    overflow: visible;
    transform: scale(140%);
    pointer-events: none;
    z-index: 0;
`
const WeaponItemMatrixImg = styled.img`
    /* width: 3vw; */
    object-fit: contain;
    width: 100%; height: 100%;
    z-index: 1;
`
const WeaponItemMatrixEmpty = styled.div`
    flex-basis: 1;
    width: 100%;
`
const WeaponItemLabel = styled.span`
    font-size: 1.5vw;
    width: 100%; height: fit-content;
    align-self: center;
    /* grid-column: 2/3; */
    /* word-break: break-all; */
    color: #DDD;
    text-align: center;
`
const WeaponIconWrapper = styled(SVGWrapper)`
    height: 2vw; width: 2vw;
    align-self: center;
    & svg {}
`
const WeaponItemLevelWrapper = styled.div`
    grid-column: 3/5;
    display: grid;
    grid-template-columns: auto 1fr;
    box-sizing: border-box;
    border-bottom: 0.125vw solid #DDD;
    align-content: center;
    & input {
        transition: background-color 0.1s ease, color 0.1s ease;
    }
    & input:hover {
        color: #222;
        background-color: #DDD;
    }
`
const WeaponItemLevelSpan = styled.span`
    font-size: 1.5vw;
    height: fit-content;
`

const WeaponItem = (props: {simulacraName: SimulacraNameT, weaponName: WeaponNameT, state: WeaponStateT}) => {
    const dispatch = useDispatch();
    const weaponStats = useAppSelector(state => selectWeaponStats(state, props.simulacraName));
    const selectedEntry = useAppSelector(state => selectMatrixLoadoutEntry(state, props.state.Equips));    
    
    // const selectedEntry = {
    //     label: useAppSelector(state => selectMatrixLoadoutName(state, props.state.Equips)),
    //     value: {
    //         loadoutID: props.state.Equips,
    //         equippedBy: props.simulacraName,
    //         loadout
    //     }
    // }
    // console.log(`${props.weaponName}: ${selectedEntry.value.loadoutID}`)
    

    const HandleAdvancementChange = (v: number) => {
        if (v === props.state.AscensionLevel) dispatch(setWeaponAscension({
            simulacraName: props.simulacraName,
            ascension: 0
        }));
        else dispatch(setWeaponAscension({
            simulacraName: props.simulacraName,
            ascension: v
        }));
    }

    return (
        <WeaponItemWrapper>
            {/* <WeaponItemLabel style={{gridColumn:"2/3", height: "2vw", overflow: "hidden"}}>{Keywords.English.Weapon[props.weaponName]}</WeaponItemLabel> */}

            <AdvancementStars Active={props.state.AscensionLevel+1} Count={6} 
                CustomStyle={{gridColumn:"1/2",gridRow:"1/5", flexFlow: "row wrap", width: "100%", alignItems: "center"}}
                starSize="2vw"
                OnClick={HandleAdvancementChange}/>
            <WeaponItemImage src={WeaponImages[props.weaponName]} />

            <WeaponItemLevelWrapper>
                <WeaponItemLevelSpan>LVL</WeaponItemLevelSpan>
                <NumberInput 
                    value={props.state.Level}
                    minValue={0}
                    maxValue={MaxWeaponLevel}
                    UpdateValue={(newValue: number) => dispatch(setWeaponLevel({
                        simulacraName: props.simulacraName,
                        Level: newValue
                    }))}
                    ExceedMax={()=> dispatch(setToast({
                        active: true,
                        color: 'rgba(256, 150, 150, 0.4)',
                        message: `Max Weapon level is ${MaxWeaponLevel}`
                    }))}
                    CustomStyle={{gridColumn: "2/3", height:"100%", textShadow: "none", fontWeight: "500", fontSize: "1.5vw"}} />
            </WeaponItemLevelWrapper>

            <WeaponIconWrapper><IconSVG color="#DDD" IconKey="Attack" /></WeaponIconWrapper>
            <WeaponItemLabel>{Math.floor(weaponStats.Attack).toLocaleString('en-US', {maximumFractionDigits:0})}</WeaponItemLabel>
            
            {weaponStats.Resistance!==0?
            <>
            <WeaponIconWrapper><IconSVG color="#DDD" IconKey="Resistance" /></WeaponIconWrapper>
            <WeaponItemLabel>{Math.floor(weaponStats.Resistance).toLocaleString('en-US', {maximumFractionDigits:0})}</WeaponItemLabel>
            </>:<></>
            }
            
            <WeaponIconWrapper><IconSVG color="#DDD" IconKey="HP" /></WeaponIconWrapper>
            <WeaponItemLabel>{Math.floor(weaponStats.HP).toLocaleString('en-US', {maximumFractionDigits:0})}</WeaponItemLabel>

            {weaponStats.Crit!==0?
            <>
            <WeaponIconWrapper><IconSVG color="#DDD" IconKey="Crit" /></WeaponIconWrapper>
            <WeaponItemLabel>{Math.floor(weaponStats.Crit).toLocaleString('en-US', {maximumFractionDigits:0})}</WeaponItemLabel>
            </>:<></>
            }

            <MatrixLoadoutPicker selectedEntry={selectedEntry} simulacraName={props.simulacraName}/>
            <MatrixSet loadoutID={props.state.Equips} />

            {/* {(Object.keys(MatricesState) as MatrixSlotT[]).map((slot,i) => (MatricesState[slot].Type!=="Empty")?
                <WeaponItemMatrixImg key={slot} src={OutputMatrixImages[MatricesState[slot].Type]} />:
                <WeaponItemMatrixEmpty key={slot} />
            )} */}
        </WeaponItemWrapper>
    );
}

const WeaponEquipped = () => {
    const equippedWeaponLoadout = useAppSelector(selectEquippedWeaponLoadout);
    const weaponInventoryState = useAppSelector(selectWeaponInventory);

    return (
        <WeaponEquippedWrapper>
            <Header>Equipped</Header>
            <WeaponLoadoutPicker />
            <WeaponItemsWrapper>
                {Object.values(equippedWeaponLoadout.loadout).map((weaponName) =>
                    (weaponName !== "")?
                        <WeaponItem 
                            key={weaponName}
                            weaponName={weaponName} 
                            simulacraName={WeaponToSimulacra[weaponName]}
                            state={weaponInventoryState[WeaponToSimulacra[weaponName]]??emptyWeaponState} 
                            />:
                            <div></div>
                )}
            </WeaponItemsWrapper>
        </WeaponEquippedWrapper>
    );
}

export default WeaponEquipped;