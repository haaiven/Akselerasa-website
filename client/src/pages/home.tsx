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
import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ThemeToggle } from "@/components/theme-toggle";
import logoImg from "@assets/file_00000000731c7207a92bed4299b440fb_1764680794736.png";
import heroImg from "@assets/premium_photo-1675731938670-20639b4a60ae_1764730076819.jpeg";
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
  const contactAnimation = useScrollAnimation();

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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImg})`,
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
                About AKSELERASA
              </h2>
              <p className="text-lg text-muted-foreground mb-6 text-justify" data-testid="text-about-p1">
                AKSELERASA is a digital systems and operational technology company dedicated to helping MSMEs — especially street food vendors and F&B outlets — grow more efficiently, modernize their operations, and expand sustainably.
              </p>
              <p className="text-lg text-muted-foreground mb-6 text-justify" data-testid="text-about-p2">
                Beyond technology, we support business owners in opening new outlets in strategic locations with high market potential. We optimize operations through automated transaction tracking, performance monitoring, and scalable franchise systems.
              </p>
              <p className="text-lg text-muted-foreground text-justify" data-testid="text-about-p3">
                By combining application technology, data-driven decision-making, and real on-ground operational experience, we help businesses grow faster, expand confidently, and maintain consistent quality across all locations.
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
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Empowering Street Food & Small Businesses to Scale Smarter
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate" data-testid="card-offer-umkm">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">UMKM Empowerment</CardTitle>
                <CardDescription>Helping Small Food Businesses Grow and Expand Strategically</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-justify">
                  We support street food entrepreneurs in expanding their outlets to strategic, high-potential locations. Our team equips business owners with easy-to-use tools, practical systems, and hands-on field mentoring — enabling them to modernize their operations without losing their unique local character and culinary identity.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-offer-pos">
              <CardHeader>
                <CreditCard className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Personalized POS System</CardTitle>
                <CardDescription>A Complete, Flexible, and Intuitive POS Solution</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-justify">
                  Our POS system is stable, easy to use, and works even without an internet connection. It adapts to your menu, pricing, and workflow, delivering fast transaction processing that keeps your business running smoothly.
                </p>
                <p className="text-muted-foreground mb-2 text-justify">Each business owner gains access to a real-time dashboard featuring:</p>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li>Daily, monthly, and yearly sales</li>
                  <li>Comprehensive revenue reports</li>
                  <li>Performance insights for each outlet</li>
                  <li>All in one place, accessible anytime, anywhere</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-offer-operational">
              <CardHeader>
                <FileText className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Operational</CardTitle>
                <CardDescription>Standardized Operations for Seamless Replication</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-justify">
                  We standardize SOPs, staff training, and supply routines to ensure every outlet maintains consistent quality from day one. With structured processes in place, operations become more efficient and easier to manage.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-offer-data">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Data Driven</CardTitle>
                <CardDescription>Smarter Decision-Making Through Clear, Actionable Data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2 text-justify">
                  We turn daily transactions into visual dashboards and automated alerts that help owners monitor:
                </p>
                <ul className="text-muted-foreground list-disc list-inside space-y-1 mb-4">
                  <li>Sales</li>
                  <li>Expenses</li>
                  <li>Performance trends</li>
                  <li>Growth charts</li>
                </ul>
                <p className="text-muted-foreground text-justify">
                  With accurate data at your fingertips, you can make faster, more informed decisions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trusted By Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-semibold text-center text-foreground mb-2" data-testid="text-our-clients">
              Our Clients
            </h3>
            <p className="text-center text-muted-foreground mb-8">Trusted by Local Food Brands</p>
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
                  <CardTitle className="text-2xl">Martabak Holland Terang Bulan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-justify">
                    A true Surabaya legend since 1987, Martabak Holland Terang Bulan is renowned for its rich flavors and uncompromising quality. Crafted with premium ingredients and perfected over decades, their martabak has become a beloved local tradition—bringing indulgence and authenticity to every bite.
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
                  <p className="text-muted-foreground text-justify">
                    A beloved traditional Indonesian snack brand known for pioneering jumbo-sized pukis with a wide range of delicious flavors for every palate.
                  </p>
                </CardContent>
              </Card>
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
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <circle 
              cx="40" 
              cy="40" 
              r="36" 
              fill="none" 
              stroke="#B86730" 
              strokeWidth="2" 
              strokeDasharray="12 8 4 8"
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
