import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Smartphone, 
  BarChart3, 
  FileText, 
  Users, 
  TrendingUp, 
  Palette,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
  ChevronDown,
  Target,
  Zap,
  Shield,
  Layers,
  Globe,
  CreditCard
} from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import logoImg from "@assets/file_00000000731c7207a92bed4299b440fb_1764680794736.png";
import streetFoodImg from "@assets/IMG-20251125-WA0005_1764033940096.jpg";
import dashboardImg from "@assets/IMG-20251125-WA0001_1764033940133.jpg";
import teamImg from "@assets/IMG-20251125-WA0003_1764033940115.jpg";
import hollandLogo from "@assets/c0db033d-0dad-47b2-8a08-6d203356e20a_brand-logo_1589291484200_1764316807917.jpg";
import pukisLogo from "@assets/images_1764316799272.jpeg";
import contactImg from "@assets/IMG-20251128-WA0005_1764559092155.jpg";

export default function Home() {
  const { toast } = useToast();
  
  const aboutAnimation = useScrollAnimation();
  const servicesAnimation = useScrollAnimation();
  const missionAnimation = useScrollAnimation();
  const focusAnimation = useScrollAnimation();
  const testimonialsAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Scroll-based cart orbit animation
  const [cartRotation, setCartRotation] = useState(0);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      // Update rotation based on scroll direction and amount
      // Scroll down = clockwise (positive), Scroll up = counter-clockwise (negative)
      setCartRotation(prev => prev + scrollDelta * 0.5);
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      business: "Nasi Goreng Pak Budi - Jakarta",
      quote: "AKSELERASA's system transformed my street food cart into a thriving business. From one cart, I now manage 5 outlets with complete transparency.",
      results: "5x revenue growth in 12 months"
    },
    {
      id: 2,
      name: "Siti Rahayu",
      business: "Warung Soto Ayam - Bandung",
      quote: "The real-time dashboard helps me track all locations instantly. I can make decisions faster and spot problems before they become losses.",
      results: "Reduced food waste by 40%"
    },
    {
      id: 3,
      name: "Ahmad Hidayat",
      business: "Bakso Mas Ahmad - Surabaya",
      quote: "Starting as a single pushcart vendor, AKSELERASA's franchise system helped me scale to 10 branches across Java. The automated tracking is a game changer.",
      results: "10 outlets in 18 months"
    },
    {
      id: 4,
      name: "Dewi Lestari",
      business: "Es Teler 77 Franchise - Jakarta",
      quote: "Their complete business system covers everything from menu standardization to staff training. We maintain quality across all locations effortlessly.",
      results: "Consistent 4.8★ rating across all branches"
    }
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <img 
                src={logoImg} 
                alt="AKSELERASA Logo" 
                className="h-12 w-12 object-contain"
                data-testid="img-logo"
              />
              <span className="text-xl font-bold text-foreground" style={{ fontFamily: "'Cinzel', serif" }} data-testid="text-brand-name">AKSELERASA</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-services"
              >
                Our Services
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-testimonials"
              >
                Success Stories
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-contact"
              >
                Contact
              </button>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${streetFoodImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" data-testid="text-hero-title">
            Leading the Future of Street Food with Smart Systems
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12" data-testid="text-hero-subtitle">
            Your Journey From Customer to Owner Starts Here
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
              onClick={() => scrollToSection('contact')}
              data-testid="button-join-now"
            >
              Join Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
              onClick={() => scrollToSection('services')}
              data-testid="button-view-menu"
            >
              View Our Services
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
          <p className="text-white/70 text-sm mt-2">scroll</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div 
          ref={aboutAnimation.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${aboutAnimation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-about-title">
                Company Overview
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-p1">
                AKSELERASA is a digital system & operational technology company dedicated to helping businesses — especially street food and F&B outlets — optimize their operations through automated transaction tracking, performance monitoring, and scalable franchise development.
              </p>
              <p className="text-lg text-muted-foreground" data-testid="text-about-p2">
                We combine application technology, data-driven decision making, and real operational field experience to help businesses grow faster, operate more efficiently, and replicate outlets without losing quality.
              </p>
            </div>
            <div className="relative">
              <img 
                src={teamImg} 
                alt="AKSELERASA Team" 
                className="rounded-md shadow-lg w-full"
                data-testid="img-about"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="services" className="py-20 bg-card">
        <div 
          ref={servicesAnimation.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${servicesAnimation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-services-title">
              What We Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering street food businesses with technology and systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate" data-testid="card-offer-umkm">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">UMKM Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We equip street food entrepreneurs with accessible tools and field mentoring so they can modernize without losing their local character.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-offer-pos">
              <CardHeader>
                <CreditCard className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Personalized POS System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We deploy modular POS flows tailored to each menu, staffing model, and growth pace so transactions stay effortless.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-offer-operational">
              <CardHeader>
                <FileText className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Operational</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We standardize SOPs, training, and supply routines, ensuring every outlet can replicate quality from day one.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-offer-data">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Data Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We transform daily transactions into dashboards and proactive alerts that guide smarter purchasing and expansion decisions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trusted By Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-semibold text-center text-foreground mb-8" data-testid="text-our-clients">
              Our Clients
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover-elevate overflow-hidden" data-testid="card-portfolio-holland">
                <div className="aspect-video bg-white flex items-center justify-center p-8">
                  <img 
                    src={hollandLogo} 
                    alt="Holland Mini Café Logo" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Holland Mini Café</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A business concept that combines modern ambiance with authentic traditional Indonesian flavors. Featuring signature dishes like sweet martabak (terangbulan) and savory egg martabak, along with a variety of Indonesian coffee drinks, Holland Mini Café is the ultimate destination for food lovers seeking quality dishes in a comfortable atmosphere.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate overflow-hidden" data-testid="card-portfolio-pukis">
                <div className="aspect-video bg-[#F5A623] flex items-center justify-center p-8">
                  <img 
                    src={pukisLogo} 
                    alt="Pukis Kota Baru Logo" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Pukis Kota Baru</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A beloved traditional Indonesian snack, pioneering jumbo-sized pukis with a wide variety of delicious flavor options that delight every palate.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Case Studies Section */}
      <section id="testimonials" className="py-20 bg-background">
        <div 
          ref={testimonialsAnimation.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${testimonialsAnimation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from street food entrepreneurs who transformed their businesses with AKSELERASA
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                    data-testid={`testimonial-${testimonial.id}`}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <Quote className="w-10 h-10 text-primary mb-4" />
                        <CardDescription className="text-base italic text-foreground">
                          "{testimonial.quote}"
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-md">
                          <p className="text-sm font-medium text-primary">{testimonial.results}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button 
                variant="outline" 
                size="icon"
                onClick={scrollPrev}
                data-testid="button-carousel-prev"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={scrollNext}
                data-testid="button-carousel-next"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Combined Ready to Get Started + Get in Touch */}
      <section id="contact" className="py-20 bg-card">
        <div 
          ref={contactAnimation.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${contactAnimation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-contact-title">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-subtitle">
              Connect with us for a quick consultation. We'll respond within minutes and help you transform your street food business.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => window.open('https://wa.me/6285691070999', '_blank')}
                  data-testid="button-whatsapp"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat via WhatsApp
                </Button>
                <p className="text-muted-foreground mt-4">
                  Fast response • Professional consultation • Customized solutions
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3" data-testid="contact-phone">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Phone / WhatsApp</h3>
                    <p className="text-muted-foreground text-sm">+62 856-9107-0999</p>
                  </div>
                </div>

                <div className="flex items-start gap-3" data-testid="contact-email">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm">info@akselerasa.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <img 
                  src={contactImg} 
                  alt="Business Partnership" 
                  className="rounded-md shadow-lg w-full"
                  data-testid="img-contact"
                />
              </div>

              <div className="bg-background p-6 rounded-md">
                <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
                <div className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    data-testid="input-newsletter-email"
                  />
                  <Button data-testid="button-subscribe">Subscribe</Button>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      data-testid="input-name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      rows={4}
                      required
                      data-testid="input-message"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    data-testid="button-submit"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logoImg} alt="AKSELERASA Logo" className="h-10 w-10 object-contain" />
                <span className="text-xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>AKSELERASA</span>
              </div>
              <p className="text-muted-foreground text-sm">
                PT Inovasi Jaya Akselera
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Leading the Future of Street Food with Smart Systems
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-muted-foreground hover:text-primary transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="block text-muted-foreground hover:text-primary transition-colors">
                  About
                </button>
                <button onClick={() => scrollToSection('services')} className="block text-muted-foreground hover:text-primary transition-colors">
                  Services
                </button>
                <button onClick={() => scrollToSection('contact')} className="block text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Chat With Us</h3>
              <Button 
                size="lg" 
                className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
                onClick={() => window.open('https://wa.me/6285691070999', '_blank')}
                data-testid="button-footer-whatsapp"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat via WhatsApp
              </Button>
              <p className="text-muted-foreground text-sm text-center mt-4">
                Fast response • Professional consultation • Customized solutions
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 PT Inovasi Jaya Akselera. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button with Scroll-Based Rotating Dashed Border */}
      <div className="whatsapp-float-container" data-testid="whatsapp-float-container">
        <div 
          ref={cartRef}
          className="rotating-dashed-border"
          style={{
            transform: `rotate(${cartRotation}deg)`
          }}
        >
          <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
            <circle 
              cx="45" 
              cy="45" 
              r="33" 
              fill="none" 
              stroke="#B86730" 
              strokeWidth="2" 
              strokeDasharray="6 5"
              strokeLinecap="round"
            />
            <circle 
              cx="45" 
              cy="45" 
              r="41" 
              fill="none" 
              stroke="#B86730" 
              strokeWidth="2" 
              strokeDasharray="6 5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <button
          onClick={() => window.open('https://wa.me/6285691070999', '_blank')}
          className="whatsapp-button"
          data-testid="button-floating-whatsapp"
          aria-label="Chat via WhatsApp"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
