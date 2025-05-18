import { CircleChevronLeft, CircleChevronRight, ExternalLink, History, Locate } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
`

function BoardHistory({ gameState, setGameState }) {
  const { pieces } = gameState
  const [boardIndex, setBoardIndex] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(null)

  const BoardsToShow = pieces.map(piece => piece.Board)

  const toNextBoard = (e, direction) => {
    setBoardIndex((prev) => {
      const currentIdx = prev ?? activeIdx
      const newIdx = currentIdx + direction

      return Math.max(0, Math.min(newIdx, pieces.length - 1))
    })
  }

  const handleViewBoard = (idx) => {
    setActiveIdx(idx)
    setDialogOpen(true)
  }

  // 当 Dialog 关闭时，重置查看状态
  const handleDialogOpenChange = (isOpen) => {
    setDialogOpen(isOpen)
    if (!isOpen) {
      setBoardIndex(null)
    }
  }

const setToCurrentState = () => {
  const currentViewIndex = boardIndex !== null ? boardIndex : activeIdx;
  
  if (currentViewIndex < pieces.length - 1) {
    const newPieces = [...pieces].slice(0, currentViewIndex + 1);
    
    // 重建棋盘状态
    const boardSize = gameState.places.length;
    const newPlaces = Array.from({ length: boardSize }, () => 
      Array.from({ length: boardSize }));
    
    // 只填充保留的棋子位置
    newPieces.forEach(piece => {
      const { x, y, player } = piece;
      newPlaces[y][x] = player;
    });
    
    setGameState(prevState => ({
      ...prevState,
      pieces: newPieces,
      places: newPlaces, // 更新places二维数组
      activePlayer: newPieces[newPieces.length - 1].player * -1,
      isWin: false
    }));
    
    setDialogOpen(false);
    setBoardIndex(null);
  }
};

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="mr-2 h-4 w-4" />
          历史记录
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            游戏历史
          </SheetTitle>
          <SheetDescription>查看走法</SheetDescription>
        </SheetHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>玩家</TableHead>
              <TableHead>位置</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pieces.map((piece, idx) => {
              const { x, y, player } = piece
              const playerToShow = player === 1 ? '黑' : '白'

              return (
                <TableRow key={`${x}-${y}`}>
                  <TableCell className="font-bold">{playerToShow}</TableCell>
                  <TableCell>{`${x}-${y}`}</TableCell>
                  <TableCell>
                    {/* 点击图标时触发 handleViewBoard */}
                    <ExternalLink
                      className="size-4 hover:cursor-pointer"
                      onClick={() => handleViewBoard(idx)}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </SheetContent>

      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="relative flex flex-col items-center">
          {activeIdx !== null && (
            <>
              <DialogHeader className="self-start w-full">
                <DialogTitle>当前棋局</DialogTitle>
                <DialogDescription>
                  {pieces[activeIdx]
                    && `${pieces[activeIdx].player === 1 ? '黑' : '白'} 
                    ${pieces[activeIdx].x}-${pieces[activeIdx].y}`}
                </DialogDescription>
              </DialogHeader>
              <BoardContainer className="relative">
                {BoardsToShow[boardIndex !== null ? boardIndex : activeIdx]}
                <Controls>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={e => toNextBoard(e, -1)}
                    disabled={(boardIndex ?? activeIdx) === 0}
                  >
                    <CircleChevronLeft />
                  </Button>
                  <Button variant="secondary" size="icon" onClick={setToCurrentState}>
                    <Locate />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={e => toNextBoard(e, 1)}
                    disabled={(boardIndex ?? activeIdx) === pieces.length - 1}
                  >
                    <CircleChevronRight />
                  </Button>
                </Controls>
              </BoardContainer>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Sheet>
  )
}

const Controls = styled.div`
  position: absolute;
  bottom:0;
  margin: 0 auto;

  display: flex;
  gap: 20px;
`

export default BoardHistory
