import React from "react";
import { useDrag } from "react-dnd";
import { ItemType } from "components/kanban/enums";
import { DragItem, TaskModel } from "components/kanban/models";

/**
 * useDrag 정리
 *
 * const [Collected Props, DragSource Ref,  DragPreview Ref] = useDrag(spec, deps)
 * 1. spec : 사양 개체 또는 사양 개체를 생성하는 함수
 * 2. deps : 메모이제이션에 사용되는 종속성 배열이며 내장된 useMemo의 React 후크처럼 동작합니다.
 * 기본값은 함수 사양의 경우 빈 배열이고 개체 사양의 경우 사양을 포함하는 배열입니다.
 *
 * 3. Collected Props : 수집 기능에서 수집된 속성을 포함하는 개체로서 함수가 정의 되지 않은 경우 collect빈 객체가 반환됩니다.
 * 4. DragSource Ref : 드래그 소스에 대한 커넥터 기능으로 DOM의 드래그 가능한 부분에 연결되어야 합니다.
 * 5. DragPreview Ref: 드래그 프리뷰용 커넥터 기능으로 DOM의 미리보기 부분에 첨부될 수 있습니다.
 */

function useTaskDragAndDrop<T extends HTMLElement>({
  task,
  index,
}: {
  task: TaskModel;
  index: number;
}) {
  const ref = React.useRef<T>(null);
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: ItemType.TASK,
    item: { from: task.column, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // drag할 때, true/false값
    }),
  });

  drag(ref);

  return {
    ref,
    isDragging,
  };
}

export default useTaskDragAndDrop;
