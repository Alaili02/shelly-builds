import styled from "styled-components";
import { IconSVG } from "../../../res/icon";
import { StatKeyT } from "../../../res/logic/types/EquipmentTypes";
import { selectStat } from "../../../store/characterSlice";
import { selectStatFromEquipment } from "../../../store/loadoutSlice";
import { Keywords } from "../../../store/data";
import { useAppSelector } from "../../hooks";
import { DamageTypeT } from "../../../res/logic/types/WeaponTypes";
import { ColorValue } from "../../../res/logic/data/UIValues";

const StatBarWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
    overflow-y: scroll;
    scrollbar-width: thin;
    /* place-items: center; */
    box-sizing: border-box;
`

const StatBar = () => {
    const attack = useAppSelector(state => selectStat(state, "Attack"));
    const resistance = useAppSelector(state => selectStat(state, "Resistance"));

    const hp = useAppSelector(state => selectStat(state, "HP"));
    const hpMulti = useAppSelector(state => selectStat(state, "HP%"));

    const crit = useAppSelector(state => selectStat(state, "Crit"));
    const critRate = useAppSelector(state => selectStat(state, "CritRate%"));
    const critDmg = useAppSelector(state => selectStat(state, "CritDamage%"));


    const physicalPureAtk = useAppSelector(state => selectStatFromEquipment(state, "PhysicalAttack"));
    const physicalAtk = useAppSelector(state => selectStat(state, "PhysicalAttack"));
    const physicalAtkMulti = useAppSelector(state => selectStat(state, "PhysicalAttack%"));
    const physicalDmg = useAppSelector(state => selectStat(state, "PhysicalDamage%"));

    const flamePureAtk = useAppSelector(state => selectStatFromEquipment(state, "FlameAttack"));
    const flameAtk = useAppSelector(state => selectStat(state, "FlameAttack"));
    const flameAtkMulti = useAppSelector(state => selectStat(state, "FlameAttack%"));
    const flameDmg = useAppSelector(state => selectStat(state, "FlameDamage%"));
    
    const frostPureAtk = useAppSelector(state => selectStatFromEquipment(state, "FrostAttack"));
    const frostAtk = useAppSelector(state => selectStat(state, "FrostAttack"));
    const frostAtkMulti = useAppSelector(state => selectStat(state, "FrostAttack%"));
    const frostDmg = useAppSelector(state => selectStat(state, "FrostDamage%"));
    
    const voltPureAtk = useAppSelector(state => selectStatFromEquipment(state, "VoltAttack"));
    const voltAtk = useAppSelector(state => selectStat(state, "VoltAttack"));
    const voltAtkMulti = useAppSelector(state => selectStat(state, "VoltAttack%"));
    const voltDmg = useAppSelector(state => selectStat(state, "VoltDamage%"));
    
    const alteredAtk = useAppSelector(state => selectStat(state, "AlteredAttack"));
    
    
    const physicalResist = useAppSelector(state => selectStat(state, "PhysicalResistance"));
    const physicalResistMulti = useAppSelector(state => selectStat(state, "PhysicalResistance%"));

    const flameResist = useAppSelector(state => selectStat(state, "FlameResistance"));
    const flameResistMulti = useAppSelector(state => selectStat(state, "FlameResistance%"));

    const frostResist = useAppSelector(state => selectStat(state, "FrostResistance"));
    const frostResistMulti = useAppSelector(state => selectStat(state, "FrostResistance%"));

    const voltResist = useAppSelector(state => selectStat(state, "VoltResistance"));
    const voltResistMulti = useAppSelector(state => selectStat(state, "VoltResistance%"));

    const alteredResist = useAppSelector(state => selectStat(state, "AlteredResistance"));
    const alteredResistMulti = useAppSelector(state => selectStat(state, "AlteredResistance%"));

    return (
        <StatBarWrapper>
            <DoubleComboStat statKey="HP" colorKey="HP" firstValue={hp} secondValue={hpMulti} />
            <DoubleComboStat statKey="Crit" colorKey="Crit" firstValue={crit} secondValue={critRate} />

            <SingleStat statKey="Attack" firstValue={attack} colorKey={"Attack"}/>

            <ComboStat damageType="Physical" atkPure={physicalPureAtk} atkMulti={physicalAtkMulti} atkTotal={physicalAtk} dmgMulti={physicalDmg}/>
            <ComboStat damageType="Flame" atkPure={flamePureAtk} atkMulti={flameAtkMulti} atkTotal={flameAtk} dmgMulti={flameDmg}/>
            <ComboStat damageType="Frost" atkPure={frostPureAtk} atkMulti={frostAtkMulti} atkTotal={frostAtk} dmgMulti={frostDmg}/>
            <ComboStat damageType="Volt" atkPure={voltPureAtk} atkMulti={voltAtkMulti} atkTotal={voltAtk} dmgMulti={voltDmg}/>

            <SingleStat statKey="Resistance" firstValue={resistance} colorKey={"Resistance"}/>
            <DoubleComboStat statKey="PhysicalResistance" colorKey="Physical" firstValue={physicalResist} secondValue={physicalResistMulti} />
            <DoubleComboStat statKey="FlameResistance" colorKey="Flame" firstValue={flameResist} secondValue={flameResistMulti} />
            <DoubleComboStat statKey="FrostResistance" colorKey="Frost" firstValue={frostResist} secondValue={frostResistMulti} />
            <DoubleComboStat statKey="VoltResistance" colorKey="Volt" firstValue={voltResist} secondValue={voltResistMulti} />
            <DoubleComboStat statKey="AlteredResistance" colorKey="Altered" firstValue={alteredResist} secondValue={alteredResistMulti} />
        </StatBarWrapper>
    );
}

const ComboStatWrapper = styled.div<{color: string}>`
    color: ${props => props.color};
    /* color: #fff48c; */
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    grid-template-rows: auto auto auto auto;
    overflow: visible;
    place-items: center;
    padding: 1vh 0.5vw;
    box-sizing: border-box;
`
const ComboStatValue = styled.span`
    overflow: visible;
    font-size: 2vw;
    font-weight: 900;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    box-sizing: border-box;
    margin: 0;
`
const ComboStatTitle = styled.span`
    opacity: 0.8;
    overflow: visible;
    font-size: 1vw;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    box-sizing: border-box;
    margin: 0;
    text-align: center;
`
const IconSVGWrapper = styled.div`
    grid-column: 1/2;
    grid-row: 1/5;
    overflow: visible;
    & svg {
        height: 4vw; width: 4vw;
        filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    }
`

const ComboStat = (props: {damageType: DamageTypeT, atkPure: number, atkMulti: number, atkTotal: number, dmgMulti: number}) => {
    return (
        <ComboStatWrapper color={ColorValue[props.damageType]}>
            <IconSVGWrapper><IconSVG IconKey={props.damageType} color={ColorValue[props.damageType]} /></IconSVGWrapper>
            <ComboStatTitle>{Keywords.English.UI.Pure} {Keywords.English.Attributes[props.damageType]}<br />{Keywords.English.UI.Attack}</ComboStatTitle>
            <ComboStatTitle>{Keywords.English.Attributes[props.damageType]}<br/>{Keywords.English.UI.Attack} %</ComboStatTitle>

            <ComboStatValue>{Math.floor(props.atkPure).toLocaleString('en-US', {maximumFractionDigits:0})}</ComboStatValue>
            <ComboStatValue>{props.atkMulti.toLocaleString('en-US', {maximumFractionDigits:2})}%</ComboStatValue>


            <ComboStatTitle>{Keywords.English.UI.Total} {Keywords.English.Attributes[props.damageType]}<br />{Keywords.English.UI.Attack}</ComboStatTitle>
            <ComboStatTitle>{Keywords.English.Attributes[props.damageType]}<br /> {Keywords.English.UI.Damage} %</ComboStatTitle>

            <ComboStatValue>{Math.floor(props.atkTotal).toLocaleString('en-US', {maximumFractionDigits:0})}</ComboStatValue>
            <ComboStatValue>{props.dmgMulti.toLocaleString('en-US', {maximumFractionDigits:2})}%</ComboStatValue>
        </ComboStatWrapper>
    );
}


const SingleStatWrapper = styled.div<{color: string}>`
    color: ${props => props.color};
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    overflow: visible;
    place-items: center;
    padding: 1vh 0.5vw;
    box-sizing: border-box;
`

const SingleStat = (props: {statKey: StatKeyT, firstValue: number, colorKey: DamageTypeT | "Attack" | "Resistance"}) => {
    return (
        <SingleStatWrapper color={ColorValue[props.colorKey]}>
                <IconSVGWrapper><IconSVG IconKey={props.statKey} color={ColorValue[props.colorKey]} /></IconSVGWrapper>
                <ComboStatTitle>{Keywords.English.UI.Pure} {props.statKey}</ComboStatTitle>
                <ComboStatValue>{Math.floor(props.firstValue).toLocaleString('en-US', {maximumFractionDigits:0})}</ComboStatValue>
        </SingleStatWrapper>
    );
}

const DoubleComboStatWrapper = styled.div<{color: string}>`
    color: ${props => props.color};
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    grid-template-rows: auto auto;
    overflow: visible;
    place-items: center;
    padding: 1vh 0.5vw;
    box-sizing: border-box;
`
const DoubleComboStat = (props: {statKey: StatKeyT, firstValue: number, secondValue: number, colorKey: DamageTypeT | "HP" | "Crit"}) => {
    return (
        <DoubleComboStatWrapper color={ColorValue[props.colorKey]}>
                <IconSVGWrapper><IconSVG IconKey={props.statKey} color={ColorValue[props.colorKey]} /></IconSVGWrapper>


                {props.colorKey!=="HP" && props.colorKey!=="Crit"?
                <>
                    <ComboStatTitle>{props.colorKey}<br />{Keywords.English.UI.Resistance}</ComboStatTitle>
                    <ComboStatTitle>{props.colorKey}<br />{Keywords.English.UI.Resistance} %</ComboStatTitle>
                </>
                :
                <>
                    <ComboStatTitle>{props.statKey}</ComboStatTitle>
                    <ComboStatTitle>{props.statKey} %</ComboStatTitle>
                </>
                }
                <ComboStatValue>{Math.floor(props.firstValue).toLocaleString('en-US', {maximumFractionDigits:0})}</ComboStatValue>
                <ComboStatValue>{props.secondValue.toLocaleString('en-US', {maximumFractionDigits:2})}%</ComboStatValue>
        </DoubleComboStatWrapper>
    );
}

export default StatBar;