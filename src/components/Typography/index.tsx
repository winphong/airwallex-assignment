import styled from "styled-components";

interface TypographyProps {
  size?: string;
  weight?: number;
}
const Label = styled.span<TypographyProps>`
  font-size: ${(props) => props.size ?? props.theme.fontSizes.base};
  color: ${(props) => props.color || props.theme.color.gray1};
  font-weight: ${(props) => props.weight ?? 500};
`;

const Title = styled.h1<TypographyProps>`
  font-size: ${(props) => props.theme.fontSizes.mega};
  text-align: center;
`;

const Typo = { Label, Title };

export default Typo;
