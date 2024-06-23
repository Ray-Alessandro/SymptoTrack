import React from "react";
import { Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import sympotrackLogo from "./../../assets/logo.jpeg";
import missionPicture from "./../../assets/mission.jpg";
import visionPicture from "./../../assets/vision.jpg";

const Home = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isMissionHovered, setIsMissionHovered] = React.useState(false);
  const [isVisionHovered, setIsVisionHovered] = React.useState(false);


  return (
    <Container>
      <Card sx={{ padding: 1, marginBottom: 12, marginTop: 5 }}>
        <CardContent>
          <Typography variant="h2" gutterBottom align="center">
            What is Sympotrack?
          </Typography>
          <Typography variant="body1" paragraph align="justify">
            SymptoTrack is an innovative platform aimed at enhancing accessibility
            and accuracy in disease identification through the collection and
            analysis of symptom data, utilizing advanced algorithms such as BFS
            and probabilistic graph theory. Its goal is to provide personalized
            recommendations for potential diseases and appropriate treatments,
            surpassing the limitations of traditional platforms by delivering
            reliable medical information and fostering connections among patients
            with similar experiences. SymptoTrack aims to revolutionize how
            individuals manage their health, promoting more personalized and
            efficient healthcare solutions.
          </Typography>
        </CardContent>
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <div
            style={{
              width: "220px",
              height: "220px",
              overflow: "hidden",
              transition: "transform 0.3s",
              transform: isHovered ? "scale(1.2)" : "scale(1)",
              margin: "0 auto",
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            <img
              src={sympotrackLogo}
              alt="Sympotrack Logo"
              style={{
                maxWidth: "100%",
                borderRadius: "20px 20px",
                height: "auto",
                transition: "transform 0.3s",
                display: "block",
              }}
            />
          </div>
        </Box>
      </Card>

      <Grid container spacing={15} justifyContent="center" sx={{marginBottom: 10 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom align="center">
                Mission
              </Typography>
              <Typography variant="body1" align="justify" width="80%" margin="auto">
                SymptoTrack is dedicated to significantly improving access and
                accuracy in disease identification through advanced technologies
                and data analytics. Our mission is to provide users with precise,
                personalized recommendations based on reported symptoms, thereby
                facilitating informed decisions about their health and enhancing
                overall well-being.
              </Typography>
            </CardContent>
            <Box sx={{ textAlign: "center", marginTop: "auto" }}>
              <div
                style={{
                  width: "200px",
                  overflow: "hidden",
                  borderRadius: "20px",
                  transition: "transform 0.3s",
                  transform: isMissionHovered ? "scale(1.1)" : "scale(1)",
                  cursor: "pointer",
                  margin: "0 auto",
                }}
                onMouseEnter={() => setIsMissionHovered(true)}
                onMouseLeave={() => setIsMissionHovered(false)}
              >
                <img
                  src={missionPicture}
                  alt="Mission"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "200px",
                    borderRadius: "20px",
                    transition: "transform 0.3s",
                    display: "block",
                    margin: "20px auto",
                  }}
                />
              </div>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom align="center">
                Vision
              </Typography>
              <Typography variant="body1" align="justify" width="80%" margin="auto">
                Our vision is to become leaders in digital health innovation,
                renowned for our ability to deliver reliable and relevant medical
                information that transforms user experience. We aim to be a
                comprehensive platform that not only facilitates early and
                accurate disease diagnosis but also fosters a collaborative
                community where users can share experiences and knowledge for more
                effective and personalized health management.
              </Typography>
            </CardContent>
            <Box sx={{ textAlign: "center", marginTop: "auto" }}>
              <div
                style={{
                  width: "200px",
                  overflow: "hidden",
                  borderRadius: "20px",
                  transition: "transform 0.3s",
                  transform: isVisionHovered ? "scale(1.1)" : "scale(1)",
                  cursor: "pointer",
                  margin: "0 auto",
                }}
                onMouseEnter={() => setIsVisionHovered(true)}
                onMouseLeave={() => setIsVisionHovered(false)}
              >
                <img
                  src={visionPicture}
                  alt="Vision"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "200px",
                    borderRadius: "20px",
                    transition: "transform 0.3s",
                    display: "block",
                    margin: "20px auto",
                  }}
                />
              </div>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
