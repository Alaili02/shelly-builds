import { RawArBeLeEquipmentBonus, RawEmptyEquipmentBonus, RawEnExoBaseEquipmentBonus, RawGlovesBaseEquipmentBonus, RawHelmetBaseEquipmentBonus, RawReactorBaseEquipmentBonus, RawSpBrBoBaseEquipmentBonus, RawVisorBaseEquipmentBonus } from "./data/RawBaseEquipmentBonus";
import { AllL0RandomStats, AllL1RandomStats, AllL2RandomStats, AllL3RandomStats, baseStatKey, CurrentEquipmentT, EnhancementLevelCutoffT, EnhancementLevelT, enhancementStatKey, EquipmentKey, RawBaseEquipmentBonusT, StatKeyT } from "./types/EquipmentTypes";


export const getEquipmentValidKeys = (equipmentKey: EquipmentKey): StatKeyT[] => {
    switch (equipmentKey) {
        case "Armor":
        case "Belt":
        case "Bracers":
        case "Helm":
        case "LegGuards":
        case "Spaulders":
            return [...AllL0RandomStats, ...AllL1RandomStats];
        case "Gloves":
        case "Boots":
            return [...AllL0RandomStats, ...AllL1RandomStats, "Crit"];
        case "Visor":
                return [...AllL0RandomStats, ...AllL1RandomStats, ...AllL2RandomStats, "CritRate%"];
        case "Engine":
        case "Exoskeleton":
            return [...AllL0RandomStats, ...AllL1RandomStats, ...AllL2RandomStats, ...AllL3RandomStats];
        case "Reactor":
            return [...AllL0RandomStats, ...AllL1RandomStats, ...AllL2RandomStats, "AlteredAttack"];
        default:
            return [];
    }
}

export const getBaseEquipmentBonus = (equipmentKey: EquipmentKey, baseStat: baseStatKey, enhancementLevel: EnhancementLevelT):number => {
    switch (equipmentKey) {
        case "Helm":
            return RawHelmetBaseEquipmentBonus[enhancementLevel][baseStat]??0
        case "Gloves":
            return RawGlovesBaseEquipmentBonus[enhancementLevel][baseStat]??0;
        case "Spaulders":
        case "Bracers":
        case "Boots":
            return RawSpBrBoBaseEquipmentBonus[enhancementLevel][baseStat]??0;
        case "Armor":
        case "Belt":
        case "LegGuards":
            return RawArBeLeEquipmentBonus[enhancementLevel][baseStat]??0;
        case "Engine":
        case "Exoskeleton":
            return RawEnExoBaseEquipmentBonus[enhancementLevel][baseStat]??0;
        case "Visor":
            return RawVisorBaseEquipmentBonus[enhancementLevel][baseStat]??0;
        case "Reactor":
            return RawReactorBaseEquipmentBonus[enhancementLevel][baseStat]??0;
        default: return 0;
    }
}

export const getEquipmentSetBonus = (enhancementLevels: {[Slot in EquipmentKey]: number}, equipped: CurrentEquipmentT):{[baseStat in baseStatKey]: number} => {
    const { Visor, Exoskeleton, Reactor, Engine, ...rest} = enhancementLevels;
    const { Visor: EqVisor, Exoskeleton: EqExo, Reactor: EqReactor, Engine: EqEngine, ...eqRest} = equipped;

    // Exit early if one of the necessary equipment is not equipped
    for (let value of Object.values(eqRest)) {
        if (value === "") return ({
            Attack: 0,
            Resistance: 0,
            HP: 0,
            Crit: 0
        })
    }

    const enhancementLevelCutoff = Math.floor(Math.min(...Object.values(rest))/5);
    switch (enhancementLevelCutoff) {
        case 0:
            return ({
                Attack: 0,
                Resistance: 0,
                HP: 0,
                Crit: 0
            });
        case 1:
            return ({
                Attack: 40.38835,
                Resistance: 20.19417,
                HP: 3231.06790,
                Crit: 20.19417
            });
        case 2:
            return ({
                Attack: 87.35534,
                Resistance: 43.67767,
                HP: 6988.42720,
                Crit: 43.67767
            });
        case 3:
            return ({
                Attack: 140.97087,
                Resistance: 70.48544,
                HP: 11277.67000,
                Crit: 70.48544
            });
        case 4:
            return ({
                Attack: 202.05826,
                Resistance: 101.02913,
                HP: 16164.66000,
                Crit: 101.02913
            });
        case 5:
            return ({
                Attack: 270.86603,
                Resistance: 135.43301,
                HP: 21669.28100,
                Crit: 135.43301
            });
        case 6:
            return ({
                Attack: 349.86407,
                Resistance: 174.93204,
                HP: 27989.12700,
                Crit: 174.93204
            });
        case 7:
            return ({
                Attack: 439.41748,
                Resistance: 219.70874,
                HP: 35153.40000,
                Crit: 219.70874
            });
        case 8:
            return ({
                Attack: 541.51460,
                Resistance: 270.75730,
                HP: 43321.16400,
                Crit: 270.75730
            });
        case 9:
            return ({
                Attack: 660.93207,
                Resistance: 330.46603,
                HP: 52874.56200,
                Crit: 330.46603
            });
        case 10:
            return ({
                Attack: 800,
                Resistance: 400,
                HP: 64000,
                Crit: 400
            });
        default:
            return ({
                Attack: 0,
                Resistance: 0,
                HP: 0,
                Crit: 0
            });
    }
    
}

type getEnhancementBonusT = {[levelCutoff in EnhancementLevelCutoffT]: {[enhancementStat in enhancementStatKey]?: number}}
export const getEnhancementEquipmentBonus = (equipmentKey: EquipmentKey):getEnhancementBonusT => {
    switch (equipmentKey) {
        case "Helm":
        case "Armor":
        case "LegGuards":
            return ({
                0: {},
                1: {
                    HP: 908.73785,
                },
                2: {
                    HP: 908.73785,
                    Resistance: 16.511833
                },
                3: {
                    HP: 2115.08735,
                    Resistance: 16.511833
                },
                4: {
                    HP: 3489.55345,
                    Resistance: 16.511833
                },
                5: {
                    HP: 3489.55345,
                    Resistance: 40.702064
                },
                6: {
                    HP: 5267.00975,
                    Resistance: 40.702064
                },
                7: {
                    HP: 5267.00975,
                    Resistance: 72.18568
                },
                8: {
                    HP: 7564.19435,
                    Resistance: 72.18568
                },
                9: {
                    HP: 10251.08765,
                    Resistance: 72.18568
                },
                10: {
                    HP: 10251.08765,
                    Resistance: 121.07676
                },
            });
        case "Spaulders":
        case "Bracers":
        case "Boots":
        case "Belt":
            return ({
                0: {},
                1: {
                    Attack: 11.359223
                },
                2: {
                    Attack: 11.359223,
                    HP: 1056.7573
                },
                3: {
                    Attack: 26.438592,
                    HP: 1056.7573
                },
                4: {
                    Attack: 26.438592,
                    HP: 2431.2234
                },
                5: {
                    Attack: 45.790776,
                    HP: 2431.2234
                },
                6: {
                    Attack: 45.790776,
                    HP: 4208.6797
                },
                7: {
                    Attack: 70.977669,
                    HP: 4208.6797
                },
                8: {
                    Attack: 70.977669,
                    HP: 6505.8643
                },
                9: {
                    Attack: 104.563835,
                    HP: 6505.8643
                },
                10: {
                    Attack: 143.6767,
                    HP: 6505.8643
                }
            });
        case "Gloves":
            return ({
                0: {},
                1: {
                    Attack: 11.359223
                },
                2: {
                    Attack: 24.568689
                },
                3: {
                    Attack: 39.648058
                },
                4: {
                    Attack: 39.648058,
                    Crit: 85.90413
                },
                5: {
                    Attack: 59,
                    Crit: 85.90413
                },
                6: {
                    Attack: 59,
                    Crit: 196.99515
                },
                7: {
                    Attack: 84.186893,
                    Crit: 196.99515
                },
                8: {
                    Attack: 112.9017,
                    Crit: 196.99515
                },
                9: {
                    Attack: 112.9017,
                    Crit: 364.92598
                },
                10: {
                    Attack: 152.014565,
                    Crit: 364.92598
                },
            });
        case "Engine":
            return ({
                0: {},
                1: {
                    Attack: 14.199029
                },
                2: {
                    Attack: 14.199029,
                    HP: 1235.5339
                },
                3: {
                    Attack: 31.412622,
                    HP: 1235.5339
                },
                4: {
                    Attack: 31.412622,
                    HP: 2747.1844
                },
                5: {
                    Attack: 52.49272,
                    HP: 2747.1844
                },
                6: {
                    Attack: 52.49272,
                    HP: 4608.3494
                },
                7: {
                    Attack: 77.94175,
                    HP: 4608.3494
                },
                8: {
                    Attack: 77.94175,
                    HP: 6819.0291
                },
                9: {
                    Attack: 107.75971,
                    HP: 6819.0291
                },
                10: {
                    Attack: 139.762136,
                    HP: 6819.0291
                },
            });
        case "Visor": 
            return ({
                0: {},
                1: {
                    HP: 1135.9224
                },
                2: {
                    HP: 1135.9224,
                    Crit: 77.22087
                },
                3: {
                    HP: 1135.9224,
                    Crit: 77.22087,
                    Resistance: 21.51699
                },
                4: {
                    HP: 2647.5729,
                    Crit: 77.22087,
                    Resistance: 21.51699
                },
                5: {
                    HP: 2647.5729,
                    Crit: 182.62135,
                    Resistance: 21.51699
                },
                6: {
                    HP: 2647.5729,
                    Crit: 182.62135,
                    Resistance: 50.597694
                },
                7: {
                    HP: 4683.4953,
                    Crit: 182.62135,
                    Resistance: 50.597694
                },
                8: {
                    HP: 4683.4953,
                    Crit: 182.62135,
                    Resistance: 85.139564
                },
                9: {
                    HP: 7068.9323,
                    Crit: 182.62135,
                    Resistance: 85.139564
                },
                10: {
                    HP: 7068.9323,
                    Crit: 182.62135,
                    Resistance: 125.142597
                },
            });
        case "Reactor": 
            return ({
                0: {},
                1: {
                    Attack: 14.199029
                },
                2: {
                    Attack: 14.199029,
                    HP: 1235.5339
                },
                3: {
                    Attack: 31.412622,
                    HP: 1235.5339
                },
                4: {
                    Attack: 31.412622,
                    HP: 1235.5339,
                    Resistance: 23.61954
                },
                5: {
                    Attack: 31.412622,
                    HP: 2921.9416,
                    Resistance: 23.61954
                },
                6: {
                    Attack: 54.677185,
                    HP: 2921.9416,
                    Resistance: 23.61954
                },
                7: {
                    Attack: 54.677185,
                    HP: 2921.9416,
                    Resistance: 55.430827
                },
                8: {
                    Attack: 54.677185,
                    HP: 5132.6213,
                    Resistance: 55.430827
                },
                9: {
                    Attack: 84.495145,
                    HP: 5132.6213,
                    Resistance: 55.430827
                },
                10: {
                    Attack: 84.495145,
                    HP: 7692.8153,
                    Resistance: 55.430827
                },
            });
        case "Exoskeleton":
            return ({
                0: {},
                1: {
                    Attack: 14.199029
                },
                2: {
                    Attack: 14.199029,
                    HP: 1235.5339
                },
                3: {
                    Attack: 31.412622,
                    HP: 1235.5339
                },
                4: {
                    Attack: 31.412622,
                    HP: 2747.1844
                },
                5: {
                    Attack: 52.492719,
                    HP: 2747.1844
                },
                6: {
                    Attack: 75.757282,
                    HP: 2747.1844
                },
                7: {
                    Attack: 75.757282,
                    HP: 4783.1068
                },
                8: {
                    Attack: 103.390777,
                    HP: 4783.1068
                },
                9: {
                    Attack: 103.390777,
                    HP: 7168.5438
                },
                10: {
                    Attack: 135.393203,
                    HP: 7168.5438
                },
            }); 
        default: 
            return ({
                0: {},
                1: {},
                2: {},
                3: {},
                4: {},
                5: {},
                6: {},
                7: {},
                8: {},
                9: {},
                10: {},
            });
    }
}