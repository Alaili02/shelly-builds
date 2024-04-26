import { SimulacraNameT, WeaponType } from "../types/WeaponTypes";

// const getElementalResonance = (equippedWeapons: WeaponStoreT, elementalResonance: WeaponElementT) => {
//     let count = 0;
//     (Object.values(loadoutResonance) as WeaponNameT[]).forEach(weaponName => {
//         const simulacraName = WeaponToSimulacra[weaponName];
//         if (WeaponData[simulacraName].Element === elementalResonance)
//             count ++;
//     });
//     if (count >= 2)
//         return ({
//             [`${elementalResonance}Attack%`]: 15,
//             [`${elementalResonance}Resistance%`]: 25
//         });
//     return {};
// }

export const MaxWeaponLevel = 200;

const AnabellaData:WeaponType = {
    SimulacraName: 'Anabella',
    WeaponName: 'CrossSniper',
    'WeaponRarity': 'SSR',
    Element: 'Flame',
    WeaponResonance: 'DPS',
    CombatScore: 0,
    ascensionBonus: {
        'A2': 'Attack',
        'A4': 'Attack'
    },
    baseStats: {
        'Attack': 19.114079,
        'HP': 1165.0486,
        'Crit': 13.652913,
        'Resistance': 0
    },
    multiplicativeStats: (loadoutResonance) => (loadoutResonance.ElementalResonance === "Flame")? 
        ({
            "FlameAttack%": 15,
            "FlameResistance%": 25
        }):{}
}

const ClaudiaData:WeaponType = {
    'SimulacraName': 'Claudia',
    'WeaponName': 'GurenBlade',
    'WeaponRarity': 'SSR',
    Element: 'Physical',
    WeaponResonance: 'DPS',
    CombatScore: 0,
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'HP'
    },
    'baseStats': {
        'Attack': 16.383495,
        'Resistance': 6.826457,
        'HP': 1165.0486,
        'Crit': 0
    },
    multiplicativeStats: (loadoutResonance) => (loadoutResonance.ElementalResonance === "Physical")? 
        ({
            "PhysicalAttack%": 15,
            "PhysicalResistance%": 25
        }):{}
}

const CobaltBData:WeaponType = {
    'SimulacraName': 'CobaltB',
    'WeaponName': 'BlazingRevolver',
    'WeaponRarity': 'SSR',
    Element: 'Flame',
    WeaponResonance: 'DPS',
    CombatScore: 0,
    'baseStats': {
        'Attack': 19.114079,
        'Resistance': 13.652913,
        'HP': 1165.0486,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => (loadoutResonance.ElementalResonance === "Flame")? 
        ({
            "FlameAttack%": 15,
            "FlameResistance%": 25
        }):{}
}

const CocoritterData:WeaponType = {
    'SimulacraName': 'Cocoritter',
    'WeaponName': 'AbsoluteZero',
    'WeaponRarity': 'SSR',
    'Element': 'Frost',
    'WeaponResonance': 'Support',
    CombatScore: 0,
    'baseStats': {
        'Attack': 15.473301,
        'Resistance': 7.964199,
        'HP': 1165.0486,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'HP',
        'A4': 'HP'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const CrowData:WeaponType = {
    'SimulacraName': 'Crow',
    'WeaponName': 'Thunderblades',
    'WeaponRarity': 'SSR',
    'Element': 'Volt',
    'WeaponResonance': 'DPS',
    CombatScore: 0,
    'baseStats': {
        'Attack': 18.93204,
        'Resistance': 14.563107,
        'HP': 1165.0486,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'HP'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const FriggData:WeaponType = {
    'SimulacraName': 'Frigg',
    'WeaponName': 'Balmung',
    'WeaponRarity': 'SSR',
    'Element': 'Frost',
    'WeaponResonance': 'DPS',
    CombatScore: 0,
    'baseStats': {
        'Attack': 18.93204,
        'Resistance': 0,
        'HP': 1165.0486,
        'Crit': 14.563107
    },
    'ascensionBonus': {
        'A2': 'HP',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => (loadoutResonance.ElementalResonance === "Frost")? 
        ({
            "FrostAttack%": 15,
            "FrostResistance%": 25
        }):{}
}

const HumaData:WeaponType = {
    'SimulacraName': 'Huma',
    'WeaponName': 'MoltenShieldV2',
    'WeaponRarity': 'SSR',
    'Element': 'Flame',
    'WeaponResonance': 'Defense',
    CombatScore: 0,
    'baseStats': {
        'Attack': 14.563107,
        'Resistance': 9.101942,
        'HP': 1165.0486,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'HP',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const KingData:WeaponType = {
    'SimulacraName': 'King',
    'WeaponName': 'ScytheOfTheCrow',
    'WeaponRarity': 'SSR',
    'Element': 'Flame',
    'WeaponResonance': 'DPS',
    CombatScore: 0,
    'baseStats': {
        'Attack': 16.383495,
        'Resistance': 6.826457,
        'HP': 1165.0486,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'HP',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const LinData:WeaponType = {
    'SimulacraName': 'Lin',
    'WeaponName': 'ShadowWeaver',
    'WeaponRarity': 'SSR',
    'Element': 'Altered',
    'WeaponResonance': 'DPS',
    CombatScore: 0,
    'baseStats': {
        'Attack': 18.93204,
        'Resistance': 0,
        'HP': 1165.0486,
        'Crit': 14.563107
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const LyraData:WeaponType = {
    'SimulacraName': 'Lyra',
    'WeaponName': 'Vespers',
    'WeaponRarity': 'SSR',
    'Element': 'Physical',
    'WeaponResonance': 'Support',
    'CombatScore': 40,
    'baseStats': {
        'Attack': 15.473301,
        'Resistance': 7.964199,
        'HP': 1165.0486,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => {
        
        const elementalResonance = (loadoutResonance.ElementalResonance === "Physical")?{
            "PhysicalAttack%": 15,
            "PhysicalResistance%": 25
        }:{};

        const weaponResonance = (loadoutResonance.EquippedWeaponResonance === "Benediction")?{
            "HP%": 10
        }:{};

        return {...elementalResonance, ...weaponResonance};
    }
}

const MerylData:WeaponType = {
    'SimulacraName': 'Meryl',
    'WeaponName': 'RosyEdge',
    'WeaponRarity': 'SSR',
    'Element': 'Frost',
    'WeaponResonance': 'Defense',
    CombatScore: 0,
    'baseStats': {
        'Attack': 15.473301,
        'Resistance': 7.964199,
        'HP': 1165.0486,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'HP',
        'A4': 'HP'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const NemesisData:WeaponType = {
    'SimulacraName': 'Nemesis',
    'WeaponName': 'Venus',
    'WeaponRarity': 'SSR',
    'Element': 'Volt',
    'WeaponResonance': 'Support',
    CombatScore: 0,
    'baseStats': {
        'Attack': 18.93204,
        'Resistance': 0,
        'HP': 1165.0486,
        'Crit': 14.563107
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => (loadoutResonance.ElementalResonance === "Volt")? 
        ({
            "VoltAttack%": 15,
            "VoltResistance%": 25
        }):{}
}

const RubyData:WeaponType = {
    'SimulacraName': 'Ruby',
    'WeaponName': 'Sparky',
    'WeaponRarity': 'SSR',
    'Element': 'Flame',
    'WeaponResonance': 'DPS',
    CombatScore: 0,
    'baseStats': {
        'Attack': 18.93204,
        'Resistance': 0,
        'HP': 1165.0486,
        'Crit': 14.563107
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => (loadoutResonance.ElementalResonance === "Flame")? 
        ({
            "FlameAttack%": 15,
            "FlameResistance%": 25
        }):{}
}

const SakiData:WeaponType = {
    'SimulacraName': 'Saki',
    'WeaponName': 'RyusenToshin',
    'WeaponRarity': 'SSR',
    'Element': 'Frost',
    'WeaponResonance': 'Defense',
    CombatScore: 0,
    'baseStats': {
        'Attack': 15.473301,
        'Resistance': 7.964199,
        'HP': 1165.0486,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'HP'
    },
    multiplicativeStats: (loadoutResonance) => (loadoutResonance.ElementalResonance === "Frost")? 
        ({
            "FrostAttack%": 15,
            "FrostResistance%": 25
        }):{}
}

const SamirData:WeaponType = {
    'SimulacraName': 'Samir',
    'WeaponName': 'DualEMStars',
    'WeaponRarity': 'SSR',
    'Element': 'Volt',
    'WeaponResonance': 'DPS',
    CombatScore: 43.71,
    'baseStats': {
        'Attack': 18.93204,
        'Resistance': 0,
        'HP': 1165.0486,
        'Crit': 14.563107
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const ShiroData:WeaponType = {
    'SimulacraName': 'Shiro',
    'WeaponName': 'ChakramOfTheSeas',
    'WeaponRarity': 'SSR',
    'Element': 'Physical',
    'WeaponResonance': 'DPS',
    'CombatScore': 43.66,
    'baseStats': {
        'Attack': 19.114079,
        'Resistance': 0,
        'HP': 1165.0486,
        'Crit': 13.652913
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'HP'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const TianLangData:WeaponType = {
    'SimulacraName': 'TianLang',
    'WeaponName': 'Powerbreak',
    'WeaponRarity': 'SSR',
    'Element': 'Volt',
    'WeaponResonance': 'DPS',
    CombatScore: 0,
    'baseStats': {
        'Attack': 18.93204,
        'Resistance': 0,
        'HP': 1165.0486,
        'Crit': 14.563107
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'HP'
    },
    multiplicativeStats: (loadoutResonance) => (loadoutResonance.ElementalResonance === "Volt")? 
        ({
            "VoltAttack%": 15,
            "VoltResistance%": 25
        }):{}
}

const TsubasaData:WeaponType = {
    'SimulacraName': 'Tsubasa',
    'WeaponName': 'IcewindArrow',
    'WeaponRarity': 'SSR',
    'Element': 'Frost',
    'WeaponResonance': 'DPS',
    CombatScore: 43.71,
    'baseStats': {
        'Attack': 18.93204,
        'Resistance': 0,
        'HP': 1165.0486,
        'Crit': 14.563107
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const ZeroData:WeaponType = {
    'SimulacraName': 'Zero',
    'WeaponName': 'NegatingCube',
    'WeaponRarity': 'SSR',
    'Element': 'Flame',
    'WeaponResonance': 'Support',
    CombatScore: 43.76,
    'baseStats': {
        'Attack': 14.563107,
        'Resistance': 9.101942,
        'HP': 1165.0486,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'HP'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}


// Fix 4 star stats
const EchoData:WeaponType = {
    'SimulacraName': 'Echo',
    'WeaponName': 'ThunderousHalberd',
    'WeaponRarity': 'SR',
    'Element': 'Volt',
    'WeaponResonance': 'DPS',
    CombatScore: 0,
    'baseStats': {
        'Attack': 11.190034,
        'Resistance': 3.680932,
        'HP': 753.8549,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'HP',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const HildaData:WeaponType = {
    'SimulacraName': 'Hilda',
    'WeaponName': 'Terminator',
    'WeaponRarity': 'SR',
    'Element': 'Frost',
    'WeaponResonance': 'DPS',
    CombatScore: 0,
    'baseStats': {
        'Attack': 11.778983,
        'Resistance': 2.944746,
        'HP': 753.8549,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const EneData:WeaponType = {
    'SimulacraName': 'Ene',
    'WeaponName': 'Pummeler',
    'WeaponRarity': 'SR',
    'Element': 'Frost',
    'WeaponResonance': 'Defense',
    CombatScore: 0,
    'baseStats': {
        'Attack': 9.423186,
        'Resistance': 5.889492,
        'HP': 753.8549,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'HP',
        'A4': 'HP'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const BaiLingData:WeaponType = {
    'SimulacraName': 'BaiLing',
    'WeaponName': 'NightingGale',
    'WeaponRarity': 'SR',
    'Element': 'Physical',
    'WeaponResonance': 'DPS',
    CombatScore: 0,
    'baseStats': {
        'Attack': 12.250143,
        'Resistance': 0,
        'HP': 753.8549,
        'Crit': 9.423186
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const PepperData:WeaponType = {
    'SimulacraName': 'Pepper',
    'WeaponName': 'StaffOfScars',
    'WeaponRarity': 'SR',
    'Element': 'Volt',
    'WeaponResonance': 'Support',
    CombatScore: 0,
    'baseStats': {
        'Attack': 10.012136,
        'Resistance': 5.153305,
        'HP': 753.8549,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'HP',
        'A4': 'HP'
    },
    multiplicativeStats: (loadoutResonance) => ({})
}

const AlyssData:WeaponType = {
    'SimulacraName': 'Alyss',
    'WeaponName': 'UnyieldingWing',
    'WeaponRarity': 'SSR',
    'Element': 'Frost',
    'WeaponResonance': 'DPS',
    CombatScore: 0,
    'baseStats': {
        'Attack': 18.203884,
        'Resistance': 4.550971,
        'HP': 1165.0486,
        'Crit': 0
    },
    'ascensionBonus': {
        'A2': 'Attack',
        'A4': 'Attack'
    },
    multiplicativeStats: (loadoutResonance) => (loadoutResonance.ElementalResonance === "Frost")? 
    ({
        "FrostAttack%": 15,
        "FrostResistance%": 25
    }):{}
}

type WeaponDataT = {[name in SimulacraNameT]: WeaponType}
const WeaponData:WeaponDataT = {
    Anabella: AnabellaData,
    Claudia: ClaudiaData,
    CobaltB: CobaltBData,
    Cocoritter: CocoritterData,
    Crow: CrowData,
    Frigg: FriggData,
    Huma: HumaData,
    King: KingData,
    Lin: LinData,
    Lyra: LyraData,
    Meryl: MerylData,
    Nemesis: NemesisData,
    Ruby: RubyData,
    Saki: SakiData,
    Samir: SamirData,
    Shiro: ShiroData,
    TianLang: TianLangData,
    Tsubasa: TsubasaData,
    Zero: ZeroData,

    Echo: EchoData,
    Hilda: HildaData,
    Ene: EneData,
    BaiLing: BaiLingData,
    Pepper: PepperData,

    Alyss: AlyssData
}

export default WeaponData;