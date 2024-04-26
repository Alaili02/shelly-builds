import { WeaponNameT } from "../logic/types/WeaponTypes";

type WeaponImagesType = {
    [type in WeaponNameT]: any
}
export const WeaponImages:WeaponImagesType = {
    CrossSniper: require('./images/item_Weapon_SSR_Snipe_fire01.webp'),
    GurenBlade: require('./images/item_Weapon_SR_Sword_Fire01.webp'),
    BlazingRevolver: require('./images/item_Weapon_SSR_Gun_Fire01.webp'),
    AbsoluteZero: require('./images/item_Weapon_SSR_Stave_Ice01.webp'),
    Thunderblades: require('./images/item_Weapon_SSR_Ds_Thunder01.webp'),
    Balmung: require('./images/item_Weapon_SSR_frigg_Ice01.webp'),
    MoltenShieldV2: require('./images/item_Weapon_SSR_ShieldAxe_Fire01.webp'),
    ScytheOfTheCrow: require('./images/item_Weapon_SSR_Sickle_Fire01.webp'),
    ShadowWeaver: require('./images/item_Weapon_SSR_fan_superpower01.webp'),
    Vespers: require('./images/item_Weapon_SSR_Arm_Physic01.webp'),
    RosyEdge: require('./images/item_Weapon_SSR_BigSword_Ice01.webp'),
    Venus: require('./images/item_Weapon_SSR_naimxs_Thunder01.webp'),
    Sparky: require('./images/item_Weapon_SSR_funnel_Fire01.webp'),
    RyusenToshin: require('./images/item_Weapon_SSR_dkatana_Ice01.webp'),
    DualEMStars: require('./images/item_Weapon_SSR_DGun_Thunder.webp'),
    ChakramOfTheSeas: require('./images/item_Weapon_SSR_Darts_Phy01.webp'),
    Powerbreak: require('./images/item_Weapon_SSR_Tianlang_Thunder01.webp'),
    IcewindArrow: require('./images/item_Weapon_SSR_Bow_Ice01.webp'),
    NegatingCube: require('./images/item_Weapon_SSR_Cube_Fire01.webp'),
    
    ThunderousHalberd: require('./images/item_Weapon_SSR_Spear_Thunder01.webp'),
    NightingGale: require('./images/item_Weapon_R_Bow_Phy01.webp'),
    Terminator: require('./images/item_Weapon_SR_Cannon_Ice01.webp'),
    Pummeler: require('./images/item_Weapon_SR_Hammer_Ice01.webp'),
    StaffOfScars: require('./images/item_Weapon_SR_Stave_Thunder01.webp'),
    
    UnyieldingWing: require('./images/item_Weapon_SSR_iceblade_Ice01.webp'),
    // Whip: require('./images/item_Weapon_SSR_Whip_Phy01.webp'),
    // Fen: require('./images/item_Weapon_SSR_Fenrir_Thunder01.webp'),
}
export const OutputWeaponImages:WeaponImagesType = {
    CrossSniper: require('./images/output/item_Weapon_SSR_Snipe_fire01.webp'),
    GurenBlade: require('./images/output/item_Weapon_SR_Sword_Fire01.webp'),
    BlazingRevolver: require('./images/output/item_Weapon_SSR_Gun_Fire01.webp'),
    AbsoluteZero: require('./images/output/item_Weapon_SSR_Stave_Ice01.webp'),
    Thunderblades: require('./images/output/item_Weapon_SSR_Ds_Thunder01.webp'),
    Balmung: require('./images/output/item_Weapon_SSR_frigg_Ice01.webp'),
    MoltenShieldV2: require('./images/output/item_Weapon_SSR_ShieldAxe_Fire01.webp'),
    ScytheOfTheCrow: require('./images/output/item_Weapon_SSR_Sickle_Fire01.webp'),
    ShadowWeaver: require('./images/output/item_Weapon_SSR_fan_superpower01.webp'),
    Vespers: require('./images/output/item_Weapon_SSR_Arm_Physic01.webp'),
    RosyEdge: require('./images/output/item_Weapon_SSR_BigSword_Ice01.webp'),
    Venus: require('./images/output/item_Weapon_SSR_naimxs_Thunder01.webp'),
    Sparky: require('./images/output/item_Weapon_SSR_funnel_Fire01.webp'),
    RyusenToshin: require('./images/output/item_Weapon_SSR_dkatana_Ice01.webp'),
    DualEMStars: require('./images/output/item_Weapon_SSR_DGun_Thunder.webp'),
    ChakramOfTheSeas: require('./images/output/item_Weapon_SSR_Darts_Phy01.webp'),
    Powerbreak: require('./images/output/item_Weapon_SSR_Tianlang_Thunder01.webp'),
    IcewindArrow: require('./images/output/item_Weapon_SSR_Bow_Ice01.webp'),
    NegatingCube: require('./images/output/item_Weapon_SSR_Cube_Fire01.webp'),
    
    ThunderousHalberd: require('./images/output/item_Weapon_SSR_Spear_Thunder01.webp'),
    NightingGale: require('./images/output/item_Weapon_R_Bow_Phy01.webp'),
    Terminator: require('./images/output/item_Weapon_SR_Cannon_Ice01.webp'),
    Pummeler: require('./images/output/item_Weapon_SR_Hammer_Ice01.webp'),
    StaffOfScars: require('./images/output/item_Weapon_SR_Stave_Thunder01.webp'),
    
    UnyieldingWing: require('./images/output/item_Weapon_SSR_iceblade_Ice01.webp'),
    // Whip: require('./images/output/item_Weapon_SSR_Whip_Phy01.webp'),
    // Fen: require('./images/output/item_Weapon_SSR_Fenrir_Thunder01.webp'),
}

export type SkillDataT = {
    "type": "GroundNormalAttack" | "AirNormalAttack" | "GroundHoldAttack" | "AirHoldAttack" | "SneakAttack" | "DodgeAttack" | "Skill" | "Discharge",
    "desc": string,
    "labels": string[],
    "skillDamage": {"Mult": number, "Flat": number}[]
}
export type AllSkillDataT = {
    "Skills": {
        [skill: string]: SkillDataT
    }
}