import Section from "components/section";
import TodoExample from "example/beautiful-dnd/todoExample";
import React from "react";
import Flex from "_common/components/flex";

export type TItemStatus = "todo" | "doing";

export type TItem = {
  id: string;
  status: TItemStatus;
  title: string;
  index: number;
};

export type TItems = {
  [key in TItemStatus]: TItem[];
};

const MyDashBoard = ({ leftNav }: { leftNav: React.ReactNode }) => {
  const [items, setItems] = React.useState<TItems>({
    todo: [...Array(5)].map((_, i) => ({
      id: `${i}${i}${i}`,
      title: `Title ${i + 1}000`,
      status: "todo",
      index: i,
    })),
    doing: [],
  });

  // console.log("doing", items);
  return (
    <>
      <div
        className="myDashBoard"
        style={{ width: "100%", backgroundColor: "#eaeaea" }}
      >
        <Flex as="main">
          {leftNav}
          <Section as="section">
            <div className="min-h-[700px]">
              <TodoExample items={items} setItems={setItems} />
            </div>
          </Section>
        </Flex>
      </div>
    </>
  );
};
export default MyDashBoard;
