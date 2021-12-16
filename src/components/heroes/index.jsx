import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
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

const Updating = styled.p`
  text-align: center;
`;

function Heroes() {
  const { heroId } = useParams();
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
    if (heroId) {
      fetchProfile({
        path: `heroes/${heroId}/profile`,
        sessionId: `hero-${heroId}`,
      });
    }
  }, [heroId])

  return (
    <Container>
      <HeroList
        data={heroListData}
        heroId={heroId}
        isLoading={heroListLoading}
      />
      {heroId && (
        <HeroProfile
          data={heroProfileData}
          onClickSaveHandler={onClickSaveHandler}
          isLoading={heroProfileLoading}
        />
      )}
      {updateLoading && <Updating>...資料上傳中</Updating>}
    </Container>
  );
}

export default Heroes;
