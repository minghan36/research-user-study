const realWords1 = [
  "HOUSE", "CHAIR", "TABLE", "APPLE", "BREAD"]
const nonWords1 = [
  "BLORN", "TRAZZ", "FWEEP", "GLARN", "SNOOB"]
// const realWords1 = [
//   "HOUSE", "CHAIR", "TABLE", "APPLE", "BREAD",
//   "WATER", "LIGHT", "MUSIC", "PHONE", "HAPPY",
//   "SMILE", "DREAM", "PEACE", "HEART", "FLOWER",
//   "OCEAN", "PLANT", "MONEY", "WORLD", "QUICK",
//   "BRAVE", "TRUST", "VOICE", "EARTH", "SPACE",
//   "TRAIN", "DANCE", "MAGIC", "STORM", "FRESH",
//   "CLEAN", "SMART", "SOUND", "SIGHT", "TOUCH",
//   "YOUTH", "FAITH", "TRUTH", "POWER", "GLORY",
//   "BEACH", "BOOKS", "CLOUD", "CRAFT", "DOORS",
//   "FLAME", "GLASS"
// ];

const realWords2 = [
  "GREEN", "HANDS", "HUMAN", "ZONES", "SCOOP",
  "IMAGE", "JUDGE", "KNIFE", "LAUGH", "MARCH",
  "NIGHT", "ORDER", "PAPER", "QUIET", "RIVER",
  "SLEEP", "THINK", "UNDER", "VALUE", "WHITE",
  "YOUNG", "ZEBRA", "ANGEL", "BRING", "CATCH",
  "DRIVE", "ENTER", "FIELD", "GRACE", "HORSE",
  "INDEX", "JOINT", "KNOWS", "LEVEL", "MOVIE",
  "NURSE", "OFTEN", "PARTY", "QUEEN", "RADIO",
  "SERVE", "THROW", "UNCLE", "VISIT", "WATCH",
  "EXACT", "YEARS"
];


// const nonWords1 = [
//   "BLORN", "TRAZZ", "FWEEP", "GLARN", "SNOOB",
//   "DRIMB", "PLART", "KRIND", "ZOGMA", "BRULT",
//   "QUEMP", "WOGGO", "FRINT", "GLUFT", "SHROP",
//   "TWINT", "MIBLO", "GRALL", "VLEEK", "SPROK",
//   "NUGGO", "TRIMP", "BLURF", "KROOM", "TWAZZ",
//   "SLORN", "WIBZY", "ZOOFA", "CRUSP", "MROOB",
//   "ZATCH", "DWORP", "SLAMP", "FRUZZ", "GLEEP",
//   "THARN", "VLOOP", "DRINT", "KRONG", "SPLIB",
//   "CLUFT", "NIMPL", "GRUNK", "SWORT", "BROZZ",
//   "TWORN", "SKARF"
// ];

const nonWords2 = [
  "CLONG", "PWOOF", "THRIP", "SNUMF", "VREEP", 
  "DROFF", "KLERT", "ZLOOP", "BLISH", "FRONG", 
  "TWIRP", "PLURM", "SKILP", "QUORB", "TRUZZ", 
  "JIBNO", "KLAND", "GNURP", "SWEMP", "DRAFF", 
  "BRIMP", "GLUMP", "MROGG", "WROOG", "VIBNO", 
  "SNEEB", "CLORT", "TWUNK", "PLOOF", "KRALL", 
  "STORF", "BLURM", "GWONK", "SNERP", "THLUB", 
  "FRAMP", "GRIBP"
];

// Export the arrays
export { realWords1, realWords2, nonWords1, nonWords2 };

/**
 * Get a random real word from the list
 * @returns {string} A random 5-letter real word
 */
export function getRandomBlockOneWord() {
  const randomIndex = Math.floor(Math.random() * realWords1.length);
  return realWords1[randomIndex];
}

/**
 * Get a random non-word from the list
 * @returns {string} A random 5-letter non-word
 */
export function getRandomBlockOneNonWord() {
  const randomIndex = Math.floor(Math.random() * nonWords1.length);
  return nonWords1[randomIndex];
}
