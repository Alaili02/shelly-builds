import styled from "styled-components";
import { useState } from "react";
import { EquipmentKey, EquipmentPieceI } from "../../../res/logic/types/EquipmentTypes";
import { useAppSelector } from "../../hooks";

import { selectEnhancementLevel } from "../../../store/characterSlice";
import EquipmentInventory from "./EquipmentInventory";
import EquipmentLoadout from "./EquipmentLoadout";
import EquipmentItem from "./EquipmentItem";
import { selectEquipmentPieceFromInventory } from "../../../store/equipmentInventorySlice";
import { selectEquippedEquipmentLoadout } from "../../../store/loadoutSlice";


const Main = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 40% 60%;
    grid-template-rows: auto 1fr;
`

const EquipmentWrapper = styled.div`
    /* grid-row: 2/3;
    grid-column: 1/3; */
    width: 100%;

    display: grid;

    justify-items: stretch;
    align-items: stretch;

    grid-template-rows: repeat(3, 33.33vh);
    grid-template-columns: repeat(4, 1fr);
`

// const SlotWrapper = styled.div`
//     display: flex;
//     flex-flow: row nowrap;
// `

// const Slot = (props: {data:EquipmentPieceI, equipmentType:EquipmentKey, enhancementLevel: number}) => {
//     return (
//         <SlotWrapper>
//             {(props.data!==undefined)?
//                 <EquipmentEdit data={props.data} enhancementLevel={props.enhancementLevel} />
//                 :
//                 <EquipmentPicker EquipmentType={props.equipmentType} />
//             }
//         </SlotWrapper>
//     );
// }

const Equipment = (props: {customStyle: any}) => {
    // const {Armor, Belt, Boots, Bracers, Gloves, Helm, LegGuards, Spaulders, Engine, Reactor, Visor} = useAppSelector(selectEquipment);
    const enhancementLevels = useAppSelector(selectEnhancementLevel);
    const [item, setItem] = useState<{ID:string,type:EquipmentKey|""}>({ID:"",type:""});
    const equipmentItem = useAppSelector(state => selectEquipmentPieceFromInventory(state, item.type, item.ID));
    const equipmentLoadout = useAppSelector(selectEquippedEquipmentLoadout);
    // const isEquipped = 

    

    return (
        <Main style={props.customStyle}>
            <EquipmentInventory previewItemID={item.ID} setPreviewItemID={setItem} />
            <EquipmentLoadout 
                equipmentLoadout={equipmentLoadout}
                enhancementLevel={enhancementLevels}
                previewItemID={item.ID}
                setItem={setItem} />
            {equipmentItem?
                <EquipmentItem 
                    data={equipmentItem} 
                    enhancementLevel={(equipmentItem)?enhancementLevels[equipmentItem.EquipmentType]:0} 
                    isEquipped={(equipmentLoadout[equipmentItem.EquipmentType])?equipmentLoadout[equipmentItem.EquipmentType].ID===equipmentItem.ID:false}
                    setPreviewItem={setItem}
                    />
            :<></>
            }
            

            {/* <EquipmentWrapper>
                <Slot data={Helm} equipmentType={'Helm'} enhancementLevel={enhancementLevels["Helm"]} />
                <Slot data={Spaulders} equipmentType={'Spaulders'} enhancementLevel={enhancementLevels["Spaulders"]} />
                <Slot data={Armor} equipmentType={'Armor'} enhancementLevel={enhancementLevels["Armor"]} />
                <Slot data={Bracers} equipmentType={'Bracers'} enhancementLevel={enhancementLevels["Bracers"]} />
                <Slot data={Belt} equipmentType={'Belt'} enhancementLevel={enhancementLevels["Belt"]} />
                <Slot data={Gloves} equipmentType={'Gloves'} enhancementLevel={enhancementLevels["Gloves"]} />
                <Slot data={LegGuards} equipmentType={'LegGuards'} enhancementLevel={enhancementLevels["LegGuards"]} />
                <Slot data={Boots} equipmentType={'Boots'} enhancementLevel={enhancementLevels["Boots"]} />
                <Slot data={Engine} equipmentType={'Engine'} enhancementLevel={enhancementLevels["Engine"]} />
                <Slot data={Visor} equipmentType={'Visor'} enhancementLevel={enhancementLevels["Visor"]} />
                <Slot data={Reactor} equipmentType={'Reactor'} enhancementLevel={enhancementLevels["Reactor"]} />
            </EquipmentWrapper> */}
        </Main>
    );
}

export default Equipment;