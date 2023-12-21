import { ApiResponse } from "App/Utils/ApiResponses";
import Mail from "@ioc:Adonis/Addons/Mail";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IEmailService } from "./Contracts/IEmailService";

export default class EmailService implements IEmailService {
  public async responseEmail(
    emails: string[],
    justification: string,
    filingNumber: number
  ): Promise<ApiResponse<boolean | null>> {
    try {
      for (const email of emails) {
        await Mail.send((message) => {
          message
            .from("sapiencia@example.com")
            .to(email)
            .subject("Cargar información")
            .html(
              `
                    <html>
                    <head>
                    </head>

                    <body>
                        <div class="email-notification" style="width: 1440px; height: 1024px; background-color: #E2E2E2;">
                            <div class="header" style="width: 1440px; height: 100px; display: flex; justify-content: center; align-items: center; padding: 10px;">
                                <img src="https://imagizer.imageshack.com/img924/6985/TW5Ygs.png" alt="Logo de la empresa" style="display: block; margin: 0 auto;">
                            </div>
                            <div class="card" style="width: 600px; height: 443px; background-color: #ffffff; max-width: 600px; margin: 0 auto; top: 100px; left: 419px;">
                                <div class="hero" style="background-color: #5E3893; width: 580px; height: 126px; display: flex; justify-content: center; align-items: center; padding: 10px;">
                                    <img src="https://imagizer.imageshack.com/img923/5251/BGo4Au.png" style="display: block; margin: 0 auto;">
                                </div>
                                <div class="content" style="width: 599px; height: 317px; padding: 54px;">
                                    <h4 class="card-title" style="width: 471px; height: 26px; text-align: start; font-size: 29px; font-weight: bold; font-family: 'Rubik', sans-serif;">Reciba un cordial saludo.</h4>
                                    <p class="card-text" style="width: 471px; height: 57px; font-size: 17px; font-weight: 300; font-family: 'Rubik', sans-serif; line-height: 20.4px;">El responsable de la PQRSDF ${filingNumber} en estado Cerrada está solicitando su reapertura por el siguiente motivo: ${justification} .</p>
                                    <div class="button-container">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </body>
                    </html>

                    `
            );
        });
      }

      return new ApiResponse(true, EResponseCodes.OK);
    } catch (error) {
      console.error("Error al enviar correos:", error);
      return new ApiResponse(null, EResponseCodes.FAIL, "Error al enviar correos");
    }
  }

  public async sendEmail(
    emails: string[],
    subject: string = "PQRSDF",
    body: string = "",
    attach: string[] = []
  ): Promise<ApiResponse<boolean | null>> {
    try {
      for (const email of emails) {
        await Mail.send((message) => {
          const html = `
          <html>
          <head>
          </head>

          <body>
              <div class="email-notification" style="width: 1440px; height: 1024px; background-color: #E2E2E2;">
                  <div class="header" style="width: 1440px; height: 100px; display: flex; justify-content: center; align-items: center; padding: 10px;">
                      <img src="https://imagizer.imageshack.com/img924/6985/TW5Ygs.png" alt="Logo de la empresa" style="display: block; margin: 0 auto;">
                  </div>
                  <div class="card" style="width: 600px; height: 443px; background-color: #ffffff; max-width: 600px; margin: 0 auto; top: 100px; left: 419px;">
                      <div class="hero" style="background-color: #5E3893; width: 580px; height: 126px; display: flex; justify-content: center; align-items: center; padding: 10px;">
                          <img src="https://imagizer.imageshack.com/img923/5251/BGo4Au.png" style="display: block; margin: 0 auto;">
                      </div>
                      <div class="content" style="width: 599px; height: 317px; padding: 54px;">
                          <h4 class="card-title" style="width: 471px; height: 26px; text-align: start; font-size: 29px; font-weight: bold; font-family: 'Rubik', sans-serif;">Reciba un cordial saludo.</h4>
                          <p class="card-text" style="width: 471px; height: 57px; font-size: 17px; font-weight: 300; font-family: 'Rubik', sans-serif; line-height: 20.4px;">${body}</p>
                          <div class="button-container">
                          </div>
                      </div>
                  </div>
              </div>
          </body>
          </html>
          `;
          if (attach) {
            message = message.from("sapiencia@example.com").to(email).subject(subject).html(html);
            attach.forEach((file) => {
              message.attach(file);
            });
          } else {
            message.from("sapiencia@example.com").to(email).subject(subject).html(html);
          }
        });
      }

      return new ApiResponse(true, EResponseCodes.OK);
    } catch (error) {
      console.error("Error al enviar correos:", error);
      return new ApiResponse(null, EResponseCodes.FAIL, "Error al enviar correos");
    }
  }
}
