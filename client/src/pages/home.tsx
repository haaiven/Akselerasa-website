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
  Globe
} from "lucide-react";
import { useState } from "react";
import logoImg from "@assets/IMG-20251125-WA0007_1764034087379.jpg";
import streetFoodImg from "@assets/IMG-20251125-WA0005_1764033940096.jpg";
import dashboardImg from "@assets/IMG-20251125-WA0001_1764033940133.jpg";
import teamImg from "@assets/IMG-20251125-WA0003_1764033940115.jpg";

export default function Home() {
  const { toast } = useToast();
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
                alt="PT IJA Logo" 
                className="h-12 w-12 object-contain"
                data-testid="img-logo"
              />
              <span className="text-xl font-bold text-foreground" data-testid="text-brand-name">PT IJA</span>
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
                onClick={() => scrollToSection('locations')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-locations"
              >
                Locations
              </button>
              <button 
                onClick={() => scrollToSection('order')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-order"
              >
                Order
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-contact"
              >
                Contact
              </button>
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
              onClick={() => scrollToSection('order')}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-about-title">
                Company Overview
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-p1">
                PT IJA is a digital system & operational technology company dedicated to helping businesses — especially street food and F&B outlets — optimize their operations through automated transaction tracking, performance monitoring, and scalable franchise development.
              </p>
              <p className="text-lg text-muted-foreground" data-testid="text-about-p2">
                We combine application technology, data-driven decision making, and real operational field experience to help businesses grow faster, operate more efficiently, and replicate outlets without losing quality.
              </p>
            </div>
            <div className="relative">
              <img 
                src={teamImg} 
                alt="PT IJA Team" 
                className="rounded-md shadow-lg w-full"
                data-testid="img-about"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="services" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-services-title">
              What We Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for modern street food businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-elevate" data-testid="card-service-tracking">
              <CardHeader>
                <Smartphone className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Outlet Transaction Tracking App</CardTitle>
                <CardDescription>
                  Daily revenue, COGS, stock & automated reporting
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate" data-testid="card-service-monitoring">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Real-Time Monitoring Dashboard</CardTitle>
                <CardDescription>
                  Owners can track outlet performance from anywhere
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate" data-testid="card-service-sop">
              <CardHeader>
                <FileText className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Operational SOP System</CardTitle>
                <CardDescription>
                  Standardized workflow for easy outlet replication
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate" data-testid="card-service-franchise">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Franchise Development System</CardTitle>
                <CardDescription>
                  Business model, partner structure, & monitoring tools
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate" data-testid="card-service-analytics">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Data Analytics & Decision Tools</CardTitle>
                <CardDescription>
                  Convert daily operations into actionable insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate" data-testid="card-service-brand">
              <CardHeader>
                <Palette className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Brand & Identity Support</CardTitle>
                <CardDescription>
                  Naming, logo, design, and digital presence setup
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-mission-title">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering street food businesses with technology and systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover-elevate" data-testid="card-mission-1">
              <CardHeader>
                <Target className="w-10 h-10 text-primary mb-3" />
                <CardTitle className="text-xl">Field-Friendly Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Build easy-to-use and field-friendly technology solutions for real business operations
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-mission-2">
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-3" />
                <CardTitle className="text-xl">Real-Time Dashboards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Provide real-time transaction & outlet performance dashboards for faster decision making
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-mission-3">
              <CardHeader>
                <Layers className="w-10 h-10 text-primary mb-3" />
                <CardTitle className="text-xl">Scalable Franchise Model</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Develop a scalable street food franchise model — from one outlet to a hundred
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-mission-4">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-3" />
                <CardTitle className="text-xl">UMKM Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Empower UMKM with data, systems, and modern workflows for sustainable growth
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-mission-5">
              <CardHeader>
                <Globe className="w-10 h-10 text-primary mb-3" />
                <CardTitle className="text-xl">Technology for All</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bridge technology with offline business needs — ensuring technology benefits everyone, not only big corporations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Focus Section */}
      <section id="focus" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-focus-title">
              Our Market Focus
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What makes us different
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center" data-testid="focus-item-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real Field Experience</h3>
              <p className="text-muted-foreground">
                Built from real field experience, not only digital theory
              </p>
            </div>

            <div className="text-center" data-testid="focus-item-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">UMKM Specific</h3>
              <p className="text-muted-foreground">
                Designed specifically for street food & UMKM, not generic systems
              </p>
            </div>

            <div className="text-center" data-testid="focus-item-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Layers className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Operational Feasibility</h3>
              <p className="text-muted-foreground">
                Focused on operational feasibility + scalable expansion
              </p>
            </div>

            <div className="text-center" data-testid="focus-item-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">All-in-One System</h3>
              <p className="text-muted-foreground">
                One system for all outlets — transactions, stock, reports, and training
              </p>
            </div>

            <div className="text-center" data-testid="focus-item-5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Infinitely Scalable</h3>
              <p className="text-muted-foreground">
                Scalable from one cart to hundreds of branches
              </p>
            </div>

            <div className="text-center" data-testid="focus-item-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Business Systems</h3>
              <p className="text-muted-foreground">
                We don't just build apps — we build business systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-locations-title">
              Find Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visit our offices and partner outlets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card data-testid="card-location-1">
              <CardHeader>
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Jakarta Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Jl. Sudirman No. 123</p>
                <p className="text-muted-foreground">Jakarta Selatan, 12190</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri: 9AM - 6PM</span>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-location-2">
              <CardHeader>
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Bandung Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Jl. Asia Afrika No. 45</p>
                <p className="text-muted-foreground">Bandung, 40261</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri: 9AM - 6PM</span>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-location-3">
              <CardHeader>
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Surabaya Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Jl. Tunjungan No. 78</p>
                <p className="text-muted-foreground">Surabaya, 60275</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri: 9AM - 6PM</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted rounded-md p-8 text-center">
            <p className="text-muted-foreground mb-2">Map integration placeholder</p>
            <p className="text-sm text-muted-foreground">Interactive map will be added here</p>
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-order-title">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-12" data-testid="text-order-subtitle">
            Connect with us via WhatsApp for a quick consultation. We'll respond within minutes and help you transform your street food business.
          </p>
          
          <div className="space-y-6">
            <Button 
              size="lg" 
              className="text-lg px-12 py-6 bg-primary hover:bg-primary/90"
              onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
              data-testid="button-whatsapp"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Order via WhatsApp
            </Button>
            
            <div className="max-w-2xl mx-auto">
              <img 
                src={dashboardImg} 
                alt="PT IJA Dashboard" 
                className="rounded-md shadow-lg w-full"
                data-testid="img-dashboard"
              />
            </div>
            
            <p className="text-muted-foreground">
              Fast response • Professional consultation • Customized solutions
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Newsletter Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-contact-title">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4" data-testid="contact-phone">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone / WhatsApp</h3>
                    <p className="text-muted-foreground">+62 812-3456-7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="contact-email">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@ptija.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="contact-instagram">
                  <Instagram className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Instagram</h3>
                    <p className="text-muted-foreground">@ptija.official</p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-md">
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
                <img src={logoImg} alt="PT IJA Logo" className="h-10 w-10 object-contain" />
                <span className="text-xl font-bold">PT IJA</span>
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
              <h3 className="font-semibold mb-4">Address</h3>
              <p className="text-muted-foreground text-sm">
                Jl. Sudirman No. 123<br />
                Jakarta Selatan, 12190<br />
                Indonesia
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

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
        className="fixed bottom-8 right-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg hover-elevate z-50"
        data-testid="button-floating-whatsapp"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
