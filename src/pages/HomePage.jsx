import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import getFilledNumber from '../utils/common/getFilledNumber'

const HomePage = () => {
  const [elements] = useState([{ name: 'drums', url: 'drum' }])
  const navigate = useNavigate()
  const changeMade = (project) => {
    navigate(project.url)
  }

  return (
    <Wrapper>
      <Content>
        <p>Demo projects</p>
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
  background-color: #ffffff;
  height: 100vh;
`

const Content = styled.div`
  width: auto;
  display: grid;
  align-items: center;
  justify-items: start;
  grid-template-columns: 2 auto;
  gap: 20px;
  padding: 150px 300px;
  text-align: center;

  p {
    font-size: 20px;
    font-weight: 800;
  }
`

const Projects = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
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
    gap: 8px;
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
`

export default HomePage
