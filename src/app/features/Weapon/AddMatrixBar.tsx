import styled from "styled-components";
import { useState } from "react";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import { ReactComponent as AddSVG } from "../../../res/svg/Add.svg";
import Select from "react-select";
import { getMatrixEntries, getMatrixSlotEntries } from "../../../res/logic/data/MatrixData";
import { MatrixNameT, MatrixSlotT } from "../../../res/logic/types/WeaponTypes";
import { useDispatch } from "react-redux";
import { addMatrixToInventory } from "../../../store/matrixInventorySlice";
import { v4 as uuid } from "uuid";
import { IconSVG } from "../../../res/icon";

const AddMatrixBarWrapper = styled.div`
    height: fit-content; width: 100%;
    display: grid;
    grid-template-columns: auto 2.5vw 20% 1fr auto;
    padding-bottom: 0.5vw;
    align-items: center;
    justify-content: start;
    overflow: visible;
`
const AddSVGWrapper = styled(SVGWrapper)`
    height: 100%;
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

const Span = styled.span`
    font-size: 1.25vw;
    padding-left: 1vw;
`

const MatrixIconSVGWrapper = styled(SVGWrapper)`
    width: 100%;
    padding: 0 0.25vw;
    box-sizing: border-box;
`

const AddMatrixBar = (props: {}) => {
    const dispatch = useDispatch();
    const matrixOptions = getMatrixEntries();
    const slotOptions = getMatrixSlotEntries();
    const [matrix, setMatrix] = useState<{label:string,value:MatrixNameT}>(matrixOptions[0]);
    const [slot, setSlot] = useState<{label:MatrixSlotT,value:MatrixSlotT}>(slotOptions[0]);

    const CreateNewMatrix = () => {
        dispatch(addMatrixToInventory({
            ID: uuid(),
            Name: matrix.value,
            Slot: slot.value
        }))
    }

    return (
        <AddMatrixBarWrapper>
            <Span>Add new:</Span>
            <MatrixIconSVGWrapper>
                <IconSVG IconKey={slot.value} color="#EEE"/>
            </MatrixIconSVGWrapper>
            <Select 
                onChange={(entry) => (entry)?setSlot({label:entry.label,value:entry.value}):false}
                options={slotOptions}
                value={slot}
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
                        textAlign: "center",
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
            <Select 
                onChange={(entry) => (entry)?setMatrix({label:entry.label,value:entry.value}):false}
                options={matrixOptions}
                value={matrix}
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
                        textAlign: "center",
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
            <AddSVGWrapper onClick={CreateNewMatrix}><AddSVG /></AddSVGWrapper>
        </AddMatrixBarWrapper>
    );
}

export default AddMatrixBar;