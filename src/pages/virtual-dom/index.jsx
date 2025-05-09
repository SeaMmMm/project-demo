import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import {
  appendNodesAsync,
  appendNodesSync,
  appendNodesWithWorker,
  BATCH_SIZE,
  createVirtualList,
  NODE_NUMS_TO_APPEND,
} from "./addVirtualDom";

const VirtualDom = () => {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const [num, setNum] = useState(0);
  const [virtualListInstance, setVirtualListInstance] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState("virtualList");
  const [isProcessing, setIsProcessing] = useState(false);

  // 处理销毁虚拟列表的逻辑
  useEffect(() => {
    return () => {
      if (virtualListInstance) {
        virtualListInstance.destroy();
      }
    };
  }, [virtualListInstance]);

  // 清理容器内容
  const clearContainer = () => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }
    if (progressRef.current) {
      progressRef.current.textContent = "";
    }
    if (virtualListInstance) {
      virtualListInstance.destroy();
      setVirtualListInstance(null);
    }
  };

  const handleDemo = () => {
    setIsProcessing(true);
    clearContainer();

    // 确保容器存在
    if (!containerRef.current) {
      setIsProcessing(false);
      return;
    }

    const count = Number(num) || 10000; // 默认值或用户输入值

    switch (selectedFunction) {
      case "virtualList":
        handleVirtualList(count);
        break;
      case "appendAsync":
        handleAppendAsync(count);
        break;
      case "appendSync":
        handleAppendSync(count);
        break;
      case "appendWorker":
        handleAppendWorker(count);
        break;
      default:
        handleVirtualList(count);
    }
  };

  // 虚拟列表演示
  const handleVirtualList = (count) => {
    const instance = createVirtualList(
      count,
      containerRef.current,
      30,
      (index) =>
        `<div class="list-item" style="padding: 5px; border-bottom: 1px solid #eee;">项目 ${
          index + 1
        }</div>`
    );

    setVirtualListInstance(instance);
    setIsProcessing(false);
  };

  // 异步追加节点演示
  const handleAppendAsync = (count) => {
    const iterator = NODE_NUMS_TO_APPEND(1, count);

    // 创建进度显示
    const progressEl = document.createElement("div");
    progressEl.className = "progress-info";
    progressRef.current.appendChild(progressEl);

    const startTime = performance.now();

    // 显示初始状态
    progressEl.textContent = "准备添加节点...";

    // 添加中间处理进度回调函数
    const processCallback = (processed, total) => {
      progressEl.textContent = `处理中: ${processed}/${total || count} 项 (${Math.round(
        (processed / count) * 100
      )}%)`;
    };

    appendNodesAsync(
      iterator,
      BATCH_SIZE,
      (vd) => {
        const endTime = performance.now();
        // 检查是否有节点被添加
        if (vd && vd.childElementCount > 0) {
          containerRef.current.appendChild(vd);
          progressEl.textContent = `已添加 ${vd.childElementCount} 个元素，用时: ${(
            endTime - startTime
          ).toFixed(2)}ms`;
        } else {
          // 处理没有节点的情况
          progressEl.textContent = `处理完成，但没有节点被添加。用时: ${(
            endTime - startTime
          ).toFixed(2)}ms`;
          console.warn("虚拟DOM为空或不包含节点");
        }
        setIsProcessing(false);
      },
      // 添加新的进度回调参数
      processCallback
    );

    // 添加错误处理
    try {
      // 现有代码...
    } catch (error) {
      console.error("异步添加节点时出错:", error);
      progressEl.textContent = `处理出错: ${error.message}`;
      setIsProcessing(false);
    }
  };

  // 同步追加节点演示
  const handleAppendSync = (count) => {
    const iterator = NODE_NUMS_TO_APPEND(1, count);

    const progressEl = document.createElement("div");
    progressEl.className = "progress-info";
    progressRef.current.appendChild(progressEl);

    const startTime = performance.now();

    appendNodesSync(iterator, (vd) => {
      const endTime = performance.now();
      containerRef.current.appendChild(vd);
      progressEl.textContent = `已添加 ${containerRef.current.children.length} 个元素，用时: ${(
        endTime - startTime
      ).toFixed(2)}ms`;
      setIsProcessing(false);
    });
  };

  // Web Worker 追加节点演示
  const handleAppendWorker = (count) => {
    const iterator = NODE_NUMS_TO_APPEND(1, count);

    // 创建进度显示
    const progressEl = document.createElement("div");
    progressEl.className = "progress-info";
    progressRef.current.appendChild(progressEl);

    const startTime = performance.now();

    appendNodesWithWorker(
      iterator,
      BATCH_SIZE,
      (vd) => {
        const endTime = performance.now();
        containerRef.current.appendChild(vd);
        progressEl.textContent += `，完成！总用时: ${(endTime - startTime).toFixed(2)}ms`;
        setIsProcessing(false);
      },
      progressEl // 传入进度显示元素
    );
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

        <Select defaultValue={selectedFunction} onValueChange={setSelectedFunction}>
          <SelectTrigger className="max-w-[280px]">
            <SelectValue placeholder="选择添加方法" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="virtualList">虚拟滚动列表</SelectItem>
            <SelectItem value="appendAsync">异步追加节点</SelectItem>
            <SelectItem value="appendSync">同步追加节点</SelectItem>
            <SelectItem value="appendWorker">Worker追加节点</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleDemo} disabled={isProcessing}>
          {isProcessing ? "处理中..." : "开始演示"}
        </Button>
      </Content>

      <InfoText>
        {selectedFunction === "virtualList" &&
          "虚拟列表：只渲染可见区域的DOM节点，即使处理十万条数据也不会卡顿"}
        {selectedFunction === "appendAsync" && "异步追加节点：在浏览器空闲时间批量添加节点"}
        {selectedFunction === "appendSync" && "同步追加节点：一次性添加所有节点，可能导致界面卡顿"}
        {selectedFunction === "appendWorker" &&
          "Worker追加节点：在Web Worker中处理数据，不阻塞主线程"}
      </InfoText>

      <ProgressContainer ref={progressRef}></ProgressContainer>
      <ListContainer ref={containerRef}></ListContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    display: grid;
    align-items: center;
    justify-content: center;
    justify-items: stretch;
  }
`;

const InfoText = styled.div`
  text-align: center;
  margin-bottom: 10px;
  color: #666;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ProgressContainer = styled.div`
  margin-bottom: 10px;
  text-align: center;
  min-height: 24px;
  color: #0066cc;

  .progress-info {
    padding: 5px;
    border-radius: 4px;
    background-color: #f0f8ff;
    display: inline-block;
  }
`;

const ListContainer = styled.div`
  height: 100%;
  border: 1px solid #eee;
  border-radius: 16px;
  overflow: auto;
  flex: 1;
`;

export default VirtualDom;
