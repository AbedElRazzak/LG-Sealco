import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import HeroCardTwo from "./Hero/HeroCardTwo";
import HeroCardThree from "./Hero/HeroCardThree";
import CtaOne from "../Common/CtaOne";
import Recomendations from "./Recomendations";
import CtaTwo from "../Common/CtaTwo";
import CtaThree from "../Common/CtaThree";
import HeroCardOne from "./Hero/HeroCardOne";

const Home = () => {
  return (
    <main>
      <Hero />
      <HeroCardTwo
        subtitle="LG Vision"
        title={"LG InstaView™ French Door Fridge, 716L, Steel"}
        buttonText="Learn more"
        description="LG's Stylish & innovative applicances "
        image="/images/hero/main-02.png"
      />
      <Categories />

      <HeroCardTwo
        subtitle="LG Vision"
        title={'"The LG G5 is the best TV I\'ve ever tested" – CNET'}
        buttonText="Learn more"
        description="Our best and brightest OLED ever"
        image="/images/hero/main-03.png"
      />
      <Categories />
      <HeroCardThree
        subtitle="Indoor Unit"
        title={"Air Conditioners"}
        buttonText="Learn more"
        description="For your business inquiries and detailed technical sheet, kindly email us on"
        image="/images/hero/main-04.png"
        link="info@sealco-leb.com"
      />
      {/* <NewArrival /> */}
      {/* <PromoBanner /> */}
      {/* <BestSeller /> */}
      {/* <CounDown /> */}
      {/* <Testimonials /> */}
      <CtaOne
        title="Meet LG ThinQ®"
        description="LG ThinQ® elevates your quality of life at home and beyond by bringing New Intelligence to Connected Living"
        image="/images/common/cta-01.png"
        buttonText="Discover More"
      />
      <Recomendations />
      <CtaTwo
        title="Browse with ease, Shop with confidence"
        features={[
          {
            img: "/images/common/free-shipping.png",
            title: "Free Shipping",
            description: "Safe delivery service you can count on",
          },
          {
            img: "/images/common/expert-info.png",
            title: "Expert Information",
            description: "Be in the know from people who know LG best",
          },
          {
            img: "/images/common/authenticity.png",
            title: "Authenticity",
            description: "Guaranteed genuine LG products",
          },
          {
            img: "/images/common/warranty.png",
            title: "Registration & Warranty",
            description: "Increase the lifespan of your purchase",
          },
        ]}
      />
      <CtaThree
        title="Simply choose a support option from the icons below:"
        paragraphs={[
          "*Prices, promotions and availability may vary by store and online. Prices subject to change without notice. Quanities are limited. Check with your local retailers for final price and availability. All prices are inclusive of 11 % VAT.",
          "Sealco brings you the best technology by LG in TV & home entertainment, home appliances, air conditioning solutions, and many more. Life's about more than having the latest technology it's about the experiences technology that creates. We are committed to creating teh best value to our clients and shareholders alike.",
        ]}
        features={[
          {
            img: "/images/common/bot.png",
            title: "LG Brandshops",
            items: [
              {
                title: "Dora Brandshop",
                description: "Location: Dora highway, Facing City Mall",
              },
              {
                title: "Jnah Brandshop",
                description:
                  "Location: Adnan Hakim Street, Facing BHV Tel: 01 85 38 93",
              },
            ],
          },
          {
            img: "/images/common/care-delight.png",
            title: "LG Call Center: 1273",
            items: [
              { title: null, description: "Whatsapp +962 77 677 0000" },
              {
                title: null,
                description:
                  "Mon - Sat (Except national holidays): 8:30am to 6:00pm",
              },
              { title: null, description: "Sun: 10:30am to 5:00pm" },
            ],
          },
          {
            img: "/images/common/email.png",
            title: "Email",
            items: [
              {
                title: null,
                description: "Send a Message to Sealco Customer Support",
              },
            ],
          },
          {
            img: "/images/common/whatsapp.png",
            title: "Whatsapp",
            items: [
              {
                title: null,
                description: "Contact Us Via Whatsapp: +961 76 708 714",
              },
              {
                title: null,
                description: "Mon - Fri (Except bational holidays): 9am to 6pm",
              },
            ],
          },
        ]}
      />

      {/* <Newsletter /> */}
    </main>
  );
};

export default Home;
