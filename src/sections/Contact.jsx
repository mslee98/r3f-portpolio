import GradientSpheres from "../components/GradientSpheres";
import { useEffect, useRef } from "react";
import ContactExperience from "../components/ContactExperience"

const Contact = () => {
    return (
        <section className="w-full h-full bg-black" id="contract">

            <div className="gradient-box w-full h-full absolute top-0 left-0 z-20">
                <GradientSpheres
                    sphere1Class="gradient-sphere sphere-1"
                    sphere2Class="gradient-sphere sphere-2"
                />
            </div>

            <div className="w-full h-full absolute top-0 left-0">
                <ContactExperience />
            </div>


        </section>
    )
}


export default Contact;
