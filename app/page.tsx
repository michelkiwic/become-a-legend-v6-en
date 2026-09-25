"use client";

import { useEffect, useRef, useState } from "react";

type Category = {
  id: string;
  name: string;
  point: { x: number; y: number };
  outline: string;
  hitOutline?: string;
  frameOutline?: string;
  detailSrc: string;
  backgroundSrc?: string;
  closeup?: {
    src: string;
    alt: string;
  };
};

type DetailSection = {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
};

type DetailContent = {
  number?: string;
  kicker: string;
  spec?: string;
  title: string;
  sections: DetailSection[];
};

const categories: Category[] = [
  {
    id: "01",
    name: "BLA BLAA BLAA",
    point: { x: 18.7, y: 56 },
    detailSrc: "closeup-u1-cutout.png",
    closeup: {
      src: "closeup-u1-white.webp",
      alt: "Close-up of a pale Bla-Bla-Bla figure with paper ribbons",
    },
    outline:
      "M3 39 C9 34 17 32 23 37 C28 43 31 58 30 66 C28 73 18 75 8 73 C3 70 1 61 3 39 Z",
  },
  {
    id: "02",
    name: "DANCE DOLLS",
    point: { x: 33.1, y: 57.4 },
    detailSrc: "closeup-u2-white.webp",
    closeup: {
      src: "closeup-u2-white.webp",
      alt: "Close-up of a suspended Movement-Dancer with a black head and knitted costume",
    },
    outline:
      "M25 36 C30 34 38 34 40 39 C42 48 43 63 41 68 C37 73 29 72 26 68 C24 60 22 46 25 36 Z",
  },
  {
    id: "03",
    name: "YOSHINI + MOSHINI",
    point: { x: 47.2, y: 71.9 },
    detailSrc: "closeup-u3-white.webp",
    closeup: {
      src: "closeup-u3-white.webp",
      alt: "Close-up of a Big Heads sculpture with black vessels and a pale spherical face",
    },
    outline:
      "M37 59 C42 55 52 55 55 59 C58 65 58 77 54 81 C49 84 40 82 37 79 C34 73 34 64 37 59 Z",
  },
  {
    id: "04",
    name: "THE ENSEMBLE",
    point: { x: 74, y: 66.6 },
    detailSrc: "closeup-u4-cutout.png",
    backgroundSrc: "ensemble-background.jpg",
    closeup: {
      src: "closeup-u4-white.webp",
      alt: "Close-up of a seated black Performer holding a pale wooden figure",
    },
    outline:
      "M67 56 C73 52 83 52 87 57 C89 64 90 75 86 79 C80 83 70 81 67 77 C64 71 63 62 67 56 Z",
    hitOutline:
      "M68 40 C72 37 78 38 81 42 C83 49 82 57 83 64 C84 72 82 81 78 84 C74 87 69 84 67 80 C66 72 67 65 66 57 C65 50 66 44 68 40 Z",
    frameOutline:
      "M68 40 C72 37 78 38 81 42 C83 49 82 57 83 64 C84 72 82 81 78 84 C74 87 69 84 67 80 C66 72 67 65 66 57 C65 50 66 44 68 40 Z",
  },
  {
    id: "05",
    name: "THE AUDIENCE",
    point: { x: 61.2, y: 69.4 },
    detailSrc: "closeup-u5-white.webp",
    backgroundSrc: "audience-background.webp",
    closeup: {
      src: "closeup-u5-white.webp",
      alt: "Close-up of a suspended pale wooden rebel with black and silver costume",
    },
    outline:
      "M58 58 C61 55 67 55 69 58 C71 62 69 67 72 69 C76 71 81 70 84 73 C86 77 85 81 82 83 C75 84 67 83 60 83 C57 82 55 80 55 76 C55 72 56 69 55 66 C54 63 56 60 58 58 Z",
    hitOutline:
      "M58 58 C61 55 67 55 69 58 C71 62 69 67 72 69 C76 71 81 70 84 73 C86 77 85 81 82 83 C75 84 67 83 60 83 C57 82 55 80 55 76 C55 72 56 69 55 66 C54 63 56 60 58 58 Z",
    frameOutline:
      "M58 58 C61 55 67 55 69 58 C71 62 69 67 72 69 C76 71 81 70 84 73 C86 77 85 81 82 83 C75 84 67 83 60 83 C57 82 55 80 55 76 C55 72 56 69 55 66 C54 63 56 60 58 58 Z",
  },
  {
    id: "06",
    name: "THE FOURTH WALL",
    point: { x: 64.5, y: 49.3 },
    detailSrc: "yoshi-moshi-model-stage-light.png",
    outline:
      "M56.2 46.7 C58.1 45.5 60.7 46.2 62.7 45.7 C65.1 46.3 67.1 45.9 67.6 48.2 C67.1 50.5 67.9 52.8 67.1 55.5 C65.3 57.2 62.9 56.5 60.7 57.1 C58.4 56.4 56.1 57.2 55.8 54.6 C56.4 52.3 55.6 49.3 56.2 46.7 Z",
    frameOutline:
      "M56 40 C59 38.5 65.5 38.8 68.5 40.5 C70.3 45 70 55 68.8 60 C66 63 59 63 56.5 60 C54.8 55 54.8 45 56 40 Z",
  },
  {
    id: "07",
    name: "FILMS & PERFORMANCES",
    point: { x: 47, y: 54.8 },
    detailSrc: "yoshi-moshi-model-stage-light.png",
    outline:
      "M43.2 48.6 C45 47.5 47.2 48.2 49 47.7 C51.2 48.4 53.5 47.5 54.8 48.7 C55.5 51.1 54.7 53.4 55.2 55.5 C54.4 57.7 51.8 58.4 49.6 58.1 C47.3 58.8 44.4 58.2 43.1 56.8 C42.5 54.4 43.4 51.4 43.2 48.6 Z",
    frameOutline:
      "M42 41 C45 39.5 52 39.8 54.5 41.5 C56.5 46 56.2 57 54.8 61.5 C52 64 45 64 42.5 61.5 C40.5 57 40.5 46 42 41 Z",
  },
  {
    id: "08",
    name: "Texts",
    point: { x: 86.6, y: 64.2 },
    detailSrc: "yoshi-moshi-model-stage-light.png",
    outline:
      "M83.7 57.5 C85 56.8 87.3 57.2 88.7 58.2 C89.3 61.6 89.2 67.2 88.3 70 C86.8 70.9 84.6 70.6 83.6 69.3 C83 66.1 83.1 60.3 83.7 57.5 Z",
    hitOutline:
      "M80.5 54.2 C83.3 52.4 88.1 52.9 90.8 55 C92.3 59.4 92 68.2 90.2 73 C87.2 74.9 82.5 74.2 80.7 71.5 C79.2 66.6 79.2 58.5 80.5 54.2 Z",
    frameOutline:
      "M80.5 54.2 C83.3 52.4 88.1 52.9 90.8 55 C92.3 59.4 92 68.2 90.2 73 C87.2 74.9 82.5 74.2 80.7 71.5 C79.2 66.6 79.2 58.5 80.5 54.2 Z",
  },
];

const utilityCategories = [
  { id: "09", name: "Finances", detailId: "finances" },
  { id: "10", name: "Inventory", detailId: "inventory" },
  { id: "11", name: "Contact", detailId: "contacts" },
];

const videoWallClipOrder = [1, 2, 9, 4, 5, 6, 7, 8, 3, 10, 11, 12];
const videoWallClips = videoWallClipOrder.map(
  (clipNumber) => `video-wall/clip-${String(clipNumber).padStart(2, "0")}.webm`,
);

const fourthWallStillImages = [
  "closeup-u1.webp",
  "closeup-u2.webp",
  "closeup-u3.webp",
  "closeup-u4-white.webp",
  "closeup-u5-white.webp",
  "closeup-u6.webp",
];

const detailContent: Record<string, DetailContent> = {
  "01": {
    number: "01",
    kicker: "More content = less meaning",
    spec: "Sculptures, diameter 30 cm",
    title: "Bla Blaa Blaa",
    sections: [
      {
        paragraphs: [
          "White head sculptures hang on the wall. Endless strips of white paper pour from their mouths, fall to the floor and grow into a white mountain: produced, distributed, forgotten. An incessant stream of information, steadily expanding as meaning begins to disappear.",
          "Bla Blaa Blaa recalls the fountains of Baroque gardens, where water became a symbol of power, abundance and spectacle.",
          "Flaubert was already preoccupied with the absurd abundance of human knowledge. In Bouvard et Pécuchet, his two protagonists tirelessly collect, copy and organise knowledge, only to lose themselves in it. With Yoshi + Moshi, this contradiction becomes a spatial image.",
        ],
      },
    ],
  },
  "02": {
    number: "02",
    kicker: "No movement = no legend",
    spec: "Sculptures, height 60 – 70 cm",
    title: "Dance Dolls",
    sections: [
      {
        paragraphs: [
          "The Dance Dolls move in subtle rotations through space. They are never entirely still. The slightest vibration, a current of air or the presence of a body is enough to set them in motion. Their movements follow no predetermined choreography, but emerge from an interplay of material, gravity and space. Each movement leads to another state, each shift to a new balance. The Dance Dolls resist stillness: they respond, drift and continually find new postures. Movement becomes not a spectacle, but a quiet and persistent form of transformation.",
          "For centuries, the dancing body has embodied freedom, ecstasy and transformation in art – from the elemental circle of Matisse’s Dance to the shifting languages of modern dance.",
        ],
      },
    ],
  },
  "03": {
    number: "03",
    kicker: "Big ego = big legend",
    spec: "Sculptures, height 68 cm",
    title: "Yoshini + Moshini",
    sections: [
      {
        paragraphs: [
          "Yoshi + Moshi are superheroes and antiheroes at once. And because that apparently isn’t quite enough, they also create their own likenesses.",
          "With Yoshini + Moshini, they take the fascination with their own reflection to the point of absurdity. Like Narcissus, Yoshi + Moshi contemplate themselves, except that contemplation alone is not enough. They reproduce themselves, play with themselves and become the audience of their own legend.",
          "Yet Yoshini + Moshini are, after all, rod puppets, built around a simple wooden skeleton. A basic structure from which any possible self can emerge. No superpowers, no pose, no heroism. Yoshi + Moshi move them, stage them and play with them.",
        ],
      },
    ],
  },
  "04": {
    number: "04",
    kicker: "Less me = more us",
    spec: "Sculptures, height 75 – 100 cm",
    title: "The Ensemble",
    sections: [
      {
        paragraphs: [
          "The Ensemble brings a multitude of rod-puppet sculptures together on a shared stage. None claims the centre for itself. In this installation, group formations, encounters and interactions dominate, creating an evocative interplay. Theatre has known this power since its beginnings: from the chorus of Greek tragedy to modern ensemble theatre. Meaning emerges not from the protagonist alone, but between the figures – through proximity and distance, play and conflict, leading and being led.",
          "The Ensemble counters the narcissism of the individual with the power of the collective. The rod puppet, traditionally a symbol of being guided, becomes part of a collective interplay. It is not the individual who determines what happens, but the relationships between many. Legends, too, are not created alone. They need counterparts, fellow players, friction and resonance.",
        ],
      },
    ],
  },
  "05": {
    number: "05",
    kicker: "No audience = no story",
    spec: "Sculptures, height 30-40 cm",
    title: "The Audience",
    sections: [
      {
        paragraphs: [
          "A legend without an audience is no legend – there is no one to tell its story.",
          "The Audience consists of one-eyed sculptures on wheels. Watching and moving are part of their nature. They frequently shift perspective, move closer, drift away again – and see only part of the whole. In theatre, boundless worlds can unfold through performance. Without an audience, however, the performance cannot come alive.",
        ],
      },
    ],
  },
  "06": {
    number: "06",
    kicker: "Watching = being watched",
    title: "The Fourth Wall",
    sections: [
      {
        paragraphs: [
          "Who is watching whom?",
          "In traditional theatre, the invisible fourth wall separates the stage from the audience, performance from reality. The performers on stage act as if the audience were not there. In the video projection The Fourth Wall, this direction of gaze is reversed: the Big Heads look out from the image into the exhibition space, observing the installation and the visitors moving through it.",
          "But who are the real protagonists here? Yoshi + Moshi, the eighteen other Big Heads – or the visitors, who themselves become the observed?",
          "The projection comes alive through the appearance and disappearance of the Big Heads. Suddenly, Yoshi + Moshi appear on the screen. For a moment, they take over the ‘stage’, gaze into the exhibition space and disappear again. The eighteen Big Heads then return and resume their silent observation.",
          "Here, the fourth wall no longer separates two worlds. It becomes permeable, connecting the space of the image with the exhibition space, artwork with audience. Watching and being watched begin to mirror one another.",
        ],
      },
    ],
  },
  "07": {
    number: "07",
    kicker: "No words = full story",
    title: "Films & Performances",
    sections: [
      {
        paragraphs: [
          "Yoshi + Moshi do not speak. In their films and performances, the world is their stage. They travel, encounter people, find themselves in comic situations, play, repeat, fail, disappear and reappear. They explain nothing. They are simply there, marvelling.",
          "In doing so, Yoshi + Moshi stand within a long tradition of performance, theatre and film in which bodies, gestures and actions can tell stories differently from words. At the same time, they recall the great comic duos of film history: two figures, one world and endless possibilities for misunderstanding.",
          "The distinction between what is staged and what is real becomes irrelevant. Because Yoshi + Moshi do not play at being legends: they live their own legend.",
        ],
      },
      {
        heading: "Performances",
        items: [
          "TRIBUTE including Severin Hofer, Gallery Billing, Baar (CH)",
          "Occupy Superba, Galata – Museo del Mare, Genoa (IT)",
          "The Comeback Tour, Piazza dei Greci, Genoa (IT)",
          "Universo Immersivo, Nidwalden Art Museum, Stans (CH)",
          "IDÉE REÇUE, MACT/CACT Museo d’Arte Contemporanea Ticino, Bellinzona (CH)",
          "Movie World Tour, Bar Delle Vigne, Genoa (IT)",
          "Last Supper, gallery Weiertal, Winterthur (CH)",
          "A feast for Yoshi + Moshi, Cabaret Voltaire, Zurich (CH)",
          "A feast for Yoshi + Moshi, gallery of contemporary art of Lucerne (CH)",
          "The Last Supper, Substitut – contemporary art from Switzerland, Berlin (GER)",
          "Culture Clash, Kunstpause, Zug (CH)",
        ],
      },
      {
        heading: "Films / Documentaries",
        items: [
          "THE TOWER, Ligornetto (CH)",
          "EXIT RIGHT, Ligornetto (CH)",
          "Enigma Code, Chiasso (CH)",
          "Háblame, Malnate (IT) & Buenos Aires (ARG)",
          "YOSHI + MOSHI – Movie World Tour, Barbengo (CH) & Genoa (IT)",
          "FACE YOSHI, Fano (CH)",
          "LOST LOST, Labenne (FR)",
          "Occupy ORF – A feast for Yoshi + Moshi, 30 min. TV movie, ORF III, Vienna (AT)",
          "Homeless, Hossegor (FR)",
          "Culture Clash, Berlin (GER)",
          "A Feast for Yoshi + Moshi, gallery of contemporary art of Lucerne (CH)",
          "A Feast for Yoshi + Moshi, Cabaret Voltaire, Zurich (CH)",
          "Last Supper, Zug (CH)",
          "Chou de Voltaire, Zug (CH)",
        ],
      },
    ],
  },
  "08": {
    number: "08",
    kicker: "No words = more worlds",
    title: "Become a Legend",
    sections: [
      {
        paragraphs: [
          "Yoshi + Moshi are two Big Heads – wordless beings who have been roaming the world since they first appeared in 2012. They have no fixed identity. They marvel, encounter, disappear and surprise. Wherever they turn up, reality shifts ever so slightly.",
          "BECOME A LEGEND is the first major art installation by Yoshi + Moshi. Sculpture, film, painting, performance and puppetry merge into a walk-in universe. Yoshi + Moshi do what legends do: they create their own reality.",
          "Yoshi + Moshi neither speak nor explain themselves. They have no verbal language. And therein lies their immense freedom. Their world is made of wonder, gesture, movement, encounter and play. Meaning is never prescribed. Anyone who encounters Yoshi + Moshi inevitably becomes a co-author of their universe.",
          "This makes their world strikingly contemporary. We live in an age of permanent visibility and self-presentation. We can endlessly produce, comment, share and stage ourselves. Everyone can be broadcaster, performer and audience of their own reality at once. More images, more words, more content – and the question: what remains?",
          "Yoshi + Moshi’s universe is made by hand: fabric, wood, paper, paint, bodies and movement have texture, weight and resistance. This analogue materiality is not a nostalgic escape from the digital present. Yet it reminds us of something that cannot be transmitted or reproduced: touch, sensuality, presence and the immediate experience of encountering another.",
          "Poetic, absurd and ironic, Yoshi + Moshi counter the relentless production of meaning with something surprisingly simple: their own imagination. They put our desire to become more than we already are to the test, while turning the very idea of the legend on its head. A legend need be neither famous nor perfect. It begins where we trust our own perception, allow possibilities to emerge, and have the courage and strength to assert a reality of our own making.",
          "Yoshi + Moshi created their reality long ago.",
          "BECOME A LEGEND is their invitation to us.",
        ],
      },
      {
        heading: "Literary references:",
        items: [
          "Gustave Flaubert",
          "Jorge Luis Borges",
          "Roland Barthes",
          "Samuel Beckett",
          "Ludwig Wittgenstein",
          "Maurice Blanchot",
        ],
      },
      {
        heading: "Nina Staehli's Relationship with Yoshi + Moshi",
      },
      {
        heading: "First Encounter",
        paragraphs: [
          "2012 erschienen Yoshi + Moshi zum ersten Mal in meinem Atelier. Damals wusste ich nicht, dass sie eines Tages ihre eigene Geschichte schreiben würden. Ich wusste nicht einmal, wer sie waren. Ich wusste nur, dass sie da waren. Sie gehörten zu den ersten Big Heads. Zu jenen Wesen, die weder Mensch noch Figur, weder Maske noch Porträt sind. Sie waren einfach anwesend. Mit grossen Augen und offenen Mündern. Mit einem Blick, als wäre gerade eben etwas geschehen. Bis heute glaube ich, dass genau darin ihr Ursprung liegt. Yoshi + Moshi staunen nicht über etwas Bestimmtes. Sie staunen über die Welt selbst. Lange bevor wir Begriffe finden, Urteile fällen oder Antworten formulieren, staunen wir. Vielleicht beginnt jede Erkenntnis genau dort. Mich interessiert dieses Staunen bis heute mehr als jede Gewissheit.",
        ],
      },
      {
        heading: "Silent Language",
        paragraphs: [
          "Deshalb sprechen Yoshi + Moshi nicht. Nicht, weil sie schweigen möchten. Nicht, weil sie Sprache verweigern würden. Sprache gehört schlicht nicht zu ihrer Existenz. Sie brauchen keine Worte, weil sie aus einem anderen Raum kommen. Ihre Welt entsteht aus Blicken, Gesten, Materialien, Berührungen, Bewegungen und Atmosphären. Das Schweigen ist keine Leerstelle, sondern ihre Sprache. In einer Zeit, in der beinahe alles erklärt, kommentiert und interpretiert wird, interessieren mich Räume, die offen bleiben. Räume, in denen Bedeutung nicht geliefert wird, sondern entsteht. Yoshi + Moshi erzählen deshalb keine Geschichten. Sie eröffnen Möglichkeiten und so wird der/die Betrachter*in zum/zur Mitautor*in. Vielleicht liegt genau darin ihre Nähe zur Literatur. Nicht zu Geschichten mit Anfang und Ende, sondern zu jener Literatur, die mehr fragt als antwortet. Flaubert träumte von einem Buch, das allein durch seine innere Kraft bestehen könnte. Beckett führte seine Figuren an die Grenze des Sagbaren. Wittgenstein erinnerte daran, dass dort, wo Sprache endet, nicht das Denken endet, und Roland Barthes verstand das Werk erst im Blick seines Lesers als vollendet. Diese Gedanken begleiten mich seit vielen Jahren als stille Weggefährten. Yoshi + Moshi erklären keine Philosophie, sie zitieren keine Literatur, aber sie bewegen sich in denselben Zwischenräumen. Genau dort, wo Sprache endet und Erfahrungen beginnen.",
        ],
      },
      {
        heading: "Poetic Spaces",
        paragraphs: [
          "Mich interessiert seit jeher das Poetische. Nicht nur als literarische Gattung, sondern als Form des Wahrnehmens. Poesie beginnt dort, wo die Welt wieder geheimnisvoll wird. Dort, wo wir Dinge nicht sofort benennen müssen. Wo wir bereit sind, etwas auszuhalten, das sich unserer Kontrolle entzieht. Vielleicht ist genau das heute wichtiger denn je. Wir leben in einer Zeit, in der Wissen unendlich verfügbar scheint. Das grosse Versprechen auf Erkenntnis hat sich von den Büchern zunehmend auf die künstliche Intelligenz verlagert. Oft entsteht der Eindruck, Maschinen könnten eines Tages alles verstehen und für uns lösen. Künstliche Intelligenz ersetzt den Menschen nicht, sie verschiebt Kompetenzen, Wissen und Verantwortung. Gerade deshalb erscheint mir das Analoge heute nicht als nostalgische Gegenbewegung, sondern als Erinnerung an etwas, das niemals vollständig digital werden kann: Berührung, Material, Haptik, Zeit, Präsenz und Gewicht. Oder anders gesagt: die Aura eines Gegenübers. Yoshi + Moshi und ihr Kosmos sind ausnahmslos analog entstanden. Jede Puppe, Skulptur, Malerei und Oberfläche trägt Spuren von Händen. Kleine Unregelmässigkeiten, Widerstände und Zufälle. Alles, was sich einer vollkommenen Glättung entzieht und einer Schönheit, die sich nicht vollständig übersetzen lässt.",
        ],
      },
      {
        heading: "Open Worlds",
        paragraphs: [
          "Vielleicht haben wir in den letzten zwanzig Jahren unzählige Bäume auf Bildschirmen betrachtet und gleichzeitig vergessen, wie sich eine Baumrinde anfühlt und wie sie riecht. Yoshi + Moshi erinnern deshalb nicht an eine Vergangenheit, sondern an sinnliche Erfahrungen. Ihre Welt besteht aus Puppen, Skulpturen, Videos, Performances und Malereien. Auch das ist kein Zufall. Kinder entdecken die Welt spielend. Sie erschaffen Figuren, geben ihnen Stimmen, lassen sie sterben, wiederauferstehen und neue Welten bauen. Im Spiel entstehen Identitäten und Legenden. Yoshi + Moshi bauen sich selbst nach. Sie erschaffen Abbilder ihrer eigenen Existenz und sie spielen mit sich selbst. Mich interessiert dieser Moment, weil er gleichzeitig zutiefst menschlich und absurd ist. Das Spiel wird zum Spiegel unserer Gegenwart. Einer Zeit, die sich unablässig selbst betrachtet, dokumentiert und neu erfindet. Yoshi + Moshi beobachten diese Welt mit Zärtlichkeit und feiner Ironie.",
        ],
      },
      {
        heading: "Legends of Their Own",
        paragraphs: [
          "Über die Jahre haben Yoshi und Moshi begonnen, sich von mir zu lösen. Anfangs habe ich sie erschaffen und heute habe ich manchmal das Gefühl, dass sie mich erschaffen haben. Sie entwickelten ihre eigene Mythologie, eigene Regeln und Rituale. So als hätte ich ihnen irgendwann die Tür geöffnet und sie wären einfach hinausgegangen. Heute reisen sie als Künstler, Performer und Puppenspieler durch die Welt. Sie behaupten nicht, Legenden werden zu wollen – sie verkörpern diese bereits. Deshalb trägt diese Ausstellung den Titel Become A Legend; die Aufforderung richtet sich nicht an Yoshi + Moshi, sondern an uns Menschen. Im Zentrum der Installation steht nicht Ruhm, sondern die Wahrnehmung. Sie eröffnet einen Raum für Staunen, Spiel und die Bereitschaft, dem eigenen Blick zu vertrauen und sich berühren zu lassen.",
        ],
      },
    ],
  },
  finances: {
    kicker: "Big vision = shared costs",
    title: "Funding",
    sections: [
      {
        paragraphs: [
          "Yoshi + Moshi have an established network of cantons, cities and cultural foundations in Switzerland. This will allow a substantial part of BECOME A LEGEND to be co-financed from Switzerland.",
          "Co-financing includes:",
        ],
        items: [
          "Production of the artworks",
          "Sculptures and installations",
          "Film and video",
          "Transport costs for the installation",
          "Travel and accommodation for the Yoshi + Moshi team",
          "Catering for the team",
        ],
      },
      {
        paragraphs: [
          "In this way, BECOME A LEGEND also becomes a shared financial project between Yoshi + Moshi and the host art institution.",
        ],
      },
    ],
  },
  inventory: {
    kicker: "Many works = one world",
    title: "Inventory",
    sections: [
      {
        heading: "Content",
        items: [
          "Yoshini & Moshini",
          "Ensemble sculptures",
          "Audience on wheels",
          "Dance Dolls",
          "Bla Blaa Blaa installation",
          "Approx. 50 sculptures",
          "Approx. 15 videos",
          "The Fourth Wall: 1 projection",
          "Yoshi + Moshi paintings: in development",
        ],
      },
    ],
  },
  contacts: {
    kicker: "Yoshi + Moshi + Team",
    title: "Contact",
    sections: [
      {
        heading: "Yoshi + Moshi artists",
        paragraphs: [
          "Via Industria 21\n6850 Mendrisio\nSwitzerland\n\nyoshi-moshi@yoshi-moshi.com\nwww.yoshi-moshi.com",
        ],
      },
      {
        heading: "Nina Staehli",
        paragraphs: [
          "Idea, concept, creation, videos, sculptures, paintings, photography",
        ],
      },
      {
        heading: "Michel Kiwic",
        paragraphs: ["Animation, film editing, sound, website"],
      },
      {
        heading: "Walter Willimann",
        paragraphs: ["Studio Organizer, logistics, finances"],
      },
    ],
  },
};

const suppliedDetailImages: Record<string, { src: string; alt: string }> = {
  "02": { src: "dance-dolls-figures.webp", alt: "Suspended Dance Dolls figures" },
  "03": { src: "yoshini-moshini-sculptures.webp", alt: "Yoshini and Moshini sculptures" },
  "04": { src: "the-ensemble-figures.webp", alt: "The Ensemble of Yoshi and Moshi figures" },
  "05": { src: "the-audience-figures-v3.webp", alt: "The Audience of suspended Yoshi and Moshi figures with generous surrounding space" },
  "08": { src: "texts-detail.webp", alt: "Close-up of white paper ribbons" },
  finances: { src: "finances-detail.webp", alt: "Yoshi and Moshi portrait masks" },
  inventory: { src: "inventory-detail.webp", alt: "Yoshi and Moshi exhibition figures" },
  contacts: { src: "contacts-detail.webp", alt: "Yoshi and Moshi hanging masks" },
};

const suppliedDetailVideos: Record<string, { src: string; poster?: string; label: string }> = {
  "01": { src: "bla-blaa-blaa-video.webm?v=afb6eb3", label: "Bla Blaa Blaa video" },
  "02": { src: "dance-dolls-video.webm?v=20260924-double", label: "Dance Dolls video" },
  "03": { src: "yoshini-moshini-loop-v2.webm", label: "Yoshini and Moshini performance video" },
  "04": { src: "the-ensemble-loop-v2.webm", label: "The Ensemble performance video" },
  "05": { src: "the-audience-loop-v4.webm", label: "The Audience performance video" },
};

export default function Home() {
  const [entryStage, setEntryStage] = useState<0 | 1 | 2>(() =>
    typeof window !== "undefined" && window.sessionStorage.getItem("yoshi-model-entered") === "true" ? 2 : 0,
  );
  const hasEntered = entryStage === 2;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fourthWallStill, setFourthWallStill] = useState(fourthWallStillImages[0]);
  const detailExitTimer = useRef<number | null>(null);
  const handlingBrowserBack = useRef(false);
  const activeCategory = categories.find((category) => category.id === activeId);
  const detailCategory = categories.find((category) => category.id === detailId);
  const activeDetailContent = detailId ? detailContent[detailId] : null;
  const hasUnifiedDetail = Boolean(activeDetailContent && detailId !== "07");
  const secondaryDetailImage =
    detailId === "06"
      ? fourthWallStill
      : detailId === "08" || !detailCategory
        ? "yoshi-moshi-logo.webp"
        : detailCategory.closeup?.src ?? detailCategory.detailSrc;
  const suppliedDetailImage = detailId ? suppliedDetailImages[detailId] : null;

  useEffect(() => {
    const updateInkWeight = () => {
      // Browser zoom changes the ratio between the browser window and the CSS viewport.
      // Counter-scale only the drawn SVG ink so it keeps its 100% zoom visual weight.
      const windowRatio = window.outerWidth / window.innerWidth;
      const zoom = Math.round(windowRatio * 4) / 4;
      const scale = zoom >= 1.25 ? 1 / zoom : 1;

      document.documentElement.style.setProperty("--ink-stroke-width", `${7 * scale}px`);
      document.documentElement.style.setProperty("--ink-flecks-width", `${3 * scale}px`);
      document.documentElement.style.setProperty("--ink-drip-width", `${4 * scale}px`);
      document.documentElement.style.setProperty("--ink-shadow-blur", `${0.8 * scale}px`);
    };

    updateInkWeight();
    window.addEventListener("resize", updateInkWeight);
    window.visualViewport?.addEventListener("resize", updateInkWeight);

    return () => {
      window.removeEventListener("resize", updateInkWeight);
      window.visualViewport?.removeEventListener("resize", updateInkWeight);
    };
  }, []);

  const showDetail = (id: string) => {
    if (detailExitTimer.current !== null) {
      window.clearTimeout(detailExitTimer.current);
      detailExitTimer.current = null;
    }

    setActiveId(id);
    setDetailId(id);
    window.sessionStorage.setItem("yoshi-model-entered", "true");
    const detailState = { yoshiView: "detail", yoshiDetail: id };
    if (window.history.state?.yoshiDetail) {
      window.history.replaceState(detailState, "", `#${id}`);
    } else {
      window.history.pushState(detailState, "", `#${id}`);
    }
    if (id === "06") {
      setFourthWallStill(
        fourthWallStillImages[Math.floor(Math.random() * fourthWallStillImages.length)],
      );
    }
    window.requestAnimationFrame(() => setIsDetailOpen(true));
  };

  const returnToModel = (fromBrowserBack = false) => {
    if (!fromBrowserBack && window.history.state?.yoshiDetail) {
      handlingBrowserBack.current = true;
      window.history.back();
      return;
    }
    setMenuOpen(false);
    setActiveId(null);

    if (!detailId) {
      setIsDetailOpen(false);
      return;
    }

    setIsDetailOpen(false);
    if (detailExitTimer.current !== null) {
      window.clearTimeout(detailExitTimer.current);
    }
    detailExitTimer.current = window.setTimeout(() => {
      setDetailId(null);
      detailExitTimer.current = null;
    }, 720);
  };

  useEffect(() => {
    const handlePopState = () => {
      window.sessionStorage.setItem("yoshi-model-entered", "true");
      setEntryStage(2);
      if (handlingBrowserBack.current) {
        handlingBrowserBack.current = false;
      }
      if (detailId) {
        returnToModel(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [detailId]);

  const enterModel = () => {
    window.sessionStorage.setItem("yoshi-model-entered", "true");
    window.history.replaceState({ yoshiView: "model" }, "", window.location.href);
    setEntryStage(2);
  };

  const toggleCategory = (id: string) => {
    if (detailId === id) {
      returnToModel();
      return;
    }

    showDetail(id);
  };

  return (
    <>
      <div
        className={`entry-sequence${entryStage >= 1 ? " has-announcement" : ""}${hasEntered ? " is-entered" : ""}`}
        aria-hidden={hasEntered}
      >
      <button
        className="entry-screen"
        type="button"
        aria-label="Show the Yoshi and Moshi tour announcement"
        aria-hidden={entryStage !== 0}
        tabIndex={entryStage === 0 ? 0 : -1}
        onClick={() => setEntryStage(1)}
      >
        <img
          className="entry-background"
          src="entry-karrussel.webp"
          alt="Yoshi and Moshi riding a colorful carousel"
          draggable={false}
        />
        <span className="entry-shade" aria-hidden="true" />
        <span className="entry-message">
          <strong>No humor<br />= no entry</strong>
          <img className="entry-cross" src="entry-red-cross.png" alt="" draggable={false} />
        </span>
        <img
          className="entry-handmade-stamp"
          src="handmade-stamp.png"
          alt="100% Handmade"
          draggable={false}
        />
        <span className="entry-action">Click for breaking news</span>
      </button>

      <button
        className="tour-announcement"
        type="button"
        aria-label="Enter the Become a Legend exhibition"
        aria-hidden={entryStage !== 1}
        tabIndex={entryStage === 1 ? 0 : -1}
        onClick={enterModel}
      >
        <span className="tour-dimmer" aria-hidden="true" />
        <span className="tour-poster">
          <video
            className="tour-background"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="yoshi-moshi-red-boat.png"
            aria-label="Yoshi and Moshi with a red boat in the jungle"
          >
            <source src="yoshi-moshi-jungle-loop.mp4" type="video/mp4" />
          </video>
          <span className="tour-shade" aria-hidden="true" />
          <span className="tour-headline">
            <strong>Yoshi + Moshi</strong>
            <strong>are coming to</strong>
            <strong>your town!</strong>
          </span>
          <span className="tour-enter">CLICK AGAIN</span>
        </span>
      </button>
      </div>

    <main
      className={`site-shell${hasEntered ? " is-revealed" : ""}${menuOpen ? " has-menu-open" : ""}`}
      aria-hidden={!hasEntered}
      inert={!hasEntered}
    >
      <section className="model-section" id="model" aria-label="Interactive exhibition model">
        <div className="exhibition-layout">
          <div className={`model-column${hasUnifiedDetail ? " has-unified-detail" : ""}${activeDetailContent ? " has-detail" : ""}`}>
            <button
              className={`menu-toggle model-menu-toggle${menuOpen ? " is-open" : ""}`}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>

            <nav className={`site-menu${menuOpen ? " is-open" : ""}`} id="site-menu" aria-label="Exhibition menu">
              {categories.map((category) => (
                <a
                  href="#model"
                  key={category.id}
                  onClick={(event) => {
                    event.preventDefault();
                    toggleCategory(category.id);
                    setMenuOpen(false);
                  }}
                >
                  <strong>{category.name}</strong>
                </a>
              ))}
              {utilityCategories.map((category) => (
                <a
                  href="#model"
                  key={category.id}
                  onClick={(event) => {
                    setMenuOpen(false);
                    event.preventDefault();
                    showDetail(category.detailId);
                  }}
                >
                  <strong>{category.name}</strong>
                </a>
              ))}
            </nav>

        {activeDetailContent ? (
          <>
            <div className={`category-transition${isDetailOpen ? " is-detail-open" : ""}`}>
            <div className="model-transition-panel" aria-hidden="true">
              <img src="yoshi-moshi-model-stage-light.png" alt="" draggable={false} />
              <div className="model-main-title">
                BECOME A<br />
                LEGEND
              </div>
            </div>
          <div
            className={`category-detail category-detail-${detailId}${detailCategory ? "" : " category-detail-information"}${detailId !== "07" ? " category-detail-unified" : ""}`}
            aria-labelledby="category-detail-title"
            key={detailId}
          >
            {detailId !== "07" ? (
              <div className="fourth-wall-layout">
                <header className="fourth-wall-heading">
                  <div className="detail-navigation">
                    <button className="detail-back" type="button" onClick={(event) => {
                      event.stopPropagation();
                      returnToModel();
                    }}>
                      <span aria-hidden="true">←</span> Back to model
                    </button>
                  </div>
                  <h1
                    className={`detail-primary-title${detailId === "03" ? " detail-primary-title-pair" : ""}`}
                    id="category-detail-title"
                  >
                    {detailId === "03" ? (
                      <>
                        <span>Yoshini</span>
                        <span className="detail-title-plus">+</span>
                        <span>Moshini</span>
                      </>
                    ) : activeDetailContent.title}
                  </h1>
                  <p className="detail-kicker">{activeDetailContent.kicker}</p>
                </header>
                <div className={`fourth-wall-media${["08", "contacts", "inventory", "finances"].includes(detailId ?? "") ? " single-detail-media" : ""}`}>
                  {detailId === "01" || suppliedDetailImage ? (
                    <div className="fourth-wall-media-cell">
                      <img
                        className="fourth-wall-image fourth-wall-image-still"
                        src={detailId === "01" ? "bla-blaa-blaa-figures.webp" : suppliedDetailImage!.src}
                        alt={detailId === "01" ? "Three pale Bla Blaa Blaa figures with long paper ribbons" : suppliedDetailImage!.alt}
                        draggable={false}
                      />
                    </div>
                  ) : (detailId === "04" || detailId === "05") && detailCategory?.backgroundSrc ? (
                    <div className="fourth-wall-media-cell">
                      <img
                        className="fourth-wall-image detail-media-layer-background"
                        src={detailCategory.backgroundSrc}
                        alt={`Background for ${detailCategory.name}`}
                        draggable={false}
                      />
                    </div>
                  ) : (
                    <div className="fourth-wall-media-cell">
                      <img
                        className="fourth-wall-image fourth-wall-image-still"
                        src="yoshi-moshi-model-stage-light.png"
                        alt="Yoshi and Moshi exhibition model"
                        draggable={false}
                      />
                    </div>
                  )}
                  {["08", "contacts", "inventory", "finances"].includes(detailId ?? "") ? null : suppliedDetailVideos[detailId ?? ""] ? (
                    <div className="fourth-wall-media-cell fourth-wall-media-cell-motion detail-video-cell">
                      <video
                        className="fourth-wall-image fourth-wall-image-motion detail-video"
                        src={suppliedDetailVideos[detailId ?? ""].src}
                        aria-label={suppliedDetailVideos[detailId ?? ""].label}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  ) : detailId === "05" && detailCategory ? (
                    <div className="fourth-wall-media-cell fourth-wall-media-cell-motion">
                      <img
                        className="fourth-wall-image fourth-wall-image-motion"
                        src={detailCategory.detailSrc}
                        alt={detailCategory.closeup?.alt ?? "Animated audience image"}
                        draggable={false}
                      />
                    </div>
                  ) : detailId === "04" && detailCategory ? (
                    <div className="fourth-wall-media-cell fourth-wall-media-cell-motion">
                      <img
                        className="fourth-wall-image fourth-wall-image-motion"
                        src={detailCategory.detailSrc}
                        alt={detailCategory.closeup?.alt ?? "Animated ensemble image"}
                        draggable={false}
                      />
                    </div>
                  ) : detailCategory?.backgroundSrc ? (
                    <div className="fourth-wall-media-cell detail-media-layered">
                      <img
                        className="fourth-wall-image detail-media-layer-background"
                        src={detailCategory.backgroundSrc}
                        alt={`Background for ${detailCategory.name}`}
                        draggable={false}
                      />
                      <img
                        className="detail-media-layer-cutout fourth-wall-image-motion"
                        src={detailCategory.detailSrc}
                        alt={detailCategory.closeup?.alt ?? `Figure for ${detailCategory.name}`}
                        draggable={false}
                      />
                    </div>
                  ) : (
                    <div className="fourth-wall-media-cell fourth-wall-media-cell-motion">
                      <img
                        className="fourth-wall-image fourth-wall-image-motion"
                        src={secondaryDetailImage}
                        alt={
                          detailId === "06"
                            ? "Random animated Yoshi and Moshi image"
                            : detailCategory?.closeup?.alt ?? `${activeDetailContent.title} image`
                        }
                        draggable={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="video-wall" aria-label="Twelve animated Yoshi and Moshi videos">
                {videoWallClips.map((clip, index) => (
                  <video
                    className="video-wall-clip"
                    src={clip}
                    key={clip}
                    aria-label={`Yoshi and Moshi video ${index + 1}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  />
                ))}
                <h1 className="video-wall-title" id="category-detail-title">Films + Performances</h1>
              </div>
            )}

            {detailId === "07" && <button
              className="detail-back"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                returnToModel();
              }}
            >
              <span aria-hidden="true">←</span> Back to model
            </button>}
          </div>
          </div>
          {activeDetailContent ? (
            <article
              className={`detail-text-below${isDetailOpen ? "" : " is-closing"}`}
              aria-label={`Text for ${activeDetailContent.title}`}
            >
              {activeDetailContent.spec ? (
                <h2 className="detail-spec-heading">{activeDetailContent.spec}</h2>
              ) : null}
              {activeDetailContent.sections
                .slice(0, detailId === "08" ? 2 : undefined)
                .map((section, sectionIndex) => (
                <section className="detail-text-section" key={`below-${detailId}-section-${sectionIndex}`}>
                  {section.heading ? <h2>{section.heading}</h2> : null}
                  {section.paragraphs?.map((paragraph, paragraphIndex) =>
                    detailId === "contacts" && sectionIndex === 0 && paragraphIndex === 0 ? (
                      <p key={`below-${detailId}-paragraph-${sectionIndex}-${paragraphIndex}`}>
                        Via Industria 21<br />
                        6850 Mendrisio<br />
                        Switzerland<br /><br />
                        <a href="mailto:yoshi-moshi@yoshi-moshi.com">yoshi-moshi@yoshi-moshi.com</a><br />
                        <a href="https://www.yoshi-moshi.com" target="_blank" rel="noreferrer">www.yoshi-moshi.com</a>
                      </p>
                    ) : (
                      <p key={`below-${detailId}-paragraph-${sectionIndex}-${paragraphIndex}`}>{paragraph}</p>
                    ),
                  )}
                  {section.items ? (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {detailId === "08" && sectionIndex === 0 ? (
                    <p className="ninas-view-link">
                      <a href="ninas-view-of-yoshi-moshi.pdf" target="_blank" rel="noreferrer">
                        Nina&apos;s View of Yoshi + Moshi
                      </a>
                    </p>
                  ) : null}
                </section>
              ))}
            </article>
          ) : null}
          </>
        ) : null}
        <div
          className={`model-frame${activeCategory ? " has-active" : ""}`}
          onMouseLeave={() => setActiveId(null)}
        >
          <img
            className="model-image model-image-base"
            src="yoshi-moshi-model-stage-light.png"
            alt="Yoshi and Moshi presenting a miniature exhibition model with eight exhibition categories"
            draggable={false}
          />
          <div className="model-main-title" aria-label="Become a Legend">
            BECOME A<br />
            LEGEND
          </div>

          <button
            className="funded-button"
            type="button"
            aria-label="Fully funded – Open finances"
            onClick={() => showDetail("finances")}
          >
            <span className="funded-button-face">Fully funded!</span>
          </button>

          <button
            className="model-footer-action model-footer-finances"
            type="button"
            onClick={() => showDetail("finances")}
          >
            Finances
          </button>
          <button
            className="model-footer-action model-footer-inventory"
            type="button"
            onClick={() => showDetail("inventory")}
          >
            Inventory
          </button>
          <button
            className="model-footer-action model-footer-contacts"
            type="button"
            onClick={() => showDetail("contacts")}
          >
            Contact
          </button>

          <svg
            className="hotspot-map"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {[
              ...categories.filter((category) => category.id !== "04" && category.id !== "08"),
              ...categories.filter((category) => category.id === "04"),
              ...categories.filter((category) => category.id === "08"),
            ].map((category) => (
              <path
                key={category.id}
                className="hotspot-hit-area"
                d={category.hitOutline ?? category.outline}
                onMouseEnter={() => setActiveId(category.id)}
                onClick={() => toggleCategory(category.id)}
              />
            ))}
            {activeCategory ? (
              <g className="ink-frame">
                <path className="ink-frame-stroke" d={activeCategory.frameOutline ?? activeCategory.outline} />
                <path className="ink-frame-flecks" d={activeCategory.frameOutline ?? activeCategory.outline} />
                <g className="ink-splatter">
                  <circle cx={activeCategory.point.x - 7.4} cy={activeCategory.point.y - 10.2} r="0.58" />
                  <circle cx={activeCategory.point.x - 5.7} cy={activeCategory.point.y - 11.5} r="0.26" />
                  <circle cx={activeCategory.point.x - 4.3} cy={activeCategory.point.y - 10.7} r="0.17" />
                  <circle cx={activeCategory.point.x + 8.1} cy={activeCategory.point.y + 7.6} r="0.48" />
                  <circle cx={activeCategory.point.x + 9.5} cy={activeCategory.point.y + 6.4} r="0.2" />
                  <path
                    className="ink-drip"
                    d={`M ${activeCategory.point.x - 7.5} ${activeCategory.point.y - 9.8} v 4.2 M ${activeCategory.point.x - 5.8} ${activeCategory.point.y - 10.5} v 2.4 M ${activeCategory.point.x + 8.2} ${activeCategory.point.y + 7.3} v 3.1`}
                  />
                </g>
              </g>
            ) : null}
          </svg>

          {categories.map((category) => {
            const isActive = category.id === activeId;
            return (
              <button
                key={category.id}
                className={`image-marker${isActive ? " is-active" : ""}`}
                style={{ left: `${category.point.x}%`, top: `${category.point.y}%` }}
                type="button"
                aria-label={`${category.id}: ${category.name}`}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveId(category.id)}
                onFocus={() => setActiveId(category.id)}
                onClick={() => toggleCategory(category.id)}
              >
                <span className="marker-name">{category.name}</span>
              </button>
            );
          })}

          <img
            className="idle-logo"
            src="yoshi-moshi-logo.webp"
            alt="Yoshi + Moshi"
            draggable={false}
          />

        </div>

          </div>
        </div>
      </section>
    </main>
    </>
  );
}
