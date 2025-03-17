import { DataKey } from '@/enums/localStorage';
import { setItem } from '@/utils/local-storage';
import { name as appConfigSliceName } from '@/slices/appConfig';

export const configPersister = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith(`${appConfigSliceName}/`)) {
    const appConfig = store.getState().appConfig;
    setItem(DataKey.APP_CONFIG, appConfig);
  }

  return result;
};
