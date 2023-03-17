import React from "react";

function useColumnCollection() {
  const [schedules, setSchedules] = React.useState({
    first: [],
    second: [],
    third: [],
    final: [],
  });
  return [schedules, setSchedules];
}

export default useColumnCollection;
