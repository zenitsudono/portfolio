 export const projects = [
  {
    id: '1',
    title: 'Travel App',
    description: 'A modern travel application built with Flutter, featuring a beautiful UI design, smooth animations, and comprehensive travel planning features. The app helps users discover destinations, plan their trips, and manage their travel itineraries.',
    image: `${process.env.PUBLIC_URL}/travel-app.png`,
    technologies: ['Flutter', 'Dart', 'Material Design', 'Animation', 'UI/UX'],
    githubLink: 'https://github.com/zenitsudono/travel_app'
  },
  {
    id: '2',
    title: 'Horloge App',
    description: 'An elegant clock application that displays time in a beautiful and interactive way. Features include multiple time zones, customizable themes, and smooth animations.',
    image: `${process.env.PUBLIC_URL}/horloge.png`,
    technologies: ['Flutter', 'Dart', 'Animation', 'Custom Painting', 'State Management'],
    githubLink: 'https://github.com/zenitsudono/Horloge'
  },
  {
    id: '3',
    title: 'Compteur de Taxi',
    description: 'A sophisticated Android application revolutionizing taxi fare management. Features real-time fare calculation, route optimization, driver profiles, and an intuitive interface that enhances both driver and passenger experience.',
    image: `${process.env.PUBLIC_URL}/Compteur de taxi.png`,
    technologies: ['Android', 'Kotlin', 'XML', 'Google Maps API', 'Location Services'],
    githubLink: 'https://github.com/zenitsudono/Compteur-de-Taxi'
  },
  {
    id: '4',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and Tailwind CSS. Features smooth animations, dark mode, and an interactive project showcase with dynamic content loading.',
    image: `${process.env.PUBLIC_URL}/logo.jpg`,
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Framer Motion'],
    githubLink: 'https://github.com/zenitsudono/portfolio'
  }
];

export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS']
  },
  {
    category: 'Mobile Development',
    items: ['Flutter', 'Dart', 'Android', 'Kotlin', 'XML', 'Material Design', 'UI/UX']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB', 'SQL']
  },
  {
    category: 'Tools & Technologies',
    items: ['Git', 'VS Code', 'Android Studio', 'Firebase', 'REST APIs', 'State Management']
  }
];
