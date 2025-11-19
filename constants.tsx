import { PageData } from './types';

// Helper to generate consistent placeholder images
const getImg = (id: number) => `https://picsum.photos/800/600?random=${id}`;

export const APP_TITLE = "COSMOS";

export const PAGES: PageData[] = [
  {
    id: 'home',
    title: 'Welcome to the Cosmos',
    category: 'General',
    summary: 'Begin your journey through the infinite universe.',
    content: 'The universe is all of space and time and their contents, including planets, stars, galaxies, and all other forms of matter and energy. The Big Bang theory is the prevailing cosmological description of the development of the universe.',
    imageUrl: getImg(1),
    stats: [{ label: 'Age', value: '13.8 Billion Years' }, { label: 'Diameter', value: '93 Billion Light Years' }]
  },
  {
    id: 'sun',
    title: 'The Sun',
    category: 'Solar System',
    summary: 'The star at the center of our Solar System.',
    content: 'The Sun is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating the energy mainly as visible light, ultraviolet light, and infrared radiation.',
    imageUrl: getImg(2),
    stats: [{ label: 'Surface Temp', value: '5,500°C' }, { label: 'Type', value: 'Yellow Dwarf' }]
  },
  {
    id: 'mercury',
    title: 'Mercury',
    category: 'Solar System',
    summary: 'The smallest planet in the Solar System.',
    content: 'Mercury is the closest planet to the Sun. It has a rocky body like Earth, but it has almost no atmosphere to hold in heat, leading to extreme temperature fluctuations.',
    imageUrl: getImg(3),
    stats: [{ label: 'Moons', value: '0' }, { label: 'Year Length', value: '88 Days' }]
  },
  {
    id: 'venus',
    title: 'Venus',
    category: 'Solar System',
    summary: 'The hottest planet in our solar system.',
    content: 'Venus has a thick, toxic atmosphere filled with carbon dioxide and it’s perpetually shrouded in thick, yellowish clouds of sulfuric acid that trap heat, causing a runaway greenhouse effect.',
    imageUrl: getImg(4),
    stats: [{ label: 'Surface Temp', value: '475°C' }, { label: 'Day Length', value: '243 Earth Days' }]
  },
  {
    id: 'earth',
    title: 'Earth',
    category: 'Solar System',
    summary: 'Our home, the Blue Marble.',
    content: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29% of Earth\'s surface is land consisting of continents and islands.',
    imageUrl: getImg(5),
    stats: [{ label: 'Population', value: '8 Billion+' }, { label: 'Water Cover', value: '71%' }]
  },
  {
    id: 'mars',
    title: 'Mars',
    category: 'Solar System',
    summary: 'The Red Planet.',
    content: 'Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence that Mars was – billions of years ago – wetter and warmer, with a thick atmosphere.',
    imageUrl: getImg(6),
    stats: [{ label: 'Moons', value: '2' }, { label: 'Mission Status', value: 'Active Rovers' }]
  },
  {
    id: 'jupiter',
    title: 'Jupiter',
    category: 'Solar System',
    summary: 'The gas giant king of planets.',
    content: 'Jupiter is more than twice as massive as all the other planets combined. The Great Red Spot is a giant storm that has raged for hundreds of years.',
    imageUrl: getImg(7),
    stats: [{ label: 'Moons', value: '95' }, { label: 'Type', value: 'Gas Giant' }]
  },
  {
    id: 'saturn',
    title: 'Saturn',
    category: 'Solar System',
    summary: 'Adorned with a dazzling, complex system of icy rings.',
    content: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth.',
    imageUrl: getImg(8),
    stats: [{ label: 'Ring System', value: 'Extensive' }, { label: 'Day Length', value: '10.7 Hours' }]
  },
  {
    id: 'uranus',
    title: 'Uranus',
    category: 'Solar System',
    summary: 'The tilted ice giant.',
    content: 'Uranus spins on its side. It is an ice giant, consisting mostly of flowing icy materials above a solid core. It has the coldest planetary atmosphere in the Solar System.',
    imageUrl: getImg(9),
    stats: [{ label: 'Tilt', value: '98 Degrees' }, { label: 'Discovery', value: '1781' }]
  },
  {
    id: 'neptune',
    title: 'Neptune',
    category: 'Solar System',
    summary: 'The windy, dark, cold world.',
    content: 'Neptune is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations rather than by telescope.',
    imageUrl: getImg(10),
    stats: [{ label: 'Wind Speeds', value: '2,100 km/h' }, { label: 'Distance', value: '30 AU' }]
  },
  {
    id: 'pluto',
    title: 'Pluto',
    category: 'Solar System',
    summary: 'The beloved dwarf planet.',
    content: 'Pluto is a dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune. It was the first and the largest Kuiper belt object to be discovered.',
    imageUrl: getImg(11),
    stats: [{ label: 'Status', value: 'Dwarf Planet' }, { label: 'Surface', value: 'Nitrogen Ice' }]
  },
  {
    id: 'moon',
    title: 'The Moon',
    category: 'Solar System',
    summary: 'Earth\'s only natural satellite.',
    content: 'The Moon is the fifth largest satellite in the Solar System and the largest and most massive relative to its parent planet. Its gravitational influence produces the ocean tides.',
    imageUrl: getImg(12),
    stats: [{ label: 'Distance', value: '384,400 km' }, { label: 'Walking Humans', value: '12' }]
  },
  {
    id: 'black-holes',
    title: 'Black Holes',
    category: 'Deep Space',
    summary: 'Regions where gravity is so strong that nothing can escape.',
    content: 'A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it.',
    imageUrl: getImg(13),
    stats: [{ label: 'Known Nearest', value: 'Gaia BH1' }, { label: 'Event Horizon', value: 'Variable' }]
  },
  {
    id: 'nebulas',
    title: 'Nebulas',
    category: 'Deep Space',
    summary: 'Giant clouds of dust and gas in space.',
    content: 'Some nebulae come from the gas and dust thrown out by the explosion of a dying star, such as a supernova. Other nebulae are regions where new stars are beginning to form.',
    imageUrl: getImg(14),
    stats: [{ label: 'Composition', value: 'Gas & Dust' }, { label: 'Function', value: 'Star Nursery' }]
  },
  {
    id: 'galaxies',
    title: 'Galaxies',
    category: 'Deep Space',
    summary: 'Sprawling systems of dust, gas, dark matter, and stars.',
    content: 'A galaxy is a huge collection of gas, dust, and billions of stars and their solar systems, all held together by gravity. We live in the Milky Way galaxy.',
    imageUrl: getImg(15),
    stats: [{ label: 'Milky Way Stars', value: '100-400 Billion' }, { label: 'Types', value: 'Spiral, Elliptical' }]
  },
  {
    id: 'exoplanets',
    title: 'Exoplanets',
    category: 'Deep Space',
    summary: 'Planets beyond our solar system.',
    content: 'An exoplanet is any planet beyond our solar system. Most orbit other stars, but free-floating planets, called rogue planets, orbit the galactic center and are in perpetual darkness.',
    imageUrl: getImg(16),
    stats: [{ label: 'Confirmed', value: '5,500+' }, { label: 'First Found', value: '1992' }]
  },
  {
    id: 'dark-matter',
    title: 'Dark Matter',
    category: 'Deep Space',
    summary: 'The invisible glue of the universe.',
    content: 'Dark matter is a hypothetical form of matter thought to account for approximately 85% of the matter in the universe. It is called "dark" because it does not appear to interact with light.',
    imageUrl: getImg(17),
    stats: [{ label: 'Percentage', value: '85% of Matter' }, { label: 'Visibility', value: 'Invisible' }]
  },
  {
    id: 'history',
    title: 'Space History',
    category: 'Humanity',
    summary: 'The timeline of human exploration.',
    content: 'From the launch of Sputnik 1 in 1957 to the Apollo moon landings and the International Space Station, humanity has constantly pushed the boundaries of what is possible.',
    imageUrl: getImg(18),
    stats: [{ label: 'First Human', value: 'Yuri Gagarin' }, { label: 'Moon Landing', value: '1969' }]
  },
  {
    id: 'iss',
    title: 'The ISS',
    category: 'Humanity',
    summary: 'The International Space Station.',
    content: 'The ISS is a modular space station in low Earth orbit. It is a multinational collaborative project involving five participating space agencies: NASA, Roscosmos, JAXA, ESA, and CSA.',
    imageUrl: getImg(19),
    stats: [{ label: 'Speed', value: '28,000 km/h' }, { label: 'Orbits/Day', value: '16' }]
  },
  {
    id: 'future',
    title: 'Future Travel',
    category: 'Humanity',
    summary: 'What lies ahead for space exploration.',
    content: 'Concepts like the warp drive, Mars colonization, asteroid mining, and interstellar probes are moving from science fiction to theoretical science and engineering challenges.',
    imageUrl: getImg(20),
    stats: [{ label: 'Next Goal', value: 'Mars' }, { label: 'Key Tech', value: 'Fusion' }]
  },
];
