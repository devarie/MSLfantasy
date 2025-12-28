export interface PlayerBio {
  name: string;
  avatar: string;
  bio: string;
}

export const playerBios: Record<string, PlayerBio> = {
  'Dylan Polak': {
    name: 'Dylan Polak',
    avatar: '/images/avatars/dylan-polak.jpg',
    bio: 'Dylan Polak is een ervaren deelnemer aan de Mike Sports League Fantasy. Met zijn strategische inzicht en kennis van de sport weet hij altijd de beste teamsamenstelling te maken.',
  },
  // Placeholder data for other players - update these with real bios later
  'Player 2': {
    name: 'Player 2',
    avatar: '/images/avatars/placeholder.jpg',
    bio: 'Een gepassioneerde speler die altijd vol energie het veld op komt. Bekend om zijn teamspirit en motiverende houding.',
  },
  'Player 3': {
    name: 'Player 3',
    avatar: '/images/avatars/placeholder.jpg',
    bio: 'Tactisch sterk en altijd gefocust op de winst. Deze speler laat zich niet snel uit het veld slaan.',
  },
  'Player 4': {
    name: 'Player 4',
    avatar: '/images/avatars/placeholder.jpg',
    bio: 'De rust zelve in het team. Met jarenlange ervaring weet deze speler precies wanneer actie te ondernemen.',
  },
  'Player 5': {
    name: 'Player 5',
    avatar: '/images/avatars/placeholder.jpg',
    bio: 'Vol ambitie en gedrevenheid. Elke wedstrijd wordt gezien als een nieuwe kans om te excelleren.',
  },
  'Player 6': {
    name: 'Player 6',
    avatar: '/images/avatars/placeholder.jpg',
    bio: 'Een allrounder die zich in elke situatie weet aan te passen. Flexibel en betrouwbaar.',
  },
  'Player 7': {
    name: 'Player 7',
    avatar: '/images/avatars/placeholder.jpg',
    bio: 'Bekend om zijn creatieve speelstijl en onverwachte zetten. Altijd goed voor een verrassing.',
  },
  'Player 8': {
    name: 'Player 8',
    avatar: '/images/avatars/placeholder.jpg',
    bio: 'De motor van het team. Onvermoeibaar en altijd bereid het extra stapje te zetten.',
  },
  'Player 9': {
    name: 'Player 9',
    avatar: '/images/avatars/placeholder.jpg',
    bio: 'Met een scherp oog voor detail en strategisch inzicht. Een waardevolle speler in elk team.',
  },
  'Player 10': {
    name: 'Player 10',
    avatar: '/images/avatars/placeholder.jpg',
    bio: 'De nieuwkomer met veel potentieel. Leergierig en vastberaden om zich te bewijzen.',
  },
};

// Helper function to get player bio by name
export function getPlayerBio(name: string): PlayerBio | null {
  return playerBios[name] || null;
}
