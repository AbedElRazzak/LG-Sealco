'use client'
import { useSearchParams } from "next/navigation";
import BreadcrumbThree from "@/components/Common/CartSidebarModal/BreadcrumbThree";
import OrderConfirmation from "@/components/OrderConfirmation";

export default function OrderConfirmationPage() {

  return (
    <>
      <OrderConfirmation />
    </>
  );
}