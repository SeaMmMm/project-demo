import fold from "@/assets/svg/fold.svg";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import musics from "./data";
import { useLyricsContext } from "./LyricsContext";

const Switch = () => {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const { setInfo } = useLyricsContext();

  const findIndex = (name) => {
    return musics.findIndex((itm) => itm.name === name);
  };

  const handleSelect = (currentValue) => {
    const currentIdx = findIndex(currentValue);

    setIdx(currentIdx);
    setInfo(musics[currentIdx]);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[160px] justify-between"
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
                <CommandItem key={idx} value={idx} onSelect={handleSelect}>
                  {music.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Switch;
