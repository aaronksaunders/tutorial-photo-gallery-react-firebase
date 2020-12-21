import React, { useEffect, useState } from "react";
import API from "../firebase-service";

interface IState {
  error: null;
  photos: [];
  loadPhotos: () => Promise<any>;
  savePhoto: (data: any, progress: any) => Promise<any>;
  deletePhoto: (id: string, path: string) => Promise<any>;
}
export const PhotoDataContext = React.createContext<any>(undefined);

export const PhotoDataProvider: React.FC = ({ children }) => {
  const fireAPI = API();
  const [photos, setPhotos] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const result = await fireAPI.loadPhotos();
      setPhotos(result);
      console.log("loaded photos");
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   *
   * @param data
   * @param progress
   */
  const savePhoto = async (data: any, progress: any) => {
    return await fireAPI.savePhoto(data, progress);
  };

  /**
   *
   */
  const loadPhotos = async () => {
    const result = await fireAPI.loadPhotos();
    setPhotos(result);
    return result;
  };

  const deletePhoto = async (id: string, path: string) => {
    return fireAPI.deletePhoto(id, path);
  };

  let state: IState = {
    error: null,
    photos,
    loadPhotos,
    savePhoto,
    deletePhoto,
  };

  // wrap the application in the provider with the initialized context
  return (
    <PhotoDataContext.Provider value={state}>
      {children}
    </PhotoDataContext.Provider>
  );
};

export default PhotoDataContext;
export const usePhotoDataProvider = () =>
  React.useContext<IState>(PhotoDataContext)!;
