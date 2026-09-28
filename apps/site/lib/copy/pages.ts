import type { Locale } from "../content";

type PageCopy = { title: string; description: string; heading?: string };

export const pageCopy: Record<
  "services" | "about" | "founder" | "contact",
  Record<Locale, PageCopy>
> = {
  services: {
    "pt-BR": {
      title: "Serviços | IRTC",
      heading: "Serviços",
      description:
        "Software sob medida, sites, aplicativos, integrações, IA, dados e nuvem. Conheça os serviços da IRTC, de Belém para o mundo.",
    },
    en: {
      title: "Services | IRTC",
      heading: "Services",
      description:
        "Custom software, websites, mobile apps, integrations, AI, data and cloud. See what IRTC builds, from Belém to the world.",
    },
    es: {
      title: "Servicios | IRTC",
      heading: "Servicios",
      description:
        "Software a medida, sitios, aplicaciones, integraciones, IA, datos y nube. Conoce los servicios de IRTC, desde Belém para el mundo.",
    },
  },
  about: {
    "pt-BR": {
      title: "Sobre a IRTC | Cultura e visão",
      description:
        "Uma fábrica de software de Belém do Pará. Como trabalhamos, no que acreditamos e aonde queremos chegar.",
    },
    en: {
      title: "About IRTC | Culture and vision",
      description:
        "A software company from Belém, Brazil. How we work, what we believe in and where we are going.",
    },
    es: {
      title: "Sobre IRTC | Cultura y visión",
      description:
        "Una fábrica de software de Belém, Brasil. Cómo trabajamos, en qué creemos y hacia dónde vamos.",
    },
  },
  founder: {
    "pt-BR": {
      title: "Iago Rodrigues, fundador | IRTC",
      description:
        "Conheça Iago Rodrigues, fundador da IRTC: arquitetura de software, produtos web e mobile, integrações e engenharia de IA.",
    },
    en: {
      title: "Iago Rodrigues, founder | IRTC",
      description:
        "Meet Iago Rodrigues, founder of IRTC: software architecture, web and mobile products, integrations and AI engineering.",
    },
    es: {
      title: "Iago Rodrigues, fundador | IRTC",
      description:
        "Conoce a Iago Rodrigues, fundador de IRTC: arquitectura de software, productos web y móviles, integraciones e ingeniería de IA.",
    },
  },
  contact: {
    "pt-BR": {
      title: "Contato | IRTC",
      description:
        "Conte sua ideia para a IRTC. Formulário, e-mail, endereço em Belém e a Iris, nossa assistente, para ajudar a organizar o primeiro passo.",
    },
    en: {
      title: "Contact | IRTC",
      description:
        "Tell IRTC about your idea. Contact form, email, our Belém address and Iris, our assistant, to help shape the first step.",
    },
    es: {
      title: "Contacto | IRTC",
      description:
        "Cuéntale tu idea a IRTC. Formulario, correo, dirección en Belém e Iris, nuestra asistente, para ordenar el primer paso.",
    },
  },
};
