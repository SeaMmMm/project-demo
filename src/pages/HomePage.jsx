import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import demo from '../assets/icons/demo.svg'
import { projects } from '../routes'
import getFilledNumber from '../utils/common/getFilledNumber'

const HomePage = () => {
  const [elements, setElements] = useState(projects)
  const navigate = useNavigate()
  const changeMade = (project) => {
    navigate(project.path)
  }

  useEffect(() => {
    setElements(projects)
  }, [])

  return (
    <Wrapper>
      <Content>
        <p>
          <span>Demo projects </span>
          <img src={demo} alt='icon' />
        </p>
        <Projects>
          {elements.map((project, idx) => (
            <div key={idx} className='project' onClick={() => changeMade(project)}>
              <span className='project-idx'>{getFilledNumber(idx + 1, 3)}</span>
              <span className='project-name'>{project.name}</span>
            </div>
          ))}
        </Projects>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    top: 20%;
    left: 20%;
    transform: translate(-20%, -20%);
  }
`

const Content = styled.div`
  display: grid;
  align-items: center;
  justify-items: start;
  grid-template-columns: 2 auto;
  gap: 20px;
  text-align: center;

  p {
    font-size: 20px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
  }
  img {
    /* 适配其他浏览器 */
    -webkit-user-drag: none;
    -moz-window-dragging: no-drag;
    -webkit-user-select: none;
    /* 禁止选中文本 */
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    position: absolute;
    top: 50%;
    right: -0.7rem;
    transform: translateY(-50%);
  }
`

const Projects = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 60px;
  row-gap: 10px;
  color: #d1d5db;

  * {
    transition: all 0.2s ease-in-out;
  }

  .project-name {
    color: #9ca3af;
  }

  .project {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    &:hover {
      .project-idx {
        color: #9ca3af;
      }
      .project-name {
        color: #374151d2;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: auto;
    row-gap: 20px;
  }
`

export default HomePage
