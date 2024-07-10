import {
  Controller,
  Post,
  UseGuards,
  Param,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileUploadService } from "./fileupload.service";
import { ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "src/common/guards/roles.guard";

@ApiTags("file-upload")
@Controller("file-upload")
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post(":folder_name")
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param("folder_name") folder_name: string
  ): Promise<object> {
    const uploadedFile = await this.fileUploadService.uploadFile(
      folder_name,
      file.buffer,
      file.originalname
    );
    return uploadedFile;
  }
}
