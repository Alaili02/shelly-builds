import { MatrixSetT, MatrixType } from "../../store/matrixInventorySlice";
import { CommonMatrixData, MatrixData } from "./data/MatrixData";
import { BaseStatsT, MatrixSlotT } from "./types/WeaponTypes";


export const getMatrixStats = (matrix: MatrixType):BaseStatsT => {
    const { Type, Level, Slot, Ascension } = matrix;
    const { Rarity } = MatrixData[Type];
    const Base = CommonMatrixData[Rarity][Slot];
    return {
        Attack: (Base.Attack !== undefined)?Base.Attack * (1 + Level/3) * (1 + Ascension/3):0,
        HP: (Base.HP !== undefined)?Base.HP * (1 + Level/3) * (1 + Ascension/3):0,
        Resistance: (Base.Resistance !== undefined)?Base.Resistance * (1 + Level/3) * (1 + Ascension/3):0,
        Crit: (Base.Crit !== undefined)?Base.Crit * (1 + Level/3) * (1 + Ascension/3):0
    }
}

export const getMatrixSetStats = (matrixSet: MatrixSetT):BaseStatsT => {
    let totalAttack = 0;
    let totalHP = 0;
    let totalResistance = 0;
    let totalCrit = 0;

    (Object.keys(matrixSet) as MatrixSlotT[]).forEach(matrixSlot => {
        if (matrixSet[matrixSlot] === undefined) return;
        const matrixStats = getMatrixStats(matrixSet[matrixSlot] as MatrixType);
        totalAttack += matrixStats.Attack;
        totalHP += matrixStats.HP;
        totalResistance += matrixStats.Resistance;
        totalCrit += matrixStats.Crit;
    })

    return {
        Attack: totalAttack,
        HP: totalHP,
        Resistance: totalResistance,
        Crit: totalCrit
    };
}
