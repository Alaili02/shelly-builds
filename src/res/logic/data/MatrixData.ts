import { Keywords } from "../../../store/data"
import { MatrixRarityT, MatrixType } from "../../../store/matrixInventorySlice"
import { baseStatKey, L2RandomStat } from "../types/EquipmentTypes"
import { AllMatrices, AllMatrixSlots, LoadoutResonanceT, MatrixNameT, MatrixSlotT } from "../types/WeaponTypes"


type CommonMatrixDataT = {
    [Rarity in MatrixRarityT]: {
        'MaxLevel': number
        'MaxAdvancement': number
    } & {[Slot in MatrixSlotT]: {
            [Key in baseStatKey]?: number
        }
    }
}

export const MaxMatrixLevel = 100;

export const CommonMatrixData:CommonMatrixDataT = {
    'SSR': {
        'MaxLevel': 80,
        'MaxAdvancement': 3,
        'Emotion': {
            'Attack': 5.461165,
            'Resistance': 12.135922
        },
        'Mind': {
            'HP': 1019.4175,
            'Crit': 12.135922
        },
        'Memory': {
            'Attack': 9.40534,
            'HP': 461.16504
        },
        'Faith': {
            'Attack': 9.40534,
            'HP': 461.16504
        }
    },
    'SR': {
        'MaxLevel': 70,
        'MaxAdvancement': 2,
        'Emotion': {
            'Attack': 2.949029,
            'Resistance': 6.553398
        },
        'Mind': {
            'HP': 550.4854,
            'Crit': 6.553398
        },
        'Memory': {
            'Attack': 5.078884,
            'HP': 249.02913
        },
        'Faith': {
            'Attack': 5.078884,
            'HP': 249.02913
        }
    },
    'R': {
        'MaxLevel': 20,
        'MaxAdvancement': 0,
        'Emotion': {},
        'Mind': {},
        'Memory': {},
        'Faith': {}
    },
    'N': {
        'MaxLevel': 10,
        'MaxAdvancement': 0,
        'Emotion': {},
        'Mind': {},
        'Memory': {},
        'Faith': {}
    }
}

export const getMatrixEntries = ():{label:string,value:MatrixNameT}[] => {
    return AllMatrices.map(matrixName => ({
        label: Keywords.English.Matrix[matrixName],
        value: matrixName
    }));
}

export const getMatrixSlotEntries = ():{label:MatrixSlotT,value:MatrixSlotT}[] => {
    return AllMatrixSlots.map(matrixSlot => ({
        label: matrixSlot,
        value: matrixSlot
    }));
}

type MatrixDataT = {
    Rarity: MatrixRarityT,
    multiplicativeStats: (loadoutResonance: LoadoutResonanceT, OnePcAdvancementLevel: 0|1|2|3, TwoPcAdvancementLevel: 0|1|2|3) => {[stat in L2RandomStat]?: number}
}

export const MatrixData:{[name in MatrixNameT]: MatrixDataT} = {
    Robarg: {
        Rarity: "SR",
        multiplicativeStats: ()=>({})
    },
    Apophis: {
        Rarity: "SR",
        multiplicativeStats: ()=>({})
    },
    FrostBot: {
        Rarity: "SR",
        multiplicativeStats: ()=>({})
    },
    Sobek: {
        Rarity: "SR",
        multiplicativeStats: ()=>({})
    },
    Barbarossa: {
        Rarity: "SR",
        multiplicativeStats: ()=>({})
    },

    Pepper: {
        Rarity: "SR",
        multiplicativeStats: ()=>({})
    },
    Hilda: {
        Rarity: "SR",
        multiplicativeStats: ()=>({})
    },
    Ene: {
        Rarity: "SR",
        multiplicativeStats: ()=>({})
    },
    BaiLing: {
        Rarity: "SR",
        multiplicativeStats: ()=>({})
    },
    Echo: {
        Rarity: "SR",
        multiplicativeStats: ()=>({})
    },
    
    Meryl: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Tsubasa: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Cocoritter: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    King: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    CobaltB: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Claudia: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Shiro: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Zero: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Samir: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Huma: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Crow: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    
    Nemesis: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Frigg: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Ruby: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Saki: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Lin: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Lyra: {
        Rarity: "SSR",
        multiplicativeStats: (loadoutResonance, OnePcAdvancementLevel, TwoPcAdvancementLevel) => {
            const value = [13, 17, 21, 25][OnePcAdvancementLevel];
            return ({
                "PhysicalAttack%": value,
                "FlameAttack%": value,
                "FrostAttack%": value,
                "VoltAttack%": value,
            });
        },
    },
    TianLang: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Anabella: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
    Alyss: {
        Rarity: "SSR",
        multiplicativeStats: ()=>({})
    },
}