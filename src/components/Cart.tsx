import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, Leaf } from "lucide-react";
import type { MenuItemData } from "./MenuItem";

export interface CartItem extends MenuItemData {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">Your Cart ({itemCount} items)</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-muted-foreground text-lg mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add items from the menu to get started!</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <Badge
                      variant="outline"
                      className={`mt-1 ${
                        item.category === "veg"
                          ? "border-secondary text-secondary"
                          : "border-destructive text-destructive"
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
                    <p className="text-lg font-bold text-primary mt-2">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="font-semibold text-foreground">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <Separator className="my-4" />

            <div className="space-y-2 py-4">
              <div className="flex justify-between text-lg">
                <span className="font-medium">Subtotal:</span>
                <span className="font-semibold">₹{total}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Taxes & Charges:</span>
                <span>Included</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary">₹{total}</span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={onCheckout}
            >
              Proceed to Split Bill
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
