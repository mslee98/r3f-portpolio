import { memo, useCallback, useMemo } from "react";
import GradientSpheres from "../components/GradientSpheres";
import ContactExperience from "../components/ContactExperience";
import { useState } from "react";

const Contact = memo(() => {
    const [btnClicked, setBtnClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClick = useCallback(() => {
        setBtnClicked(true);
        setTimeout(() => {
            setBtnClicked(false);
            setShowModal(true);
        }, 2000);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    // 메모이제이션된 모달 컨텐츠
    const modalContent = useMemo(() => (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleCloseModal}
            />
            
            <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#1a1a2e] to-[#16213e] rounded-t-3xl transform translate-y-full animate-slide-up border border-gray-700/50 shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                    <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                    <button 
                        onClick={handleCloseModal}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#b5404a] to-[#d95949] rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Email</p>
                            <p className="text-white font-medium">lms980321@kakao.com</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#b5404a] to-[#d95949] rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Phone</p>
                            <p className="text-white font-medium">+82 10-9964-1998</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <a href="https://mslee98pf.notion.site" className="flex items-center justify-center space-x-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200">
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933l3.268-.187z"/>
                            </svg>
                            <span className="text-white font-medium">Notion</span>
                        </a>
                        
                        <a href="https://github.com/mslee98" className="flex items-center justify-center space-x-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span className="text-white font-medium">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    ), [handleCloseModal]);

    return (
        <section className="c-space section-spacing relative" id="contract">
            <div className="w-full h-full absolute top-0 left-0 z-20">
                <ContactExperience btnClicked={btnClicked} handleClick={handleClick}/>
            </div>

            {showModal && modalContent}
        </section>
    );
});

Contact.displayName = 'Contact';

export default Contact;
