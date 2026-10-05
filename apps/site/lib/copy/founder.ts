import type { Locale } from "../content";

type FounderCopy = {
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  role: string;
  intro: string;
  bio: string[];
  expertiseTitle: string;
  expertiseIntro: string;
  expertise: string[];
  portraitAlt: string;
};

export const founderCopy: Record<Locale, FounderCopy> = {
  "pt-BR": {
    breadcrumbLabel: "Trilha de navegação",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Fundador",
    eyebrow: "Fundador da IRTC",
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues é o fundador da IRTC e atua como Founder & Principal Engineer. Sua trajetória em desenvolvimento, arquitetura e liderança técnica participa do trabalho da empresa.",
    bio: [
      "Iago é formado em Sistemas de Informação. Na IRTC, seu trabalho se organiza em três frentes: Cloud Engineering, Software Engineering e AI Engineering.",
      "A IRTC opera em Belém, no Pará, e atende de forma remota, com conversa direta com quem vai usar o sistema.",
    ],
    expertiseTitle: "Áreas de atuação",
    expertiseIntro:
      "O trabalho de Iago na IRTC cobre as três frentes da empresa.",
    expertise: ["Cloud Engineering", "Software Engineering", "AI Engineering"],
    portraitAlt: "Retrato de Iago Rodrigues, fundador da IRTC",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Founder",
    eyebrow: "Founder of IRTC",
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues is the founder of IRTC and works as Founder & Principal Engineer. His background in development, architecture and technical leadership is part of the company's work.",
    bio: [
      "Iago holds a degree in Information Systems. At IRTC, his work is organized around three areas: Cloud Engineering, Software Engineering and AI Engineering.",
      "IRTC operates from Belém, Pará, and serves clients remotely, with direct conversation with the people who will use the system.",
    ],
    expertiseTitle: "Areas of work",
    expertiseIntro: "Iago's work at IRTC covers the company's three areas.",
    expertise: ["Cloud Engineering", "Software Engineering", "AI Engineering"],
    portraitAlt: "Portrait of Iago Rodrigues, founder of IRTC",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Fundador",
    eyebrow: "Fundador de IRTC",
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues es el fundador de IRTC y trabaja como Founder & Principal Engineer. Su trayectoria en desarrollo, arquitectura y liderazgo técnico forma parte del trabajo de la empresa.",
    bio: [
      "Iago es graduado en Sistemas de Información. En IRTC, su trabajo se organiza en tres frentes: Cloud Engineering, Software Engineering y AI Engineering.",
      "IRTC opera desde Belém, en Pará, y atiende de forma remota, con conversación directa con quien va a usar el sistema.",
    ],
    expertiseTitle: "Áreas de actuación",
    expertiseIntro:
      "El trabajo de Iago en IRTC cubre los tres frentes de la empresa.",
    expertise: ["Cloud Engineering", "Software Engineering", "AI Engineering"],
    portraitAlt: "Retrato de Iago Rodrigues, fundador de IRTC",
  },
};
