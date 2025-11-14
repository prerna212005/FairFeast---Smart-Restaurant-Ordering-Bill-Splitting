import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Users, ShoppingBag, Leaf, DollarSign } from "lucide-react";
import { toast } from "sonner";
import type { CartItem } from "@/components/Cart";

interface PersonItem {
  personName: string;
  items: CartItem[];
  total: number;
}

const BillSplit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = (location.state?.cartItems as CartItem[]) || [];

  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [personNames, setPersonNames] = useState<string[]>(["Person 1", "Person 2"]);
  const [itemAssignments, setItemAssignments] = useState<{ [itemId: string]: number[] }>({});

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error("No items in cart");
      navigate("/menu");
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    const newNames = Array.from({ length: numberOfPeople }, (_, i) => 
      personNames[i] || `Person ${i + 1}`
    );
    setPersonNames(newNames);
  }, [numberOfPeople]);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vegTotal = cartItems
    .filter(item => item.category === "veg")
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  const nonvegTotal = cartItems
    .filter(item => item.category === "nonveg")
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Equal Split
  const equalSplitAmount = totalAmount / numberOfPeople;

  // By Items Split
  const getItemSplit = (): PersonItem[] => {
    return personNames.map((name, index) => {
      const assignedItems = cartItems.filter(item => 
        itemAssignments[item.id]?.includes(index)
      );
      const total = assignedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { personName: name, items: assignedItems, total };
    });
  };

  const toggleItemAssignment = (itemId: string, personIndex: number) => {
    setItemAssignments(prev => {
      const current = prev[itemId] || [];
      const newAssignment = current.includes(personIndex)
        ? current.filter(i => i !== personIndex)
        : [...current, personIndex];
      return { ...prev, [itemId]: newAssignment };
    });
  };

  // Veg/Non-Veg Split
  const getVegNonVegSplit = () => {
    const vegPeople = personNames.filter((_, i) => i < Math.ceil(numberOfPeople / 2));
    const nonvegPeople = personNames.filter((_, i) => i >= Math.ceil(numberOfPeople / 2));
    
    return {
      veg: {
        people: vegPeople,
        total: vegTotal,
        perPerson: vegTotal / vegPeople.length || 0
      },
      nonveg: {
        people: nonvegPeople,
        total: nonvegTotal,
        perPerson: nonvegTotal / nonvegPeople.length || 0
      }
    };
  };

  const handlePayment = (splitType: string) => {
    toast.success(`Proceeding to payment with ${splitType} split...`);
    // Future: Navigate to payment page
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={0} onCartClick={() => {}} />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/menu")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>

          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Split Your Bill
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose how you want to divide the payment
            </p>
          </div>

          {/* Order Summary */}
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                      <Badge variant="outline" className={
                        item.category === "veg" 
                          ? "border-secondary text-secondary"
                          : "border-destructive text-destructive"
                      }>
                        {item.category === "veg" ? <Leaf className="h-3 w-3 mr-1" /> : null}
                        {item.category === "veg" ? "Veg" : "Non-Veg"}
                      </Badge>
                      <span className="text-muted-foreground">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Number of People */}
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Group Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Label htmlFor="people">Number of People:</Label>
                <Input
                  id="people"
                  type="number"
                  min="1"
                  max="20"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {personNames.map((name, index) => (
                  <Input
                    key={index}
                    value={name}
                    onChange={(e) => {
                      const newNames = [...personNames];
                      newNames[index] = e.target.value;
                      setPersonNames(newNames);
                    }}
                    placeholder={`Person ${index + 1}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Split Methods */}
          <Tabs defaultValue="equal" className="animate-fade-in">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="equal">Equal Split</TabsTrigger>
              <TabsTrigger value="items">By Items</TabsTrigger>
              <TabsTrigger value="category">Veg/Non-Veg</TabsTrigger>
            </TabsList>

            {/* Equal Split */}
            <TabsContent value="equal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Split Equally</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Each person pays an equal share of the total bill
                    </p>
                    <Separator />
                    {personNames.map((name, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <span className="font-medium">{name}</span>
                        <span className="text-lg font-bold text-primary">
                          ₹{equalSplitAmount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => handlePayment("Equal")}
                    >
                      <DollarSign className="mr-2 h-5 w-5" />
                      Proceed to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* By Items Split */}
            <TabsContent value="items" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Split by Individual Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Assign items to each person (click to toggle)
                  </p>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                          </div>
                          <span className="font-bold">₹{item.price * item.quantity}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {personNames.map((name, index) => (
                            <Button
                              key={index}
                              variant={itemAssignments[item.id]?.includes(index) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleItemAssignment(item.id, index)}
                            >
                              {name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg mb-3">Individual Totals:</h3>
                      {getItemSplit().map((person, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <span className="font-medium">{person.personName}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({person.items.length} items)
                            </span>
                          </div>
                          <span className="text-lg font-bold text-primary">
                            ₹{person.total}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => handlePayment("By Items")}
                    >
                      <DollarSign className="mr-2 h-5 w-5" />
                      Proceed to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Veg/Non-Veg Split */}
            <TabsContent value="category" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Split by Veg/Non-Veg</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    First half of people pay for veg items, second half for non-veg items
                  </p>
                  <div className="space-y-6">
                    {/* Veg Group */}
                    <div className="border border-secondary/30 rounded-lg p-4 bg-secondary/5">
                      <div className="flex items-center gap-2 mb-3">
                        <Leaf className="h-5 w-5 text-secondary" />
                        <h3 className="font-semibold text-lg">Vegetarian Group</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Members: {getVegNonVegSplit().veg.people.join(", ")}</span>
                          <span>Total: ₹{vegTotal}</span>
                        </div>
                        {getVegNonVegSplit().veg.people.map((name) => (
                          <div key={name} className="flex justify-between items-center py-2">
                            <span className="font-medium">{name}</span>
                            <span className="text-lg font-bold text-secondary">
                              ₹{getVegNonVegSplit().veg.perPerson.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Non-Veg Group */}
                    <div className="border border-destructive/30 rounded-lg p-4 bg-destructive/5">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="font-semibold text-lg">Non-Vegetarian Group</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Members: {getVegNonVegSplit().nonveg.people.join(", ")}</span>
                          <span>Total: ₹{nonvegTotal}</span>
                        </div>
                        {getVegNonVegSplit().nonveg.people.map((name) => (
                          <div key={name} className="flex justify-between items-center py-2">
                            <span className="font-medium">{name}</span>
                            <span className="text-lg font-bold text-destructive">
                              ₹{getVegNonVegSplit().nonveg.perPerson.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => handlePayment("Veg/Non-Veg")}
                    >
                      <DollarSign className="mr-2 h-5 w-5" />
                      Proceed to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BillSplit;
