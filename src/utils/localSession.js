const cache = {};
const outdatedSet = new Set();

function localSession() {
  const setOudatedFlag = ({
    key,
  }) => {
    if (key) outdatedSet.add(key);
  };

  const setData = ({
    payload,
    key,
  }) => {
    cache[key] = { ...payload };
    outdatedSet.delete(key);
  };

  const getData = ({
    key,
  }) => {
    if (outdatedSet.has(key) || !key) {
      return undefined;
    }
    return cache[key];
  };

  return {
    getData,
    setData,
    setOudatedFlag,
  };
}

export default localSession;
