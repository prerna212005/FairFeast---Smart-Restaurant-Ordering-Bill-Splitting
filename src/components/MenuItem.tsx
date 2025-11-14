import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Leaf } from "lucide-react";

export interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "veg" | "nonveg";
}

interface MenuItemProps {
  item: MenuItemData;
  onAddToCart: (item: MenuItemData) => void;
}

const MenuItem = ({ item, onAddToCart }: MenuItemProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-md)] transition-all duration-300 group animate-fade-in">
      <div className="relative overflow-hidden h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge
          className={`absolute top-3 right-3 ${
            item.category === "veg"
              ? "bg-secondary text-secondary-foreground"
              : "bg-destructive text-destructive-foreground"
          }`}
        >
          {item.category === "veg" ? (
            <>
              <Leaf className="h-3 w-3 mr-1" />
              Veg
            </>
          ) : (
            "Non-Veg"
          )}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
        <p className="text-xl font-bold text-primary">₹{item.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(item)}
          className="w-full"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
