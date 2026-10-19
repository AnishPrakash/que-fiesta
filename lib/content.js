// ─────────────────────────────────────────────────────────────────────────────
//  ¡Qué Fiesta! — all chapter content lives here.
//
//  Spanish vocabulary markup:  [[palabra|English meaning]]
//    • Every chapter uses exactly 25 different Spanish words (checked by
//      `npm run check`). They become hover/tap tooltips in the text and fill
//      the 5 × 5 Lotería board of that chapter.
//    • Words from other languages get a third tag and are NOT counted:
//      |qu = Quechua, |va = Valencian, |na = Nahuatl.
//
//  Order = calendar order (February → November).
// ─────────────────────────────────────────────────────────────────────────────

export const team = [
  { name: 'Wasiq', fiesta: 'carnaval', alsoBuilt: 'Papel picado garland and cut-paper hero' },
  { name: 'Sravan', fiesta: 'fallas', alsoBuilt: 'La Rueda del Año — the festival calendar wheel' },
  { name: 'Mohit', fiesta: 'inti-raymi', alsoBuilt: 'La Gran Lotería — the quiz and leaderboard' },
  { name: 'Tanmay', fiesta: 'tomatina', alsoBuilt: 'Libro de visitas (guestbook) and the live tomato counter' },
  { name: 'Anish', fiesta: 'muertos', alsoBuilt: 'Backend API architecture and Vercel deployment' },
];

export const festivals = [
  // ───────────────────────────── 1; CARNAVAL ─────────────────────────────
  {
    id: 'carnaval',
    name: 'Carnaval de Barranquilla',
    nameEn: 'Barranquilla Carnival',
    place: 'Barranquilla, Colombia',
    country: 'Colombia',
    author: 'Wasiq',
    locale: 'es-CO',
    dateLabel: 'Sábado a martes antes del Miércoles de Ceniza',
    dateLabelEn: 'Saturday to Tuesday before Ash Wednesday',
    motto: { es: 'Quien lo vive es quien lo goza', en: 'Those who live it are those who enjoy it' },
    palette: { bg: '#FFC914', ink: '#1B1036', accent: '#E4002B', accent2: '#00965E', accent3: '#1F4FD8', soft: '#FFE27A' },
    interaction: { es: 'Haz clic para lanzar confeti', en: 'Click the stage to throw confetti — the Marimonda is watching you' },
    intro: `For four days before Ash Wednesday, Colombia's Caribbean port of Barranquilla stops working and starts dancing. Hundreds of thousands of people pour into the [[calle|street]], and the whole city turns into one enormous [[fiesta|party]].`,
    facts: [
      { k: 'Dónde', en: 'Where', v: 'Barranquilla, on the Caribbean coast of Colombia' },
      { k: 'Cuándo', en: 'When', v: 'Four days before Ash Wednesday (6–9 Feb 2027)' },
      { k: 'Desde', en: 'Since', v: '19th century; first Batalla de Flores in 1903' },
      { k: 'UNESCO', en: 'UNESCO', v: 'Masterpiece of Intangible Heritage, 2003' },
    ],
    sections: [
      {
        title: 'La historia', en: 'The story',
        body: `The [[carnaval|carnival]] arrived with Spanish colonists, but it was the African and Indigenous communities along the Magdalena River who gave it its drums, its masks and its sense of humour; every costume still mixes those three roots. In 1903, right after the Thousand Days' War, General Heriberto Vengoechea organised the first [[batalla|battle]] de [[flores|flowers]] — a parade that swapped bullets for petals to celebrate [[paz|peace]]. It still opens the carnival every Saturday. In 2003 UNESCO proclaimed the carnival a Masterpiece of the Oral and Intangible Heritage of Humanity.`,
      },
      {
        title: 'Cómo se vive', en: 'How it is lived',
        body: `Weeks before, at the Lectura del Bando, the carnival [[reina|queen]] reads the [[bando|decree]]: a comic official order telling every citizen to be happy, while the mayor hands her the keys of the city. Then come the four big days. Saturday is the Battle of Flowers. Sunday is the Gran Parada de Tradición, where around 300 folk [[comparsas|dance troupes]] march with no floats and no loudspeakers, only live music. Monday's Gran Parada de Fantasía mixes local rhythms with salsa and reggaeton. On Tuesday the city buries Joselito Carnaval, a character who "dies" of exhaustion after partying too hard. Men dressed as weeping [[viudas|widows]] follow his coffin — and everyone knows he will come back next year.`,
      },
      {
        title: 'Los personajes', en: 'The characters',
        body: `The best-loved [[disfraz|costume]] is the Marimonda: a cloth [[máscara|mask]] with a long trunk-like nose and floppy ears, invented by poor Barranquilleros to make fun of the rich and powerful. The Torito is a little [[toro|bull]] that charges at the crowd. In the Garabato dance, performers in bright skirts battle a figure of [[muerte|death]] — and [[vida|life]] always wins. The Congo dancers, in tall flowered hats, keep alive the memory of African ancestors brought to the Americas in chains.`,
      },
      {
        title: 'La música', en: 'The music',
        body: `Everything moves to [[cumbia|cumbia, Colombia's signature rhythm]], born from African [[tambores|drums]], Indigenous gaita flutes and Spanish verses. You also hear porro, puya and the frantic mapalé. Nobody watches from the side of the road; the only rule is to [[bailar|dance]].`,
      },
      {
        title: 'La comida', en: 'The food',
        body: `Between parades people refuel with a fried [[arepa|corn cake]] stuffed with a whole [[huevo|egg]], and with butifarra, a tiny local sausage sold by vendors who shout its name down the street. The Caribbean heat is brutal, so cold [[agua|water]] de [[coco|coconut]] and [[cerveza|beer]] disappear by the bucket.`,
      },
    ],
    didYouKnow: `Barranquilla also runs a children's carnival with its own child [[rey|king]] and queen, so the tradition is handed from one generation to the next. Locals describe the four days as pure [[alegría|joy]] — and the motto warns that you cannot understand it from a sofa.`,
    characters: [
      { name: 'Marimonda', en: 'Long nose, floppy ears, bright patchwork — mocks the powerful.' },
      { name: 'Torito', en: 'A little bull with horns that charges playfully at the crowd.' },
      { name: 'Garabato', en: 'A dance where life defeats death, with yellow, red and green skirts.' },
      { name: 'Congo', en: 'Tall flower turbans and painted faces honouring African roots.' },
    ],
    reflection: `Before this project I thought carnival meant Brazil. Researching Barranquilla showed me a celebration built by people who were enslaved and pushed aside, who used masks and jokes to laugh at the people in power. The Marimonda stayed with me most: a costume that is basically a protest you can dance in. Making the papel picado garland and the cut-paper title for our site made me notice how much craft goes into decorations that only last a few days. I felt that the motto is true even through a screen — you understand a fiesta by joining in, not by reading about it.`,
    sources: [
      { title: 'Barranquilla Carnival — Wikipedia', url: 'https://en.wikipedia.org/wiki/Barranquilla_Carnival' },
      { title: 'Batalla de Flores cumple 120 años — Radio Nacional de Colombia', url: 'https://radionacional.co/cultura/ferias-y-fiestas/carnaval-de-barranquilla-batalla-de-flores-cumple-120-anos' },
    ],
  },

  // ───────────────────────────── 2; FALLAS ─────────────────────────────
  {
    id: 'fallas',
    name: 'Las Fallas',
    nameEn: 'The Fallas of Valencia',
    place: 'Valencia, España',
    country: 'España',
    author: 'Sravan',
    locale: 'es-ES',
    dateLabel: 'Del 15 al 19 de marzo',
    dateLabelEn: '15–19 March',
    motto: { es: 'Del cartón a la ceniza en una noche', en: 'From cardboard to ashes in one night' },
    palette: { bg: '#101A3F', ink: '#FFF1DE', accent: '#FF5A1F', accent2: '#FFC23A', accent3: '#E9DCCB', soft: '#1C2A5E' },
    interaction: { es: 'Pulsa para la cremà', en: 'Press the button to burn the falla — then build it again' },
    intro: `Every March, Valencia spends a whole year building giant satirical sculptures — and then sets every one of them on [[fuego|fire]]. Las Fallas is part art exhibition, part street party and part controlled explosion.`,
    facts: [
      { k: 'Dónde', en: 'Where', v: 'Valencia, on the Mediterranean coast of Spain' },
      { k: 'Cuándo', en: 'When', v: '15–19 March; mascletàs daily from 1 March' },
      { k: 'Por qué', en: 'Why', v: 'Feast of San José, patron of carpenters (19 March)' },
      { k: 'UNESCO', en: 'UNESCO', v: 'Intangible Cultural Heritage, November 2016' },
    ],
    sections: [
      {
        title: 'La historia', en: 'The story',
        body: `The most popular theory goes back to medieval [[carpinteros|carpenters]]. Through the winter they worked by candlelight, hanging their candles on wooden stands called [[parots|wooden candle stands|va]]. When [[primavera|spring]] arrived they no longer needed them, so on the eve of San José — Saint Joseph, patron of carpenters — they burned the stands together with old scraps of [[madera|wood]]. Neighbours began dressing the bonfires up as people they wanted to mock, and a tradition of satire was born. UNESCO added Las Fallas to its list of Intangible Cultural Heritage in November 2016.`,
      },
      {
        title: 'Cómo se vive', en: 'How it is lived',
        body: `From 1 to 19 March, at exactly 2 p.m., the [[mascletà|daytime firecracker show|va]] shakes the square in front of the [[ayuntamiento|city hall]]. It is not something to look at but a rhythm of [[pólvora|gunpowder]] you feel in your chest, the [[ruido|noise]] building to an earthquake of a finale. On the night of 15 March comes the [[plantà|setting-up of the fallas|va]], when hundreds of monuments appear overnight. On 17 and 18 March thousands of falleros in traditional [[traje|dress]] carry [[flores|flowers]] to the statue of the Virgin of the Forsaken, and the blooms are woven into a giant [[manto|cloak]] around her. Everything leads to the [[noche|night]] of 19 March.`,
      },
      {
        title: 'Los ninots', en: 'The figures',
        body: `Each falla is paid for by a neighbourhood association, a casal faller — a [[barrio|neighbourhood]] club that raises money all year. Professional [[artistas|artists]] spend months shaping the [[ninots|figures, puppets|va]], once from [[cartón|cardboard]] and papier-mâché, today from polystyrene and cork carved with hot saws; the biggest monuments rise over 30 metres. Every scene is a [[broma|joke]]: politicians, celebrities, football and the year's news all get roasted. Only one figure escapes the flames — the [[indultat|pardoned (ninot)|va]], chosen by public vote and kept in the city's [[museo|museum]] of the Fallas.`,
      },
      {
        title: 'La cremà', en: 'The burning',
        body: `On the final night [[bomberos|firefighters]] soak the façades of nearby buildings, crowds pack every [[plaza|square]], and the children's fallas burn first. Then, one by one, the big monuments go up. The giant one in front of City Hall burns last, around midnight. Months of work turn to [[cenizas|ashes]] and [[humo|smoke]] in minutes. Valencians say it isn't sad: it is how the city lets go of the old year and makes room for spring.`,
      },
      {
        title: 'La comida', en: 'The food',
        body: `Fallas runs on sugar and rice. Street stalls fry [[buñuelos|fritters]] made with [[calabaza|pumpkin]] dough, dunked in thick hot chocolate. On Sundays the falleros cook paella in the street — Valencia's most famous dish, born in the rice fields of the Albufera lagoon and made with [[arroz|rice]], [[conejo|rabbit]] and [[pollo|chicken]].`,
      },
    ],
    didYouKnow: `The language of the Fallas is Valencian, spoken alongside Spanish in the region — which is why you read cremà (Spanish: quema) and plantà on every poster. The loudest mascletàs reach around 120 decibels, about as loud as a thunderclap overhead.`,
    reflection: `What surprised me most is that people spend a whole year and a lot of money building something they know will be burned in one night. At first it sounded like a waste. The more I read, the more it felt like a lesson: the joy is in making it together as a barrio, not in keeping it. While building the calendar wheel and the cremà animation I kept picturing the falleros watching their work disappear. I also learned that Spain is not just one language — Valencian is everywhere in this festival — and I liked how a funny sculpture can say things about politics that would be hard to say out loud.`,
    sources: [
      { title: 'Fallas — Wikipedia', url: 'https://en.wikipedia.org/wiki/Fallas' },
      { title: 'Fallas de San José — Spain.info (official tourism site of Spain)', url: 'https://www.spain.info/en/calendar/fallas-san-jose/' },
    ],
  },

  // ───────────────────────────── 3; INTI RAYMI ─────────────────────────────
  {
    id: 'inti-raymi',
    name: 'Inti Raymi',
    nameEn: 'Festival of the Sun',
    place: 'Cusco, Perú',
    country: 'Perú',
    author: 'Mohit',
    locale: 'es-PE',
    dateLabel: '24 de junio',
    dateLabelEn: '24 June',
    motto: { es: 'El día en que vuelve el sol', en: 'The day the sun comes back' },
    palette: { bg: '#8C1531', ink: '#FFF2D8', accent: '#F7B500', accent2: '#2A9D8F', accent3: '#F26419', soft: '#A8213F' },
    interaction: { es: 'Desplázate para el amanecer', en: 'Scroll through this chapter and the sun rises over the mountains' },
    intro: `On 24 June, in the old Inca capital of Cusco, thousands gather to welcome back the [[sol|sun]] as it rises over the [[montañas|mountains]]. [[Inti|sun|qu]] [[Raymi|festival|qu]] — the Festival of the Sun — is the most important celebration of the Andes.`,
    facts: [
      { k: 'Dónde', en: 'Where', v: 'Cusco, Peru — Qorikancha, Plaza de Armas, Sacsayhuamán' },
      { k: 'Cuándo', en: 'When', v: '24 June, near the southern winter solstice' },
      { k: 'Desde', en: 'Since', v: 'Inca era; revived as a reenactment in 1944' },
      { k: 'Elenco', en: 'Cast', v: 'More than 800 performers in traditional dress' },
    ],
    sections: [
      {
        title: 'La historia', en: 'The story',
        body: `For the Incas, the sun god Inti was the ancestor of their rulers. Around the June [[solsticio|solstice]] — the shortest day of the southern [[invierno|winter]] — the sun seemed to be moving away from the [[Tierra|Earth]], so the Incas held a great ceremony to call it back and give thanks for the [[cosecha|harvest]]. According to the chronicler Inca Garcilaso de la Vega, the festival was created by the ruler Pachacútec in the fifteenth century, and it marked the start of a new [[año|year]]. After the Spanish [[conquista|conquest]], colonial authorities and the Church banned it; the last celebration with an Inca emperor present was in 1535.`,
      },
      {
        title: 'El renacimiento', en: 'The revival',
        body: `For four centuries the festival survived mostly in books. In 1944 the Cusco writer and teacher Faustino Espinoza Navarro staged a reconstruction based on Garcilaso's Comentarios Reales, performed by local Indigenous [[actores|actors]]. It has been held every year since, and today more than 800 performers take part, in costumes woven in the [[colores|colours]] of the [[Tawantinsuyu|the Inca empire, "the four regions together"|qu]]. Much of the script is spoken in Quechua, the language of the Incas, which millions of Peruvians still speak today.`,
      },
      {
        title: 'Los tres escenarios', en: 'The three stages',
        body: `The ceremony moves through the city in three acts. It begins in the morning at the [[Qorikancha|"golden enclosure", the Temple of the Sun|qu]], whose [[templo|temple]] walls were once covered in [[oro|gold]]; the actor playing the [[Sapa Inca|"the only Inca", the emperor|qu]] greets the sun. The procession then crosses the main [[plaza|square]], where [[hojas|leaves]] of coca are exchanged. Finally the crowd climbs to Sacsayhuamán, a [[fortaleza|fortress]] of colossal [[piedra|stone]] blocks above the city. The Inca arrives on a golden litter and offers [[chicha|corn beer]] to the Sun and to [[Pachamama|Mother Earth|qu]]. A llama sacrifice is acted out — no animal is harmed today — and priests read the omens for the year ahead.`,
      },
      {
        title: 'El fuego sagrado', en: 'The sacred fire',
        body: `Garcilaso wrote that priests lit the sacred [[fuego|fire]] by catching sunlight in a concave bracelet of polished gold, used like a [[espejo|mirror]]. That new fire was kept burning in the temple for the rest of the year. The reenactment repeats the gesture, and as the flame appears, [[flautas|flutes]] and [[tambores|drums]] fill the [[cielo|sky]].`,
      },
      {
        title: 'La comida', en: 'The food',
        body: `After the ceremony, Cusco eats. Families share [[maíz|corn]] in every form — boiled choclo, toasted kancha, sweet chicha morada made from purple corn — along with roasted guinea pig, the festive dish of the Andes, and [[papas|potatoes]] from a country that grows more than 3,000 varieties. Everything is shared around one big [[mesa|table]].`,
      },
    ],
    didYouKnow: `Inti Raymi is not only a show in Cusco: Andean communities in Ecuador and Bolivia also celebrate the June solstice as a living festival. And between 1985 and 1991, Peru's national currency was called the inti.`,
    reflection: `I chose Inti Raymi because I wanted to know how a festival that was banned for four hundred years could come back. It survived because someone wrote it down — Garcilaso's chronicles became the script for the 1944 revival. That made me think about how fragile a culture is when one power tries to erase another. I was also surprised that the Spanish-speaking world includes millions of people whose first language is Quechua. Writing the Lotería quiz made me reread all five chapters to make fair questions, so I probably learned more vocabulary than anyone in the group. Watching the sun rise in our scroll animation, I understood why an empire would celebrate the day the light starts to return.`,
    sources: [
      { title: 'Inti Raymi — Wikipedia', url: 'https://en.wikipedia.org/wiki/Inti_Raymi' },
      { title: 'La verdadera historia del Inti Raymi — Infobae (2026)', url: 'https://www.infobae.com/peru/2026/06/17/la-verdadera-historia-del-inti-raymi-como-era-la-ceremonia-en-tiempos-de-los-incas/' },
    ],
  },

  // ───────────────────────────── 4; LA TOMATINA ─────────────────────────────
  {
    id: 'tomatina',
    name: 'La Tomatina',
    nameEn: 'The Tomato Fight',
    place: 'Buñol, España',
    country: 'España',
    author: 'Tanmay',
    locale: 'es-ES',
    dateLabel: 'Último miércoles de agosto',
    dateLabelEn: 'Last Wednesday of August',
    motto: { es: 'Nadie sale limpio de Buñol', en: 'Nobody leaves Buñol clean' },
    palette: { bg: '#FBFBF7', ink: '#2B0B08', accent: '#E3271B', accent2: '#2F8F3A', accent3: '#1D5FBF', soft: '#FFE1DC' },
    interaction: { es: 'Haz clic para lanzar tomates', en: 'Click anywhere on the wall to throw tomatoes — every visitor adds to the same counter' },
    intro: `On the last Wednesday of August, the small town of Buñol, near Valencia, hosts the world's biggest food fight. For one hour, about 20,000 people throw well over 100 tonnes of ripe [[tomates|tomatoes]] at each other until the streets run red.`,
    facts: [
      { k: 'Dónde', en: 'Where', v: 'Buñol, a town of about 9,000 people near Valencia' },
      { k: 'Cuándo', en: 'When', v: 'Last Wednesday of August, for one hour' },
      { k: 'Desde', en: 'Since', v: '1945; official again after the 1957 protest' },
      { k: 'Cifras', en: 'Numbers', v: '~20,000 ticket holders; up to ~145 tonnes of tomatoes' },
    ],
    sections: [
      {
        title: 'La historia', en: 'The story',
        body: `It started by accident in 1945. During a parade of [[gigantes|giants]] and [[cabezudos|big-headed figures]] — the huge papier-mâché puppets of Spanish street festivals — a scuffle broke out in the [[desfile|parade]], and young people grabbed tomatoes from a vegetable stall and began to throw. The next year they came back with their own. Franco's regime banned the fight in the early 1950s, and in 1957 the town protested with a mock [[entierro|burial]]: a giant tomato carried in a [[ataúd|coffin]] through the streets while a band played a funeral march. The protest worked, and the fight became an official part of the [[pueblo|town]]'s annual [[fiesta|festival]].`,
      },
      {
        title: 'Cómo se vive', en: 'How it is lived',
        body: `The morning begins with the palo jabón: a tall [[palo|pole]] greased with [[jabón|soap]], with a Spanish [[jamón|ham]] tied to the top. Everyone tries to climb it, and the battle starts once the ham comes down. [[Camiones|Trucks]] roll into the narrow main street, tipping tomatoes into the crowd. The fight lasts about one [[hora|hour]]; when the second signal sounds, everybody must stop. Then [[bomberos|firefighters]] wash the streets with [[mangueras|hoses]], and the acid in the tomatoes leaves the cobblestones cleaner than before.`,
      },
      {
        title: 'Las reglas', en: 'The rules',
        body: `La Tomatina has real rules. Squash every tomato before you throw it so it doesn't hurt. Don't bring bottles or anything hard. Don't tear anyone's [[camiseta|T-shirt]] — though every shirt ends up pink anyway. Wear [[gafas|goggles]], because tomato juice stings, and step aside when the trucks pass. Shopkeepers cover their [[ventanas|windows]] with plastic sheets, and some [[vecinos|neighbours]] rent out their balconies to people who would rather watch.`,
      },
      {
        title: 'Los números', en: 'The numbers',
        body: `Since 2013 the fight has been limited to 20,000 ticket holders, because crowds had grown so large that they overwhelmed a town of only about 9,000 [[habitantes|inhabitants]]. A 2015 estimate counted almost 145 tonnes of tomatoes thrown in one hour. In 2002 the festival was declared a Fiesta of International Tourist Interest, and it has inspired copies from Sutamarchán in Colombia to Reno in the United States.`,
      },
      {
        title: 'La comida', en: 'The food',
        body: `In the days before the battle, Buñol holds a paella contest, with pans cooked over [[leña|firewood]] near the town square. And the most fitting meal afterwards is [[gazpacho|cold tomato soup]], the chilled Andalusian dish of tomato, [[pepino|cucumber]], [[pan|bread]] and olive [[aceite|oil]].`,
      },
    ],
    didYouKnow: `Even though you spend an hour throwing fruit at total strangers, the mood is friendly. The unofficial motto says nobody leaves Buñol clean — and nobody leaves angry.`,
    reflection: `I picked La Tomatina because it sounded like the most fun festival in the world, and it is — but I didn't expect it to have a history of protest. The mock burial of the tomato in 1957 showed me that the people of Buñol fought to keep their fiesta when the government said no. I also had mixed feelings about throwing away so much food, and that made me read more about how the event is organised. Coding the tomato-throwing wall and the live counter that every visitor shares was my favourite part; it felt like a tiny online Buñol. I learned that a festival doesn't need to be ancient or religious to become part of who a town is.`,
    sources: [
      { title: 'La Tomatina — Wikipedia', url: 'https://en.wikipedia.org/wiki/La_Tomatina' },
      { title: 'Thousands join Spain’s La Tomatina — Al Jazeera (2026)', url: 'https://www.aljazeera.com/amp/gallery/2026/8/26/photos-thousands-join-spains-la-tomatina-festival-for-epic-tomato-battle' },
    ],
  },

  // ───────────────────────────── 5; DÍA DE MUERTOS ─────────────────────────────
  {
    id: 'muertos',
    name: 'Día de Muertos',
    nameEn: 'Day of the Dead',
    place: 'México',
    country: 'México',
    author: 'Anish',
    locale: 'es-MX',
    dateLabel: '1 y 2 de noviembre',
    dateLabelEn: '1–2 November',
    motto: { es: 'Nadie muere mientras se le recuerde', en: 'No one is truly gone while they are remembered' },
    palette: { bg: '#230A35', ink: '#FFEFDF', accent: '#FF9F1C', accent2: '#FF2E88', accent3: '#22C3B5', soft: '#3A1356' },
    interaction: { es: 'Enciende las velas de la ofrenda', en: 'Light the candles on the ofrenda — the marigold petals will show the way' },
    intro: `On 1 and 2 November, Mexican families believe the souls of their dead come home for a night of reunion. Death is not hidden or feared: it is welcomed with [[flores|flowers]], food and [[música|music]]. It is a [[fiesta|celebration]] of memory, not a funeral.`,
    facts: [
      { k: 'Dónde', en: 'Where', v: 'All of Mexico, and Mexican communities abroad' },
      { k: 'Cuándo', en: 'When', v: '1 Nov (children); 2 Nov (adults)' },
      { k: 'Raíces', en: 'Roots', v: 'Mesoamerican ancestor rites + Catholic All Souls' },
      { k: 'UNESCO', en: 'UNESCO', v: 'Intangible Cultural Heritage, 2008' },
    ],
    sections: [
      {
        title: 'La historia', en: 'The story',
        body: `The Mexica (Aztecs) and other peoples of Mesoamerica honoured their ancestors for centuries, in festivals connected to Mictecacihuatl, the Lady of the Dead. When the Spanish arrived, those traditions merged with the Catholic days of All Saints and All Souls. The result is uniquely Mexican: 1 November belongs to the [[niños|children]] who have died — the [[angelitos|little angels]] — and 2 November to the adults. In 2008 UNESCO inscribed the "Indigenous festivity dedicated to the dead" on its list of the Intangible Cultural Heritage of Humanity.`,
      },
      {
        title: 'La ofrenda', en: 'The altar',
        body: `At the heart of the celebration is the [[ofrenda|altar of offerings]], built at home in tiers, and every object on it has a job. Photos of the dead preside over everything. [[Velas|Candles]] light the way home. Orange [[cempasúchil|Mexican marigold (from Nahuatl, "twenty flowers")]] guides the souls with its colour and scent, often scattered as a trail of petals from the front door. A glass of [[agua|water]] quenches their thirst after the long journey, [[sal|salt]] purifies, and [[copal|resin incense]] cleans the air. Then comes their favourite [[comida|food]]: [[pan|bread]] de muerto with crossed "bones" on top, sugar [[calaveras|skulls]] with names on their foreheads, and cut [[papel|paper]] [[picado|perforated]] fluttering above — its holes stand for the wind, and for how fragile [[vida|life]] is.`,
      },
      {
        title: 'Cómo se vive', en: 'How it is lived',
        body: `The whole [[familia|family]] goes to the [[cementerio|cemetery]] to clean and decorate the [[tumbas|graves]], and many stay all [[noche|night]], eating, singing and telling stories by candlelight. On Lake Pátzcuaro in Michoacán, families from the island of Janitzio cross the water in boats lit by candles. People also write calaveras literarias — funny rhyming [[versos|verses]] that imagine the living, politicians included, being carried off by death. In Mexico City a giant parade has filled the streets since 2016, inspired by the opening scene of the James Bond film Spectre.`,
      },
      {
        title: 'La Catrina', en: 'The elegant skeleton',
        body: `The skeleton in a feathered hat began as a satirical etching by the printmaker José Guadalupe Posada in the early 1910s, mocking Mexicans who copied European high society. Posada called her La Calavera Garbancera; the painter Diego Rivera later named her Catrina, "the elegant lady", and placed her at the centre of his 1947 mural Dream of a Sunday Afternoon in the Alameda Central. Her message: under the fancy clothes, we are all [[huesos|bones]], and [[muerte|death]] treats rich and poor the same.`,
      },
      {
        title: 'Los guías', en: 'The guides',
        body: `In Mexica belief, the souls of the dead had to cross the rivers of Mictlān, the underworld, and a [[perro|dog]] helped them: the [[xoloitzcuintle|Mexico's ancient hairless dog|na]]. Today xolos and colourful alebrijes — fantastical papier-mâché creatures first made by the artist Pedro Linares in the 1930s — appear on altars and in parades as spirit guides.`,
      },
    ],
    didYouKnow: `Día de Muertos is not "Mexican Halloween". Halloween plays with fear; Día de Muertos is about love and memory, and families actually look forward to it all year.`,
    reflection: `I always thought of death as something families avoid talking about. Día de Muertos showed me another way: Mexican families talk to their dead, cook their favourite dishes and even joke about them. Researching the ofrenda, I liked that every object has a reason — water for thirst, salt to purify, marigolds to show the path home. It reminded me that many cultures, including ours in India, remember their ancestors with photos, lamps and food, so the festival felt less foreign than I expected. Building the interactive ofrenda, where visitors light the candles themselves, was the part I enjoyed most, and designing the backend for the whole site taught me how five separate chapters could share one set of APIs.`,
    sources: [
      { title: 'Indigenous festivity dedicated to the dead — UNESCO', url: 'https://ich.unesco.org/en/lists?RL=00054' },
      { title: 'Day of the Dead — Wikipedia', url: 'https://en.wikipedia.org/wiki/Day_of_the_Dead' },
      { title: 'La Calavera Catrina — Wikipedia', url: 'https://en.wikipedia.org/wiki/La_Calavera_Catrina' },
    ],
  },
];

// ─────────────────────── TEAM POSTCARDS (guestbook seed) ───────────────────────
// Shown on the guestbook wall until real visitors start writing.
export const teamPostcards = [
  { name: 'Anish', fiesta: 'muertos', message: 'El Día de Muertos me enseñó que recordar también es una forma de amar.', at: '2026-10-17T10:00:00Z' },
  { name: 'Tanmay', fiesta: 'tomatina', message: '¡Voy a Buñol con mis amigos! Necesito gafas, una camiseta vieja y mucha energía.', at: '2026-10-16T15:30:00Z' },
  { name: 'Mohit', fiesta: 'inti-raymi', message: 'Me gustaría ver el amanecer del 24 de junio en Sacsayhuamán. ¡Viva el sol!', at: '2026-10-15T08:10:00Z' },
  { name: 'Sravan', fiesta: 'fallas', message: 'Mi sueño es ver la cremà en Valencia y después comer buñuelos con chocolate.', at: '2026-10-14T19:45:00Z' },
  { name: 'Wasiq', fiesta: 'carnaval', message: 'Quiero bailar cumbia en Barranquilla con una máscara de marimonda. ¡Quien lo vive es quien lo goza!', at: '2026-10-13T12:20:00Z' },
];

// ─────────────────────────────── QUIZ POOL ───────────────────────────────
// options[0] is always the correct answer; the API shuffles before sending.
export const quiz = [
  // Carnaval (Wasiq)
  { id: 'c1', fiesta: 'carnaval', card: 'La Máscara', question: 'What does «máscara» mean?', options: ['Mask', 'Costume', 'Drum', 'Queen'], explain: 'Máscara = mask. The Marimonda wears a cloth máscara with a long nose.' },
  { id: 'c2', fiesta: 'carnaval', card: 'Las Flores', question: 'The first Batalla de Flores (1903) celebrated…', options: ["The end of the Thousand Days' War", 'Colombian independence', 'A royal wedding', 'A new mayor'], explain: 'General Vengoechea organised it to celebrate peace after the war.' },
  { id: 'c3', fiesta: 'carnaval', card: 'La Reina', question: 'At the Lectura del Bando, who reads the decree ordering everyone to be happy?', options: ['The carnival queen', 'The president of Colombia', 'A priest', 'Joselito Carnaval'], explain: 'La reina del carnaval reads el bando and receives the keys of the city.' },
  { id: 'c4', fiesta: 'carnaval', card: 'La Muerte', question: 'In the Garabato dance, what defeats «la muerte»?', options: ['La vida — life', 'El sol — the sun', 'El toro — the bull', 'El agua — water'], explain: 'The Garabato is a battle between life and death, and life always wins.' },
  // Fallas (Sravan)
  { id: 'f1', fiesta: 'fallas', card: 'Las Cenizas', question: 'What are «cenizas»?', options: ['Ashes', 'Fireworks', 'Flowers', 'Candles'], explain: 'Cenizas = ashes — all that is left after la cremà.' },
  { id: 'f2', fiesta: 'fallas', card: 'El Ninot', question: 'Which figure escapes the flames each year?', options: ['The ninot indultat, chosen by public vote', 'The tallest falla', 'The mayor’s statue', 'The oldest ninot'], explain: 'The pardoned ninot is saved and displayed in the Fallas museum.' },
  { id: 'f3', fiesta: 'fallas', card: 'El Carpintero', question: 'Las Fallas honours San José, patron saint of…', options: ['Carpenters', 'Fishermen', 'Firefighters', 'Musicians'], explain: 'Carpinteros burned their old wooden candle stands on his feast day.' },
  { id: 'f4', fiesta: 'fallas', card: 'La Pólvora', question: 'When does the daily mascletà explode outside the ayuntamiento?', options: ['2 p.m.', 'Midnight', 'Sunrise', '6 p.m.'], explain: 'Every day from 1 to 19 March, at 2 p.m. sharp.' },
  // Inti Raymi (Mohit)
  { id: 'i1', fiesta: 'inti-raymi', card: 'El Sol', question: 'In Quechua, «Inti» means…', options: ['Sun', 'Festival', 'Gold', 'Mountain'], explain: 'Inti = sun, Raymi = festival.' },
  { id: 'i2', fiesta: 'inti-raymi', card: 'La Fortaleza', question: 'Where is the main ceremony of Inti Raymi held?', options: ['Sacsayhuamán', 'Machu Picchu', 'Lake Titicaca', 'Lima Cathedral'], explain: 'The finale is at the stone fortaleza of Sacsayhuamán above Cusco.' },
  { id: 'i3', fiesta: 'inti-raymi', card: 'El Espejo', question: 'What does «espejo» mean?', options: ['Mirror', 'Sky', 'Temple', 'Flute'], explain: 'Priests used a gold piece like an espejo to light the sacred fire.' },
  { id: 'i4', fiesta: 'inti-raymi', card: 'El Invierno', question: 'Why is Inti Raymi held in late June?', options: ['It is near the southern winter solstice', 'It is Peru’s independence day', 'It is the spring equinox', 'It is the harvest moon'], explain: 'In the southern hemisphere June brings el solsticio de invierno, the shortest day.' },
  // Tomatina (Tanmay)
  { id: 't1', fiesta: 'tomatina', card: 'El Tomate', question: 'When is La Tomatina held?', options: ['The last Wednesday of August', '1 January', 'Easter Sunday', '19 March'], explain: 'Every year on the last miércoles of agosto, in Buñol.' },
  { id: 't2', fiesta: 'tomatina', card: 'El Jamón', question: 'What hangs at the top of the palo jabón?', options: ['A ham', 'A tomato', 'A flag', 'A bell'], explain: 'Climbers try to grab the jamón from the soapy pole.' },
  { id: 't3', fiesta: 'tomatina', card: 'La Camiseta', question: 'What is a «camiseta»?', options: ['A T-shirt', 'Goggles', 'A window', 'A hose'], explain: 'Camiseta = T-shirt. Rule: never rip anyone’s camiseta.' },
  { id: 't4', fiesta: 'tomatina', card: 'El Ataúd', question: 'How did Buñol protest the ban in 1957?', options: ['A mock funeral for a giant tomato', 'A hunger strike', 'A football match', 'A paella contest'], explain: 'The “entierro del tomate” carried a tomato in an ataúd (coffin).' },
  // Día de Muertos (Anish)
  { id: 'm1', fiesta: 'muertos', card: 'La Calavera', question: 'What are «calaveras»?', options: ['Skulls', 'Candles', 'Marigolds', 'Graves'], explain: 'Calaveras de azúcar are sugar skulls with names on their foreheads.' },
  { id: 'm2', fiesta: 'muertos', card: 'La Flor', question: 'What is the orange marigold on the ofrenda called?', options: ['Cempasúchil', 'Copal', 'Alebrije', 'Xoloitzcuintle'], explain: 'Its colour and scent guide the souls home.' },
  { id: 'm3', fiesta: 'muertos', card: 'La Catrina', question: 'Who made the etching that became La Catrina?', options: ['José Guadalupe Posada', 'Diego Rivera', 'Frida Kahlo', 'Pedro Linares'], explain: 'Posada drew her; Diego Rivera later gave her the name Catrina.' },
  { id: 'm4', fiesta: 'muertos', card: 'El Agua', question: 'Why is there a glass of agua on the ofrenda?', options: ['To quench the souls’ thirst after their journey', 'To put out the candles', 'To water the flowers', 'For good luck with money'], explain: 'Agua for thirst, sal to purify, velas to light the way.' },
];
