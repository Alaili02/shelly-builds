

export const AllBasicEquipmentTypes = ['Helm', 'Spaulders', 'Armor', 'Bracers', 'Belt', 'Gloves', 'LegGuards', 'Boots'] as const;
export const AllNewEquipmentTypes = ['Reactor', 'Visor', 'Engine', 'Exoskeleton'] as const;

export const AllEquipmentTypes = ['Helm', 'Spaulders', 'Armor', 'Bracers', 'Belt', 'Gloves', 'LegGuards', 'Boots', 'Engine', 'Visor', 'Reactor', 'Exoskeleton'] as const;
export type EquipmentKey = typeof AllEquipmentTypes[number];

export const AllRarities = ['Elite', 'Fortress'] as const;
export type EquipmentRarityKey = typeof AllRarities[number];


const AllBaseStats = ['Attack', 'HP', 'Resistance', 'Crit'] as const;
const AllEnhancementStats = AllBaseStats;

export type baseStatKey = typeof AllBaseStats[number];
export type enhancementStatKey = typeof AllEnhancementStats[number];

export const AllL0RandomStats = ['Attack', 'Resistance', 'HP'] as const;
export const AllL1RandomStats = [
    'PhysicalAttack', 'FrostAttack', 'FlameAttack', 'VoltAttack',
    'PhysicalResistance', 'FrostResistance', 'FlameResistance', 'VoltResistance',
] as const;

export const AllL2RandomStats = [
    'HP%',
    'PhysicalAttack%', 'FrostAttack%', 'FlameAttack%', 'VoltAttack%',
    'PhysicalResistance%', 'FrostResistance%', 'FlameResistance%', 'VoltResistance%', 'AlteredResistance%'
] as const;
export type L2RandomStat = typeof AllL2RandomStats[number];

export const AllL3RandomStats = ['PhysicalDamage%', 'FrostDamage%', 'FlameDamage%', 'VoltDamage%'] as const;
export const AllL4RandomStats = ['SkillDamage%', 'DashDamage%', 'DischargeDamage%'] as const;
export type L4RandomStat = typeof AllL4RandomStats[number];

export const AllStatKeys = [
    ...AllL0RandomStats,
    ...AllL1RandomStats,
    ...AllL2RandomStats,
    ...AllL3RandomStats,
    ...AllL4RandomStats,
    "AlteredAttack", "AlteredResistance", "AlteredDamage%",
    "Crit", "CritRate%", "CritDamage%"
] as const;
export type StatKeyT = typeof AllStatKeys[number];
export type CustomStatKeyT = StatKeyT | 'PurePhysicalAttack' | 'PureFlameAttack' | 'PureFrostAttack' | 'PureVoltAttack' | 'PureAlteredAttack'

export const AllPhysicalStats:CustomStatKeyT[] = ['PurePhysicalAttack', 'PhysicalAttack%', 'PhysicalDamage%'];
export const AllFlameStats:CustomStatKeyT[] = ['PureFlameAttack', 'FlameAttack%', 'FlameDamage%'];
export const AllFrostStats:CustomStatKeyT[] = ['PureFrostAttack', 'FrostAttack%', 'FrostDamage%'];
export const AllVoltStats:CustomStatKeyT[] = ['PureVoltAttack', 'VoltAttack%', 'VoltDamage%'];
export const AllAlteredStats:CustomStatKeyT[] = ['PureAlteredAttack', 'AlteredDamage%'];


export const AllEnhancementLevelCutoffs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type EnhancementLevelCutoffT = typeof AllEnhancementLevelCutoffs[number];
export const MaxValidEnhancementLevel = 50;
export const MaxValidEnhancementCutoff = MaxValidEnhancementLevel/5;
const AllEnhancementLevels = [
    0, 
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50
] as const;
export type EnhancementLevelT = typeof AllEnhancementLevels[number];

export interface EquipmentPieceI {
    ID: string,
    Rarity: EquipmentRarityKey,
    AdvancementLvl: number,
    BreakthroughLvl?: number,
    EquipmentType: EquipmentKey,
    // enhancement: {[enhancementStat in enhancementStatKey]?: number},
    random: {[randomStat in StatKeyT | 'Empty']?: number},
    breakthrough?: {[randomStat in StatKeyT | 'Empty']?: number},
    titan?: {[randomStat in L4RandomStat |'Empty']?: number}
}

export type EquipmentLoadoutT = {[key in EquipmentKey]: EquipmentPieceI}
export type CurrentEquipmentT = {[equipmentKey in EquipmentKey]: string}

export type RawBaseEquipmentBonusT = {
    [level in EnhancementLevelT]: {
        [stat in baseStatKey]?: number
    }
}