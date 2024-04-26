import styled from "styled-components";


const InfoWrapper = styled.div<{visible:boolean}>`
    display: ${props => props.visible?"flex":"none"};
    position: absolute;
    background-color: rgba(0,0,0,0.6);
    width : 100vw; height: 100vh;
    z-index: 100;
    place-items: center;
    place-content: center;
`

const ContentWrapper = styled.div`
    width: 50%; height: 70%;
    background-color: #222;
    border-radius: 1vw;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto;
    align-content: flex-start;
`

const Title = styled.h1`
    text-shadow: none;
    font-size: 2.5vw;
    height: fit-content;
    margin: 0.5vw 0;
`
const VersionSpan = styled.span`
    
`

const PageSelectorWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    border-top: 0.125vw solid #DDD;
    border-bottom: 0.125vw solid #DDD;
    & span {
        text-align: center;
        font-size: 1.5vw;
    }
`

const PageSelector = () => {
    return (
        <PageSelectorWrapper>
            <span>Info</span>
            <span>Credits</span>
            <span>Changelog</span>
        </PageSelectorWrapper>

    );
}

const Info = (props: {visible: boolean, setVisible:any}) => {
    return (
        <InfoWrapper visible={props.visible} onClick={()=>props.setVisible(false)}>
            <ContentWrapper>
                <Title>Shelly Builds</Title>
                <VersionSpan>version 0.9</VersionSpan>
                <PageSelector />
            </ContentWrapper>
        </InfoWrapper>
    );
}

export default Info;