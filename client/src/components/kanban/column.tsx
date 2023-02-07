import React from "react";
import Badge from "_common/components/badge";
import Box from "_common/components/box";
import Text from "_common/components/text";
import { ColumnType } from "./enums";
import { BadgeType } from "_common/components/badge/index.types";

const ColumnColorSchema: Record<ColumnType, BadgeType> = {
  Todo: "gray",
  "In Progress": "blue",
  Blocked: "red",
  Completed: "green",
};

const Column = ({ column }: { column: ColumnType }) => {
  return (
    <Box>
      <Text fontSize="md" letterSpacing="1rem">
        <Badge variant={ColumnColorSchema[column]}>{column}</Badge>
      </Text>
    </Box>
  );
};
export default Column;
