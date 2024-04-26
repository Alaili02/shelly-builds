import styled from "styled-components";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fabric } from "fabric";
import ImageScale from "./ImageScale";
import SplashPick from "./SplashPick";
import { SimulacraImages } from "../../../res/simulacra";
import { SimulacraNameT, WeaponIndexT, WeaponToSimulacra } from "../../../res/logic/types/WeaponTypes";
import { Keywords } from "../../../store/data";
import { useAppSelector } from "../../hooks";
import { selectEquippedWeapons } from "../../../store/loadoutSlice";
import CharacterDetails from "./CharacterDetails";

const CharacterWrapper = styled.div`
    width: 100%; height: 100%;
    /* display: flex; */
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 4vw 40.32vh 1fr;
    /* flex-flow: row nowrap; */
    justify-items: center;
    align-items: center;
    justify-content: center; 
`

const OuterCanvasWrapper = styled.div`
    width: 40.32vh;
    height: 100%;
    grid-column: 2/3;
    grid-row: 2/3;
    justify-self: end;
`

const CanvasWrapper = styled.div`
    position: relative;
    width: 40.32vh; height: 80vh;
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 2px black);
    background-color: #111;
    overflow: visible;
    box-sizing: border-box;
`

const Canvas = (props: {
        editCanvasRef: React.MutableRefObject<fabric.Canvas | null>,
        outCanvasRef: React.MutableRefObject<fabric.Canvas | null>, 
        parentRef: React.RefObject<HTMLDivElement>
        setCurrentImage: (arg0:{label:string,value:[SimulacraNameT, 0|1]})=>void}) => {
    const { parentRef, editCanvasRef, outCanvasRef } = props;
    // const parentRef = useRef<HTMLDivElement>(null);
    // const editCanvasRef = useRef<fabric.Canvas|null>(null);
    // const outCanvasRef = useRef<fabric.Canvas|null>(null);
    const [editCanvasImage, setEditCanvasImage] = useState<fabric.Image>();
    const [outCanvasImage, setOutCanvasImage] = useState<fabric.Image>(); // bugged, fix later
    const [dropActive, setDropActive] = useState<boolean>(false);

    // const canvasRef = useRef<HTMLCanvasElement>(null);
    // useEffect(() => {
    //     const img = new Image(); img.src = props.image;
    //     const draw = () => {
    //         if (canvasRef.current) {
    //             const canvas = canvasRef.current;

    //             // canvas.width = window.innerWidth/3.6;
    //             // canvas.height = window.innerHeight;
    //             const context = canvas.getContext('2d');
    //             canvas.style.width = "100%";
    //             canvas.style.height = "100%";
    //             canvas.width = canvas.offsetWidth;
    //             canvas.height = canvas.offsetHeight;

    //             if (context) {
    //                 context.imageSmoothingEnabled = false; 
                    
    //                 // const g1 = context.createRadialGradient(500,500,550,500,500,650);
    //                 const g1 = context.createLinearGradient(0, 0, canvas.width, 0);
    //                 g1.addColorStop(0.00,"rgba(0,0,0,1.00)");
    //                 g1.addColorStop(0.8,"rgba(0,0,0,1.00)");
    //                 g1.addColorStop(0.90,"rgba(0,0,0,0.9)");
    //                 g1.addColorStop(1.00,"rgba(0,0,0,0.00)");

    //                 // context.fillStyle = g1;
    //                 context.fillRect(0, 0, canvas.width, canvas.height);
    //                 context.globalCompositeOperation="source-in";

    //                 img.onload = () => {
    //                     context.drawImage(img, 0, 0, canvas.width * props.scale, img.height * (canvas.width/img.width) * props.scale);
    //                 };
    //             }
    //         }
    //     }
    //     draw();
    // }, [props.image, props.scale]);
    
    // const [canvasVal, setCanvasVal] = useState<fabric.Canvas>();
    
    useLayoutEffect(() => {
        editCanvasRef.current = new fabric.Canvas('canvasEdit', {
            height: parentRef.current?.clientHeight??1000,
            width: parentRef.current?.clientWidth??500,
            backgroundColor: 'transparent',
            imageSmoothingEnabled: true,
        });
        outCanvasRef.current = new fabric.Canvas('canvasOut', {
            height: 1000,
            width: 504,
            backgroundColor: 'transparent',
            imageSmoothingEnabled: true,
        });
        editCanvasRef.current.setZoom(1);
        outCanvasRef.current.setZoom(1);


        editCanvasRef.current.on('object:moving', (e) => {
            const outImg = outCanvasRef.current?.getObjects()[0];
            const editImg = editCanvasRef.current?.getObjects()[0];
            if (!e.target || !outImg) return;
            
            const widthRatio = (outImg.scaleX??1)/(editImg?.scaleX??1);
            const heightRatio = (outImg.scaleY??1)/(editImg?.scaleY??1);
        
            const { left, top } = e.target;
            if (left && editImg?.getScaledWidth()) {
                const imgWidth = editImg?.getScaledWidth();
                if (!(left < imgWidth/2)) e.target.left = imgWidth/2;
                else if (!(left > (parentRef.current?.clientWidth??500) - (imgWidth/2))) e.target.left = (parentRef.current?.clientWidth??500) - (imgWidth/2);
                else outImg.left = left * widthRatio;
            }
            if (top && editImg?.getScaledHeight()) {
                const imgHeight = editImg?.getScaledHeight();
                if (!(top < imgHeight/2)) e.target.top = imgHeight/2;
                else if (!(top > (parentRef.current?.clientHeight??1000) - (imgHeight/2))) e.target.top = (parentRef.current?.clientHeight??1000) - (imgHeight/2);
                else outImg.top = top * heightRatio;
            }

            outCanvasRef.current?.requestRenderAll();
        });
        
        // fabric.Image.fromURL(AvatarImg, (editImg) => {
        //     const outImg = fabric.util.object.clone(editImg) as fabric.Image;
        //     editCanvasRef.current?.clear(); outCanvasRef.current?.clear();
        //     editCanvasRef.current?.add(editImg); outCanvasRef.current?.add(outImg);
        //     setEditCanvasImage(editImg); setOutCanvasImage(outCanvasImage);

        //     editImg.scaleToWidth(editCanvasRef.current?.width??500);
        //     editImg.scaleToHeight(editCanvasRef.current?.height??1000);
        //     outImg.scaleToWidth(editCanvasRef.current?.width??504);
        //     outImg.scaleToHeight(outCanvasRef.current?.height??1000);

        //     editImg.hasControls = false;
        //     editImg.hasBorders = false;

        //     editImg.set({
        //         originX: "center", 
        //         originY: "center"
        //     });
        //     outImg.set({
        //         originX: "center", 
        //         originY: "center"
        //     });

            
        //     editCanvasRef.current?.centerObject(editImg);
        //     outCanvasRef.current?.centerObject(outImg);
            
        //     let rect = new fabric.Rect({
        //         top: 0,
        //         left: 0,
        //         width: 504,
        //         height: 1000,
        //         globalCompositeOperation: 'destination-in'
        //     })
        //     rect.set('fill', new fabric.Gradient({
        //         type: 'linear',
        //         gradientUnits: 'pixels', // or 'percentage'
        //         coords: { x1: 0, y1: 0, x2: 504, y2: 0 },
        //         colorStops:[
        //           { offset: 1.0, color: 'rgba(255,255,255,0.00)' },
        //           { offset: 0.9, color: 'rgba(255,255,255,0.90)' },
        //           { offset: 0.0, color: 'rgba(255,255,255,1.0)' },
        //         ]
        //     }));
        //     outCanvasRef.current?.add(rect);

        //     // console.log((outImg.scaleX??1)/(editImg?.scaleX??1));
        //     // console.log((outImg.scaleY??1)/(editImg?.scaleY??1));
        //     // console.log("out", outImg);
        //     // console.log("edit", editImg);
        //     // console.log("out State", outCanvasImage);
        //     // console.log("edit State", editCanvasImage);
        // });

        return () => {
            editCanvasRef.current?.dispose();
            outCanvasRef.current?.dispose();
            editCanvasRef.current = null;
            outCanvasRef.current = null;
        };
    }, []);

    const HandleDragEnter = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDropActive(true);
    }
    const HandleDragLeave = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDropActive(false);
    }
    const HandleDrop = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDropActive(false);
        if (event.dataTransfer.items && event.dataTransfer.items[0].kind === 'file') {
            const file = event.dataTransfer.items[0].getAsFile();
            if (file?.type === "image/png" || file?.type === "image/jpeg" || file?.type === "image/webp") {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = e => {
                    const dataUrl = e.target?.result as string;
                    fetch(dataUrl)
                        .then(res => res.blob())
                        .then(blob => {
                            const url = URL.createObjectURL(blob);
                            fabric.Image.fromURL(url, (editImg) => {
                                const outImg = fabric.util.object.clone(editImg);
                                editCanvasRef.current?.clear(); outCanvasRef.current?.clear();
                                // if (editCanvasImage) editCanvasRef.current?.remove(editCanvasImage);
                                // if (outCanvasImage) outCanvasRef.current?.remove(outCanvasImage);
                                
                                editCanvasRef.current?.setZoom(1);
                                outCanvasRef.current?.setZoom(1);
                                editImg.scaleToHeight(editCanvasRef.current?.height??1000);
                                outImg.scaleToHeight(outCanvasRef.current?.height??1000);

                                editImg.hasControls = false;
                                editImg.hasBorders = false;

                                editImg.set({
                                    originX: "center", 
                                    originY: "center"
                                });
                                outImg.set({
                                    originX: "center", 
                                    originY: "center"
                                });
                                editCanvasRef.current?.centerObject(editImg);
                                outCanvasRef.current?.centerObject(outImg);
                                
                                editCanvasRef.current?.add(editImg); outCanvasRef.current?.add(outImg);
                                editCanvasRef.current?.requestRenderAll(); outCanvasRef.current?.requestRenderAll();
                                setEditCanvasImage(editImg); setOutCanvasImage(outImg);
                                URL.revokeObjectURL(url);
                                props.setCurrentImage({
                                    label: 'Custom',
                                    value: ['Anabella',0]
                                })

                                let rect = new fabric.Rect({
                                    top: 0,
                                    left: 0,
                                    width: 504,
                                    height: 1000,
                                    globalCompositeOperation: 'destination-in'
                                });
                                rect.set('fill', new fabric.Gradient({
                                    type: 'linear',
                                    gradientUnits: 'pixels', // or 'percentage'
                                    coords: { x1: 0, y1: 0, x2: 504, y2: 0 },
                                    colorStops:[
                                      { offset: 1.0, color: 'rgba(255,255,255,0.00)' },
                                      { offset: 0.9, color: 'rgba(255,255,255,0.90)' },
                                      { offset: 0.0, color: 'rgba(255,255,255,1.0)' },
                                    ]
                                }));
                                outCanvasRef.current?.add(rect);
                            });
                        });
                }
            }
        }
    }


    return (
        <CanvasWrapper ref={parentRef}
            onDrop={HandleDrop} 
            onDragEnter={HandleDragEnter}
            onDragLeave={HandleDragLeave}>

            <DropWrapper active={dropActive}>
                <DropText>Drop Image</DropText>
            </DropWrapper>
            <canvas id='canvasEdit' />
        </CanvasWrapper>
    );
}

const DropWrapper = styled.div<{active:boolean}>`
    position: absolute;
    opacity: ${props => props.active?"0.6":"0.0"};
    background-color: black;
    width: 100%; height: 100%;
    z-index: 1;
    display: flex;
    place-content: center;
    place-items: center;
    pointer-events: none;
    transition: opacity 0.1s ease;
`
const DropText = styled.span`
    font-size: 6vw;
    text-align: center;
    font-weight: 900;
`

const ScaleImage = (dir: -1|1|0, editCanvasRef:React.MutableRefObject<fabric.Canvas | null>, outCanvasRef:React.MutableRefObject<fabric.Canvas | null>, parentRef: React.RefObject<HTMLDivElement>) => {
    const outImg = outCanvasRef.current?.getObjects()[0];
    const editImg = editCanvasRef.current?.getObjects()[0];
    if (!editImg || !outImg) return;
    
    if (dir===0) {
        editImg.scaleToWidth(editCanvasRef.current?.width??500);
        editImg.scaleToHeight(editCanvasRef.current?.height??1000);
        outImg.scaleToWidth(editCanvasRef.current?.width??504);
        outImg.scaleToHeight(outCanvasRef.current?.height??1000);
        editCanvasRef.current?.centerObject(editImg);
        outCanvasRef.current?.centerObject(outImg);
    }
    if (dir===1) {
        outImg.scale((outImg.scaleX??1)*1.1);
        editImg.scale((editImg.scaleX??1)*1.1);
        //  = ((outImg.scaleX??1)*1.1);
        // outImg.scaleY = ((outImg.scaleY??1)*1.1);
        // editImg.scaleX = ((editImg.scaleX??1)*1.1);
        // editImg.scaleY = ((editImg.scaleY??1)*1.1);
        // editCanvasRef.current?.setZoom(editCanvasRef.current?.getZoom() + 0.1);
        // outCanvasRef.current?.setZoom(outCanvasRef.current?.getZoom() + 0.1);
    }
    if (dir===-1) {
        outImg.scale((outImg.scaleX??1)*0.9);
        editImg.scale((editImg.scaleX??1)*0.9);
        if (outImg.getScaledWidth() < 504) {
            outImg.scaleToWidth(504);
            editImg.scaleToWidth(parentRef.current?.clientWidth??500);
            editCanvasRef.current?.centerObject(editImg);
            outCanvasRef.current?.centerObject(outImg);
        }
        if (outImg.getScaledHeight() < 1000) {
            outImg.scaleToHeight(1000);
            editImg.scaleToHeight(parentRef.current?.clientHeight??1000);
            editCanvasRef.current?.centerObject(editImg);
            outCanvasRef.current?.centerObject(outImg);
        }
        const { left, top } = editImg;
        if (left && editImg?.getScaledWidth()) {
            const imgWidth = editImg?.getScaledWidth();
            if (!(left < imgWidth/2)) {
                editImg.left = imgWidth/2;
                outImg.left = (outImg?.getScaledWidth())/2;
            }
            else if (!(left > (parentRef.current?.clientWidth??500) - (imgWidth/2))) {
                editImg.left = (parentRef.current?.clientWidth??500) - (imgWidth/2);
                outImg.left = 504 - (outImg?.getScaledWidth()/2);
            }
        }
        if (top && editImg?.getScaledHeight()) {
            const imgHeight = editImg?.getScaledHeight();
            if (!(top < imgHeight/2)) {
                editImg.top = imgHeight/2;
                outImg.top = (outImg?.getScaledHeight())/2;
            }
            else if (!(top > (parentRef.current?.clientHeight??1000) - (imgHeight/2))) {
                editImg.top = (parentRef.current?.clientHeight??1000) - (imgHeight/2);
                outImg.top = 1000 - (outImg?.getScaledHeight()/2);
            }
        }
        // outImg.scaleX = ((outImg.scaleX??1) *0.9);
        // outImg.scaleY = ((outImg.scaleY??1) *0.9);
        // editImg.scaleX = ((editImg.scaleX??1) *0.9);
        // editImg.scaleY = ((editImg.scaleY??1) *0.9);
        // editCanvasRef.current?.setZoom(editCanvasRef.current?.getZoom() - 0.1);
        // outCanvasRef.current?.setZoom(outCanvasRef.current?.getZoom() - 0.1);
    }
    
    editCanvasRef.current?.requestRenderAll();
    outCanvasRef.current?.requestRenderAll();
}

const options:{label:string,value:[SimulacraNameT, 0|1]}[] = [{label: 'Custom', value: ["Anabella",0]}];
(Object.keys(SimulacraImages) as SimulacraNameT[]).forEach(simName => {
    if (SimulacraImages[simName][0]) options.push({label: Keywords.English.Simulacra[simName] + " " + Keywords.English.UI.advancement[0], value: [simName, 0]})
    if (SimulacraImages[simName][1]) options.push({label: Keywords.English.Simulacra[simName] + " " + Keywords.English.UI.advancement[1], value: [simName, 1]})
});

const Character = (props: {customStyle: any}) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const editCanvasRef = useRef<fabric.Canvas|null>(null);
    const outCanvasRef = useRef<fabric.Canvas|null>(null);
    const [currentImage, setCurrentImage] = useState<{label:string,value:[SimulacraNameT, 0|1]}>(options[0]);
    const equippedWeapons = useAppSelector(selectEquippedWeapons);
    

    const ChangeImage = (option: {label:string,value:[SimulacraNameT, 0|1]}) => {
        const imgSrc = SimulacraImages[option.value[0]][option.value[1]];
        setCurrentImage(option);

        fabric.Image.fromURL(imgSrc, (editImg) => {
            const outImg = fabric.util.object.clone(editImg);
            editCanvasRef.current?.clear(); outCanvasRef.current?.clear();
            editImg.scaleToHeight(editCanvasRef.current?.height??1000);
            outImg.scaleToHeight(outCanvasRef.current?.height??1000);

            editImg.hasControls = false;
            editImg.hasBorders = false;

            editImg.set({
                originX: "center", 
                originY: "center"
            });
            outImg.set({
                originX: "center", 
                originY: "center"
            });
            editCanvasRef.current?.centerObject(editImg);
            outCanvasRef.current?.centerObject(outImg);
            
            editCanvasRef.current?.add(editImg); outCanvasRef.current?.add(outImg);
            editCanvasRef.current?.requestRenderAll(); outCanvasRef.current?.requestRenderAll();

            let rect = new fabric.Rect({
                top: 0,
                left: 0,
                width: 504,
                height: 1000,
                globalCompositeOperation: 'destination-in'
            });
            rect.set('fill', new fabric.Gradient({
                type: 'linear',
                gradientUnits: 'pixels', // or 'percentage'
                coords: { x1: 0, y1: 0, x2: 504, y2: 0 },
                colorStops:[
                  { offset: 1.0, color: 'rgba(255,255,255,0.00)' },
                  { offset: 0.9, color: 'rgba(255,255,255,0.90)' },
                  { offset: 0.0, color: 'rgba(255,255,255,1.0)' },
                ]
            }));
            outCanvasRef.current?.add(rect);
        });
    }

    useEffect(() => {

        if (equippedWeapons[1] !== "") {
            const simName = WeaponToSimulacra[equippedWeapons[1]];
            const i = SimulacraImages[simName].length - 1;
            ChangeImage({label: Keywords.English.Simulacra[simName] + " " + Keywords.English.UI.advancement[i as 0|1], value: [simName, i as 0|1]});
        } else if (equippedWeapons[2] !== "") {
            const simName = WeaponToSimulacra[equippedWeapons[2]];
            const i = SimulacraImages[simName].length - 1;
            ChangeImage({label: Keywords.English.Simulacra[simName] + " " + Keywords.English.UI.advancement[i as 0|1], value: [simName, i as 0|1]});
        } else if (equippedWeapons[3] !== "") {
            const simName = WeaponToSimulacra[equippedWeapons[3]];
            const i = SimulacraImages[simName].length - 1;
            ChangeImage({label: Keywords.English.Simulacra[simName] + " " + Keywords.English.UI.advancement[i as 0|1], value: [simName, i as 0|1]});
        }

        // const randomIndex = Math.floor(Math.random()*3)+1 as WeaponIndexT;
        // // const simName = WeaponToSimulacra[equippedWeapons[randomIndex]];
        // if (SimulacraImages[simName].length > 1) {
        //     const i = Math.floor(Math.random()*2);    
        //     ChangeImage({label: Keywords.English.Simulacra[simName] + " " + Keywords.English.UI.advancement[i as 0|1], value: [simName, i as 0|1]});
        // } else {
        //     ChangeImage({label: Keywords.English.Simulacra[simName] + " " + Keywords.English.UI.advancement[0], value: [simName, 0]});
        // }
    }, [equippedWeapons])


    return (
        <CharacterWrapper style={props.customStyle}>
            
            <SplashPick ChangeImage={ChangeImage} options={options} CurrentImage={currentImage} />
            <OuterCanvasWrapper>
                <Canvas editCanvasRef={editCanvasRef} outCanvasRef={outCanvasRef} parentRef={parentRef} setCurrentImage={setCurrentImage}/>
            </OuterCanvasWrapper>
           
            <ImageScale ScaleImage={(dir) => ScaleImage(dir, editCanvasRef, outCanvasRef, parentRef)} />
            <CharacterDetails />
        </CharacterWrapper>
    )
}

export default Character;