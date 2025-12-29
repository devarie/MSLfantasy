export interface PlayerBio {
  name: string;
  avatar: string;
  bio: string;
}

export const playerBios: Record<string, PlayerBio> = {
  'Dylan': {
    name: 'Dylan',
    avatar: '/images/avatars/dylan.webp',
    bio: 'Dylan is een ervaren deelnemer aan de Mike Sports League Fantasy. Met zijn strategische inzicht en kennis van de sport weet hij altijd de beste teamsamenstelling te maken.',
  },
  'Mike': {
    name: 'Mike',
    avatar: '/images/avatars/mike.webp',
    bio: 'De naamgever van de league zelf! Mike is de drijvende kracht achter de Mike Sports League en staat bekend om zijn competitieve instelling.',
  },
  'Arie': {
    name: 'Arie',
    avatar: '/images/avatars/arie.webp',
    bio: 'Een gepassioneerde speler die altijd vol energie het veld op komt. Bekend om zijn teamspirit en motiverende houding.',
  },
  'Maus': {
    name: 'Maus',
    avatar: '/images/avatars/mause.webp',
    bio: 'Tactisch sterk en altijd gefocust op de winst. Deze speler laat zich niet snel uit het veld slaan.',
  },
  'Diederik': {
    name: 'Diederik',
    avatar: '/images/avatars/diederik.webp',
    bio: 'De rust zelve in het team. Met jarenlange ervaring weet Diederik precies wanneer actie te ondernemen.',
  },
  'Minne': {
    name: 'Minne',
    avatar: '/images/avatars/minne.webp',
    bio: 'Vol ambitie en gedrevenheid. Elke wedstrijd wordt gezien als een nieuwe kans om te excelleren.',
  },
  'Stephan': {
    name: 'Stephan',
    avatar: '/images/avatars/stephan.webp',
    bio: 'Een allrounder die zich in elke situatie weet aan te passen. Flexibel en betrouwbaar.',
  },
  'Oscar': {
    name: 'Oscar',
    avatar: '/images/avatars/oscar.webp',
    bio: 'Bekend om zijn creatieve speelstijl en onverwachte zetten. Altijd goed voor een verrassing.',
  },
  'Maarten': {
    name: 'Maarten',
    avatar: '/images/avatars/maarten.webp',
    bio: 'De motor van het team. Onvermoeibaar en altijd bereid het extra stapje te zetten.',
  },
  'Geert': {
    name: 'Geert',
    avatar: '/images/avatars/geert.webp',
    bio: `Op z'n Mokums Mikkie Jordaan.
Bekend van de uitspraak there's no I in team, but there is an I in win en als de crying meme.
Nog bekender van NBA basketball, wat hij in de jaren 90 op kaart zette wereldwijd.
Was in die periode ook gym rat avant la lettre, met biceps als de Kilimanjaro.
Pakt nu op z'n oude dag graag een golfje, op de golfbaan that is.
Mikkie is de ultieme strijder. Hij wil altijd van iedereen winnen met elk spel.
Valsspelen geen bezwaar: een overwinning op dubieuze wijze is nog steeds een overwinning.`,
  },

  
  'Mischa': {
    name: 'Mischa',
    avatar: '/images/avatars/micha.webp',
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
