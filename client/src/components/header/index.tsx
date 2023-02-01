import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import * as Styled from "./index.styles";
import theme from "styles/theme";
import Button from "_common/components/button";
import Flex from "_common/components/flex";

const Header = () => {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="white"
      className={css`
        padding: 8px calc((100% - 1080px) / 2);
        border-bottom: 1px solid ${theme.colors.zinc_200};
      `}
    >
      <img src="" alt="로고 위치" width={98} height={23} />
      <Flex as="nav">
        <Link to="/">
          <Button
            variant="zinc_200"
            paddingY={9}
            paddingX={16}
            fontSize="md"
            lineHeight="md"
            color="zinc_400"
          >
            홈
          </Button>
        </Link>
        <Link to="/my-documents">
          <Button
            variant="zinc_200"
            paddingY={9}
            paddingX={16}
            fontSize="md"
            lineHeight="md"
            color="zinc_400"
          >
            나의 글 목록
          </Button>
        </Link>
        <Link to="/profile">
          <Button
            variant="zinc_200"
            paddingY={9}
            paddingX={16}
            fontSize="md"
            lineHeight="md"
            color="zinc_400"
          >
            프로필
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
