import styled from "styled-components";
import Select from 'react-select/creatable';
import { NIL as NIL_UUID, v4 as uuid } from "uuid";
import { useAppSelector } from "../../hooks";
import { addNewMatrixLoadout, deleteMatrixLoadout, selectMatrixLoadoutEquippedBy, selectMatrixLoadouts, setEquippedWeaponLoadout, setMatrixLoadoutEquippedBy } from "../../../store/loadoutSlice";
import { useDispatch } from "react-redux";
import { SingleValue } from "react-select";
import { setWeaponEquippedMatrixLoadout } from "../../../store/weaponInventorySlice";
import { MatrixSlotT, SimulacraNameT } from "../../../res/logic/types/WeaponTypes";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import { ReactComponent as TrashCanSVG } from "../../../res/svg/TrashCan.svg"
import { setMatrixEquippedBy } from "../../../store/matrixInventorySlice";

const MatrixLoadoutPickerWrapper = styled.div`
    grid-column: 1/5;
    box-sizing: border-box;
    display: grid;
    width: 100%;
    grid-template-columns: 80% 1fr;
    grid-template-rows: fit-content;
    overflow: visible;
    justify-items: stretch;
    align-items: center;
`;

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

const MatrixLoadoutPicker = (props: { 
    simulacraName: SimulacraNameT, 
    selectedEntry:SingleValue<{
        value:{
            loadoutID:string,
            equippedBy:SimulacraNameT|"",
            loadout:{[slot in MatrixSlotT]:string}
        }, 
        label:string}> 
    }) => {
    const dispatch = useDispatch();
    const matrixLoadouts = [
        {
            label: "No Matrix Loadout",
            value: {
                loadoutID: "",
                equippedBy: "" as SimulacraNameT|"",
                loadout: {
                    Emotion: "",
                    Mind: "",
                    Memory: "",
                    Faith: ""
                }
            },
        },
        ...useAppSelector(selectMatrixLoadouts),
    ];

    // const equippedBy = useAppSelector(state => selectMatrixLoadoutEquippedBy(state, props.equippedMatrixLoadout.value))


    const CreateNewMatrixLoadout = (name:string) => {
        const id = uuid();
        dispatch(addNewMatrixLoadout({
            ID: id,
            Name: name,
        }));

        HandleChange({
            label: name,
            value: {
                equippedBy: "",
                loadoutID: id,
                loadout: {
                    Emotion: "",
                    Mind: "",
                    Memory: "",
                    Faith: ""
                }
            }
        })

        // setSelectedOptionID(id);
    }

    const HandleChange = (entry: SingleValue<{value:{loadoutID:string,equippedBy:SimulacraNameT|"",loadout:{[slot in MatrixSlotT]:string}}, label:string}>) => {
        if (entry) {
            const MatrixLoadoutToBeEquipped = entry.value.loadoutID;
            const MatrixLoadoutToBeRemoved = props.selectedEntry?.value.loadoutID??"";
            const targetWeaponEquippingLoadout = props.simulacraName;
            const originalWeaponEquippingLoadout = entry.value.equippedBy;

            if (originalWeaponEquippingLoadout !== "") {
                // console.log(`Old Weapon:'${originalWeaponEquippingLoadout}' => EQUIPS => ''`)
                dispatch(setWeaponEquippedMatrixLoadout({
                    ID: "",
                    simulacraName: originalWeaponEquippingLoadout
                }));
            }

            if (MatrixLoadoutToBeRemoved !== "") {
                // console.log(`Old Matrix Loadout:'${MatrixLoadoutToBeRemoved}' => EQUIPPED BY => ''`)
                dispatch(setMatrixLoadoutEquippedBy({
                    ID: MatrixLoadoutToBeRemoved,
                    EquippedBy: ""
                }));
            }

            // console.log(`Weapon:'${targetWeaponEquippingLoadout}' => EQUIPS => Matrix Loadout:'${MatrixLoadoutToBeEquipped}'`)
            dispatch(setWeaponEquippedMatrixLoadout({
                ID: MatrixLoadoutToBeEquipped,
                simulacraName: targetWeaponEquippingLoadout
            }));

            // console.log(`Matrix Loadout:'${MatrixLoadoutToBeEquipped}' => EQUIPPED BY => Weapon:'${targetWeaponEquippingLoadout}'`)
            dispatch(setMatrixLoadoutEquippedBy({
                ID: MatrixLoadoutToBeEquipped,
                EquippedBy: targetWeaponEquippingLoadout
            }));
        }
    }

    const HandleDelete = () => {
        if (!props.selectedEntry || props.selectedEntry.value.loadoutID==="") return;
        HandleChange({
            label: "No Matrix Loadout",
            value: {
                loadoutID: "",
                equippedBy: "" as SimulacraNameT|"",
                loadout: {
                    "Emotion": "",
                    "Mind": "",
                    "Memory": "",
                    "Faith": ""
                }
            }
        });

        const MatrixLoadoutID = props.selectedEntry.value.loadoutID;
        const MatrixLoadout = props.selectedEntry.value.loadout;

        // Unequip all matrices from old matrix loadout
        dispatch(setMatrixEquippedBy({
            ID: MatrixLoadout.Emotion,
            EquippedByID: "",
            Slot: "Emotion"
        }));
        dispatch(setMatrixEquippedBy({
            ID: MatrixLoadout.Mind,
            EquippedByID: "",
            Slot: "Mind"
        }));
        dispatch(setMatrixEquippedBy({
            ID: MatrixLoadout.Memory,
            EquippedByID: "",
            Slot: "Memory"
        }));
        dispatch(setMatrixEquippedBy({
            ID: MatrixLoadout.Faith,
            EquippedByID: "",
            Slot: "Faith"
        }));

        // Delete old matrix loadout
        dispatch(deleteMatrixLoadout({
            ID: MatrixLoadoutID
        }))
    }

    return (
        <MatrixLoadoutPickerWrapper>
            <Select 
                onCreateOption={CreateNewMatrixLoadout}
                onChange={HandleChange}
                menuShouldScrollIntoView={false}
                options={matrixLoadouts}
                value={props.selectedEntry}
                styles={{
                    container: (base) => ({
                        ...base,
                        overflow: "visible",
                        fontFamily: "inherit",
                        fontSize: "1.5vw",
                        height: "100%",
                        color: "#DDD",
                        textAlign: "center"
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
            <DeleteSVGWrapper onClick={HandleDelete} active={props.selectedEntry?.value.loadoutID!==""}><TrashCanSVG /></DeleteSVGWrapper>
        </MatrixLoadoutPickerWrapper>
    );
}

export default MatrixLoadoutPicker;