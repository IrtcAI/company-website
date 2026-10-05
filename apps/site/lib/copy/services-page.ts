import type { Locale } from "../content";
import type { PillarId } from "../services";

export const servicesPageCopy: Record<
  Locale,
  {
    breadcrumbHome: string;
    breadcrumbServices: string;
    intro: string;
    gridTitle: string;
    cardCta: string;
    allServicesCta: string;
    techNoteTitle: string;
    techNoteText: string;
    whenTitle: string;
    whatTitle: string;
    howTitle: string;
    techTitle: string;
    faqTitle: string;
    relatedTitle: string;
    measureTitle: string;
    measureNote: string;
    pillarLabel: string;
    supportPillarLabel: string;
    pillarText: Record<PillarId, string>;
    continuity: { label: string; name: string; text: string; cta: string };
  }
> = {
  "pt-BR": {
    breadcrumbHome: "Início",
    breadcrumbServices: "Serviços",
    intro:
      "Cada projeto começa pelo problema, não pela tecnologia. Os oito serviços abaixo estão organizados em três pilares de engenharia: Cloud Engineering, Software Engineering e AI Engineering.",
    gridTitle: "O que fazemos",
    cardCta: "Ver serviço",
    allServicesCta: "Ver todos os serviços",
    techNoteTitle: "A tecnologia é escolhida por projeto.",
    techNoteText:
      "Não vendemos uma stack fixa. Escolhemos as ferramentas depois de entender o seu problema, o orçamento e como o sistema precisa crescer. Estas são algumas das que usamos com frequência.",
    whenTitle: "Quando você precisa disso",
    whatTitle: "O que você recebe",
    howTitle: "Como trabalhamos",
    techTitle: "Tecnologias que costumamos usar aqui",
    faqTitle: "Perguntas frequentes",
    relatedTitle: "Serviços relacionados",
    measureTitle: "Como medimos o resultado",
    measureNote:
      "Estes são critérios que o projeto define com você no início. Servem de objetivo e de forma de verificar o trabalho, não de resultado garantido.",
    pillarLabel: "Pilar",
    supportPillarLabel: "Com apoio de",
    pillarText: {
      cloud:
        "Ambientes na nuvem que ficam no ar, aguentam o crescimento e têm o custo acompanhado. Nosso foco técnico é a AWS, a nuvem da Amazon.",
      software:
        "Sistemas, sites, aplicativos e integrações que sua equipe e seus usuários usam no dia a dia, incluindo a atualização de sistemas antigos.",
      ai: "IA aplicada ao conhecimento e aos processos da empresa, com tarefa definida, avaliação de qualidade e controle de acesso e custo.",
    },
    continuity: {
      label: "Continuidade",
      name: "Continuous Engineering",
      text: "Depois da entrega, os sistemas continuam mudando. Continuous Engineering é o modelo de continuidade dos três pilares: evolução, otimização, confiabilidade e modernização. Escopo, cadência e atendimento são definidos conforme a operação.",
      cta: "Conversar sobre continuidade",
    },
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    intro:
      "Every project starts with the problem, not the technology. The eight services below are organized into three engineering pillars: Cloud Engineering, Software Engineering and AI Engineering.",
    gridTitle: "What we do",
    cardCta: "View service",
    allServicesCta: "See all services",
    techNoteTitle: "Technology is chosen per project.",
    techNoteText:
      "We don't sell a fixed stack. We choose tools after understanding your problem, your budget and how the system needs to grow. These are some of the ones we use often.",
    whenTitle: "When you need this",
    whatTitle: "What you get",
    howTitle: "How we work",
    techTitle: "Technologies we often use here",
    faqTitle: "Frequently asked questions",
    relatedTitle: "Related services",
    measureTitle: "How we measure the result",
    measureNote:
      "These are criteria the project defines with you at the start. They serve as a goal and a way to check the work, not as a guaranteed result.",
    pillarLabel: "Pillar",
    supportPillarLabel: "Supported by",
    pillarText: {
      cloud:
        "Cloud environments that stay up, hold up as you grow and have their cost tracked. Our technical focus is AWS, Amazon's cloud.",
      software:
        "Systems, websites, apps and integrations that your team and users rely on every day, including updating older systems.",
      ai: "AI applied to a company's knowledge and processes, with a defined task, quality evaluation and control over access and cost.",
    },
    continuity: {
      label: "Continuity",
      name: "Continuous Engineering",
      text: "After delivery, systems keep changing. Continuous Engineering is the continuity model for all three pillars: evolution, optimization, reliability and modernization. Scope, cadence and support are set according to the operation.",
      cta: "Talk about continuity",
    },
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbServices: "Servicios",
    intro:
      "Cada proyecto empieza por el problema, no por la tecnología. Los ocho servicios de abajo están organizados en tres pilares de ingeniería: Cloud Engineering, Software Engineering y AI Engineering.",
    gridTitle: "Qué hacemos",
    cardCta: "Ver servicio",
    allServicesCta: "Ver todos los servicios",
    techNoteTitle: "La tecnología se elige por proyecto.",
    techNoteText:
      "No vendemos una tecnología fija. Elegimos las herramientas después de entender tu problema, tu presupuesto y cómo necesita crecer el sistema. Estas son algunas de las que usamos con frecuencia.",
    whenTitle: "Cuándo necesitas esto",
    whatTitle: "Qué recibes",
    howTitle: "Cómo trabajamos",
    techTitle: "Tecnologías que solemos usar aquí",
    faqTitle: "Preguntas frecuentes",
    relatedTitle: "Servicios relacionados",
    measureTitle: "Cómo medimos el resultado",
    measureNote:
      "Son criterios que el proyecto define contigo al inicio. Sirven como objetivo y como forma de verificar el trabajo, no como resultado garantizado.",
    pillarLabel: "Pilar",
    supportPillarLabel: "Con apoyo de",
    pillarText: {
      cloud:
        "Entornos en la nube que se mantienen en línea, aguantan el crecimiento y tienen el costo seguido. Nuestro foco técnico es AWS, la nube de Amazon.",
      software:
        "Sistemas, sitios, aplicaciones e integraciones que tu equipo y tus usuarios usan todos los días, incluida la actualización de sistemas antiguos.",
      ai: "IA aplicada al conocimiento y a los procesos de la empresa, con tarea definida, evaluación de calidad y control de acceso y costo.",
    },
    continuity: {
      label: "Continuidad",
      name: "Continuous Engineering",
      text: "Después de la entrega, los sistemas siguen cambiando. Continuous Engineering es el modelo de continuidad de los tres pilares: evolución, optimización, confiabilidad y modernización. El alcance, la cadencia y la atención se definen según la operación.",
      cta: "Conversar sobre continuidad",
    },
  },
};
