// Central de configuração da página de upsell Elevare English.
// Campos null / [] estão PENDENTES: a página mostra avisos de prévia no lugar
// deles e os oculta quando previewMode = false. Não preencha com URLs fictícias.

export type MediaItem = { src: string; alt: string };
export type VideoConfig = {
  /** URL de arquivo (.mp4/.webm) ou de embed (YouTube/Vimeo/Panda etc.). */
  src: string | null;
  kind: "file" | "embed";
  poster: string | null;
  orientation: "vertical" | "horizontal"; // 9:16 ou 16:9
};
export type Testimonial =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; kind: "file" | "embed"; title: string }
  | { type: "text"; quote: string; author: string };

export const upsell = {
  /** true = prévia de edição: mostra marcadores de campos pendentes. Não publicar enquanto true. */
  previewMode: true,

  product: {
    name: "Elevare English",
    lessons: 183,
    modules: 14,
    materials: 352,
    accessMonths: 12,
    price: "R$37,90",
  },

  vsl: { src: null, kind: "embed", poster: null, orientation: "vertical" } as VideoConfig,
  demoVideo: { src: null, kind: "embed", poster: null, orientation: "horizontal" } as VideoConfig,
  platformScreenshots: [] as MediaItem[],
  materialSamples: [] as MediaItem[],
  testimonials: [] as Testimonial[],

  checkout: {
    /** "redirect" = link de checkout; "one-click" = upsell de 1 clique (exige autorização explícita). */
    mode: null as "redirect" | "one-click" | null,
    url: null as string | null,
  },
  declineUrl: null as string | null,

  /** Textos só devem ser preenchidos com condições reais informadas pelo responsável. */
  renewalTerms: null as string | null,
  deliveryInfo: null as string | null,
  guarantee: null as string | null,
  supportInfo: null as string | null,

  links: {
    support: null as string | null,
    terms: null as string | null,
    privacy: null as string | null,
  },
};

export const isHttps = (u: string | null | undefined): u is string =>
  !!u && u.startsWith("https://");