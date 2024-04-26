import styled from "styled-components";
import { ElementImages, ResonanceImages } from "../../../res/element";
import { AllWeaponElements, AllWeaponResonances, WeaponElementT, WeaponResonanceT } from "../../../res/logic/types/WeaponTypes";

const WeaponFilterBarWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`
const WeaponFilterImg = styled.img<{active:boolean}>`
    height: 80%;
    object-fit: contain;
    opacity: ${props => props.active?"1":"0.4"};
    transition: opacity ease 0.1s, filter ease 0.1s;
    cursor: pointer;
    :hover {
        filter: ${props => props.active?"drop-shadow(0 0 2px rgba(255, 255, 255, 1))":"drop-shadow(0 0 2px rgba(255, 255, 255, 0.4))"};
        opacity: ${props => props.active?"1":"0.6"};
    }
`

const WeaponFilterBar = (props: {weaponElementFilter:WeaponElementT|undefined, setWeaponElementFilter:any, weaponResonanceFilter:WeaponResonanceT|undefined, setWeaponResonanceFilter:any}) => {
    return (
        <WeaponFilterBarWrapper>
            {AllWeaponElements.map(element => 
                <WeaponFilterImg 
                    key={element} 
                    src={ElementImages[element]}
                    onClick={() => (props.weaponElementFilter && props.weaponElementFilter===element)?props.setWeaponElementFilter(undefined):props.setWeaponElementFilter(element)}
                    active={!props.weaponElementFilter||props.weaponElementFilter===element} 
                    />)}
            {AllWeaponResonances.map(resonance => 
                <WeaponFilterImg 
                    key={resonance}
                    src={ResonanceImages[resonance]} 
                    onClick={() => (props.weaponResonanceFilter && props.weaponResonanceFilter===resonance)?props.setWeaponResonanceFilter(undefined):props.setWeaponResonanceFilter(resonance)}
                    active={!props.weaponResonanceFilter||props.weaponResonanceFilter===resonance} 
                    />)}
        </WeaponFilterBarWrapper>
    );
}


export default WeaponFilterBar;