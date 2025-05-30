import styled from 'styled-components'
import useTimeRotate from '@/hooks/useTimeRotate'

function Dial() {
  const { timeRotate, shouldTransition } = useTimeRotate()

  return (
    <Wrapper $timeRotate={timeRotate} $shouldTransition={shouldTransition}>
      <HourHand className="hour" />
      <MinuteHand className="minute" />
      <SecondHand className="second" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  border: 1px solid #000;
  border-radius: 50%;
  width: 500px;
  height: 500px;
  font-size: 2rem;
  position: relative;

  .hour {
    ${({ $timeRotate }) => `rotate: ${$timeRotate.hourRotate}deg;`}
  }

  .minute {
    ${({ $timeRotate }) => `rotate: ${$timeRotate.minuteRotate}deg;`}
  }

  .second {
    ${({ $timeRotate }) => `rotate: ${$timeRotate.secondRotate}deg;`}
  }

  * {
    ${({ $shouldTransition }) => ($shouldTransition ? 'transition: all 0.3s ease-in-out;' : '')}
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`

const HourHand = styled.div`
  position: absolute;
  width: 140px;
  height: 3px;
  background-color: #000;
  top: 50%;
  left: 50%;
  transform-origin: left;
  transform: rotate(-90deg);

  @media (max-width: 768px) {
    width: 100px;
    height: 2px;
  }
`

const MinuteHand = styled.div`
  position: absolute;
  width: 190px;
  height: 2px;
  background-color: #000;
  top: 50%;
  left: 50%;
  transform-origin: left;
  transform: rotate(-90deg);

  @media (max-width: 768px) {
    width: 120px;
    height: 1px;
  }
`

const SecondHand = styled.div`
  position: absolute;
  width: 240px;
  height: 1px;
  background-color: #000;
  top: 50%;
  left: 50%;
  transform-origin: left;
  transform: rotate(-90deg);

  @media (max-width: 768px) {
    width: 140px;
    height: 1px;
  }
`

export default Dial
