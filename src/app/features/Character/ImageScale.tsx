import styled from "styled-components";
import { SVGWrapper } from "../../Styles/PrimaryStyles";



const ImageScaleWrapper = styled.div`
    width: 3vw;
    grid-row: 2/3;
    justify-self: flex-end;
    align-self: flex-start;
    margin-top: 5vh;
    height: fit-content;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr 1fr;
`

const ScaleSVGWrapper = styled(SVGWrapper)`
    /* width: 4vw; */
    /* pointer-events:  */
    height: fit-content;
    cursor: pointer;
    & polygon, & path, & rect {
        transition: fill 0.1s ease !important;

    }
    &:hover svg>g>g>polygon, &:hover svg>g>g>rect {
        fill: #FFF;
    }
    &:hover svg>g>path, &:hover svg>g>polygon{
        fill: black;
    }
`

const ImageScale = (props: {ScaleImage: (dir: -1|1|0)=>void}) => {
    return (
        <ImageScaleWrapper>
                <ScaleSVGWrapper onClick={() => props.ScaleImage(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.79 190.84">
                    <g>
                        <g>
                            <polygon fill="#DDD" points="107.3 9.63 4.5 95.61 4.5 186.34 107.3 186.34 107.3 9.63"/>
                            <path fill="#111" d="M111.79,0,0,93.51v97.33H111.79ZM9,97.71l93.79-78.45V181.84H9Z"/>
                        </g>
                        <path fill="#222" d="M75.66,127.85v-10.4H36.14v10.4Z" transform="translate(0)"/>
                        <path fill="#222" d="M50.7,142.41H61.1V102.89H50.7Z" transform="translate(0)"/>
                    </g>
                    </svg>
                </ScaleSVGWrapper>

                <ScaleSVGWrapper onClick={() => props.ScaleImage(0)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.8 190.84">
                        <g>
                            <g>
                                <rect fill="#DDD" x="4.5" y="4.14" width="102.8" height="182.19"/>
                                <path fill="#111" d="M111.8,0H0V190.84H111.8ZM9,9.63h93.8V181.84H9Z"/>
                            </g>
                            <polygon fill="#222" points="90.17 61.15 67.73 67.16 72.26 71.7 32.18 111.78 27.64 107.25 21.63 129.69 44.07 123.67 39.53 119.14 79.62 79.05 84.15 83.59 90.17 61.15"/>
                            <polygon fill="#222" points="90.17 129.69 84.15 107.25 79.62 111.78 39.53 71.7 44.07 67.16 21.63 61.15 27.64 83.59 32.18 79.05 72.26 119.14 67.73 123.67 90.17 129.69"/>
                        </g>
                    </svg>
                </ScaleSVGWrapper>

                <ScaleSVGWrapper onClick={() => props.ScaleImage(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.79 190.84">
                        <g>
                            <g>
                                <polygon fill="#DDD" points="107.3 181.21 4.5 95.23 4.5 4.5 107.3 4.5 107.3 181.21"/>
                                <path fill="#111" d="M111.79,190.84,0,97.33V0H111.79ZM9,93.12l93.79,78.46V9H9Z"/>
                            </g>
                            <path fill="#222" d="M75.66,63v10.4H36.14V63Z"/>
                        </g>
                    </svg>
                </ScaleSVGWrapper>
            </ImageScaleWrapper>
    );
}

export default ImageScale;