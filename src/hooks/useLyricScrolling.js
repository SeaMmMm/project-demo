import { useEffect, useRef, useState } from 'react'
import generateDom from '../components/LyricsList'
import { useToast } from './use-toast'

/**
 * 解析歌词字符串，提取时间戳和歌词文本
 * @param {string} lyric - 包含时间戳的歌词文本，格式应为 "[时间戳]歌词文本"
 * @param {Function} toast - 显示通知的函数，用于显示解析错误
 * @returns {Array<{time: string, lyric: string}>} 包含时间和歌词的对象数组
 */
function generateLyricList(lyric, toast) {
  const lines = lyric.split('\n')
  const result = []

  lines.forEach((str) => {
    try {
      const parts = str.split(']')
      if (parts.length < 2)
        return
      const time = parts[0].slice(1)
      result.push({ time, lyric: parts[1].slice(0, -2) })
    }
    catch {
      toast({
        title: 'Error parsing lyrics',
        description: `Invalid format: ${str}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  })

  return result
}

function parseTime(timeStr) {
  const parts = timeStr.split(':')
  return +parts[0] * 60 + +parts[1]
}

function findIdx(audio, lyricsGroup) {
  const currentTime = audio.currentTime

  for (let i = 0; i < lyricsGroup.length; i++) {
    const { time } = lyricsGroup[i]
    const timeInSeconds = parseTime(time)
    if (currentTime < timeInSeconds) {
      return i - 1
    }
  }

  return lyricsGroup.length - 1
}

/**
 * @description 歌词滚动的自定义 Hook，实现歌词与音频同步、自动滚动到当前歌词位置等功能
 * @param {string|object} lyric - 歌词数据，可以是 LRC 格式的字符串或已处理的歌词对象
 * @param {React.RefObject} player - 音频播放器的 React ref 对象
 * @param {object} [options] - 配置选项
 * @param {string} [options.scrollBehavior] - 滚动行为，可选值："smooth"(平滑)或"auto"(即时)
 * @param {string} [options.scrollPosition] - 当前歌词在可视区域的位置，可选值："start"、"center"、"end"、"nearest"
 * @param {number} [options.activeScale] - 当前活跃歌词的缩放比例
 *
 * @returns {object} 返回歌词相关状态和控制方法，包括：
 *   {JSX.Element} dom - 渲染的歌词 DOM 元素
 *   {number} currentIdx - 当前活跃歌词的索引
 *   {React.RefObject} lyricElementWrapper - 歌词容器的 ref 对象
 *   {Array} lyricsGroup - 处理后的歌词数组
 *   {Function} jumpToLyric - 跳转到指定歌词的函数，参数为歌词索引
 *
 * @example
 * const { dom, currentIdx, lyricElementWrapper, jumpToLyric } = useLyricScrolling(
 *   lyricData,
 *   audioPlayerRef,
 *   { scrollPosition: "center", activeScale: 1.5 }
 * );
 *
 * return (
 *   <div ref={lyricElementWrapper} className="lyrics-container">
 *     {dom}
 *   </div>
 * );
 */
function useLyricScrolling(lyric, player, options = {}) {
  if (!lyric)
    lyric = ''
  const { toast } = useToast()
  const [currentIdx, setCurrentIdx] = useState(-1)
  const lyricElementWrapper = useRef(null)

  const { scrollBehavior = 'smooth', scrollPosition = 'center', activeScale = 1.2 } = options
  const lyricsGroup = generateLyricList(lyric, toast)
  const dom = generateDom(lyricsGroup, currentIdx, lyricElementWrapper, activeScale)

  useEffect(() => {
    if (!player.current)
      return

    const audio = player.current
    const handleTimeUpdate = () => {
      const idx = findIdx(audio, lyricsGroup)
      if (idx !== currentIdx) {
        setCurrentIdx(idx)
      }
    }
    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [currentIdx, lyricsGroup, player])

  useEffect(() => {
    if (currentIdx === -1 || !lyricElementWrapper.current)
      return

    const lyricElement = lyricElementWrapper.current.children
    const activeLyric = lyricElement[currentIdx || 0]
    activeLyric.scrollIntoView({
      behavior: scrollBehavior,
      block: scrollPosition,
      inline: 'nearest',
    })
  }, [currentIdx, scrollBehavior, scrollPosition])

  /**
   * 跳转到指定索引的歌词位置
   *
   * @param {number} index - 要跳转到的歌词索引
   * @returns {void}
   * @description 将播放器的播放位置设置为指定索引歌词的时间点，并更新当前歌词索引。
   * 如果索引无效或播放器引用不存在，则不执行任何操作。
   */
  const jumpToLyric = (index) => {
    const lyricElement = lyricElementWrapper.current.children

    if (index > lyricElement.length)
      index = lyricElement.length - 1
    const activeLyric = lyricElement[index < 0 ? 0 : index]

    activeLyric.scrollIntoView({
      behavior: scrollBehavior,
      block: scrollPosition,
      inline: 'nearest',
    })
  }

  return { dom, currentIdx, lyricElementWrapper, lyricsGroup, jumpToLyric }
}

export default useLyricScrolling
