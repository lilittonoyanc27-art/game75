export interface PreteritoQuestion {
  id: number;
  armenian: string;
  spanishClue: string;
  verb: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface VerbConjugation {
  pronoun: string;
  form: string;
}

export interface IrregularVerbData {
  verb: string;
  meaning: string;
  clue: string;
  conjugations: VerbConjugation[];
}

export interface RegularVerbRule {
  ending: string;
  terminations: { pronoun: string; suffix: string }[];
  example: string;
}

export const REGULAR_RULES: RegularVerbRule[] = [
  {
    ending: "-AR (օրինակ՝ Cantar - երգել)",
    example: "Yo cantaba, Tú cantabas, Él cantaba...",
    terminations: [
      { pronoun: "Yo", suffix: "-aba" },
      { pronoun: "Tú", suffix: "-abas" },
      { pronoun: "Él / Ella / Usted", suffix: "-aba" },
      { pronoun: "Nosotros / Nosotras", suffix: "-ábamos" },
      { pronoun: "Vosotros / Vosotras", suffix: "-abais" },
      { pronoun: "Ellos / Ellas / Ustedes", suffix: "-aban" }
    ]
  },
  {
    ending: "-ER / -IR (օրինակ՝ Comer - ուտել, Vivir - ապրել)",
    example: "Yo comía/vivía, Tú comías/vivías...",
    terminations: [
      { pronoun: "Yo", suffix: "-ía" },
      { pronoun: "Tú", suffix: "-ías" },
      { pronoun: "Él / Ella / Usted", suffix: "-ía" },
      { pronoun: "Nosotros / Nosotras", suffix: "-íamos" },
      { pronoun: "Vosotros / Vosotras", suffix: "-íais" },
      { pronoun: "Ellos / Ellas / Ustedes", suffix: "-ían" }
    ]
  }
];

export const IRREGULAR_VERBS: IrregularVerbData[] = [
  {
    verb: "SER",
    meaning: "լինել (տևական, հատկանիշ)",
    clue: "Ամենահաճախ օգտագործվող անկանոն բայն է անցյալ նկարագրությունների համար:",
    conjugations: [
      { pronoun: "Yo", form: "era" },
      { pronoun: "Tú", form: "eras" },
      { pronoun: "Él / Ella / Usted", form: "era" },
      { pronoun: "Nosotros / Nosotras", form: "éramos" },
      { pronoun: "Vosotros / Vosotras", form: "erais" },
      { pronoun: "Ellos / Ellas / Ustedes", form: "eran" }
    ]
  },
  {
    verb: "IR",
    meaning: "գնալ",
    clue: "Օգտագործվում է անցյալում կրկնվող գնալու գործողությունները նկարագրելիս:",
    conjugations: [
      { pronoun: "Yo", form: "iba" },
      { pronoun: "Tú", form: "ibas" },
      { pronoun: "Él / Ella / Usted", form: "iba" },
      { pronoun: "Nosotros / Nosotras", form: "íbamos" },
      { pronoun: "Vosotros / Vosotras", form: "ibais" },
      { pronoun: "Ellos / Ellas / Ustedes", form: "iban" }
    ]
  },
  {
    verb: "VER",
    meaning: "տեսնել / դիտել",
    clue: "Պահպանում է իր արմատային 'e'-ն և ստանում -ía վերջավորությունները:",
    conjugations: [
      { pronoun: "Yo", form: "veía" },
      { pronoun: "Tú", form: "veías" },
      { pronoun: "Él / Ella / Usted", form: "veía" },
      { pronoun: "Nosotros / Nosotras", form: "veíamos" },
      { pronoun: "Vosotros / Vosotras", form: "veíais" },
      { pronoun: "Ellos / Ellas / Ustedes", form: "veían" }
    ]
  }
];

export const PRETERITO_QUESTIONS: PreteritoQuestion[] = [
  {
    id: 1,
    armenian: "«Երբ ես փոքր էի, շատ ամաչկոտ էի»",
    spanishClue: "Cuando yo ____ pequeño, ____ muy tímido.",
    verb: "SER (լինել)",
    options: [
      { text: "era / era", isCorrect: true },
      { text: "fui / fui", isCorrect: false },
      { text: "era / fui", isCorrect: false }
    ],
    explanation: "Pretérito Imperfecto-ն օգտագործվում է անցյալում մարդու հատկանիշները նկարագրելիս: SER-ը անկանոն է, Yo-ի ձևն է՝ era:"
  },
  {
    id: 2,
    armenian: "«Մենք ամեն ամառ գնում էինք Իսպանիա»",
    spanishClue: "Nosotros ____ a España cada verano.",
    verb: "IR (գնալ)",
    options: [
      { text: "íbamos", isCorrect: true },
      { text: "fuimos", isCorrect: false },
      { text: "iban", isCorrect: false }
    ],
    explanation: "Անցյալում սովորույթային, պարբերաբար կրկնվող գործողությունների համար օգտագործվում է Pretérito Imperfecto: IR-ի Nosotros ձևն է՝ íbamos (անցյալի անկանոն բայ):"
  },
  {
    id: 3,
    armenian: "«Դու սովորաբար տեսնո՞ւմ էիր նրանց դպրոցում»",
    spanishClue: "¿Tú los ____ en la escuela habitualmente?",
    verb: "VER (տեսնել)",
    options: [
      { text: "veías", isCorrect: true },
      { text: "viste", isCorrect: false },
      { text: "veían", isCorrect: false }
    ],
    explanation: "VER-ը Pretérito Imperfecto-ում անկանոն ձև ունի: Պահպանում է 'e'-ն և Tú դեպքում ստանում 'veías' ձևը:"
  },
  {
    id: 4,
    armenian: "«Աղջիկները երկար ժամանակ խաղում էին այգում»",
    spanishClue: "Las chicas ____ en el parque por mucho tiempo.",
    verb: "JUGAR (խաղալ)",
    options: [
      { text: "jugaban", isCorrect: true },
      { text: "jugaron", isCorrect: false },
      { text: "jugábamos", isCorrect: false }
    ],
    explanation: "Jugar-ը կանոնավոր -AR խմբի բայ է: Las chicas-ը համապատասխանում է ellas-ին, ուստի ստանում է -aban վերջավորությունը՝ jugaban:"
  },
  {
    id: 5,
    armenian: "«Մենք դպրոցում շատ լավ ընկերներ էինք»",
    spanishClue: "Nosotros ____ muy buenos amigos en la escuela.",
    verb: "SER (լինել)",
    options: [
      { text: "éramos", isCorrect: true },
      { text: "fuimos", isCorrect: false },
      { text: "erais", isCorrect: false }
    ],
    explanation: "SER բայի անկանոն ձևը Nosotros-ի համար է éramos: Չմոռանաք շեշտանշանը (tilde):"
  },
  {
    id: 6,
    armenian: "«Իմ ծնողները ապրում էին մի հին տան մեջ»",
    spanishClue: "Mis padres ____ en una casa vieja.",
    verb: "VIVIR (ապրել)",
    options: [
      { text: "vivían", isCorrect: true },
      { text: "vivieron", isCorrect: false },
      { text: "vivías", isCorrect: false }
    ],
    explanation: "Vivir-ը կանոնավոր -IR խմբի բայ է: Pretérito Imperfecto-ում -ER/-IR բայերը ստանում են -ía սերիայի վերջավորությունները: Ellas/Ellos-ի համար՝ vivían:"
  },
  {
    id: 7,
    armenian: "«Ես գիրք էի կարդում, երբ հեռախոսը զանգեց»",
    spanishClue: "Yo ____ un libro cuando el teléfono sonó.",
    verb: "LEER (կարդալ)",
    options: [
      { text: "leía", isCorrect: true },
      { text: "leí", isCorrect: false },
      { text: "leían", isCorrect: false }
    ],
    explanation: "Անցյալում տեղի ունեցող երկար ընթացիկ գործողությունը, որը ընդհատվում է մեկ այլ կարճ գործողությամբ (sonó), արտահայտվում է Pretérito Imperfecto-ով՝ leía:"
  },
  {
    id: 8,
    armenian: "«Դուք (vosotros) միասին էիք երգում երեկույթներին»",
    spanishClue: "Vosotros ____ juntos en las fiestas.",
    verb: "CANTAR (երգել)",
    options: [
      { text: "cantabais", isCorrect: true },
      { text: "cantaban", isCorrect: false },
      { text: "cantasteis", isCorrect: false }
    ],
    explanation: "-AR խմբի բայերի համար Vosotros-ի վերջավորությունն է -abais, հետևաբար՝ cantabais:"
  },
  {
    id: 9,
    armenian: "«Գայանեն ութ տարեկան էր, երբ ընտանիքը տեղափոխվեց»",
    spanishClue: "Gayane ____ ocho años cuando la familia se mudó.",
    verb: "TENER (ունենալ)",
    options: [
      { text: "tenía", isCorrect: true },
      { text: "tuvo", isCorrect: false },
      { text: "tenías", isCorrect: false }
    ],
    explanation: "Իսպաներենում անցյալ ժամանակով տարիք նշելիս միշտ օգտագործվում է Pretérito Imperfecto: Tener -> tenía:"
  },
  {
    id: 10,
    armenian: "«Գոռն ու իր ընկերները ամեն ուրբաթ գնում էին լողավազան»",
    spanishClue: "Gor y sus amigos ____ a la piscina cada viernes.",
    verb: "IR (գնալ)",
    options: [
      { text: "iban", isCorrect: true },
      { text: "fueron", isCorrect: false },
      { text: "íbamos", isCorrect: false }
    ],
    explanation: "Gor y sus amigos համապատասխանում է ellos դերանվանը: IR անկանոն բայի ձևն է՝ iban:"
  },
  {
    id: 11,
    armenian: "«Դու անդադար խոսում էիր դասի ժամանակ»",
    spanishClue: "Tú ____ sin parar durante la clase.",
    verb: "HABLAR (խոսել)",
    options: [
      { text: "hablabas", isCorrect: true },
      { text: "hablaste", isCorrect: false },
      { text: "hablaban", isCorrect: false }
    ],
    explanation: "-AR խմբի բայերի համար Tú դերանվան վերջավորությունն է -abas -> hablabas:"
  },
  {
    id: 12,
    armenian: "«Ես մտածում էի, որ դու տանն ես»",
    spanishClue: "Yo ____ que tú estabas en casa.",
    verb: "PENSAR (մտածել)",
    options: [
      { text: "pensaba", isCorrect: true },
      { text: "pensé", isCorrect: false },
      { text: "pensaban", isCorrect: false }
    ],
    explanation: "Մտավոր վիճակները, կարծիքները և մտքերը անցյալում նկարագրելիս սովորաբար օգտագործում ենք Pretérito Imperfecto՝ pensaba:"
  },
  {
    id: 13,
    armenian: "«Նա (Գոռը) սովորում էր, երբ մենք ներս մտանք»",
    spanishClue: "Él ____ cuando nosotros entramos.",
    verb: "ESTUDIAR (սովորել)",
    options: [
      { text: "estudiaba", isCorrect: true },
      { text: "estudió", isCorrect: false },
      { text: "estudiaban", isCorrect: false }
    ],
    explanation: "Ֆոնային գործողությունը, որի ընթացքում ինչ-որ բան տեղի ունեցավ, դրվում է Imperfecto-ով: Estudiar -> estudiaba:"
  },
  {
    id: 14,
    armenian: "«Մենք ուզում էինք նոր մեքենա գնել»",
    spanishClue: "Nosotros ____ comprar un coche nuevo.",
    verb: "QUERER (ուզենալ/ցանկանալ)",
    options: [
      { text: "queríamos", isCorrect: true },
      { text: "quisimos", isCorrect: false },
      { text: "querían", isCorrect: false }
    ],
    explanation: "Ցանկությունները անցյալում նկարագրվում են Pretérito Imperfecto-ով: -ER խմբի Nosotros վերջավորությունն է -íamos -> queríamos:"
  },
  {
    id: 15,
    armenian: "«Դուք (Ustedes) միշտ տեսնում էիք արևածագը սարերից»",
    spanishClue: "Ustedes ____ el amanecer desde las montañas.",
    verb: "VER (տեսնել)",
    options: [
      { text: "veían", isCorrect: true },
      { text: "vieron", isCorrect: false },
      { text: "veíais", isCorrect: false }
    ],
    explanation: "Ustedes-ի դեպքում VER անկանոն բայի ձևն է veían: Պահպանում է իր կազմության 'e'-ն և ստանում -ían վերջավորությունը:"
  }
];
