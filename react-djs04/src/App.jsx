import React, { useState, useEffect } from "react"; 
import Header from "./Header.jsx"
import PodcastCard from "./PodcastCards.jsx"
import { genres } from "./Data.js"
import "./index.css"


export default function App() {

    const [podcasts, setPodcasts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(function () {
        fetch("https://podcast-api.netlify.app/")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("failed to load data")
                }
                return response.json();
            })
            .then(function (data) {
                setPodcasts(data);
            })
            .catch(function (error) {
                console.log("Error fetching data:", error);
                setErrorMessage(true)
            })
    }, []);


    function getGenresByIds(ids) {
    let result = [];

        for (let i = 0; i < ids.length; i++) {
            let match = genres.find(function (genre) {
            return genre.id === ids[i];
            });

            if (match) {
            result.push(match.title);
            }
        }

        return result;
    }

    const podcastCards = podcasts.map(function (podcast) {
        return (
            <PodcastCard
                key={podcast.id}
                image={podcast.image}
                title={podcast.title}
                seasons={podcast.seasons}
                updated={podcast.updated}
                genres={getGenresByIds(podcast.genres)} 
            />
        )
    })


    return (
        <>
            {errorMessage ? <p>Error could not fetch data</p> :
                
                (<div><Header />
                    <main id="podcast-grid" className="grid">
                        {podcastCards}
                    </main></div>)}
        </>    
    )
}

