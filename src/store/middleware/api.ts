import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '..';

export const apiMiddleware: Middleware<{}, RootState> = store => next => action => {
 
  const result = next(action);

  if (action.type?.startsWith('api/')) {
    const state = store.getState();
    const token = state.auth?.token;

    if (token) {ضافه کردن token به headers
      action.payload = {
        ...action.payload,
        headers: {
          ...action.payload?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
  }

  return result;
};

export default apiMiddleware;