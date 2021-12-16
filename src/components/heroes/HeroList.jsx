import React, { memo } from 'react';
import styled from 'styled-components';
import HeroCard from './HeroCard';

const Container = styled.div`
  display: grid;
  gap: 2em 1em;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  border: 1px solid gray;
  padding: 1em;
  box-sizing: border-box;
  a {
    text-decoration: none;
  }
`;

const defaultData = {
  id: null,
  image: null,
  name: null,
};

function HeroList({
  data,
  heroId,
  isLoading,
}) {
  const content = (() => {
    const receivedData = isLoading ? new Array(4).fill(defaultData) : data;
    return receivedData.map(({
      id,
      image,
      name
    }, index) => (
      <HeroCard
        key={`heroCard-${id}-${index}`}
        id={id}
        image={image}
        name={name}
        highlight={id === heroId}
        isLoading={isLoading}
      />
    ));
  })();
  return (
    <Container>
      {content}
    </Container>
  );
}

export default memo(HeroList);
