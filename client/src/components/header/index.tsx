import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import * as Styled from "./index.styles";
import theme from "styles/theme";
import Button from "_common/components/button";
import Flex from "_common/components/flex";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import Icons from "_common/components/icons";

const Header = () => {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="white"
      className={css`
        padding: 8px calc((100% - 2000px) / 2);
        border-bottom: 1px solid ${theme.colors.zinc_200};
      `}
    >
      <img src="" alt="로고 위치" width={98} height={23} />
      <Flex as="nav">
        <Link to="/">
          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="md"
            lineHeight="md"
            color="zinc_400"
          >
            <Icons>
              <AiOutlineHome size={20} />
            </Icons>
          </Button>
        </Link>
        <Link to="/my-documents">
          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="md"
            lineHeight="md"
            color="black"
          >
            <Icons>
              <AiOutlinePlusCircle size={20} />
            </Icons>
          </Button>
        </Link>
        <Link to="/profile">
          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="md"
            lineHeight="md"
            color="zinc_400"
          >
            <Icons>
              <AiOutlineUser size={20} />
            </Icons>
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
