import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IconSVG } from "../../../res/icon";
import { MatrixData, MaxMatrixLevel } from "../../../res/logic/data/MatrixData";
import { getMatrixStats } from "../../../res/logic/MatrixLogic";
import { baseStatKey } from "../../../res/logic/types/EquipmentTypes";
import { MatrixImages } from "../../../res/matrix";
import { selectMatrixLoadout } from "../../../store/loadoutSlice";
import { MatrixType, selectMatrixSetFromInventory, setMatrixAdvancement, setMatrixLevel } from "../../../store/matrixInventorySlice";
import { setToast } from "../../../store/toastSlice";
import { useAppSelector } from "../../hooks";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import AdvancementStars from "../Equipment/AdvancementStars";
import NumberInput from "../NumberInput";

const MatrixSetWrapper = styled.div`
    grid-column: 1/5;
    /* grid-row: 4/5; */
    height: 100%;
    width: 100%;
`
const MatrixItemWrapper = styled.div`
    display: grid;
    width: 100%;
    height: 6vw;
    margin: 0.5vw 0;
    grid-template-columns: 1.75vw 30% 2vw 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: center;
    svg {
        filter: none;
    }
`
const MatrixItemImage = styled.img`
    width: 100%; height: 100%; 
    grid-row: 1/4;
    object-fit: contain;
`
const MatrixItemSpan = styled.span`
    font-size: 1.5vw;
    text-align: center;
`

const MatrixIconWrapper = styled(SVGWrapper)`
    height: 2vw; width: 2vw;
    & svg {}
`

const MatrixLevelWrapper = styled.div`
    grid-column: 3/5;
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    & input {
        height: auto;
        text-shadow: none;
        font-size: 1.5vw;
        font-weight: 500;
        border-bottom: 0.125vw solid #DDD;
    }
    & input {
        transition: background-color 0.1s ease, color 0.1s ease;
    }
    & input:hover {
        color: #222;
        background-color: #DDD;
    }
`
const MatrixLevelSpan = styled.span`
    border-bottom: 0.125vw solid #DDD;
    font-size: 1.5vw;

`

const MatrixItem = (props: {matrix: MatrixType}) => {
    const { Type, Level, Slot, Ascension, ID } = props.matrix;
    const dispatch = useDispatch();

    const matrixStats = getMatrixStats(props.matrix);

    const HandleAdvancementChange = (v: number) => {
        if (v === Ascension) dispatch(setMatrixAdvancement({
            ID: ID,
            Slot: Slot,
            AdvancementLevel: 0
        }));
        else dispatch(setMatrixAdvancement({
            ID: ID,
            Slot: Slot,
            AdvancementLevel: v
        }));
    }

    return (
        <MatrixItemWrapper>
            <AdvancementStars Active={Ascension+1} Count={MatrixData[Type].Rarity==="SSR"?3:2} 
                CustomStyle={{gridColumn:"1/2",gridRow:"1/4", flexFlow: "row wrap", width: "100%", alignItems: "center"}}
                starSize="2vw"
                OnClick={HandleAdvancementChange}/>
            
            <MatrixItemImage src={MatrixImages[Type]} />

            {/* <MatrixItemSpan style={{textAlign: "center"}}>{Type}</MatrixItemSpan> */}

            <MatrixLevelWrapper>
                <MatrixLevelSpan>LVL</MatrixLevelSpan>
                <NumberInput 
                        value={Level}
                        minValue={0}
                        maxValue={MaxMatrixLevel}
                        UpdateValue={(newValue: number) => dispatch(setMatrixLevel({
                            ID: ID,
                            Level: newValue,
                            Slot: Slot
                        }))}
                        ExceedMax={()=> dispatch(setToast({
                            active: true,
                            color: 'rgba(256, 150, 150, 0.4)',
                            message: `Max Matrix level is ${MaxMatrixLevel}`
                        }))}
                        CustomStyle={{}} />
            </MatrixLevelWrapper>

            {(Object.keys(matrixStats) as baseStatKey[]).map(stat => 
                matrixStats[stat]!==0?
                (
                    <React.Fragment key={stat}>
                        <MatrixIconWrapper><IconSVG color="#DDD" IconKey={stat} /></MatrixIconWrapper>
                        <MatrixItemSpan>{Math.floor(matrixStats[stat]).toLocaleString('en-US', {maximumFractionDigits:0})}</MatrixItemSpan>
                    </React.Fragment>
                ):<React.Fragment key={stat}></React.Fragment> 
            )}
        </MatrixItemWrapper>
    );
}

const EmptyMatrixWrapper = styled.div`
    height: 6vw;
    margin: 0.5vw 0;
`
    

const MatrixSet = (props: {loadoutID: string}) => {
    const MatrixLoadoutIDs = useAppSelector(state => selectMatrixLoadout(state, props.loadoutID));
    const MatricesState = useAppSelector(state => selectMatrixSetFromInventory(state, MatrixLoadoutIDs));

    return (
        <MatrixSetWrapper>
            {MatricesState.Emotion !== undefined?
            <MatrixItem matrix={MatricesState.Emotion} />:<EmptyMatrixWrapper />}
            
            {MatricesState.Mind !== undefined?
            <MatrixItem matrix={MatricesState.Mind} />:<EmptyMatrixWrapper />}

            {MatricesState.Memory !== undefined?
            <MatrixItem matrix={MatricesState.Memory} />:<EmptyMatrixWrapper />}

            {MatricesState.Faith !== undefined?
            <MatrixItem matrix={MatricesState.Faith} />:<EmptyMatrixWrapper />}
        </MatrixSetWrapper>

    );
}

export default MatrixSet;