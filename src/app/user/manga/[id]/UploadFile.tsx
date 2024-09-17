'use client'

import { uploadImageToStorage } from '@/app/api/manga-image/manga-image-api'
import MuiButton from '@/components/button/Button';
import MuiTypography from '@/components/typography/Typograph';
import React, { useCallback, useState } from 'react'

const UploadFile = () => {

  const [file, setFile] = useState<File>();

  const uploadFile = useCallback(async () => {
    if(!file) return;
    const response = await uploadImageToStorage(file, '/test' )
    console.log('TEST', response);
  },[file])

  const onAttachFile = useCallback((e: RCE<HTMLInputElement>) => {
    const { files } = e.target;
    if(!files || !files.length) return;
    const file = files.item(0);
    if(!file) return;
    setFile(file);
  },[])

  return (
    <div><input value={''} type='file' onChange={onAttachFile}/>
    <MuiTypography>{file?.name}</MuiTypography>
    <MuiButton onClick={uploadFile}>Upload</MuiButton>
    </div>
  )
}

export default UploadFile