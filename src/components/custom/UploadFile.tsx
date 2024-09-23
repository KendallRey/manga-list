"use client";

import MuiButton from "@/components/button/Button";
import MuiDivider from "@/components/divider/Divider";
import { FileValidator } from "@/components/helper/files";
import { customEnqueueSnackbar, displaySnackbar } from "@/components/helper/notistack";
import MuiTypography from "@/components/typography/Typograph";
import { CircularProgress } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import MuiImageList, { MuiImageListItem } from "../image/Image";
import { nanoid } from "@reduxjs/toolkit";

type IUploadFile = {
  uploadFn?: (file: File) => Promise<{ data?: any; error?: string }>;
  actionText?: string;
};

type IImageToUpload = {
  key: string;
  url: string;
  setAsCover: boolean;
};

const UploadFile: React.FC<IUploadFile> = (props) => {
  const { uploadFn, actionText } = props;

  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async () => {
    if (!file || !uploadFn) return;
    setIsLoading(true);
    const { error } = await uploadFn(file);
    if (!error) setFile(undefined);
    setIsLoading(false);
  }, [file, uploadFn]);

  const [imagesToUpload, setImagesToUpload] = useState<IImageToUpload[]>([]);

  const onAttachFile = useCallback((e: RCE<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || !files.length) return;
    if (!validateFiles(files)) return;
    const file = files.item(0);
    if (!file) return;
    setFile(file);

    const _images: IImageToUpload[] = [];
    for (let i = 0; i < files.length; i++) {
      const _file = files.item(i);
      if (!_file) return;
      _images.push({
        key: nanoid(),
        url: URL.createObjectURL(_file),
        setAsCover: false,
      });
    }
    setImagesToUpload(_images);
  }, []);

  // #region Dragging

  const [isDragging, setIsDragging] = useState(false);

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>, _isDragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(_isDragging);
  };

  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) {
      displaySnackbar({ action: "wait" });
      return;
    }
    setIsDragging(false);

    const {
      dataTransfer: { files },
    } = e;

    if (!validateFiles(files)) return;

    setIsLoading(false);
  };

  const validateFiles = (files: FileList) => {
    const fileValidator = new FileValidator(files);

    if (!fileValidator.isAllFilesImage()) {
      customEnqueueSnackbar({ variant: "error", message: "Invalid file type" });
      return false;
    }
    if (!fileValidator.isEachFileLowerThan(10)) {
      customEnqueueSnackbar({ variant: "error", message: "No more than 10mb" });
      return false;
    }
    return true;
  };

  // #endregion

  return (
    <div
      className={`dropzone flex flex-col border border-4 gap-2 border-dashed ${isDragging ? "border-primary-2" : ""} rounded p-4`}
      onDragEnter={(e) => handleOnDrag(e, true)}
      onDragEnd={(e) => handleOnDrag(e, false)}
      onDragOver={(e) => handleOnDrag(e, true)}
      onDrop={handleOnDrop}
    >
      <input
        ref={inputRef}
        value={""}
        className="hidden"
        type="file"
        onChange={onAttachFile}
        disabled={isLoading}
        multiple
      />
      <div className="flex justify-center gap-2 items-center flex-wrap">
        <MuiButton
          className="text-center"
          size="large"
          variant="outlined"
          onClick={() => inputRef.current?.click()}
          disabled={isLoading}
        >
          Browse File
        </MuiButton>
        <MuiTypography fontSize={16}>or</MuiTypography>
        <MuiTypography fontSize={20} className="text-neutral-700">
          Drag and drop file here...
        </MuiTypography>
      </div>
      <MuiTypography className="text-center">{file?.name}</MuiTypography>
      <MuiDivider />
      <MuiButton
        onClick={uploadFile}
        disabled={isLoading}
        startIcon={<CircularProgress size={20} hidden={!isLoading} />}
        endIcon={<CircularProgress size={20} hidden={!isLoading} />}
      >
        {actionText ?? "Upload"}
      </MuiButton>
      <div className="w-full">
        <ImageList imagesToUpload={imagesToUpload} />
      </div>
    </div>
  );
};

export default UploadFile;

type IImageList = {
  imagesToUpload: IImageToUpload[];
};

const ImageList: React.FC<IImageList> = (props) => {
  const { imagesToUpload } = props;
  return (
    <MuiImageList cols={2} rowHeight={540} sx={{ width: 500 }} className="mx-auto">
      {imagesToUpload.map((image) => (
        <MuiImageListItem key={image.key}>
          <img src={image.url} />
        </MuiImageListItem>
      ))}
    </MuiImageList>
  );
};
