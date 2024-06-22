import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const SymptomCard = (symptom) => {
    const data = {
      description: symptom.description,
        name: symptom.name,
        image: symptom.image
    };

    return (

        <Card sx={{ width: 360, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ backgroundColor: "#e2e8f445", flexGrow: 1 }}>
                <CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '140px', objectFit: 'cover' }}
                    image={data.image}
                    alt={data.name}
                />
                </CardContent>
    
                <CardContent sx={{padding: '10px 23px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.description}
                </Typography>
                </CardContent>
            </CardContent>
        </Card>
    );
}

export default SymptomCard;