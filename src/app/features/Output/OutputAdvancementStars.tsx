import { ReactElement, useState } from "react";
import styled from "styled-components";

type StarType = {
    active: Boolean,
}
const StarSVG = styled.svg<StarType>`
    fill: ${props => props.active?'white':'#444'};
    transition: fill 0.1s ease;
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px black);
    /* height: 3vh; */
    aspect-ratio: 1/1;
`

const StarsWrapper = styled.div`
    margin: auto;
    display: flex;
    justify-content: center;
`


const Star = (props: {index:number, active: boolean, }) => {
    return (
        <StarSVG
            active={props.active}
            xmlns="http://www.w3.org/2000/svg"
            height={'100%'}
            viewBox="0 0 608 554">
                <path d="M355.388,179.883l176.121-40.41L415.119,288.5,515.431,461.055,331.839,387.733,198.574,533.756,205.931,336.5,43.914,251.349l176.871-40.582L245.272,10.446Z"/>
        </StarSVG>
    );
}

const OutputAdvancementStars = (props: {CustomStyle: any, Count: number, Active: number, OnClick: any}) => {

    let Stars: ReactElement[] = new Array(props.Count);

    for (let i = 1; i <= props.Count; i++) {
        Stars.push(<Star index={i} key={i} active={(i<props.Active)?true:false} />);
    }
    
    return (
        <StarsWrapper style={{...props.CustomStyle}}>
            {Stars}
        </StarsWrapper>
    );
}

export default OutputAdvancementStars;