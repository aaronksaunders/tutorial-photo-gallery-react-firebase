import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from "@ionic/react";
import { Photo } from "../hooks/usePhotoGallery";

export const GalleryGrid: React.FC<any> = ({ photos, onClick }) => {
  return (
    <IonGrid>
      <IonRow>
        {photos.map((photo: Photo, index: number) => (
          <IonCol size="6" key={index}>
            <IonImg src={photo.uploadData.url} onClick={() => onClick(photo)} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};
