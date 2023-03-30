import React, { useState, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { ProgressBarDefault } from "../components/ProgressBar/ProgressBar";

const DialogPopup = (showDialog) => {
  return (
    <Dialog
      visible={showDialog}
      onHide={() => closeDialog()}
      style={{ width: "90%" }}
    >
      <ProgressBarDefault current={counter} total={totalToSend} />
      <div className={styles.errorText}>{error && errorText}</div>
    </Dialog>
  );
};

export { DialogPopup };