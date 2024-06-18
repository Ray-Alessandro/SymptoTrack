import React, { useState } from "react";
import SymptomSelector from "./SymptomSelector";
import { SymptomService } from "../../services/SymptomService";
import DiseaseService from '../../services/DiseaseService';

import LoadingButton from '@mui/lab/LoadingButton';

const Diagnosis = () => {
  const { data: symptomData, loading: symptomLoading } = SymptomService();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const { data: dataDisease, loading: loadingDisease } = DiseaseService(selectedSymptoms);

  const handleDiagnose = () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom');
      return;
    }


    console.log('Diagnosis:', dataDisease);
  };

  const options = symptomData?.map((symptom) => symptom);

  const handleSymptomSelect = (symptom) => {
    setSelectedSymptoms((prevSelected) => [...prevSelected, symptom]);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Make Diagnosis</h3>

              <div className="form-group">
                <label htmlFor="symptomSelect" className="form-label fs-6 mt-4 mb-0">Choose your Symptoms:</label>

                {[...Array(4)].map((_, index) => (
                  <SymptomSelector key={index} options={options} i={index} onSelect={handleSymptomSelect} />
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
