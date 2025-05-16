import { useState } from 'react'
import fold from '@/assets/svg/fold.svg'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useLyricsContext } from './LyricsContext'

function Switch() {
  const [open, setOpen] = useState(false)
  const { idx, setIdx, musics } = useLyricsContext()

  const findIndex = (name) => {
    return musics.findIndex(itm => itm.name === name)
  }

  const handleSelect = (currentValue) => {
    const currentIdx = findIndex(currentValue)

    setIdx(currentIdx)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[160px] justify-between"
        >
          {musics[idx].name}
          <img src={fold} alt="fold" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="选择歌曲" className="h-9" />
          <CommandList>
            <CommandEmpty>No music found.</CommandEmpty>
            <CommandGroup>
              {musics.map((music, idx) => (
                <CommandItem key={crypto.randomUUID()} value={idx} onSelect={handleSelect}>
                  {music.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Switch
