import { Button } from "@/components/ui/button";
import { QrCode, Users, Utensils, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-food.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-food-dark/90 via-food-dark/70 to-food-dark/50" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up">
            Dine Smart, Pay Fair
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 animate-slide-up [animation-delay:200ms]">
            Scan. Order. Split the bill your way. No waiter needed!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up [animation-delay:400ms]">
            <Button asChild size="lg" variant="hero" className="text-lg">
              <Link to="/menu">View Menu</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Why Choose FairFeast?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-[var(--shadow-md)] transition-all duration-300 animate-scale-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Quick QR Scan</h3>
              <p className="text-muted-foreground">
                Scan the QR code at your table and instantly access the menu on your phone
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-[var(--shadow-md)] transition-all duration-300 animate-scale-in [animation-delay:100ms]">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <Utensils className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Browse & Order</h3>
              <p className="text-muted-foreground">
                Explore veg and non-veg options with photos, descriptions, and prices
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-[var(--shadow-md)] transition-all duration-300 animate-scale-in [animation-delay:200ms]">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Group Orders</h3>
              <p className="text-muted-foreground">
                Everyone can add items to the same order from their own devices
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-[var(--shadow-md)] transition-all duration-300 animate-scale-in [animation-delay:300ms]">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Smart Split Bill</h3>
              <p className="text-muted-foreground">
                Split equally, by items, or by veg/non-veg preference automatically
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Smart Dining?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Join the revolution in restaurant dining today
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link to="/menu">Start Ordering Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
