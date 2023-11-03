const pagesConfig = {
  login: {title: 'Login', path: 'login'},
  register: {title: 'Register', path: 'register'},
  verify: {title: 'Verify Account', path: 'verify'},
  resetPasswordRequest: {title: 'Reset Password Request', path: 'reset-password'},
  resetPassword: {title: 'Reset Password', path: 'reset-password/:passwordToken'},


} as const;

export {pagesConfig}
