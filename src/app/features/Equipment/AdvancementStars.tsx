import { ReactElement, useState } from "react";
import styled from "styled-components";

type StarType = {
    active: Boolean,
    hover: Boolean,
    size: string
}
const StarSVG = styled.svg<StarType>`
    fill: ${props => props.active?'white':props.hover?'#BBB':'#444'};
    transition: fill 0.1s ease;
    /* filter: drop-shadow(2px 2px 1px rgb(0 0 0 / 1)); */
    /* height: ${props => props.size}; */
    height: fit-content;
    /* width: ${props => props.size}; */
    & path {
        height: ${props => props.size};
        width: ${props => props.size};
    }
    
`

const StarsWrapper = styled.div`
    margin: auto;
    display: flex;
    justify-content: center;
`


const Star = (props: {size: string, index:number, active: boolean, OnClick: any, hoveringOver: number, setHoveringOver: any}) => {
    return (
        <StarSVG
            size={props.size}
            active={props.active}
            onMouseOver={() => props.setHoveringOver(props.index)}
            hover={props.index <= props.hoveringOver}
            onClick={props.OnClick}
            xmlns="http://www.w3.org/2000/svg"
            height={'100%'}
            viewBox="0 0 608 554">
                <path d="M355.388,179.883l176.121-40.41L415.119,288.5,515.431,461.055,331.839,387.733,198.574,533.756,205.931,336.5,43.914,251.349l176.871-40.582L245.272,10.446Z"/>
        </StarSVG>
    );
}

const AdvancementStars = (props: {CustomStyle: any, Count: number, Active: number, OnClick: any, starSize: string}) => {

    const [hoveringOver, setHoveringOver] = useState(0);
    let Stars: ReactElement[] = new Array(props.Count);

    for (let i = 1; i <= props.Count; i++) {
        Stars.push(<Star size={props.starSize} index={i} key={i} active={(i<props.Active)?true:false} OnClick={(_: MouseEvent) => {props.OnClick(i)}} hoveringOver={hoveringOver} setHoveringOver={setHoveringOver}/>);
    }
    
    return (
        <StarsWrapper style={{...props.CustomStyle}} onMouseLeave={() => setHoveringOver(0)}>
            {Stars}
        </StarsWrapper>
    );
}

export default AdvancementStars;