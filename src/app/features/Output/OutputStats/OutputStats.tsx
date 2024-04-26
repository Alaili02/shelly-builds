import styled from "styled-components";
import { IconSVG } from "../../../../res/icon";
import { StatKeyT } from "../../../../res/logic/types/EquipmentTypes";
import { selectAllStats, selectStat } from "../../../../store/characterSlice";
import { Keywords } from "../../../../store/data";
import { selectStatFromEquipment } from "../../../../store/loadoutSlice";
import { useAppSelector } from "../../../hooks";
import { SVGWrapper } from "../../../Styles/PrimaryStyles";

const OutputStatsWrapper = styled.div`
    height: 380px;
    box-sizing: border-box;
    width: 100%;
    /* backdrop-filter: blur(10px); */
    display: grid;
    grid-template-columns: 200px 200px 200px;
    grid-template-rows: 100%;
    align-items: center;
`

const OutputStats = () => {
    const {
        HP, Level, Suppressor,
        FlameAttack, FrostAttack, VoltAttack, PhysicalAttack, AlteredAttack,
        Crit, CritRate, CritDamage,
        FlameResistance, FrostResistance, VoltResistance, PhysicalResistance, AlteredResistance, Attack
    } = useAppSelector((state) => selectAllStats(state));


    const physicalPureAtk = useAppSelector(state => selectStatFromEquipment(state, "PhysicalAttack"));
    const PhysicalDamage = useAppSelector(state => selectStat(state, "PhysicalDamage%"));

    const PhysicalAttackMulti = useAppSelector((state) => selectStat(state, "PhysicalAttack%"));

    return (
        <OutputStatsWrapper>
            <ColumnWrapper>
                <Item itemKey="HP" value={HP} />
                <Item itemKey="Crit" value={Crit} />
                <Item itemKey="CritRate%" value={CritRate} percent={true} />
                <Item itemKey="CritDamage%" value={CritDamage} percent={true} />
            </ColumnWrapper>

            <ColumnWrapper>
                <Item itemKey="Attack" value={Attack} />
                <Item itemKey="PhysicalAttack" value={physicalPureAtk} />
                <Item itemKey="PhysicalAttack" value={PhysicalAttackMulti} percent={true} />

            </ColumnWrapper>

            <ColumnWrapper>
                <Item itemKey="PhysicalAttack" value={PhysicalAttack} />
                <Item itemKey="PhysicalDamage%" value={PhysicalDamage} percent={true} />
            </ColumnWrapper>
        </OutputStatsWrapper>
    );
}

export default OutputStats;

const Title = styled.span`
    font-size: 60px;
    grid-column: 2/4;
    text-align: center;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    font-size: 900;
`

const ColumnWrapper = styled.div`
    display: grid;
    height: fit-content;
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto;
    grid-row-gap: 12px;
`

const ItemWrapper = styled.div`
    display: grid;
    height: fit-content;
    width: 200px;
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