import React from "react";

import { useDrop } from "react-dnd";
import { ColumnType, ItemType, TaskModel, DragItem } from "types/index.types";

/**
 * useDrop 정리
 *
 * const [collectedProps, DropTarget Ref] = useDrop(specArg, deps?)
 *
 * 1. spec : 사양 개체 또는 사양 개체를 생성하는 함수
 * 2. deps : 메모이제이션에 사용되는 종속성 배열이며 내장된 useMemo의 React 후크처럼 동작합니다.
 * 기본값은 함수 사양의 경우 빈 배열이고 개체 사양의 경우 사양을 포함하는 배열입니다.
 *
 * 3. Collected Props : 수집 기능에서 수집된 속성을 포함하는 개체로서 함수가 정의 되지 않은 경우 collect빈 객체가 반환됩니다.
 * 4. DropTarget Ref : 놓기 대상에 대한 커넥터 기능입니다. DOM의 놓기 대상 부분에 연결되어야 합니다.
 *
 *
 * 보통 사용
 * const [collectedProps, drop] = useDrop(() => ({accept}))
 *
 * accept: 지정한 유형에 대해서 드래그 소스를 반응하도록 함.
 * drop(item, monitor)? : 호환되는 항목이 대상에 떨어질 때 호출
 * collect : 구성 요소에 삽입하기 위해 반환할 props의 일반 개체를 반환해야 합니다.
 */

function useColumnDrop(
  column: ColumnType,
  handleDrop: (fromColumn: ColumnType, taskId: TaskModel["id"]) => void
) {
  const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ItemType.TASK, // 어떤 소스에서만 반응할지 결정
    drop: (dragItem) => {
      console.log("drag", dragItem);
      // DragItem의 from과 column의 타입이 같으면
      if (!dragItem || dragItem.from === column) {
        return;
      }
      handleDrop(dragItem.from, dragItem.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return {
    isOver,
    dropRef,
  };
}

export default useColumnDrop;
