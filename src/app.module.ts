import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { EmailVerificationModule } from "./emailVerification/emailVerification.module";
import { EventModule } from "./event/event.module";
import { UserFanbaseModule } from "./userFanbase/userFanbase.module";
import { UserEventModule } from "./userEvent/userEvent.module";
import { DeliveryinfoModule } from "./deliveryInfo/deliveryInfo.module";
import { UserModule } from "./user/user.module";
import { FanbaseModule } from "./fanbase/fanbase.module";
import { UserinfoModule } from "./userinfo/userinfo.module";
import { FanbaseinfoModule } from "./fanbaseInfo/fanbaseinfo.module";
import { SearchModule } from "./search/search.module";
import { AuthModule } from "./auth/auth.module";
import { FileuploadModule } from "./fileupload/fileupload.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    UserinfoModule,
    FanbaseModule,
    FanbaseinfoModule,
    EventModule,
    UserFanbaseModule,
    UserEventModule,
    DeliveryinfoModule,
    FanbaseModule,
    UserinfoModule,
    FanbaseinfoModule,
    SearchModule,
    EmailVerificationModule,
    FileuploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
