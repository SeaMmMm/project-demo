const info = {
  'drum': {
    projectName: 'drum',
    date: '2024-4-29',
    description: 'Press the corresponding key to play the drum sound',
    url: 'https://github.com/SeaMmMm/project-demo/blob/main/src/pages/drum/index.jsx',
  },
  'clock': {
    projectName: 'clock',
    date: '2024-4-3',
    description: 'This is a simple clock that displays the current time.',
    url: 'https://github.com/SeaMmMm/project-demo/blob/main/src/pages/clock/index.jsx',
  },
  'slider': {
    projectName: 'slider',
    date: '2024-5-4',
    description: 'range slider with custom styles',
    url: 'https://github.com/SeaMmMm/project-demo/blob/main/src/pages/slider/index.jsx',
  },
  'cardio': {
    projectName: 'cardio',
    date: '2024-5-6',
    description: 'Array Cardio Day 1',
    url: 'https://github.com/SeaMmMm/project-demo/blob/main/src/pages/cardio/index.jsx',
  },
  'md': {
    projectName: 'md',
    date: '2024-5-11',
    description: 'try to use markdown in react.(react-markdown)',
    url: 'https://github.com/SeaMmMm/project-demo/blob/main/src/pages/css-topics/index.jsx',
  },
  'scope': {
    projectName: 'scope',
    date: '2024-5-19',
    description: 'drag the box to see the scope of the variable change',
    url: 'https://github.com/SeaMmMm/project-demo/blob/main/src/pages/scope/index.jsx',
  },
  'tic-toc': {
    projectName: 'tic-toc',
    date: '2024-7-18',
    description: 'Tic-Toc game',
    url: 'https://github.com/SeaMmMm/project-demo/blob/main/src/pages/tic-toc/index.jsx',
  },
  'virtual-dom': {
    projectName: 'virtual-dom',
    date: '2025-03-21',
    description: 'append large nodes to document',
    url: 'https://github.com/SeaMmMm/project-demo/tree/main/src/pages/virtual-dom/index.jsx',
  },
  'music': {
    projectName: 'music',
    date: '2025-05-08',
    description: 'Simulate lyrics scrolling effect',
    url: 'https://github.com/SeaMmMm/project-demo/blob/main/src/pages/lyric/index.jsx',
  },
  'gomoku': {
    projectName: 'gomoku',
    date: '2025-05-13',
    description: 'Simple Gomoku game',
  },
}

Object.keys(info).forEach((key, idx) => {
  info[key].number = idx + 1
})

export default info
