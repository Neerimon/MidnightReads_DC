import React, { useEffect, useState } from "react";
import { storageInstance, authInstance } from "../../firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes, listAll, deleteObject } from "firebase/storage";

function StoreBanner({ onBannerChange }) {
  const [banner, setBanner] = useState('');
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
    const userBannerRef = ref(storageInstance, `${userFolder}/Banners/${v4()}`);
  
    try {
      // Delete any existing banners in the user's folder
      const userBannerList = await listAll(ref(storageInstance, `${userFolder}/Banners`));
      const deletePromises = userBannerList.items.map(item => deleteObject(item));
      await Promise.all(deletePromises);
      console.log("Existing banners deleted successfully.");
  
      // Upload the new banner
      const data = await uploadBytes(userBannerRef, file);
      console.log(data, 'banner uploaded');
      
      // Get the download URL of the uploaded banner
      const url = await getDownloadURL(data.ref);
      setBanner(url);
      onBannerChange(url);
    } catch (error) {
      console.error('Error uploading new banner:', error);
    }
  };
  

  useEffect(() => {
    if (userFolder) {
      const getUserBanners = async () => {
        try {
          const userBannerRef = ref(storageInstance, `${userFolder}/Banners`);
          const userBannerList = await listAll(userBannerRef);
  
          if (userBannerList.items.length > 0) {
            const firstBannerRef = userBannerList.items[0];
            const bannerUrl = await getDownloadURL(firstBannerRef);
            setBanner(bannerUrl);
            onBannerChange(bannerUrl);
          } else {
            // If no banners found in the user's folder, fetch banners from 'DifBanners' folder
            const DifBannersRef = ref(storageInstance, 'DifBanners');
            const DifBannersList = await listAll(DifBannersRef);
            if (DifBannersList.items.length > 0) {
              const firstDifBannersRef = DifBannersList.items[0];
              const bannerUrl = await getDownloadURL(firstDifBannersRef);
              setBanner(bannerUrl);
              onBannerChange(bannerUrl);
            } else {
              console.log(`No banners found in 'DifBanners' folder.`);
            }
          }
        } catch (error) {
          console.error("Error fetching user banners:", error);
        }
      };
      getUserBanners();
    }
  }, [userFolder, onBannerChange]);
  
  return (
    <div>
      <input type="file" onChange={handleUpload} /><br /><br />
      
      {banner && <img src={banner} alt="Uploaded Banner" height="300px" width="600px" />}
    </div>
  );
}

export default StoreBanner;
