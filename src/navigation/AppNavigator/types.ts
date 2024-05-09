interface IResetPasswordParams {
  verificationId: string;
  type: string;
  phoneNumber: string;
}

interface ISignUpParams {
  verificationId: string;
  type: string;
  user: User;
}

interface IVerificationParams {
  phoneNumber: string;
}

export type AppStackParams = {
  SignIn: undefined;
  SignUp: ISignUpParams;
  ResetPassword: IResetPasswordParams;
  Verification: IVerificationParams;
  App: undefined;
  NotFound: undefined;
  ChangePassword: undefined;
};
