import Column from "example/react-dnd/column";
import React from "react";
import { v4 as uuid } from "uuid";

type ItemType = "documents";

interface ItemList {
  documents: {
    id: string;
    title: string;
    text: string;
    tag: string;
  }[];
}

function useItems(column: ItemType, addItem: any) {
  const [itemList, setItemList] = React.useState<ItemList>({
    documents: [
      {
        id: "",
        title: "",
        text: "",
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
