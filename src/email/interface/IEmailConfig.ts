export interface IEmailConfig {
  apiKey: string;
  defaultSender: string;
  templates: {
    forgotPasswordRequestId: string;
    changePasswordRequestId: string;
    changedPasswordId: string;
    createdAccountId: string;
    verifiedAccountId: string;
  };
}
