import React, { useState } from "react";
import SymptomDialog from "./SymptomDialog";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Button from "@mui/material/Button";

const DiseaseCard = (diasese) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const data = {
    description: diasese.description,
    name: diasese.name,
    image: diasese.image,
    percentage: diasese.percentage,
    symptoms: diasese.symptoms,
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 360, display: "flex", flexDirection: "column" }}>
      <CardActionArea
        sx={{ backgroundColor: "#ffc7c700", flexGrow: 1 }}
        onClick={handleOpenDialog}
      >
        <CardContent>
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "140px",
              objectFit: "cover",
            }}
            image={data.image}
            alt={data.name}
          />
        </CardContent>

        <CardContent sx={{ padding: "10px 23px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Percentage: {toPercentage(data.percentage)}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          justifyContent: "center",
          backgroundColor: "#1dc4f70d",
        }}
      >
        <Button size="small" color="primary" onClick={handleOpenDialog}>
          Show Symptoms
        </Button>
      </CardActions>

      <SymptomDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        symptoms={data.symptoms}
      />
    </Card>
  );
};

// Convertir porcentaje decimal a entero con 2 decimales
function toPercentage(decimal) {
  const valor = decimal * 100;
  return valor.toFixed(2);
}

export default DiseaseCard;
