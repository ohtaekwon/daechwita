import styled from "@emotion/styled";

export const Wrapper = styled.header<any>`
  position: fixed;
  z-index: 2;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 8px calc((100% - 1080px) / 2);
  border-bottom: 1px solid ${({ theme }) => theme.colors.zinc_200};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
