import React, { useState, useEffect } from "react";
import "../styles/playerStats.css";

const PlayerStats = () => {
    const [age, setAge] = useState(0);

    useEffect(() => {
        const calculateAge = () => {
            const birthDate = new Date(2000, 3, 22);
            const today = new Date();
            let years = today.getFullYear() - birthDate.getFullYear();
            let months = today.getMonth() - birthDate.getMonth();
            let days = today.getDate() - birthDate.getDate();

            if (months < 0 || (months === 0 && days < 0)) {
                years--;
                months += 12;
            }

            setAge(years);
        };

        calculateAge();
        const timer = setInterval(calculateAge, 60000); 

        return () => clearInterval(timer); 
    }, []);

    return (
        <div id="playerStats">
            <h1>Yujun Liu LEVEL {age}</h1>
            {/* <div id="playerStats__lines">
                <span id="playerStats__lines__thick" style={{ width: `${exp}%` }}></span>
                <span id="playerStats__lines__thin"></span>
            </div> */}
            <h2>Fullstack Developer</h2>
        </div>
    );
};

export default PlayerStats;