import { useDispatch } from "react-redux";
import styled from "styled-components";
import { EquipmentImages, EquipmentSlotImages } from "../../../res/equipment";
import { AllEquipmentTypes, EquipmentKey, EquipmentLoadoutT, MaxValidEnhancementLevel } from "../../../res/logic/types/EquipmentTypes";
import { setEquipmentEnhancementLevel } from "../../../store/characterSlice";
import { setToast } from "../../../store/toastSlice";
import NumberInput from "../NumberInput";
import EquipmentLoadoutPicker from "./EquipmentLoadoutPicker";

const EquipmentLoadoutWrapper = styled.div`
    width: 100%; height: fit-content;
    grid-row: 1/2; grid-column: 2/3;
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: 100%;
    align-items: flex-start;
`

const LoadoutItemsWrapper = styled.div`
    display: grid;
    width: 100%; height: 100%;
    grid-row: 3/4;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, auto);
    grid-column-gap: 1vw; grid-row-gap: 1vw;
    padding: 0.5vw;
    box-sizing: border-box;
    justify-items: center;
    align-content: center;
`

const LoadoutItemWrapper = styled.div`
    height: 100%; width: 100%;
    position: relative;
    & input {
        background-color: #222;
        position: absolute;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
        border: 0.125vw solid #DDD;
        font-size: 1.5vw;
        transition: background-color 0.1s ease;
    }
    & input:hover {
        background-color: #444;
    }
`

const EquipmentItemImage = styled.img<{isSlot:boolean,isPreview:boolean}>`
    height: 100%; width: 100%;
    box-sizing: border-box;
    border: 0.125vw solid #DDD;
    border-radius: 6vw;
    transition: border 0.1s ease;
    background-color: ${props => props.isPreview?"#444":"inherit"};
    padding: ${props => props.isSlot?"10px":"0"};
    opacity: ${props => props.isSlot?"0.4":"1"};
`


const Header = styled.h1`
    grid-column: 1/3;
    font-size: 1.5vw;
    text-shadow: none;
    border-bottom: 0.125vw solid #DDD;
    border-top: 0.125vw solid #DDD;
    margin: 0.5vw;
`

const EquipmentLoadout = (props: {setItem: (arg0:{ID:string,type:(EquipmentKey|"")})=>void, equipmentLoadout:EquipmentLoadoutT, enhancementLevel:{[Slot in EquipmentKey]: number}, previewItemID:string }) => {
    const dispatch = useDispatch();
    
    return  (
        <EquipmentLoadoutWrapper>
            <Header>Equipped</Header>
            <EquipmentLoadoutPicker />
            <LoadoutItemsWrapper>
                {AllEquipmentTypes.map(equipmentType => {
                    return (
                        <LoadoutItemWrapper key={equipmentType}>
                            {(props.equipmentLoadout[equipmentType])?
                                <EquipmentItemImage 
                                    isSlot={false}
                                    isPreview={props.equipmentLoadout[equipmentType].ID===props.previewItemID}
                                    src={EquipmentImages[props.equipmentLoadout[equipmentType].Rarity][equipmentType]} 
                                    onClick={() => props.setItem({
                                        ID: props.equipmentLoadout[equipmentType].ID,
                                        type: props.equipmentLoadout[equipmentType].EquipmentType
                                    })}/>
                                :<EquipmentItemImage 
                                    isSlot={true}
                                    isPreview={false}
                                    src={EquipmentSlotImages[equipmentType]} 
                                    onClick={() => {}}/>}
                            <NumberInput 
                                value={props.enhancementLevel[equipmentType]}
                                minValue={0}
                                maxValue={MaxValidEnhancementLevel}
                                UpdateValue={(newValue: number) => {
                                    dispatch(setEquipmentEnhancementLevel({
                                        EquipmentType: equipmentType,
                                        Level: newValue
                                    }))
                                }}
                                ExceedMax={()=> dispatch(setToast({
                                    active: true,
                                    color: 'rgba(256, 150, 150, 0.4)',
                                    message: `Max Gear level is ${MaxValidEnhancementLevel}`
                                }))}
                                CustomStyle={{height:"auto", textShadow: "none", fontWeight: "500"}} />
                        </LoadoutItemWrapper>
                )})}
            </LoadoutItemsWrapper>
        </EquipmentLoadoutWrapper>
    );
}

export default EquipmentLoadout;