import React from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { ItemType, TaskModel, DragItem } from "types/index.types";

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

function useTaskDragAndDrop<T extends HTMLElement>(
  {
    task,
    index,
  }: {
    task: TaskModel;
    index: number;
  },
  handleDropHover: (i: number, j: number) => void
) {
  const ref = React.useRef<T>(null);
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: ItemType.TASK,
    item: { from: task.column, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), //isDragging 변수가 현재 드래깅중인지 아닌지를 리턴해주는 부분.
    }),
  });

  const [_, drop] = useDrop<DragItem, void, unknown>({
    accept: ItemType.TASK,
    hover: (item, monitor) => {
      if (!ref.current) return;

      const draggedItemIndex = item.index; // 드래그된 해당 아이템의 인덱스
      const hoveredItemIndex = index; // 위에 올려진 해당 아이템의 인덱스

      if (draggedItemIndex === hoveredItemIndex) return; // 이동하지 않은 경우

      const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex; // 위에 올려질 인덱스가 뒤에 있을 경우
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered; // 위에 올려질 인덱스가 앞에 있을 경우

      // get 마우스 좌표
      // drag 작업이 진행되는 동안 포인터가 마지막으로 기록된 클라이언트 오프셋을 반환
      // drag 항목이 없으면 null
      const { x: mouseX, y: mouseY } = monitor.getClientOffset() as XYCoord;

      console.log(mouseX, mouseY);
      // get hover한 item의 사각형 경계면
      // getBoundingClientRect | 현재 뷰포트의 브라우저 엘리먼트 좌표 값 구하기
      const hoveredBoundingRect = ref.current.getBoundingClientRect();

      // get hover한 item의 사각형 경계면의 중간 높이
      // (아래값 - 위의 값) / 2 = 중간
      const hoveredMiddleHeight =
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;

      // 상대 위치
      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;

      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;

      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoveredMiddleHeight;

      // 마우스가 항목 높이의 절반을 넘은 경우에만 이동을 수행합니다.
      // 아래로 드래그할 때 커서가 50% 이하일 때만 이동
      // 위로 끌 때 커서가 50% 이상일 때만 이동

      if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) {
        return;
      }

      if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) {
        return;
      }

      // 다 통과되면 실제 작업 실행
      // '드래그된 해당 아이템의 인덱스'와 '위에 올려진 해당 아이템의 인덱스'를 swap
      handleDropHover(draggedItemIndex, hoveredItemIndex);

      // 참고: 여기에서 모니터 항목을 변경하고 있기 때문에
      // 일반적으로 mutation을 피하는 것이 좋지만,
      // 하지만 성능을 위해 여기가 좋다.
      // 이미 인덱스 탐색을 했었기 때문에, 다른 곳에서 할 경우 또다시 인덱스 탐색을 해야하기에
      // 무리한 인덱스 탐색을 피할 수 있다.

      // swap하고 인덱스 덮어쓰기
      item.index = hoveredItemIndex;
    },
  });

  drag(drop(ref));

  return {
    ref,
    isDragging,
  };
}

export default useTaskDragAndDrop;
