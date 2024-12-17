import styled from "styled-components";

export const Header = () => {
  return (
    <FixedHeader>
      <HeaderText>Broccoli & Co.</HeaderText>
    </FixedHeader>
  );
};

const FixedHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderText = styled.h1`
  font-size: 1.5rem;
  padding: 0.5rem 2rem;
`;
