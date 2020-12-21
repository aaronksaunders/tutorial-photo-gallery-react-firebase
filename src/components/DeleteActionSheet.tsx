import React from "react";
import { IonActionSheet } from "@ionic/react";
import { trash, close } from "ionicons/icons";

export const DeleteActionSheet: React.FC<any> = ({
  photoToDelete,
  onDelete,
  onDidDismiss,
}) => {
  return (
    <IonActionSheet
      isOpen={!!photoToDelete}
      buttons={[
        {
          text: "Delete",
          role: "destructive",
          icon: trash,
          handler: onDelete,
        },
        {
          text: "Cancel",
          icon: close,
          role: "cancel",
        },
      ]}
      onDidDismiss={onDidDismiss} />
  );
};
