import { useState } from "react";
import styled from "styled-components";

type iSVG = {
    rotated?: boolean
}

const SVG = styled.svg<iSVG>`
    flex: 1;
    height: 100%;
    transform: ${props => props.rotated?'rotate(45deg)':'rotate(0deg)'};
    cursor: pointer;
    &>*{
        transition: all 0.15s ease;
    }
    &>#bg {
        fill: #222;
    }
    &>#logo {
        fill: white;
    }
    &:hover>#bg {
        fill: white;
    }
    &:hover>#logo {
        fill: #333;
    }
`

export const DeleteBtn = (props: {HandleDelete:any, customCSS: any}) => {
    return (
        <div title='Delete' onClick={props.HandleDelete} style={{height: '100%', display: 'flex', flexFlow: 'column nowrap', ...props.customCSS }}>
            <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.46 284.46">
                <rect id='bg' x="0.5" y="0.5" width="283.46" height="283.46"/>
                <g id='logo'>
                    <rect x="75.59" y="50.04" width="133.27" height="27.3"/>
                    <path d="M208.37,84.83H75.1v149.1H208.37V84.83ZM112.42,213.57H101.64V105.19h10.78Zm34.71,0H136.34V105.19h10.79Zm34.7,0H171.05V105.19h10.78Z" transform="translate(0.5 0.5)"/>
                </g>
            </SVG>
            {/* <p style={{margin: 0, textAlign: 'center', paddingTop: '5px'}}>Delete</p> */}
        </div>
    );
}

export const AddDeleteBtn = (props: {toggled: boolean, setVisible: any}) => {

    const [isCancel, setCancel] = useState(false);

    const toggle = () => {
        props.setVisible(!isCancel);
        setCancel(!isCancel);
    }

    return (
        <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
            <SVG rotated={isCancel} onClick={toggle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.46 284.46">
                <rect id='bg' x="0.5" y="0.5" width="283.46" height="283.46"/>
                <rect id='logo' x="128.08" y="36.12" width="28.3" height="212.23"/>
                <rect id='logo' x="36.12" y="128.08" width="212.23" height="28.3"/>
            </SVG>
            {/* <p style={{margin: 0, textAlign: 'center', paddingTop: '5px'}}>{isCancel?'Cancel':'Add'}</p> */}
        </div>
    )
}

export const EquipBtn = (props: {HandleEquip: any}) => {
    return (
        <div title='Equip' onClick={props.HandleEquip} style={{display: 'flex', flexFlow: 'column nowrap'}}>
            <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.46 284.46">
                <rect id='bg' x="0.5" y="0.5" width="283.46" height="283.46"/>
                <rect id='logo' x="113.39" y="42.52" width="56.69" height="198.43" rx="27.86" transform="translate(0.5 283.96) rotate(-90)"/>
                <path id='logo' d="M259.35,132.74,185.88,68.27a12,12,0,0,0-19.84,9V206.2a12,12,0,0,0,19.84,9l73.47-64.47A12,12,0,0,0,259.35,132.74Z" transform="translate(0.5 0.5)"/>
            </SVG>
            {/* <p style={{margin: 0, textAlign: 'center', paddingTop: '5px'}}>Equip</p> */}
        </div>
    )
}

export const SaveBtn = (props: {HandleSave: any}) => {
    return (
        <div title='Save' onClick={props.HandleSave} style={{display: 'flex', flexFlow: 'column nowrap'}}>
            <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.46 284.46">
            <rect id='bg' x="0.5" y="0.5" width="283.46" height="283.46"/>
            <polygon id='logo' points="50.11 49.9 50.11 234.57 234.36 234.57 234.36 88.16 195.68 49.9 50.11 49.9"/>
            <rect id='bg' x="95.46" y="65.7" width="93.54" height="56.69"/>
            <rect id='bg' x="85.54" y="153.37" width="113.39" height="72.76"/>
            <rect id='bg' x="217.35" y="217.35" width="8.5" height="8.5"/>
            <rect id='bg' x="58.61" y="217.35" width="8.5" height="8.5"/>
            <rect id='bg' x="158.86" y="71.05" width="16.99" height="33.98"/>

            </SVG>
        {/* <p style={{margin: 0, textAlign: 'center', paddingTop: '5px'}}>Save</p> */}
        </div>
    )
}

export const Newbtn = (props: {HandleClick: any}) => {
    return (
        <div title='New' onClick={props.HandleClick} style={{width: '100%', display: 'flex', flexFlow: 'column nowrap'}}>
            <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.46 284.46">
                <rect id='logo' x="0.5" y="0.5" width="283.46" height="283.46"/>
                <rect id='bg' x="128.08" y="36.12" width="28.3" height="212.23"/>
                <rect id='bg' x="36.12" y="128.08" width="212.23" height="28.3"/>
            </SVG>
        </div>
    );
}

export const CancelBtn = (props: {HandleClick: any, customCSS: any}) => {
    return (
        <div title='Back' onClick={props.HandleClick} style={{height: '100%', display: 'flex', flexFlow: 'column nowrap', ...props.customCSS}}>
            <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.46 284.46">
                <rect id='bg' x="0.5" y="0.5" width="283.46" height="283.46"/>
                <rect id='logo' x="35.62" y="127.58" width="212.23" height="28.3" transform="translate(-58.21 142.23) rotate(-45)"/>
                <rect id='logo' x="127.58" y="35.62" width="28.3" height="212.23" transform="translate(-58.21 142.23) rotate(-45)"/>
            </SVG>
        </div>
    );
}