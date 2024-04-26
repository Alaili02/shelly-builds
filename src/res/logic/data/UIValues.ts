import { CustomStatKeyT, StatKeyT } from "../types/EquipmentTypes";
import { DamageTypeT } from "../types/WeaponTypes";

type AttributeColorT = {
    [stat in StatKeyT]: string
}  & {
    [customStat in CustomStatKeyT]: string
}  & {
    [attribute in DamageTypeT]: string
} & {
    "Empty": string
}
export const ColorValue:AttributeColorT = {
    "Empty": "#FFF",
    "HP": "#ff8686",
    "HP%": "#ff8686",
    "Crit": "#ccc",
    "CritRate%": "#ccc",
    "CritDamage%": "#ccc",
    "Attack": "#ccc",
    "Resistance": "#ccc",

    "Flame": "#ffa286",
    "FlameAttack": "#ffa286",
    "PureFlameAttack": "#ffa286",
    "FlameAttack%": "#ffa286",
    "FlameResistance": "#ffa286",
    "FlameResistance%": "#ffa286",
    "FlameDamage%": "#ffa286",

    "Frost": "#b0e9ff",
    "FrostAttack": "#b0e9ff",
    "PureFrostAttack": "#b0e9ff",
    "FrostAttack%": "#b0e9ff",
    "FrostResistance": "#b0e9ff",
    "FrostResistance%": "#b0e9ff",
    "FrostDamage%": "#b0e9ff",

    "Volt": "#d6cdff",
    "VoltAttack": "#d6cdff",
    "PureVoltAttack": "#d6cdff",
    "VoltAttack%": "#d6cdff",
    "VoltResistance": "#d6cdff",
    "VoltResistance%": "#d6cdff",
    "VoltDamage%": "#d6cdff",

    "Physical": "#ffdb9b",
    "PhysicalAttack": "#ffdb9b",
    "PurePhysicalAttack": "#ffdb9b",
    "PhysicalAttack%": "#ffdb9b",
    "PhysicalResistance": "#ffdb9b",
    "PhysicalResistance%": "#ffdb9b",
    "PhysicalDamage%": "#ffdb9b",

    "Altered": "#b0ffc3",
    "AlteredAttack": "#b0ffc3",
    "PureAlteredAttack": "#b0ffc3",
    "AlteredDamage%": "#b0ffc3",
    "AlteredResistance": "#b0ffc3",
    "AlteredResistance%": "#b0ffc3",

    "SkillDamage%": "#ccc",
    "DashDamage%": "#ccc",
    "DischargeDamage%": "#ccc",
}