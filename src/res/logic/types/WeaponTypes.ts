import { MatrixSetIDT } from "../../../store/matrixInventorySlice";
import { L2RandomStat } from "./EquipmentTypes";

export const AllSimulacra = [
    'Anabella', 'Claudia', 'CobaltB', 'Cocoritter', 'Crow', 'Frigg', 'Huma', 
    'King', 'Lin', 'Lyra', 'Meryl', 'Nemesis', 'Ruby', 'Saki',
    'Samir', 'Shiro', 'TianLang', 'Tsubasa', 'Zero', 
    'Echo', 'Pepper', 'Hilda', 'Ene', 'BaiLing',
    'Alyss'] as const;
export type SimulacraNameT = typeof AllSimulacra[number];

export const AllWeapons = [
    'AbsoluteZero', 'Balmung', 'BlazingRevolver', 'ChakramOfTheSeas', 'CrossSniper', 
    'DualEMStars', 'GurenBlade', 'IcewindArrow', 'MoltenShieldV2', 'NegatingCube', 
    'Powerbreak', 'RosyEdge', 'RyusenToshin', 'ScytheOfTheCrow', 'ShadowWeaver', 'Sparky', 
    'Thunderblades', 'Venus', 'Vespers', 
    'ThunderousHalberd', 'NightingGale', 'Terminator', 'Pummeler', 'StaffOfScars',
    'UnyieldingWing'] as const;
export type WeaponNameT = typeof AllWeapons[number];

type WeaponToSimulacraT = {
    [Weapon in WeaponNameT]: SimulacraNameT
}
export const WeaponToSimulacra:WeaponToSimulacraT = {
    'AbsoluteZero': 'Cocoritter',
    'Balmung': 'Frigg',
    'BlazingRevolver': 'CobaltB',
    'ChakramOfTheSeas': 'Shiro',
    'CrossSniper': 'Anabella',
    'DualEMStars': 'Samir',
    'GurenBlade': 'Claudia',
    'IcewindArrow': 'Tsubasa',
    'MoltenShieldV2': 'Huma',
    'NegatingCube': 'Zero',
    'Powerbreak': 'TianLang',
    'RosyEdge': 'Meryl',
    'RyusenToshin': 'Saki',
    'ScytheOfTheCrow': 'King',
    'ShadowWeaver': 'Lin',
    'Sparky': 'Ruby',
    'Thunderblades': 'Crow',
    'Venus': 'Nemesis',
    'Vespers': 'Lyra',

    'ThunderousHalberd': 'Echo',
    'NightingGale': 'BaiLing',
    'Terminator': 'Hilda',
    'Pummeler': 'Ene',
    'StaffOfScars': 'Pepper',

    'UnyieldingWing': 'Alyss'
}

export const AllMatrices = [
    'Alyss', 'Anabella', 
    'Lyra', 'TianLang', 'Lin', 'Saki',
    'Claudia', 'CobaltB', 'Cocoritter', 'Crow', 'Frigg', 'Huma', 
    'King', 'Meryl', 'Nemesis', 'Ruby',
    'Samir', 'Shiro', 'Tsubasa', 'Zero',
    'BaiLing', 'Ene', 'Echo', 'Hilda', 'Pepper',
    'Apophis', 'Barbarossa', 'FrostBot', 'Robarg', 'Sobek',] as const;
export type MatrixNameT = typeof AllMatrices[number];

export const AllWeaponElements = ['Flame', 'Frost', 'Volt', 'Physical', 'Altered'] as const;
export type WeaponElementT = typeof AllWeaponElements[number];

export const AllWeaponResonances = ['DPS', 'Defense', 'Support'] as const;
export type WeaponResonanceT = typeof AllWeaponResonances[number];

export const AllMatrixSlots = ['Emotion', 'Mind', 'Memory', 'Faith'] as const;
export type MatrixSlotT = typeof AllMatrixSlots[number];



export type WeaponIndexT = 1 | 2 | 3;
export type WeaponStoreT = {
    [WeaponIndex in WeaponIndexT]: WeaponNameT | ""
}

export type DamageTypeT = "Flame" | "Frost" | "Volt" | "Physical" | "Altered";
export type ElementalResonanceT = "Flame" | "Frost" | "Volt" | "Physical" | "None";
export type EquippedWeaponResonanceT = "Attack" | "Benediction" | "Fortitude" | "Balanced";
export type WeaponRarityT = "SR" | "SSR";

export type LoadoutResonanceT = {
    "ElementalResonance": ElementalResonanceT,
    "EquippedWeaponResonance": EquippedWeaponResonanceT
}


export type WeaponType = {
    'SimulacraName': SimulacraNameT,
    'WeaponName': WeaponNameT,
    'WeaponRarity': WeaponRarityT,
    'Element': WeaponElementT,
    'WeaponResonance': WeaponResonanceT,
    'CombatScore': number,
    'baseStats': BaseStatsT,
    'ascensionBonus': {
        'A2': 'Attack' | 'HP',
        'A4': 'Attack' | 'HP'
    },
    'multiplicativeStats': (loadoutResonance: LoadoutResonanceT) => {[stat in L2RandomStat]?: number}
}

export type WeaponStateT = {
    'Level': number,
    'AscensionLevel': number,
    'Equips': string,
}

export type WeaponInventoryT = {
    [simulacraName in SimulacraNameT]?: WeaponStateT
}

export type BaseStatsT = {
    'Attack': number,
    'HP': number,
    'Crit': number,
    'Resistance': number
}
