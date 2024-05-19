import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useWindowSize from '../../hooks/useWindowSize'
import scopeInfo from './data/description'

const Scope = () => {
  const date = { year: 2024, month: 5, day: 19 }
  const { width, height } = useWindowSize()

  return (
    <>
      <Header date={date} isFixed={true} />
      <Box>
        <Text $width={width} $height={height}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint repellat labore esse
          reiciendis debitis perferendis minus molestias consequuntur laboriosam voluptatum,
          culpa distinctio! Eligendi unde laborum, libero vel soluta accusamus omnis? Corrupti
          delectus nemo quaerat nisi nobis impedit corporis expedita consectetur adipisci
          repudiandae autem, cumque explicabo sed tempore similique architecto ratione sequi
          magnam qui accusantium nostrum suscipit molestias temporibus! Dolorum, quibusdam.
          Esse quae at quisquam est minus laboriosam voluptates necessitatibus magnam ipsam
          nulla qui sint quidem placeat, veniam commodi nostrum ratione. Sunt nulla libero
          reiciendis porro ad molestias aut exercitationem minima? Sunt recusandae aliquam et.
          Libero aliquid ducimus odit molestiae. Commodi placeat facere eum. Dolore doloribus
          natus porro libero eius provident veritatis veniam eum, sapiente molestiae deserunt
          culpa accusantium ratione doloremque. Iusto aliquam quod molestias veniam animi
          assumenda alias qui fuga natus repellat illum, perferendis soluta minima mollitia
          possimus nobis expedita! Molestias ipsum rem exercitationem voluptate molestiae at
          velit laborum id. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          animi nulla sed magnam, possimus illo exercitationem modi et non. Placeat, inventore
          ipsum. Repellat saepe ullam rem, nihil dicta mollitia recusandae. Repudiandae
          reiciendis magni autem ipsam accusamus voluptatem veritatis rerum dolorum in
          aspernatur nostrum sunt tempore, dolores id soluta quaerat odit nisi, quo similique
          praesentium magnam explicabo. Expedita iusto ducimus mollitia. Nihil doloribus vel
          eligendi voluptas facere architecto possimus, voluptates minus repudiandae
          consequuntur, asperiores enim optio tempora perferendis illum esse, consectetur eos.
          Vitae id laudantium architecto quis eum laborum nulla voluptatum? Adipisci voluptatem
          autem incidunt fugiat, laboriosam, iusto, harum quasi ipsum quisquam impedit culpa
          laborum neque! Iste aperiam nobis minus fugiat nemo illo odit saepe, veniam atque
          reiciendis possimus provident consequatur? vel eligendi voluptas facere architecto
          possimus, voluptates minus repudiandae consequuntur, asperiores enim optio tempora
          perferendis illum esse, consectetur eos. Vitae id laudantium architecto quis eum
          laborum nulla voluptatum? Adipisci voluptatem autem incidunt fugiat, laboriosam,
          iusto, harum quasi ipsum quisquam impedit culpa laborum neque! Iste aperiam nobis
          minus fugiat nemo illo odit saepe, veniam atque reiciendis possimus provident
          consequatur? vel eligendi voluptas facere architecto possimus, voluptates minus
          repudiandae consequuntur, asperiores enim optio tempora perferendis illum esse,
          consectetur eos. Vitae id laudantium architecto quis eum laborum nulla voluptatum?
          Adipisci voluptatem autem incidunt fugiat, laboriosam, iusto, harum quasi ipsum
          quisquam impedit culpa laborum neque! Iste aperiam nobis minus fugiat nemo illo odit
          saepe, veniam atque reiciendis possimus provident consequatur? vel eligendi voluptas
          facere architecto possimus, voluptates minus repudiandae consequuntur, asperiores
          enim optio tempora perferendis illum esse, consectetur eos. Vitae id laudantium
          architecto quis eum laborum nulla voluptatum? Adipisci voluptatem autem incidunt
          fugiat, laboriosam, iusto, harum quasi ipsum quisquam impedit culpa laborum neque!
          Iste aperiam nobis minus fugiat nemo illo odit saepe, veniam atque reiciendis
          possimus provident consequatur? vel eligendi voluptas facere architecto possimus,
          voluptates minus repudiandae consequuntur, asperiores enim optio tempora perferendis
          illum esse, consectetur eos. Vitae id laudantium architecto quis eum laborum nulla
          voluptatum? Adipisci voluptatem autem incidunt fugiat, laboriosam, iusto, harum quasi
          ipsum quisquam impedit culpa laborum neque! Iste aperiam nobis minus fugiat nemo illo
          odit saepe, veniam atque reiciendis possimus provident consequatur?
        </Text>
      </Box>
      <Footer index={10} data={scopeInfo} />
    </>
  )
}

const Box = styled.div`
  position: fixed;
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  z-index: 10;
  overflow: hidden;
  background: white;
`

const Text = styled.div`
  position: absolute;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  font-family: 'Input', sans-serif;
  line-height: 1.5;
  font-size: 1.2rem;
  padding: 2.5rem 20px;
  text-align: justify;
  overflow-y: hidden;
`

export default Scope
