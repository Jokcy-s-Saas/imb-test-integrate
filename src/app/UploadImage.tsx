"use client";

import { createS3ProxyClient } from "@imb/api-s3";
import { S3StorageClass, createUploader } from "@imb/features";
import { UploadButtonWithUploader, UploaderProvider } from "@imb/react";
import { useState } from "react";

export default function UploadImage() {
  const [uploadedFile, setUploadedFile] = useState<string>("");

  const [uploader] = useState(() =>
    createUploader(
      new S3StorageClass(
        createS3ProxyClient({
          getToken: async () => {
            const response = await fetch("/api/imb-token");
            return await response.json();
          },
          endpoint: "http://localhost:3888/api/open/s3",
        })
      )
    )
  );

  return (
    <UploaderProvider uploader={uploader}>
      <UploadButtonWithUploader
        uploadOnFileOnAdd={true}
        onUploadedSuccess={(file, response) => {
          setUploadedFile(response.uploadURL || "");
        }}
      >
        {({ pendingFilesCount, chosedFilesCount }) => (
          <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Upload {`(${pendingFilesCount}/${chosedFilesCount})`}
          </button>
        )}
      </UploadButtonWithUploader>
      {uploadedFile && (
        <div className="w-96 h-96">
          <img
            src={uploadedFile}
            className="object-contain w-full h-full"
          ></img>
        </div>
      )}
    </UploaderProvider>
  );

  // return (
  //   <input
  //     type="file"
  //     onChange={(e) => {
  //       if (e.target.files) {
  //         uploader.addFiles(e.target.files);
  //         uploader.upload();
  //       }
  //     }}
  //   ></input>
  // );
}
