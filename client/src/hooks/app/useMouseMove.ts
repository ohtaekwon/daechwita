import React from "react";

type mouseCoords = {
  clientX: number;
  clientY: number;
};

const useMouseMove = () => {
  const [coords, setCoords] = React.useState<number[]>([0, 0]);

  React.useEffect(() => {
    const handler = ({ clientX, clientY }: mouseCoords) => {
      setCoords([clientX, clientY]);
    };
    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  return coords;
};
export default useMouseMove;
