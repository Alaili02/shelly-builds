import { useEffect, useRef } from "react";
import styled from "styled-components";
import { IconSVG } from "../../../../res/icon";
import { MatrixData } from "../../../../res/logic/data/MatrixData";
import { OutputMatrixImages } from "../../../../res/matrix";
import { MatrixSetIDT, MatrixType, selectMatrixSetFromInventory } from "../../../../store/matrixInventorySlice";
import { useAppSelector } from "../../../hooks";
import { SVGWrapper } from "../../../Styles/PrimaryStyles";
import OutputAdvancementStars from "../OutputAdvancementStars";

const MatricesWrapper = styled.div`
    grid-column: 1/3;
    position: relative;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 95px;
    padding-top: 15px;
    grid-row-gap:15px;
    box-sizing: border-box;
    overflow: visible;
`

const MatrixWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 100%;
    justify-content: start;
    align-items: center;
    overflow: visible;
`

const MatrixImageWrapper = styled.div`
    position: relative;

    grid-column: 2 / 3;

    height: 100%;
    width: 100%;

    box-sizing: border-box;
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MatrixLevel = styled.span`
    z-index: 1;
    position: absolute;
    bottom: 0%; right: 4%;
    font-size: 30px; font-weight: 900;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    overflow: visible;
`


const MatrixIconSVGWrapper = styled(SVGWrapper)`
    position: absolute;
    top: 0;
    left: 6%;
    z-index: 5;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    & svg {
        width: 30px; height: 30px;
    }
`

const OutputMatrixView = (props: {MatrixIDSet: MatrixSetIDT}) => {
    const {Emotion, Mind, Memory, Faith} = useAppSelector(state => selectMatrixSetFromInventory(state, props.MatrixIDSet));

    return (
        <MatricesWrapper>
            {Emotion !== undefined?
            <Matrix matrix={Emotion} />
            :<div></div>}

            {Mind !== undefined?
            <Matrix matrix={Mind} />
            :<div></div>}

            {Memory !== undefined?
            <Matrix matrix={Memory} />
            :<div></div>}

            {Faith !== undefined?
            <Matrix matrix={Faith} />
            :<div></div>}
            
        </MatricesWrapper>
    );
}

const Matrix = (props: {matrix: MatrixType }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const img = new Image(); img.src = OutputMatrixImages[props.matrix.Type];
        const draw = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                // canvas.style.width = "100%";
                // canvas.style.height = "100%";
                canvas.width = 95;
                canvas.height = 95;
    
                if (context) {
                    // context.imageSmoothingQuality = "high";
                    // context.imageSmoothingEnabled = true;
                    img.onload = () => {
                        context.drawImage(img, 0, 0, 95, 95);
                    };
                }
            }
        }
        draw();
        }, [props.matrix.ID]);

    return (
        <MatrixWrapper>
            <MatrixImageWrapper>
                <MatrixIconSVGWrapper><IconSVG IconKey={props.matrix.Slot} color="#EEE"/></MatrixIconSVGWrapper>
                <MatrixLevel>{props.matrix.Level}</MatrixLevel>
                <CanvasWrapper>
                    <canvas ref={canvasRef} />
                </CanvasWrapper>
                {/* <MatrixImage src={MatrixImages[props.matrix.Type]} /> */}
            </MatrixImageWrapper> 
            {(props.matrix !== undefined)?
                <>
                    <OutputAdvancementStars
                        Active={props.matrix.Ascension+1}
                        Count={MatrixData[props.matrix.Type].Rarity=="SR"?2:3}
                        OnClick={()=>{}}
                        CustomStyle={{gridColumn: '1/2', gridRow: '1/3', flexFlow: 'column nowrap', height: '85px', width: '30px'}} />
                </>
            :<></>}
        </MatrixWrapper>
    );
}

const CanvasWrapper = styled.div`
    z-index: -1;
    width: fit-content; height: 100%;
    display: flex;
    justify-content: center;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    overflow: visible;
`

export default OutputMatrixView;