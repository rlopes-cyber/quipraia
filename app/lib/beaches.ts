export type SurfProfile = {
  // true = ponto de surf documentado; false = não é considerada um pico de surf pelas fontes
  // consultadas (ex.: enseada abrigada só para banho).
  isSurfSpot: boolean;
  // Tipo de fundo (areia / pedra-recife / misto), quando encontrado em fonte confiável.
  bottomType?: string;
  // Direção em graus para onde a praia "olha" o mar aberto, só preenchida quando a fonte
  // afirma isso explicitamente (usada para calcular vento offshore/onshore por geometria).
  facingDegrees?: number;
  // Direções de swell (8 pontos, convenção PT: N, NE, L, SE, S, SO, O, NO) citadas pela fonte
  // como as que produzem as melhores ondas nesse pico.
  bestSwellDirections?: string[];
  // Direções de vento (mesma convenção) citadas pela fonte como favoráveis (offshore) nesse pico.
  bestWindDirections?: string[];
  // Nota textual livre sobre maré ideal, quando a fonte descreve isso em texto (não um número).
  bestTideNote?: string;
  // Nível/perfil de surfista recomendado, conforme a fonte.
  skillLevel?: string;
  // Versão curta de skillLevel, só para caber em cards compactos (comparador, etc.).
  skillLevelShort?: string;
  // Observações adicionais relevantes (nomes de picos, cuidados, contexto).
  notes?: string;
  // Citação da(s) fonte(s) usada(s) para preencher os campos acima.
  source?: string;
};

export type Beach = {
  name: string;
  slug: string;
  coastOrder: number;
  lat: number;
  lon: number;
  score: number;
  wave: number;
  period: number;
  wind: number;
  windDirection: string;
  tide: number;
  condition: "Bom" | "Regular" | "Fraco";
  image: string;
  imagePosition?: string;
  surf?: SurfProfile;
};

export const beaches: Beach[] = [
  {
    name: "Praia do Flamengo", slug: "praia-do-flamengo", coastOrder: 10, lat: -12.9288, lon: -38.3180, score: 78, wave: 1.4, period: 10, wind: 12, windDirection: "L", tide: 0.7, condition: "Bom",
    image: "/images/quipraia-praia-do-flamengo-v1.jpg",
    surf: {
      isSurfSpot: true,
      bottomType: "Pedra (recife)",
      facingDegrees: 90,
      bestSwellDirections: ["L", "SE"],
      bestTideNote: "Fundo de pedra costuma formar ondas mais definidas e previsíveis, mas exige atenção extra em quedas e na maré baixa.",
      skillLevel: "Avançado (drops verticais, paredes rápidas e correntes)",
      skillLevelShort: "Avançado",
      notes: "Pico local conhecido: Aleluia, com ondas longas e cheias. Bom também para kitesurf. Fica na divisa de Salvador com Lauro de Freitas, perto do aeroporto e da Stella Maris.",
      source: "ondesurfar.com/praia/flamengo-salvador; dicasdabahia.com.br",
    },
  },
  {
    name: "Stella Maris", slug: "stella-maris", coastOrder: 20, lat: -12.9403, lon: -38.3306, score: 86, wave: 1.6, period: 11, wind: 14, windDirection: "L", tide: 0.6, condition: "Bom",
    image: "/images/quipraia-stella-maris-hero-v1.png",
    surf: {
      isSurfSpot: true,
      bottomType: "Areia (beach break, bancos rasos)",
      bestSwellDirections: ["S", "SE", "L"],
      bestWindDirections: ["N", "NO", "O", "SO"],
      bestTideNote: "Funciona em quase todas as marés; fica fraca na maré muito baixa.",
      skillLevel: "Todos os níveis, pico clássico da região",
      skillLevelShort: "Todos os níveis",
      notes: "Onda oca, rápida e muito consistente (por volta de 150 dias de swell surfável por ano). Bancos de areia rasos exigem atenção. O vento costuma começar terral pela manhã e virar maral ao longo do dia.",
      source: "wannasurf.com/spot/South_America/Brazil/Bahia_North_Coast/stella_maris",
    },
  },
  {
    name: "Itapuã", slug: "itapua", coastOrder: 30, lat: -12.9535, lon: -38.3612, score: 64, wave: 1.1, period: 8, wind: 16, windDirection: "L", tide: 0.7, condition: "Regular",
    image: "/images/quipraia-itapua-v1.jpg", imagePosition: "center 60%",
    surf: {
      isSurfSpot: true,
      bottomType: "Areia na faixa principal; recifes distantes (outreefs) nos picos mais afastados",
      facingDegrees: 135,
      bestSwellDirections: ["SE", "S"],
      bestTideNote: "Na maré baixa formam-se piscinas naturais entre as pedras, que ficam protegidas mesmo com ondas quebrando mais longe.",
      skillLevel: "Intermediário na faixa principal; avançado/experiente nos outreefs e na Pedra que Ronca",
      skillLevelShort: "Intermediário",
      notes: "Pico Farol tem tubos de qualidade internacional em dias bons. Outreefs e Pedra que Ronca só quebram (e só valem a pena) em swells grandes, restritos a surfistas experientes.",
      source: "ondesurfar.com/praia/itapua-salvador; bahiaterra.com/posts/praia-do-surf-salvador-onde-surfar",
    },
  },
  {
    name: "Piatã", slug: "piata", coastOrder: 40, lat: -12.9552, lon: -38.3839, score: 61, wave: 0.9, period: 8, wind: 14, windDirection: "SE", tide: 0.8, condition: "Regular",
    image: "/images/quipraia-jaguaribe-v1.jpg",
    surf: {
      isSurfSpot: true,
      bottomType: "Areia, com quebra-mar de pedra natural",
      skillLevel: "Iniciante: ótima praia para aprender a surfar",
      skillLevelShort: "Iniciante",
      notes: "Ondas mais cheias e seguras; boa opção para quem está começando. Fontes consultadas não detalham maré ideal nem direção de swell/vento específica para este pico.",
      source: "bahiaterra.com/posts/praia-do-surf-salvador-onde-surfar; dicasdabahia.com.br/salvador/melhores-praias-para-surfar-em-salvador",
    },
  },
  {
    name: "Jaguaribe", slug: "jaguaribe", coastOrder: 50, lat: -12.9576, lon: -38.3898, score: 72, wave: 1.3, period: 9, wind: 13, windDirection: "NE", tide: 0.5, condition: "Bom",
    image: "/images/quipraia-jaguaribe-v1.jpg",
    surf: {
      isSurfSpot: true,
      bottomType: "Areia (beach break, vários picos)",
      skillLevel: "Iniciante a avançado: vários picos, boas ondas para quem está aprendendo",
      skillLevelShort: "Iniciante a avançado",
      notes: "Em dias de swell grande as ondas ficam mais fortes e técnicas. Fontes consultadas não detalham maré ideal nem direção de swell/vento específica para este pico.",
      source: "bahiaterra.com/posts/praia-do-surf-salvador-onde-surfar; dicasdabahia.com.br/salvador/melhores-praias-para-surfar-em-salvador",
    },
  },
  {
    name: "Patamares e Pituaçu", slug: "patamares-pituacu", coastOrder: 60, lat: -12.9649, lon: -38.4020, score: 55, wave: 0.8, period: 7, wind: 15, windDirection: "SE", tide: 0.7, condition: "Regular",
    image: "/images/quipraia-jaguaribe-v1.jpg", imagePosition: "center 65%",
    surf: {
      isSurfSpot: true,
      bottomType: "Pituaçu: recifes distantes (outreefs). Patamares: sem fonte confiável sobre o fundo.",
      bestSwellDirections: ["SE", "S"],
      skillLevel: "Pituaçu: avançado/experiente, só funciona com swell grande de SE/S. Patamares: sem fonte confiável. É conhecida principalmente como praia de família, sem pico de surf documentado.",
      skillLevelShort: "Avançado (Pituaçu) · sem dado (Patamares)",
      notes: "Este trecho reúne duas praias diferentes: o lado de Pituaçu tem recifes distantes que só quebram com swell grande; Patamares não aparece nas fontes consultadas como pico de surf.",
      source: "bahiaterra.com/posts/praia-do-surf-salvador-onde-surfar",
    },
  },
  {
    name: "Boca do Rio", slug: "boca-do-rio", coastOrder: 70, lat: -12.9822, lon: -38.4284, score: 47, wave: 0.6, period: 7, wind: 17, windDirection: "SE", tide: 0.6, condition: "Fraco",
    image: "/images/quipraia-jaguaribe-v1.jpg", imagePosition: "left center",
    surf: {
      isSurfSpot: true,
      bottomType: "Areia (beach break)",
      skillLevel: "Intermediário a avançado",
      skillLevelShort: "Intermediário/avançado",
      notes: "Pico Pescador: ondas mais cavadas e ocas. Pico Corsário: ondas mais longas, volumosas e consistentes. É o preferido dos locais. Atenção redobrada à qualidade da água, principalmente no trecho entre Rocky Point e Pescador.",
      source: "surfbahia.com.br/guia-ver/boca-do-rio",
    },
  },
  {
    name: "Amaralina", slug: "amaralina", coastOrder: 80, lat: -13.0146, lon: -38.4776, score: 58, wave: 0.9, period: 8, wind: 16, windDirection: "L", tide: 0.6, condition: "Regular",
    image: "/images/quipraia-itapua-v1.jpg",
    surf: {
      isSurfSpot: true,
      bottomType: "Misto: bancadas de pedra e areia",
      bestSwellDirections: ["S", "SE"],
      skillLevel: "Avançado / frequentado majoritariamente por locais",
      skillLevelShort: "Avançado",
      notes: "Pico principal Quebra-Coco tem direitas e esquerdas consistentes, com tubos. Outros picos da região: Coroa, Ô Tchê, Caraca, Balaio e Lavadeira.",
      source: "surfbahia.com.br/guia-ver/amaralina",
    },
  },
  {
    name: "Buracão", slug: "buracao", coastOrder: 90, lat: -13.0150, lon: -38.4833, score: 63, wave: 1.0, period: 8, wind: 15, windDirection: "L", tide: 0.6, condition: "Regular",
    image: "/images/quipraia-porto-da-barra-v1.jpg", imagePosition: "left center",
    surf: {
      isSurfSpot: false,
      notes: "Não é um pico de surf: é uma enseada abrigada por pedras vulcânicas no Rio Vermelho, com piscinas naturais formadas entre as pedras, indicada para banho tranquilo, não para ondas. Os números de onda/vento exibidos para esta praia usam o modelo regional e não representam um pico surfável.",
      source: "bahiaterra.com/posts/praia-do-buracao",
    },
  },
  {
    name: "Porto da Barra", slug: "porto-da-barra", coastOrder: 100, lat: -13.0032, lon: -38.5329, score: 41, wave: 0.4, period: 6, wind: 11, windDirection: "L", tide: 0.5, condition: "Fraco",
    image: "/images/quipraia-porto-da-barra-v1.jpg",
    surf: {
      isSurfSpot: true,
      bottomType: "Areia (shorebreak)",
      bestSwellDirections: ["S"],
      skillLevel: "Avançado, nos raros dias em que quebra forte",
      skillLevelShort: "Avançado (raro)",
      notes: "Fica dentro da Baía de Todos os Santos: no dia a dia o mar é calmo e protegido, sem ondas de surf. Só forma um shorebreak forte em eventos raros de swell grande de sul. Os picos de Farol da Barra e Espanhol, nas pedras/recifes próximos fora da baía, têm ondas mais consistentes, mas são tecnicamente outro pico.",
      source: "surfbahia.com.br/guia-ver/barra; bahiaterra.com/posts/praia-do-surf-salvador-onde-surfar",
    },
  },
];

export const featuredBeach = beaches.find((beach) => beach.slug === "stella-maris")!;
