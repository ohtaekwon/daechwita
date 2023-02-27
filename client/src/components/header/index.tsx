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
import Box from "_common/components/box";

const Header = () => {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="white"
      className={css`
        padding: 8px calc((100% - 1480px) / 2);
        border-bottom: 1px solid ${theme.colors.zinc_200};
      `}
    >
      <Box as="nav">
        <img src="" alt="로고 위치" width={98} height={23} />
        <Link to="/">
          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="md"
            lineHeight="md"
            color="zinc_400"
          >
            나의 스케쥴 관리
          </Button>
        </Link>
        <Link to="/">
          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="md"
            lineHeight="md"
            color="zinc_400"
          >
            자기소개서
          </Button>
        </Link>
      </Box>
      <Box as="nav">
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
              <AiOutlineHome size={20} title="홈버튼" />
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
              <AiOutlinePlusCircle size={20} title="자소서 쓰기" />
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
              <AiOutlineUser size={20} title="회원 정보" />
            </Icons>
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
