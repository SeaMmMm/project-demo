import styled from 'styled-components'
import current from '@/assets/svg/current.svg'
import { Button } from '@/components/ui/button'
import Switch from './Switch'

function BottomControls({ jumpToLyric, currentIdx, ...props }) {
  const jumpToCurrentLyrics = () => {
    jumpToLyric(currentIdx)
  }

  return (
    <Wrapper {...props}>
      <Button variant="outline" size="icon">
        <img src={current} alt="currentIndex" onClick={jumpToCurrentLyrics} />
      </Button>
      <Switch />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  * {
    cursor: pointer;
  }

  img {
    width: 20px;
  }
`

export default BottomControls
