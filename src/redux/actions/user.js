export function userSessionSet(authResult, callback = true) {
  return {
    type: 'USER_SESSION_SET_' + (callback ? 'CALLBACK' : 'REFRESH'),
    payload: {
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      profile: authResult.idTokenPayload,
      expiresAt: authResult.expiresIn * 1000 + new Date().getTime()
    }
  }
}

export function userLogout() {
  return {
    type: 'USER_LOGOUT'
  }
}

