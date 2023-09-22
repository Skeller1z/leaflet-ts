// import React, { useState } from "react";

// const CustomModal = ({ isOpen, onClose, onSave }) => {
//     const [name, setName] = useState("");
//     const [imageUrl, setImageUrl] = useState("");
//     const [details, setDetails] = useState("");

//     const handleSave = () => {
//         // Validate and process the input data as needed
//         onSave(name, imageUrl, details);
//         setName("");
//         setImageUrl("");
//         setDetails("");
//         onClose();
//     };

//     return (
//         <div className={`modal ${isOpen ? "block" : "hidden"}`}>
//             <div className="modal-content">
//                 <h2>Enter Polygon Information</h2>
//                 <input
//                     type="text"
//                     placeholder="Polygon Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Image URL"
//                     value={imageUrl}
//                     onChange={(e) => setImageUrl(e.target.value)}
//                 />
//                 <textarea
//                     placeholder="Details"
//                     value={details}
//                     onChange={(e) => setDetails(e.target.value)}
//                 />
//                 <button onClick={handleSave}>Save</button>
//                 <button onClick={onClose}>Cancel</button>
//             </div>
//         </div>
//     );
// };

// export default CustomModal;
import React from 'react'

type Props = {}

const CustomModal = (props: Props) => {
  return (
    <div>CustomModal</div>
  )
}

export default CustomModal