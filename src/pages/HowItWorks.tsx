import Navbar from "@/components/Navbar";
import { QrCode, ShoppingCart, Users, Calculator } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: QrCode,
      title: "Scan QR Code",
      description:
        "Find the QR code on your table and scan it with your phone's camera. You'll instantly access our digital menu without downloading any app.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: ShoppingCart,
      title: "Browse & Order",
      description:
        "Explore our menu with beautiful photos and detailed descriptions. Filter by veg or non-veg, add items to your cart, and customize your order.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Users,
      title: "Group Ordering",
      description:
        "Everyone in your group can scan the same QR code and add items to the shared order. No need to coordinate manually - it all syncs automatically!",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Calculator,
      title: "Smart Bill Split",
      description:
        "When it's time to pay, choose how to split the bill: equally among all members, by individual items each person ordered, or by veg/non-veg preference.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience a seamless dining journey from ordering to payment in just four simple steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start gap-6 p-8 bg-card rounded-lg border border-border hover:shadow-[var(--shadow-md)] transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`flex-shrink-0 w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-primary">0{index + 1}</span>
                    <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-primary/5 rounded-lg border border-primary/20 text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-4">Bill Split Options</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-2 text-foreground">Equal Split</h3>
                <p className="text-sm text-muted-foreground">
                  Divide the total amount equally among all group members
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-2 text-foreground">By Items</h3>
                <p className="text-sm text-muted-foreground">
                  Each person pays only for what they ordered
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-2 text-foreground">Veg/Non-Veg</h3>
                <p className="text-sm text-muted-foreground">
                  Split based on dietary preferences automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
