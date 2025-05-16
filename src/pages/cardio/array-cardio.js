const inventors = [
  {
    first: 'Albert',
    last: 'Einstein',
    year: 1879,
    passed: 1955,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat3&accessoriesType=Kurt&hatColor=PastelYellow&facialHairType=BeardMedium&facialHairColor=Black&clotheType=Hoodie&clotheColor=Blue01&eyeType=Dizzy&eyebrowType=SadConcerned&mouthType=Tongue&skinColor=Light',
  },
  {
    first: 'Isaac',
    last: 'Newton',
    year: 1643,
    passed: 1727,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Blank&hatColor=PastelBlue&hairColor=SilverGray&facialHairType=BeardLight&facialHairColor=Brown&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=Squint&eyebrowType=UpDownNatural&mouthType=Default&skinColor=Tanned',
  },
  {
    first: 'Galileo',
    last: 'Galilei',
    year: 1564,
    passed: 1642,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Kurt&hairColor=Brown&facialHairType=MoustacheFancy&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=PastelGreen&eyeType=Default&eyebrowType=SadConcernedNatural&mouthType=Twinkle&skinColor=DarkBrown',
  },
  {
    first: 'Marie',
    last: 'Curie',
    year: 1867,
    passed: 1934,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Sunglasses&hairColor=Blue&facialHairType=MoustacheFancy&facialHairColor=BlondeGolden&clotheType=ShirtVNeck&clotheColor=White&eyeType=Side&eyebrowType=Angry&mouthType=Serious&skinColor=Pale',
  },
  {
    first: 'Johannes',
    last: 'Kepler',
    year: 1571,
    passed: 1630,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=CollarSweater&clotheColor=Red&eyeType=Squint&eyebrowType=UpDown&mouthType=ScreamOpen&skinColor=Tanned',
  },
  {
    first: 'Nicolaus',
    last: 'Copernicus',
    year: 1473,
    passed: 1543,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=Hijab&accessoriesType=Round&hatColor=Black&hairColor=PastelPink&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Pink&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Pale',
  },
  {
    first: 'Max',
    last: 'Planck',
    year: 1858,
    passed: 1947,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Prescription01&hatColor=Blue03&hairColor=Blue&facialHairType=MoustacheFancy&facialHairColor=BlondeGolden&clotheType=BlazerShirt&clotheColor=Gray02&eyeType=Hearts&eyebrowType=SadConcernedNatural&mouthType=Concerned&skinColor=DarkBrown',
  },
  {
    first: 'Katherine',
    last: 'Blodgett',
    year: 1898,
    passed: 1979,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Round&hatColor=PastelOrange&hairColor=Platinum&facialHairType=Blank&facialHairColor=Blonde&clotheType=GraphicShirt&clotheColor=Heather&graphicType=Skull&eyeType=Happy&eyebrowType=Default&mouthType=Twinkle&skinColor=Pale',
  },
  {
    first: 'Ada',
    last: 'Lovelace',
    year: 1815,
    passed: 1852,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=BlondeGolden&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Black&graphicType=Skull&eyeType=Surprised&eyebrowType=DefaultNatural&mouthType=ScreamOpen&skinColor=Yellow',
  },
  {
    first: 'Sarah E.',
    last: 'Goode',
    year: 1855,
    passed: 1905,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Round&hairColor=Brown&facialHairType=MoustacheMagnum&facialHairColor=Platinum&clotheType=GraphicShirt&clotheColor=Red&graphicType=Bear&eyeType=Close&eyebrowType=RaisedExcitedNatural&mouthType=ScreamOpen&skinColor=Black',
  },
  {
    first: 'Lise',
    last: 'Meitner',
    year: 1878,
    passed: 1968,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat1&accessoriesType=Sunglasses&hatColor=PastelGreen&facialHairType=MoustacheMagnum&facialHairColor=BlondeGolden&clotheType=GraphicShirt&clotheColor=PastelYellow&graphicType=Pizza&eyeType=WinkWacky&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light',
  },
  {
    first: 'Hanna',
    last: 'Hammarström',
    year: 1829,
    passed: 1909,
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Sunglasses&hairColor=Platinum&facialHairType=MoustacheFancy&facialHairColor=Brown&clotheType=ShirtCrewNeck&clotheColor=PastelOrange&graphicType=Bat&eyeType=Hearts&eyebrowType=RaisedExcitedNatural&mouthType=Eating&skinColor=DarkBrown',
  },
]

const people = [
  'Bernhard, Sandra',
  'Bethea, Erin',
  'Becker, Carl',
  'Bentsen, Lloyd',
  'Beckett, Samuel',
  'Blake, William',
  'Berger, Ric',
  'Beddoes, Mick',
  'Beethoven, Ludwig',
  'Belloc, Hilaire',
  'Begin, Menachem',
  'Bellow, Saul',
  'Benchley, Robert',
  'Blair, Robert',
  'Benenson, Peter',
  'Benjamin, Walter',
  'Berlin, Irving',
  'Benn, Tony',
  'Benson, Leana',
  'Bent, Silas',
  'Berle, Milton',
  'Berry, Halle',
  'Biko, Steve',
  'Beck, Glenn',
  'Bergman, Ingmar',
  'Black, Elk',
  'Berio, Luciano',
  'Berne, Eric',
  'Berra, Yogi',
  'Berry, Wendell',
  'Bevan, Aneurin',
  'Ben-Gurion, David',
  'Bevel, Ken',
  'Biden, Joseph',
  'Bennington, Chester',
  'Bierce, Ambrose',
  'Billings, Josh',
  'Birrell, Augustine',
  'Blair, Tony',
  'Beecher, Henry',
  'Biondo, Frank',
]

const data = [
  'car',
  'car',
  'truck',
  'truck',
  'bike',
  'walk',
  'car',
  'van',
  'bike',
  'walk',
  'car',
  'van',
  'car',
  'truck',
]

export { data, inventors, people }
