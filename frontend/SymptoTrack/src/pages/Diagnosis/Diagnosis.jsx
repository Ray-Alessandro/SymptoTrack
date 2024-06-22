import React, { useState } from "react";

import SymptomSelector from "./SymptomSelector";
import SymptomService from "../../services/SymptomService";
import DiseaseService from "../../services/DiseaseService";
import DiseaseCard from "./DiseaseCard";

import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, AlertTitle } from "@mui/material";

const Diagnosis = () => {
  const { data: symptomData, loading: symptomLoading } = SymptomService();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [sendSymptoms, setSendSymptoms] = useState([]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: dataDisease, loading: loadingDisease } =
    DiseaseService(sendSymptoms);

  const handleDiagnose = () => {
    handleCloseAlert();

    if (selectedSymptoms.length === 0) {
      setErrorMessage(
        "You did not select any symptoms. Please select at least one symptom."
      );
      setShowErrorAlert(true);
    }
    //Si selecciona sintomas iguales
    if (new Set(selectedSymptoms).size !== selectedSymptoms.length) {
      setErrorMessage("Please select different symptoms.");
      setShowErrorAlert(true);
      return;
    }

    //Eliminate empty symptoms
    const auxSymptoms = selectedSymptoms.filter(
      (symptom) => symptom !== undefined
    );
    setSendSymptoms(auxSymptoms);
    console.log("Selected Symptoms:", auxSymptoms);
  };

  const options = symptomData?.map((symptom) => symptom);

  const handleSymptomSelect = (symptom, index) => {
    setSelectedSymptoms((prevSelected) => {
      const updatedSymptoms = [...prevSelected];

      updatedSymptoms[index] = symptom;

      return updatedSymptoms;
    });
  };

  // Función para cerrar la alerta de éxito
  const handleCloseAlert = () => {
    setShowErrorAlert(false);
  };

  return (
    <>
      <div className="container mt-5 ">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">Make Diagnosis</h3>

                <div className="form-group">
                  <label
                    htmlFor="symptomSelect"
                    className="form-label fs-6 mt-4 mb-0"
                  >
                    Choose your Symptoms:
                  </label>

                  {[...Array(4)].map((_, index) => (
                    <SymptomSelector
                      key={index}
                      options={options}
                      i={index}
                      onSelect={(symptom) =>
                        handleSymptomSelect(symptom, index)
                      }
                    />
                  ))}


                  {showErrorAlert && (
                    <Alert severity="error" onClose={handleCloseAlert} sx={{ mb: -3, mt: 2}} >
                      <AlertTitle>Error</AlertTitle>
                      {errorMessage}
                    </Alert>
                  )}

                  <div className="d-grid col-10 mx-auto mt-3">
                    <LoadingButton
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={handleDiagnose}
                      loading={symptomLoading || loadingDisease}
                      disabled={symptomLoading || loadingDisease}
                      sx={{
                        backgroundColor: "#d3bd96",
                        height: "50px",
                        margin: "25px 0",
                        "&:hover": {
                          backgroundColor: "#52a7bb",
                        },
                      }}
                    >
                      Diagnose
                    </LoadingButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loadingDisease && (
        <div className="d-flex justify-content-center mt-5 mb-5">
          <CircularProgress />
        </div>
      )}

      {dataDisease.length > 0 && (
        <div className="container mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-9">
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title text-center mt-3 mb-5">
                    <u> Diagnostic results </u>
                  </h1>
                  <div className="row pt-2">
                    {dataDisease.map((disease, index) => (
                      <div
                        className={`col-md-6 mb-5 d-flex justify-content-center ${
                          index === dataDisease.length - 1 &&
                          dataDisease.length % 2 !== 0
                            ? "offset-md-3"
                            : ""
                        }`}
                        key={index}
                      >
                        <DiseaseCard {...disease} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Diagnosis;
