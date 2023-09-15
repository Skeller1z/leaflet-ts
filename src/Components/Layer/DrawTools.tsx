import React from "react";
import {
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const DrawTools: React.FC = () => {
  const _onEdited = (e: any) => {
    let numEdited = 0;
    e.layers.eachLayer((layer: any) => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    // this._onChange();
  };

  const _onCreated = (e: any) => {
    let type = e.layerType;
    let layer = e.layer;
    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    } else {
      console.log("_onCreated: something else created:", type, e);
    }

    console.log("Geojson", layer.toGeoJSON());
    console.log("coords", layer.getLatLngs());
    // Do whatever else you need to. (save to db; etc)

    // this._onChange();
  };

  const _onDeleted = (e: any) => {
    let numDeleted = 0;
    e.layers.eachLayer((layer: any) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    // this._onChange();
  };

  const _onDrawStart = (e: any) => {
    console.log("_onDrawStart", e);
  };

  return (
    <FeatureGroup>
      <EditControl
        onDrawStart={_onDrawStart}
        position="topleft"
        onEdited={_onEdited}
        onCreated={_onCreated}
        onDeleted={_onDeleted}
        draw={{
          polyline: false, // Disable polyline drawing
          rectangle: false,
          circlemarker: false,
          circle: false,
          polygon: false,
        }}
      />
    </FeatureGroup>
  );
};

export default DrawTools;
