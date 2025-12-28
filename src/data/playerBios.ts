export interface PlayerBio {
  name: string;
  avatar: string;
  bio: string;
}

export const playerBios: Record<string, PlayerBio> = {
  'Dylan': {
    name: 'Dylan',
    avatar: '/images/avatars/dylan.jpg',
    bio: 'Dylan is een ervaren deelnemer aan de Mike Sports League Fantasy. Met zijn strategische inzicht en kennis van de sport weet hij altijd de beste teamsamenstelling te maken.',
  },
  'Mike': {
    name: 'Mike',
    avatar: '/images/avatars/mike.jpg',
    bio: 'De naamgever van de league zelf! Mike is de drijvende kracht achter de Mike Sports League en staat bekend om zijn competitieve instelling.',
  },
  'Arie': {
    name: 'Arie',
    avatar: '/images/avatars/arie.jpg',
    bio: 'Een gepassioneerde speler die altijd vol energie het veld op komt. Bekend om zijn teamspirit en motiverende houding.',
  },
  'Maus': {
    name: 'Maus',
    avatar: '/images/avatars/maus.jpg',
    bio: 'Tactisch sterk en altijd gefocust op de winst. Deze speler laat zich niet snel uit het veld slaan.',
  },
  'Diederik': {
    name: 'Diederik',
    avatar: '/images/avatars/diederik.jpg',
    bio: 'De rust zelve in het team. Met jarenlange ervaring weet Diederik precies wanneer actie te ondernemen.',
  },
  'Minne': {
    name: 'Minne',
    avatar: '/images/avatars/minne.jpg',
    bio: 'Vol ambitie en gedrevenheid. Elke wedstrijd wordt gezien als een nieuwe kans om te excelleren.',
  },
  'Stephan': {
    name: 'Stephan',
    avatar: '/images/avatars/stephan.jpg',
    bio: 'Een allrounder die zich in elke situatie weet aan te passen. Flexibel en betrouwbaar.',
  },
  'Oscar': {
    name: 'Oscar',
    avatar: '/images/avatars/oscar.jpg',
    bio: 'Bekend om zijn creatieve speelstijl en onverwachte zetten. Altijd goed voor een verrassing.',
  },
  'Maarten': {
    name: 'Maarten',
    avatar: '/images/avatars/maarten.jpg',
    bio: 'De motor van het team. Onvermoeibaar en altijd bereid het extra stapje te zetten.',
  },
  'Geert': {
    name: 'Geert',
    avatar: '/images/avatars/geert.jpg',
    bio: 'Met een scherp oog voor detail en strategisch inzicht. Een waardevolle speler in elk team.',
  },
  'Mischa': {
    name: 'Mischa',
    avatar: '/images/avatars/mischa.jpg',
    bio: 'De nieuwkomer met veel potentieel. Leergierig en vastberaden om zich te bewijzen.',
  },
  'Sanford': {
    name: 'Sanford',
    avatar: '/images/avatars/sanford.jpg',
    bio: 'Een ervaren speler met een scherp tactisch inzicht. Sanford weet precies hoe hij zijn team moet samenstellen.',
  },
  'Wout': {
    name: 'Wout',
    avatar: '/images/avatars/wout.jpg',
    bio: 'Vastberaden en competitief. Wout speelt om te winnen en laat dat ook zien in zijn teamkeuzes.',
  },
};

// Helper function to get player bio by name
export function getPlayerBio(name: string): PlayerBio | null {
  return playerBios[name] || null;
}
