import styled from 'styled-components'
import useTimeRotate from '../../../hooks/useTimeRotate'

const Dial = () => {
  const timeRotate = useTimeRotate()

  return (
    <Wrapper $timeRotate={timeRotate}>
      <HourHand className='hour' />
      <MinuteHand className='minute' />
      <SecondHand className='second' />
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
`

const HourHand = styled.div`
  position: absolute;
  width: 120px;
  height: 2px;
  background-color: #000;
  top: 50%;
  left: 50%;
  transform-origin: left;
  transform: rotate(-90deg);
`

const MinuteHand = styled.div`
  position: absolute;
  width: 180px;
  height: 1px;
  background-color: #000;
  top: 50%;
  left: 50%;
  transform-origin: left;
  transform: rotate(-90deg);
`

const SecondHand = styled.div`
  position: absolute;
  width: 240px;
  height: 0.5px;
  background-color: #000;
  top: 50%;
  left: 50%;
  transform-origin: left;
  transform: rotate(-90deg);
`

export default Dial
