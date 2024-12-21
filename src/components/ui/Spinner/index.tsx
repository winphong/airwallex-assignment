import ReactDOM from "react-dom";
import styled from "styled-components";

const Spinner = () => {
  return ReactDOM.createPortal(
    <Container>
      <CircularSpinner role="status" />
    </Container>,
    document.body // Renders the Spinner at the top level of the DOM
  );
};

const CircularSpinner = styled.div`
  border: 4px solid transparent;
  border-top-color: ${(props) => props.theme.color.gray1};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  background-color: ${(props) => props.theme.color.gray3};
  z-index: 9999;
  pointer-events: all;
`;

export default Spinner;
