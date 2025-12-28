"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import FooterTwo from "@/components/Footer/FooterTwo";
import CartInitializer from "@/components/Common/CartSidebarModal/CartInitializer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <ReduxProvider>
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    <CartInitializer />
                    <Header />
                    {children}

                    <QuickViewModal />
                    <CartSidebarModal />
                    <PreviewSliderModal />
                  </PreviewSliderProvider>
                </ModalProvider>
              </CartModalProvider>
            </ReduxProvider>
            <ScrollToTop />
            <FooterTwo
              columns={[
                { title: "TV/AUDIO", links: [{ title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }] },
                {
                  title: "Home Applicances",
                  links: [{ title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }],
                },
                {
                  title: "Air Conditioners",
                  links: [{ title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }],
                },
                { title: "About Us", links: [{ title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }] },
                { title: "Support", links: [{ title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }] },
                { title: "Newsletter", links: [{ title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }, { title: "Ipsum", link: "#" }] },
              ]}
              copyright="Copyright © 2025 Sealco LG. All rights reserved."
            />
          </>
        )}
      </body>
    </html>
  );
}
