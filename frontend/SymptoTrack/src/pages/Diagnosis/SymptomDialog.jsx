import React from "react";
import SymptomCard from "./SymptomCard";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const SymptomDialog = ({ open, handleClose, symptoms }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth= "md"
      aria-labelledby="symptom-dialog-title"
      aria-describedby="symptom-dialog-description"
    >
      <DialogTitle id="symptom-dialog-title">
        <h3 className="text-center">List of Symptoms</h3>
        </DialogTitle>
      <DialogContent>
        <div className="row pt-2">
          {symptoms.map((symptom, index) => (
            <div
              key={index}
              className={`col-md-6 mb-5 d-flex justify-content-center ${index === symptoms.length - 1 && symptoms.length % 2 !== 0 ? "offset-md-3" : ""}`}
            >
              <SymptomCard {...symptom} />
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SymptomDialog;
