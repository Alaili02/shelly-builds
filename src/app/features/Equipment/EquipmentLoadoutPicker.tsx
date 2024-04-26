import styled from "styled-components";
import { useState } from "react";
import { addNewEquipmentLoadout, deleteEquipmentLoadout, selectEquipmentLoadouts, selectEquippedEquipmentLoadoutEntry, selectEquippedEquipmentLoadoutID, setEquippedEquipmentLoadout } from "../../../store/loadoutSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Select from 'react-select/creatable';
import { NIL as NIL_UUID, v4 as uuid } from "uuid";
import { SingleValue } from "react-select";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import { ReactComponent as TrashCanSVG } from "../../../res/svg/TrashCan.svg"

const EquipmentLoadoutPickerWrapper = styled.div`
    height: 100%; width: 100%;
    /* background-color: red; */
    padding: 0 0.5vw;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: fit-content;
    overflow: visible;
    justify-items: stretch;
    align-items: center;
`

const Header = styled.span`
    font-size: 1.5vw;
    text-align: center;
    width: 100%; height: fit-content;
    box-sizing: border-box;
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

const EquipmentLoadoutPicker = () => {
    const dispatch = useAppDispatch();
    const loadouts = useAppSelector(selectEquipmentLoadouts);
    const equippedLoadoutEntry = useAppSelector(selectEquippedEquipmentLoadoutEntry);
    const [selectedOptionID, setSelectedOptionID] = useState<string>(equippedLoadoutEntry.value);

    const CreateNewEquipmentLoadout = (name:string) => {
        const id = uuid();
        dispatch(addNewEquipmentLoadout({
            ID: id,
            Name: name
        }));
        dispatch(setEquippedEquipmentLoadout({
            ID: id
        }));
        setSelectedOptionID(id);
    }

    const HandleChange = (entry: SingleValue<{value:string, label:string}>) => {
        if (entry) {
            dispatch(setEquippedEquipmentLoadout({
                ID: entry.value
            }));
            setSelectedOptionID(entry.value);
        }
    }

    const HandleDelete = () => {
        if (selectedOptionID === NIL_UUID) return;
        
        dispatch(setEquippedEquipmentLoadout({
            ID: NIL_UUID
        }));
        dispatch(deleteEquipmentLoadout({
            ID: selectedOptionID
        }));
        setSelectedOptionID(NIL_UUID);
    }

    return (
        <EquipmentLoadoutPickerWrapper>
            <Header>Equipment Loadout:</Header>
            <Select 
                menuShouldScrollIntoView={false}
                onCreateOption={CreateNewEquipmentLoadout}
                onChange={HandleChange}
                options={loadouts}
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
                        minHeight: "unset",
                        fontFamily: "inherit",
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
        </EquipmentLoadoutPickerWrapper>
    );
}

export default EquipmentLoadoutPicker;