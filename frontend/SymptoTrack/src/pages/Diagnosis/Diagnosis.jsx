import React from "react";
import SymptomSelector from "./SymptomSelector";
import { SymptomService } from "../../services/SymptomService";
import LoadingButton from '@mui/lab/LoadingButton';


const Diagnosis = () => {
  const { data, loading } = SymptomService();


  const handleDiagnose = () => {
    // Lógica para realizar el diagnóstico
    console.log("Performing diagnosis...");
  };

  const options = data?.map((symptom) => symptom);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Make Diagnosis</h5>

              <div className="form-group">
                <label htmlFor="symptomSelect">Choose your Symptoms:</label>

                {[...Array(4)].map((_, index) => (
                  <SymptomSelector key={index} options={options} i={index} />
                ))}

                <div className="d-grid col-10 mx-auto mt-3">
                <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={handleDiagnose}
                    loading={loading}
                    disabled={loading}
                    sx={{
                      backgroundColor: '#d3bd96',
                      height: '50px', 
                      margin: '25px 0',
                      '&:hover': {
                        backgroundColor: '#52a7bb', 
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
  );
};

export default Diagnosis;
