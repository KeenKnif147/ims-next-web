import React, { useState, useCallback } from 'react'
import Compressor from 'compressorjs'
import {
  Upload,
  Icon,
  Modal,
  message,
} from 'antd'
import './styles.less'

const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

const transformFile = file => new Promise((resolve, reject) => {
  try {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      quality: 0.55,
      success(result) {
        resolve(result)
      },
    })
  } catch (error) {
    reject(error)
  }
})

const OutboundReturnImageUploader = ({
  imageList,
  setImageList,
  hint,
  maxItem = 3,
  sizeLimit = 5, // mb
  ...rest
}) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const handleChange = useCallback(({ fileList, file }) => {
    if (!file.invalid) {
      setImageList(fileList.slice())
    }
  }, [])

  const handleCancel = useCallback(() => setPreviewVisible(false), [])

  const handlePreview = useCallback(async file => {
    const previewFile = file

    if (!previewFile.url && !previewFile.preview) {
      previewFile.preview = await getBase64(previewFile.originFileObj)
    }

    setPreviewImage(previewFile.url || previewFile.preview)
    setPreviewVisible(true)
  }, [])

  const beforeUpload = useCallback(file => {
    const size = file.size / 1024 / 1024

    if (size >= sizeLimit) {
      message.error(`Kích thước hình ảnh không được vượt quá ${sizeLimit} MB, hình vừa upload có kích thước ${Number(size).toFixed(1)} MB`)

      // eslint-disable-next-line no-param-reassign
      file.invalid = true

      return false
    }

    return true
  })

  const smallUploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Thêm hình</div>
    </div>
  )

  const largeUploadButton = (
    <div style={{ width: '100%' }}>
      <Icon type="upload" />
      <div className="ant-upload-text">Bấm vào đây để upload hình</div>
      <p className="ant-upload-hint">{hint}</p>
    </div>
  )

  const uploadButton = imageList.length ? smallUploadButton : largeUploadButton

  return (
    <div className="image-uploader">
      <div className={!imageList.length ? 'upload-empty' : ''}>
        <Upload
          listType="picture-card"
          fileList={imageList}
          onPreview={handlePreview}
          onChange={handleChange}
          transformFile={transformFile}
          beforeUpload={beforeUpload}
          accept="image/*"
          {...rest}
        >
          {imageList.length >= maxItem ? null : uploadButton}
        </Upload>
      </div>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default React.memo(OutboundReturnImageUploader)
