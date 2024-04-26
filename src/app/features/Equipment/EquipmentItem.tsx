import styled from "styled-components";
import { Fragment } from "react";
import { BaseEquipmentStats } from "../../../res/logic/data/RawBaseEquipmentStats";
import { baseStatKey, EnhancementLevelCutoffT, EnhancementLevelT, enhancementStatKey, EquipmentKey, EquipmentPieceI, MaxValidEnhancementCutoff, MaxValidEnhancementLevel, StatKeyT } from "../../../res/logic/types/EquipmentTypes";
import { Keywords } from "../../../store/data";
import { getBaseEquipmentBonus, getEnhancementEquipmentBonus } from "../../../res/logic/EquipmentLogic";
import { IconSVG } from "../../../res/icon";
import { EquipmentImages } from "../../../res/equipment";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import NumberInput from "../NumberInput";
import { setEquipmentEnhancementLevel } from "../../../store/characterSlice";
import { useDispatch } from "react-redux";
import { setToast } from "../../../store/toastSlice";
import { RandomEnhancementInput } from "./CustomArmoryInput";
import { addRandomStatToArmoryEquipmentPiece, changeEquipmentPieceRandomKeyFromArmory, deleteEquipmentPieceFromArmory, editPieceRandomFromArmory } from "../../../store/equipmentInventorySlice";
import { ReactComponent as AddSVG } from "../../../res/svg/Add.svg";
import { ColorValue } from "../../../res/logic/data/UIValues";
import { setEquippedEquipmentPiece } from "../../../store/loadoutSlice";

const EquipmentItemWrapper = styled.div`
    grid-column: 2/3; grid-row: 2/3;
    height: 100%; width: 100%;
    position: relative;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    grid-column-gap: 0.5vw; padding: 0.5vw;

    box-sizing: border-box;
    align-items: flex-start; justify-content: center;
    overflow: visible;
`

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    margin-top: 0.5vw;
    grid-row-gap: 0.5vw;
    overflow: visible;
`

const Header = styled.span`
    font-weight: 900;
    font-size: 1.5vw;
    text-shadow: none;
    border-bottom: 0.125vw solid #DDD;
    border-top: 0.125vw solid #DDD;
    grid-column: 1/3;
    box-sizing: border-box;
    text-align: center;
`

const EquipmentHeadSpan = styled.span`
    font-size: 1.5vw;
    text-align: center;
    box-sizing: border-box;
`

const StatPanel = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 3vw 35% 1fr;
    align-items: center;
    box-sizing: border-box;
    padding: 1vh;
    padding-top: 0;
    border: 0.125vw solid #DDD;
`
const RandomStatPanel = styled(StatPanel)`
    grid-template-columns: 3vw 65% 1fr;
    & input {
        font-size: 1.5vw; 
        transition: background-color 0.1s ease, color 0.1s ease;
    }
    & input:hover {
        background-color: #FFF;
        color: #222;
    }
    overflow: visible;
    & .css-b62m3t-container {
        overflow: visible;
    }
`

const StatHeader = styled.h1`
    font-size: 1.5vw;
    grid-column: 1/4;
    text-shadow: none;
    border-bottom: 0.125vw solid #DDD;
`
const Label = styled.span`
    background-color: inherit;
    text-align: center;
    width: 100%;
    font-size: 1.5vw;
`

const IconSVGWrapper = styled(SVGWrapper)`
    & svg {
        width: 2vw; height: 2vw;
    }
`

const EquipmentHeadWrapper = styled.div`
    display: grid;
    grid-template-columns: 25% 60% 15%;
    grid-auto-rows: auto;
    border: 0.125vw solid #DDD;
    box-sizing: border-box;
    align-items: center;
`
const EquipmentImage = styled.img`
    height: 100%; width: 100%;
    grid-column: 1/2;
    grid-row: 1/4;
    object-fit: contain;
    border-right: 0.125vw solid white;
    box-sizing: border-box;
`
const EquipmentItemButtonsWrapper = styled.div`
    height: 100%; width: 100%;
    grid-column: 2/4;
    grid-row: 1/4;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 50% 50%;
`
const Button = styled.button`
    /* margin-top: 1vh; */
    height: 100%;
    box-sizing: border-box;
    color: #111;
    border: none;
    font-family: inherit;
    font-size: 1.5vw;
    cursor: pointer;
    transition: background-color 0.1s ease, color 0.1s ease;
    `

const EquipButton = styled(Button)<{equipped:boolean}>`
    background-color: ${props => props.equipped?"#b0ffc3":"#b0fcff"};
    &:hover {
        background-color: ${props => props.equipped?"#4bff75":"#4af9ff"};
    }
`
const DeleteButton = styled(Button)`
    background-color: #ff8686;
    &:hover {
        background-color: #ff4141;
    }
`

const AddStat = styled.div`
    height: 100%;
    margin-top:1vh;
    grid-column: 1/4;
    padding: 0;
    text-align: center;
    box-sizing: border-box; 
    border: 0.125vw solid #DDD;
    transition: all 0.1s ease;
    cursor: pointer;
    &:hover{
        background-color: #DDD;
        color: #333;
    }
    &::after {
        content: "+";
        font-size: 1.25vw;
        position: relative;
        top: 10%;
    }
`
const RemovePreviewSVGWrapper = styled(SVGWrapper)`
    height: 2vw; width: 2vw;
    position: absolute;
    top: 0.5vw; right: 2vw;
    cursor: pointer;
    box-sizing: border-box;
    fill: #DDD;
    transition: fill 0.1s ease;
    & svg {
        transform: rotate(45deg);
        width: 1.5vw; height: 1.5vw;
    }
`

const EquipmentItem = (props: {data: EquipmentPieceI, enhancementLevel:number, isEquipped: boolean, setPreviewItem:(arg0:{ID:string,type:(EquipmentKey|"")})=>void}) => {
    const dispatch = useDispatch();
    // const actuallyEquippedItem = useAppS
    const enhancementCutoff = Math.min(Math.floor(props.enhancementLevel/5),MaxValidEnhancementCutoff) as EnhancementLevelCutoffT;
    const enhancementLevel = Math.min(props.enhancementLevel,MaxValidEnhancementLevel) as EnhancementLevelT;

    const HandleKeyChange = (oldKey: StatKeyT, newKey: StatKeyT) => {
        dispatch(changeEquipmentPieceRandomKeyFromArmory({
            'ID': props.data.ID,
            'EquipmentType': props.data.EquipmentType,
            'oldKey': oldKey,
            'newKey': newKey
        }));
    }

    const HandleStatChange = (value: string, RandomStat: StatKeyT) => {
        let actualValue = 0;
        if (value !== '') {
            let floatValue = parseFloat(value);
            if (0 <= floatValue) actualValue = floatValue;
        } 
        dispatch(editPieceRandomFromArmory({
            'ID': props.data.ID,
            'EquipmentType': props.data.EquipmentType,
            'edit': {
                [RandomStat]: actualValue
            }
        }));
    
    }

    const HandleAddStat = () => {
        dispatch(addRandomStatToArmoryEquipmentPiece({
            'EquipmentType': props.data.EquipmentType,
            'ID': props.data.ID,
        }));
    }

    const HandleDelete = () => {
        dispatch(deleteEquipmentPieceFromArmory({
            EquipmentType: props.data.EquipmentType,
            ID: props.data.ID
        }));
        if (props.isEquipped) dispatch(setEquippedEquipmentPiece({
            ID: '',
            EquipmentType: props.data.EquipmentType
        }));
    };

    return (
        <EquipmentItemWrapper>
            <Header>Edit: {Keywords.English.Equipment.Rarity[props.data.Rarity]} {Keywords.English.Equipment.Type[props.data.Rarity][props.data.EquipmentType]}</Header>
            <RemovePreviewSVGWrapper><AddSVG onClick={()=>props.setPreviewItem({ID:"",type:""})}/></RemovePreviewSVGWrapper>

            <ColumnWrapper>
                <RandomStatPanel>
                    <StatHeader>Random</StatHeader>
                    {(Object.keys(props.data.random) as StatKeyT[]).map(
                        (randomStat) => (
                            <Fragment key={randomStat}>
                                <IconSVGWrapper><IconSVG IconKey={randomStat} color={ColorValue[randomStat]} /></IconSVGWrapper>
                                <RandomEnhancementInput 
                                    EquipmentType={props.data.EquipmentType}
                                    RandomStat={randomStat}
                                    value={props.data.random[randomStat]??0}
                                    Keys={Object.keys(props.data.random) as StatKeyT[]}
                                    HandleStatChange={HandleStatChange}
                                    HandleKeyChange={HandleKeyChange} 
                                />
                            </Fragment>
                        )
                    )}
                    {(Object.keys(props.data.random).length < 4)?<AddStat onClick={HandleAddStat} />:<></>}
                </RandomStatPanel>

                    {props.data.breakthrough?
                        <RandomStatPanel>
                            <StatHeader>Breakthrough</StatHeader>
                                <IconSVGWrapper><IconSVG IconKey={"VoltAttack"} color={"#DDD"} /></IconSVGWrapper>
                                <Label>{Keywords.English.Stat["VoltAttack"]}</Label>
                                <Label>{Math.floor(props.data.random["VoltAttack"]??0)
                                            .toLocaleString('en-US', {maximumFractionDigits:0})}</Label>

                                <IconSVGWrapper><IconSVG IconKey={"FrostAttack"} color={"#DDD"} /></IconSVGWrapper>
                                <Label>{Keywords.English.Stat["FrostAttack"]}</Label>
                                <Label>{Math.floor(props.data.random["FrostAttack"]??0)
                                            .toLocaleString('en-US', {maximumFractionDigits:0})}</Label>
                        </RandomStatPanel>:
                        <></>
                    }

                    {props.data.titan?
                        <RandomStatPanel>
                            <StatHeader>Titan</StatHeader>
                            <IconSVGWrapper><IconSVG IconKey={"DischargeDamage%"} color={"#DDD"} /></IconSVGWrapper>
                            <Label>{Keywords.English.Stat["DischargeDamage%"]}</Label>
                            <Label>{Math.floor(props.data.random["DischargeDamage%"]??0)
                                        .toLocaleString('en-US', {maximumFractionDigits:0})}</Label>
                        </RandomStatPanel>:<></>
                    }

            </ColumnWrapper>

            <ColumnWrapper>
                <EquipmentHeadWrapper>                    
                    <EquipmentImage src={EquipmentImages[props.data.Rarity][props.data.EquipmentType]} />
                    {/* <EquipmentHeadSpan>{Keywords.English.UI.EnhancementLevel}</EquipmentHeadSpan>
                    <NumberInput 
                        value={props.enhancementLevel}
                        minValue={0}
                        maxValue={MaxValidEnhancementLevel}
                        UpdateValue={(newValue: number) => {
                            dispatch(setEquipmentEnhancementLevel({
                                EquipmentType: props.data.EquipmentType,
                                Level: newValue
                            }))
                        }}
                        ExceedMax={()=> dispatch(setToast({
                            active: true,
                            color: 'rgba(256, 150, 20, 0.4)',
                            message: `Max Gear level is ${MaxValidEnhancementLevel}`
                        }))}
                        CustomStyle={{fontSize: "1.5vw", textShadow:"none", fontWeight: "500", textDecoration: "underline"}} /> */}
                        {/* <div></div>
                        <div></div> */}

                    {/* <EquipmentHeadSpan>Breakthrough Level</EquipmentHeadSpan>
                    <NumberInput 
                        value={props.enhancementLevel}
                        minValue={0}
                        maxValue={MaxValidEnhancementLevel}
                        UpdateValue={(newValue: number) => {
                            dispatch(setEquipmentEnhancementLevel({
                                EquipmentType: props.data.EquipmentType,
                                Level: newValue
                            }))
                        }}
                        ExceedMax={()=> dispatch(setToast({
                            active: true,
                            color: 'rgba(256, 150, 20, 0.4)',
                            message: `Max Gear level is ${MaxValidEnhancementLevel}`
                        }))}
                        CustomStyle={{fontSize: "1.5vw", textShadow:"none", fontWeight: "500", textDecoration: "underline"}} /> */}

                    {/* <EquipmentHeadSpan>Loadout</EquipmentHeadSpan>
                    <Label>Wah</Label> */}

                    {/* <NumberInput 
                        value={props.enhancementLevel}
                        minValue={0}
                        maxValue={MaxValidEnhancementLevel}
                        UpdateValue={(newValue: number) => {
                            dispatch(setEquipmentEnhancementLevel({
                                EquipmentType: props.data.EquipmentType,
                                Level: newValue
                            }))
                        }}
                        ExceedMax={()=> dispatch(setToast({
                            active: true,
                            color: 'rgba(256, 150, 150, 0.4)',
                            message: `Max Gear level is ${MaxValidEnhancementLevel}`
                        }))}
                        CustomStyle={{fontSize: "1.5vw", textShadow:"none", fontWeight: "500", textDecoration: "underline"}} /> */}

                    <EquipmentItemButtonsWrapper>
                        <EquipButton 
                            equipped={props.isEquipped}
                            onClick={() => {
                                if (props.isEquipped) dispatch(setEquippedEquipmentPiece({
                                    ID: '',
                                    EquipmentType: props.data.EquipmentType
                                }));
                                else dispatch(setEquippedEquipmentPiece({
                                    ID: props.data.ID,
                                    EquipmentType: props.data.EquipmentType
                                }));
                            }}
                            >
                                {props.isEquipped?"Equipped":"Equip"}</EquipButton>
                        <DeleteButton onClick={HandleDelete}>Delete</DeleteButton>
                    </EquipmentItemButtonsWrapper>
                </EquipmentHeadWrapper>

                <StatPanel>
                    <StatHeader>Base</StatHeader>
                    {(Object.keys(BaseEquipmentStats[props.data.EquipmentType][props.data.Rarity]) as baseStatKey[]).map(
                        (baseStat) =>
                            <Fragment key={baseStat}>
                                <IconSVGWrapper><IconSVG IconKey={baseStat} color={ColorValue[baseStat]} /></IconSVGWrapper>
                                <Label style={{color:ColorValue[baseStat]}}>{Keywords.English.Stat[baseStat]}</Label>
                                <Label style={{color:ColorValue[baseStat]}}>{`${
                                        (BaseEquipmentStats[props.data.EquipmentType][props.data.Rarity][baseStat] as any).toLocaleString('en-US', {maximumFractionDigits:0})
                                    } + ${
                                        Math.floor(getBaseEquipmentBonus(props.data.EquipmentType, baseStat, enhancementLevel))
                                            .toLocaleString('en-US', {maximumFractionDigits:0})
                                    }`}
                                </Label>
                            </Fragment>
                    )}
                </StatPanel>
                <StatPanel>
                    <StatHeader>Enhancement</StatHeader>
                    {(Object.keys(getEnhancementEquipmentBonus(props.data.EquipmentType)[enhancementCutoff]) as enhancementStatKey[]).map(
                        (enhancementStat: enhancementStatKey) => (
                            <Fragment key={enhancementStat}>
                                <IconSVGWrapper><IconSVG IconKey={enhancementStat} color={ColorValue[enhancementStat]} /></IconSVGWrapper>
                                <Label style={{color:ColorValue[enhancementStat]}}>{Keywords.English.Stat[enhancementStat]}</Label>
                                <Label style={{color:ColorValue[enhancementStat]}}>{Math.floor(getEnhancementEquipmentBonus(props.data.EquipmentType)[enhancementCutoff][enhancementStat]??0)
                                            .toLocaleString('en-US', {maximumFractionDigits:0})}</Label>
                            </Fragment>
                        )
                    )} 
                </StatPanel>
                </ColumnWrapper>

        </EquipmentItemWrapper>
    );
}

export default EquipmentItem;