import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid gray;
  text-align: center;
  font-size: 20px;
  > p {
    margin: 1em 0;
  }
  cursor: pointer;
  box-shadow: ${(props) => (props.highlight ? '3px 3px 8px gray' : 'none')};
`;

const ImageWrapper = styled.div`
  padding-top: 100%;
  position: relative;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

function HeroCard({
  id,
  image,
  name,
  highlight,
  onClickHandler,
}) {
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
      <ImageWrapper>
        <img
          src={image}
          alt={`hero ${name}`}
        />
      </ImageWrapper>
      <p>{name}</p>
    </Container>
  );
}

export default memo(HeroCard);
