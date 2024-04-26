import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store";
import { MatrixSlotT, SimulacraNameT, WeaponInventoryT, BaseStatsT, WeaponStateT, WeaponNameT, WeaponToSimulacra } from "../res/logic/types/WeaponTypes";
import WeaponData from "../res/logic/data/WeaponData";
import { emptyWeaponState } from "../res/logic/data/WeaponStateData";
import { MatrixSetIDT } from "./matrixInventorySlice";

type BasePayload = {
    simulacraName: SimulacraNameT
}
type AscensionPayload = BasePayload & {
    ascension: number
}
type SingleMatrixPayload = BasePayload & {
    matrixSlot: MatrixSlotT,
    matrixID: string
}

const weaponInventorySlice = createSlice({
    'name': 'weaponInventory',
    // 'initialState': WeaponData,
    'initialState': {} as WeaponInventoryT,
    'reducers': {
        setWeaponAscension: (state, action: PayloadAction<AscensionPayload>) => {
            const {simulacraName, ascension} = action.payload;
            state[simulacraName] = {
                ...emptyWeaponState,
                ...state[simulacraName],
                AscensionLevel: ascension
            }
        },
        setWeaponLevel: (state, action: PayloadAction<BasePayload&{Level: number}>) => {
            const { simulacraName, Level } = action.payload;
            state[simulacraName] = {
                ...emptyWeaponState,
                ...state[simulacraName],
                Level: Level
            }
        },
        setWeaponEquippedMatrixLoadout: (state, action: PayloadAction<{simulacraName: SimulacraNameT, ID:string}>) => {
            const { ID, simulacraName } = action.payload;
            state[simulacraName] = {
                ...emptyWeaponState,
                ...state[simulacraName],
                Equips: ID
            }
        },
        // setEquippedMatrixPiece: (state, action: PayloadAction<SingleMatrixPayload>) => {
        //     const { simulacraName, matrixID, matrixSlot } = action.payload;
        //     state[simulacraName] = {
        //         ...emptyWeaponState,
        //         ...state[simulacraName],
        //         matrices: {
        //             ...emptyWeaponState.matrices,
        //             ...state[simulacraName]?.matrices,
        //             [matrixSlot]: matrixID
        //         }
        //     }
        // },
        overwriteWeaponInventory: (state, action: PayloadAction<WeaponInventoryT>) => {
            return action.payload;
        }
    }
})

export const selectWeaponStats = (state: RootState, simulacraName: SimulacraNameT):BaseStatsT => {
    // const { AscensionLevel, Level } = state.weaponInventory[simulacraName]?.AscensionLevel;

    const AscensionLevel = state.weaponInventory[simulacraName]?.AscensionLevel??0;
    const Level = state.weaponInventory[simulacraName]?.Level??0;
    const { baseStats, ascensionBonus, WeaponRarity } = WeaponData[simulacraName];

    let atkAscensionBuff = 0;
    let hpAscensionBuff = 0;

    if (AscensionLevel >= 2) {
        if (ascensionBonus.A2 === "Attack") atkAscensionBuff += (WeaponRarity==="SSR")?0.16:0.1;
        else if (ascensionBonus.A2 === "HP") hpAscensionBuff += (WeaponRarity==="SSR")?0.16:0.1;
        if (AscensionLevel >= 4) {
            if (ascensionBonus.A4 === "Attack") atkAscensionBuff += (WeaponRarity==="SSR")?0.32:0.2;
            else if (ascensionBonus.A4 === "HP") hpAscensionBuff += (WeaponRarity==="SSR")?0.32:0.2;
        }
    }

    if (baseStats.Crit !== 0) {
        return {
            'Attack': (baseStats.Attack) * (1 + (Level/6)) * (1 + ((AscensionLevel)/6) + atkAscensionBuff),
            'HP': (baseStats.HP) * (1 + (Level/6)) * (1 + ((AscensionLevel)/6) + hpAscensionBuff),
            'Crit': (baseStats.Crit) * (1 + (Level/6)) * (1 + ((AscensionLevel)/6)),
            'Resistance': 0
        }
    } else {
        return {
            'Attack': (baseStats.Attack) * (1 + (Level/6)) * (1 + ((AscensionLevel)/6) + atkAscensionBuff),
            'Resistance': (baseStats.Resistance) * (1 + (Level/6)) * (1 + ((AscensionLevel)/6)),
            'HP': (baseStats.HP) * (1 + (Level/6)) * (1 + ((AscensionLevel)/6) + hpAscensionBuff),
            'Crit': 0
        }
    }
}

// export const selectWeaponMatrixSetID = (state: RootState, simulacraName: SimulacraNameT):MatrixSetIDT => {
//     return (state.weaponInventory[simulacraName] !== undefined)?
//         (state.weaponInventory[simulacraName] as WeaponStateT).matrices:{
//             Emotion: "",
//             Faith: "",
//             Memory: "",
//             Mind: ""
//         }
// }

export const selectWeaponInventory = (state: RootState):WeaponInventoryT => state.weaponInventory;
export const selectSimulacraFromInventory = (state: RootState, simulacraName: SimulacraNameT):WeaponStateT => state.weaponInventory[simulacraName]??emptyWeaponState;

export const selectMatrixLoadoutIDsFromWeaponLoadout = (state: RootState, weaponLoadout: {[o in 1|2|3]: WeaponNameT | ""}):{[o in 1|2|3]:string} =>  ({
        1: (weaponLoadout[1]!=="")?state.weaponInventory[WeaponToSimulacra[weaponLoadout[1]]]?.Equips??"":"",
        2: (weaponLoadout[2]!=="")?state.weaponInventory[WeaponToSimulacra[weaponLoadout[2]]]?.Equips??"":"",
        3: (weaponLoadout[3]!=="")?state.weaponInventory[WeaponToSimulacra[weaponLoadout[3]]]?.Equips??"":""
    });


export const { setWeaponAscension, setWeaponLevel, setWeaponEquippedMatrixLoadout, overwriteWeaponInventory } = weaponInventorySlice.actions;
export default weaponInventorySlice.reducer;