import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { baseStatKey, CurrentEquipmentT, EnhancementLevelCutoffT, EnhancementLevelT, EquipmentKey, EquipmentLoadoutT, MaxValidEnhancementCutoff, MaxValidEnhancementLevel, StatKeyT } from "../res/logic/types/EquipmentTypes";
import { MatrixSlotT, SimulacraNameT, WeaponNameT } from "../res/logic/types/WeaponTypes";
import { v4 as uuid, NIL as NIL_UID } from "uuid"
import { RootState } from "../app/store";
import { selectEquipmentFromInventory, selectEquipmentPieceFromInventory, selectEquipmentStatFromInventory } from "./equipmentInventorySlice";
import { selectEnhancementLevel } from "./characterSlice";
import { BaseEquipmentStats } from "../res/logic/data/RawBaseEquipmentStats";
import { getBaseEquipmentBonus, getEnhancementEquipmentBonus, getEquipmentSetBonus } from "../res/logic/EquipmentLogic";
import { EmptyEquipmentLoadout } from "../res/logic/data/EquipmentLoadoutData";

type LoadoutStoreT = {
    "equipped": {
        "Weapon": string,
        "Equipment": string
    },
    "weapon": {
        [ID:string]: {
            "LoadoutName": string,
            "loadout": {
                [o in 1|2|3]: WeaponNameT | ""
            }
        },
    }
    "equipment": {
        [ID:string]: {
            "LoadoutName": string,
            "loadout": CurrentEquipmentT
        }
    },
    "matrices": {
        [ID:string]: {
            "LoadoutName": string,
            "EquippedBy": SimulacraNameT|"",
            "loadout": {
                [slot in MatrixSlotT]: string
            }
        }
    }
}
const initialLoadout:LoadoutStoreT = {
    "equipped": {
        Weapon: NIL_UID,
        Equipment: NIL_UID
    },
    "weapon": {
        [NIL_UID]: {
            LoadoutName: "default",
            loadout: {
                1: "Vespers",
                2: "Venus",
                3: "NegatingCube",
            }
        }
    },
    "equipment": {
        [NIL_UID]: {
            LoadoutName: "default",
            loadout: {...EmptyEquipmentLoadout}
        }
    },
    "matrices": {}
}

const loadoutSlice = createSlice({
    name: 'Loadout',
    initialState: initialLoadout,
    reducers: {
        addNewEquipmentLoadout: (state, action: PayloadAction<{ID:string, Name:string}>) => {
            const {ID, Name} = action.payload;
            state.equipment[ID] = {
                LoadoutName: Name,
                loadout: {...EmptyEquipmentLoadout}
            }
        },
        setEquippedEquipmentLoadout: (state, action: PayloadAction<{ID:string}>) => {
            state.equipped.Equipment = action.payload.ID;
        },
        deleteEquipmentLoadout: (state, action: PayloadAction<{ID:string}>) => {
            const { [action.payload.ID]:toDelete, ...rest} = state.equipment;
            state.equipment = rest;
        },
        setEquippedEquipmentPiece: (state, action: PayloadAction<{ID:string, EquipmentType:EquipmentKey}>) => {
            const {ID, EquipmentType} = action.payload;
            state.equipment[state.equipped.Equipment] = {
                ...state.equipment[state.equipped.Equipment],
                loadout: {
                    ...EmptyEquipmentLoadout,
                    ...state.equipment[state.equipped.Equipment]?.loadout,
                    [EquipmentType]: ID
                }
            }
        },
        addNewWeaponLoadout: (state, action: PayloadAction<{ID:string, Name:string}>) => {
            const {ID, Name} = action.payload;
            state.weapon[ID] = {
                LoadoutName: Name,
                loadout: {
                    1: "",
                    2: "",
                    3: ""
                }
            }
        },
        setEquippedWeaponLoadout: (state, action: PayloadAction<{ID:string}>) => {
            state.equipped.Weapon = action.payload.ID;
        },
        deleteWeaponLoadout: (state, action: PayloadAction<{ID:string}>) => {
            const { [action.payload.ID]:toDelete, ...rest} = state.weapon;
            state.weapon = rest;
        },
        setEquippedWeapon: (state, action: PayloadAction<{order:1|2|3, weaponName:WeaponNameT|""}>) => {
            const { order, weaponName } = action.payload;

            // if weapon already equipped in different slot then swap slots
            if (weaponName!=="" && state.weapon[state.equipped.Weapon]) {
                (Object.keys(state.weapon[state.equipped.Weapon].loadout) as ("1"|"2"|"3")[] ).forEach(i => {
                    if (state.weapon[state.equipped.Weapon].loadout[i] === weaponName) {
                        state.weapon[state.equipped.Weapon] = {
                            ...state.weapon[state.equipped.Weapon],
                            loadout: {
                                ...state.weapon[state.equipped.Weapon]?.loadout,
                                [i]: state.weapon[state.equipped.Weapon].loadout[order],
                                [order]: weaponName
                            }
                        }
                        return;
                    }
                })
            }

            state.weapon[state.equipped.Weapon] = {
                ...state.weapon[state.equipped.Weapon],
                loadout: {
                    ...state.weapon[state.equipped.Weapon]?.loadout,
                    [order]: weaponName
                }
            }
        },
        addNewMatrixLoadout: (state, action: PayloadAction<{ID: string, Name: string}>) => {
            const { ID, Name } = action.payload;
            state.matrices[ID] = {
                LoadoutName: Name,
                EquippedBy: "",
                loadout: {
                    Emotion: "",
                    Faith: "",
                    Memory: "",
                    Mind: ""
                }
            }
        },
        deleteMatrixLoadout: (state, action: PayloadAction<{ID: string}>) => {
            const { [action.payload.ID]:toDelete, ...rest} = state.matrices;
            state.matrices = rest;
        },
        setMatrixLoadoutEquippedBy: (state, action: PayloadAction<{ID: string, EquippedBy: SimulacraNameT|""}>) => {
            const { ID, EquippedBy } = action.payload;
            if (state.matrices[ID])
                state.matrices[ID] = {
                    ...state.matrices[ID],
                    EquippedBy: EquippedBy,
                }
        },
        setMatrixInMatrixLoadout: (state, action: PayloadAction<{matrixLoadoutID:string, matrixID: string, slot: MatrixSlotT}>) => {
            const { matrixID, matrixLoadoutID, slot } = action.payload;

            // if this matrix is already equipped by some loadout then update its equipped by and loadout equips

            if (state.matrices[matrixLoadoutID])
                state.matrices[matrixLoadoutID].loadout = {
                    ...state.matrices[matrixLoadoutID].loadout,
                    [slot]: matrixID
                }
        },
        overwriteLoadouts: (state, action: PayloadAction<LoadoutStoreT>) => {
            return action.payload;
        }
    }
});

export const selectStatFromEquipment = (state: RootState, stat: StatKeyT) :number => {
    let s = 0;
    if (!state.loadout.equipment[state.loadout.equipped.Equipment]) return 0;
    const equippedEquipmentLoadout = state.loadout.equipment[state.loadout.equipped.Equipment].loadout;
    const enhancementLevels = selectEnhancementLevel(state);

    (Object.keys(equippedEquipmentLoadout) as EquipmentKey[]).forEach((equipmentKey:EquipmentKey) => {
        const equipmentPiece = selectEquipmentPieceFromInventory(state, equipmentKey, equippedEquipmentLoadout[equipmentKey]);
        if (equipmentPiece===undefined) return 0; 

        s += BaseEquipmentStats[equipmentKey][equipmentPiece.Rarity][stat as baseStatKey]??0;
        s += getBaseEquipmentBonus(equipmentKey, stat as baseStatKey, Math.min(enhancementLevels[equipmentKey],MaxValidEnhancementLevel) as EnhancementLevelT)
        s += getEnhancementEquipmentBonus(equipmentKey)[Math.min(Math.floor(enhancementLevels[equipmentKey]/5),MaxValidEnhancementCutoff) as EnhancementLevelCutoffT][stat as baseStatKey]??0;
        
        // Aggregate Random Stats
        s += selectEquipmentStatFromInventory(state, equipmentKey, equippedEquipmentLoadout[equipmentKey], stat);
    })
    // Add Equipment Set Bonus
    s += getEquipmentSetBonus(enhancementLevels, equippedEquipmentLoadout)[stat as baseStatKey]??0;

    return s;
}


export const {
    overwriteLoadouts,
    setEquippedEquipmentPiece, addNewEquipmentLoadout, setEquippedEquipmentLoadout, deleteEquipmentLoadout,
    setEquippedWeapon, addNewWeaponLoadout, setEquippedWeaponLoadout, deleteWeaponLoadout,
    addNewMatrixLoadout, deleteMatrixLoadout, setMatrixLoadoutEquippedBy, setMatrixInMatrixLoadout
} = loadoutSlice.actions;

export const selectEquipmentLoadouts = (state: RootState) => {
    return Object.keys(state.loadout.equipment).map(ID => ({
        value: ID,
        label: state.loadout.equipment[ID].LoadoutName    
    }));
}

export const selectLoadoutState = (state: RootState) => state.loadout;

export const selectEquippedEquipmentLoadout = (state: RootState):EquipmentLoadoutT => (
    (state.loadout.equipment[state.loadout.equipped.Equipment])?
    selectEquipmentFromInventory(state, state.loadout.equipment[state.loadout.equipped.Equipment].loadout):
    selectEquipmentFromInventory(state, EmptyEquipmentLoadout)
);
export const selectEquippedEquipmentLoadoutID = (state: RootState) => state.loadout.equipped.Equipment;
export const selectEquippedEquipmentLoadoutEntry = (state: RootState) => ({
    value: state.loadout.equipped.Equipment, 
    label: state.loadout.equipment[state.loadout.equipped.Equipment]?.LoadoutName
});



// deprecate
export const selectEquippedWeaponLoadout = (state: RootState) => state.loadout.weapon[state.loadout.equipped.Weapon];

export const selectWeaponLoadouts = (state: RootState) => {
    return Object.keys(state.loadout.weapon).map(ID => ({
        value: ID,
        label: state.loadout.weapon[ID].LoadoutName  
    }))
}

export const selectEquippedWeaponLoadoutEntry = (state: RootState) => ({
    value: state.loadout.equipped.Weapon, 
    label: state.loadout.weapon[state.loadout.equipped.Weapon]?.LoadoutName
});

export const selectEquippedWeapons = (state: RootState):{[o in 1|2|3]: WeaponNameT | ""} => 
    (state.loadout.weapon[state.loadout.equipped.Weapon])?
        state.loadout.weapon[state.loadout.equipped.Weapon].loadout:
        initialLoadout.weapon[NIL_UID].loadout;


export const selectMatrixLoadouts = (state: RootState):{
    label: string,
    value: {
        loadoutID: string,
        equippedBy: SimulacraNameT | "",
        loadout: {[Slot in MatrixSlotT]: string}
    }
}[] => {
    return Object.keys(state.loadout.matrices).map(ID => ({
        value: {
            loadoutID: ID,
            equippedBy: state.loadout.matrices[ID].EquippedBy,
            loadout: state.loadout.matrices[ID].loadout
        },
        label: state.loadout.matrices[ID].LoadoutName  
    }))
}

export const selectMatrixLoadoutEntry = (state: RootState, ID: string):{
    label: string,
    value: {
        loadoutID: string,
        equippedBy: SimulacraNameT | "",
        loadout: {[Slot in MatrixSlotT]: string}
    }
} =>

    (ID===""|| !state.loadout.matrices[ID])?({
        label: "No Matrix Loadout",
        value: {
            loadoutID: "",
            equippedBy: "",
            loadout: {
                Emotion: "",
                Mind: "",
                Memory: "",
                Faith: ""
            }
        }
    }):({
        label: state.loadout.matrices[ID]?.LoadoutName??"",
        value: {
            loadoutID: ID,
            equippedBy: state.loadout.matrices[ID]?.EquippedBy,
            loadout: state.loadout.matrices[ID]?.loadout
        }
    });

    // value: ID, 
    // label: state.loadout.matrices[ID]?.LoadoutName??"",

export const selectMatrixLoadoutName = (state: RootState, ID: string) => state.loadout.matrices[ID]?.LoadoutName??"No Matrix Loadout";
export const selectMatrixLoadoutEquippedBy = (state: RootState, ID: string):SimulacraNameT|"" => (state.loadout.matrices[ID])?state.loadout.matrices[ID].EquippedBy:"";
export const selectMatrixLoadout = (state: RootState, ID: string):{[slot in MatrixSlotT]: string} => 
    (state.loadout.matrices[ID])?state.loadout.matrices[ID].loadout:({
        Emotion: "",
        Faith: "",
        Memory: "",
        Mind: ""
    });

export default loadoutSlice.reducer;