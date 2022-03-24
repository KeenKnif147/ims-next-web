import React from 'react'
import ReactImageFallback from 'react-image-fallback'
import ReactImageMagnify from 'react-image-magnify'
import PlaceHolderImage from '../../../public/images/placeholder-image.png'
import { getSmallImageUrl, getLargeImageUrl } from '../../utils'

const ProductImage = ({
  name,
  url,
  magnify = true,
  fallback = false,
  width = 150,
  height = 150,
  ...rest
}) => {
  const smallUrl = getSmallImageUrl(url)
  const largeUrl = getLargeImageUrl(url)

  if (magnify) {
    return (
      <ReactImageMagnify
        smallImage={{
          alt: name,
          width,
          height,
          src: smallUrl,
        }}
        largeImage={{
          alt: name,
          src: largeUrl,
          width: 700,
          height: 700,
        }}
        enlargedImageContainerDimensions={{
          width: '250%',
          height: '250%',
        }}
        style={{
          backgroundColor: 'white',
          zIndex: 10,
        }}
      />
    )
  }

  if (fallback) {
    return (
      <ReactImageFallback
        src={smallUrl}
        fallbackImage={PlaceHolderImage}
        initialImage={PlaceHolderImage}
        alt={name}
        style={{
          width,
          height,
        }}
        {...rest}
      />
    )
  }

  return (
    <img src={smallUrl} alt={name} style={{ width, height }} />
  )
}

export default React.memo(ProductImage)
