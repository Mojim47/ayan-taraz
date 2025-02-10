import { Middleware } from 'redux';
import { RootState } from '..';

export const apiMiddleware: Middleware<{}, RootState> =
  store => next => action => {
    // اجرای action اصلی
    const result = next(action);

    // اضافه کردن token به همه درخواست‌های API
    if (action.type?.startsWith('api/')) {
      const state = store.getState();
      const token = state.auth?.token;

      if (token) {
        // اضافه کردن token به headers
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
