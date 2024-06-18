/* this code snippit was copied from the
'Moments' walkthroguh project */

import jwtDecode from "jwt-decode";

export const setTokenTimestamp = (data) => {
    const refreshTokenTimeStamp = jwtDecode(data?.refresh_token).exp
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimeStamp)
};

export const shouldRefreshToken = () => {
    return !!localStorage.getItem('refreshTokenTimestamp')
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimeStamp')
};