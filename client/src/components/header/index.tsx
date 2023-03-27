/** @jsxImportSource @emotion/react */

import { Link } from "react-router-dom";

import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

import * as Styled from "./index.styles";
import { Props } from "./index.types";

import theme from "styles/theme";

import Button from "_common/components/button";
import Flex from "_common/components/flex";
import Icons from "_common/components/icons";
import Box from "_common/components/box";
import { media } from "utils/media";
import { css } from "@emotion/react";
// import { css } from "@emotion/css";

const Header = ({ transparent }: React.PropsWithChildren<Props>) => {
  const headerStyles = css`
    padding: 8px calc((100% - 1280px) / 2);
    border-bottom: ${transparent ? 0 : `1px solid ${theme.colors.zinc_200}`};
  `;
  const isTransparent = transparent ? "white" : "black";
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={transparent ? "transparent" : "white"}
      css={headerStyles}
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
            css={css`
              object-fit: cover;
              justify-content: center;
              align-items: center;
            `}
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
            css={responsive}
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
            css={responsive}
          >
            자소서
          </Button>
        </Link>
        <Link to="/interview">
          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="lg"
            lineHeight="md"
            color={isTransparent}
            css={responsive}
          >
            면접
          </Button>
        </Link>
      </Box>
      <Flex as="nav">
        <Link to="/">
          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="md"
            lineHeight="md"
            color={transparent ? "white" : "zinc_400"}
            css={responsive}
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
            css={responsive}
          >
            <Icons>
              <AiOutlineUser size={20} title="회원 정보" />
            </Icons>
          </Button>
        </Link>
        <Button
          variant="default"
          paddingY={9}
          paddingX={16}
          fontSize="md"
          css={hamburgerStyles}
        >
          <GiHamburgerMenu size={30} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;

const responsive = css`
  ${media[0]} {
    display: none;
  }
  ${media[1]} {
    display: block;
  }
  ${media[2]} {
    display: block;
  }
`;

const hamburgerStyles = css`
  ${media[0]} {
    display: block;
  }
  ${media[1]} {
    display: none;
  }
  ${media[2]} {
    display: none;
  }
`;
