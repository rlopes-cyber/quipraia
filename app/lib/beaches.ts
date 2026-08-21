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
};

export const beaches: Beach[] = [
  { name: "Praia do Flamengo", slug: "praia-do-flamengo", coastOrder: 10, lat: -12.9288, lon: -38.3180, score: 78, wave: 1.4, period: 10, wind: 12, windDirection: "L", tide: 0.7, condition: "Bom" },
  { name: "Stella Maris", slug: "stella-maris", coastOrder: 20, lat: -12.9403, lon: -38.3306, score: 86, wave: 1.6, period: 11, wind: 14, windDirection: "L", tide: 0.6, condition: "Bom" },
  { name: "Itapuã", slug: "itapua", coastOrder: 30, lat: -12.9535, lon: -38.3612, score: 64, wave: 1.1, period: 8, wind: 16, windDirection: "L", tide: 0.7, condition: "Regular" },
  { name: "Piatã", slug: "piata", coastOrder: 40, lat: -12.9552, lon: -38.3839, score: 61, wave: 0.9, period: 8, wind: 14, windDirection: "SE", tide: 0.8, condition: "Regular" },
  { name: "Jaguaribe", slug: "jaguaribe", coastOrder: 50, lat: -12.9576, lon: -38.3898, score: 72, wave: 1.3, period: 9, wind: 13, windDirection: "NE", tide: 0.5, condition: "Bom" },
  { name: "Patamares e Pituaçu", slug: "patamares-pituacu", coastOrder: 60, lat: -12.9649, lon: -38.4020, score: 55, wave: 0.8, period: 7, wind: 15, windDirection: "SE", tide: 0.7, condition: "Regular" },
  { name: "Boca do Rio", slug: "boca-do-rio", coastOrder: 70, lat: -12.9822, lon: -38.4284, score: 47, wave: 0.6, period: 7, wind: 17, windDirection: "SE", tide: 0.6, condition: "Fraco" },
  { name: "Amaralina", slug: "amaralina", coastOrder: 80, lat: -13.0146, lon: -38.4776, score: 58, wave: 0.9, period: 8, wind: 16, windDirection: "E", tide: 0.6, condition: "Regular" },
  { name: "Buracão", slug: "buracao", coastOrder: 90, lat: -13.0150, lon: -38.4833, score: 63, wave: 1.0, period: 8, wind: 15, windDirection: "E", tide: 0.6, condition: "Regular" },
  { name: "Porto da Barra", slug: "porto-da-barra", coastOrder: 100, lat: -13.0032, lon: -38.5329, score: 41, wave: 0.4, period: 6, wind: 11, windDirection: "E", tide: 0.5, condition: "Fraco" },
];

export const featuredBeach = beaches.find((beach) => beach.slug === "stella-maris")!;
