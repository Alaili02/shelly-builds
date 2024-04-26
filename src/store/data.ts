import { CustomStatKeyT, EquipmentKey, EquipmentRarityKey, StatKeyT } from '../res/logic/types/EquipmentTypes';
import { v4 as uuidv4 } from 'uuid';
import { StoreMatrixT } from './matrixInventorySlice';
import { SimulacraNameT, WeaponNameT, DamageTypeT, MatrixNameT } from '../res/logic/types/WeaponTypes';

type KeywordsT = {
    'English': {
        'Equipment': {
            'Rarity': {[Rarity in EquipmentRarityKey]: string},
            'Type': {[Rarity in EquipmentRarityKey]: {[Type in EquipmentKey]: string}}
        },
        'Weapon': {
            [weaponName in WeaponNameT]: string
        },
        'Simulacra': {
            [simulacraName in SimulacraNameT]: string
        },
        'Matrix': {
            [matrixName in SimulacraNameT|MatrixNameT]: string
        },
        'Stat': {
            [statName in StatKeyT | CustomStatKeyT | 'Empty']: string
        },
        'Character': {
            'Suppressor': 'Suppressor',
            'CS': 'Combat Score',
            'Level': 'Level'
        },
        'Attributes': {
            [damageType in DamageTypeT]: string
        },
        'UI': {
            'Attack': string
            'Pure': string
            'Flat': string
            'Damage': string,
            'Total': string,
            'Resistance': string,
            'EnhancementLevel': string,
            'advancement': {
                0: string,
                1: string
            }
        }
    }
}
export const Keywords:KeywordsT = {
    'English': {
        'Equipment': {
            'Rarity': {
                'Fortress': 'Fortress',
                'Elite': 'Elite',
            },
            'Type': {
                'Fortress': {
                    'Helm': 'Helm',
                    'Spaulders': 'Spaulders',
                    'Armor': 'Armor',
                    'Bracers': 'Bracers',
                    'Belt': 'Belt',
                    'Gloves': 'Hand Guards',
                    'LegGuards': 'Leg Guards',
                    'Boots': 'Sabatons',
                    'Reactor': 'Microreactor',
                    'Engine': 'Combat Engine',
                    'Visor': 'Tactics Eyepiece',
                    'Exoskeleton': 'Exoskeleton'
                },
                'Elite': {
                    'Helm': 'Combat Helmet',
                    'Spaulders': 'Shoulder Guards',
                    'Armor': 'Combat Suit',
                    'Bracers': 'Armbands',
                    'Belt': 'Combat Belt',
                    'Gloves': 'Gloves',
                    'LegGuards': 'Combat Leggings',
                    'Boots': 'Combat Boots',
                    'Reactor': 'Microreactor',
                    'Engine': 'Combat Engine',
                    'Visor': 'Tactics Eyepiece',
                    'Exoskeleton': 'Exoskeleton'
                }
            }
        },
        'Weapon': {
            'AbsoluteZero': 'Absolute Zero',
            'Balmung': 'Balmung',
            'BlazingRevolver': 'Flaming Revolver',
            'ChakramOfTheSeas': 'Chakram of the Seas',
            'CrossSniper': 'Clover Cross',

            'DualEMStars': 'Dual EM Stars',
            'GurenBlade': 'Guren Blade',
            'IcewindArrow': 'Icewind Arrow',
            'MoltenShieldV2': 'Molten Shield V2',
            'NegatingCube': 'Negating Cube',

            'Powerbreak': 'Thunderbreaker',
            'RosyEdge': 'Rosy Edge',
            'RyusenToshin': 'Heartstream',
            'ScytheOfTheCrow': 'Scythe of the Crow',
            'ShadowWeaver': 'Shadoweave',
            'Sparky': 'Spark',

            'Thunderblades': 'Thunderblades',
            'Venus': 'Venus',
            'Vespers': 'Vesper',

            'ThunderousHalberd': 'Thunderous Halberd',
            'Terminator': 'The Terminator',
            'Pummeler': 'Pummeler',
            'StaffOfScars': 'Staff of Scars',
            'NightingGale': 'Nightingale\'s Feather',

            'UnyieldingWing': 'Unyielding Wing'
        },
        'Simulacra': {
            'Anabella': 'Anabella',
            'Claudia': 'Claudia',
            'CobaltB': 'Cobalt-B',
            'Cocoritter': 'Cocoritter',
            'Crow': 'Crow',
            'Frigg': 'Frigg',
            'Huma': 'Huma',
            'King': 'King',
            'Lin': 'Lin',
            'Lyra': 'Lyra',
            'Meryl': 'Meryl',
            'Nemesis': 'Nemesis',
            'Ruby': 'Ruby',
            'Saki': 'Saki Fuwa',
            'Samir': 'Samir',
            'Shiro': 'Shiro',
            'TianLang': 'Tian Lang',
            'Tsubasa': 'Tsubasa',
            'Zero': 'Zero',

            'Echo': 'Echo',
            'Ene': 'Ene',
            'Hilda': 'Hilda',
            'BaiLing': 'Bai Ling',
            'Pepper': 'Pepper',
            
            'Alyss': 'Alyss'
        },
        'Matrix': {
            'Apophis': 'Apophis',
            'Barbarossa': 'Barbarossa',
            'Sobek': 'Sobek',
            'Robarg': 'Robarg',
            'FrostBot': 'Frost Bot',

            'Anabella': 'Anabella',
            'Claudia': 'Claudia',
            'CobaltB': 'Cobalt-B',
            'Cocoritter': 'Cocoritter',
            'Crow': 'Crow',
            'Frigg': 'Frigg',
            'Huma': 'Huma',
            'King': 'King',
            'Lin': 'Lin',
            'Lyra': 'Lyra',
            'Meryl': 'Meryl',
            'Nemesis': 'Nemesis',
            'Ruby': 'Ruby',
            'Saki': 'Saki Fuwa',
            'Samir': 'Samir',
            'Shiro': 'Shiro',
            'TianLang': 'Tian Lang',
            'Tsubasa': 'Tsubasa',
            'Zero': 'Zero',

            'Echo': 'Echo',
            'Ene': 'Ene',
            'Hilda': 'Hilda',
            'BaiLing': 'Bai Ling',
            'Pepper': 'Pepper',
            
            'Alyss': 'Alyss'
        },
        'Stat': {
            'Empty': 'Empty',
            'Crit': 'Crit',
            'CritRate%': 'Crit Rate',
            'CritDamage%': 'Crit Damage',
            'HP': 'HP',
            'Attack': 'Attack',
            'PureAlteredAttack': 'Pure Altered Attack',
            'AlteredAttack': 'Altered Attack',
            'AlteredDamage%': 'Altered Damage %',
            'PureFlameAttack': 'Pure Flame Attack',
            'FlameAttack': 'Flame Attack',
            'PureFrostAttack': 'Pure Frost Attack',
            'FrostAttack': 'Frost Attack',
            'PureVoltAttack': 'Pure Volt Attack',
            'VoltAttack': 'Volt Attack',
            'PurePhysicalAttack': 'Pure Physical Attack',
            'PhysicalAttack': 'Physical Attack',
            'Resistance': 'Resistance',
            'HP%': 'HP %',
            'FlameResistance': 'Flame Resistance',
            'FrostResistance': 'Frost Resistance',
            'VoltResistance': 'Volt Resistance',
            'PhysicalResistance': 'Physical Resistance',
            'AlteredResistance': 'Altered Resistance',
            'FlameAttack%': 'Flame Attack %',
            'FrostAttack%': 'Frost Attack %',
            'VoltAttack%': 'Volt Attack %',
            'PhysicalAttack%': 'Physical Attack %',
            'FlameResistance%': 'Flame Resistance %',
            'FrostResistance%': 'Frost Resistance %',
            'VoltResistance%': 'Volt Resistance %',
            'PhysicalResistance%': 'Physical Resistance %',
            'AlteredResistance%': 'Altered Resistance %',
            'FlameDamage%': 'Flame Damage %',
            'FrostDamage%': 'Frost Damage %',
            'VoltDamage%': 'Volt Damage %',
            'PhysicalDamage%': 'Physical Damage %',
            'SkillDamage%': 'Skill Damage %',
            'DischargeDamage%': 'Discharge Damage %',
            'DashDamage%': 'Dash Damage %'
        },
        'Character': {
            'Suppressor': 'Suppressor',
            'CS': 'Combat Score',
            'Level': 'Level',
        },
        'Attributes': {
            'Physical': 'Physical',
            'Frost': 'Frost',
            'Flame': 'Flame',
            'Volt': 'Volt',
            'Altered': 'Altered',
        },
        'UI': {
            'Attack': 'Attack',
            'Pure': 'Pure',
            'Flat': 'Flat',
            'Damage': 'Damage',
            'Total': 'Total',
            'Resistance': 'Resistance',
            'EnhancementLevel': 'Enhancement Level',
            'advancement': {
                0: 'A0',
                1: 'A3'
            }
        }
    }
}
