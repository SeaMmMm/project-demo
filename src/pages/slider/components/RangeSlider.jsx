import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const SIZE = {
  small: 10,
  medium: 20,
  large: 30,
}

const RangeSlicer = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  callback,
  width = 300,
  size = 'medium',
}) => {
  const [thumbSize, setThumbSize] = useState(SIZE[size])

  useEffect(() => {
    setThumbSize(SIZE[size])
  }, [size])

  return (
    <RangeSlider
      type='range'
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={callback}
      $width={width}
      $thumbSize={thumbSize}
    />
  )
}

RangeSlicer.prototype = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
  width: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
}

const RangeSlider = styled.input`
  --c: #9ca3af; /* active color */
  --g: 8px; /* the gap */
  --l: 5px; /* line thickness*/
  --s: ${({ $thumbSize }) => $thumbSize}px; /* thumb size */

  /* width: 400px; input width */
  width: ${({ $width }) => $width}px;
  height: var(--s);
  appearance: none;
  background: none;
  cursor: pointer;
  overflow: hidden;

  &::-webkit-slider-thumb {
    height: var(--s);
    aspect-ratio: 1; // 用来设置宽高比，这里是1:1
    border-radius: 50%;
    box-shadow: 0 0 0 var(--l) inset var(--c);
    border-image: linear-gradient(90deg, var(--c) 50%, #d1d5db 0) 0 1 /
      calc(50% - var(--l) / 2) 100vw/0 calc(100vw + var(--g));
    transition: all 0.3s ease-in-out;
    appearance: none;
    -webkit-appearance: none;

    &:active {
      box-shadow: 0 0 0 var(--s) inset var(--c);
    }
  }

  &::-webkit-range-thumb {
    box-shadow: 0 0 0 var(--l) inset var(--c);
    transition: all 0.3s ease-in-out;

    &:active {
      box-shadow: 0 0 0 var(--s) inset var(--c);
    }
    &:focus-visible {
      box-shadow: 0 0 0 var(--s) inset var(--c);
    }
  }
`

export default RangeSlicer
