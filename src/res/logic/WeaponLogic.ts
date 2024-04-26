import { WeaponElementT, WeaponNameT, WeaponResonanceT, WeaponStoreT, WeaponToSimulacra, LoadoutResonanceT } from "./types/WeaponTypes";
import WeaponData from "./data/WeaponData";

export const getResonance = (equippedWeapons: WeaponStoreT):LoadoutResonanceT => {
    let ElementalCount:{[Element in WeaponElementT]:number} = {
        Flame: 0,
        Frost: 0,
        Volt: 0,
        Physical: 0,
        Altered: 0
    };
    let WeaponTypeCount:{[w in WeaponResonanceT]: number} = {
        DPS: 0,
        Defense: 0,
        Support: 0
    };

    (Object.values(equippedWeapons) as (WeaponNameT|"")[]).forEach(weaponName => {
        if (weaponName !== "") {
            const simulacraName = WeaponToSimulacra[weaponName];
            ElementalCount[WeaponData[simulacraName].Element]++;
            WeaponTypeCount[WeaponData[simulacraName].WeaponResonance]++;
        }
    });

    const ElementalResonance = 
        (ElementalCount.Flame >= 2)?"Flame":
        (ElementalCount.Frost >= 2)?"Frost":
        (ElementalCount.Volt >= 2)?"Volt":
        (ElementalCount.Physical >= 2)?"Physical":"None";

    const WeaponResonance = 
        (WeaponTypeCount.DPS >= 2)?"Attack":
        (WeaponTypeCount.Support >= 2)?"Benediction":
        (WeaponTypeCount.Defense >= 2)?"Fortitude":"Balanced"

    return ({
        "ElementalResonance": ElementalResonance,
        "EquippedWeaponResonance": WeaponResonance
    })
}
