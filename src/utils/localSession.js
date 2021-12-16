function localSession() {
  const cache = {};
  const outdatedSet = new Set();

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

const {
  getData,
  setData,
  setOudatedFlag,
} = localSession();

export {
  getData,
  setData,
  setOudatedFlag,
};
