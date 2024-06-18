//Iniciamos la página de Diagnóstico
import React from "react";
import SymptomSelector from "./SymptomSelector";

const options = [
  "Select Symptom",
  "Fever",
  "Cough",
  "Shortness of breath",
  "Fatigue",
  "Muscle or body aches",
  "Headache",
  "New loss of taste or smell",
  "Sore throat",
  "Congestion or runny nose",
  "Nausea or vomiting",
  "Diarrhea",
];

const Diagnosis = () => {
  const ListOptions = options.map((option, index) => {
    return <option key={index}>{option}</option>;
  });

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Make Diagnosis</h5>

              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">
                  Choose your Symtoms :
                </label>
                <SymptomSelector options={options} />
                <SymptomSelector options={options} />
                <SymptomSelector options={options} />
                <SymptomSelector options={options} />
                
                <div className= "d-grid col-10 mx-auto "> 
                    <button type="button" className="btn btn-primary mt-4">Diagnose</button>
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
