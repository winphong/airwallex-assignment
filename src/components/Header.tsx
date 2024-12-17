import styled from "styled-components";

export const Header = () => {
  return (
    <FixedContainer>
      <HeaderText>Broccoli & Co.</HeaderText>
    </FixedContainer>
  );
};

const FixedContainer = styled.div`
  position: fixed;
  width: 100vw;
  border-bottom: 2px solid ${(props) => props.theme.color.gray4};
`;

const HeaderText = styled.h1`
  font-size: 1.5rem;
  padding: 0.5rem 2rem;
`;
