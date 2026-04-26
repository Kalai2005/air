import React, { useEffect, useRef, useState } from 'react';
import { 
  Wind, 
  Droplets, 
  Thermometer, 
  Activity, 
  CloudRain, 
  Cpu, 
  ShieldCheck, 
  Smartphone, 
  Layers, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Mail,
  User,
  MessageSquare,
  Globe,
  Sparkles,
  RefreshCw,
  BrainCircuit,
  Info
} from 'lucide-react';
import { getAIInsights, AIInsight } from './services/aiService';

export default function App() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const mockStats = { aqi: 32, co2: 408, humidity: 64, temp: 24.2 };

  const handleFetchAIInsights = async () => {
    setIsAiLoading(true);
    // Simulate a bit of "thinking" for visual effect
    setTimeout(async () => {
      const insight = await getAIInsights(mockStats);
      setAiInsight(insight);
      setIsAiLoading(false);
    }, 1200);
  };

  useEffect(() => {
    // Initial fetch
    handleFetchAIInsights();

    // Reveal Observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });


    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observerRef.current?.observe(el));

    // Navbar Scroll Handler
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbarRef.current?.classList.add('scrolled');
      } else {
        navbarRef.current?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! Our team will reach out shortly.');
  };

  return (
    <div className="app-wrapper">
      {/* Navigation */}
      <nav className="navbar" ref={navbarRef}>
        <div className="container nav-container">
          <a href="#" className="logo">
            <Wind size={28} />
            <span>AERO</span>GUARD
          </a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#workflow">Workflow</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container hero-content">
          <div className="reveal">
            <span className="section-tag">Next-Gen IoT Solution</span>
            <h1 className="hero-title">Breathing Smarter with Real-Time Intelligence</h1>
            <p className="hero-subtitle">
              Advanced IoT-powered air pollution monitoring for a cleaner, safer, and 
              more sustainable environment. Precision sensors meets cloud-driven analytics.
            </p>
            <div className="hero-actions">
              <a href="#dashboard" className="btn btn-primary">
                View Live Dashboard <ArrowRight style={{ marginLeft: '10px' }} size={18} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="particles-container">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
        <div className="bg-blob-1" style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'var(--primary-glow)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          zIndex: 1,
          animation: 'float 10s ease-in-out infinite'
        }}></div>
        <div className="bg-blob-2" style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '250px',
          height: '250px',
          background: 'var(--secondary-glow)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          zIndex: 1,
          animation: 'float 12s ease-in-out infinite reverse'
        }}></div>
      </header>

      {/* About Section */}
      <section id="about" className="container">
        <div className="section-header reveal">
          <span className="section-tag">Our Mission</span>
          <h2 className="section-title">Protecting Every Breath</h2>
          <p className="hero-subtitle" style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
            AeroGuard provides end-to-end monitoring solutions that bridge the gap 
            between raw environmental data and actionable health insights.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div className="reveal">
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>The Future of Air Sensing</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Traditional air quality stations are bulky and sparsely distributed. AeroGuard 
              democratizes environmental data through a high-fidelity mesh network of 
              low-power IoT nodes, providing street-level accuracy in real-time.
            </p>
            <ul style={{ display: 'grid', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                <ShieldCheck className="text-primary" size={20} /> High-Precision Electrochemical Sensors
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                <CloudRain className="text-primary" size={20} /> Weather-Resistant Industrial Design
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                <Smartphone className="text-primary" size={20} /> Native iOS & Android Integration
              </li>
            </ul>
          </div>
          <div className="reveal" style={{ 
            background: 'var(--bg-alt)', 
            padding: '2rem', 
            borderRadius: '24px', 
            position: 'relative',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2000&auto=format&fit=crop" 
              alt="IoT Sensor Device" 
              style={{ width: '100%', borderRadius: '16px', display: 'block' }}
            />
            <div className="float-element" style={{
              position: 'absolute',
              bottom: '1rem',
              right: '-1rem',
              background: 'white',
              padding: '1rem',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Activity color="var(--primary)" />
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>STATUS</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>SYSTEM ACTIVE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Mockup */}
      <section id="dashboard" className="container reveal">
        <div className="section-header">
          <span className="section-tag">Live Analytics</span>
          <h2 className="section-title">Environmental Command Center</h2>
        </div>
        
        <div className="dashboard-container">
          {/* AI Intelligence Hub */}
          <div className="ai-insight-panel reveal" style={{ marginBottom: '3rem' }}>
            <div className="ai-panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className={`ai-pulse ${isAiLoading ? 'loading' : ''}`}>
                  <BrainCircuit size={20} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Neural Atmospheric Briefing</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Powered by AeroGuard AI Core</p>
                </div>
              </div>
              <button 
                onClick={handleFetchAIInsights} 
                disabled={isAiLoading}
                className="ai-refresh-btn"
                title="Re-analyze Atmosphere"
              >
                <RefreshCw size={16} className={isAiLoading ? 'spin' : ''} />
                {isAiLoading ? 'Relinking...' : 'Recalibrate'}
              </button>
            </div>

            <div className="ai-content-grid">
              <div className="ai-info-card" style={{ gridColumn: 'span 2' }}>
                <div className="ai-card-tag">
                  <Sparkles size={12} />
                  Logical Briefing
                </div>
                <p className="ai-stat-main">{isAiLoading ? 'Analyzing...' : aiInsight?.status}</p>
                <p className="ai-stat-desc" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                  {isAiLoading ? 'Synthesizing multi-modal sensor inputs...' : aiInsight?.briefing}
                </p>
                
                <div className="logic-sequence">
                  <p style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>
                    Reasoning Chain
                  </p>
                  {isAiLoading ? (
                    <div className="skeleton-line" />
                  ) : (
                    <ul className="ai-logic-list">
                      {aiInsight?.logicalDeduction.map((step, idx) => (
                        <li key={idx}>
                          <span className="step-tag">{idx + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="ai-info-card secondary">
                <div className="ai-card-tag">
                  <ShieldCheck size={12} />
                  Safety Protocol
                </div>
                {isAiLoading ? (
                   <p className="ai-stat-desc">Calculating proactive measures...</p>
                ) : (
                  <ul className="ai-protocol-list">
                    {aiInsight?.protectiveMeasures.map((measure, idx) => (
                      <li key={idx}>{measure}</li>
                    ))}
                  </ul>
                )}
                
                <div style={{ marginTop: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    <span>MESH CONFIDENCE</span>
                    <span>{isAiLoading ? '---' : aiInsight?.meshConfidence}%</span>
                  </div>
                  <div className="progress-bar" style={{ background: 'rgba(255,255,255,0.1)', height: '4px' }}>
                    <div className="progress-fill" style={{ width: `${isAiLoading ? 0 : aiInsight?.meshConfidence}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-header" style={{ marginBottom: '2rem' }}>
            <div>
              <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>Downtown Hub #104</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Last updated: 2 minutes ago</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ padding: '0.4rem 0.8rem', background: '#ecfdf5', color: '#059669', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>EXCELLENT</span>
            </div>
          </div>
          
          <div className="dashboard-grid">
            {/* AQI Card */}
            <div className="card">
              <div className="stat-header">
                <span className="stat-label">Air Quality Index (AQI)</span>
                <Wind size={20} color="var(--primary)" />
              </div>
              <div className="stat-value">32 <span className="stat-unit">Low</span></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Healthy air quality for everyone.</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '32%' }}></div>
              </div>
            </div>

            {/* CO2 Card */}
            <div className="card">
              <div className="stat-header">
                <span className="stat-label">CO2 Concentration</span>
                <Activity size={20} color="#f59e0b" />
              </div>
              <div className="stat-value">408 <span className="stat-unit">ppm</span></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Global atmospheric baseline levels.</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '40%', backgroundColor: '#f59e0b' }}></div>
              </div>
            </div>

            {/* Humidity Card */}
            <div className="card">
              <div className="stat-header">
                <span className="stat-label">Humidity</span>
                <Droplets size={20} color="var(--secondary)" />
              </div>
              <div className="stat-value">64 <span className="stat-unit">%</span></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Optimal moisture levels across zone.</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '64%', backgroundColor: 'var(--secondary)' }}></div>
              </div>
            </div>

            {/* Temperature Card */}
            <div className="card">
              <div className="stat-header">
                <span className="stat-label">Temperature</span>
                <Thermometer size={20} color="#ef4444" />
              </div>
              <div className="stat-value">24.2 <span className="stat-unit">°C</span></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Slightly above regional average.</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '70%', backgroundColor: '#ef4444' }}></div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '16px', 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              border: '1px solid var(--border)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <TrendingUp size={24} color="var(--primary)" />
                <div>
                  <p style={{ fontWeight: 700 }}>24h Pollution Trend</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Decreased by 12% compared to yesterday</p>
                </div>
              </div>
              <div style={{ height: '40px', width: '200px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                {[30, 45, 25, 60, 40, 55, 35, 48, 22].map((h, i) => (
                  <div key={i} style={{ 
                    flex: 1, 
                    height: `${h}%`, 
                    backgroundColor: 'var(--primary)', 
                    borderRadius: '2px',
                    opacity: 0.3 + (i * 0.08)
                  }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="workflow" className="container">
        <div className="section-header reveal">
          <span className="section-tag">Integration</span>
          <h2 className="section-title">The IoT Ecosystem</h2>
        </div>
        
        <div className="workflow-grid">
          <div className="step reveal">
            <div className="step-number">1</div>
            <div className="step-icon">
              <Cpu size={40} />
            </div>
            <h3>Smart Sensing</h3>
            <p>Proprietary sensor nodes collect high-fidelity data on 12 distinct pollutants.</p>
          </div>
          
          <div className="step reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="step-number">2</div>
            <div className="step-icon">
              <Globe size={40} />
            </div>
            <h3>Edge Edge Sync</h3>
            <p>Data is encrypted and transmitted via LoRaWAN or 5G to our regional gateways.</p>
          </div>
          
          <div className="step reveal" style={{ transitionDelay: '0.4s' }}>
            <div className="step-number">3</div>
            <div className="step-icon">
              <Layers size={40} />
            </div>
            <h3>Cloud Analytics</h3>
            <p>AI models process data, filtering noise and predicting pollution migration patterns.</p>
          </div>
          
          <div className="step reveal" style={{ transitionDelay: '0.6s' }}>
            <div className="step-number">4</div>
            <div className="step-icon">
              <Smartphone size={40} />
            </div>
            <h3>Actionable Output</h3>
            <p>Users receive real-time alerts and detailed reports through custom dashboards.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Core Capabilities</span>
            <h2 className="section-title">Everything You Need</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card reveal">
              <div className="feature-icon">
                <Wind size={28} />
              </div>
              <h3>Real-Time Tracking</h3>
              <p>Millisecond latency between sensing and visualization. Never miss an atmospheric event.</p>
            </div>
            
            <div className="feature-card reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="feature-icon">
                <ShieldCheck size={28} />
              </div>
              <h3>Intelligent Alerts</h3>
              <p>Customizable thresholds. Get notified via SMS, Email, or Webhook when air quality drops.</p>
            </div>
            
            <div className="feature-card reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="feature-icon">
                <Activity size={28} />
              </div>
              <h3>Advanced Analytics</h3>
              <p>Historical trends, heatmaps, and predictive modelling powered by our neural networks.</p>
            </div>
            
            <div className="feature-card reveal" style={{ transitionDelay: '0.3s' }}>
              <div className="feature-icon">
                <Layers size={28} />
              </div>
              <h3>Easy API Integration</h3>
              <p>Developer-first REST and GraphQL APIs to pipe data directly into your existing infrastructure.</p>
            </div>

            <div className="feature-card reveal" style={{ transitionDelay: '0.4s' }}>
              <div className="feature-icon">
                <Globe size={28} />
              </div>
              <h3>Global Mesh Network</h3>
              <p>Seamlessly connect nodes across cities with our low-power wide-area network protocols.</p>
            </div>

            <div className="feature-card reveal" style={{ transitionDelay: '0.5s' }}>
              <div className="feature-icon">
                <Smartphone size={28} />
              </div>
              <h3>Remote Node Mgmt</h3>
              <p>Configure, update, and diagnose sensors from anywhere in the world without physical access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container">
        <div className="contact-container reveal">
          <div>
            <span className="section-tag">Get In Touch</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Start Monitoring Today</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
              Have questions about deploying AeroGuard in your city or industrial facility? Our experts are ready to help.
            </p>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                  <Mail size={18} color="var(--primary)" />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Email Us</p>
                  <p style={{ fontWeight: 600 }}>contact@aeroguard.io</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                  <MapPin size={18} color="var(--primary)" />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Visit Us</p>
                  <p style={{ fontWeight: 600 }}>Silicon Valley, California</p>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: 'var(--shadow)' }}>
            <div className="form-group">
              <label>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" className="form-control" placeholder="John Doe" style={{ paddingLeft: '3rem' }} />
              </div>
            </div>
            
            <div className="form-group">
              <label>Work Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="email" className="form-control" placeholder="john@company.com" style={{ paddingLeft: '3rem' }} />
              </div>
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <div style={{ position: 'relative' }}>
                <MessageSquare size={18} style={{ position: 'absolute', left: '1rem', top: '1.25rem', color: 'var(--text-muted)' }} />
                <textarea className="form-control" rows={4} placeholder="How can we help?" style={{ paddingLeft: '3rem' }}></textarea>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Send Invitation <ArrowRight size={18} style={{ marginLeft: '10px' }} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <a href="#" className="logo" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
            <Wind size={28} />
            <span>AERO</span>GUARD
          </a>
          <p style={{ marginBottom: '2rem' }}>
            Transforming environmental noise into operational clarity. <br />
            © {new Date().getFullYear()} AeroGuard IoT Monitoring Systems. All rights reserved.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <a href="#" style={{ fontSize: '0.85rem' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '0.85rem' }}>Terms of Service</a>
            <a href="#" style={{ fontSize: '0.85rem' }}>API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
