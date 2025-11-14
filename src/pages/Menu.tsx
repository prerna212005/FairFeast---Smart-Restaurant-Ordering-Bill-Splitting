import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MenuItem, { MenuItemData } from "@/components/MenuItem";
import Cart, { CartItem } from "@/components/Cart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import vegMealImage from "@/assets/veg-meal.jpg";
import nonvegMealImage from "@/assets/nonveg-meal.jpg";

// Sample menu data
const menuItems: MenuItemData[] = [
  {
    id: "1",
    name: "Paneer Butter Masala",
    description: "Creamy tomato curry with soft paneer cubes and aromatic spices",
    price: 280,
    image: vegMealImage,
    category: "veg",
  },
  {
    id: "2",
    name: "Veg Biryani",
    description: "Fragrant basmati rice with mixed vegetables and traditional spices",
    price: 250,
    image: vegMealImage,
    category: "veg",
  },
  {
    id: "3",
    name: "Dal Makhani",
    description: "Rich and creamy black lentils slow-cooked to perfection",
    price: 220,
    image: vegMealImage,
    category: "veg",
  },
  {
    id: "4",
    name: "Mushroom Masala",
    description: "Button mushrooms in a spicy onion-tomato gravy",
    price: 240,
    image: vegMealImage,
    category: "veg",
  },
  {
    id: "5",
    name: "Chicken Tikka Masala",
    description: "Grilled chicken pieces in a rich, creamy tomato-based curry",
    price: 380,
    image: nonvegMealImage,
    category: "nonveg",
  },
  {
    id: "6",
    name: "Butter Chicken",
    description: "Tender chicken in a silky smooth butter and tomato sauce",
    price: 400,
    image: nonvegMealImage,
    category: "nonveg",
  },
  {
    id: "7",
    name: "Chicken Biryani",
    description: "Aromatic rice layered with succulent chicken and spices",
    price: 350,
    image: nonvegMealImage,
    category: "nonveg",
  },
  {
    id: "8",
    name: "Fish Curry",
    description: "Fresh fish cooked in a tangy coconut-based curry",
    price: 420,
    image: nonvegMealImage,
    category: "nonveg",
  },
];

const Menu = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: MenuItemData) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        toast.success(`Added another ${item.name} to cart`);
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success(`${item.name} added to cart`);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from cart");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setIsCartOpen(false);
    navigate("/bill-split", { state: { cartItems } });
  };

  const vegItems = menuItems.filter((item) => item.category === "veg");
  const nonvegItems = menuItems.filter((item) => item.category === "nonveg");
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Menu</h1>
            <p className="text-lg text-muted-foreground">
              Browse our delicious selection of vegetarian and non-vegetarian dishes
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="veg" className="text-secondary">Veg</TabsTrigger>
              <TabsTrigger value="nonveg" className="text-destructive">Non-Veg</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menuItems.map((item) => (
                  <MenuItem key={item.id} item={item} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="veg" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vegItems.map((item) => (
                  <MenuItem key={item.id} item={item} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nonveg" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {nonvegItems.map((item) => (
                  <MenuItem key={item.id} item={item} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Menu;
