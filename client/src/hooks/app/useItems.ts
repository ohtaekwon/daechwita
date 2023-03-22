import React from "react";
import { v4 as uuid } from "uuid";

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

function useItems(
  column: ITEM_KEY.DOCUMENTS,
  // initialValue: ItemList = {
  //   documents: [],
  // },
  addItem: Item
) {
  // const defaultValue = initialValue[ITEM_KEY.DOCUMENTS]
  //   ? initialValue
  //   : { documents: [addItem] };

  const [itemList, setItemList] = React.useState<ItemList>({
    documents: [
      {
        id: "",
        text: "본문을 입력해주세요.",
        title: "제목을 입력해주세요.",
        tag: "태그를 입력해주세요.",
      },
    ],
  });

  const add = React.useCallback(() => {
    console.log("item을 추가합니다.");
    setItemList((allItems) => {
      console.log(`item을 추가하였습니다.`);

      const snapshot = allItems[column];
      return {
        [column]: [...snapshot, addItem],
      };
    });
  }, [itemList, setItemList]);

  const _delete = React.useCallback(
    (id: string) => {
      console.log(`item -  ${id}을 삭제 중입니다...`);
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
