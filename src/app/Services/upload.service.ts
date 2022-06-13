import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as S3 from "aws-sdk/clients/s3";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private ngxService: NgxUiLoaderService) { }

  uploadurl = `${environment.bucketurl}`;
  FOLDER: "images";
  Bucketname = `${environment.bucketname}`;
  bucket = new S3({
    accessKeyId: "AKIAQJUYZEUFO5GW6CAL",
    secretAccessKey: "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",
    region: "us-east-2"
  });

  async uploadfile(fileToUpload: File, fileName?) {
    try {
      const params = {
        Bucket: this.Bucketname,
        Key: fileName ? fileName : fileToUpload.name,
        Body: fileToUpload,
        ACL: "public-read"
      };
      return new Promise((resolve, reject) => {
        this.ngxService.start();
        this.bucket.upload(params, function(err, data) {
          if (err) {
            this.ngxService.stop();
            reject(err);
            return false;
          } else {

            console.log(data, "image");
            resolve(data.Location);
          }
        });
      });
    } catch (err) {
      console.log("an error was occured during image uploading");
      console.error(err.message);
    } finally {
      this.ngxService.stop();

    }
  }
}
