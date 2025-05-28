import React, { useEffect, useState, useRef } from 'react';

const WebAudit = () => {
    // Estados para controlar la visibilidad y navegación
    const [showInput, setShowInput] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isLoading, setIsLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Referencias para las animaciones
    const heroRef = useRef(null);
    const navRef = useRef(null);
    const servicesRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);

    useEffect(() => {
        // Smooth scroll nativo mejorado
        document.documentElement.style.scrollBehavior = 'smooth';

        // Animaciones mejoradas con intersección observer
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

        // Observar elementos para animaciones
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Función de scroll mejorada
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setShowInput(scrollY > 200);

            // Actualizar navegación
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

    // Función para scroll suave a secciones
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

    // Función mejorada para manejar el envío del formulario de auditoría
    const handleAuditSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const url = e.target.url.value;

        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mostrar notificación de éxito
            showNotification('¡Genial! Hemos recibido tu solicitud. Te contactaremos pronto.', 'success');
            e.target.reset();
        } catch (error) {
            showNotification('Hubo un error. Por favor, inténtalo de nuevo.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Función para manejar el formulario de contacto
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

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

    // Sistema de notificaciones mejorado
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
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    };

    return (
        <>
            <style jsx>{`
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .nav-visible {
                    transform: translateY(0) !important;
                    opacity: 1 !important;
                }
                
                .floating-element {
                    animation: float 6s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                .gradient-text {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .glass-effect {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                .hover-lift {
                    transition: all 0.3s ease;
                }
                
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }
            `}</style>

            {/* Loader mejorado */}
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl flex items-center space-x-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="text-gray-700">Procesando...</span>
                    </div>
                </div>
            )}

            {/* Navegación mejorada */}
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 glass-effect transform -translate-y-full opacity-0 transition-all duration-500"
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-white font-bold text-2xl gradient-text">WebAudit Pro</div>

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
                                <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-4 py-4 border-t border-white/20">
                            {[
                                { id: 'home', label: 'Inicio' },
                                { id: 'services', label: 'Servicios' },
                                { id: 'projects', label: 'Proyectos' },
                                { id: 'contact', label: 'Contacto' }
                            ].map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className="block w-full text-left text-white hover:text-blue-400 py-2 transition-colors"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* Sección Hero mejorada */}
            <section id="home" ref={heroRef} className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
                {/* Efectos de fondo mejorados */}
                <div className="absolute inset-0">
                    {[...Array(100)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-30 floating-element"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 6}s`
                            }}
                        ></div>
                    ))}
                </div>

                <div className="relative z-10 text-center animate-on-scroll">
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
                        WebAudit Pro
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl px-4 mb-12 leading-relaxed">
                        Transformamos tu presencia digital con auditorías completas, desarrollo web de vanguardia,
                        optimización SEO avanzada y análisis de seguridad profesional
                    </p>

                    {/* CTA Buttons mejorados */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <button
                            onClick={() => scrollToSection('services')}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            Ver Servicios
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
                        >
                            Contactar Ahora
                        </button>
                    </div>

                    <div className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <div className="flex flex-col items-center cursor-pointer" onClick={() => scrollToSection('services')}>
                            <svg className="w-8 h-8 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <span className="text-sm">Explorar servicios</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Auditoría mejorada */}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-20">
                <div className={`transition-all duration-1000 ease-out transform animate-on-scroll ${
                    showInput ? 'opacity-100 translate-y-0 scale-100' : 'opacity-70 translate-y-10 scale-95'
                }`}>
                    <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-6xl w-full mx-4 hover-lift">
                        <div className="text-center mb-8">
                            <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
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
                                        className="w-full px-8 py-6 border-2 border-gray-300 rounded-2xl text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
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

                        {/* Beneficios de la auditoría */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            {[
                                { icon: "⚡", title: "Rendimiento", desc: "Core Web Vitals y velocidad" },
                                { icon: "🔍", title: "SEO", desc: "Optimización para buscadores" },
                                { icon: "🛡️", title: "Seguridad", desc: "Vulnerabilidades y protección" }
                            ].map((benefit, idx) => (
                                <div key={idx} className="text-center p-4">
                                    <div className="text-3xl mb-2">{benefit.icon}</div>
                                    <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Servicios mejorada */}
            <section id="services" ref={servicesRef} className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-6xl font-bold mb-6 gradient-text">
                            Nuestros Servicios
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Soluciones integrales para impulsar tu negocio digital al siguiente nivel
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🚀",
                                title: "Desarrollo Web",
                                description: "Creamos experiencias digitales excepcionales con las últimas tecnologías.",
                                features: ["React/Next.js", "WordPress", "E-commerce", "Apps móviles"],
                                color: "from-blue-500 to-cyan-500"
                            },
                            {
                                icon: "🔍",
                                title: "SEO Avanzado",
                                description: "Dominamos los algoritmos de Google para maximizar tu visibilidad.",
                                features: ["Auditoría SEO", "Keywords research", "Link building", "SEO técnico"],
                                color: "from-green-500 to-emerald-500"
                            },
                            {
                                icon: "🛡️",
                                title: "Seguridad Web",
                                description: "Protección completa contra amenazas y vulnerabilidades modernas.",
                                features: ["Pentesting", "SSL/HTTPS", "Firewall", "Backups automáticos"],
                                color: "from-red-500 to-pink-500"
                            },
                            {
                                icon: "⚡",
                                title: "Optimización",
                                description: "Velocidad y rendimiento que impactan directamente en conversiones.",
                                features: ["Core Web Vitals", "CDN", "Compresión", "Cache inteligente"],
                                color: "from-yellow-500 to-orange-500"
                            },
                            {
                                icon: "📊",
                                title: "Analytics",
                                description: "Datos accionables para tomar decisiones estratégicas inteligentes.",
                                features: ["Google Analytics", "Heatmaps", "A/B Testing", "Reportes"],
                                color: "from-purple-500 to-violet-500"
                            },
                            {
                                icon: "💼",
                                title: "Consultoría",
                                description: "Estrategia digital personalizada para tu crecimiento sostenible.",
                                features: ["Estrategia digital", "UX/UI", "Arquitectura", "Escalabilidad"],
                                color: "from-indigo-500 to-blue-500"
                            }
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="service-card group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 animate-on-scroll border border-gray-100"
                            >
                                <div className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:animate-pulse`}>
                                    <span className="text-3xl text-white">{service.icon}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3`}></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sección de Proyectos mejorada */}
            <section id="projects" ref={projectsRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-6xl font-bold mb-6 gradient-text">
                            Casos de Éxito
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Resultados reales que demuestran el impacto de nuestro trabajo
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {[
                            {
                                title: "E-commerce Fashion Store",
                                description: "Transformación completa que resultó en un crecimiento exponencial de ventas y mejora radical en experiencia de usuario.",
                                metrics: ["300% ↑ Conversiones", "50% ↓ Tiempo de carga", "95/100 PageSpeed"],
                                tech: ["Next.js", "Shopify", "SEO Avanzado"],
                                image: "🛒",
                                gradient: "from-pink-500 to-rose-500"
                            },
                            {
                                title: "SaaS Platform",
                                description: "Plataforma B2B escalable con arquitectura cloud-native y dashboard analytics en tiempo real.",
                                metrics: ["99.9% Uptime", "1M+ Usuarios", "A+ Seguridad"],
                                tech: ["React", "Node.js", "AWS"],
                                image: "💼",
                                gradient: "from-blue-500 to-indigo-500"
                            },
                            {
                                title: "Marketplace Local",
                                description: "Ecosistema digital que conecta comercios locales con consumidores, revolucionando el comercio de proximidad.",
                                metrics: ["10K+ Usuarios", "#1 Local SEO", "4.8★ Rating"],
                                tech: ["WordPress", "WooCommerce", "PWA"],
                                image: "🏪",
                                gradient: "from-green-500 to-emerald-500"
                            },
                            {
                                title: "Fintech Startup",
                                description: "Aplicación financiera con estándares bancarios de seguridad y experiencia de usuario excepcional.",
                                metrics: ["Bank-level Security", "0.1s Response", "98% Satisfaction"],
                                tech: ["React Native", "Blockchain", "AI"],
                                image: "💳",
                                gradient: "from-purple-500 to-violet-500"
                            }
                        ].map((project, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover-lift animate-on-scroll"
                            >
                                <div className={`h-4 bg-gradient-to-r ${project.gradient}`}></div>
                                <div className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-r ${project.gradient} mr-4`}>
                                            <span className="text-3xl text-white">{project.image}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-8 leading-relaxed">{project.description}</p>

                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {project.metrics.map((metric, idx) => (
                                            <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm font-bold text-gray-800">{metric}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className={`px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-full text-sm font-medium`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sección de Contacto mejorada */}
            <section id="contact" ref={contactRef} className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-6xl font-bold mb-6">
                            Hablemos de tu Proyecto
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Estamos listos para llevar tu negocio al siguiente nivel digital
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Información de contacto mejorada */}
                        <div className="animate-on-scroll">
                            <h3 className="text-4xl font-bold mb-8">¿Listo para crecer?</h3>
                            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                                Nos especializamos en transformar ideas en soluciones digitales exitosas.
                                Desde auditorías técnicas profundas hasta desarrollo completo de plataformas escalables.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { icon: "📧", label: "Email", value: "hola@webauditpro.com", color: "text-blue-400" },
                                    { icon: "📱", label: "Teléfono", value: "+34 900 123 456", color: "text-green-400" },
                                    { icon: "🕒", label: "Horario", value: "Lun-Vie 9:00-18:00", color: "text-yellow-400" },
                                    { icon: "⚡", label: "Respuesta", value: "< 24 horas", color: "text-purple-400" }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-6 p-4 rounded-xl glass-effect hover-lift">
                                        <span className="text-3xl">{item.icon}</span>
                                        <div>
                                            <div className="font-semibold text-lg">{item.label}</div>
                                            <div className={`${item.color} text-lg`}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Estadísticas */}
                            <div className="grid grid-cols-2 gap-6 mt-12">
                                {[
                                    { number: "500+", label: "Proyectos" },
                                    { number: "98%", label: "Satisfacción" },
                                    { number: "5 años", label: "Experiencia" },
                                    { number: "24/7", label: "Soporte" }
                                ].map((stat, idx) => (
                                    <div key={idx} className="text-center p-4 glass-effect rounded-xl">
                                        <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                                        <div className="text-gray-300">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Formulario de contacto mejorado */}
                        <div className="glass-effect p-8 rounded-2xl animate-on-scroll">
                            <form onSubmit={handleContactSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Tu nombre"
                                            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Tu email"
                                            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Asunto"
                                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                                    required
                                />

                                <div className="relative">
                                    <select
                                        name="service"
                                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                                        required
                                    >
                                        <option value="" disabled selected className="text-gray-600">Servicio de interés</option>
                                        <option value="desarrollo" className="text-gray-600">Desarrollo Web</option>
                                        <option value="seo" className="text-gray-600">SEO</option>
                                        <option value="seguridad" className="text-gray-600">Seguridad</option>
                                        <option value="auditoria" className="text-gray-600">Auditoría</option>
                                        <option value="consultoria" className="text-gray-600">Consultoría</option>
                                    </select>
                                </div>

                                <textarea
                                    name="message"
                                    placeholder="Cuéntanos sobre tu proyecto... ¿Qué objetivos quieres alcanzar?"
                                    rows={5}
                                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none transition-all duration-300"
                                    required
                                ></textarea>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Enviando...
                                        </div>
                                    ) : (
                                        'Enviar Mensaje'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de testimonios */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-5xl font-bold mb-6 gradient-text">
                            Lo que dicen nuestros clientes
                        </h2>
                        <p className="text-xl text-gray-600">
                            Testimonios reales de empresas que confiaron en nosotros
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "María González",
                                position: "CEO, Fashion Store",
                                content: "WebAudit Pro transformó completamente nuestro e-commerce. Las ventas se triplicaron en 6 meses.",
                                rating: 5,
                                avatar: "👩‍💼"
                            },
                            {
                                name: "Carlos Ruiz",
                                position: "CTO, TechStartup",
                                content: "Su expertise técnico es excepcional. Crearon una plataforma escalable que soporta millones de usuarios.",
                                rating: 5,
                                avatar: "👨‍💻"
                            },
                            {
                                name: "Ana Martín",
                                position: "Marketing Director",
                                content: "El SEO que implementaron nos llevó al #1 en Google. ROI increíble en tiempo récord.",
                                rating: 5,
                                avatar: "👩‍🚀"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-2xl hover-lift animate-on-scroll">
                                <div className="flex items-center mb-4">
                                    <span className="text-4xl mr-4">{testimonial.avatar}</span>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                                        <p className="text-gray-600 text-sm">{testimonial.position}</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer mejorado */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h3 className="text-3xl font-bold mb-6 gradient-text">WebAudit Pro</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Tu partner estratégico en transformación digital. Desarrollamos, optimizamos y protegemos tu presencia online con soluciones de vanguardia.
                            </p>
                            <div className="flex space-x-4">
                                {['LinkedIn', 'Twitter', 'GitHub', 'Instagram'].map(social => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                                    >
                                        <span className="text-sm">{social[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-xl mb-6">Servicios</h4>
                            <ul className="space-y-3">
                                {['Desarrollo Web', 'SEO & Marketing', 'Seguridad Web', 'Optimización', 'Analytics', 'Consultoría'].map(service => (
                                    <li key={service}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                            {service}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-xl mb-6">Empresa</h4>
                            <ul className="space-y-3">
                                {['Sobre nosotros', 'Casos de éxito', 'Blog', 'Contacto', 'Carreras', 'Prensa'].map(item => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-xl mb-6">Newsletter</h4>
                            <p className="text-gray-400 mb-4">
                                Recibe tips y tendencias de desarrollo web directamente en tu inbox.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors duration-300">
                                    →
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 mb-4 md:mb-0">
                            &copy; 2024 WebAudit Pro. Todos los derechos reservados.
                        </p>
                        <div className="flex space-x-6">
                            {['Privacidad', 'Términos', 'Cookies'].map(link => (
                                <a key={link} href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default WebAudit;