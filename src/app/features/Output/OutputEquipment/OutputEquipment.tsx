import styled from "styled-components";
import { EquipmentImages } from "../../../../res/equipment";
import { IconSVG } from "../../../../res/icon";
import { EquipmentPieceI, StatKeyT } from "../../../../res/logic/types/EquipmentTypes";
import { selectEnhancementLevel } from "../../../../store/characterSlice";
import { selectEquippedEquipmentLoadout } from "../../../../store/loadoutSlice";
import { useAppSelector } from "../../../hooks";
import { SVGWrapper } from "../../../Styles/PrimaryStyles";

const PieceWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    position: relative;
    padding: 5%;
    padding-top: 2.5%;
`

const EquipmentImage = styled.img`
    width: 90%; height: auto;
    z-index: -1;
    filter: drop-shadow(2px 2px 1px black);
`

const LevelImageWrapper = styled.div`
    position: relative;
    display: flex;
    place-content: center; place-items: center;
`
const EquipmentLevel = styled.span`
    position: absolute;
    font-size: 30px;
    right: 10%; bottom: 10%;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    overflow: visible;
    font-weight: 700;
`

const EquipmentItem = (props: {data:EquipmentPieceI, enhancementLevel: number }) => {
    if (props.data === undefined) {return <div></div>};

    let EquipmentImg = EquipmentImages[props.data.Rarity][props.data.EquipmentType];

    return (
        <PieceWrapper>
            <LevelImageWrapper>
                <EquipmentLevel>{props.enhancementLevel}</EquipmentLevel>
                <EquipmentImage src={EquipmentImg} />
            </LevelImageWrapper>
            {/* <OutputAdvancementStars
                CustomStyle={{gridColumn: '1/3', width: '100%'}}
                Count={6}
                Active={props.data.AdvancementLvl}
                OnClick={()=>{}}
                /> */}

            {(Object.keys(props.data.random) as StatKeyT[]).map(
                (RandomStat:StatKeyT) => 
                    <Stat key={RandomStat} statKey={RandomStat} value={props.data.random[RandomStat]??0} />
            )}
        </PieceWrapper>
    );
}

const StatImg = styled.img`
    /* filter: brightness(100) drop-shadow(2px 2px 1px black); */
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7450%) hue-rotate(186deg) brightness(121%) contrast(109%) drop-shadow(2px 2px 1px black);
`

const StatSVGWrapper = styled(SVGWrapper)`
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    width: 45px; height: 45px;
`

const StatValue = styled.span`
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    overflow: visible;
    font-size: 30px;
    font-weight: 900;
`
const StatWrapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`
const Stat = (props: {statKey:StatKeyT, value: number}) => {
    return (
        <StatWrapper>
            <StatSVGWrapper><IconSVG IconKey={props.statKey} color="#EEE" /></StatSVGWrapper>
            {/* <StatImg src={Icons[props.statKey]} /> */}
            <StatValue>{props.value}{props.statKey.endsWith("%")?"%":""}</StatValue>
        </StatWrapper>
    );
}

const OutputEquipmentWrapper = styled.div`
    width: 100%; height: 100%;
    right: 0;
    display: grid;
    grid-template-columns: repeat(4, auto);
    box-sizing: border-box;
`

const OutputEquipment = () => {
    const {Armor, Belt, Boots, Bracers, Gloves, Helm, LegGuards, Spaulders, Engine, Reactor, Visor, Exoskeleton} = useAppSelector(selectEquippedEquipmentLoadout);
    const enhancementLevels = useAppSelector(selectEnhancementLevel);

    return (
        <OutputEquipmentWrapper>
            <EquipmentItem data={Helm} enhancementLevel={enhancementLevels["Helm"]} />
            <EquipmentItem data={Spaulders} enhancementLevel={enhancementLevels["Spaulders"]} />
            <EquipmentItem data={Armor} enhancementLevel={enhancementLevels["Armor"]} />
            <EquipmentItem data={Bracers} enhancementLevel={enhancementLevels["Bracers"]} />
            <EquipmentItem data={Belt} enhancementLevel={enhancementLevels["Belt"]} />
            <EquipmentItem data={Gloves} enhancementLevel={enhancementLevels["Gloves"]} />
            <EquipmentItem data={LegGuards} enhancementLevel={enhancementLevels["LegGuards"]} />
            <EquipmentItem data={Boots} enhancementLevel={enhancementLevels["Boots"]} />
            <EquipmentItem data={Engine} enhancementLevel={enhancementLevels["Engine"]} />
            <EquipmentItem data={Visor} enhancementLevel={enhancementLevels["Visor"]} />
            <EquipmentItem data={Reactor} enhancementLevel={enhancementLevels["Reactor"]} />
            <EquipmentItem data={Exoskeleton} enhancementLevel={enhancementLevels["Exoskeleton"]} />
        </OutputEquipmentWrapper>
    );
}

export default OutputEquipment;