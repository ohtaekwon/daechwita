/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import _ from "lodash";

import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import theme from "styles/theme";

import * as Styled from "./index.styles";
import { Props } from "./index.types";

import Button from "_common/components/button";
import Flex from "_common/components/flex";
import Icons from "_common/components/icons";
import Box from "_common/components/box";
import Text from "_common/components/text";

import { media } from "utils/media";
import Modal from "components/modal";
import useModal from "hooks/app/useGoBack";
import useUser from "lib/firebase/useUser";
// import { css } from "@emotion/css";
import { useQueryClient } from "react-query";

const Header = ({ transparent }: React.PropsWithChildren<Props>) => {
  const { user, logout } = useUser();
  const headerStyles = css`
    padding: 8px calc((100% - 1280px) / 2);
    border-bottom: ${transparent ? 0 : `1px solid ${theme.colors.zinc_200}`};
  `;
  const isTransparent = transparent ? "white" : "black";

  const [isOpen, setIsOpen] = React.useState(false);
  const { modalShow, toggleModal, cancel } = useModal();
  const handleToggle = () => {
    setIsOpen((isOpen) => {
      return !isOpen;
    }); // on,off 개념 boolean
  };

  const handleHamburgerMenu = () => {
    toggleModal(true);
  };

  const handleLogOut = () => logout();

  return (
    <>
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
          {leftNavMenu.map((menu) => (
            <React.Fragment key={menu.name}>
              <Link to={menu.route}>
                <Button
                  variant="default"
                  paddingY={9}
                  paddingX={16}
                  fontSize="lg"
                  lineHeight="md"
                  color={isTransparent}
                  css={responsive}
                >
                  {menu.name}
                </Button>
              </Link>
            </React.Fragment>
          ))}
        </Box>
        <Flex
          as="nav"
          css={css`
            position: relative;
          `}
        >
          {rightNavMenu.map((menu) => (
            <React.Fragment key={menu.name}>
              <Link to={menu.route}>
                <Button
                  variant="default"
                  paddingY={9}
                  paddingX={16}
                  fontSize="md"
                  lineHeight="md"
                  color={transparent ? "white" : "zinc_400"}
                  css={responsive}
                >
                  <Icons>{menu.icon}</Icons>
                </Button>
              </Link>
            </React.Fragment>
          ))}

          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="md"
            lineHeight="md"
            color={transparent ? "white" : "zinc_400"}
            css={responsive}
            onClick={handleToggle}
          >
            <Icons>
              <AiOutlineUser size={20} title="회원 정보" />
            </Icons>
          </Button>
          <Button
            variant="default"
            paddingY={9}
            paddingX={16}
            fontSize="md"
            css={hamburgerStyles}
            onClick={handleHamburgerMenu}
          >
            <GiHamburgerMenu size={30} />
          </Button>
          {isOpen && (
            <ul
              onMouseOver={() => setIsOpen(true)}
              onMouseOut={() => setIsOpen(false)}
              css={css`
                background-color: transparent;
                width: 230px;
                height: 250px;
                position: absolute;
                top: 60px;
                z-index: 99;
                display: flex;
                left: -80px;
                align-items: center;
                justify-content: center;
                transition: all 1s ease 0.1s;
              `}
            >
              <ul
                css={css`
                  width: 150px;
                  height: 200px;
                  background-color: #ffffff;
                  top: 100px;
                  display: flex;
                  flex-direction: column;
                  border-radius: 8px;
                  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.37);
                `}
              >
                <Link to="/temp/resumes">
                  <li css={toggleMenuStyles}>임시글</li>
                </Link>
                <li css={toggleMenuStyles} onClick={handleLogOut}>
                  로그아웃
                </li>
              </ul>
            </ul>
          )}
        </Flex>
      </Flex>
      {/* 반응형일떄 모달창 */}
      <Modal
        elementId="modal"
        width="100%"
        height="100%"
        show={modalShow}
        cancel={cancel}
      >
        <Box
          as="nav"
          display="flex"
          direction="column"
          padding="1rem"
          width="100%"
          height="100%"
        >
          <Flex
            width="100%"
            justifyContent="space-around"
            direction="column"
            alignItems="center"
            css={css`
              padding: 1rem;
              height: 100%;
              box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.37);
            `}
          >
            {hamburgerMenu.map((menu) => (
              <React.Fragment key={menu.name}>
                <Link to={menu.route}>
                  <Text
                    fontSize="xxl"
                    fontWeight={700}
                    textAlign="center"
                    css={textStyle}
                    onClick={cancel}
                  >
                    {menu.name}
                  </Text>
                </Link>
              </React.Fragment>
            ))}
          </Flex>
        </Box>
      </Modal>
    </>
  );
};

export default Header;

const leftNavMenu = [
  { route: "/schedules", name: "입사 지원 현황" },
  { route: "/resumes", name: "자기소개서" },
  { route: "/interview", name: "면접" },
];

const rightNavMenu = [
  {
    route: "/",
    name: "홈아이콘",
    icon: <AiOutlineHome size={20} title="홈버튼" />,
  },
];

const hamburgerMenu = [
  { route: "/", name: "홈" },
  // { route: "/schedules", name: "회원 정보" },
  { route: "/temp/resumes", name: "임시 글" },
  { route: "/schedules", name: "입사 지원 현황" },
  { route: "/resumes", name: "자기소개서" },
  { route: "/interview", name: "면접" },
];

const toggleMenuStyles = css`
  width: 100%;
  height: 50px;
  font-size: ${theme.fontSize.lg};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const responsive = css`
  ${media[0]} {
    display: none;
  }
  ${media[1]} {
    display: none;
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
    display: block;
  }
  ${media[2]} {
    display: none;
  }
`;

const textStyle = css`
  width: 100%;
  height: 50px;
  padding: 1rem;
`;
