import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import useLazyQuery from '../../hooks/useLazyQuery';
import useMutation from '../../hooks/useMutation';
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
  const { data: heroListData, isLoading: heroListLoading } = useQuery({
    method: 'GET',
    path: 'heroes',
  });
  const [fetchProfile, { data: heroProfileData, isLoading: heroProfileLoading }] = useLazyQuery({
    method: 'GET',
  });
  const [updateData, { isLoading: updateLoading }] = useMutation({
    method: 'PATCH',
  });

  const onClickCardHandler = useCallback(({
    id,
  }) => {
    navigate(`/heroes/${id}`);
  }, []);

  const onClickSaveHandler = useCallback(({
    event,
    payload,
  }) => {
    event.preventDefault();
    if (!updateLoading) {
      updateData({
        path: `heroes/${heroId}/profile`,
        payload,
        outdatedKey: `hero-${heroId}`,
      });
    }
  }, [heroId, updateLoading]);

  useEffect(() => {
    fetchProfile({
      path: `heroes/${heroId}/profile`,
      sessionId: `hero-${heroId}`,
    });
  }, [heroId])
  // if (heroListLoading || heroProfileLoading || updateLoading) {
  //   return <Loading isLoading />;
  // }

  return (
    <Container>
      <HeroList
        data={heroListData}
        onClickHandler={onClickCardHandler}
        heroId={heroId}
        isLoading={heroListLoading}
      />
      {heroId && (
        <HeroProfile
          data={heroProfileData}
          onClickSaveHandler={onClickSaveHandler}
        />
      )}
    </Container>
  );
}

export default Heroes;
