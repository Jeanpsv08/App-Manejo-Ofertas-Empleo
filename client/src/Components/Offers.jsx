import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Offers = () =>{

    const [ offerList, setOfferList ] = useState([]);
    let navigation = useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:8000/api/offers")
        .then((offers) => setOfferList(offers.data))
        .catch((err) => console.log(err))
    }, []);

    const updateUserDom = (offerId) =>{
        setOfferList(offerList.filter(offer => offer._id !== offerId));
    }

    const deleteHandler = (offerId) =>{
        axios.delete('http://localhost:8000/api/offer/' + offerId)
            .then( res => {
                console.log(res);
                updateUserDom(offerId);
            })
            .catch( err => console.log(err))
    }

    return(
        <div>
            <div className="cabecera">
                <h1>Job offers</h1>
                <button className="btnCabecera" onClick={(e)=>{navigation('/api/offer/new')}}>Add Offer</button>
            </div>
            
            {
                offerList.map((offer, i) =>{
                    return <p key={i}>
                        <div className="offers">
                            <p>{offer.job} - {offer.salary} USD</p>
                            <p>
                            {
                                offer.languages.map((lan,j)=>{
                                    return <span key={j}>{lan} </span>
                                })
                            }
                            </p>
                            
                            
                            <button onClick={(e)=>{navigation('/api/offer/'+offer._id)}}>View Offer</button>
                            <button onClick={(e)=>deleteHandler(offer._id)}>Delet Offer</button>
                        </div>
                        
                    </p> 
                })
            }
            
            
        </div>
    );
}


export default Offers;