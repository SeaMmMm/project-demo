import {
  Ball,
  Cardio,
  Clock,
  CssTopicPage,
  Drum,
  Gomoku,
  Lyrics,
  Scope,
  Slider,
  TicToc,
  VirtualDom,
} from './projects'

export default [
  { path: 'drum', element: <Drum />, name: 'drum' },
  { path: 'clock', element: <Clock />, name: 'clock' },
  { path: 'slider', element: <Slider />, name: 'slider' },
  { path: 'cardio', element: <Cardio />, name: 'cardio' },
  { path: 'md', element: <CssTopicPage />, name: 'md' },
  { path: 'scope', element: <Scope />, name: 'scope' },
  { path: 'tic-toc', element: <TicToc />, name: 'tic-toc' },
  { path: 'virtual-dom', element: <VirtualDom />, name: 'virtual-dom' },
  { path: 'music', element: <Lyrics />, name: 'music' },
  { path: 'gomoku', element: <Gomoku />, name: 'gomoku' },
  { path: 'drag-ball', element: <Ball />, name: 'drag-ball' },
]
