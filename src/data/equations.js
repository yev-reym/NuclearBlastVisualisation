
//Sources for the blast characteristics equations come from:
//      E.Royce Fletcher, Ray W.Albright, Robert F.D.Perret,
//      Mary E.Franklin, I.Gerald Bowen, and Clayton S.White,
//      "NUCLEAR BOMB EFFECTS COMPUTER (Including Slide-rule Design
//      and Curve Fits for Weapons Effects), " (CEX-62.2) U.S. Atomic Energy Commission
//      Civil Effects Test Operations, February 1963.
//
//      Samuel Glasstone and Philip J. Dolan, THE EFFECTS OF NUCLEAR WEAPONS, 1977 edn.

//The organization and derivation of the equations can be attributed to Alex Wellerstein from NuclearSecrecy
//and credit should go to him for the data organization of this part

//this will hold all the constants and range data of parameters in our blast characteristics
// used in performing our calculations

const eq = {};

eq['2-4'] = [];
eq['2-4'].xmin = 0.0472;
eq['2-4'].xmax = 4.82;
eq['2-4'].args = [-0.1877932, -1.3986162, 0.3255743, -0.0267036];
eq['2-4'].desc = "Max overpressure (surface): psi from scaled range";

//Eq. 2.5 - maximum overpressure at 0 feet; input is psi; output in scaled range
eq['2-5'] = [];
eq['2-5'].xmin = 0.1;
eq['2-5'].xmax = 200;
eq['2-5'].args = [-0.1307982, -0.6836211, 0.1091296, -0.0167348];
eq['2-5'].desc = "Max overpressure (surface): scaled range from psi";

//Eq. 2.19 - maximum overpressure at 100 feet; input is psi; output in scaled range
eq['2-19'] = [];
eq['2-19'].xmin = 1;
eq['2-19'].xmax = 200;
eq['2-19'].args = [-0.0985896, -0.6788230, 0.0846268, -0.0089153];
eq['2-19'].desc = "Max overpressure (100 ft): scaled range from psi";

//Eq. 2.25 - maximum overpressure at 200 feet; input is psi; output in scaled range
eq['2-25'] = [];
eq['2-25'].xmin = 1;
eq['2-25'].xmax = 200;
eq['2-25'].args = [-0.0564384, -0.7063068, 0.0838300, -0.0057337];
eq['2-25'].desc = "Max overpressure (200 ft): scaled range from psi";

//Eq. 2.31 - maximum overpressure at 300 feet; input is psi; output in scaled range
eq['2-31'] = [];
eq['2-31'].xmin = 1;
eq['2-31'].xmax = 100;
eq['2-31'].args = [-0.0324052, -0.6430061, -0.0307184, 0.0375190];
eq['2-31'].desc = "Max overpressure (300 ft): scaled range from psi";

//Eq. 2.37 - maximum overpressure at 400 feet; input is psi; output in scaled range
eq['2-37'] = [];
eq['2-37'].xmin = 1;
eq['2-37'].xmax = 50;
eq['2-37'].args = [-0.0083104, -0.6809590, 0.0443969, 0.0032291];
eq['2-37'].desc = "Max overpressure (400 ft): scaled range from psi";

//Eq. 2.43 - maximum overpressure at 500 feet; input is psi; output in scaled range
eq['2-43'] = [];
eq['2-43'].xmin = 1;
eq['2-43'].xmax = 50;
eq['2-43'].args = [0.0158545, -0.7504681, 0.1812493, -0.0573264];
eq['2-43'].desc = "Max overpressure (500 ft): scaled range from psi";

//Eq. 2.49 - maximum overpressure at 600 feet; input is psi; output in scaled range
eq['2-49'] = [];
eq['2-49'].xmin = 1;
eq['2-49'].xmax = 30;
eq['2-49'].args = [0.0382755, -0.8763984, -0.4701227, -0.02046373];
eq['2-49'].desc = "Max overpressure (600 ft): scaled range from psi";

//Eq. 2.55 - maximum overpressure at 700 feet; input is psi; output in scaled range
eq['2-55'] = [];
eq['2-55'].xmin = 1;
eq['2-55'].xmax = 20;
eq['2-55'].args = [0.0468997, -0.7764501, 0.3312436, -0.1647522];
eq['2-55'].desc = "Max overpressure (700 ft): scaled range from psi";

//Eq. 2.61 - maximum overpressure at optimum blast height; input is psi; output in scaled range
eq['2-61'] = [];
eq['2-61'].xmin = 1;
eq['2-61'].xmax = 200;
eq['2-61'].args = [0.1292768, -0.7227471, 0.0147366, 0.0135239];
eq['2-61'].desc = "Max overpressure (OBH): scaled range from psi";

//Eq. 2.60 - maximum overpressure at optimum height of burst; input is scaled range; output in psi
eq['2-60'] = [];
eq['2-60'].xmin = 0.0508;
eq['2-60'].xmax = 1.35;
eq['2-60'].args = [0.1829156, -1.4114030, -0.0373825, -0.1635453];
eq['2-60'].desc = "Max overpressure (OBH): psi from scaled range";

//Eq. 2.6 - maximum dynamic pressure at 0 feet; input is scaled range; output in psi
eq['2-6'] = [];
eq['2-6'].xmin = 0.0615;
eq['2-6'].xmax = 4.73;
eq['2-6'].args = [-1.9790344, -2.7267144, 0.5250615, -0.1160756];
eq['2-6'].desc = "Max dynamic pressure (surface): psi from scaled range";

//Eq. 2.62 - maximum dynamic pressure at optimum height of burst; input is scaled range; output in psi
eq['2-62'] = [];
eq['2-62'].xmin = 0.154;
eq['2-62'].xmax = 1.37;
eq['2-62'].args = [1.2488468, -2.7368746];
eq['2-62'].desc = "Max dynamic pressure (OBH): psi from scaled range";

//Eq. 2.64 - maximum dynamic pressure at optimum height of burst; input is scaled range; output in psi
eq['2-64'] = [];
eq['2-64'].xmin = 0.0932;
eq['2-64'].xmax = 0.154;
eq['2-64'].args = [-3.8996912, -6.0108828];
eq['2-64'].desc = "Max dynamic pressure (OBH): psi from scaled range";

//Eq. 2.8 - duration of positive overpressure at 0 feet; input is scaled range; output in sec
eq['2-8'] = [];
eq['2-8'].xmin = 0.0677;
eq['2-8'].xmax = 0.740;
eq['2-8'].args = [-0.1739890, 0.5265382, -0.0772505, 0.0654855];
eq['2-8'].desc = "Duration of positive overpressure (surface): sec from scaled range";

//Eq. 2.12 - blast wave arrival time at 0 feet; input is scaled range; output in sec
eq['2-12'] = [];
eq['2-12'].xmin = 0.0570;
eq['2-12'].xmax = 1.10;
eq['2-12'].args = [0.6078753, 1.1039021, -0.2836934, 0.1006855];

//Eq. 2.16 - maximum wind velocity at 0 feet; input is scaled range; output in mph
eq['2-16'] = [];
eq['2-16'].xmin = 0.0589;
eq['2-16'].xmax = 4.73;
eq['2-16'].args = [1.3827823, -1.3518147, 0.1841482, 0.0361427];

//Eq. 2.74 - maximum wind velocity at optimum burst height; input is scaled range; output in mph
eq['2-74'] = [];
eq['2-74'].xmin = 0.2568;
eq['2-74'].xmax = 1.4;
eq['2-74'].args = [1.7110032, -1.2000278, 0.8182584, 1.0652528];

//Eq. 2.76 - maximum wind velocity at optimum burst height; input is scaled range; output in mph
eq['2-76'] = [];
eq['2-76'].xmin = 0.0762;
eq['2-76'].xmax = 0.2568;
eq['2-76'].args = [3.8320701, 5.6357427, 6.6091754, 1.5690375];

/* OPTIMUM HEIGHT OF BURST */

//Eq. 2.78 - optimum height of burst for given overpressure; input is maximum overpressure; output is scaled height
eq['2-78'] = [];
eq['2-78'].xmin = 1;
eq['2-78'].xmax = 200;
eq['2-78'].args = [3.2015016, -0.3263444];

//Eq. 2.79 - optimum height of burst to maximize overpressure; input is scaled range; output is scaled height
eq['2-79'] = [];
eq['2-79'].xmin = 0.0512;
eq['2-79'].xmax  = 1.35;
eq['2-79'].args = [3.1356018, 0.3833517, -0.1159125];

/* THERMAL RADIATION */

//Eq. 2.106 - thermal radiation, input is slant range, for airburst, output is Q(1/W); for surface, input is range, output is Q(1/.7W)
eq['2-106'] = [];
eq['2-106'].xmin = 0.05;
eq['2-106'].xmax  = 50;
eq['2-106'].args = [-0.0401874, -2.0823477, -0.0511744, -0.0074958];

//Eq. 2.108 - thermal radiation, input for airburst is Q(1/W); for surface, is Q(1/.7W); output is distance/slant distance
eq['2-108'] = [];
eq['2-108'].xmin = 0.0001;
eq['2-108'].xmax  = 100;
eq['2-108'].args = [-0.0193419, -0.4804553, -0.0055685, 0.0002013];

//Eq. 2.110 - thermal radiation for 1st degree burns; input is yield, output is Q (cal/cm^2)
eq['2-110'] = [];
eq['2-110'].xmin = 1;
eq['2-110'].xmax  = 100000;
eq['2-110'].args = [0.3141555, 0.059904, 0.0007636, -0.0002015];

//Eq. 2.111 - thermal radiation for 2nd degree burns; input is yield, output is Q (cal/cm^2)
eq['2-111'] = [];
eq['2-111'].xmin = 1;
eq['2-111'].xmax  = 100000;
eq['2-111'].args = [0.6025982, 0.0201394, 0.0139640, 0.0008559];

/* Following 5 equations derived from figure 12.65 of Glasstone and Dolan 1977 */

// These are technically only bound between 1kt and 20 MT but the scaling looks fine enough 
//Eq. 77-12.65-1st-50 - thermal radiation for 50% probability of an unshielded population for 1st degree burns
//input is yield, output is Q (cal/cm^2)
eq['77-12.65-1st-50'] = [];
eq['77-12.65-1st-50'].xmin = 1;
eq['77-12.65-1st-50'].xmax  = 20000;
eq['77-12.65-1st-50'].args = [1.93566176470914, 0.325315457507999, -0.113516274769641, 0.0300971575115961, -0.00330445814836616, 0.000129665656335876];

//Eq. 77-12.65-2nd-50 - thermal radiation for 50% probability of an unshielded population for 2nd degree burns
//input is yield, output is Q (cal/cm^2)
eq['77-12.65-2nd-50'] = [];
eq['77-12.65-2nd-50'].xmin = 1;
eq['77-12.65-2nd-50'].xmax  = 20000;
eq['77-12.65-2nd-50'].args = [4.0147058823566697E+00, 3.7180525416799937E-01, -4.5026131075683193E-02, 1.3549565337157871E-02, -1.6559848551158524E-03, 7.0380159845451207E-05];

//Eq. 77-12.65-3rd-50 - thermal radiation for 50% probability of an unshielded population for 3rd degree burns
//input is yield, output is Q (cal/cm^2)
eq['77-12.65-3rd-50'] = [];
eq['77-12.65-3rd-50'].xmin = 1;
eq['77-12.65-3rd-50'].xmax  = 20000;
eq['77-12.65-3rd-50'].args = [5.9981617647112317E+00, 5.3350791551060528E-01, -2.3435878115600033E-02, 1.0395274013807305E-02, -1.4366360115630195E-03, 6.3930657856814399E-05];

//Eq. 77-12.65-noharm-100 - thermal radiation for 100% probability of an unshielded population for no burns
//input is yield, output is Q (cal/cm^2)
eq['77-12.65-noharm-100'] = [];
eq['77-12.65-noharm-100'].xmin = 1;
eq['77-12.65-noharm-100'].xmax  = 20000;
eq['77-12.65-noharm-100'].args = [1.14705882353066, 0.124659908645308, -0.0160088216223604, 0.00359441786929512, -0.000263841056172493, 0.0000053050769836388];

//Eq. 77-12.65-3rd-100 - thermal radiation for 100% probability of an unshielded population for 3rd degree burns
//input is yield, output is Q (cal/cm^2)
eq['77-12.65-3rd-100'] = [];
eq['77-12.65-3rd-100'].xmin = 1;
eq['77-12.65-3rd-100'].xmax  = 20000;
eq['77-12.65-3rd-100'].args = [7.0018382352996857, 0.55437306382914320, 0.056501270479506649, -0.015219252753643841, 0.0017062986685328282, -0.000067950215125955893];


/* INITIAL NUCLEAR RADIATION */

//Eq. 2.115 - ratio of scaling factor to yield, used for 2.114; input is yield, output is scaling factor
eq['2-115'] = [];
eq['2-115'].xmin = 10;
eq['2-115'].xmax  = 20000;
eq['2-115'].args = [-2.1343121, 5.6948378, -5.7707609, 2.7712520, -0.6206012, 0.0526380];

export default eq;



