import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import LevelCurve from '../res/curves/LevelCurve';
import { SuppressorData } from '../res/logic/data/RawSuppressorStats';
import WeaponData from '../res/logic/data/WeaponData';
import { baseStatKey, CustomStatKeyT, EquipmentKey, L2RandomStat, StatKeyT } from '../res/logic/types/EquipmentTypes';
import { getResonance } from '../res/logic/WeaponLogic';
import { selectEquippedWeaponLoadoutEntry, selectEquippedWeapons, selectMatrixLoadout, selectStatFromEquipment } from './loadoutSlice';
import { selectMatrixSetFromInventory } from './matrixInventorySlice';
import { selectSimulacraFromInventory, selectWeaponStats } from './weaponInventorySlice';
import { WeaponNameT, WeaponStoreT, WeaponToSimulacra } from '../res/logic/types/WeaponTypes';
import { getMatrixSetStats } from '../res/logic/MatrixLogic';


export type AllKeys = 'Level' | 'HP' |
    'Crit' | 'CritRate' | 'CritDamage' |
    'Attack' | 'PhysicalAttack' | 'FrostAttack' | 'FlameAttack' | 'VoltAttack' | 'AlteredAttack' |
    'Resistance' | 'PhysicalResistance' | 'FrostResistance' | 'FlameResistance' | 'VoltResistance' | 'AlteredResistance';

export const AllSuppressorKeys = [
    '0.0',
    '1.1', '1.2', '1.3', '1.4', '1.5', 
    '2.1', '2.2', '2.3', '2.4', '2.5', 
    '3.1', '3.2', '3.3', '3.4', '3.5', 
    '4.1', '4.2', '4.3', '4.4', '4.5', 
    '5.1', '5.2', '5.3', '5.4', '5.5', 
    '6.1', '6.2', '6.3', '6.4', '6.5', 
    '7.1', '7.2', '7.3', '7.4', '7.5', 
    '8.1', '8.2', '8.3', '8.4', '8.5', 
] as const;
export type SuppressorKeyT = typeof AllSuppressorKeys[number];

type CharacterT = {
    'Name': string,
    'Crew': string,
    'Level': number,
    'Suppressor': SuppressorKeyT,
    'CustomStats': {[stat in CustomStatKeyT]?: number}
    'EnhancementLevel': {[Slot in EquipmentKey]: number}
}

const initialState: CharacterT = {
    'Name': '',
    'Crew': '',
    'Level': 1,
    'Suppressor': '0.0',
    'CustomStats': {},
    'EnhancementLevel': {
        'Helm': 0,
        'Bracers': 0,
        'Armor': 0,
        'Boots': 0,
        'Belt': 0,
        'Gloves': 0,
        'LegGuards': 0,
        'Spaulders': 0,
        'Reactor': 0,
        'Engine': 0,
        'Visor': 0,
        'Exoskeleton': 0
    }
};

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setPlayerName: (state, action: PayloadAction<string>) => {state.Name = action.payload;},
        setPlayerCrew: (state, action: PayloadAction<string>) => {state.Crew = action.payload;},
        setPlayerLevel: (state, action: PayloadAction<number>) => {state.Level = action.payload},
        setPlayerSuppressor: (state, action: PayloadAction<SuppressorKeyT>) => {state.Suppressor = action.payload;},
        setCustomStat: (state, action: PayloadAction<{StatKey:CustomStatKeyT,Value:number}>) => {
            const { StatKey, Value } = action.payload;
            state.CustomStats[StatKey] = Value;
        },
        setEquipmentEnhancementLevel: (state, action: PayloadAction<{EquipmentType: EquipmentKey,Level: number}>) => {
            const { EquipmentType, Level } = action.payload;
            state.EnhancementLevel[EquipmentType] = Level;
        },
        overwriteCharacter: (state, action: PayloadAction<CharacterT>) => {
            return action.payload;
        }
    }
});

export const { 
    setPlayerLevel, setPlayerSuppressor,
    setPlayerName, setPlayerCrew,
    setCustomStat,
    setEquipmentEnhancementLevel,
    overwriteCharacter } = characterSlice.actions;

const Aggregate = (state: RootState, key: StatKeyT):number => {

    // const {Attack: LevelAttack, HP: LevelHP, Resistance: LevelResistance} = LevelCurve[state.character.Level];
    // const {Attack: SupAttack, HP: SupHP, Resistance: SupResistance, Crit: SupCrit} = SuppressorData[state.character.Suppressor];

    let output:any = {};
    output[key] = {};

    const WeaponMatrixStats:{[key in baseStatKey]: number} = {
        'Attack': 0,
        'Crit': 0,
        'HP': 0,
        'Resistance': 0
    };
    let WeaponMultiplicativeStats:{[key in L2RandomStat]?: number} = {}
    const EquippedWeaponNames:WeaponStoreT = selectEquippedWeapons(state);
    const EquippedWeaponResonance = getResonance(EquippedWeaponNames);

    (Object.values(EquippedWeaponNames) as (WeaponNameT|"")[]).forEach((weaponName) => {
        if (weaponName == "") return;
        const simulacraName = WeaponToSimulacra[weaponName];
        const weaponStats = selectWeaponStats(state, simulacraName);
        const matrixSet = selectMatrixSetFromInventory(state, selectMatrixLoadout(state, selectSimulacraFromInventory(state, simulacraName).Equips));
        const matrixSetStats = getMatrixSetStats(matrixSet);

        (Object.values(['Attack', 'HP', 'Crit', 'Resistance']) as baseStatKey[]).forEach((stat) => {
            WeaponMatrixStats[stat] += (weaponStats[stat]??0) + (matrixSetStats[stat]??0);
        });

        WeaponMultiplicativeStats = {
            ...WeaponMultiplicativeStats,
            ...WeaponData[simulacraName].multiplicativeStats(EquippedWeaponResonance)
        }
    });
    
    switch (key) {
        case 'HP': {
            output[key]["initial"] = 0;
            output[key]["level"] = LevelCurve[state.character.Level].HP;
            output[key]["supressor"] = SuppressorData[state.character.Suppressor].HP;
            output[key]["equipment"] = selectStatFromEquipment(state, key)
            output[key]["Weapons+Matrices"] = WeaponMatrixStats[key];
            return (
                (
                    0 + 
                    LevelCurve[state.character.Level].HP + 
                    SuppressorData[state.character.Suppressor].HP + 
                    selectStatFromEquipment(state, key) + 
                    WeaponMatrixStats[key] +
                    (state.character.CustomStats[key]??0)
                ) * (
                    1 + Aggregate(state, "HP%")/100
                )
            );
        }
        case 'HP%': {
            output[key]["initial"] = 0;
            output[key]["equipment"] = selectStatFromEquipment(state, key)
            return (
                selectStatFromEquipment(state, "HP%") +
                (WeaponMultiplicativeStats["HP%"]??0) +
                (state.character.CustomStats["HP%"]??0)
            );
        }
        case 'Crit': {
            output[key]["initial"] = 0;
            output[key]["supressor"] = SuppressorData[state.character.Suppressor].Crit;
            output[key]["equipment"] = selectStatFromEquipment(state, key)
            output[key]["Weapons+Matrices"] = WeaponMatrixStats[key];
            return (
                0 + 
                SuppressorData[state.character.Suppressor].Crit + 
                selectStatFromEquipment(state, key) + 
                WeaponMatrixStats[key] +
                (state.character.CustomStats[key]??0)
            );
        }
        case 'Attack': return (
            0 + 
            LevelCurve[state.character.Level].Attack +
            SuppressorData[state.character.Suppressor].Attack +
            selectStatFromEquipment(state, key) +
            WeaponMatrixStats[key] +
            (state.character.CustomStats[key]??0)
        );

        case 'VoltAttack':
        case 'FlameAttack': 
        case 'FrostAttack': 
        case 'PhysicalAttack': {
            return (
                    (
                        0 + 
                        Aggregate(state, 'Attack') + 
                        selectStatFromEquipment(state, key) +
                        (state.character.CustomStats[`Pure${key}`]??0)
                    ) * (
                        1 + Aggregate(state, `${key}%`)/100
                        // (selectStatFromEquipment(state, `${key}%`)/100) +
                        // ((WeaponMultiplicativeStats[`${key}%`]??0)/100)
                    )  
                );
            }
        case 'AlteredAttack':
            return 0 + Math.max(
                Aggregate(state, 'PhysicalAttack'), 
                Aggregate(state, 'FlameAttack'), 
                Aggregate(state, 'FrostAttack'), 
                Aggregate(state, 'VoltAttack')
            ) + selectStatFromEquipment(state, key) + (state.character.CustomStats[key]??0);

        case 'VoltAttack%':
        case 'FlameAttack%': 
        case 'FrostAttack%': 
        case 'PhysicalAttack%':
        case 'VoltResistance%':
        case 'FlameResistance%': 
        case 'FrostResistance%': 
        case 'PhysicalResistance%':
        case 'AlteredResistance%': {
            return (
                selectStatFromEquipment(state, key) +
                (WeaponMultiplicativeStats[key]??0) +
                (state.character.CustomStats[key]??0)
            )
        }

        case 'VoltAttack%':
        case 'FlameDamage%': 
        case 'FrostDamage%': 
        case 'PhysicalDamage%': {
            return (
                selectStatFromEquipment(state, key) +
                (state.character.CustomStats[key]??0)
            )
        }

        case 'Resistance':
            return (
                0 +
                LevelCurve[state.character.Level].Resistance +
                SuppressorData[state.character.Suppressor].Resistance +
                selectStatFromEquipment(state, key) +
                WeaponMatrixStats[key] +
                (state.character.CustomStats[key]??0)
            );

        case 'VoltResistance':
        case 'FlameResistance': 
        case 'FrostResistance': 
        case 'PhysicalResistance':
        case 'AlteredResistance': {
            return (
                    (
                        0 + 
                        Aggregate(state, 'Resistance') + selectStatFromEquipment(state, key) + (state.character.CustomStats[key]??0)
                    ) * (
                        1 + Aggregate(state, `${key}%`)/100
                    )  
                );
            }
        
        case 'CritRate%':
            return 0 + selectStatFromEquipment(state, "CritRate%");
        case 'CritDamage%':
            return 50;

        default:
            return 0;
    }
}

export const selectCharacterState = (state: RootState) => state.character;
export const selectLevel = (state: RootState) => state.character.Level;
export const selectSupressor = (state: RootState) => state.character.Suppressor;
export const selectEnhancementLevel = (state: RootState) => state.character.EnhancementLevel;
export const selectCustomStats = (state: RootState) => state.character.CustomStats;

export const selectCrit = (state: RootState) => Aggregate(state, 'Crit');
export const selectCritRate = (state: RootState) => Aggregate(state, 'CritRate%');
export const selectCritDamage = (state: RootState) => Aggregate(state, 'CritDamage%');
export const selectHP = (state: RootState) => Aggregate(state, 'HP');
export const selectAttack = (state: RootState) => Aggregate(state, 'Attack');
export const selectAlteredAttack = (state: RootState) => Aggregate(state, 'AlteredAttack');
export const selectPhysicalAttack = (state: RootState) => Aggregate(state, 'PhysicalAttack');
export const selectFrostAttack = (state: RootState) => Aggregate(state, 'FrostAttack');
export const selectFlameAttack = (state: RootState) => Aggregate(state, 'FlameAttack');
export const selectVoltAttack = (state: RootState) => Aggregate(state, 'VoltAttack')
export const selectResistance = (state: RootState) => Aggregate(state, 'Resistance');
export const selectPhysicalResistance = (state: RootState) => Aggregate(state, 'PhysicalResistance');
export const selectFrostResistance = (state: RootState) => Aggregate(state, 'FrostResistance');
export const selectFlameResistance = (state: RootState) => Aggregate(state, 'FlameResistance');
export const selectVoltResistance = (state: RootState) => Aggregate(state, 'VoltResistance');
export const selectAlteredResistance = (state: RootState) => Aggregate(state, 'AlteredResistance');

export const selectAllStats = (state: RootState) => {
    return ({
        Level: selectLevel(state),
        Suppressor: selectSupressor(state),
        Crit: selectCrit(state),
        CritRate: selectCritRate(state),
        CritDamage: selectCritDamage(state),
        HP: selectHP(state),
        Attack: selectAttack(state),
        AlteredAttack: selectAlteredAttack(state),
        PhysicalAttack: selectPhysicalAttack(state),
        FrostAttack: selectFrostAttack(state),
        FlameAttack: selectFlameAttack(state),
        VoltAttack: selectVoltAttack(state),
        Resistance: selectResistance(state),
        PhysicalResistance: selectPhysicalResistance(state),
        FrostResistance: selectFrostResistance(state),
        FlameResistance: selectFlameResistance(state),
        VoltResistance: selectVoltResistance(state),
        AlteredResistance: selectAlteredResistance(state),
        EnhancementLevel: state.character.EnhancementLevel
    });
}

export const selectStat = (state: RootState, stat: StatKeyT) => {
    return Aggregate(state, stat);
}

export default characterSlice.reducer;