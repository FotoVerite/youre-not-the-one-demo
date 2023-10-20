import { useCallback, useEffect, useState } from "react";

import { getData } from "src/utility/storage";
import { AppResolverType, AsyncStorageType, CACHED_KEYS } from "../types";

// These are the contexts that need to digest their records before we can display the app.

const initialStorageState = Object.values(CACHED_KEYS).reduce((hash, key) => {
  hash[key] = false;
  return hash;
}, {} as AppResolverType);

const useCacheResolver = () => {
  const [appResolver, _setAppResolver] =
    useState<AppResolverType>(initialStorageState);
  const [cachedData, setCachedData] = useState<AsyncStorageType>();

  useEffect(() => {
    const cb = async () => {
      const getDataPromises = Object.values(CACHED_KEYS).map(async (value) => {
        const data = await getData(value);
        return { key: value, value: data };
      });
      const data = await Promise.all(getDataPromises);
      const asyncStorageData = data.reduce((acc, data) => {
        acc[data.key] = data.value;
        return acc;
      }, {} as AsyncStorageType);
      setCachedData(asyncStorageData);
    };
    cb();
  }, []);

  const setAppResolver = useCallback(
    (key: CACHED_KEYS, value: boolean) => {
      _setAppResolver((state) => {
        return { ...state, ...{ [key]: value } };
      });
    },
    [_setAppResolver]
  );

  return [cachedData, appResolver, setAppResolver] as const;
};

export default useCacheResolver;
