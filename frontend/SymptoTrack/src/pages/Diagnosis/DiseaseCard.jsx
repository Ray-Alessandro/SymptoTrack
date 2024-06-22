import React from "react";
import SymptomDialog from "./SymptomDialog";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const DiseaseCard = (diasese) => {
  const data = {
    description: diasese.description,
    name: diasese.name,
    image: diasese.image,
    percentage: diasese.percentage,
    symptoms: diasese.symptoms,
  };

  return (
    <Card sx={{ maxWidth: 360, display: 'flex', flexDirection: 'column' }}>
      <CardActionArea sx={{ backgroundColor: "#ffc7c700", flexGrow: 1 }} onAbort={() => SymptomDialog(data.symptoms)}>
        <CardContent>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: 'auto', maxHeight: '140px', objectFit: 'cover' }}
            image={data.image}
            alt={data.name}
          />
        </CardContent>
        
        <CardContent sx={{padding: '10px 23px' }}>
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
      <CardActions sx={{ justifyContent: 'center', backgroundColor: "#1dc4f70d" }}>
        <Button size="small" color="primary" onClick={() => SymptomDialog(data.symptoms)}>
          Show Symptoms
        </Button>
      </CardActions>
    </Card>
  );
};

//Convertir a pocentaje decimal a entero con 2 decimales
function toPercentage(decimal) {
  const valor = decimal * 100;
  return valor.toFixed(2);
}

export default DiseaseCard;
