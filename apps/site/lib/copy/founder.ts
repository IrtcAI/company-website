import type { Locale } from "../content";

export type OutsideIcon = "game" | "film" | "cats";

type StoryBlock = { kicker: string; text: string };
type OutsideCard = { icon: OutsideIcon; title: string; text: string };

type FounderCopy = {
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  role: string;
  intro: string;
  bio: string[];
  linkedinLabel: string;
  linkedinNewTab: string;
  storyTitle: string;
  storyTag: string;
  storyLead: string;
  story: StoryBlock[];
  storyClosing: string;
  outsideTitle: string;
  outsideIntro: string;
  outside: OutsideCard[];
  outsideFact: string;
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
      "Iago é formado em Sistemas de Informação e vive e trabalha em Belém, no Pará. Na IRTC, seu trabalho se organiza em três frentes: Cloud Engineering, Software Engineering e AI Engineering.",
      "A IRTC atende de forma remota, com conversa direta com quem vai usar o sistema.",
    ],
    linkedinLabel: "Iago no LinkedIn",
    linkedinNewTab: "abre em uma nova aba",
    storyTitle: "O engenheiro fora do expediente",
    storyTag: "Uma história com licença poética",
    storyLead:
      "O Iago tem uma teoria: quem aprende a ficar sem pressa diante de um chefe de fase impossível também aprende a ficar sem pressa diante de um sistema que não quer subir. A teoria nunca passou por laboratório, só pela sala de casa, em Belém.",
    story: [
      {
        kicker: "A fase difícil",
        text: "Existe um jogo que ele zerou depois de perder a conta das tentativas no mesmo chefe. Em algum momento parou de apertar botão e começou a observar o padrão dos golpes. Funcionou. É assim que encara um erro teimoso no trabalho: respira, observa, muda uma coisa por vez e tenta de novo.",
      },
      {
        kicker: "A temporada",
        text: "Série boa é roteiro em ciclos curtos. Cada episódio entrega um pedaço da história e deixa claro o que vem a seguir. Quando a família se junta para ver mais um capítulo, o Iago reconhece o método de casa: pouca coisa de cada vez, algo para mostrar no fim e um gancho para o próximo.",
      },
      {
        kicker: "As revisoras",
        text: "Juliette e Luna têm opinião sobre código. A Juliette prefere a revisão rápida: senta no teclado e apaga um bloco inteiro. A Luna é mais metódica: percorre as teclas de ponta a ponta e deixa um comentário em letras que ninguém entende. Nenhuma das duas aprovou um commit até hoje, mas nenhuma deixou de dar atenção. Ele agradece sempre: “Obrigado pela revisão, Luna.”",
      },
      {
        kicker: "A hora de desligar",
        text: "No fim do dia o notebook fecha. A sala escurece, a família escolhe um filme e ninguém pergunta de deploy. O Iago aprendeu que desligar também faz parte do trabalho, porque a cabeça descansada é a que acha o erro na manhã seguinte.",
      },
    ],
    storyClosing:
      "No dia seguinte ele volta à tela com a paciência do jogo, o ritmo da série, as duas revisoras de plantão e a cabeça descansada pelo filme. É esse engenheiro que conversa com você sobre o seu sistema.",
    outsideTitle: "Fora do código",
    outsideIntro:
      "O que enche a semana do Iago quando o notebook está fechado.",
    outside: [
      {
        icon: "game",
        title: "Videogame",
        text: "Treino de paciência, de ler padrões e de tentar de novo sem perder a calma.",
      },
      {
        icon: "film",
        title: "Filmes e séries",
        text: "Em família, de preferência. Histórias em ciclos curtos e a hora de desligar.",
      },
      {
        icon: "cats",
        title: "Juliette e Luna",
        text: "As duas gatas da casa, revisoras de código sem direito a aprovar nada.",
      },
    ],
    outsideFact:
      "Fora do trabalho, Iago gosta de jogar videogame, ver filmes e séries com a família e brincar com as duas gatas, Juliette e Luna. A história da página do fundador é uma narrativa leve, escrita com licença poética a partir desses hobbies.",
    expertiseTitle: "Áreas de atuação",
    expertiseIntro:
      "O trabalho de Iago na IRTC cobre as três frentes da empresa.",
    expertise: ["Cloud Engineering", "Software Engineering", "AI Engineering"],
    portraitAlt:
      "Retrato de Iago Rodrigues, fundador da IRTC, olhando para a câmera, com fundo claro",
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
      "Iago holds a degree in Information Systems and lives and works in Belém, Pará. At IRTC, his work is organized around three areas: Cloud Engineering, Software Engineering and AI Engineering.",
      "IRTC serves clients remotely, with direct conversation with the people who will use the system.",
    ],
    linkedinLabel: "Iago on LinkedIn",
    linkedinNewTab: "opens in a new tab",
    storyTitle: "The engineer after hours",
    storyTag: "A story with some poetic license",
    storyLead:
      "Iago has a theory: anyone who learns to stay unhurried in front of an impossible boss fight also learns to stay unhurried in front of a system that won't start. The theory never went through a lab, only through the living room at home in Belém.",
    story: [
      {
        kicker: "The hard level",
        text: "There is one game he finished after losing count of his attempts against the same boss. At some point he stopped mashing buttons and started watching the pattern of the attacks. It worked. That is how he handles a stubborn bug at work: breathe, observe, change one thing at a time and try again.",
      },
      {
        kicker: "The season",
        text: "A good series is a script in short cycles. Each episode delivers a piece of the story and makes clear what comes next. When the family gathers for one more chapter, Iago recognizes the method from work: a little at a time, something to show at the end and a hook for the next one.",
      },
      {
        kicker: "The reviewers",
        text: 'Juliette and Luna have opinions about code. Juliette likes the quick review: she sits on the keyboard and deletes a whole block. Luna is more methodical: she walks the keys from end to end and leaves a comment in letters nobody understands. Neither has approved a commit so far, but neither has ever stopped paying attention. He always thanks them: "Thanks for the review, Luna."',
      },
      {
        kicker: "Time to switch off",
        text: "At the end of the day the laptop closes. The living room goes dark, the family picks a movie and nobody asks about deploys. Iago learned that switching off is part of the job too, because the rested mind is the one that finds the bug the next morning.",
      },
    ],
    storyClosing:
      "The next day he returns to the screen with the patience of the game, the rhythm of the series, two reviewers on call and a mind rested by the movie. That is the engineer who talks with you about your system.",
    outsideTitle: "Outside the code",
    outsideIntro: "What fills Iago's week when the laptop is closed.",
    outside: [
      {
        icon: "game",
        title: "Video games",
        text: "Training in patience, in reading patterns and in trying again without losing calm.",
      },
      {
        icon: "film",
        title: "Movies and series",
        text: "With the family, preferably. Stories in short cycles and the time to switch off.",
      },
      {
        icon: "cats",
        title: "Juliette and Luna",
        text: "The two cats at home, code reviewers who are not allowed to approve anything.",
      },
    ],
    outsideFact:
      "Outside work, Iago likes playing video games, watching movies and series with the family and playing with the two cats, Juliette and Luna. The story on the founder page is a light narrative, written with poetic license from these hobbies.",
    expertiseTitle: "Areas of work",
    expertiseIntro: "Iago's work at IRTC covers the company's three areas.",
    expertise: ["Cloud Engineering", "Software Engineering", "AI Engineering"],
    portraitAlt:
      "Portrait of Iago Rodrigues, founder of IRTC, looking at the camera against a light background",
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
      "Iago es graduado en Sistemas de Información y vive y trabaja en Belém, en Pará. En IRTC, su trabajo se organiza en tres frentes: Cloud Engineering, Software Engineering y AI Engineering.",
      "IRTC atiende de forma remota, con conversación directa con quien va a usar el sistema.",
    ],
    linkedinLabel: "Iago en LinkedIn",
    linkedinNewTab: "se abre en una pestaña nueva",
    storyTitle: "El ingeniero fuera del horario",
    storyTag: "Una historia con licencia poética",
    storyLead:
      "Iago tiene una teoría: quien aprende a no tener prisa frente a un jefe de fase imposible también aprende a no tener prisa frente a un sistema que no quiere arrancar. La teoría nunca pasó por un laboratorio, solo por la sala de su casa, en Belém.",
    story: [
      {
        kicker: "La fase difícil",
        text: "Hay un juego que terminó después de perder la cuenta de los intentos contra el mismo jefe. En algún momento dejó de apretar botones y empezó a observar el patrón de los golpes. Funcionó. Así enfrenta un error terco en el trabajo: respira, observa, cambia una cosa por vez e intenta de nuevo.",
      },
      {
        kicker: "La temporada",
        text: "Una buena serie es un guion en ciclos cortos. Cada episodio entrega un pedazo de la historia y deja claro lo que viene después. Cuando la familia se junta para ver un capítulo más, Iago reconoce el método del trabajo: poco a la vez, algo para mostrar al final y un gancho para el siguiente.",
      },
      {
        kicker: "Las revisoras",
        text: "Juliette y Luna tienen opinión sobre el código. A Juliette le gusta la revisión rápida: se sienta en el teclado y borra un bloque entero. Luna es más metódica: recorre las teclas de punta a punta y deja un comentario en letras que nadie entiende. Ninguna aprobó un commit hasta hoy, pero ninguna dejó de prestar atención. Él siempre agradece: «Gracias por la revisión, Luna».",
      },
      {
        kicker: "La hora de desconectar",
        text: "Al final del día el portátil se cierra. La sala se oscurece, la familia elige una película y nadie pregunta por el deploy. Iago aprendió que desconectar también es parte del trabajo, porque la cabeza descansada es la que encuentra el error a la mañana siguiente.",
      },
    ],
    storyClosing:
      "Al día siguiente vuelve a la pantalla con la paciencia del juego, el ritmo de la serie, las dos revisoras de guardia y la cabeza descansada por la película. Ese es el ingeniero que conversa contigo sobre tu sistema.",
    outsideTitle: "Fuera del código",
    outsideIntro:
      "Lo que llena la semana de Iago cuando el portátil está cerrado.",
    outside: [
      {
        icon: "game",
        title: "Videojuegos",
        text: "Entrenamiento de paciencia, de leer patrones y de intentar de nuevo sin perder la calma.",
      },
      {
        icon: "film",
        title: "Películas y series",
        text: "En familia, de preferencia. Historias en ciclos cortos y la hora de desconectar.",
      },
      {
        icon: "cats",
        title: "Juliette y Luna",
        text: "Las dos gatas de la casa, revisoras de código sin permiso para aprobar nada.",
      },
    ],
    outsideFact:
      "Fuera del trabajo, a Iago le gusta jugar videojuegos, ver películas y series con la familia y jugar con las dos gatas, Juliette y Luna. La historia de la página del fundador es una narración ligera, escrita con licencia poética a partir de esos pasatiempos.",
    expertiseTitle: "Áreas de actuación",
    expertiseIntro:
      "El trabajo de Iago en IRTC cubre los tres frentes de la empresa.",
    expertise: ["Cloud Engineering", "Software Engineering", "AI Engineering"],
    portraitAlt:
      "Retrato de Iago Rodrigues, fundador de IRTC, mirando a la cámara, con fondo claro",
  },
};
