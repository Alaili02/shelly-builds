import { WeaponElementT, WeaponResonanceT } from "../logic/types/WeaponTypes"

type ElementImagesT = {
    [Element in WeaponElementT]: string
}
export const ElementImages:ElementImagesT = {
    'Frost': require('./images/Frost.png'),
    'Flame': require('./images/Flame.png'), 
    'Physical': require('./images/Physical.png'), 
    'Volt': require('./images/Volt.png'),
    'Altered': require('./images/Altered.png')
}

type ResonanceImagesT = {
    [Resonance in WeaponResonanceT]: string
}
export const ResonanceImages:ResonanceImagesT = {
    'DPS': require('./images/DPS.png'), 
    'Support': require('./images/Support.png'), 
    'Defense': require('./images/Defense.png') 
}