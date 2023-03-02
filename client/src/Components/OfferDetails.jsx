import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OfferDetails = () => {

    const [offer, setOffer] = useState({job: "", languages: [], salary: 0 });

    const { id } = useParams();
    let navigation = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/offer/'+id)
        .then(res => {
            setOffer(res.data);    
        })
        .catch(err => console.log(err))
    }, [id]);

    const updateOfferHandler = (newLanguages) => {
        console.log(offer.languages);
        axios.put('http://localhost:8000/api/offer/'+id, {
            job: offer.job,
            languages: newLanguages,
            salary: offer.salary
        })
            .then(res => {
                console.log(res.data);
                //navigation('/api/offers')
            })
            .catch(err => console.log(err))
    }

    const handleLanguageChange = (e) => {
        console.log(e.target.checked);
        const language = e.target.value;
        let newLanguages = offer.languages.slice(); // crea una copia de la lista de lenguajes
        
        if (e.target.checked===true) {
          newLanguages.push(language);
        } else if (e.target.checked===false) {
          newLanguages = newLanguages.filter((lang) => lang !== language);
        }
        setOffer({ ...offer, languages: newLanguages });
        console.log(newLanguages);
        
        updateOfferHandler(newLanguages); // llama a la función de actualización de oferta cada vez que cambia el estado del checkbox
    };
    

    return(
        <div>
            <div>
                <h1>Job offer</h1>
                <button onClick={(e) => navigation("/api/offers")}> Job Offers</button>
            </div>
            <div>
                <label htmlFor="job">Job: </label>
                <span>{offer.job}</span>
            </div>
            <div>
                {
                    //En la parte de la actualizacion, si interactuo dos veces, se modifica (falta pulir)
                }
                <label htmlFor="languages">Languages: </label>
                <input type="checkbox" id="JS" name="JS" value="JS" checked={offer.languages.includes("JS")} onChange={handleLanguageChange} />
                <label htmlFor="JS">JS</label>
                <input type="checkbox" id="CSS" name="CSS" value="CSS" checked={offer.languages.includes("CSS")} onChange={handleLanguageChange} />
                <label htmlFor="CSS">CSS</label>
            </div>
            <div>
                <label htmlFor="salary">Salary: </label>
                <span>{offer.salary}</span>
            </div>
            
        </div>
    );

}

export default OfferDetails;
