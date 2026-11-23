import type { PromptItem, WeekContent } from "../types.ts"
import { choiceSeed, correctPosition } from "../../lib/shuffle.ts"
import { createWordSearch, seedFromText } from "../../lib/wordSearch.ts"

function ask(
  prompt: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): PromptItem {
  if (options.length < 2 || options.length > 4) {
    throw new Error(`A question needs 2 to 4 choices: ${prompt}`)
  }
  if (correctIndex < 0 || correctIndex >= options.length) {
    throw new Error(`The correct choice is missing: ${prompt}`)
  }
  const ids = ["a", "b", "c", "d"]
  return {
    prompt,
    choices: options.map((label, index) => ({ id: ids[index] ?? String(index), label })),
    correctId: ids[correctIndex] ?? "a",
    explanation,
  }
}

export const makabansaWeeks: WeekContent[] = [
  {
    id: "w14",
    title: "Katangian ng mga Pilipino",
    badgeName: "Makabayan",
    recap: [
      {
        speaker: "ana",
        text: "Ako si Ana. Ngayong linggo, titingnan natin kung paano maging makabayan.",
      },
      {
        speaker: "ben",
        text: "Ang Lupang Hinirang ay awit ng pag-ibig sa bayan. Mga Pilipino ang umaawit nito.",
      },
      {
        speaker: "ana",
        text: "Ang linyang “Ang mamatay nang dahil sa 'yo” ay nangangahulugang handa tayong magmahal kahit buhay ang kapalit.",
      },
      {
        speaker: "ben",
        text: "Binabanggit sa awitin ang bituin at araw sa watawat.",
      },
      {
        speaker: "ana",
        text: "Ang makabayan ay taos-pusong nagmamahal sa bansa, sumusuporta rito, at nagpapahalaga sa kultura at kasaysayan.",
      },
      {
        speaker: "ben",
        text: "May mga bayani, may lingkod-bayan gaya ng guro at doktor, at may ordinaryong taong tumutulong sa komunidad.",
      },
      {
        speaker: "ana",
        text: "Simpleng paraan: tangkilikin ang gawa ng Pilipino, igalang ang watawat, at tumulong sa bahay.",
      },
    ],
    riddles: [
      ask(
        "Ako ay awitin tuwing flag ceremony. Pag-ibig sa bayan ang tema ko. Ano ako?",
        ["Lupang Hinirang", "Awit pampasko", "Lullaby"],
        0,
        "Ang Lupang Hinirang ang pambansang awit.",
      ),
      ask(
        "Taos-puso akong nagmamahal sa bansa. Ano ang tawag sa akin?",
        ["Makabayan", "Tamad", "Bisita"],
        0,
        "Ang makabayan ay nagmamahal at sumusuporta sa bayan.",
      ),
      ask(
        "Nagbuwis ako ng buhay para sa kalayaan. Sino ako?",
        ["Turista", "Bayani", "Manlalaro"],
        1,
        "Ang mga bayani ay nagbuwis ng buhay para sa kalayaan.",
      ),
      ask(
        "Guro, doktor, pulis, at sundalo. Ano ang tawag sa aming gawain?",
        ["Lingkod-bayan", "Pista", "Laro"],
        0,
        "Ang lingkod-bayan ay nagsisilbi sa kapwa.",
      ),
    ],
    flashcards: [
      {
        front: "💚 Pag-ibig sa bayan",
        name: "Makabayan",
        place: "Pilipinas",
        fact: "Taos-pusong nagmamahal at sumusuporta sa bansa.",
      },
      {
        front: "🎵 Pambansang awit",
        name: "Lupang Hinirang",
        place: "Buong bansa",
        fact: "Simbolo ito ng pagmamahal sa bayan, hindi simpleng awitin lang.",
      },
      {
        front: "⭐ Bituin at araw",
        name: "Watawat",
        place: "Paaralan at tahanan",
        fact: "Iginagalang ito kapag umaawit ng Lupang Hinirang.",
      },
      {
        front: "🦸 Kalayaan",
        name: "Bayani",
        place: "Kasaysayan",
        fact: "Nagbuwis sila ng buhay para sa kalayaan ng bansa.",
      },
      {
        front: "🍎 Guro at doktor",
        name: "Lingkod-bayan",
        place: "Komunidad",
        fact: "Nagsisilbi sila araw-araw, kasama ang pulis at sundalo.",
      },
    ],
    matching: [
      { left: "Lupang Hinirang", right: "Pambansang awit" },
      { left: "Bituin at araw", right: "Nasa watawat" },
      { left: "Bayani", right: "Nagbuwis ng buhay" },
      { left: "Guro", right: "Lingkod-bayan" },
      { left: "Kakanin", right: "Produktong Pilipino" },
    ],
    wordSearch: { words: ["Makabayan", "Bayani", "Watawat", "Awitin", "Guro"] },
    quiz: [
      ask(
        "Ano ang pangunahing tema ng Lupang Hinirang?",
        ["Pag-ibig sa pamilya", "Pag-ibig sa bayan", "Pag-ibig sa laro"],
        1,
        "Pag-ibig sa bayan ang tema ng pambansang awit.",
      ),
      ask(
        "Sino ang umaawit ng Lupang Hinirang?",
        ["Mga Pilipino", "Mga Amerikano", "Mga turista"],
        0,
        "Mga Pilipino ang umaawit nito.",
      ),
      ask(
        "Ano ang ibig sabihin ng “Ang mamatay nang dahil sa 'yo”?",
        ["Ayaw awitin", "Tulog na", "Kahit buhay ang kapalit"],
        2,
        "Ibig sabihin nito ay handang magmahal kahit buhay ang kapalit.",
      ),
      ask(
        "Anong simbolo ang binabanggit sa awitin?",
        ["Bulaklak at ilog", "Bituin at araw sa watawat", "Bundok at ulap"],
        1,
        "Ang bituin at araw ay nasa watawat.",
      ),
      ask(
        "Bakit mahalagang igalang ang Lupang Hinirang?",
        ["Simbolo ito ng pagmamahal sa bayan", "Simpleng awitin lang ito", "Pampagising lang ito"],
        0,
        "Simbolo ito ng pagmamahal sa bayan.",
      ),
      ask(
        "Ano ang isang makabayan?",
        ["Ayaw sa sariling bayan", "Taos-pusong nagmamahal sa bansa", "Laging galit"],
        1,
        "Ang makabayan ay taos-pusong nagmamahal sa bansa.",
      ),
      ask(
        "Sino ang nagbuwis ng buhay para sa kalayaan?",
        ["Mga bisita", "Mga manlalaro", "Mga bayani"],
        2,
        "Ang mga bayani ay nagbuwis ng buhay para sa kalayaan.",
      ),
      ask(
        "Alin ang lingkod-bayan?",
        ["Guro", "Manonood lang", "Dayuhan"],
        0,
        "Ang guro ay lingkod-bayan, gaya ng doktor, pulis, at sundalo.",
      ),
      ask(
        "Alin ang simpleng gawa ng isang mamamayan?",
        ["Pagtapon ng basura kahit saan", "Pagpapanatiling malinis ng paligid", "Paninira ng gamit"],
        1,
        "Ang pagpapanatiling malinis at pagtulong ay gawa ng mamamayang makabayan.",
      ),
      ask(
        "Alin ang pagtangkilik sa sariling bayan?",
        ["Laging bumili ng galing sa ibang bansa", "Itapon ang gawang lokal", "Pumili ng produktong Pilipino"],
        2,
        "Ang pagbili ng produktong Pilipino ay pagmamahal sa bayan.",
      ),
    ],
  },
  {
    id: "w15",
    title: "Katangian ng Mamamayang Pilipino",
    badgeName: "Mamamayan",
    recap: [
      {
        speaker: "ben",
        text: "Paladasal tayong mga Pilipino. Bahagi ng buhay ang pananampalataya, anuman ang relihiyon.",
      },
      {
        speaker: "ana",
        text: "Magalang tayo. May mano, po at opo, at pantawag gaya ng ate, kuya, lolo, at lola.",
      },
      {
        speaker: "ben",
        text: "Bayanihan ang pagtutulungan. Magkakapitbahay na naglilinis at nagtutulungan sa gawain.",
      },
      {
        speaker: "ana",
        text: "Malugod nating tinatanggap ang bisita. Nililinis ang bahay at masayang pinapapasok.",
      },
      {
        speaker: "ben",
        text: "Mahalaga ang pamilya: sabay kumain, sabay magdasal, at dalawin ang magulang.",
      },
      {
        speaker: "ana",
        text: "Maawain at mapagbigay tayo. Tumutulong, nagbabahagi ng pagkain, at marunong magpatawad.",
      },
    ],
    riddles: [
      ask(
        "May po at opo ako kapag kinakausap ang matatanda. Ano ang ugali ko?",
        ["Magalang", "Maingay", "Tamad"],
        0,
        "Ang po, opo, at pagmamano ay pagiging magalang.",
      ),
      ask(
        "Sama-sama kaming magkakapitbahay na naglilinis. Ano ang tawag dito?",
        ["Pista", "Bayanihan", "Laro"],
        1,
        "Ang bayanihan ay pagtutulungan ng magkakapitbahay.",
      ),
      ask(
        "Masaya kong pinapapasok ang bisita sa bahay. Ano ang ugali ko?",
        ["Mabuting pagtanggap", "Pagtaboy", "Pagtago"],
        0,
        "Ang mabuting pagtanggap ay malugod na pagpapapasok sa bisita.",
      ),
      ask(
        "Sama-sama kaming kumakain at nagdarasal. Sino kami?",
        ["Pamilya", "Dayo", "Kalaban"],
        0,
        "Ang pamilya ay sama-samang kumakain, nagdarasal, at nagtutulungan.",
      ),
    ],
    flashcards: [
      {
        front: "🙏 Dasal",
        name: "Paladasal",
        place: "Tahanan at simbahan",
        fact: "Bahagi ng buhay ang pananampalataya, anuman ang relihiyon.",
      },
      {
        front: "🤲 Po at opo",
        name: "Magalang",
        place: "Bahay at paaralan",
        fact: "May mano at magagalang na pantawag sa nakatatanda.",
      },
      {
        front: "🏘️ Kapitbahay",
        name: "Bayanihan",
        place: "Komunidad",
        fact: "Nagtutulungan sa gawaing bahay, daan, at kanal.",
      },
      {
        front: "🚪 Bisita",
        name: "Mabuting pagtanggap",
        place: "Tahanan",
        fact: "Masaya at magiliw na pinapapasok ang bisita.",
      },
      {
        front: "🍽️ Salu-salo",
        name: "Pamilya",
        place: "Tahanan",
        fact: "Sama-samang kumakain, nagdarasal, at gumagawa.",
      },
    ],
    matching: [
      { left: "Po at opo", right: "Pagiging magalang" },
      { left: "Paglilinis ng daan", right: "Bayanihan" },
      { left: "Pagpapapasok sa bisita", right: "Mabuting pagtanggap" },
      { left: "Sabay magdasal", right: "Pagsasama ng pamilya" },
      { left: "Pagbili ng produktong Pilipino", right: "Pagmamahal sa bayan" },
    ],
    wordSearch: { words: ["Magalang", "Bayanihan", "Paladasal", "Pamilya", "Bisita"] },
    quiz: [
      ask(
        "Ano ang ibig sabihin ng paladasal?",
        ["Ayaw magdasal", "Dasal araw-araw", "Laging naglalaro"],
        1,
        "Paladasal tayo, anuman ang relihiyon.",
      ),
      ask(
        "Alin ang pagiging magalang?",
        ["Sigaw sa lolo", "Po at pagmamano", "Tawanan ang matanda"],
        1,
        "Ang po, opo, at pagmamano ay paggalang.",
      ),
      ask(
        "Alin ang magalang na pantawag?",
        ["Hoy ka diyan", "Kuya o ate", "Ikaw lang ha"],
        1,
        "Kuya, ate, manong, manang, lolo, at lola ay magagalang na pantawag.",
      ),
      ask(
        "Ano ang bayanihan?",
        ["Pagtutulungan", "Away ng kapitbahay", "Pag-iisa sa bahay"],
        0,
        "Ang bayanihan ay pagtutulungan sa gawain.",
      ),
      ask(
        "Paano tinatanggap ang bisita?",
        ["Pinapaalis agad ang bisita", "Hindi binubuksan ang pinto", "Masayang pinapapasok"],
        2,
        "Malugod nating pinapapasok ang bisita.",
      ),
      ask(
        "Alin ang pagsasama ng mag-anak?",
        ["Sabay kumain", "Hindi nag-uusap", "Laging magkahiwalay"],
        0,
        "Sama-sama ang pamilya sa pagkain, dasal, at gawain.",
      ),
      ask(
        "Alin ang pagiging maawain?",
        ["Tawanan ang nahihirapan", "Tumulong at magbahagi", "Magtanim ng galit"],
        1,
        "Ang maawain ay tumutulong, nagbabahagi, at marunong magpatawad.",
      ),
      ask(
        "Alin ang pagmamahal sa bansa?",
        ["Awit ng bayan", "Pagtapon sa watawat", "Pagtawag sa ibang bansa"],
        0,
        "Kasama sa pagmamahal sa bansa ang pag-awit ng Lupang Hinirang.",
      ),
      ask(
        "Ano ang ginagawa ng mapagmahal na pamilya sa bahay?",
        ["Nagtutulungan", "Nag-iiwan ng gulo", "Ayaw magtulungan"],
        0,
        "Nagtutulungan sila at masayang gumagawa sa tahanan.",
      ),
      ask(
        "Alin ang hindi magalang?",
        ["Pagsabi ng po", "Pagsigaw sa nakatatanda", "Pagmamano"],
        1,
        "Ang pagsigaw sa nakatatanda ay hindi magalang. Subukan ang po at mano.",
      ),
    ],
  },
  {
    id: "w16",
    title: "Katangian at Pagkakakilanlan ng mga Pilipino",
    badgeName: "Nagkakaisa",
    recap: [
      { speaker: "ana", text: "May kwento ako. Ako si Ana, at mahilig akong umawit." },
      { speaker: "ben", text: "Ako si Ben. Magaling akong gumuhit." },
      {
        speaker: "ana",
        text: "Magkaiba kami ng talento at itsura, pero masaya kaming maglaro at mag-aral nang magkasama.",
      },
      {
        speaker: "ben",
        text: "Tinutulungan namin ang isa't isa at iginagalang ang aming pagkakaiba.",
      },
      { speaker: "ana", text: "Ipinagmamalaki namin na kami ay Pilipino." },
      {
        speaker: "ben",
        text: "Maaaring magkaiba ang balat, tangkad, buhok, wika, hilig, o lugar. Nagkakaisa pa rin tayo.",
      },
      {
        speaker: "ana",
        text: "Ang pagtanggap sa sarili at sa iba ay paggalang at pagmamahal sa bayan.",
      },
    ],
    riddles: [
      ask("Mahilig akong umawit. Sino ako sa kwento?", ["Ben", "Ana", "Guro"], 1, "Si Ana ang mahilig umawit."),
      ask("Magaling akong gumuhit. Sino ako?", ["Ana", "Bisita", "Ben"], 2, "Si Ben ang magaling gumuhit."),
      ask(
        "Tinatanggap ko ang pagkakaiba ng iba. Ano ang tawag dito?",
        ["Pangungutya", "Paggalang", "Pag-iwas"],
        1,
        "Ang pagtanggap sa pagkakaiba ay paggalang.",
      ),
      ask(
        "Magkakaiba man tayo, ano ang dapat nating gawin?",
        ["Mag-away", "Magtulungan", "Maliitin ang talento"],
        1,
        "Magkakaiba man, magtulungan tayo.",
      ),
    ],
    flashcards: [
      {
        front: "🎤 Umaawit",
        name: "Ana",
        place: "Kwento",
        fact: "Mahilig siyang umawit at masayang kasama si Ben.",
      },
      {
        front: "🎨 Gumuguhit",
        name: "Ben",
        place: "Kwento",
        fact: "Magaling siyang gumuhit at tinutulungan si Ana.",
      },
      {
        front: "🤝 Iba't iba",
        name: "Paggalang",
        place: "Paaralan",
        fact: "Ang pagtanggap sa pagkakaiba ay paggalang.",
      },
      {
        front: "🌟 Hilig",
        name: "Talento",
        place: "Bawat bata",
        fact: "Dapat igalang ang talento, hindi maliitin.",
      },
      {
        front: "🇵🇭 Tayo",
        name: "Pilipino",
        place: "Isang bansa",
        fact: "Magkakaiba pero nagkakaisa, at ipinagmamalaki ito.",
      },
    ],
    matching: [
      { left: "Ana", right: "Mahilig umawit" },
      { left: "Ben", right: "Magaling gumuhit" },
      { left: "Pagkakaiba", right: "Dapat igalang" },
      { left: "Pagtanggap sa sarili", right: "Pagmamahal" },
      { left: "Magkakaiba tayo", right: "Magtulungan" },
    ],
    wordSearch: { words: ["Pilipino", "Talento", "Paggalang", "Kanta", "Guhit"] },
    quiz: [
      ask("Sino ang mahilig umawit sa kwento?", ["Ben", "Ana", "Guro"], 1, "Si Ana ang mahilig umawit."),
      ask("Sino ang magaling gumuhit?", ["Ana", "Ben", "Bisita"], 1, "Si Ben ang magaling gumuhit."),
      ask(
        "Ano ang napapansin kina Ana at Ben?",
        ["Magkapareho sila sa lahat", "Magkaiba ng talento pero masayang magkasama", "Ayaw nilang magkaibigan"],
        1,
        "Magkaiba sila ng talento at itsura, pero magkasama silang masaya.",
      ),
      ask(
        "Paano nila ipinakita ang pagtanggap?",
        ["Nagtutulungan at nagpapakita ng paggalang", "Nag-away", "Nangutya"],
        0,
        "Tinulungan nila ang isa't isa at iginalang ang pagkakaiba.",
      ),
      ask(
        "Ano ang tawag sa pagtanggap sa pagkakaiba?",
        ["Pangungutya", "Pag-iwas", "Paggalang"],
        2,
        "Paggalang ang pagtanggap sa pagkakaiba.",
      ),
      ask(
        "Magkakaiba man tayo, ano ang dapat gawin?",
        ["Magtulungan", "Mag-away", "Umalis"],
        0,
        "Dapat magtulungan kahit magkakaiba.",
      ),
      ask(
        "Ano ang dapat gawin sa talento ng iba?",
        ["Maliitin", "Igalang", "Itago"],
        1,
        "Igalang ang talento ng bawat isa.",
      ),
      ask(
        "Ang pagtanggap sa sarili ay nagpapakita ng?",
        ["Pag-iwas", "Pagmamahal", "Takot"],
        1,
        "Ang pagtanggap sa sarili ay pagmamahal.",
      ),
      ask(
        "Alin ang maaaring pagkakaiba ng mga Pilipino?",
        ["Kulay ng balat, wika, o hilig", "Iisang itsura lang", "Walang talento"],
        0,
        "Maaaring magkaiba ang itsura, wika, lugar, at talento.",
      ),
      ask(
        "Ano ang pagkakapareho nina Ana at Ben?",
        ["Ipinagmamalaki nilang sila ay Pilipino", "Ayaw nilang tumulong", "Iisa lang ang hilig"],
        0,
        "Ipinagmamalaki nilang sila ay Pilipino.",
      ),
    ],
  },
  {
    id: "w17",
    title: "Mga Tradisyonal na Kasuotan at Pagdiriwang",
    badgeName: "Pista",
    recap: [
      {
        speaker: "ana",
        text: "Ang Barong Tagalog ay pormal na kasuotan ng lalaki, yari sa piña o jusi at may burda.",
      },
      {
        speaker: "ben",
        text: "Ang baro't saya ay pambabae, may maluwag na manggas at makulay na palda. Ang Maria Clara ay may blusa, saya, panuelo, at tapis.",
      },
      {
        speaker: "ana",
        text: "Ang malong ay makulay na tela ng mga Moro, may disenyong geometric o okir. Ang patadyong ay iniikot na tela sa Visayas, lalo na sa Panay.",
      },
      {
        speaker: "ben",
        text: "Ang hijab ay pantakip sa buhok at leeg, hindi sa mukha. Ang abaya ay mahabang damit pang-ibabaw.",
      },
      {
        speaker: "ana",
        text: "Tuwing Enero, may Itim na Nazareno sa Quiapo at Ati-atihan sa Kalibo. Sa Cebu naman ang Sinulog.",
      },
      {
        speaker: "ben",
        text: "May Pahiyas sa Lucban, Moriones sa Marinduque, MassKara sa Bacolod, at pista ng T'nalak sa Timog Cotabato.",
      },
      {
        speaker: "ana",
        text: "Ang Ramadan ay buwan ng dasal at pagbabahagi ng mga Muslim. Pagkatapos nito ang Eid al-Fitr, salu-salo ng pamilya.",
      },
    ],
    riddles: [
      ask(
        "Pormal akong burdadong kasuotan ng lalaki, yari sa piña o jusi. Ano ako?",
        ["Barong Tagalog", "Malong", "Sapatos"],
        0,
        "Ang Barong Tagalog ay pormal na kasuotan ng lalaki.",
      ),
      ask(
        "Makulay akong tela na ibinabalot, may okir, suot ng mga Moro. Ano ako?",
        ["Barong", "Malong", "Sumbrero"],
        1,
        "Ang malong ay telang ibinabalot, may geometric o okir na disenyo.",
      ),
      ask(
        "Sa Kalibo ako, Enero, at sumisigaw ng “Hala Bira”. Anong pista ako?",
        ["Pahiyas", "Ati-atihan", "Sinulog"],
        1,
        "Ang Ati-atihan ay sa Kalibo, Aklan.",
      ),
      ask(
        "Pinapalamutian ng kiping at ani ang mga bahay sa Lucban. Anong pista ako?",
        ["Pahiyas", "MassKara", "Moriones"],
        0,
        "Ang Pahiyas ay sa Lucban, Quezon, pasasalamat kay San Isidro Labrador.",
      ),
      ask(
        "Telang pantakip sa buhok at leeg, hindi sa mukha. Ano ako?",
        ["Hijab", "Burqa", "Tapis"],
        0,
        "Ang hijab ay pantakip sa buhok at leeg. Hindi nito tinatakpan ang mukha.",
      ),
    ],
    flashcards: [
      {
        front: "👔 Piña o jusi",
        name: "Barong Tagalog",
        place: "Pilipinas",
        fact: "Pormal na burdadong kasuotan ng mga lalaki.",
      },
      {
        front: "👗 Maluwag na manggas",
        name: "Baro't saya",
        place: "Pilipinas",
        fact: "Pambabaeng kasuotan na may makulay na palda.",
      },
      {
        front: "🧵 Okir",
        name: "Malong",
        place: "Mindanao",
        fact: "Makulay na tela na ibinabalot ng babae o lalaking Moro.",
      },
      {
        front: "🎭 Hala Bira",
        name: "Ati-atihan",
        place: "Kalibo, Aklan",
        fact: "Enero ito, may pinturang itim at sayaw, kasama ang Santo Niño.",
      },
      {
        front: "🌾 Kiping",
        name: "Pahiyas",
        place: "Lucban, Quezon",
        fact: "Pasasalamat kay San Isidro Labrador, patron ng magsasaka.",
      },
      {
        front: "😊 Ngiti",
        name: "MassKara",
        place: "Bacolod",
        fact: "Pistang Oktubre para itaas ang kasiyahan pagkatapos ng hirap.",
      },
    ],
    matching: [
      { left: "Barong Tagalog", right: "Lalaki, piña o jusi" },
      { left: "Baro't saya", right: "Babae, maluwag na manggas" },
      { left: "Malong", right: "Telang may okir" },
      { left: "Patadyong", right: "Visayas, lalo na sa Panay" },
      { left: "Sinulog", right: "Lungsod Cebu" },
      { left: "Moriones", right: "Marinduque" },
    ],
    wordSearch: { words: ["Barong", "Malong", "Sinulog", "Pahiyas", "Moriones"] },
    quiz: [
      ask(
        "Saan yari ang Barong Tagalog?",
        ["Piña o jusi", "Plastiko", "Metal"],
        0,
        "Yari ito sa piña o jusi at may burda.",
      ),
      ask(
        "Ano ang baro't saya?",
        ["Sapatos", "Pambabaeng kasuotan", "Sombrero lang"],
        1,
        "Pambabae ito, may maluwag na manggas at makulay na palda.",
      ),
      ask(
        "Alin ang bahagi ng Maria Clara?",
        ["Blusa, saya, panuelo, at tapis", "Sapatos lang", "Sumbrero lang"],
        0,
        "Apat ang bahagi: blusa, saya, panuelo o alampay, at tapis.",
      ),
      ask(
        "Saan karaniwan ang patadyong?",
        ["Visayas, lalo na sa Panay", "Batanes lang", "Ibang bansa"],
        0,
        "Iniikot na tela ito sa Visayas, lalo na sa Panay.",
      ),
      ask(
        "Alin ang hindi tumatakip sa mukha?",
        ["Burqa", "Hijab", "Niqab"],
        1,
        "Ang hijab ay pantakip sa buhok at leeg, hindi sa mukha.",
      ),
      ask(
        "Saan ginaganap ang Itim na Nazareno tuwing Enero?",
        ["Quiapo, Maynila", "Baguio", "Davao"],
        0,
        "Sa simbahan ng Quiapo ito ginaganap.",
      ),
      ask(
        "Ano ang sigaw sa Ati-atihan?",
        ["Hala Bira", "Mabuhay", "Tutubi"],
        0,
        "Sumisigaw ng “Hala Bira” sa Kalibo.",
      ),
      ask(
        "Ano ang ginugunita ng Sinulog?",
        ["Pagdating ng Kristiyanismo at ang Santo Niño", "Ani ng palay", "Ulan"],
        0,
        "Paggunita ito sa Santo Niño at sa pagdating ng Kristiyanismo, sa Cebu.",
      ),
      ask(
        "Bakit ginagawa ang Pahiyas?",
        ["Pasasalamat kay San Isidro Labrador", "Para sa niyebe", "Para sa tren"],
        0,
        "Pasasalamat ito ng mga magsasaka sa Lucban.",
      ),
      ask(
        "Kailan ang Eid al-Fitr?",
        ["Bago mag-Ramadan", "Matapos ang Ramadan", "Tuwing Pasko"],
        1,
        "Ipinagdiriwang ito ng mga Muslim matapos ang Ramadan.",
      ),
    ],
  },
  {
    id: "w18",
    title: "Mga Pangkat-Etniko sa Luzon",
    badgeName: "Luzon",
    recap: [
      {
        speaker: "ben",
        text: "Ang pangkat-etniko ay grupo ng taong may magkakawangis na wika, kultura, tradisyon, at paniniwala. Lahat sila ay Pilipino.",
      },
      {
        speaker: "ana",
        text: "Ang Tagalog ay mula sa “taga-ilog”. Malapit sila sa Ilog Pasig, na nag-uugnay sa Manila Bay at Laguna de Bay.",
      },
      {
        speaker: "ben",
        text: "Ang mga Ilocano ay kilala sa kasipagan at pagtitipid. May epiko silang Biag ni Lam-ang, at tela na inabel.",
      },
      {
        speaker: "ana",
        text: "Ang Pangasinan ay mula sa asin. Sikat ang bangus ng Dagupan, puto Calasiao, at Hundred Islands.",
      },
      {
        speaker: "ben",
        text: "Ang mga Kapampangan ay tinatawag na culinary capital. May Ligligan Parul sa San Fernando at Bulkang Arayat.",
      },
      {
        speaker: "ana",
        text: "Sa Cordillera: Ifugao at ang hagdan-hagdang palayan ng Banaue; Kalinga sa lalawigan ng Kalinga, kabisera ang Tabuk.",
      },
      {
        speaker: "ben",
        text: "Ang mga Aeta o Agta ay kabilang sa mga pinakaunang nanirahan sa Luzon. Ang Mangyan naman ay nasa Mindoro, may tulang ambahan.",
      },
    ],
    riddles: [
      ask(
        "Mula sa salitang taga-ilog ang pangalan namin. Sino kami?",
        ["Tagalog", "Waray", "Tausug"],
        0,
        "Ang Tagalog ay mula sa taga-ilog, malapit sa Ilog Pasig.",
      ),
      ask(
        "Kami ang gumawa ng hagdan-hagdang palayan ng Banaue. Sino kami?",
        ["Ifugao", "Cebuano", "Yakan"],
        0,
        "Ang mga Ifugao ang lumikha ng Banaue Rice Terraces.",
      ),
      ask(
        "Nasa Cordillera kami. Tabuk ang kabisera ng lalawigan namin. Hindi kami taga-Gitnang Luzon. Sino kami?",
        ["Kalinga", "Kapampangan", "Cebuano"],
        0,
        "Ang Kalinga ay nasa Cordillera. Ang Tabuk ang kabisera, hindi Gitnang Luzon.",
      ),
      ask(
        "Kabilang kami sa mga pinakaunang tao sa Luzon, sa Zambales at Bataan. Pana at palaso ang kasangkapan namin. Sino kami?",
        ["Aeta", "Tagalog", "Ilocano"],
        0,
        "Aeta o Agta ang tawag sa kanila. Huwag gumamit ng ibang lumang tawag.",
      ),
      ask(
        "Walong pangkat kami sa Mindoro, at may tulang ambahan. Sino kami?",
        ["Mangyan", "Badjao", "Waray"],
        0,
        "Ang mga Mangyan ay nasa Mindoro. Sikat ang ambahan.",
      ),
    ],
    flashcards: [
      {
        front: "🏞️ Taga-ilog",
        name: "Tagalog",
        place: "CALABARZON, Gitnang Luzon, Maynila",
        fact: "Mula sa taga-ilog. Sina Rizal at Bonifacio ay Tagalog.",
      },
      {
        front: "🌾 Inabel",
        name: "Ilocano",
        place: "Ilocos",
        fact: "Kilala sa kasipagan, Biag ni Lam-ang, at pagkaing pinakbet.",
      },
      {
        front: "🪜 Palayan",
        name: "Ifugao",
        place: "Cordillera",
        fact: "Gumawa sila ng hagdan-hagdang palayan ng Banaue.",
      },
      {
        front: "🎶 Gangsa",
        name: "Kalinga",
        place: "Cordillera, Tabuk",
        fact: "Sikat ang batok. Si Whang-od ang kilalang mambabatok.",
      },
      {
        front: "🏹 Kagubatan",
        name: "Aeta",
        place: "Zambales, Bataan, Pampanga, Tarlac",
        fact: "Tinatawag din silang Agta. Mahusay sila sa halaman ng gubat.",
      },
      {
        front: "🌋 Mayon",
        name: "Bicolano",
        place: "Rehiyon ng Bicol",
        fact: "Sikat ang laing at Bicol Express, gata at sili.",
      },
    ],
    matching: [
      { left: "Tagalog", right: "Taga-ilog" },
      { left: "Ilocano", right: "Biag ni Lam-ang" },
      { left: "Ifugao", right: "Banaue Rice Terraces" },
      { left: "Kalinga", right: "Tabuk, Cordillera" },
      { left: "Kapampangan", right: "Ligligan Parul" },
      { left: "Bicolano", right: "Bulkang Mayon" },
    ],
    wordSearch: { words: ["Tagalog", "Ilocano", "Ifugao", "Kalinga", "Mayon"] },
    quiz: [
      ask(
        "Ano ang pangkat-etniko?",
        ["Grupong may magkakawangis na wika at kultura", "Isang laro", "Isang pagkain"],
        0,
        "May magkakawangis silang wika, kultura, tradisyon, at paniniwala.",
      ),
      ask(
        "Saan nagmula ang salitang Tagalog?",
        ["Taga-bundok", "Taga-ilog", "Taga-dagat"],
        1,
        "Mula ito sa taga-ilog, malapit sa Ilog Pasig.",
      ),
      ask(
        "Alin ang kilala sa mga Ilocano?",
        ["Kasipagan at inabel", "Sinulog", "Lawa ng Lanao"],
        0,
        "Kilala sila sa kasipagan, pagtitipid, at telang inabel.",
      ),
      ask(
        "Saan nagmula ang pangalang Pangasinan?",
        ["Asin", "Ginto", "Ulan"],
        0,
        "Mula sa asin at panag-asinan, lugar kung saan ginagawa ang asin.",
      ),
      ask(
        "Ano ang Ligligan Parul?",
        ["Pista ng parol sa San Fernando", "Sayaw sa Sulu", "Tulay sa Leyte"],
        0,
        "Ito ang Giant Lantern Festival ng mga Kapampangan.",
      ),
      ask(
        "Sino ang gumawa ng hagdan-hagdang palayan ng Banaue?",
        ["Ifugao", "Tausug", "Aklanon"],
        0,
        "Ang mga Ifugao ang lumikha nito.",
      ),
      ask(
        "Saan matatagpuan ang mga Kalinga?",
        ["Gitnang Luzon", "Cordillera, Tabuk", "Visayas"],
        1,
        "Nasa Cordillera sila. Ang Tabuk ang kabisera, hindi Gitnang Luzon.",
      ),
      ask(
        "Ano ang tamang tawag sa pangkat na kabilang sa mga unang nanirahan sa Zambales at Bataan?",
        ["Aeta", "Cebuano", "Maranao"],
        0,
        "Aeta o Agta ang tawag. Pana at palaso ang kasangkapan nila sa pangangaso.",
      ),
      ask(
        "Saan naninirahan ang mga Mangyan?",
        ["Mindoro", "Sulu", "Batanes"],
        0,
        "Walong pangkat ng Mangyan ang nasa Mindoro. May ambahan sila.",
      ),
      ask(
        "Alin ang pagkaing Bicolano?",
        ["Laing", "Bagnet", "Binagol"],
        0,
        "Ang laing ay Bicolano, may gata at sili. Ang Mayon ang simbolo ng rehiyon.",
      ),
    ],
  },
  {
    id: "w19",
    title: "Mga Pangkat-Etniko sa Visayas",
    badgeName: "Visayas",
    recap: [
      {
        speaker: "ana",
        text: "Ang mga Cebuano, o Sugbuanon, ang pangalawang pinakamalaking pangkat. Sikat ang Sinulog at ang Santo Niño sa Cebu.",
      },
      {
        speaker: "ben",
        text: "Ang mga Ilonggo ay malambing at magiliw. May Dinagyang sa Iloilo at MassKara sa Bacolod. Masarap ang La Paz Batchoy.",
      },
      {
        speaker: "ana",
        text: "Ang mga Waray ay nasa Silangang Visayas. Matatag sila sa bagyo. Sikat ang binagol at ang Tulay ng San Juanico.",
      },
      {
        speaker: "ben",
        text: "Ang mga Aklanon ay nasa Aklan. May Ati-atihan sa Kalibo, telang piña, at isla ng Boracay.",
      },
      {
        speaker: "ana",
        text: "Ang mga Karay-a ay nasa Antique. Ang wika nila ay Kinaray-a, at iniingatan nila ang epikong Hinilawod.",
      },
      {
        speaker: "ben",
        text: "Ang mga Ati ng Panay ay kabilang sa mga unang nanirahan sa Visayas. Inaalala sila ng Ati-atihan.",
      },
      {
        speaker: "ana",
        text: "Paalala: ang Kalinga ay nasa Cordillera, sa Tabuk, hindi sa Gitnang Luzon.",
      },
    ],
    riddles: [
      ask(
        "Pangalawa kami sa pinakamalaking pangkat. Sa Cebu ang Sinulog namin. Sino kami?",
        ["Cebuano", "Kalinga", "T'boli"],
        0,
        "Cebuano o Sugbuanon sila. Sa Cebu ang Sinulog.",
      ),
      ask(
        "Malambing ang pananalita namin. May Batchoy sa Iloilo. Sino kami?",
        ["Waray", "Ilonggo", "Mangyan"],
        1,
        "Ang mga Ilonggo o Hiligaynon ay kilala sa malambing na ugali.",
      ),
      ask(
        "Nasa Silangang Visayas kami. Kakanin naming binagol. Sino kami?",
        ["Waray", "Yakan", "Tagalog"],
        0,
        "Ang mga Waray ay nasa Samar, Biliran, at Leyte. Ang binagol ay kakanin nila.",
      ),
      ask(
        "Sa Aklan kami, at sa Kalibo ang Ati-atihan. Sino kami?",
        ["Aklanon", "Subanen", "Ifugao"],
        0,
        "Ang mga Aklanon ay nasa Aklan. Sikat din ang piña at Boracay.",
      ),
      ask(
        "Nasa Antique kami. Kinaray-a ang wika namin. Sino kami?",
        ["Karay-a", "Maranao", "Ifugao"],
        0,
        "Ang mga Karay-a ay nasa Antique. Ang Kinaray-a ang wika nila.",
      ),
    ],
    flashcards: [
      {
        front: "🥁 Sinulog",
        name: "Cebuano",
        place: "Cebu",
        fact: "Tinatawag din silang Sugbuanon. Sikat ang Santo Niño.",
      },
      {
        front: "🍜 Batchoy",
        name: "Ilonggo",
        place: "Iloilo at Kanlurang Visayas",
        fact: "Malambing sila. May Dinagyang at Pancit Molo.",
      },
      {
        front: "🌉 San Juanico",
        name: "Waray",
        place: "Samar at Leyte",
        fact: "Matatag sila sa bagyo. Ang binagol ay kakanin nila.",
      },
      {
        front: "🏖️ Boracay",
        name: "Aklanon",
        place: "Aklan",
        fact: "Sikat ang Ati-atihan at ang telang piña.",
      },
      {
        front: "📜 Hinilawod",
        name: "Karay-a",
        place: "Antique",
        fact: "Ang Kinaray-a ay wika nila. Mula sa ilaya ang pangalan.",
      },
      {
        front: "🖤 Hala Bira",
        name: "Ati",
        place: "Panay",
        fact: "Kabilang sa mga unang nanirahan sa Visayas. Inaalala sila ng pista.",
      },
    ],
    matching: [
      { left: "Cebuano", right: "Sinulog" },
      { left: "Ilonggo", right: "La Paz Batchoy" },
      { left: "Waray", right: "Binagol" },
      { left: "Aklanon", right: "Boracay" },
      { left: "Karay-a", right: "Hinilawod" },
      { left: "Ati", right: "Panay" },
    ],
    wordSearch: { words: ["Cebuano", "Ilonggo", "Waray", "Binagol", "Aklan"] },
    quiz: [
      ask(
        "Ano ang ibang tawag sa Cebuano?",
        ["Sugbuanon", "Kalinga", "Subanen"],
        0,
        "Sugbuanon o Sugbuhanon din sila.",
      ),
      ask(
        "Saan ang Sinulog?",
        ["Lungsod Cebu", "Tabuk", "Baguio"],
        0,
        "Ang Sinulog ay sa Cebu, para sa Santo Niño.",
      ),
      ask(
        "Alin ang kilala sa mga Ilonggo?",
        ["Malambing na ugali", "Hagdan-hagdang palayan", "Lawa ng Lanao"],
        0,
        "Malambing at magiliw ang mga Ilonggo.",
      ),
      ask(
        "Saan ang MassKara?",
        ["Bacolod", "Vigan", "Davao"],
        0,
        "Ang MassKara ay sa Bacolod tuwing Oktubre.",
      ),
      ask(
        "Saan pangunahing naninirahan ang mga Waray?",
        ["Silangang Visayas", "Cordillera", "Sulu"],
        0,
        "Nasa Samar, Biliran, at Leyte sila.",
      ),
      ask(
        "Ano ang binagol?",
        ["Kakanin ng mga Waray", "Sayaw ng Maranao", "Bahay ng Isneg"],
        0,
        "Ang binagol ay kakanin mula sa Leyte.",
      ),
      ask(
        "Alin ang nasa Aklan?",
        ["Boracay at Ati-atihan", "Mayon", "Torogan"],
        0,
        "Ang Boracay at ang Ati-atihan sa Kalibo ay nasa Aklan.",
      ),
      ask(
        "Ano ang Hinilawod?",
        ["Epiko ng mga Karay-a", "Pagkain", "Tulay"],
        0,
        "Mahabang epiko ito na iniingatan sa Panay, lalo na ng mga Karay-a.",
      ),
      ask(
        "Sino ang inaalala ng pinturang itim sa Ati-atihan?",
        ["Mga Ati ng Panay", "Mga bayani ng Maynila", "Mga mandaragat ng Sulu"],
        0,
        "Ang mga Ati ay kabilang sa mga unang nanirahan sa Panay.",
      ),
      ask(
        "Ano ang wika ng mga Karay-a?",
        ["Kinaray-a", "Tausug", "Ilocano"],
        0,
        "Ang Kinaray-a ang wika ng mga Karay-a sa Antique.",
      ),
    ],
  },
  {
    id: "w20",
    title: "Mga Pangkat-Etniko sa Mindanao",
    badgeName: "Mindanao",
    recap: [
      {
        speaker: "ben",
        text: "Ang Maranao ay “mga tao sa lawa”. Nasa paligid sila ng Lawa ng Lanao. Sikat ang okir, torogan, malong, at sayaw na Singkil.",
      },
      {
        speaker: "ana",
        text: "Ang Maguindanaon ay mga tao ng kapatagan. Sila ang nagtatag ng Sultanate of Maguindanao. Sikat ang kulintang.",
      },
      {
        speaker: "ben",
        text: "Ang mga Tausug ay nasa Sulu. May Sultanate of Sulu sila, pis syabit na telang pantakip sa ulo, at sayaw na Pangalay.",
      },
      {
        speaker: "ana",
        text: "Ang mga Badjao, o Sama-Dilaut, ay mga tao ng dagat. Ang lepa o vinta ang bahay, sakay, at trabaho nila.",
      },
      {
        speaker: "ben",
        text: "Ang mga Yakan ay nasa Basilan. Magaling silang maghabi ng makukulay na tela, gaya ng seputangan.",
      },
      {
        speaker: "ana",
        text: "Ang Manobo ay nangangahulugang “tao”. Pinamumunuan sila ng datu. Ang T'boli naman ay dream weaver ng T'nalak sa Lawa ng Sebu.",
      },
      {
        speaker: "ben",
        text: "Ang Subanen ay mga tao ng ilog sa Tangway ng Zamboanga. Ang pinuno nila ay tinatawag na timuay.",
      },
    ],
    riddles: [
      ask(
        "Ako ang “tao ng dagat.” Ang lepa o vinta ang aking bahay. Sino ako?",
        ["Badjao", "Tagalog", "Ifugao"],
        0,
        "Ang Badjao o Sama-Dilaut ay mga tao ng dagat.",
      ),
      ask(
        "“Mga tao sa lawa” kami, sa Lawa ng Lanao. Sino kami?",
        ["Maranao", "Waray", "Aklanon"],
        0,
        "Ang Maranao ay nangangahulugang mga tao sa lawa.",
      ),
      ask(
        "Sayaw ako ng mga Maranao, may kawayan. Ano ako?",
        ["Singkil", "Sinulog", "Ati-atihan"],
        0,
        "Ang Singkil ang tanyag na sayaw ng mga Maranao.",
      ),
      ask(
        "Set ako ng maliliit na gong ng mga Maguindanaon. Ano ako?",
        ["Kulintang", "Gitara", "Tambol"],
        0,
        "Ang kulintang ay hanay ng gong.",
      ),
      ask(
        "Hinabi ako mula sa panaginip ng mga T'boli, gawa sa abaka. Ano ako?",
        ["T'nalak", "Inabel", "Piña"],
        0,
        "Ang T'nalak ay tela ng mga T'boli, mula sa disenyo ng panaginip.",
      ),
    ],
    flashcards: [
      {
        front: "🏞️ Lawa",
        name: "Maranao",
        place: "Lawa ng Lanao",
        fact: "Sikat ang okir, ang bahay na torogan, at ang Singkil.",
      },
      {
        front: "🎵 Gong",
        name: "Maguindanaon",
        place: "Kapatagan ng Maguindanao",
        fact: "Sila ang nagtatag ng Sultanate of Maguindanao. Sikat ang kulintang.",
      },
      {
        front: "🏝️ Sulu",
        name: "Tausug",
        place: "Sulu",
        fact: "May pis syabit at sayaw na Pangalay. Nagtatag sila ng Sultanate of Sulu.",
      },
      {
        front: "⛵ Lepa",
        name: "Badjao",
        place: "Tawi-Tawi, Sulu, at baybayin",
        fact: "Sama-Dilaut o tao ng dagat. Ang bangka ang tahanan nila.",
      },
      {
        front: "🧵 Seputangan",
        name: "Yakan",
        place: "Basilan",
        fact: "Magaling silang maghabi ng matingkad na geometric na tela.",
      },
      {
        front: "🌙 Panaginip",
        name: "T'boli",
        place: "Lawa ng Sebu, Timog Cotabato",
        fact: "Dream weaver sila ng T'nalak na gawa sa abaka.",
      },
    ],
    matching: [
      { left: "Maranao", right: "Lawa ng Lanao" },
      { left: "Maguindanaon", right: "Kulintang" },
      { left: "Tausug", right: "Sulu" },
      { left: "Badjao", right: "Tao ng dagat" },
      { left: "T'boli", right: "T'nalak" },
      { left: "Subanen", right: "Tao ng ilog" },
    ],
    wordSearch: { words: ["Maranao", "Singkil", "Kulintang", "Badjao", "T'nalak"] },
    quiz: [
      ask(
        "Ano ang ibig sabihin ng Maranao?",
        ["Mga tao sa lawa", "Mga tao sa ilog", "Mga tao sa bundok"],
        0,
        "Nangangahulugan itong mga tao sa lawa, sa Lawa ng Lanao.",
      ),
      ask(
        "Ano ang torogan?",
        ["Bahay ng mga Maranao", "Pagkain", "Bangka"],
        0,
        "Ang torogan ay tradisyonal na bahay ng mga Maranao, may okir at panolong.",
      ),
      ask(
        "Alin ang sayaw ng mga Maranao?",
        ["Singkil", "Tinikling", "Kuracha"],
        0,
        "Ang Singkil ang pinakatanyag na sayaw nila.",
      ),
      ask(
        "Ano ang kulintang?",
        ["Hanay ng gong", "Sombrero", "Palay"],
        0,
        "Sikat ito sa mga Maguindanaon.",
      ),
      ask(
        "Saan pangunahing naninirahan ang mga Tausug?",
        ["Sulu", "Ilocos", "Bicol"],
        0,
        "Nasa Sulu sila at nagtatag ng Sultanate of Sulu.",
      ),
      ask(
        "Ano ang lepa o vinta para sa mga Badjao?",
        ["Bahay, sakay, at lugar ng trabaho", "Simbahan", "Palayan"],
        0,
        "Ang bangka ang sentro ng buhay ng mga tao ng dagat.",
      ),
      ask(
        "Saan magaling maghabi ang mga Yakan?",
        ["Basilan", "Batanes", "Baguio"],
        0,
        "Nasa Basilan sila at sikat ang makulay nilang habi.",
      ),
      ask(
        "Ano ang ibig sabihin ng Manobo?",
        ["Tao", "Dagat", "Ginto"],
        0,
        "Ang Manobo ay nangangahulugang tao. Ang datu ang pinuno.",
      ),
      ask(
        "Sino ang gumagawa ng T'nalak?",
        ["Mga T'boli sa Lawa ng Sebu", "Mga Ilocano", "Mga Waray"],
        0,
        "Gawa ito sa abaka, at ang disenyo ay pinaniniwalaang galing sa panaginip.",
      ),
      ask(
        "Ano ang Subanen?",
        ["Mga tao ng ilog", "Mga tao ng yelo", "Mga tao ng disyerto"],
        0,
        "Nasa Tangway ng Zamboanga sila. Ang timuay ang pinuno.",
      ),
    ],
  },
]

for (const week of makabansaWeeks) {
  if (!week.quiz || week.quiz.length !== 10) {
    throw new Error(`${week.id} needs 10 quiz questions.`)
  }
  const items = [...(week.riddles ?? []), ...week.quiz]
  for (const item of items) {
    if (!item.choices.some((choice) => choice.id === item.correctId)) {
      throw new Error(`The correct choice is missing: ${item.prompt}`)
    }
  }
  const counts = new Map<number, number>()
  const prompted = [
    ...(week.riddles ?? []).map((item, index) => ({ item, activity: "riddles" as const, index })),
    ...week.quiz.map((item, index) => ({ item, activity: "quiz" as const, index })),
  ]
  for (const { item, activity, index } of prompted) {
    const position = correctPosition(
      item.choices,
      item.correctId,
      choiceSeed(`q3/makabansa/${week.id}`, activity, index),
    )
    counts.set(position, (counts.get(position) ?? 0) + 1)
  }
  const top = Math.max(...counts.values())
  if (top / prompted.length > 0.5) {
    throw new Error(`${week.id} puts too many correct answers in one position.`)
  }
  if (week.id === "w15") {
    let longest = 0
    for (const item of week.quiz) {
      const correct = item.choices.find((choice) => choice.id === item.correctId)
      const max = Math.max(...item.choices.map((choice) => choice.label.length))
      if (correct && correct.label.length === max) longest += 1
    }
    if (longest > 4) throw new Error("Week 15 correct answers are the longest too often.")
  }
  if (week.wordSearch) {
    createWordSearch(week.wordSearch.words, seedFromText(`q3/makabansa/${week.id}`))
  }
}
