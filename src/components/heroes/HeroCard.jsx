import React, { memo } from 'react';
import styled from 'styled-components';
import { flashing } from '../../styles/animations';

const Container = styled.div`
  border: 1px solid gray;
  text-align: center;
  font-size: 20px;
  > p {
    margin: 1em 0;
  }
  cursor: pointer;
  box-shadow: ${(props) => (props.highlight ? '3px 3px 8px gray' : 'none')};
  transition: box-shadow 0.3s ease-in-out;
`;

const ImageWrapper = styled.div`
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  > img {
    transform: ${(props) => (props.highlight ? 'scale(1.4)' : 'scale(1)')};
    transition: transform 0.3s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const LoadingSquare = styled.div`
  animation: ${flashing} 2s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

function HeroCard({
  id,
  image,
  name,
  highlight,
  onClickHandler,
  isLoading,
}) {
  const imageContent = (() => {
    if (isLoading) {
      return (
        <LoadingSquare />
      );
    }
    return (
      <img
        src={image}
        alt={`hero ${name}`}
      />
    );
  })();
  return (
    <Container
      key={id}
      highlight={highlight}
      onClick={() => {
        onClickHandler({
          id,
        });
      }}
    >
      <ImageWrapper
        highlight={highlight}
      >
        {imageContent}
      </ImageWrapper>
      <p>{name || '---'}</p>
    </Container>
  );
}

export default memo(HeroCard);
