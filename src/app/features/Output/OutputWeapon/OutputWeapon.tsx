import { useRef, useEffect } from "react";
import styled from "styled-components"
import { WeaponNameT, WeaponStoreT, WeaponToSimulacra } from "../../../../res/logic/types/WeaponTypes";
import { selectSimulacraFromInventory } from "../../../../store/weaponInventorySlice";
import { OutputWeaponImages } from "../../../../res/weapon";
import { ElementImages, ResonanceImages } from "../../../../res/element";
import { useAppSelector } from "../../../hooks";
import OutputAdvancementStars from "../OutputAdvancementStars";
import OutputMatrixView from "./OutputMatrixView";
import WeaponData from "../../../../res/logic/data/WeaponData";
import { selectMatrixLoadout } from "../../../../store/loadoutSlice";
import { selectMatrixSetFromInventory } from "../../../../store/matrixInventorySlice";

const OutputWeaponWrapper = styled.div`
    /* padding-top: 16px; */
    height: 620px;
    display: grid;
    box-sizing: border-box;
    grid-template-columns: 1fr 1fr 1fr;
    /* flex-flow: row nowrap; */
    width: 100%;
    overflow: visible;
`

const OutputWeapon = (props: {WeaponNames: WeaponStoreT}) => {
    return (
        <OutputWeaponWrapper>
            {props.WeaponNames["1"] !== ""?
            <WeaponContainer WeaponName={props.WeaponNames["1"]} />
            :<div></div>
            }
            {props.WeaponNames["2"] !== ""?
            <WeaponContainer WeaponName={props.WeaponNames["2"]} />
            :<div></div>
            }
            {props.WeaponNames["3"] !== ""?
            <WeaponContainer WeaponName={props.WeaponNames["3"]} />
            :<div></div>
            }
        </OutputWeaponWrapper>
    );
}

export default OutputWeapon;


const WeaponImageWrapper = styled.div`
    position: relative;
    overflow: visible;
    height: 170px;
    width: 100%;
`

const WeaponResonance = styled.img`
    pointer-events: none;
    z-index: 1;
    position: absolute;
    top: 2%;
    height: 15%;
    left: 4%;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);    
`

const WeaponLevel = styled.span`
    z-index: 1;
    position: absolute;
    bottom: 4%; right: 4%;
    font-size: 34px; font-weight: 900;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    overflow: visible;
`

const WeaponElement = styled.img`
    pointer-events: none;
    z-index: 1;
    position: absolute;
    height: 15%;
    top: 18%;
    left: 4%;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
`

const WeaponWrapper = styled.div`
    width: 200px;
    display: grid;
    box-sizing: border-box;
    grid-template-columns: 30px 170px;
    grid-auto-rows: auto;
    overflow: visible;
`

const WeaponContainer = (props: {WeaponName: WeaponNameT}) => {
    const simulacraName = WeaponToSimulacra[props.WeaponName];
    const weaponState = useAppSelector(state => selectSimulacraFromInventory(state, simulacraName));
    const matrixLoadoutIDs = useAppSelector(state => selectMatrixLoadout(state, weaponState.Equips));

    const weaponData = WeaponData[simulacraName];
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const img = new Image(); img.src = OutputWeaponImages[weaponData.WeaponName];
        const draw = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                // canvas.style.width = "100%";
                // canvas.style.height = "100%";
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
    
                if (context) {
                    img.onload = () => {
                        context.drawImage(img, 0, 0, 170, 170);
                    };
                }
            }
        }
        draw();
        }, [weaponData.WeaponName]);

    return (
        <WeaponWrapper>
            <OutputAdvancementStars
                CustomStyle={{gridColumn: '1/2', gridRow: '1/3', display: 'flex', flexFlow: 'column nowrap',  height: '170px', width: '100%'}}
                Active={weaponState.AscensionLevel+1}
                Count={6}
                OnClick={() => {}} />
            <WeaponImageWrapper>
                <WeaponResonance src={ResonanceImages[weaponData.WeaponResonance]} />
                <WeaponElement src={ElementImages[weaponData.Element]} />
                <WeaponLevel>{weaponState.Level}</WeaponLevel>
                <CanvasWrapper>
                    <canvas ref={canvasRef} />
                </CanvasWrapper>
            </WeaponImageWrapper>
            <OutputMatrixView MatrixIDSet={matrixLoadoutIDs} />
        </WeaponWrapper>
    );
}

const CanvasWrapper = styled.div`
    z-index: -1;
    width: 100%; height: 100%;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
`
