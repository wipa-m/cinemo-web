import { CINEMO_USERS, CINEMO_LOGIN_TOKEN } from './staticVariables';

export const getDataLocalStorage = () => {
  const localUsers = localStorage.getItem(CINEMO_USERS);
  const localToken = localStorage.getItem(CINEMO_LOGIN_TOKEN);
  const userList = localUsers ? JSON.parse(localUsers) : [];
  const token = localToken;
  return { userList, token };
};
