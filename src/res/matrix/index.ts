import { MatrixInventoryT, MatrixRarityT } from "../../store/matrixInventorySlice"
import { MatrixNameT, MatrixSlotT } from "../logic/types/WeaponTypes"
import { baseStatKey } from "../logic/types/EquipmentTypes"

type MatrixImagesT = {
    [matrix in MatrixNameT]: string
} & {
    Empty: string,
    New: string
}
export const MatrixImages:MatrixImagesT = {
    Empty: require('./images/Empty.webp'),
    New: require('./images/New.webp'),

    Robarg: require('./images/icon_matrix_SR1_512.webp'),
    Apophis: require('./images/icon_matrix_SR2_512.webp'),
    FrostBot: require('./images/icon_matrix_SR3_512.webp'),
    Sobek: require('./images/icon_matrix_SR4_512.webp'),
    Barbarossa: require('./images/icon_matrix_SR5_512.webp'),

    Pepper: require('./images/icon_matrix_SR6_512.webp'),
    Hilda: require('./images/icon_matrix_SR7_512.webp'),
    Ene: require('./images/icon_matrix_SR8_512.webp'),
    BaiLing: require('./images/icon_matrix_SR9_512.webp'),
    Echo: require('./images/icon_matrix_SR12_512.webp'),
    
    Meryl: require('./images/icon_matrix_SSR1_512.webp'),
    Tsubasa: require('./images/icon_matrix_SSR2_512.webp'),
    Cocoritter: require('./images/icon_matrix_SSR3_512.webp'),
    King: require('./images/icon_matrix_SSR4_512.webp'),
    CobaltB: require('./images/icon_matrix_SSR5_512.webp'),
    Claudia: require('./images/icon_matrix_SSR6_512.webp'),
    Shiro: require('./images/icon_matrix_SSR7_512.webp'),
    Zero: require('./images/icon_matrix_SSR8_512.webp'),
    Samir: require('./images/icon_matrix_SSR9_512.webp'),
    Huma: require('./images/icon_matrix_SSR10_512.webp'),
    Crow: require('./images/icon_matrix_SSR11_512.webp'),
    
    Nemesis: require('./images/icon_matrix_SSR14_512.webp'),
    Frigg: require('./images/icon_matrix_SSR15_512.webp'),
    Ruby: require('./images/icon_matrix_SSR16_512.webp'),
    Saki: require('./images/icon_matrix_SSR17_512.webp'),
    Lin: require('./images/icon_matrix_SSR18_512.webp'),
    Lyra: require('./images/icon_matrix_SSR19_512.webp'),
    TianLang: require('./images/icon_matrix_SSR20_512.webp'),
    Anabella: require('./images/icon_matrix_SSR21_512.webp'),
    
    Alyss: require('./images/icon_matrix_SSR22_512.webp'),
    // Umi: require('./images/icon_matrix_SSR23_512.webp'),
    // Fenrir: require('./images/icon_matrix_SSR24_512.webp'),
}

export const OutputMatrixImages:MatrixImagesT = {
    Empty: require('./images/output/Empty.webp'),
    New: require('./images/output/New.webp'),

    Robarg: require('./images/output/icon_matrix_SR1_512.webp'),
    Apophis: require('./images/output/icon_matrix_SR2_512.webp'),
    FrostBot: require('./images/output/icon_matrix_SR3_512.webp'),
    Sobek: require('./images/output/icon_matrix_SR4_512.webp'),
    Barbarossa: require('./images/output/icon_matrix_SR5_512.webp'),

    Pepper: require('./images/output/icon_matrix_SR6_512.webp'),
    Hilda: require('./images/output/icon_matrix_SR7_512.webp'),
    Ene: require('./images/output/icon_matrix_SR8_512.webp'),
    BaiLing: require('./images/output/icon_matrix_SR9_512.webp'),
    Echo: require('./images/output/icon_matrix_SR12_512.webp'),
    
    Meryl: require('./images/output/icon_matrix_SSR1_512.webp'),
    Tsubasa: require('./images/output/icon_matrix_SSR2_512.webp'),
    Cocoritter: require('./images/output/icon_matrix_SSR3_512.webp'),
    King: require('./images/output/icon_matrix_SSR4_512.webp'),
    CobaltB: require('./images/output/icon_matrix_SSR5_512.webp'),
    Claudia: require('./images/output/icon_matrix_SSR6_512.webp'),
    Shiro: require('./images/output/icon_matrix_SSR7_512.webp'),
    Zero: require('./images/output/icon_matrix_SSR8_512.webp'),
    Samir: require('./images/output/icon_matrix_SSR9_512.webp'),
    Huma: require('./images/output/icon_matrix_SSR10_512.webp'),
    Crow: require('./images/output/icon_matrix_SSR11_512.webp'),
    
    Nemesis: require('./images/output/icon_matrix_SSR14_512.webp'),
    Frigg: require('./images/output/icon_matrix_SSR15_512.webp'),
    Ruby: require('./images/output/icon_matrix_SSR16_512.webp'),
    Saki: require('./images/output/icon_matrix_SSR17_512.webp'),
    Lin: require('./images/output/icon_matrix_SSR18_512.webp'),
    Lyra: require('./images/output/icon_matrix_SSR19_512.webp'),
    TianLang: require('./images/output/icon_matrix_SSR20_512.webp'),
    Anabella: require('./images/output/icon_matrix_SSR21_512.webp'),
    
    Alyss: require('./images/output/icon_matrix_SSR22_512.webp'),
    // Umi: require('./images/output/icon_matrix_SSR23_512.webp'),
    // Fenrir: require('./images/output/icon_matrix_SSR24_512.webp'),
}
