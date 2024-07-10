import { Injectable } from "@nestjs/common";
import { S3 } from "@aws-sdk/client-s3";

@Injectable()
export class FileUploadService {
  async uploadFile(
    folder_name: string,
    dataBuffer: Buffer,
    fileName: string
  ): Promise<object> {
    const s3 = new S3({ region: process.env.AWS_REGION });
    const uploadResult = await s3.putObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: dataBuffer,
      Key: `${folder_name}/${fileName}`,
    });

    return {
      fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder_name}/${fileName}`,
    };
  }
}
