import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { CurrentEquipmentT, enhancementStatKey, EquipmentKey, EquipmentLoadoutT, EquipmentPieceI, EquipmentRarityKey, StatKeyT } from "../res/logic/types/EquipmentTypes";

// Make each equipment loadout have the same ID. Equipment slice will only store one ID

type EquipmentT = {
    [key in EquipmentKey]: {
        [ID: string]: EquipmentPieceI // doesnt seem to be validating properly
    }
}

const initialState:EquipmentT = {
    Helm: {},
    Spaulders: {},
    Armor: {},
    Bracers: {},
    Belt: {},
    Gloves: {},
    LegGuards: {},
    Boots: {},
    Engine: {},
    Reactor: {},
    Visor: {},
    Exoskeleton: {}
};

type editPieceStatPayload = {
    ID: string
    EquipmentType: EquipmentKey,
    edit: {
        [key in StatKeyT]?: number
    }
}

type EditPieceAdvancementPayload = {
    ID: string
    EquipmentType: EquipmentKey,
    AdvancementLvl: number
}

type RandomStatAddPayload = {
    ID: string,
    EquipmentType: EquipmentKey,
}

type KeySwapPayload = {
    ID: string,
    EquipmentType: EquipmentKey,
    oldKey: StatKeyT,
    newKey: StatKeyT
}

type RarityChangePayload = {
    ID: string,
    EquipmentType: EquipmentKey,
    Rarity: EquipmentRarityKey
}

const equipmentInventorySlice = createSlice({
    name: 'equipmentInventory',
    initialState,
    reducers: {
        editPieceRandomFromArmory: (state, action: PayloadAction<editPieceStatPayload>) => {
            const { EquipmentType, ID, edit } = action.payload;
            state[EquipmentType][ID].random = {
                ...state[EquipmentType][ID].random,
                ...edit
            }
        },
        editPieceRarityFromArmory: (state, action: PayloadAction<RarityChangePayload>) => {
            const { EquipmentType, ID, Rarity } = action.payload;
            state[EquipmentType][ID] = {
                ...state[EquipmentType][ID],
                'Rarity': Rarity
            }
        },
        changeEquipmentPieceRandomKeyFromArmory: (state, action: PayloadAction<KeySwapPayload>) => {
            const {ID, EquipmentType, oldKey, newKey} = action.payload;

            let modifiedKeys:{
                [key in StatKeyT]?: number
            } = {};
    
            // replaces old key with new key while maintaining order
            (Object.keys(state[EquipmentType][ID].random) as StatKeyT[]).forEach((randomKey) => {
                modifiedKeys[(randomKey !== oldKey)?randomKey:newKey] = state[EquipmentType][ID].random[randomKey]
            })
    
            state[EquipmentType][ID].random = {
                ...modifiedKeys,
            }

        },
        editPieceAdvancementFromArmory: (state, action: PayloadAction<EditPieceAdvancementPayload>) => {
        const {AdvancementLvl, EquipmentType, ID} = action.payload;
            state[EquipmentType][ID].AdvancementLvl = AdvancementLvl;
        },
        addRandomStatToArmoryEquipmentPiece: (state, action: PayloadAction<RandomStatAddPayload>) => {
            const {ID, EquipmentType } = action.payload;
            if (state[EquipmentType][ID] !== undefined) {
                state[EquipmentType][ID].random['Empty'] = 0;
            } else {
                console.log(`${ID} does not exist in armory.`);
            }
        },
        addEquipmentPieceToArmory: (state, action: PayloadAction<EquipmentPieceI>) => {
            const EquipmentPiece = action.payload;
            state[EquipmentPiece.EquipmentType] = {
                ...state[EquipmentPiece.EquipmentType],
                [EquipmentPiece.ID]: EquipmentPiece
            }
        },
        addNewEquipmentPieceToArmory: (state, action: PayloadAction<{ID: string, EquipmentType: EquipmentKey, EquipmentRarity: EquipmentRarityKey}>) => {
            const {ID, EquipmentType, EquipmentRarity} = action.payload;

            const NewEquipmentPiece:EquipmentPieceI = {
                'ID': ID,
                'Rarity': EquipmentRarity,
                'EquipmentType': EquipmentType,
                'AdvancementLvl': 0,
                // 'enhancement': {},
                'random': {}
            }

            state[EquipmentType] = {
                ...state[EquipmentType],
                [NewEquipmentPiece.ID]: NewEquipmentPiece
            }
        },
        addEquipmentToArmory: (state, action: PayloadAction<EquipmentLoadoutT>) => {
            const { Bracers, Armor, Boots, Belt, Gloves, Helm, LegGuards, Spaulders, Engine, Reactor, Visor, Exoskeleton } = action.payload;
            state = {
                Bracers: {
                    ...state.Bracers,
                    [Bracers.ID]: Bracers 
                },
                Armor: {
                    ...state.Armor,
                    [Armor.ID]: Armor
                },
                Boots: {
                    ...state.Boots,
                    [Boots.ID]: Boots
                },
                Belt: {
                    ...state.Belt,
                    [Belt.ID]: Belt
                },
                Gloves: {
                    ...state.Gloves,
                    [Gloves.ID]: Gloves
                },
                Helm: {
                    ...state.Helm,
                    [Helm.ID]: Helm
                },
                LegGuards: {
                    ...state.LegGuards,
                    [LegGuards.ID]: LegGuards
                },
                Spaulders: {
                    ...state.Spaulders,
                    [Spaulders.ID]: Spaulders
                },
                Reactor: {
                    ...state.Reactor,
                    [Reactor.ID]: Reactor
                },
                Visor: {
                    ...state.Visor,
                    [Visor.ID]: Visor
                },
                Engine: {
                    ...state.Engine,
                    [Engine.ID]: Engine
                },                
                Exoskeleton: {
                    ...state.Exoskeleton,
                    [Exoskeleton.ID]: Exoskeleton
                },
            }
        },
        overwriteEquipmentInventory: (state, action: PayloadAction<EquipmentT>) => {
            return action.payload;
        },
        deleteEquipmentPieceFromArmory: (state, action:PayloadAction<RandomStatAddPayload>) => {
            const {EquipmentType, ID} = action.payload;
            const {[ID]:toBeDeleted, ...rest} = state[EquipmentType];
            state[EquipmentType] = rest;
        }
    }
});


export const selectAllEquipmentFromArmory = (state: RootState) => {return state.equipmentInventory};
export const selectEquipmentTypeFromArmory = (state: RootState, type: EquipmentKey) => {
    return state.equipmentInventory[type];
}
export const selectEquipmentPieceFromInventory = (state: RootState, type: EquipmentKey | "", id: string) => {
    if (type === "" || id === "") return undefined;
    return state.equipmentInventory[type][id];
}

export const selectEquipmentFromInventory = (state: RootState, currentEquipment: CurrentEquipmentT):EquipmentLoadoutT => {
    return (
        Object.fromEntries(
            (Object.keys(currentEquipment) as Array<EquipmentKey>).map(equipmentKey => [equipmentKey, state.equipmentInventory[equipmentKey][currentEquipment[equipmentKey]]])
        ) as EquipmentLoadoutT
    );
}

export const selectEquipmentStatFromInventory = (state: RootState, type: EquipmentKey, id: string, stat: StatKeyT):number => {
    if (state.equipmentInventory[type][id] === undefined) return 0;

    let s = 0;
    // s += state.armory.Equipment[type][id].enhancement[stat as enhancementStatKey]??0;
    s += state.equipmentInventory[type][id].random[stat as StatKeyT]??0;
    return s;
}

export const { 
        addEquipmentPieceToArmory,
        editPieceAdvancementFromArmory,
        addRandomStatToArmoryEquipmentPiece,
        editPieceRandomFromArmory,
        deleteEquipmentPieceFromArmory,
        changeEquipmentPieceRandomKeyFromArmory,
        editPieceRarityFromArmory,
        addNewEquipmentPieceToArmory,
        overwriteEquipmentInventory } = equipmentInventorySlice.actions;
export default equipmentInventorySlice.reducer;