import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRef, useState } from "react";
import styled from "styled-components";
import { NODE_NUMS_TO_APPEND, appendNodesAsync, BATCH_SIZE } from "./addVirtualDom";

const VirtualDom = () => {
  const footerRef = useRef(null);
  const [num, setNum] = useState(0);
  const nodeToAppend = NODE_NUMS_TO_APPEND(0, Number(num));

  const addToVirtualDom = () => {
    appendNodesAsync(nodeToAppend[Symbol.iterator](), BATCH_SIZE, (virtualDom) => {
      footerRef.current.appendChild(virtualDom);
    });
  };

  return (
    <Wrapper>
      <Content>
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={(v) => setNum(v)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button onClick={addToVirtualDom}>添加</Button>
      </Content>
      <footer ref={footerRef}></footer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export default VirtualDom;
