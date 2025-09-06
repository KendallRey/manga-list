"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { FileValidator } from "@/components/helper/files";
import { customEnqueueSnackbar, displaySnackbar } from "@/components/helper/notistack";
import { CameraIcon, X } from "lucide-react";
import Image from "next/image";

export const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

export type ImageToUploadType = {
  key: string;
  url: string;
  setAsCover: boolean;
  file: File;
};

type UploadFileProps = {
  uploadFn?: (file: File) => Promise<{ data?: any; error?: string }>;
  uploadsFn?: (imagesToUpdate: ImageToUploadType[]) => Promise<string[]>;
  actionText?: string;
};

const UploadImageFile: React.FC<UploadFileProps> = ({ uploadsFn, actionText }) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [imagesToUpload, setImagesToUpload] = useState<ImageToUploadType[]>([]);

  const uploadFiles = useCallback(async () => {
    if (!imagesToUpload.length || !uploadsFn) return;
    setIsLoading(true);
    const ids = await uploadsFn(imagesToUpload);
    setImagesToUpload((prev) => prev.filter((image) => !ids.includes(image.key)));
    setIsLoading(false);
  }, [imagesToUpload, uploadsFn]);

  const onAttachFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || !files.length) return;
    if (!validateFiles(files)) return;

    const _images: ImageToUploadType[] = [];
    const imagesCount = Math.min(files.length, 10);
    for (let i = 0; i < imagesCount; i++) {
      const _file = files.item(i);
      if (!_file) return;
      _images.push({
        key: generateId(),
        url: URL.createObjectURL(_file),
        setAsCover: false,
        file: _file,
      });
    }
    setImagesToUpload(_images);
  }, []);

  const onRemoveImage = useCallback((key: string) => {
    setImagesToUpload((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const onSetAsCover = useCallback((key?: string) => {
    setImagesToUpload((prev) =>
      prev.map((item) => ({
        ...item,
        setAsCover: key === item.key,
      })),
    );
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

    const _images: ImageToUploadType[] = [];
    const imagesCount = Math.min(files.length, 10);
    for (let i = 0; i < imagesCount; i++) {
      const _file = files.item(i);
      if (!_file) return;
      _images.push({
        key: generateId(),
        url: URL.createObjectURL(_file),
        setAsCover: false,
        file: _file,
      });
    }
    setImagesToUpload(_images);
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
      className={clsx(
        "dropzone flex flex-col gap-4 border-2 border-dashed rounded-xl p-6 transition",
        isDragging
          ? "border-indigo-500 bg-indigo-500/10"
          : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900",
      )}
      onDragEnter={(e) => handleOnDrag(e, true)}
      onDragEnd={(e) => handleOnDrag(e, false)}
      onDragOver={(e) => handleOnDrag(e, true)}
      onDrop={handleOnDrop}
    >
      {/* File Input */}
      <input
        ref={inputRef}
        value=""
        className="hidden"
        type="file"
        onChange={onAttachFile}
        disabled={isLoading}
        multiple
      />

      {/* Upload UI */}
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
        >
          Browse File
        </button>
        <p className="text-gray-600 dark:text-gray-400">or drag & drop here</p>
      </div>

      {/* Upload Button */}
      <button
        type="button"
        onClick={uploadFiles}
        disabled={isLoading}
        className="self-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
      >
        {isLoading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
        {actionText ?? "Upload"}
      </button>

      {/* Image Preview Grid */}
      <ImageList imagesToUpload={imagesToUpload} onRemove={onRemoveImage} onSetAsCover={onSetAsCover} />
    </div>
  );
};

export default UploadImageFile;

// ---------- Image Grid ----------
type ImageListProps = {
  imagesToUpload: ImageToUploadType[];
  onRemove: (key: string) => void;
  onSetAsCover: (key?: string) => void;
};

const ImageList: React.FC<ImageListProps> = ({ imagesToUpload, onRemove, onSetAsCover }) => {
  return (
    <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {imagesToUpload.map((image) => (
        <div
          key={image.key}
          className="relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700"
        >
          <Image src={image.url} alt="" className="w-full h-64 object-cover" height={240} width={120} />

          {/* Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 flex justify-between items-center text-white">
            {image.setAsCover ? (
              <span onClick={() => onSetAsCover(image.key)} className="text-xs cursor-pointer text-emerald-400">
                Marked as Cover
              </span>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-1">
              {!image.setAsCover && (
                <button onClick={() => onSetAsCover(image.key)} className="p-1 rounded bg-black/40 hover:bg-black/60">
                  <CameraIcon className="w-5 h-5 text-gray-200" />
                </button>
              )}
              <button onClick={() => onRemove(image.key)} className="p-1 rounded bg-black/40 hover:bg-red-600">
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
