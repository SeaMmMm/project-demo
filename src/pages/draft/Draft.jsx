/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { mouseEnterAndLeave, mouseOverAndOut } from './scripts/mouseHover'

const Draft = () => {
  const parentRef = useRef(null)
  const childRef = useRef(null)

  useEffect(() => {
    // mouseenter和mouseleave事件不会冒泡，只有mouseover和mouseout事件会冒泡

    // const removeLisener = mouseOverAndOut(parentRef, childRef)
    const removeLisener2 = mouseEnterAndLeave(parentRef, childRef)

    return () => {
      // removeLisener()
      removeLisener2()
    }
  }, [])

  return (
    <Wrapper>
      <div className='parent' ref={parentRef}>
        parent
        <div className='child' ref={childRef}>
          child
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000;

  .parent {
    width: 200px;
    height: 200px;
    border: 1px solid #f00;
    position: relative;
    margin: 20px;
  }

  .child {
    width: 100px;
    height: 100px;
    border: 1px solid #0f0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
export default Draft
