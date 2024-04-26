import { baseStatKey, EquipmentKey, EquipmentRarityKey } from "../../res/logic/types/EquipmentTypes";

type EquipmentImagesI = {
    [rarity in EquipmentRarityKey]: {
        [type in EquipmentKey]: string
    }
}

type EquipmentSlotImagesT = {[type in EquipmentKey]: string}

export const EquipmentImages:EquipmentImagesI = {
    'Fortress': {
        'Bracers': require('./images/Fortress/Bracers.png'),
        'Armor': require('./images/Fortress/Armor.png'),
        'Boots': require('./images/Fortress/Boots.png'),
        'Belt': require('./images/Fortress/Belt.png'),
        'Gloves': require('./images/Fortress/Gloves.png'),
        'Helm': require('./images/Fortress/Helm.png'),
        'LegGuards': require('./images/Fortress/LegGuards.png'),
        'Spaulders': require('./images/Fortress/Spaulders.png'),
        'Reactor': require('./images/Fortress/Reactor.png'),
        'Engine': require('./images/Fortress/Engine.png'),
        'Visor': require('./images/Fortress/Visor.png'),
        'Exoskeleton': require('./images/Fortress/exoskeleton_orange.png'),
    },
    'Elite': {
        'Bracers': require('./images/Elite/armband_030101.png'),
        'Armor': require('./images/Elite/cloth_030101.png'),
        'Boots': require('./images/Elite/shoes_030101.png'),
        'Belt': require('./images/Elite/belt_030101.png'),
        'Gloves': require('./images/Elite/glove_030101.png'),
        'Helm': require('./images/Elite/Helmet_030101.png'),
        'LegGuards': require('./images/Elite/pants_030101.png'),
        'Spaulders': require('./images/Elite/shawl_030101.png'),

        'Reactor': require('./images/Elite/reactor_purple.png'),
        'Engine': require('./images/Elite/core_purple.png'),
        'Visor': require('./images/Elite/visor_purple.png'),
        'Exoskeleton': require('./images/Elite/exoskeleton_purple.png'),
    }
}

export const EquipmentSlotImages:EquipmentSlotImagesT = {
    'Bracers': require('./images/slot/Bracers.png'),
    'Armor': require('./images/slot/Armor.png'),
    'Boots': require('./images/slot/Boots.png'),
    'Belt': require('./images/slot/Belt.png'),
    'Gloves': require('./images/slot/Gloves.png'),
    'Helm': require('./images/slot/Helm.png'),
    'LegGuards': require('./images/slot/LegGuards.png'),
    'Spaulders': require('./images/slot/Spaulders.png'),
    'Reactor': require('./images/slot/Reactor.png'),
    'Engine': require('./images/slot/Engine.png'),
    'Visor': require('./images/slot/Visor.png'),
    'Exoskeleton': require('./images/slot/Exoskeleton.png'),
}
