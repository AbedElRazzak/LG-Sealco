import BreadcrumbFour from "@/components/Common/BreadcrumbFour";
import Image from "next/image";
import Link from "next/link";

export default async function HighlightsDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  // Mock categories list from the design
  const categories = Array(20).fill("Lorem Ipsum (34)");

  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbFour title={"Highlights Details"} pages={["Highlights Details"]} />

      <section className="py-12">
        <div className="max-w-[1200px] 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-8">
          
          {/* Header Section */}
          <h1 className="text-3xl font-bold text-[#000000] mb-8">LG shows off the new smart TVs</h1>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* MAIN CONTENT COLUMN */}
            <div className="flex-1">
              {/* Large Feature Image */}
              <div className="relative aspect-video w-full mb-5 overflow-hidden rounded-sm">
                <Image 
                  src="/images/highlights/01.avif" 
                  alt="Main highlight" 
                  fill 
                  className="object-cover"
                />
              </div>

              <div className="flex gap-4 items-start">
                {/* Vertical Social Share Sidebar */}
                <div className="flex flex-col gap-2 shrink-0">
                   {[
                    { id: "link", src: "/images/social/linkedin.png", alt: "linkedin" },
                    { id: "in", src: "/images/social/insta.png", alt: "instagram" },
                    { id: "x", src: "/images/social/x.png", alt: "x" },
                    { id: "p", src: "/images/social/pinterest.png", alt: "pinterest" },
                    { id: "f", src: "/images/social/facebook.png", alt: "facebook" },
                  ].map((social) => (
                    <button key={social.id} className="w-8 h-8 flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-colors">
                      <Image src={social.src} alt={social.alt} width={33} height={33} className="object-contain p-1 grayscale hover:grayscale-0" />
                    </button>
                  ))}
                </div>

                {/* Article Text Content */}
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-400 mb-4">November 26, 2025</p>
                  <div className="w-18 h-[2px] bg-[#116DB2] mb-4"></div>
                  <div className="space-y-6 text-sm font-medium text-gray-700 leading-relaxed">
                    <p>Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house, LG's stylish & innovative appliances are built to suit your lifestyle. Learn more below. Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house, LG's stylish & innovative appliances are built to suit your lifestyle. Learn more below.</p>
                    
                    <p>Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house, LG's stylish & innovative appliances are built to suit your lifestyle. Learn more below. Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house, LG's stylish & innovative appliances are built to suit your lifestyle. Learn more below.</p>
                    
                    <p>Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house, LG's stylish & innovative appliances are built to suit your lifestyle. Learn more below. Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house, LG's stylish & innovative appliances are built to suit your lifestyle. Learn more below.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR COLUMN: Categories */}
            <div className="lg:w-[300px] w-full shrink-0">
              <h3 className="text-2xl font-bold text-[#000000] mb-6">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat, i) => (
                  <Link 
                    key={i} 
                    href="#" 
                    className="text-sm font-bold text-[#116DB2] hover:underline"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}