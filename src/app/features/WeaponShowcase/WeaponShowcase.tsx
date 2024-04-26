import React from "react";
import styled from "styled-components";
import { SkillDataT } from "../../../res/weapon";
import { GetShiroSkillData } from "../../../res/weapon/data/ShiroData";
import { useAppSelector } from "../../hooks";
import reactStringReplace from 'react-string-replace';

const WeaponShowcaseWrapper = styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns: 10% 90%;
    align-items: center;
`


const SkillWrapper = styled.div`
    width: 100%;
    border: 0.125vw solid gray;
    display: grid;
    grid-template-columns: 60% 40%;
    align-items: center;
    box-sizing: border-box;
    padding: 1vw;
    text-shadow: 2px 2px 2px black;
`

const SkillName = styled.h1`
    grid-column: 1/3;
    text-align: center;
`

const SkillDescription = styled.p`
    grid-column: 1/3;
    font-size: larger;
    margin: 0;
`

const SkilLabel = styled.span`
    grid-column: 1;
    font-size: large;
`

const SkillDamage = styled.span`
    grid-column: 2;
    text-align: center;
    font-size: larger;
`
    
    const DamageSourceSelector = styled.div`
        height: 100%;
    `
    const DamageSource = styled.div``
    const AllSkillsWrapper = styled.div`
        height: 100vh;
        overflow-y: scroll;
        display: flex;
        flex-flow: column nowrap;
        & *{
            overflow: visible;
        }
    `
    
    const Skill = (props: {skillData: SkillDataT, skillName: string}) => {
        const {desc, labels, skillDamage, type} = props.skillData;
        return (
            <SkillWrapper>
                <SkillName>{props.skillName}</SkillName>
                <SkillDescription>{desc}</SkillDescription>
                {labels.map(l =>
                    <React.Fragment key={l}>
                        <SkilLabel>{
                        reactStringReplace(
                                reactStringReplace(
                                    l, 
                                    /<c1>(.*?)<\/>/g, 
                                    (match, i)=>(<span key={i} style={{ color: '#ff7070' }}>{match}</span>)
                                ),
                                /<c2>(.*?)<\/>/g,
                                (match, i)=>(<span key={`c2${i}`} style={{ color: '#95c6ff' }}>{match}</span>)
                            )
                        }</SkilLabel>
                        <SkillDamage>123456</SkillDamage>
                    </React.Fragment>
                )}
            </SkillWrapper>
    );
}

const WeaponShowcase = () => {
    const skillLevel = 14; 
    const AllSkills = GetShiroSkillData(skillLevel).Skills;

    return (
        <WeaponShowcaseWrapper>
            <DamageSourceSelector>
                <DamageSource />
                <DamageSource />
                <DamageSource />
            </DamageSourceSelector>
            <AllSkillsWrapper>
                {Object.keys(AllSkills).map(s => <Skill key={s} skillName={s} skillData={AllSkills[s]} />) }
            </AllSkillsWrapper>
            {/*<SkillsWrapper>
            </SkillsWrapper> */}
        </WeaponShowcaseWrapper>
    );
}

export default WeaponShowcase;