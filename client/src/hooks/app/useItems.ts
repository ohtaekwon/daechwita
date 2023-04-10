import React from "react";

export enum ITEM_KEY {
  DOCUMENTS = "documents",
}
interface Item {
  id: string;
  title: string;
  text: string;
  tag: string;
}
export interface ItemList {
  documents: Item[];
}

/**
 * @description 자기소개서 입력 폼의 컨텐츠에 대한 커스텀 훅(Hook)
 * @param itemKey useItems의 키 값 설정
 * @param addItem useItems의 추가할 아이템의 요소로 구성
 * @items 기본값으로 id, tag, text, title로 구성
 */

function useItems(column: ITEM_KEY.DOCUMENTS, addItem: Item) {
  const [itemList, setItemList] = React.useState<ItemList>({
    documents: [
      {
        id: "",
        text: "",
        title: "",
        tag: "",
      },
    ],
  });

  const add = React.useCallback(() => {
    console.log("item을 추가합니다.");
    setItemList((allItems) => {
      const snapshot = allItems[column];
      return {
        [column]: [...snapshot, addItem],
      };
    });
  }, [itemList, setItemList]);

  const _delete = React.useCallback(
    (id: string) => {
      console.log(`item - ${id}을 삭제 중입니다...`);
      setItemList((allItems) => {
        const snapshot = allItems[column];
        return {
          ...allItems,
          [column]: snapshot.filter((task) => task.id !== id),
        };
      });
    },
    [itemList, setItemList]
  );

  const update = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: string = "") => {
      console.log(`item - ${id}를 작성 중입니다...`);
      setItemList((allItems) => {
        let newData;
        const snapshot = allItems[column];
        const targetIndex = snapshot.findIndex((item) => item.id === id);
        if (targetIndex < 0) throw Error("없습니다.");
        snapshot[targetIndex][e.target.name as "title" | "text" | "tag"] =
          e.target.value;
        newData = snapshot;
        return {
          ...allItems,
          [column]: newData,
        };
      });
    },
    [itemList, setItemList]
  );

  return {
    add,
    update,
    _delete,
    items: itemList,
    setItems: setItemList,
  };
}
export default useItems;
