import GradientSpheres from "../components/GradientSpheres";
import { useEffect, useRef, useState } from "react";
import ContactExperience from "../components/ContactExperience"

const Contact = () => {
    const [btnClicked, setBtnClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setBtnClicked(true)

        setTimeout(() => {
            setBtnClicked(false)
            setShowModal(true)
        }, 3000);
    }

    return (
        <section className="c-space section-spacing relative" id="contract">

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Contact Me
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    사용자 경험을 최우선으로 하는 UI/UX 엔지니어링으로<br/>
                    더 나은 디지털 경험을 만들어가고 싶습니다
                </p>
                <p className="text-gray-300 md:text-lg mt-4 max-w-xl mx-auto">
                    풀스택 개발 역량도 함께 성장시켜 나가겠습니다
                </p>

                <div className="flex justify-center">
                    <button 
                        onClick={handleClick}
                        className="group relative overflow-hidden bg-gradient-to-r from-[#b5404a] to-[#d95949] text-white px-8 py-4 rounded-xl mt-6 flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 border border-red-400/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#d95949] to-[#b5404a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img src="/assets/images/send.png" alt="email" className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-lg font-semibold relative z-10 tracking-wide">Contact</span>
                        <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                </div>
                
            </div>
            
            <div className="w-full h-full absolute top-0 left-0 z-20">
                <ContactExperience btnClicked={btnClicked} />
            </div>

            {/* 모달 */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                    {/* 배경 오버레이 */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    />
                    
                    {/* 모달 컨텐츠 */}
                    <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#1a1a2e] to-[#16213e] rounded-t-3xl transform translate-y-full animate-slide-up border border-gray-700/50 shadow-2xl">
                        {/* 모달 헤더 */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* 모달 바디 */}
                        <div className="p-6 space-y-6">
                            {/* 이메일 섹션 */}
                            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#b5404a] to-[#d95949] rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <p className="text-white font-medium">mslee@example.com</p>
                                </div>
                            </div>
                            
                            {/* 전화번호 섹션 */}
                            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#b5404a] to-[#d95949] rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Phone</p>
                                    <p className="text-white font-medium">+82 10-1234-5678</p>
                                </div>
                            </div>
                            
                            {/* 소셜 미디어 섹션 */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center space-x-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200">
                                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                    <span className="text-white font-medium">Twitter</span>
                                </button>
                                
                                <button className="flex items-center justify-center space-x-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    <span className="text-white font-medium">LinkedIn</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}

export default Contact;
