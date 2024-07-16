import { getCookie, deleteCookie, setCookie } from "cookies-next";

export const cookiesStore = {
  set: (cookie: string, value: string) => {
    setCookie(cookie, value, {
      path: "/",
    });
  },
  delete: (cookie: string) => {
    deleteCookie(cookie, {
      path: "/",
    });
  },
  get: (cookie: string) => {
    return getCookie(cookie, {
      path: "/",
    });
  },
};
