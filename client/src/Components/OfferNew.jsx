import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OfferNew = () => {
  const [offer, setOffer] = useState({ job: "", languages: [], salary: 0 });
  const [jobError, setJobError] = useState("");
  let navigation = useNavigate();

  const createOfferHandler = (e) => {
    //Función para realizar una petición PUT y actualizar un usuario
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/offer/new", {
        job: offer.job,
        languages: offer.languages,
        salary: offer.salary,
      })
      .then((res) => {
        console.log(res);
        navigation("/api/offers");
      })
      .catch((err) => {
        console.log(err.response.data);
        const errorResponse = err.response.data.errors;
        if (Object.keys(errorResponse).includes("job")) {
          setJobError(errorResponse["job"].message);
        }
      });
  };

  const handleJobChange = (e) => {
    setOffer({ ...offer, job: e.target.value });
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    const isChecked = e.target.checked;
    let newLanguages = offer.languages;
    if (isChecked) {
      newLanguages.push(language);
    } else {
      newLanguages = newLanguages.filter((lang) => lang !== language);
    }
    setOffer({ ...offer, languages: newLanguages });
  };

  const handleSalaryChange = (e) => {
    const salary = e.target.value;
    setOffer({ ...offer, salary });
  };

  return (
    <div>
      <div className="cabecera">
        <h1>Add new job offer</h1>
        <button className="btnCabecera" onClick={(e) => navigation("/api/offers")}> Job Offers</button>
      </div>

      <form onSubmit={createOfferHandler}>
        <div>
          <label htmlFor="job">Job:</label>
          <select id="job" value={offer.job} onChange={handleJobChange}>
            <option value="">-- Please choose a job --</option>
            <option value="Frontend developer">Frontend developer</option>
            <option value="Backend developer">Backend developer</option>
            <option value="DevOps">DevOps</option>
            <option value="Fullstack developer">Fullstack developer</option>
          </select>
          <p>{jobError}</p>
        </div>
        <div>
          <label htmlFor="languages">Required languages:</label>
          <div>
            <input
              type="checkbox"
              id="js"
              name="languages"
              value="JS"
              checked={offer.languages.includes("JS")}
              onChange={handleLanguageChange}
            />
            <label htmlFor="js">JS</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="css"
              name="languages"
              value="CSS"
              checked={offer.languages.includes("CSS")}
              onChange={handleLanguageChange}
            />
            <label htmlFor="css">CSS</label>
          </div>
        </div>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            min="1"
            value={offer.salary}
            onChange={handleSalaryChange}
          />
        </div>
        <input type="submit" value="Add offer" />
      </form>
    </div>
 
  );
}

export default  OfferNew;
