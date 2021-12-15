import React, { useMemo, memo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

function CardComp({
  id,
  image,
  name,
  highlight,
  onClickHandler,
}) {
  return (
    <Card
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
    </Card>
  );
};

const MemoizedCard = memo(CardComp);

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
      <MemoizedCard
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
