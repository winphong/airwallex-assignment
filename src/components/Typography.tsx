import styled from "styled-components";

export const Label = styled.span`
  font-size: ${(props) => props.theme.fontSizes.base};
  color: ${(props) => props.color || props.theme.color.gray1};
  font-weight: 500;
`;
