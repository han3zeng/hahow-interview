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
`;

function HeroList({
  data,
  onClickHandler,
  heroId,
}) {
  const content = (() => {
    if (!data) {
      return null;
    }
    return data.map(({
      id,
      image,
      name
    }) => (
      <HeroCard
        id={id}
        image={image}
        name={name}
        onClickHandler={onClickHandler}
        highlight={id === heroId}
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
