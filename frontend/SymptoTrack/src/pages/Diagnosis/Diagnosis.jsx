import React, { useState } from "react";

import SymptomSelector from "./SymptomSelector";
import SymptomService from "../../services/SymptomService";
import DiseaseService from "../../services/DiseaseService";
import DiseaseCard from "./DiseaseCard";

import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";

const Diagnosis = () => {
  const { data: symptomData, loading: symptomLoading } = SymptomService();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [sendSymptoms, setSendSymptoms] = useState([]);

  const { data: dataDisease, loading: loadingDisease } =
    DiseaseService(sendSymptoms);

  const handleDiagnose = () => {
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom");
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

      {(symptomLoading || loadingDisease) && (
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
                    {dataDisease.length === 1 && (
                      <div className="d-flex justify-content-center mb-4">
                        <DiseaseCard {...dataDisease[0]} />
                      </div>
                    )}
                    {dataDisease.length === 2 && (
                      <>
                        <div className="col-md-6 mb-4 d-flex justify-content-center">
                          <DiseaseCard {...dataDisease[0]} />
                        </div>
                        <div className="col-md-6 mb-4 d-flex justify-content-center">
                          <DiseaseCard {...dataDisease[1]} />
                        </div>
                      </>
                    )}
                    {dataDisease.length === 3 && (
                      <>
                        <div className="col-md-6 mb-4 d-flex justify-content-center">
                          <DiseaseCard {...dataDisease[0]} />
                        </div>
                        <div className="col-md-6 mb-4 d-flex justify-content-center">
                          <DiseaseCard {...dataDisease[1]} />
                        </div>
                        <div className="d-flex justify-content-center bg-danger mb-4">
                          <DiseaseCard {...dataDisease[2]} />
                        </div>
                      </>
                    )}
                    {dataDisease.length > 3 &&
                      dataDisease.map((disease, index) => (
                        <div className="col-md-6 mb-5 d-flex justify-content-center" key={index}>
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
