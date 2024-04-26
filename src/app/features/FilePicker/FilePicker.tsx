import styled from "styled-components";
import { ReactComponent as CrossSVG } from "../../../res/svg/Cross.svg";
import { selectAllEquipmentFromArmory, overwriteEquipmentInventory } from "../../../store/equipmentInventorySlice";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import { overwriteWeaponInventory, selectWeaponInventory } from "../../../store/weaponInventorySlice";
import { overwriteMatrixInventory, selectMatrixInventoryState } from "../../../store/matrixInventorySlice";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import { overwriteCharacter, selectCharacterState } from "../../../store/characterSlice";
import { overwriteLoadouts, selectLoadoutState } from "../../../store/loadoutSlice";
import { overwriteConfig, selectConfig } from "../../../store/configSlice";

const FilePickerWrapper = styled.div<{visible:boolean}>`
    position: absolute;
    width: 100vw; height: 100vh;
    z-index: 100;
    background-color: #111;
    display: ${props => props.visible?"flex":"none"};
    place-content: center; place-items: center;
    flex-flow: column nowrap;
`

const CrossSVGWrapper = styled(SVGWrapper)`
    position: absolute;
    top: 2vh; right: 2vh;
    height: 5vh; width: 5vh;
    fill: #EEE;
`

const FilePicker = (props: {visible: boolean, setVisible: any}) => {
    const dispatch = useDispatch();

    const congfigData = useAppSelector(selectConfig);
    const characterData = useAppSelector(selectCharacterState);    
    const loadoutData = useAppSelector(selectLoadoutState);

    const equipmentInventoryData = useAppSelector(selectAllEquipmentFromArmory);
    const weaponInventoryData = useAppSelector(selectWeaponInventory);
    const matrixInventoryData = useAppSelector(selectMatrixInventoryState);

    const handleChange = (e:any) => {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        try {
            const parsedJSON = JSON.parse(e.target?.result as string);
            
            dispatch(overwriteConfig(parsedJSON.config));
            dispatch(overwriteCharacter(parsedJSON.character));
            dispatch(overwriteEquipmentInventory(parsedJSON.inventory.equipment));
            dispatch(overwriteMatrixInventory(parsedJSON.inventory.matrices));
            dispatch(overwriteWeaponInventory(parsedJSON.inventory.weapons));

            dispatch(overwriteLoadouts(parsedJSON.loadout));
        } catch (X: any) {
            console.log("Caught Error");
            console.log(X);
        }
      };
    };

    const handleExport = () => {
        const dataObj = {
            "config": congfigData,
            "character": characterData,
            "loadout": loadoutData,
            "inventory" : {
                "equipment": equipmentInventoryData,
                "weapons": weaponInventoryData,
                "matrices": matrixInventoryData
            },
        }
        const data = JSON.stringify(dataObj);
        const blob = new Blob([data], { type: "text/plain"})
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "ToF-Data.json";
        link.href = url;
        link.click();
        link.remove();
    }


    return (
        <FilePickerWrapper visible={props.visible}>
            <CrossSVGWrapper onClick={() => props.setVisible(false)}>
                <CrossSVG />
            </CrossSVGWrapper>
            <h2>Export saved data</h2>
            <button onClick={() => handleExport()}>Export</button>
            <h2 style={{marginTop: "10vh"}}>Import</h2>
            <input type="file" accept="json/*" onChange={handleChange} />
        </FilePickerWrapper>
    );
}

export default FilePicker;