import React from 'react'
import { ImageOverlay, LayersControl, TileLayer } from 'react-leaflet'
import test33 from '../test33.jpg'
import { LatLngBoundsLiteral } from 'leaflet';

const BaseMap = () => {

  const imageBounds: LatLngBoundsLiteral = [ // ใช้ LatLngBoundsLiteral
    [0, 0],
    [4000, 300]
  ];

  return (
    <>
      <LayersControl position='topright'>
        <LayersControl.BaseLayer name='รูปภาพแทน' checked>
          <ImageOverlay url={test33} bounds={imageBounds} />
        </LayersControl.BaseLayer>

      </LayersControl>
    </>

  )
}

export default BaseMap