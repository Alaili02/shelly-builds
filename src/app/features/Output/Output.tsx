import styled from "styled-components";
import { selectAllStats, selectCharacterState } from "../../../store/characterSlice";
import { Keywords } from "../../../store/data";
import { useAppSelector } from "../../hooks";
import OutputWeapon from "./OutputWeapon/OutputWeapon";

import Bygone_Physical from "../../../res/output/images/Bygone_Physical.webp";
import Bygone_Flame from "../../../res/output/images/Bygone_Flame.webp";
import Bygone_Frost from "../../../res/output/images/Bygone_Frost.webp";
import Bygone_Volt from "../../../res/output/images/Bygone_Volt.webp";
import Bygone_Black from "../../../res/output/images/Bygone_Black.webp";
import Test1 from "../../../res/output/images/Eva.png";

import { SuppressorImages } from "../../../res/supressor";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import { IconSVG } from "../../../res/icon";
import { StatKeyT } from "../../../res/logic/types/EquipmentTypes";
import { selectEquippedWeapons } from "../../../store/loadoutSlice";
import { getResonance } from "../../../res/logic/WeaponLogic";
import OutputEquipment from "./OutputEquipment/OutputEquipment";
import OutputStats from "./OutputStats/OutputStats";

const OutputWrapper = styled.div`
    color: white;
    width: 1800px; height: 1000px;
    display: grid;
    grid-template-columns: 504px 600px 696px;
    grid-template-rows: 100%;
    align-items: center;
`

const Background = styled.img`
    position: absolute;
    z-index: -1000;
    transform: translate(-60px, 0);
    width: 1920px;
    height: 1080px;
    object-fit: cover;
    background-color: #f4eacf;
    filter: blur(2px);
`

const BackgroundImage = styled.img`
    position: absolute;
    top: 0; left: 0;
    z-index: -100;
    width: 1800px;
    height: 1000px;
    object-fit: cover;
`

const PlayerName = styled.span`
    z-index: 1;
    position: absolute;
    font-size: 40px;
    font-weight: 900;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    top: 20px; left: 20px;
    overflow: visible;
`

const CrewName = styled.span`
    z-index: 1;
    position: absolute;
    font-size: 25px;
    font-weight: 900;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    top: 70px; left: 20px;
    overflow: visible;
`

const PlayerLevel = styled.span`
    position: absolute;
    left: 370px;
    top: 20px;
    overflow: visible;
    font-size: 40px; font-weight: 900;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    z-index: 1;
`

const SuppressorWrapper = styled.div`
    position: absolute;
    z-index: 1;
    left: 370px;
    top: 70px;
    display: flex;
    place-content: center;
    place-items: center;
`
const SuppressorImage = styled.img`
    z-index: 1;
    width: 50px;
    font-weight: 900;
    filter: drop-shadow(2px 2px 1px black);
`
const SuppressorLevel = styled.span`
    z-index: 1;
    font-size: 40px;
    overflow: visible;
    font-weight: 900;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
`

const Output = (props: {ExportRef: React.RefObject<HTMLDivElement>}) => {
    const {
        HP, Level, Suppressor,
        FlameAttack, FrostAttack, VoltAttack, PhysicalAttack, AlteredAttack,
        Crit, CritRate, CritDamage,
        FlameResistance, FrostResistance, VoltResistance, PhysicalResistance, AlteredResistance
    } = useAppSelector((state) => selectAllStats(state));
    const { Name, Crew } = useAppSelector(selectCharacterState);
    const EquippedWeaponNames = useAppSelector(selectEquippedWeapons);

    const Resonance = getResonance(EquippedWeaponNames);

    return (
        <OutputWrapper ref={props.ExportRef}>
            {/* <ExportWrapper no-image>
                <button className="no-image" data-html2canvas-ignore onClick={ExportImage} >wah</button>
            </ExportWrapper> */}
            {/* {Resonance.ElementalResonance === "Physical"?
                <BackgroundImage src={Bygone_Physical} />:
            Resonance.ElementalResonance === "Flame"?
                <BackgroundImage src={Bygone_Flame} />:
            Resonance.ElementalResonance === "Frost"?
                <BackgroundImage src={Bygone_Frost} />:
            Resonance.ElementalResonance === "Volt"?
                <BackgroundImage src={Bygone_Volt} />:
                <BackgroundImage src={Bygone_Black} />
            } */}
            <Background src={Test1} />

            {(Name!=="")?
                <PlayerName>{Name}</PlayerName>:<></>
            }
            {(Crew!=="")?
                <CrewName>{Crew}</CrewName>:<></>
            }
            <PlayerLevel>LVL{Level}</PlayerLevel>
            {Suppressor!=="0.0"?
                <SuppressorWrapper>
                    <SuppressorImage src={SuppressorImages[Suppressor]} />
                    <SuppressorLevel>{Suppressor}</SuppressorLevel>
                </SuppressorWrapper>:<></>
            }

            {/* <AvatarImage src={AvatarImg} /> */}
            
            <Canvas />

            <Col2Wrapper>
                {/* <ItemsWrapper>
                    <Item itemKey="HP" value={HP} />
                    <Item itemKey="PhysicalAttack" value={PhysicalAttack} />
                    <Item itemKey="PhysicalResistance" value={PhysicalResistance} />

                    <Item itemKey="Crit" value={Crit} />
                    <Item itemKey="FlameAttack" value={FlameAttack} />
                    <Item itemKey="FlameResistance" value={FlameResistance} />

                    <Item itemKey="CritRate%" value={CritRate} percent={true}/>
                    <Item itemKey="FrostAttack" value={FrostAttack} />
                    <Item itemKey="FrostResistance" value={FrostResistance} />

                    <Item itemKey="CritDamage%" value={CritDamage*100} percent={true} />
                    <Item itemKey="VoltAttack" value={VoltAttack} />
                    <Item itemKey="VoltResistance" value={VoltResistance} />

                    <div></div>
                    <Item itemKey="AlteredAttack" value={AlteredAttack} />
                    <Item itemKey="AlteredResistance" value={AlteredResistance}  />
                </ItemsWrapper> */}

                <OutputStats />
                <OutputWeapon WeaponNames={EquippedWeaponNames} />
            </Col2Wrapper>

            <OutputEquipment />
        </OutputWrapper>
    )
}

export default Output;

const Col2Wrapper = styled.div`
    width: 100%; height: 100%;
    display: grid;
    grid-template-columns: 600px;
    grid-template-rows: 380px 620px;
    box-sizing: border-box;
`


const CanvasWrapper = styled.div`
    width: 100%; height: 100%;
`
const Canvas = () => {
    return (
        <CanvasWrapper>
            <canvas id="canvasOut" />
        </CanvasWrapper>
    );
}

const ItemsWrapper = styled.div`
    /* position: absolute; */
    display: grid;
    grid-template-columns: auto auto auto;
    /* height: 437px; */
    height: fit-content;
    box-sizing: border-box;
    grid-auto-rows: 60px;
    grid-row-gap: 12px;
    grid-column-gap: 12px;
    width: 100%;
    justify-content: start;
`

const ItemWrapper = styled.div`
    display: grid;
    height: 100%;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    justify-items: start;
    align-items: center;
    overflow: visible;
`

const ItemTitle = styled.span`
    grid-row:1/2; grid-column: 2/3;
    overflow: visible;
    font-size: 20px;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    box-sizing: border-box;
    margin: 0;
`
const ItemValue = styled.span`
    grid-row: 2/3; grid-column: 2/3;
    font-size: 30px;
    font-weight: 900;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    overflow: visible;
    box-sizing: border-box;
    margin: 0;
`

const ItemSVGWrapper = styled(SVGWrapper)`
    grid-row: 1/3;
    overflow: visible;
    & svg {
        height: 60px; width: 60px;
        filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    }
`

const Item = (props: {itemKey: StatKeyT, value: number, percent:boolean }) => {
    return (
        <ItemWrapper>
            <ItemSVGWrapper><IconSVG IconKey={props.itemKey} color="#EEE" /></ItemSVGWrapper>
            <ItemTitle>{Keywords.English.Stat[props.itemKey]}</ItemTitle>
            <ItemValue>
                {props.percent?
                    (props.value).toLocaleString('en-US', {maximumFractionDigits:2}) + "%":
                    Math.floor(props.value).toLocaleString('en-US', {maximumFractionDigits:0})
                }
            </ItemValue>
        </ItemWrapper>
    );
}
Item.defaultProps = {percent: false}