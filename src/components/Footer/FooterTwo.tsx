"use client";
import Image from "next/image";

interface Links {
  title: string;
  link: string;
}

interface FooterItem {
  title: string;
  links: Links[];
}

interface FooterProps {
  columns: FooterItem[];
  copyright?: string;
}

export default function FooterTwo({ columns, copyright }: FooterProps) {
  const columnsPerRow = 6;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t  border-[#E8E8E8]">
      <div className=" mx-auto apy-12 max-w-[1200px] 2xl:max-w-[90vw] ">
        {/* 6-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 amb-8 ">
          {columns.map((item, index) => {
            const isLastInRow = (index + 1) % columnsPerRow === 0;
            return (
              <div
                key={index}
                className={`p-4 text-start mmb-4 border-[#E8E8E8] pl-4 p-12 pt-10  ${
                  !isLastInRow ? "border-r" : ""
                }`}
              >
                <h3 className="text-sm font-semibold text-[#000000] mb-4">
                  {item.title}
                </h3>
                {item.links.map((link, idx) => (
                  <div key={idx} className="pl-6 font-medium text-sm ">
                    <a href={link.link}>{link.title}</a>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* <!-- footer bottom start --> */}
          <div className="py-5 xl:py-7.5 bg-white border-t border-[#E8E8E8]">
            <div className="max-w-[1200px] 2xl:max-w-[90vw] mx-auto px-4 sm:px-8 xl:px-0">
              <div className="flex gap-5 flex-wrap items-center justify-between">
                <p className="text-[#6E6E6E] font-medium text-xs">
                  Copyright&copy; {year} Sealco LG. All rights reserved.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a href={"/careers-opportunities"} className="font-medium text-xs">Careers</a>
                  <a href={"/faq"} className="font-medium text-xs">FAQ</a>
                  <a href={"#"} className="font-medium text-xs">Blog</a>
                  <a href={"#"} className="font-medium text-xs">Press Release</a>
                  <a href={"#"} className="font-medium text-xs">Terms and Conditions</a>

                  <div className="flex flex-wrap items-center gap-2">
                    <a href="#" aria-label="payment system with visa card">
                      <Image
                        src="/images/social/insta.png"
                        alt="visa card"
                        width={33}
                        height={33}
                      />
                    </a>
                    <a href="#" aria-label="payment system with visa card">
                      <Image
                        src="/images/social/tiktok.png"
                        alt="visa card"
                        width={33}
                        height={33}
                      />
                    </a>
                    <a href="#" aria-label="payment system with visa card">
                      <Image
                        src="/images/social/linkedin.png"
                        alt="visa card"
                        width={33}
                        height={33}
                      />
                    </a>
                    <a href="#" aria-label="payment system with visa card">
                      <Image
                        src="/images/social/x.png"
                        alt="visa card"
                        width={33}
                        height={33}
                      />
                    </a>
                    <a href="#" aria-label="payment system with visa card">
                      <Image
                        src="/images/social/pinterest.png"
                        alt="visa card"
                        width={33}
                        height={33}
                      />
                    </a>
                    <a href="#" aria-label="payment system with visa card">
                      <Image
                        src="/images/social/facebook.png"
                        alt="visa card"
                        width={33}
                        height={33}
                      />
                    </a>
                    <a href="#" aria-label="payment system with visa card">
                      <Image
                        src="/images/social/youtube.png"
                        alt="visa card"
                        width={33}
                        height={33}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- footer bottom end --> */}
      </div>
    </footer>
  );
}
