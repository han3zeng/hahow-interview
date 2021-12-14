import React, { useEffect } from 'react';
import styled from 'styled-components';
import useAPI from '../../hooks/useAPI';
import HeroList from './HeroList';


const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

function Heroes() {
  const { data, isLoading } = useAPI({
    method: 'GET',
    path: 'heroes',
  });

  if (isLoading) {
    return null;
  };

  return (
    <Container>
      <HeroList
        data={data}
      />
    </Container>
  );
}

export default Heroes;
