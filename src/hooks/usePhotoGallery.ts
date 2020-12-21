import { usePhotoDataProvider } from "./PhotoDataContext";
import { useState, useEffect } from "react";
import { useCamera } from "@ionic/react-hooks/camera";
import { CameraResultType, CameraSource, CameraPhoto } from "@capacitor/core";
import { decode } from "base64-arraybuffer";

export function usePhotoGallery() {
  const { getPhoto } = useCamera();
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const { loadPhotos, savePhoto, photos, deletePhoto } = usePhotoDataProvider();
  useEffect(() => {
    setGalleryPhotos(photos);
  }, [photos]);

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      quality: 100,
    });

    const fileName = new Date().getTime() + ".jpeg";
    try {
      await savePicture(cameraPhoto, fileName);

      const photos = await loadPhotos();
      setGalleryPhotos(photos);
    } catch (e) {
      alert(e.message);
    }
  };

  const convertBase64ToBlob = (base64: string | undefined, format: string) =>
    new Promise((resolve, reject) => {
      if (!base64) reject(null);

      const blob = new Blob([new Uint8Array(decode(base64 as string))], {
        type: `image/${format}`,
      });
      resolve(blob);
    });

    /**
     * 
     * @param photo 
     * @param fileName 
     */
  const savePicture = async (
    photo: CameraPhoto,
    fileName: string
  ): Promise<any> => {
    const blob = await convertBase64ToBlob(photo.base64String, photo.format);

    const result = await savePhoto(
      {
        fileName,
        blob,
      },
      (value: any) => {
        console.log(value);
        setProgress(value.bytesTransferred/value.totalBytes);
      }
    );
    setProgress(0);
    return result;
  };

  const removePhoto = async (photo: Photo) => {
    return await deletePhoto(photo.id!, photo.uploadData.fullPath);
  };

  return {
    galleryPhotos,
    takePhoto,
    removePhoto,
    progress
  };
}

export interface Photo {
  id?: string;
  filepath: string;
  uploadData: any;
}
