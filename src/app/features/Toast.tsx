import styled, { keyframes } from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectToast, setToast } from "../../store/toastSlice";

const Open = keyframes`
    0% {
        display: block;
        opacity: 0;
        transform: scale(100%);
    }
    10% {
        opacity: 1;
        transform: scale(103%);
    }
    90% {
        opacity: 1;
        transform: scale(103%);
    }
    100% {
        display: none;
        opacity: 0;
        transform: scale(100%);
    }
`

const ToastWrapper = styled.div`
    display: none;
    z-index: 100;
    position: absolute;
    width: 30vw;
    background-color: ${props => props.color};
    backdrop-filter: blur(6px);
    padding: 1vw;
    left: 30vw;
    top: 3vh;
    border-radius: 0.5vw;
    filter: drop-shadow(2px 2px 1px rgb(0 0 0 / 1));


    &.ShowAnimation {
        display: block;
        animation-name: ${Open};
        animation-duration: 1s;
        animation-fill-mode: forwards;
    }
`

const TextWrapper = styled.p`
    margin: 0; padding: 0;
    width: 100%;
    text-align: center;
    text-shadow: 2px 2px 2px rgba(0,0,0,0.5);

    font-weight: 900;
    font-size: 1.5vw;
    color: white;
`

const Toast = () => {
    const dispatch = useAppDispatch();
    const EndToast = () => {
        dispatch(setToast({
            message: '',
            color: '#ccc',
            active: false
        }))
    }
    
    const { active, message, color } = useAppSelector(selectToast);

    return (
        <ToastWrapper className={active?'ShowAnimation':''} color={color} onAnimationEnd={EndToast}>
            <TextWrapper>{message}</TextWrapper>
        </ToastWrapper>
    );
}

export default Toast;