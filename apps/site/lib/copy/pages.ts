import type { Locale } from "../content";

type PageCopy = { title: string; description: string; heading?: string };

export const homeCopy: Record<
  Locale,
  { title: string; description: string; organization: string }
> = {
  "pt-BR": {
    title: "IRTC | Cloud, Software & AI Engineering",
    description:
      "Resolvemos problemas de negócio modernizando sistemas, construindo software e aplicando cloud e IA a fluxos com resultado verificável.",
    organization:
      "A IRTC é uma empresa de Cloud, Software & AI Engineering. Resolvemos problemas de negócio modernizando sistemas, construindo software e aplicando cloud e IA a fluxos com resultado verificável.",
  },
  en: {
    title: "IRTC | Cloud, Software & AI Engineering",
    description:
      "We solve business problems by modernizing systems, building software and applying cloud and AI to workflows with verifiable results.",
    organization:
      "IRTC is a Cloud, Software & AI Engineering company. We solve business problems by modernizing systems, building software and applying cloud and AI to workflows with verifiable results.",
  },
  es: {
    title: "IRTC | Cloud, Software & AI Engineering",
    description:
      "Resolvemos problemas de negocio modernizando sistemas, construyendo software y aplicando cloud e IA a flujos con resultado verificable.",
    organization:
      "IRTC es una empresa de Cloud, Software & AI Engineering. Resolvemos problemas de negocio modernizando sistemas, construyendo software y aplicando cloud e IA a flujos con resultado verificable.",
  },
};

export const founderJobTitle = "Founder & Principal Engineer";

export const pageCopy: Record<
  | "services"
  | "about"
  | "founder"
  | "culture"
  | "mission"
  | "vision"
  | "contact",
  Record<Locale, PageCopy>
> = {
  services: {
    "pt-BR": {
      title: "Serviços | IRTC",
      heading: "Serviços",
      description:
        "Cloud Engineering, Software Engineering e AI Engineering: oito serviços para modernizar sistemas, construir software e aplicar IA.",
    },
    en: {
      title: "Services | IRTC",
      heading: "Services",
      description:
        "Cloud Engineering, Software Engineering and AI Engineering: eight services to modernize systems, build software and apply AI.",
    },
    es: {
      title: "Servicios | IRTC",
      heading: "Servicios",
      description:
        "Cloud Engineering, Software Engineering y AI Engineering: ocho servicios para modernizar sistemas, construir software y aplicar IA.",
    },
  },
  about: {
    "pt-BR": {
      title: "Sobre a IRTC | Propósito, missão e visão",
      description:
        "Empresa de engenharia AI-native de Belém, no Pará. Nosso propósito, missão, visão e valores, e como trabalhamos.",
    },
    en: {
      title: "About IRTC | Purpose, mission and vision",
      description:
        "AI-native engineering company from Belém, Brazil. Our purpose, mission, vision and values, and how we work.",
    },
    es: {
      title: "Sobre IRTC | Propósito, misión y visión",
      description:
        "Empresa de ingeniería AI-native de Belém, Brasil. Nuestro propósito, misión, visión y valores, y cómo trabajamos.",
    },
  },
  founder: {
    "pt-BR": {
      title: "Iago Rodrigues, fundador | IRTC",
      description:
        "Conheça Iago Rodrigues, Founder & Principal Engineer da IRTC, e as três frentes de engenharia da empresa.",
    },
    en: {
      title: "Iago Rodrigues, founder | IRTC",
      description:
        "Meet Iago Rodrigues, Founder & Principal Engineer at IRTC, and the three engineering areas of the company.",
    },
    es: {
      title: "Iago Rodrigues, fundador | IRTC",
      description:
        "Conoce a Iago Rodrigues, Founder & Principal Engineer de IRTC, y las tres áreas de ingeniería de la empresa.",
    },
  },
  culture: {
    "pt-BR": {
      title: "Cultura | IRTC",
      description:
        "Como a IRTC trabalha no dia a dia: cinco práticas, valores e uma operação AI-native em que agentes ajudam e pessoas respondem pelas entregas.",
    },
    en: {
      title: "Culture | IRTC",
      description:
        "How IRTC works day to day: five practices, values and an AI-native operation where agents help and people answer for the deliveries.",
    },
    es: {
      title: "Cultura | IRTC",
      description:
        "Cómo trabaja IRTC día a día: cinco prácticas, valores y una operación AI-native donde los agentes ayudan y las personas responden por las entregas.",
    },
  },
  mission: {
    "pt-BR": {
      title: "Missão | IRTC",
      description:
        "Resolver problemas de negócio projetando, construindo, modernizando e operando sistemas de cloud, software e IA. Veja o percurso do primeiro contato à evolução.",
    },
    en: {
      title: "Mission | IRTC",
      description:
        "To solve business problems by designing, building, modernizing and operating cloud, software and AI systems. See the path from first contact to evolution.",
    },
    es: {
      title: "Misión | IRTC",
      description:
        "Resolver problemas de negocio diseñando, construyendo, modernizando y operando sistemas de cloud, software e IA. Mira el recorrido desde el primer contacto hasta la evolución.",
    },
  },
  vision: {
    "pt-BR": {
      title: "Visão | IRTC",
      description:
        "Ser uma referência de engenharia nascida na Amazônia, que torna cloud, software e IA acessíveis a empresas de diferentes portes.",
    },
    en: {
      title: "Vision | IRTC",
      description:
        "To be an engineering reference born in the Amazon, making cloud, software and AI accessible to companies of different sizes.",
    },
    es: {
      title: "Visión | IRTC",
      description:
        "Ser una referencia de ingeniería nacida en la Amazonia, que hace accesibles cloud, software e IA a empresas de diferentes tamaños.",
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
