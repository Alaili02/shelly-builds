import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IconSVG } from "../../../res/icon";
import { MatrixData } from "../../../res/logic/data/MatrixData";
import { MatrixImages } from "../../../res/matrix";
import { selectMatrixLoadout, selectMatrixLoadoutEquippedBy, setMatrixInMatrixLoadout } from "../../../store/loadoutSlice";
import { deleteMatrixFromInventory, MatrixType, setMatrixEquippedBy } from "../../../store/matrixInventorySlice";
import { useAppSelector } from "../../hooks";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import { ReactComponent as TrashSVG } from "../../../res/svg/TrashCan.svg"
import OutputAdvancementStars from "../Output/OutputAdvancementStars";


const MatrixItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 20% 2vw auto 1fr auto 4vw;
    grid-template-rows: 100%;
    box-sizing: border-box;
    border-top: 0.125vw solid rgba(255, 255, 255, 0.6);
    align-items: center;
    :last-child {
        border-bottom: 0.125vw solid rgba(255, 255, 255, 0.6);
    }
`

const MatrixItemImage = styled.img`
    height: 100%; width: auto;  object-fit: contain;
    padding: 0.5vw;
    transition: border 0.1s ease;
    box-sizing: border-box;
    justify-self: center;
`

const MatrixImageWrapper = styled.div`
    width: 100%; height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr auto;
    padding: 0.25vw;
    box-sizing: border-box;
    & svg {
        filter: none;
    }
`


const MatrixItemLevel = styled.span`
    font-size: 1.25vw;
    margin-top: auto;
    margin-bottom: 0.5vw;
    text-align: center;
`

const MatrixItemTitleWrapper = styled.div`
    height: 100%; width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    & svg {
        width: 1.1vw;
        filter: none;
    }
`

const MatrixItemSpan = styled.span`
    font-size: 1vw;
    overflow: visible;
    :first-child {
        font-weight: 900;
        font-size: 1.5vw;
    }
`
const MatrixTagWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
`

const MatrixIconSVGWrapper = styled(SVGWrapper)`
    margin-top: auto;
    & svg {
        width: 3vw; height: 2vw;
    }
`


const MatrixInventoryItem = (props: {data:MatrixType, matrixLoadoutIDs: {[o in 1|2|3]: string}, isEquippedIndex: 0|1|2|3}) => {
    const { ID, Type, Slot, Level, Ascension, EquippedBy } = props.data;
    const dispatch = useDispatch();
    const loadoutEquippedByWeapon = useAppSelector(state => selectMatrixLoadoutEquippedBy(state, EquippedBy));

    const MatrixLoadoutSets = [
        useAppSelector(state => selectMatrixLoadout(state, props.matrixLoadoutIDs[1])),
        useAppSelector(state => selectMatrixLoadout(state, props.matrixLoadoutIDs[2])),
        useAppSelector(state => selectMatrixLoadout(state, props.matrixLoadoutIDs[3])),
    ];

    const HandleEquip = (order: 1|2|3) => {
        // Unequip this matrix from original loadout
        // console.log(`Set loadout \"${props.data.EquippedBy}\" equips this \"\"`);
        dispatch(setMatrixInMatrixLoadout({
            matrixID: "",
            matrixLoadoutID: EquippedBy,
            slot: Slot
        }));

        // update overwritten matrix equipped by in inventory
        // console.log(`Set old \"${overwrittenMatrixID}\" equipped by loadout \"\"`);
        const overwrittenMatrixID = MatrixLoadoutSets[order-1][Slot];
        dispatch(setMatrixEquippedBy({
            ID: overwrittenMatrixID,
            Slot: Slot,
            EquippedByID: ""
        }));

        // if matrix is already equipped in this slot in this loadout
        if (MatrixLoadoutSets[order-1][Slot] === ID) return;

        // Equip this matrix in new loadout overwriting any original matrix
        // console.log(`Set loadout \"${props.matrixLoadoutIDs[order]}\" equips this \"${ID}\"`);
        dispatch(setMatrixInMatrixLoadout({
            matrixID: ID,
            matrixLoadoutID: props.matrixLoadoutIDs[order],
            slot: Slot
        }));

        // update this matrix equipped by in inventory
        // console.log(`Set this \"${ID}\" equipped by loadout \"${props.matrixLoadoutIDs[order]}\"`);
        dispatch(setMatrixEquippedBy({
            ID: ID,
            Slot: Slot,
            EquippedByID: props.matrixLoadoutIDs[order]
        }));
    }

    const HandleDelete = () => {
        // Unequip this matrix from original loadout
        dispatch(setMatrixInMatrixLoadout({
            matrixID: "",
            matrixLoadoutID: props.data.EquippedBy,
            slot: Slot
        }));

        dispatch(deleteMatrixFromInventory({
            ID: ID,
            Slot: Slot
        }));
    }

    return (
        <MatrixItemWrapper>
                <MatrixItemImage 
                    src={MatrixImages[Type]}
                    onClick={() => {}}
                />

                {/* <AdvancementStars starSize="1.75vw" Active={Ascension+1} Count={3} CustomStyle={{margin: 0, justifyContent: "flex-start", filter: "none"}} OnClick={()=>{}} /> */}

            <MatrixEquipPickerWrapper>
                <MatrixEquipPick onClick={()=>HandleEquip(1)} active={Object.values(MatrixLoadoutSets[0]).includes(ID)}><span>1</span></MatrixEquipPick>
                <MatrixEquipPick onClick={()=>HandleEquip(2)} active={Object.values(MatrixLoadoutSets[1]).includes(ID)}><span>2</span></MatrixEquipPick>
                <MatrixEquipPick onClick={()=>HandleEquip(3)} active={Object.values(MatrixLoadoutSets[2]).includes(ID)}><span>3</span></MatrixEquipPick>
            </MatrixEquipPickerWrapper>
            <MatrixTagWrapper>
                <MatrixIconSVGWrapper><IconSVG IconKey={Slot} color="#EEE"/></MatrixIconSVGWrapper>
                <MatrixItemLevel>{Level}</MatrixItemLevel>
            </MatrixTagWrapper>

            <MatrixItemTitleWrapper>
                <MatrixItemSpan>{Type}</MatrixItemSpan>
                <MatrixItemSpan>{Slot}</MatrixItemSpan>
                <OutputAdvancementStars Active={Ascension+1} Count={MatrixData[Type].Rarity==="SSR"?3:2} CustomStyle={{margin: 0, justifyContent: "left", filter: "none"}} OnClick={()=>{}} />
            </MatrixItemTitleWrapper>

            <MatrixEquippedByWrapper>
                <EquippedBySpan>Equipped by</EquippedBySpan>
                <EquippedBySpan>{loadoutEquippedByWeapon?loadoutEquippedByWeapon:"-"}</EquippedBySpan>
            </MatrixEquippedByWrapper>

            <MatrixDeleteWrapper>
                <TrashIconSVGWrapper onClick={HandleDelete}><TrashSVG /></TrashIconSVGWrapper>
            </MatrixDeleteWrapper>
        </MatrixItemWrapper>
    );
}

const MatrixDeleteWrapper = styled.div`
    padding-right: 2vw;
    box-sizing: border-box;
`

const TrashIconSVGWrapper = styled(SVGWrapper)`
    opacity: 0.2;
    cursor: pointer;
    transition: opacity ease 0.1s;
    :hover {
        opacity: 1;
    }
    & svg {
        fill: #ddd;
    }
`

const MatrixEquippedByWrapper = styled.div`
    width: 100%; height: fit-content;
    padding: 0 1vw;
    box-sizing: border-box;
    justify-content: right;
    align-items: center;
    display: grid;
    grid-template-rows: auto auto;
`

const EquippedBySpan = styled.span`
    font-size: 1vw;
    text-align: center;
    &:last-child {
        font-size: 1.25vw;
    }
`

const MatrixEquipPickerWrapper = styled.div`
    width: 2vw; height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr 1fr;
`
const MatrixEquipPick = styled.div<{active:boolean}>`
    width: 100%; height: 100%;
    background-color: #444;
    opacity: ${props => props.active?"1":"0.2"};
    color: ${props => props.active?"#DDD":"#DDD"};
    font-size: 1.5vw;
    text-align: center;
    display: flex;
    place-content: center; place-items: center;
    transition: opacity 0.1s ease;
    cursor: pointer;
    &:hover {
        opacity: ${props => props.active?"1":"0.8"};
    }
`

export default MatrixInventoryItem;