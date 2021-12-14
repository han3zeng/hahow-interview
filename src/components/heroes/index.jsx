import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import useLazyQuery from '../../hooks/useLazyQuery';
import HeroList from './HeroList';
import HeroProfile from './HeroProfile';

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

function Heroes() {
  const { heroId } = useParams();
  const navigate = useNavigate();
  const { data: heroListData, isLoading } = useQuery({
    method: 'GET',
    path: 'heroes',
  });
  const [fetchProfile, { data: heroProfileData }] = useLazyQuery({
    method: 'GET',
  });

  const onClickCardHandler = useCallback(({
    id,
  }) => {
    navigate(`/heroes/${id}`);
  }, []);

  useEffect(() => {
    fetchProfile({
      path: `heroes/${heroId}/profile`,
    });
  }, [heroId])

  if (isLoading) {
    return null;
  }

  return (
    <Container>
      <HeroList
        data={heroListData}
        onClickHandler={onClickCardHandler}
        heroId={heroId}
      />
      {heroId && (
        <HeroProfile
          data={heroProfileData}
        />
      )}
    </Container>
  );
}

export default Heroes;
