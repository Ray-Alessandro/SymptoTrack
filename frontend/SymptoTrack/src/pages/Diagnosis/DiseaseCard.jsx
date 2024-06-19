import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const MultiActionAreaCard = (diasese) => {

    const data = {
        description : diasese.description,
        name : diasese.name,
        image : diasese.image,
        percentage : diasese.percentage,
        symptoms : diasese.symptoms,
    }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {data.image}
          alt= {data.name}
        />
        <CardContent>
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
      <CardActions>
        <Button size="small" color="primary">
          Show Details
        </Button>
      </CardActions>
    </Card>
  );
}

//Convertir a pocentaje decimal a entero con 2 decimales
function toPercentage(decimal){
    const valor = decimal*100;
    return valor.toFixed(2);
}

export default MultiActionAreaCard;