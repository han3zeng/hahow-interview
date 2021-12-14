import React, { useReducer, memo, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 50px;
  padding: 20px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  border: 1px solid gray;
  flex-wrap: wrap;
`;

const ControlContainer = styled.div`
  > p {
    box-sizing: border-box;
    letter-spacing: 1px;
    margin-right: 30px;
    width: 40px;
    display: inline-block;
  }
  > span {
    text-align: center;
    display: inline-block;
    width: 30px;
  }
  > button {
    padding: 0;
    height: 30px;
    width: 30px;
  }
`;

const ResultGroup = styled.div`
  width: 120px;
  > button {
    width: 100%;
  }
`;

const initialState = {
  str: 0,
  int: 0,
  agi: 0,
  luk: 0,
};

const LABEL_MAP = {
  str: 'STR',
  int: 'INT',
  agi: 'AGI',
  luk: 'LUK',
};

const abilityKeys = ['str', 'int', 'agi', 'luk'];

const getLeftPoints = (state) => (
  abilityKeys.reduce((acc, key) => acc - state[key], state.defaultSum)
);

const getTotalPoints = (state) => abilityKeys.reduce((acc, key) => acc + state[key], 0);

function init(initialData) {
  return {
    ...initialData,
    defaultSum: getTotalPoints(initialData),
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
      <span>{value}</span>
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
}) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

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
    />
  ));

  return (
    <Container>
      <div>
        {abilityControllers}
      </div>
      <ResultGroup>
        <p>{`剩餘點數：${getLeftPoints(state)}`}</p>
        <button>儲存</button>
      </ResultGroup>
    </Container>
  );
}



export default HeroProfile;
