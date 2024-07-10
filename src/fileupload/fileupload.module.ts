import { Module } from "@nestjs/common";
import { FileUploadService } from "./fileupload.service";
import { FileUploadController } from "./fileupload.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, JwtService],
  imports: [JwtModule],
})
export class FileuploadModule {}
