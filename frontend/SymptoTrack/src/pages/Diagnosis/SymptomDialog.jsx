import React from "react";
import SymptomCard from "./SymptomCard";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const SymptomDialog = ({ symptoms }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Symptom Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="symptom-dialog-title"
        aria-describedby="symptom-dialog-description"
      >
        <DialogTitle id="symptom-dialog-title">Symptoms</DialogTitle>
        <DialogContent>
          {symptoms.map((symptom, index) => (
            <SymptomCard key={index} {...symptom} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SymptomDialog;