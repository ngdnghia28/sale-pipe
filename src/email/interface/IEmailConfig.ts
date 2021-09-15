export interface IEmailConfig {
  apiKey: string;
  defaultSender: string;
  templates: {
    forgotPasswordRequestId: string;
    changePasswordRequestId: string;
    changedPasswordId: string;
    signupEmailPrepare: string;
    signupEmailConfirm: string;
    createdAccountId: string;
    verifiedAccountId: string;
  };
}
