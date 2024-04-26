import styled from "styled-components";
import { useState } from "react"; 
import WeaponInventory from "./WeaponInventory";
import MatrixInventory from "./MatrixInventory";

const WeaponMatrixInventoryWrapper = styled.div`
    height: 100%; width: 100%;
    grid-column: 1/2; grid-row: 1/3;
    display: grid;
    grid-template-rows: auto auto 1fr;
`

const Header = styled.h1`
    text-shadow: none;
    margin: 0.5vw;
    margin-bottom: 0;
    font-size: 1.5vw;
    border-bottom: 0.125vw solid #DDD;
    border-top: 0.125vw solid #DDD;
    box-sizing: border-box;
`

const PagePickerWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    margin: 0.5vw 0;

    & span {
        /* background-color: #444; */
        /* padding: 1vw; */
    }
`

const PageSpan = styled.span<{active:boolean}>`
    font-size: 1.5vw;
    opacity: ${props => props.active?"1":"0.2"};
    transition: opacity 0.1s ease;
    cursor: pointer;
    &:hover {
        opacity: ${props => props.active?"1":"0.6"};
    }
`

const WeaponMatrixInventory = () => {
    const [inventoryPage, setInventoryPage] = useState<"weapon"|"matrix">("weapon");
    return (
        <WeaponMatrixInventoryWrapper>
            <Header>Inventory</Header>
            <PagePickerWrapper>
                <PageSpan onClick={()=> setInventoryPage("weapon")} active={inventoryPage==="weapon"}>Weapons</PageSpan>
                <PageSpan onClick={()=> setInventoryPage("matrix")} active={inventoryPage==="matrix"}>Matrices</PageSpan>
            </PagePickerWrapper>
            {inventoryPage === "weapon"?
                <WeaponInventory />:
                <MatrixInventory />
            }
        </WeaponMatrixInventoryWrapper>
    );
}

export default WeaponMatrixInventory;