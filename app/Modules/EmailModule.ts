declare module "@ioc:core.EmailProvider" {
    import { IEmailService } from "App/Services/Contracts/IEmailService";
  
    const EmailProvider: IEmailService;
    export default EmailProvider;
  }