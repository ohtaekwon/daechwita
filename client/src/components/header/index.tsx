import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

import theme from "styles/theme";

import Button from "_common/components/button";
import Flex from "_common/components/flex";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import Icons from "_common/components/icons";
import Box from "_common/components/box";

const Header = ({ transparent }: React.PropsWithChildren<Props>) => {
  const isTransparent = transparent ? "white" : "black";
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="transparent"
      className={css`
        padding: 8px calc((100% - 1680px) / 2);
        border-bottom: ${transparent
          ? 0
          : `1px solid ${theme.colors.zinc_200}`};
      `}
    >
      <Box
        as="nav"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo_${isTransparent}.png`}
            alt="로고 위치"
            width={100}
            height={50}
            style={{
              objectFit: "cover",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </Link>
        <Link to="/schedules">
          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="lg"
            lineHeight="md"
            color={isTransparent}
          >
            입사 지원 현황
          </Button>
        </Link>
        <Link to="/resumes">
          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="lg"
            lineHeight="md"
            color={isTransparent}
          >
            자소서
          </Button>
        </Link>
        <Link to="/my-interview">
          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="lg"
            lineHeight="md"
            color={isTransparent}
          >
            면접
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
            color={transparent ? "white" : "zinc_400"}
          >
            <Icons>
              <AiOutlineHome size={20} title="홈버튼" />
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
            color={transparent ? "white" : "zinc_400"}
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
