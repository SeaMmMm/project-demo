import boom from '../../../assets/sounds/boom.wav'
import clap from '../../../assets/sounds/clap.wav'
import hihat from '../../../assets/sounds/hihat.wav'
import kick from '../../../assets/sounds/kick.wav'
import openhat from '../../../assets/sounds/openhat.wav'
import ride from '../../../assets/sounds/ride.wav'
import snare from '../../../assets/sounds/snare.wav'
import tink from '../../../assets/sounds/tink.wav'
import tom from '../../../assets/sounds/tom.wav'

const drums = [
  { index: 0, letter: 'A', description: 'CLAP', audio: clap },
  { index: 1, letter: 'S', description: 'HIHAT', audio: hihat },
  { index: 2, letter: 'D', description: 'KICK', audio: kick },
  { index: 3, letter: 'F', description: 'OPENHAT', audio: openhat },
  { index: 4, letter: 'G', description: 'BOOM', audio: boom },
  { index: 5, letter: 'H', description: 'RIDE', audio: ride },
  { index: 6, letter: 'J', description: 'SNARE', audio: snare },
  { index: 7, letter: 'K', description: 'TINK', audio: tink },
  { index: 8, letter: 'L', description: 'TOM', audio: tom },
]

export default drums
