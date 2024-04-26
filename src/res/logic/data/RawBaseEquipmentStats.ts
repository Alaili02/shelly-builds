import { baseStatKey, EquipmentKey, EquipmentRarityKey } from "../types/EquipmentTypes"

type BaseEquipmentStatsT = {
    [equipmentType in EquipmentKey]: {
        [equipmentRarity in EquipmentRarityKey]: {
            [baseStat in baseStatKey]?: number
        }
    }
}

export const BaseEquipmentStats:BaseEquipmentStatsT = {
    Helm: {
        Elite: {
            Attack: 63.89563,
            HP: 3407.767
        },
        Fortress: {
            Attack: 112.5,
            HP: 6000
        }
    },
    Spaulders: {
        Elite: {
            Attack: 68.15534,
            HP: 3066.9902
        },
        Fortress: {
            Attack: 120,
            HP: 5400
        }
    },
    Armor: {
        Elite: {
            Resistance: 56.796116,
            HP: 4884.466
        },
        Fortress: {
            Resistance: 100,
            HP: 8600
        }
    },
    Bracers: {
        Elite: {
            Attack: 68.15534,
            HP: 3066.9902
        },
        Fortress: {
            Attack: 120,
            HP: 5400
        }
    },
    Belt: {
        Elite: {
            Resistance: 56.796116,
            HP: 4884.466
        },
        Fortress: {
            Resistance: 100,
            HP: 8600
        }
    },
    Gloves: {
        Elite: {
            Attack: 72.41505,
            Crit: 170.38835
        },
        Fortress: {
            Attack: 127.5,
            Crit: 300
        }
    },
    LegGuards: {
        Elite: {
            Resistance: 56.796116,
            HP: 4884.466
        },
        Fortress: {
            Resistance: 100,
            HP: 8600
        }
    },
    Boots: {
        Elite: {
            Attack: 68.15534,
            HP: 3066.9902
        },
        Fortress: {
            Attack: 120,
            HP: 5400
        }
    },
    Reactor: {
        Elite: {
            Attack: 48.56068,
            Resistance: 11.714199,
            HP: 3884.8542
        },
        Fortress: {
            Attack: 85.5,
            Resistance: 20.625,
            HP: 6840
        }
    },
    Visor: {
        Elite: {
            Resistance: 73.47997,
            HP: 2453.5923,
            Crit: 85.194176
        },
        Fortress: {
            Resistance: 129.375,
            HP: 4320,
            Crit: 150
        }
    },
    Engine: {
        Elite: {
            Attack: 60.913834,
            HP: 3646.3108
        },
        Fortress: {
            Attack: 107.25,
            HP: 6420
        }
    },
    Exoskeleton: {
        Elite: {
            Attack: 60.913834,
            HP: 3646.3108
        },
        Fortress: {
            Attack: 107.25,
            HP: 6420
        }
    }
}