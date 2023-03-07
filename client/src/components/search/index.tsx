import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useInput from "hooks/app/useInput";

import Section from "components/section";
import Flex from "_common/components/flex";
import Input from "_common/components/input";
import Box from "_common/components/box";
import Button from "_common/components/button";

const Search = () => {
  const { value: search, onChange, inputRef } = useInput("");

  return (
    <>
      <Box
        width="1000px"
        height="50px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="inherit"
        position="relative"
        margin="auto"
      >
        <Button variant="default" position="absolute" top={0} right={0}>
          <AiOutlineSearch size={30} />
        </Button>
        <Input
          type="text"
          name="search"
          ref={inputRef}
          value={search}
          onChange={onChange}
          variant="search_1"
        />
      </Box>
    </>
  );
};

export default Search;
