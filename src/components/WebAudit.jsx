import React, { useEffect, useState, useRef } from 'react';

const WebAudit = () => {
    const [showInput, setShowInput] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isLoading, setIsLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const heroRef = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            setShowInput(scrollY > 200);

            if (scrollY > 100) {
                navRef.current?.classList.add('nav-visible');
            } else {
                navRef.current?.classList.remove('nav-visible');
            }

            // Actualizar sección activa
            const sections = ['home', 'services', 'projects', 'contact'];
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            setMobileMenuOpen(false);
        }
    };

    const handleAuditSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const url = e.target.url.value;

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            showNotification('¡Genial! Hemos recibido tu solicitud. Te contactaremos pronto.', 'success');
            e.target.reset();
        } catch (error) {
            showNotification('Hubo un error. Por favor, inténtalo de nuevo.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            showNotification('¡Mensaje enviado correctamente! Te responderemos en las próximas 24 horas.', 'success');
            e.target.reset();
        } catch (error) {
            showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const showNotification = (message, type) => {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    };

    return (
        <div className="w-full min-h-screen">
            {/* Loader */}
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl flex items-center space-x-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="text-gray-700">Procesando...</span>
                    </div>
                </div>
            )}

            {/* Navegación */}
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 glass-effect transform -translate-y-full opacity-0 transition-all duration-500"
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-white font-bold text-2xl gradient-text">
                            WebAudit Pro
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8">
                            {[
                                { id: 'home', label: 'Inicio' },
                                { id: 'services', label: 'Servicios' },
                                { id: 'projects', label: 'Proyectos' },
                                { id: 'contact', label: 'Contacto' }
                            ].map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className={`text-white hover:text-blue-400 transition-all duration-300 relative ${
                                        activeSection === id ? 'text-blue-400' : ''
                                    }`}
                                >
                                    {label}
                                    {activeSection === id && (
                                        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <div className="w-6 h-6 flex flex-col justify-around">
                                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden mt-4 py-4 border-t border-white/20 transition-all duration-300 ${
                        mobileMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}>
                        {[
                            { id: 'home', label: 'Inicio' },
                            { id: 'services', label: 'Servicios' },
                            { id: 'projects', label: 'Proyectos' },
                            { id: 'contact', label: 'Contacto' }
                        ].map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className="block w-full text-left text-white hover:text-blue-400 py-2 transition-colors duration-300"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" ref={heroRef}
                     className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
                {/* Efectos de fondo */}
                <div className="absolute inset-0">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 6}s`
                            }}
                        ></div>
                    ))}
                </div>

                <div className="relative z-10 text-center animate-on-scroll px-4">
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text text-shadow-lg">
                        WebAudit Pro
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                        Transformamos tu presencia digital...
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <button onClick={() => scrollToSection('services')} className="btn-primary">
                            Ver Servicios
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="btn-secondary">
                            Contactar Ahora
                        </button>
                    </div>

                    {/* Flecha debajo de los botones */}

                </div>
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 bottom-10 flex flex-col items-center animate-bounce cursor-pointer transition-all duration-300 hover:scale-110"
                    onClick={() => scrollToSection('services')}
                >
                    <svg className="w-8 h-8 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                    <span className="text-sm">Explorar servicios</span>
                </div>

            </section>

            {/* Sección de Auditoría */}
            <section
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-20">
                <div className={`transition-all duration-1000 ease-out transform animate-on-scroll ${
                    showInput ? 'opacity-100 translate-y-0 scale-100' : 'opacity-70 translate-y-10 scale-95'
                }`}>
                    <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-6xl w-full mx-4 hover-lift">
                        <div className="text-center mb-8">
                            <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">

                            </div>
                            <h2 className="text-5xl font-bold text-gray-800 mb-4">
                                Auditoría Gratuita
                            </h2>
                            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                                Obtén un análisis profesional y detallado de tu sitio web completamente gratis.
                                Incluye SEO, rendimiento, seguridad y UX.
                            </p>
                        </div>

                        <form onSubmit={handleAuditSubmit} className="space-y-6">
                            <div className="flex flex-col lg:flex-row gap-4 items-center">
                                <div className="flex-1 relative">
                                    <input
                                        type="url"
                                        name="url"
                                        placeholder="https://tu-sitio-web.com"
                                        className="w-full  text-black py-6 border-2 border-gray-300 rounded-2xl text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                        required
                                    />
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                        </svg>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Analizando...' : 'Auditar Gratis'}
                                </button>
                            </div>
                        </form>

                        {/* Beneficios */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            {[
                                { icon: "⚡", title: "Rendimiento", desc: "Core Web Vitals y velocidad" },
                                { icon: "🔍", title: "SEO", desc: "Optimización para buscadores" },
                                { icon: "🛡️", title: "Seguridad", desc: "Vulnerabilidades y protección" }
                            ].map((benefit, idx) => (
                                <div key={idx} className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                                    <div className="text-3xl mb-2">{benefit.icon}</div>
                                    <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Aquí continuarían las demás secciones con la misma filosofía 100% Tailwind */}
        </div>
    );
};

export default WebAudit;