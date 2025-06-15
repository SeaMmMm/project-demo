import Matter from 'matter-js'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useWindowSize from '@/hooks/useWindowSize'

function Ball() {
  const sceneRef = useRef(null)
  const engineRef = useRef(null)
  const renderRef = useRef(null)
  const worldRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragCurrent, setDragCurrent] = useState({ x: 0, y: 0 })
  const [previewBall, setPreviewBall] = useState(null)

  const { width, height } = useWindowSize()
  const worldWidth = width / 1.4
  const worldHeight = height / 1.2

  useEffect(() => {
    // 1. 创建引擎和世界
    const engine = Matter.Engine.create()
    const world = engine.world
    engineRef.current = engine
    worldRef.current = world

    // 2. 关闭重力
    engine.gravity.y = 0
    engine.gravity.x = 0

    // 3. 创建四面墙壁
    const walls = [
      Matter.Bodies.rectangle(worldWidth / 2, 0, worldWidth, 20, { isStatic: true }),
      Matter.Bodies.rectangle(worldWidth / 2, worldHeight, worldWidth, 20, { isStatic: true }),
      Matter.Bodies.rectangle(0, worldHeight / 2, 20, worldHeight, { isStatic: true }),
      Matter.Bodies.rectangle(worldWidth, worldHeight / 2, 20, worldHeight, { isStatic: true }),
    ]

    // 4. 添加墙壁到世界
    Matter.World.add(world, walls)

    // 5. 创建渲染器
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width: worldWidth,
        height: worldHeight,
        wireframes: false,
        background: 'white',
      },
    })
    renderRef.current = render

    Matter.Render.run(render)
    Matter.Runner.run(Matter.Runner.create(), engine)

    // 6. 清理函数
    return () => {
      Matter.Render.stop(render)
      Matter.World.clear(world)
      Matter.Engine.clear(engine)
      render.canvas.remove()
      render.textures = {}
    }
  }, [worldHeight, worldWidth])

  // 获取鼠标在 canvas 内的坐标
  const getMousePos = useCallback((e) => {
    const rect = sceneRef.current.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  // 鼠标按下
  const handleMouseDown = useCallback((e) => {
    const pos = getMousePos(e)
    setIsDragging(true)
    setDragStart(pos)
    setDragCurrent(pos)

    // 创建预览球
    const ball = Matter.Bodies.circle(pos.x, pos.y, 20, {
      isStatic: true,
      render: {
        fillStyle: 'rgba(11, 133, 219, 0.5)',
      },
    })
    setPreviewBall(ball)
    Matter.World.add(worldRef.current, ball)
  }, [getMousePos])

  // 鼠标移动
  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !previewBall)
      return

    const pos = getMousePos(e)
    setDragCurrent(pos)

    // 计算拖拽距离
    const distance = Math.sqrt(
      (pos.x - dragStart.x) ** 2 + (pos.y - dragStart.y) ** 2,
    )

    // 根据距离调整球的大小 (最小20，最大60)
    const radius = Math.min(Math.max(20 + distance / 10, 20), 60)

    // 更新预览球的位置和大小
    Matter.Body.setPosition(previewBall, { x: dragStart.x, y: dragStart.y })
    Matter.Body.scale(previewBall, radius / previewBall.circleRadius, radius / previewBall.circleRadius)
  }, [isDragging, previewBall, dragStart, getMousePos])

  // 鼠标松开
  const handleMouseUp = useCallback(() => {
    if (!isDragging || !previewBall)
      return

    // 计算方向和距离
    const deltaX = dragStart.x - dragCurrent.x
    const deltaY = dragStart.y - dragCurrent.y
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    // 移除预览球
    Matter.World.remove(worldRef.current, previewBall)

    // 创建真正的球
    const radius = Math.min(Math.max(20 + distance / 10, 20), 60)
    const ball = Matter.Bodies.circle(dragStart.x, dragStart.y, radius, {
      restitution: 0.8,
      friction: 0.01,
      frictionAir: 0.02,
    })

    // 设置初速度 (距离越远速度越快)
    const speed = Math.min(distance / 10, 30)
    const angle = Math.atan2(deltaY, deltaX)
    Matter.Body.setVelocity(ball, {
      x: speed * Math.cos(angle),
      y: speed * Math.sin(angle),
    })

    Matter.World.add(worldRef.current, ball)

    // 重置状态
    setIsDragging(false)
    setPreviewBall(null)
  }, [isDragging, previewBall, dragStart, dragCurrent])

  return (
    <Container $worldWidth={worldWidth} $worldHeight={worldHeight}>
      <div
        className="matter"
        ref={sceneRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // 鼠标离开时也松开
      />
      {isDragging && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <line
            x1={dragStart.x}
            y1={dragStart.y}
            x2={dragCurrent.x}
            y2={dragCurrent.y}
            stroke="#0775e3"
            strokeWidth="2"
          />
        </svg>
      )}
    </Container>
  )
}

const Container = styled.div`
  ${({ $worldWidth, $worldHeight }) => `
    width: ${$worldWidth}px;
    height: ${$worldHeight}px;
  `}
  margin: 0 auto;
  position: relative;
  cursor: crosshair;

  .matter {
    width: 100%;
    height: 100%;
  }
`

export default Ball
