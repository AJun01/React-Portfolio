import projectOne from "../../assets/cyber/project-1.png";
import projectTwo from "../../assets/cyber/project-2.png";
import projectThree from "../../assets/cyber/project-3.png";

const projects = {
    1: {
        title: "Flexbench", 
        image: projectOne,
        description: (
            <>
                <p>
                A customizable NodeJS script to simulate HTTP traffic. It functions as a standalone script, desktop app, or server, allowing tailored traffic simulations with specific read/write ratios, request counts, traffic throttling, and more.
                </p>
            </>
        ),
        github: "https://github.com/flexivian/flexbench",
        demo: "https://flexivian.github.io/flexbench/",
    },
    2: {
        title: "Weather App", 
        image: projectTwo,
        description: (
            <>
                <p>
                A Node.js and Express app that provides real-time weather data by location. Users enter a ZIP code and country to see temperature, humidity, and more. Dynamic visuals mirror current weather, offering a responsive and engaging experience.
                </p>
            </>
        ),
        github: "https://github.com/AJun01/weather-app",
        demo: "https://github.com/AJun01/weather-app",
    },
    3: {
        title: "Yoga Class Registar", 
        image: projectThree,
        description: (
            <>
                <p>
                A streamlined app for registering in yoga programs, allowing account creation, program selection, and secure payments via Stripe. Built with React and Node.js, it includes user-friendly registration, training level selection, and mobile optimization for ease of use.
                </p>
            </>
        ),
        github: "https://github.com/AJun01/Registar",
        demo: "https://github.com/AJun01/Registar",
    },
}


export default projects;