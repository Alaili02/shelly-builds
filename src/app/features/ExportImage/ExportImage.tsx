// import { toPng } from "html-to-image";
import domtoimage from 'dom-to-image'

import styled from "styled-components";
import Output from "../Output/Output";
import OutImg from "../../../res/output/images/OutImage.png"
import { ReactComponent as CrossSVG } from "../../../res/svg/Cross.svg";
import { SVGWrapper } from "../../Styles/PrimaryStyles";
import { useEffect, useState } from "react";
import {ReactComponent as SpinnerSVG} from "../../../res/svg/Spinner.svg";

const ExportImageWrapper = styled.div``


const ExportImageBackground = styled.div`
    position: absolute;
    z-index: 10;
    background-color: rgba(0,0,0,0.6);
    width: 100vw; height: 100vh;
`

const OutImage = styled.img<{ready:boolean}>`
    visibility: ${props => props.ready?"visible":"hidden"};
    position: absolute;
    z-index: 10;
    left: 20vw; top: 20vh;
    width: 60vw; height: 60vh;
    object-fit: contain;
`

const SpinnerSVGWrapper = styled(SVGWrapper)`
    position: absolute;
    z-index: 100;
    width: 10vw;
    left: 45vw; height: 60vh; top: 20vh;
`

const CrossSVGWrapper = styled(SVGWrapper)`
    position: absolute;
    z-index: 10;
    top: 2vh; right: 2vh;
    height: 5vh; width: 5vh;
    fill: #EEE;
    cursor: pointer;
`

const DownloadButton = styled.button<{ready:boolean}>`
    position: absolute;
    z-index: 10;
    border-radius: 0.25vw;
    width: 10vw; height: 3vw;
    left: 45vw;
    top: 87vh;
    border: none;
    padding: 0.5vw;
    font-family: inherit;
    color: white;
    font-size: 1.25vw;
    font-weight: 900;
    text-shadow: 0px 0px 4px black;
    background-color: #7f7;
    background-color: ${props => props.ready?"#7f7":"#666"};
    cursor: ${props => props.ready?"pointer":"default"};
    transition: background-color 0.1s ease;
    &:hover {
        background-color:  ${props => props.ready?"#4aff4a":"#666"};
    }
`

const ExportImage = (props: {ExportRef: React.RefObject<HTMLDivElement>, setVisible: any}) => {
    const [outReady, setOutReady] = useState(false);
    const [outImageSrc, setOutImageSrc] = useState("");
    const ExportFilter = (node: Node) => ((node as HTMLElement).className !== 'no-image');
    useEffect(() => {
        if (outImageSrc === "") {
            if (props.ExportRef === undefined || props.ExportRef === null) {
                console.log("Export failed.")
                return;
            }
            
            domtoimage.toPng(props.ExportRef.current as HTMLDivElement, { width: 1800, height: 1000 })
            // toPng(props.ExportRef.current as HTMLDivElement, { cacheBust: true, quality: 1, filter: ExportFilter, width: 1800, height: 1000 })
                .then((dataUrl) => {
                    fetch(dataUrl)
                        .then(res => res.blob())
                        .then(blob => {
                            const url = URL.createObjectURL(blob);
                            setOutImageSrc(url); setOutReady(true);
                            // URL.revokeObjectURL(url);
                        });
                })
                .catch((err) => {
                    console.log("Malformed HTML");
                    // console.log(err);
                })
        }
    },[]);

    const HandleSave = () => {
        if (outReady) {
            const link = document.createElement('a');
            link.download = 'ToF_Build.png';
            link.href = outImageSrc;
            link.click();
        }
    }

    return (
        <>
            <ExportImageBackground onClick={() => props.setVisible(false)}/>
            <CrossSVGWrapper onClick={() => props.setVisible(false)}>
                <CrossSVG />
            </CrossSVGWrapper>

            {outReady?
                <OutImage src={outImageSrc} ready={outReady} />
                :
                <SpinnerSVGWrapper><SpinnerSVG /></SpinnerSVGWrapper>
            }

            <DownloadButton onClick={HandleSave} ready={outReady}>Download</DownloadButton>
        </>
    );
}

export default ExportImage;