import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { MatrixNameT, MatrixSlotT } from "../res/logic/types/WeaponTypes"

export type MatrixRarityT = 'N' | 'R' | 'SR' | 'SSR';

export type StoreMatrixT = {
    [slot in MatrixSlotT]: {
        [ID: string]: MatrixType
    }
}

export type MatrixSetIDT = {
    [slot in MatrixSlotT]: string
}
export type MatrixInventoryT = {
    'Type': MatrixNameT,
    'Rarity': MatrixRarityT
    'MaxAdvancement': number
}

export type MatrixType = {
    'ID': string,
    'Ascension': number,
    'Level': number,
    'Slot': MatrixSlotT,
    'Type': MatrixNameT,
    'EquippedBy': string
}

export type MatrixSetT = {
    [slot in MatrixSlotT]: MatrixType | undefined
}

type MatrixPayload = {
    ID: string,
    Slot: MatrixSlotT,
}
type NewMatrixPayload = {
    ID: string,
    Name: MatrixNameT,
    Slot: MatrixSlotT,
}

const matrixInventorySlice = createSlice({
    name: 'MatrixInventory',
    initialState: {
        'Emotion': {},
        'Mind': {},
        'Memory': {},
        'Faith': {},
    } as StoreMatrixT,
    reducers: {
        overwriteMatrixInventory: (state, action: PayloadAction<StoreMatrixT>) => {
            return action.payload;
        },
        addMatrixToInventory: (state, action: PayloadAction<NewMatrixPayload>) => {
            const { ID, Name, Slot } = action.payload;
            state[Slot] = {
                ...state[Slot],
                [ID]: {
                    ID: ID,
                    Ascension: 0,
                    Level: 0,
                    Slot: Slot,
                    Type: Name,
                    EquippedBy: ''
                }
            }
        },
        deleteMatrixFromInventory: (state, action: PayloadAction<MatrixPayload>) => {
            const { ID, Slot } = action.payload;
            const { [ID]: junk, ...rest } = state[Slot];
            state[Slot] = {
                ...rest
            }
        },
        setMatrixAdvancement: (state, action: PayloadAction<MatrixPayload & {AdvancementLevel: number}>) => {
            const { ID, Slot, AdvancementLevel } = action.payload;
            state[Slot][ID].Ascension = AdvancementLevel;
        },
        setMatrixLevel: (state, action: PayloadAction<MatrixPayload &{Level: number}>) => {
            const { ID, Slot, Level } = action.payload;
            state[Slot][ID].Level = Level;
        },
        setMatrixEquippedBy: (state, action: PayloadAction<MatrixPayload &{EquippedByID: string}>) => {
            const { ID, Slot, EquippedByID } = action.payload;
            if (state[Slot][ID]) state[Slot][ID].EquippedBy = EquippedByID;
        }
    }
})

export const selectAllMatricesAtSlotFromInventory = (state: RootState, slot: MatrixSlotT):{[ID: string]: MatrixType} => {
    return state.matrixInventory[slot];
}

export const selectMatrixFromInventory = (state: RootState, ID: string, Slot: MatrixSlotT):MatrixType => {
    return state.matrixInventory[Slot][ID];
    //  {
    //     const {Type, Level, Ascension} = state.matrixInventory[Slot][ID];
    //     let FullMatrix:MatrixType = {
    //         ...state.matrixInventory[Slot][ID],
    //         ID: ID,
            // MaxAdvancement: CommonMatrixData[MatrixData[Type].Rarity].MaxAdvancement,
            // Rarity: MatrixData[Type].Rarity,
            // stats: {}
        // }
        // const BaseStats = CommonMatrixData[FullMatrix.Rarity][Slot];
        // if (BaseStats.Attack !== undefined) FullMatrix.stats['Attack'] = BaseStats.Attack * (1 + Level/3) * (1 + Ascension/3);
        // if (BaseStats.Crit !== undefined) FullMatrix.stats['Crit'] = BaseStats.Crit * (1 + Level/3) * (1 + Ascension/3);
        // if (BaseStats.HP !== undefined) FullMatrix.stats['HP'] = BaseStats.HP * (1 + Level/3) * (1 + Ascension/3);
        // if (BaseStats.Resistance !== undefined) FullMatrix.stats['Resistance'] = BaseStats.Resistance * (1 + Level/3) * (1 + Ascension/3);
        // return FullMatrix;
    // }
}

export const selectMatrixInventoryState = (state: RootState):StoreMatrixT => state.matrixInventory;

export const selectMatrixSetFromInventory = (state: RootState, IDs: MatrixSetIDT): MatrixSetT => {
    return {
        'Emotion': selectMatrixFromInventory(state, IDs.Emotion, 'Emotion'),
        'Mind': selectMatrixFromInventory(state, IDs.Mind, 'Mind'),
        'Memory': selectMatrixFromInventory(state, IDs.Memory, 'Memory'),
        'Faith': selectMatrixFromInventory(state, IDs.Faith, 'Faith'),
    }
}

// export const selectMatrixBonus = (state: RootState, matrixSet: MatrixSetT):MatrixNameT[] => {
//     // Sum up counts of each equipped matrix to check if a set bonus can be completeted
//     type matrixCountT = {[matrix in MatrixNameT]?: number}
//     const matrixCount:matrixCountT = {};

//     (Object.keys(matrixSet) as MatrixSlotT[]).forEach((slot: MatrixSlotT) => {
//         if (matrixSet[slot].Type !== undefined) {
//             matrixCount[matrixSet[slot].Type] = (matrixCount[matrixSet[slot].Type]??0) + 1
//         }
//     });

//     let BonusResult:MatrixNameT[] = [];
//     (Object.keys(matrixCount) as MatrixNameT[]).forEach((matrix: MatrixNameT) => {
//         if (MatrixData[matrix].Rarity === 'SR' && (matrixCount[matrix]??0 >= 3)) {
//             BonusResult.push(matrix);
//         } else if (MatrixData[matrix].Rarity === 'SSR' && (matrixCount[matrix]??0 >= 2)) {
//             BonusResult.push(matrix);
//         }
//     })

//     return BonusResult;
// }

export const { 
    addMatrixToInventory,
    deleteMatrixFromInventory,
    setMatrixLevel,
    setMatrixAdvancement,
    setMatrixEquippedBy,
    overwriteMatrixInventory } = matrixInventorySlice.actions;
export default matrixInventorySlice.reducer;