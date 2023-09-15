import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import {
    MapContainer,
    TileLayer,
    Circle,
    FeatureGroup,
    ImageOverlay,
    Popup,
} from "react-leaflet";
import L, { LatLngBoundsLiteral } from "leaflet";
import { EditControl } from "react-leaflet-draw";
import test33 from '../test33.jpg'


type State = {
    adminMode: boolean;
    imageUrl: string | null;
};

const initialState: State = {
    adminMode: true,
    imageUrl: null,
};


(delete (L.Icon.Default.prototype as any)._getIconUrl);
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

const bounds: LatLngBoundsLiteral = [
    [0, 0],// มุมบนซ้าย
    [4000, 300],  // มุมล่างขวา
];

// interface CustomGeoJSON {
//     type: "FeatureCollection";
//     features: Array<{
//         type: "Feature";
//         properties: Record<string, any>;
//         geometry: {
//             type: string;
//             coordinates: number[] | number[][] | number[][][];
//         };
//     }>;
// }

const Test: React.FC = () => {
    const [adminMode, setAdminMode] = useState(true);
    const editableFG = useRef<any>(null);
    const [image, setImage] = useState<State>(initialState);

    const onClickAdminButton = () => {
        setAdminMode(!adminMode);
        console.log(adminMode);
    };

    // Define a function to save data to the database
    const saveToDatabase = (data: any) => {
        // Send the data to your server or perform any database operation
        // Example: axios.post('/api/saveLayer', data);
        console.log('Saving data to the database:', data);
    };

    const onEdited = (e: any) => {
        let numEdited = 0;
        const editedLayersData: { type: string }[] = [];

        e.layers.eachLayer((layer: any) => {
            numEdited += 1;
            // Extract relevant data from the edited layer
            const type = layer instanceof L.Marker ? 'marker' :
                layer instanceof L.Polyline ? 'polyline' :
                    layer instanceof L.Polygon ? 'polygon' :
                        layer instanceof L.Circle ? 'circle' :
                            'unknown';

            if (type !== 'unknown') {
                const dataToSave = {
                    type,
                    // Add more properties or data as needed
                };
                editedLayersData.push(dataToSave);
            }
        });

        // Call the save function with the edited layers' data
        saveToDatabase(editedLayersData);

        console.log(`_onEdited: edited ${numEdited} layers`, e);
    };

    const onCreated = (e: any) => {
        let type = e.layerType;
        let layer = e.layer;
        let createdLayerData;

        if (type === 'marker') {
            // Handle marker creation
            const latlng = layer.getLatLng();
            createdLayerData = {
                type: 'marker',
                latlng,
                // Add more properties or data as needed
            };
        } else if (type === 'polyline' || type === 'polygon') {
            // Handle polyline or polygon creation
            const geoJSON = layer.toGeoJSON();
            const coordinates = geoJSON.geometry.coordinates;
            console.log('Coordinates:', coordinates);
            if (geoJSON) {
                createdLayerData = {
                    type: type,
                    geoJSON,
                    // Add more properties or data as needed
                };
            }
        } else {
            // Handle other types of shapes
            console.log('Something else created:', type, e);
        }

        if (createdLayerData) {
            // Call the save function with the created layer's data
            saveToDatabase([createdLayerData]);
        }

        // Do whatever else you need to. (save to db; etc)
    };

    const onDeleted = (e: any) => {
        let numDeleted = 0;
        e.layers.eachLayer((layer: any) => {
            numDeleted += 1;

            let type = layer instanceof L.Marker ? 'marker' :
                layer instanceof L.Polyline ? 'polyline' :
                    layer instanceof L.Polygon ? 'polygon' :
                        layer instanceof L.Circle ? 'circle' :
                            'unknown';

            if (type === 'marker') {
                // Handle marker deletion
                console.log('Marker deleted');
            } else if (type === 'polyline' || type === 'polygon') {
                // Handle polyline or polygon deletion
                console.log('Polyline/Polygon deleted');
            } else if (type === 'circle') {
                // Handle circle deletion
                console.log('Circle deleted');
            } else {
                // Handle deletion of other types of layers
                console.log('Unknown layer type deleted');
            }
        });

        console.log(`onDeleted: removed ${numDeleted} layers`, e);

        // Perform additional actions if needed
    };

    const onMounted = (drawControl: any) => {
        console.log("onMounted", drawControl);
        // You can add custom logic when the draw control is mounted here
    };

    const onEditStart = (e: any) => {
        console.log("onEditStart", e);
        // You can add custom logic when editing starts here
    };

    const onEditStop = (e: any) => {
        console.log("onEditStop", e);
        // You can add custom logic when editing stops here
    };

    const onDeleteStart = (e: any) => {
        console.log("onDeleteStart", e);
        // You can add custom logic when deletion starts here
    };

    const onDeleteStop = (e: any) => {
        console.log("onDeleteStop", e);
        // You can add custom logic when deletion stops here
    };

    const onChange = () => {
        if (!editableFG.current || !editableFG.current.leafletElement) {
            console.error("Editable feature group is not available.");
            return;
        }

        const geojsonData = editableFG.current.leafletElement.toGeoJSON();

        // Convert the GeoJSON object to a JSON string
        const geojsonString = JSON.stringify(geojsonData, null, 2);

        // Create a Blob (Binary Large Object) from the JSON string
        const blob = new Blob([geojsonString], { type: "application/json" });

        // Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = "map_data.geojson"; // Specify the filename

        // Trigger a click event on the download link to start the download
        downloadLink.click();
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the selected file

        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a URL for the selected image
            // Set the imageUrl as the source for the ImageOverlay
            setImage({ ...image, imageUrl });
        }
    };



    return (
        <div>
            <button onClick={onClickAdminButton}>Edit mode</button>
            <button onClick={onChange}>Download</button>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <MapContainer center={[13, 100]}
                zoom={1}
                style={{ width: '100%', height: '100vh' }}>
                <ImageOverlay bounds={bounds} url={image.imageUrl || test33} />

                <FeatureGroup
                    ref={reactFGref => {
                        if (reactFGref) {
                            editableFG.current = reactFGref;
                        }
                    }}
                >
                    {adminMode ? (
                        <EditControl
                            position="topright"
                            onEdited={onEdited}
                            onCreated={onCreated}
                            onDeleted={onDeleted}
                            onMounted={onMounted}
                            onEditStart={onEditStart}
                            onEditStop={onEditStop}
                            onDeleteStart={onDeleteStart}
                            onDeleteStop={onDeleteStop}
                            draw={{
                                rectangle: false,
                            }}
                        />
                    ) : null}
                </FeatureGroup>
            </MapContainer>
        </div>
    );
};

export default Test;
