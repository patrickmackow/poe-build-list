import styled, { keyframes } from "styled-components";

const Container = styled.div`
  padding: 0 1em;

  @media (min-width: 35em) {
    max-width: 1080px;
    margin: 0 auto;
  }
`;

const Error = styled.div``;

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const Loader = styled.div`
  border: ${(props) => props.borderSize || "10px"} solid #f3f3f3;
  border-top: ${(props) => props.borderSize || "10px"} solid hsl(27.5, 25%, 35%);
  border-radius: 50%;
  width: ${(props) => props.size || "75px"};
  height: ${(props) => props.size || "75px"};
  animation: ${spin} 1.5s linear infinite;
`;

const LoaderContainer = styled.div`
  margin-top: 7em;

  @media (min-width: 40em) {
    margin-top: 10em;
  }

  div {
    margin: 0 auto;
  }
`;

function CentredLoader() {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
}

export { Container, Error, Loader, CentredLoader };
