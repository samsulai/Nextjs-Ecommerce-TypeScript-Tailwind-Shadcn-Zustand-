
"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { formatPrice } from "@/lib/utils"
import { Separator } from "@radix-ui/react-separator"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import CartItem from "./CartItem"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useEffect, useState } from "react"

const Cart = () => {
  const { items } = useCart()
  const itemCount = items.length
  const cartTotal = items.reduce((total, {product}) => total + product.price, 0)
  const fee = 1
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <Sheet>
    <SheetTrigger className="group -m-2 flex items-center p-2">
      <ShoppingCart  className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
      {isMounted ? itemCount : 0}
      </span>
      </SheetTrigger>
    <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
      <SheetHeader className="space-y-2.5 pr-6">
        <SheetTitle>Cart (itemCount)</SheetTitle>
        {
          itemCount > 0 ? (
<>
<div className="flex w-full flex-col pr-6">
  <ScrollArea>
  {items.map(({product}) => (

<CartItem product={product} key={product.id}/>
))}
  </ScrollArea>

</div>
<div className="space-y-4">
<Separator />
<div className="space-y-1.5 text-sm">
<div className="flex">
<span className=" flex-1">Shipping</span>
<span>Free</span>
</div>

<div className="flex ">
<span className="flex-1">Transaction</span>
<span>{formatPrice(cartTotal + fee)}</span>
</div>

<div className="flex ">
<span className="flex-1">Total</span>
<span>Cart Total</span>
</div>


<SheetFooter>
  <SheetTrigger asChild>
<Link href="/cart" className={buttonVariants({
  className : 'w-full'
})}>
Continue to Checkout
</Link>
  </SheetTrigger>
</SheetFooter>
</div>
</div>
</>

          ) : (<div className="flex h-full flex-col items-center justify-center space-y-1">
<div className="relative mb-4 h-60 w-60 text-muted-foreground">
<Image
                src='/hippo-empty-cart.png'
                fill
                alt='empty shopping cart hippo'
              />
       
</div>
<div className='text-xl font-semibold'>
              Your cart is empty
            </div>
            <SheetTrigger asChild>
              <Link
                href='/products'
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className:
                    'text-sm text-muted-foreground',
                })}>
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>)
        }
      </SheetHeader>
    </SheetContent>
  </Sheet>
  
  )
}

export default Cart