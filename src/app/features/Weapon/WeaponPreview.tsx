import styled from "styled-components";
import { WeaponImages } from "../../../res/weapon";
import AdvancementStars from "../Equipment/AdvancementStars";


const WeaponPreviewWrapper = styled.div`
    width: 100%; height: 100%;
    display: grid;
    height: 30vh;
    grid-template-columns: 4vh auto 1fr;
    grid-template-rows: 100%;
    padding: 0.5vw;
    box-sizing: border-box;
`

const WeaponImage = styled.img`
    height: 100%;
    width: auto;
`
const Label = styled.span`
    font-size: 2vw;
    color: #DDD;
    height: fit-content;
`
const Col1 = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    align-content: center;
`

const WeaponPreview = () => {
    return (
        <WeaponPreviewWrapper>
            <AdvancementStars starSize="1.75vw" Active={3} Count={6} OnClick={()=>{}} CustomStyle={{width: "100%", flexFlow: "row wrap"}} />
            <WeaponImage src={WeaponImages.Powerbreak}/>
            <Col1>
                <Label>Tian Lang</Label>
                <Label>Thunderbreaker</Label>
                <Label>LVL160</Label>
            </Col1>
        </WeaponPreviewWrapper>
    );
}

export default WeaponPreview;