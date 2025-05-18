import { gql, useQuery } from '@apollo/client'
import { useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Loading from '@/components/Loading'
import useLyricScrolling from '@/hooks/useLyricScrolling'
import BottomControls from './BottomControls'
import LyricsProvider from './LyricsProvider'

const GET_ALL_MUSICS = gql`
  {
    dmCollection {
      items {
        name
        music {
          description
          url
        }
        lyric
      }
    }
  }
`

function Lyrics() {
  const { loading, error, data } = useQuery(GET_ALL_MUSICS)
  const player = useRef(null)
  const [idx, setIdx] = useState(0)

  const musics = useMemo(() => {
    if (!data)
      return null

    try {
      const { dmCollection: { items } } = data
      return items.map(itm => ({
        name: itm.name,
        music: itm.music.url,
        lyric: itm.lyric,
      }))
    }
    catch (e) {
      console.error('数据处理出错:', e)
      return null
    }
  }, [data])
  const { dom, jumpToLyric, currentIdx } = useLyricScrolling(musics?.[idx]?.lyric, player)

  if (loading || !musics)
    return <Loading />
  if (error)
    return <div>无法获取歌词信息</div>

  return (
    <Wrapper>
      <LyricsProvider value={{ idx, setIdx, musics }}>
        {dom}
        <BottomControls jumpToLyric={jumpToLyric} currentIdx={currentIdx} />
        <audio src={musics[idx]?.music} controls ref={player} />
      </LyricsProvider>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 30px;
  justify-content: center;
  align-items: center;

  audio {
    width: 500px;
    height: 50px;
    background-color: #fff;
    border-radius: 10px;

    @media (max-width: 500px) {
      width: 90vw;
      border-radius: 5px;
      height: 40px;
      font-size: 12px;
      padding: 0 10px;
    }
  }
`

export default Lyrics
