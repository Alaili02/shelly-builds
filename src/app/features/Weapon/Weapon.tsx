import styled from "styled-components";
import { useState } from "react";
import WeaponInventory from "./WeaponInventory";
import WeaponEquipped from "./WeaponEquipped";
import WeaponPreview from "./WeaponPreview";
import MatrixInventory from "./MatrixInventory";
import { useAppSelector } from "../../hooks";
import { selectEquippedWeaponLoadout } from "../../../store/loadoutSlice";
import { selectWeaponInventory } from "../../../store/weaponInventorySlice";
import WeaponMatrixInventory from "./WeaponMatrixInventory";

const WeaponWrapper = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    /* grid-template-columns: 34% 13% 53%; */
    grid-template-columns: 40% 60%;
    grid-template-rows: 1fr auto;
    box-sizing: border-box;
    justify-items: center;
    z-index: 0;
`


const Weapon = (props: {customStyle: any}) => {
    const [previewItem, setPreviewItem] = useState<{
        ID: string,
        Type: "Weapon" | "Matrix"
    }>();

    const equippedWeaponLoadout = useAppSelector(selectEquippedWeaponLoadout);
    const weaponInventoryState = useAppSelector(selectWeaponInventory);

    if (equippedWeaponLoadout.loadout[1] !== "") {
        // weaponInventoryState[WeaponToSimulacra[equippedWeaponLoadout.loadout[1]]]?.matrices.

    }
    

    return (
        <WeaponWrapper style={props.customStyle}>
            {/* <WeaponInventory /> */}
            <WeaponMatrixInventory />
            {/* <MatrixInventory /> */}
            <WeaponEquipped />
            {/* <WeaponPreview /> */}
        </WeaponWrapper>
    );
}

export default Weapon;