import { useState, createRef } from "react";
import styled, { keyframes } from "styled-components";
import Equipment from "./features/Equipment/Equipment";
import FilePicker from "./features/FilePicker/FilePicker";
import Toast from "./features/Toast";
import { SVGWrapper } from "./Styles/PrimaryStyles";
import {ReactComponent as CameraSVG } from "../res/svg/Camera.svg";
import {ReactComponent as SaveSVG } from "../res/svg/Save.svg";
import {ReactComponent as ArrowDownSVG } from "../res/svg/ArrowDown.svg";
import ExportImage from "./features/ExportImage/ExportImage";
import Output from "./features/Output/Output";
import StatBar from "./features/StatBar/StatBar";
import Weapon from "./features/Weapon/Weapon";
import Character from "./features/Character/Character";
import Info from "./features/Info/Info";



const MainOuterWrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`

const MainInnerWrapper = styled.div`
    display: grid;
    height: 100%;
    grid-template-columns: 22vw 2vw 76vw;
`

const SVG = styled.svg`
    height: 100%; width: 100%;
    padding: 1.5vw;
    box-sizing: border-box;
    fill: white;
    cursor: pointer;
    transition: all 0.1s ease;
    :hover {
        fill: #aaa;
    }
`

const LeftWrapper = styled.div`
    grid-column: 1/2;
    overflow: visible;
`

const GoUp =  keyframes`
    0% {transform: translateY(-100vh);}
    100% {transform: translateY(0vh);}
`
const GoDown = keyframes`
    0% {transform: translateY(-100vh);}
    100% {transform: translateY(-200vh);}
`

const RightWrapper = styled.div`
    position: relative;
    height: 300vh;
    grid-column: 3/4;
    display: grid;
    overflow: visible;
    grid-template-rows: 100vh 100vh 100vh;
    transform: translateY(-100vh) translateX(0vw);
    &.AnimateUp{
        animation-name: ${GoUp};
        animation-fill-mode: forwards;
        animation-duration: 0.2s;
        animation-timing-function: ease;
    }
    &.AnimateDown{
        animation-name: ${GoDown};
        animation-fill-mode: forwards;
        animation-duration: 0.2s;
        animation-timing-function: ease;
    }
`
    

const NavWrapper = styled.div`
    height: 100vh;
    background-color: #333;
    grid-column: 2/3;
    display: flex; place-items: center; place-content: center;
    flex-flow: column nowrap;
    align-content: center;
    box-shadow: -20px 0px 30px 10px rgba(0,0,0,0.25);
    /* @media (max-aspect-ratio: 4/3) {
        grid-column: 2/3;
    } */
`

const NavButton = styled.div`
    width: 90%;
    padding: 5%;
    height: 10vh;
    text-align: center;
    cursor: pointer;
    display: flex;
    place-items: center;
    transition: background-color 0.2s ease;
    & > svg > polygon.foreground, & > svg > circle.foreground, & > svg > rect.foreground{
        transition: fill 0.2s ease;
        fill: #ccc;
    }
    &:hover > svg > polygon.foreground, &:hover > svg > circle.foreground, &:hover > svg > rect.foreground{
        fill: #222;
    }
    :hover{
        background-color: #555;
        fill: #222 !important;
    }
`

const LeftContainer = () => {
    return (
        <LeftWrapper>
            <StatBar />
            {/* <ViewPage /> */}
        </LeftWrapper>
    );
}


const RightContainer = (props: {AnimateUp:boolean, AnimateDown:boolean, ActiveIndex: number, onAnimationEnd:any, RightScrollUp: any, RightScrollDown: any}) => {

    // const loop = [<WIP />, <WeaponView />, <Equipment />]
    const loop = ['3/4', '2/3', '1/2']

    let activeIndex = props.ActiveIndex % loop.length;
    let lowerIndex = (props.ActiveIndex - 1) % loop.length;
    let upperIndex = (props.ActiveIndex + 1) % loop.length;

    if (activeIndex < 0) activeIndex = loop.length + activeIndex;
    if (lowerIndex < 0) lowerIndex = loop.length +  lowerIndex;
    if (upperIndex < 0) upperIndex = loop.length +  upperIndex;

    return (
        <RightWrapper
            className={props.AnimateUp?'AnimateUp':props.AnimateDown?'AnimateDown':''}
            onAnimationStart={(event) => setTimeout(() => props.onAnimationEnd(event.animationName), 210)}>
            <Character customStyle={{gridRow: loop[upperIndex]}} />
            <Equipment customStyle={{gridRow: loop[lowerIndex]}} />
            <Weapon customStyle={{gridRow: loop[activeIndex]}}/>
        </RightWrapper>

    );
}

const NavSVGWrapper = styled(SVGWrapper)`
    height: 10vh;
    overflow: hidden;
    cursor: pointer;
    transition: background-color 0.1s ease;
    .fg {
        transition: fill 0.1s ease;
        fill: white;
    }
    :hover .fg { fill: #222;}
    :hover{
        background-color: #555;
        fill: #222 !important;
    }
    :hover svg path.arrow {
        stroke: #222 !important; 
    }
`
const SmallSVGWrapper = styled(NavSVGWrapper)`
    width: 76%; 
    padding: 12%;
`
const LargeSVGWrapper = styled(NavSVGWrapper)`
    width: 90%; 
    padding: 5%;
`

const NavContainer = (props: {RightScrollUp:any, RightScrollDown: any, setFilePickerVisible: any, handleExport: any, setInfoVisible: any}) => {

    return (
        <NavWrapper>
            <LargeSVGWrapper onClick={props.RightScrollUp} >
                <ArrowDownSVG style={{transform: "rotate(180deg)"}} />
            </LargeSVGWrapper>
            <SmallSVGWrapper onClick={() => {props.setFilePickerVisible(true)}} >
                <SaveSVG />
            </SmallSVGWrapper>
            {/* <SmallSVGWrapper onClick={()=>{props.setInfoVisible(true)}}>
                <CameraSVG />
            </SmallSVGWrapper> */}
            <SmallSVGWrapper onClick={props.handleExport}>
                <CameraSVG />
            </SmallSVGWrapper>
            <LargeSVGWrapper onClick={props.RightScrollDown} >
                <ArrowDownSVG />
            </LargeSVGWrapper>
        </NavWrapper>
    )
}


const Main = () => {
    const [rightActiveIndex, setRightActiveIndex] = useState(1); 
    const [animateUp, setAnimateUp] = useState(false);
    const [animateDown, setAnimateDown] = useState(false);
    const [filePickerVisible, setFilePickerVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [exportImageVisible, setExportImageVisible] = useState(false);
    // const ViewportHeight = (useTheme() as any)['ViewportHeight'];
    const exportRef = createRef<HTMLDivElement>();

    const RightScrollUp = () => {
        if (!animateDown && !animateUp) setAnimateUp(true);
    }
    const RightScrollDown = () => {
        if (!animateDown && !animateUp) setAnimateDown(true);
    }
    const DoneAnimating = (animationName: string) => {
        if (animationName === GoDown.getName()) {
            setRightActiveIndex(rightActiveIndex+1);
        } else if (animationName === GoUp.getName()) {
            setRightActiveIndex(rightActiveIndex-1);
        }
        setAnimateUp(false);
        setAnimateDown(false);
    }

    return (
            <MainOuterWrapper>
                <Sheet />
                <OutputWrapper>
                    <Output ExportRef={exportRef} />
                </OutputWrapper>
                {exportImageVisible?
                    <ExportImage ExportRef={exportRef} setVisible={setExportImageVisible}/>:<></>
                }
                <Toast />

                <Info visible={infoVisible} setVisible={setInfoVisible} />
                <FilePicker visible={filePickerVisible} setVisible={setFilePickerVisible} />

                <MainInnerWrapper>
                    <LeftContainer />
                    <NavContainer
                        RightScrollUp={RightScrollUp}
                        RightScrollDown={RightScrollDown} 
                        setFilePickerVisible={setFilePickerVisible}
                        setInfoVisible={setInfoVisible}
                        handleExport={() => setExportImageVisible(true)} />
                    <RightContainer
                        AnimateUp={animateUp}
                        AnimateDown={animateDown}
                        onAnimationEnd={DoneAnimating}
                        ActiveIndex={rightActiveIndex} 
                        RightScrollUp={RightScrollUp}
                        RightScrollDown={RightScrollDown} />
                </MainInnerWrapper>
            </MainOuterWrapper>
    );
}
const Sheet = styled.div`
    position: absolute;
    z-index: -20;
    width: 100vw;
    height: 100vh;
    z-index: -99;
    background-color: #222;
`

const OutputWrapper = styled.div`
    position: absolute;
    z-index: -100;
`


export default Main;