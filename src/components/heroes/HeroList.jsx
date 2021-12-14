import React, { useMemo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  gap: 2em 1em;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  border: 1px solid gray;
  padding: 1em;
  box-sizing: border-box;
`;

const Card = styled.div`
  border: 1px solid gray;
  text-align: center;
  font-size: 20px;
  > p {
    margin: 1em 0;
  }
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

function HeroList({
  data,
}) {
  const content = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.map(({
      id,
      image,
      name
    }) => (
      <Card
        key={id}
      >
        <ImageWrapper>
          <img
            src={image}
            alt={`hero ${name}`}
          />
        </ImageWrapper>
        <p>{name}</p>
      </Card>
    ));
  }, [data]);
  return (
    <Container>
      {content}
    </Container>
  );
}

export default HeroList;
