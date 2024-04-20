import React, { useEffect, useState } from "react";
import { storageInstance, authInstance } from "../../firebase/firebase"; // Assuming you have an authInstance for Firebase Authentication
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes, listAll, deleteObject } from "firebase/storage";

function StoreImageFirebase({ onImageChange }) {
  const [img, setImg] = useState('');
  const [userFolder, setUserFolder] = useState('');

  useEffect(() => {
    const getUserFolder = async () => {
      try {
        const user = authInstance.currentUser;
        if (user) {
          setUserFolder(user.email);
        }
      } catch (error) {
        console.error("Error fetching user folder:", error);
      }
    };
    getUserFolder();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const userImgRef = ref(storageInstance, `${userFolder}/${v4()}`);
    
    try {
      // Delete any existing files in the user's folder
      const userImgList = await listAll(ref(storageInstance, userFolder));
      const deletePromises = userImgList.items.map(item => {
        const itemRef = ref(storageInstance, item.fullPath);
        return deleteObject(itemRef);
      });
      await Promise.all(deletePromises);
      console.log("Existing files deleted successfully.");
  
      // Upload the new file
      const data = await uploadBytes(userImgRef, file);
      console.log(data, 'image uploaded');
  
      // Get the download URL of the uploaded file
      const url = await getDownloadURL(data.ref);
      setImg(url);
      onImageChange(url);
  
    } catch (error) {
      console.error('Error handling upload:', error);
    }
  };
  
  

  useEffect(() => {
    if (userFolder) {
      const getUserImages = async () => {
        try {
          const userImgRef = ref(storageInstance, userFolder);
          const userImgList = await listAll(userImgRef);
  
          if (userImgList.items.length > 0) {
            const firstImgRef = userImgList.items[0];
            const imgUrl = await getDownloadURL(firstImgRef);
            setImg(imgUrl);
            onImageChange(imgUrl);
          } else {
            // If no images found in the user's folder, fetch images from 'DiffImg' folder
            const DiffImgRef = ref(storageInstance, 'DiffImg');
            const DiffImgList = await listAll(DiffImgRef);
            if (DiffImgList.items.length > 0) {
              const firstDiffImgRef = DiffImgList.items[0];
              const imgUrl = await getDownloadURL(firstDiffImgRef);
              setImg(imgUrl);
              onImageChange(imgUrl);
            } else {
              console.log(`No images found in 'DiffImg' folder.`);
            }
          }
        } catch (error) {
          console.error("Error fetching user images:", error);
        }
      };
      getUserImages();
    }
  }, [userFolder, onImageChange]);
  return (
    <div>
      <input type="file" onChange={handleUpload} /><br /><br />
      
      {img && <img src={img} alt="Uploaded" height="200px" width="200px" />}
    </div>
  );
}

export default StoreImageFirebase;