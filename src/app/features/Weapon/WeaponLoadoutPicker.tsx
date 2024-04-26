import styled from "styled-components"
import { useAppSelector } from "../../hooks";
import { SingleValue } from "react-select";
import Select from 'react-select/creatable';
import { addNewWeaponLoadout, deleteWeaponLoadout, selectEquippedWeaponLoadoutEntry, selectWeaponLoadouts, setEquippedWeaponLoadout } from "../../../store/loadoutSlice";
import { NIL as NIL_UUID, v4 as uuid } from "uuid";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import { useState } from "react";
import { ReactComponent as TrashCanSVG } from "../../../res/svg/TrashCan.svg"
import { useDispatch } from "react-redux";

const EquippedWeaponSpan = styled.span`
    font-size: 1.5vw;
    text-align: center;
    width: 100%; height: fit-content;
    box-sizing: border-box;
`

const WeaponLoadoutPickerWrapper = styled.div`
    padding: 0 0.5vw;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: fit-content;
    overflow: visible;
    justify-items: stretch;
    align-items: center;
`

const DeleteSVGWrapper = styled(SVGWrapper)<{active:boolean}>`
    height: 100%;
    padding: 0.5vw;
    box-sizing: border-box;
    height: 100%; width: 3vw;
    cursor: ${props => props.active?"pointer":"not-allowed"};
    opacity: ${props => props.active?"1":"0.2"};
    & svg {
        width: 100%; height: 100%;
        fill: #DDD;
    }
    &:hover {
        background-color: #DDD;
    }
    &:hover svg {
        fill: #222;
    }
`

const WeaponLoadoutPicker = () => {
    const dispatch = useDispatch();
    const equippedLoadoutEntry = useAppSelector(selectEquippedWeaponLoadoutEntry);
    const weaponLoadouts = useAppSelector(selectWeaponLoadouts);
    const [selectedOptionID, setSelectedOptionID] = useState<string>(equippedLoadoutEntry.value);

    const CreateNewWeaponLoadout = (name:string) => {
        const id = uuid();
        dispatch(addNewWeaponLoadout({
            ID: id,
            Name: name
        }));
        dispatch(setEquippedWeaponLoadout({
            ID: id
        }));
        setSelectedOptionID(id);
    }

    const HandleChange = (entry: SingleValue<{value:string, label:string}>) => {
        if (entry) {
            dispatch(setEquippedWeaponLoadout({
                ID: entry.value
            }));
            setSelectedOptionID(entry.value);
        }
    }

    const HandleDelete = () => {
        if (selectedOptionID === NIL_UUID) return;
        
        dispatch(setEquippedWeaponLoadout({
            ID: NIL_UUID
        }));
        dispatch(deleteWeaponLoadout({
            ID: selectedOptionID
        }));
        setSelectedOptionID(NIL_UUID);
    }

    return (
        <WeaponLoadoutPickerWrapper>
            <EquippedWeaponSpan>Weapon Loadout:</EquippedWeaponSpan>
            <Select 
                onCreateOption={CreateNewWeaponLoadout}
                onChange={HandleChange}
                menuShouldScrollIntoView={false}
                options={weaponLoadouts}
                value={equippedLoadoutEntry}
                styles={{
                    container: (base) => ({
                        ...base,
                        overflow: "visible",
                        fontFamily: "inherit",
                        fontSize: "1.5vw",
                        height: "100%",
                        color: "#DDD",
                    }),
                    control: (base) => ({
                        ...base,
                        borderRadius: 0,
                        backgroundColor: "inherit",
                        fontFamily: "inherit",
                        minHeight: "unset",
                        boxShadow: "none",
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
            <DeleteSVGWrapper onClick={HandleDelete} active={selectedOptionID !== NIL_UUID}><TrashCanSVG /></DeleteSVGWrapper>
        </WeaponLoadoutPickerWrapper>
    );
}

export default WeaponLoadoutPicker;