declare module "@ioc:core.RequestSubjectTypeProvider" {
  import { IRequestSubjectTypeServices } from "App/Services/Contracts/IRequestSubjectTypeServices";

  const RequestSubjectTypeProvider: IRequestSubjectTypeServices;
  export default RequestSubjectTypeProvider;
}
