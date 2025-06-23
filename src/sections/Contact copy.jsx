import ContactExperience from "../components/ContactExperience";

const Contact = () => {
    return (
        <section className="w-full h-full relative" id="contract">
            <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
                <div className="w-full h-full bg-white"></div>
                <ContactExperience />
            </div>
            
        </section>
    )
}

export default Contact;