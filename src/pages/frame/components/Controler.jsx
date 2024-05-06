import styled from 'styled-components'
import RangeSlicer from '../../slider/components/RangeSlider'

const Controler = ({ label, value, callback }) => {
  return (
    <Div>
      {label}
      <RangeSlicer value={value} width={100} size='small' max={80} callback={callback} />
    </Div>
  )
}

const Div = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

export default Controler
