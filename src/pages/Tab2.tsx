import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonProgressBar,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import { Photo, usePhotoGallery } from "../hooks/usePhotoGallery";
import { DeleteActionSheet } from "../components/DeleteActionSheet";
import { GalleryGrid } from "../components/GalleryGrid";

const Tab2: React.FC = () => {
  const { galleryPhotos, takePhoto, removePhoto, progress } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {progress !== 0 && <IonProgressBar value={progress}></IonProgressBar>}
        <GalleryGrid
          photos={galleryPhotos}
          onClick={(photo: Photo) => setPhotoToDelete(photo)}
        ></GalleryGrid>

        {/*  */}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
        {/*  */}
        <DeleteActionSheet
          photoToDelete={photoToDelete}
          onDidDismiss={() => setPhotoToDelete(undefined)}
          onDelete={() => {
            if (photoToDelete) {
              removePhoto(photoToDelete);
              setPhotoToDelete(undefined);
            }
          }}
        ></DeleteActionSheet>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
