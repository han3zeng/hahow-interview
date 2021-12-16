import React, {
  useReducer,
  memo,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { flashing } from '../../styles/animations';

const Container = styled.div`
  margin-top: 50px;
  padding: 20px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  border: 1px solid gray;
  flex-wrap: wrap;
`;

const TotalPointLoading = styled.p`
  animation: ${flashing} 2s linear infinite;
  margin: 1em 0;
  height: 20px;
  width: 100%;
`;

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  > p:first-of-type {
    box-sizing: border-box;
    letter-spacing: 1px;
    margin-right: 30px;
    width: 40px;
    display: inline-block;
  }
  > button {
    padding: 0;
    height: 30px;
    width: 30px;
  }
`;

const Point = styled.p`
  width: 3em;
  margin: 0 1em;
  text-align: center;
  position: relative;
`;

const PointLoading = styled.div`
  animation: ${flashing} 2s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%);
  height: 20px;
  width: 100%;
`;

const Error = styled.span`
  white-space: nowrap;
  font-size: 12px;
  color: ${(props) => props.theme.errorRed};
`;

const ResultGroup = styled.div`
  min-width: 135px;
  > button {
    width: 100%;
  }
`;

const LABEL_MAP = {
  str: 'STR',
  int: 'INT',
  agi: 'AGI',
  luk: 'LUK',
};

const abilityKeys = ['str', 'int', 'agi', 'luk'];

const getLeftPoints = (state) => (
  abilityKeys.reduce((acc, key) => acc - state[key], state.totalPoints)
);

const getTotalPoints = (state) => abilityKeys.reduce((acc, key) => acc + state[key], 0);

const initialState = (() => {
  const state = abilityKeys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, { });
  state.totalPoints = 0;
  return state;
})();

function init(initialData) {
  return {
    ...initialData,
    totalPoints: getTotalPoints(initialData),
  };
}

function reducer(state, action) {
  const [mainActionType, subActionType] = action.type.split('-');
  if (getLeftPoints(state) <= 0 && mainActionType === 'increment') {
    return state;
  }

  if (state[subActionType] <= 0 && mainActionType === 'decrement') {
    return state;
  }
  switch (action.type) {
    case 'reset':
      return {
        ...action.payload,
      };
    case 'increment-str':
      return {
        ...state,
        str: state.str + 1,
      };
    case 'increment-int':
      return {
        ...state,
        int: state.int + 1,
      };
    case 'increment-agi':
      return {
        ...state,
        agi: state.agi + 1,
      };
    case 'increment-luk':
      return {
        ...state,
        luk: state.luk + 1,
      };
    case 'decrement-str':
      return {
        ...state,
        str: state.str - 1,
      };
    case 'decrement-int':
      return {
        ...state,
        int: state.int - 1,
      };
    case 'decrement-agi':
      return {
        ...state,
        agi: state.agi - 1,
      };
    case 'decrement-luk':
      return {
        ...state,
        luk: state.luk - 1,
      };
    default:
      throw new Error();
  }
}

function ControlRowRaw({
  abilityKey: key,
  value,
  dispatch,
  isLoading,
}) {
  return (
    <ControlContainer
      key={key}
    >
      <p>{LABEL_MAP[key]}</p>
      <button
        type="button"
        onClick={() => {
          dispatch({
            type: `decrement-${key}`,
          });
        }}
      >
        -
      </button>
      <Point>
        { isLoading ? <PointLoading /> : value}
      </Point>
      <button
        type="button"
        onClick={() => {
          dispatch({
            type: `increment-${key}`,
          });
        }}
      >
        +
      </button>
    </ControlContainer>
  );
}

const ControlRow = memo(ControlRowRaw);

function HeroProfile({
  data,
  onClickSaveHandler,
  isLoading,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);

  const onClickHandler = (event) => {
    const leftPoinst = getLeftPoints(state);
    if (leftPoinst !== 0) {
      setError('剩餘點數必須為 0');
      return;
    }
    const payload = {
      ...state,
    };
    delete payload.totalPoints;
    onClickSaveHandler({
      event,
      payload,
    });
    setError(null);
  };

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'reset',
        payload: {
          ...init(data),
        },
      });
    }
  }, [data]);

  const abilityControllers = abilityKeys.map((abilityKey) => (
    <ControlRow
      key={abilityKey}
      abilityKey={abilityKey}
      value={state[abilityKey]}
      dispatch={dispatch}
      isLoading={isLoading}
    />
  ));

  const resultContent = (() => {
    if (isLoading) {
      return (
        <TotalPointLoading />
      );
    }
    return (
      <p>
        {`剩餘點數：${getLeftPoints(state)}`}
      </p>
    );
  })();

  return (
    <Container>
      <div>
        {abilityControllers}
      </div>
      <ResultGroup>
        {error && <Error>{error}</Error>}
        {resultContent}
        <button
          type="button"
          onClick={onClickHandler}
        >
          儲存
        </button>
      </ResultGroup>
    </Container>
  );
}

export default memo(HeroProfile);
