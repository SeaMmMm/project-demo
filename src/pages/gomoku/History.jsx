import { ExternalLink, History } from 'lucide-react'
import styled from 'styled-components'
import { TextAnimate } from '@/components/magicui/text-animate'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  TableCaption,
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
  const { pieces, isWin, activePlayer } = gameState

  const handleClick = (piece) => {
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <History />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll h-auto">
        <SheetHeader>
          <SheetTitle>
            <TextAnimate animation="slideLeft" by="character" once>
              GOMOKU
            </TextAnimate>
          </SheetTitle>
          <SheetDescription>
            历史走子
          </SheetDescription>
          <Table>
            {isWin && (
              <TableCaption>
                { activePlayer === 1 ? '白 win' : '黑 win'}
              </TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead>落子方</TableHead>
                <TableHead>步数</TableHead>
                <TableHead>棋局</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pieces.map((piece) => {
                const { x, y, player, Board } = piece
                const playerToShow = player === 1 ? '黑' : '白'
                return (
                  <TableRow key={crypto.randomUUID()}>
                    <TableCell className="font-bold">
                      {playerToShow}
                    </TableCell>
                    <TableCell>
                      {`${x}-${y}`}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <ExternalLink
                            className="size-4 hover:cursor-pointer"
                            onClick={() => handleClick(piece)}
                          />
                        </DialogTrigger>
                        <DialogContent className="relative flex flex-col items-center">
                          <DialogHeader className="self-start w-full">
                            <DialogTitle>当前棋局</DialogTitle>
                            <DialogDescription>{`${playerToShow} ${x}-${y}`}</DialogDescription>
                          </DialogHeader>
                          <BoardContainer className="relative">
                            {Board}
                          </BoardContainer>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}

export default BoardHistory
