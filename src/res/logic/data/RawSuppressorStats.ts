import { SuppressorKeyT } from "../../../store/characterSlice"

type SuppressorDataT = {
    [Sup in SuppressorKeyT]: {
        'Attack': number,
        'Resistance': number,
        'HP': number,
        'Crit': number,
        'CombatScore': number,
    }
}
export const SuppressorData:SuppressorDataT = {
    '0.0': {
        'Attack': 0,
        'Resistance': 0,
        'HP': 0,
        'Crit': 0,
        'CombatScore': 0
    },
    '1.1': {
        'Attack': 6.525243,
        'Resistance': 0,
        'HP': 2088.0776,
        'Crit': 0,
        'CombatScore': 0
    },
    '1.2': {
        'Attack': 21.750809,
        'Resistance': 19.575727,
        'HP': 2088.0776,
        'Crit': 0,
        'CombatScore': 0
    },
    '1.3': {
        'Attack': 43.501617,
        'Resistance': 32.626213,
        'HP': 2088.0776,
        'Crit': 0,
        'CombatScore': 0
    },
  '1.4': {
        'Attack': 43.501617,
        'Resistance': 32.626213,
        'HP': 4176.1553,
        'Crit': 41.524273,
        'CombatScore': 0
    },
  '1.5': {
        'Attack': 65.252426,
        'Resistance': 32.626213,
        'HP': 5220.1943,
        'Crit': 41.524273,
        'CombatScore': 0
    },
  '2.1': {
        'Attack': 65.252426,
        'Resistance': 39.61068,
        'HP': 7455.223,
        'Crit': 41.524273,
        'CombatScore': 0
    },
  '2.2': {
        'Attack': 88.53398,
        'Resistance': 53.579613,
        'HP': 7455.223,
        'Crit': 41.524273,
        'CombatScore': 0
    },
  '2.3': {
        'Attack': 111.81554,
        'Resistance': 67.548546,
        'HP': 7455.223,
        'Crit': 41.524273,
        'CombatScore': 0
    },
  '2.4': {
        'Attack': 111.81554,
        'Resistance': 67.548546,
        'HP': 9690.252,
        'Crit': 85.97087,
        'CombatScore': 0
    },
  '2.5': {
        'Attack': 135.09709,
        'Resistance': 67.548546,
        'HP': 10807.767,
        'Crit': 85.97087,
        'CombatScore': 0
    },
  '3.1': {
        'Attack': 135.09709,
        'Resistance': 75.18446,
        'HP': 13251.262,
        'Crit': 85.97087,
        'CombatScore': 0
    },
  '3.2': {
        'Attack': 160.55016,
        'Resistance': 90.456314,
        'HP': 13251.262,
        'Crit': 85.97087,
        'CombatScore': 0
    },
  '3.3': {
        'Attack': 186.00323,
        'Resistance': 105.72816,
        'HP': 13251.262,
        'Crit': 85.97087,
        'CombatScore': 0
    },
  '3.4': {
        'Attack': 186.00323,
        'Resistance': 105.72816,
        'HP': 15694.757,
        'Crit': 134.56311,
        'CombatScore': 0
    },
  '3.5': {
        'Attack': 211.45631,
        'Resistance': 105.72816,
        'HP': 16916.504,
        'Crit': 134.56311,
        'CombatScore': 0
    },
  '4.1': {
        'Attack': 211.45631,
        'Resistance': 114.43204,
        'HP': 19701.748,
        'Crit': 134.56311,
        'CombatScore': 0
    },
  '4.2': {
        'Attack': 240.46925,
        'Resistance': 131.83981,
        'HP': 19701.748,
        'Crit': 134.56311,
        'CombatScore': 0
    },
  '4.3': {
        'Attack': 269.4822,
        'Resistance': 149.24757,
        'HP': 19701.748,
        'Crit': 134.56311,
        'CombatScore': 0
    },
  '4.4': {
        'Attack': 269.4822,
        'Resistance': 149.24757,
        'HP': 22486.99,
        'Crit': 189.95146,
        'CombatScore': 0
    },
  '4.5': {
        'Attack': 298.49515,
        'Resistance': 149.24757,
        'HP': 23879.611,
        'Crit': 189.95146,
        'CombatScore': 0
    },
  '5.1': {
        'Attack': 298.49515,
        'Resistance': 159.01942,
        'HP': 27006.602,
        'Crit': 189.95146,
        'CombatScore': 0
    },
  '5.2': {
        'Attack': 331.06796,
        'Resistance': 178.56311,
        'HP': 27006.602,
        'Crit': 189.95146,
        'CombatScore': 0
    },
  '5.3': {
        'Attack': 363.64078,
        'Resistance': 198.1068,
        'HP': 27006.602,
        'Crit': 189.95146,
        'CombatScore': 0
    },
  '5.4': {
        'Attack': 363.64078,
        'Resistance': 198.1068,
        'HP': 30133.592,
        'Crit': 252.13593,
        'CombatScore': 0
    },
  '5.5': {
        'Attack': 396.2136,
        'Resistance': 198.1068,
        'HP': 31697.088,
        'Crit': 252.13593,
        'CombatScore': 0
    },
  '6.1': {
        'Attack': 396.2136,
        'Resistance': 208.94661,
        'HP': 35165.824,
        'Crit': 252.13593,
        'CombatScore': 0
    },
  '6.2': {
        'Attack': 432.34628,
        'Resistance': 230.62622,
        'HP': 35165.824,
        'Crit': 252.13593,
        'CombatScore': 0
    },
  '6.3': {
        'Attack': 468.47897,
        'Resistance': 252.30583,
        'HP': 35165.824,
        'Crit': 252.13593,
        'CombatScore': 0
    },
  '6.4': {
        'Attack': 468.47897,
        'Resistance': 252.30583,
        'HP': 38634.562,
        'Crit': 321.11652,
        'CombatScore': 0
    },
  '6.5': {
        'Attack': 504.61166,
        'Resistance': 252.30583,
        'HP': 40368.934,
        'Crit': 321.11652,
        'CombatScore': 0
    },
  '7.1': {
        'Attack': 504.61166,
        'Resistance': 264.2136,
        'HP': 44179.418,
        'Crit': 321.11652,
        'CombatScore': 0
    },
  '7.2': {
        'Attack': 544.3042,
        'Resistance': 288.0291,
        'HP': 44179.418,
        'Crit': 321.11652,
        'CombatScore': 0
    },
  '7.3': {
        'Attack': 583.99677,
        'Resistance': 311.84467,
        'HP': 44179.418,
        'Crit': 321.11652,
        'CombatScore': 0
    },
  '7.4': {
        'Attack': 583.99677,
        'Resistance': 311.84467,
        'HP': 47989.902,
        'Crit': 396.89322,
        'CombatScore': 0
    },
  '7.5': {
        'Attack': 623.68933,
        'Resistance': 311.84467,
        'HP': 49895.145,
        'Crit': 396.89322,
        'CombatScore': 0
    },
  '8.1': {
        'Attack': 623.68933,
        'Resistance': 325.7068,
        'HP': 54331.027,
        'Crit': 396.89322,
        'CombatScore': 0
    },
  '8.2': {
        'Attack': 669.8964,
        'Resistance': 353.43106,
        'HP': 54331.027,
        'Crit': 396.89322,
        'CombatScore': 0
    },
  '8.3': {
        'Attack': 716.1036,
        'Resistance': 381.15533,
        'HP': 54331.027,
        'Crit': 396.89322,
        'CombatScore': 0
    },
  '8.4': {
        'Attack': 716.1036,
        'Resistance': 381.15533,
        'HP': 58766.914,
        'Crit': 485.10678,
        'CombatScore': 0
    },
  '8.5': {
        'Attack': 762.31067,
        'Resistance': 381.15533,
        'HP': 60984.855,
        'Crit': 485.10678,
        'CombatScore': 0
    }
};

//     '9.1': {
//         'Attack': 762.31067,
//         'Resistance': 396.79562,
//         'HP': 65989.75,
//         'Crit': 485.10678,
//         'CombatScore': 0
//     },
//   '9.2': {
//         'Attack': 814.445,
//         'Resistance': 428.0762,
//         'HP': 65989.75,
//         'Crit': 485.10678,
//         'CombatScore': 0
//     },
//   '9.3': {
//         'Attack': 866.5793,
//         'Resistance': 459.35678,
//         'HP': 65989.75,
//         'Crit': 485.10678,
//         'CombatScore': 0
//     },
//   '9.4': {
//         'Attack': 866.5793,
//         'Resistance': 459.35678,
//         'HP': 70994.64,
//         'Crit': 584.6359,
//         'CombatScore': 0
//     },
//   '9.5': {
//         'Attack': 918.71356,
//         'Resistance': 459.35678,
//         'HP': 73497.086,
//         'Crit': 584.6359,
//         'CombatScore': 0
//     },
//   '10.1': {
//         'Attack': 918.71356,
//         'Resistance': 477.48544,
//         'HP': 79298.25,
//         'Crit': 584.6359,
//         'CombatScore': 0
//     },
//   '10.2': {
//         'Attack': 979.1424,
//         'Resistance': 513.74274,
//         'HP': 79298.25,
//         'Crit': 584.6359,
//         'CombatScore': 0
//     },
//   '10.3': {
//         'Attack': 1039.5712,
//         'Resistance': 550.0,
//         'HP': 79298.25,
//         'Crit': 584.6359,
//         'CombatScore': 0
//     },
//   '10.4': {
//         'Attack': 1039.5712,
//         'Resistance': 550.0,
//         'HP': 85099.414,
//         'Crit': 700.0,
//         'CombatScore': 0
//     },
//   '10.5': {
//         'Attack': 1100.0,
//         'Resistance': 550.0,
//         'HP': 88000.0,
//         'Crit': 700.0,
//   }
// }