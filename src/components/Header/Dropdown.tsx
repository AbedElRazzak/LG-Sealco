import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Dropdown = ({ menuItem, stickyMenu }) => {
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const pathUrl = usePathname();

  return (
    <li
      onMouseEnter={() => setDropdownToggler(true)}
      onMouseLeave={() => setDropdownToggler(false)}
      className="static group"
    >
      <button
        className={`hover:text-[#116DB2] text-[13px] 2xl:text-[15px] font-semibold text-[#676767] flex items-center gap-1.5 uppercase transition-colors ${
          stickyMenu ? "xl:pb-4 xl:pt-2" : "axl:py-6"
        } ${dropdownToggler == true && "!text-[#116DB2]"}`}
      >
        {menuItem.title}
        <svg
          className={`fill-current transition-transform duration-200 ${dropdownToggler ? "rotate-180" : ""}`}
          width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M2.95363 5.67461C3.13334 5.46495 3.44899 5.44067 3.65866 5.62038L7.99993 9.34147L12.3412 5.62038C12.5509 5.44067 12.8665 5.46495 13.0462 5.67461C13.2259 5.88428 13.2017 6.19993 12.992 6.37964L8.32532 10.3796C8.13808 10.5401 7.86178 10.5401 7.67453 10.3796L3.00787 6.37964C2.7982 6.19993 2.77392 5.88428 2.95363 5.67461Z" />
        </svg>
      </button>

      {/* Mega Menu Dropdown */}
      <div
        className={`absolute left-0 top-full w-full bg-white border-t border-[#EEEEEE] min-h-screen shadow-xl z-50 transition-all duration-300 ${
          dropdownToggler ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 py-10">
          {/* Section Header like "TV/AUDIO >" */}
          <div className="flex items-center gap-2 mb-8 group/title cursor-pointer">
            <h2 className="text-xl font-bold text-[#010101] uppercase">{menuItem.title}</h2>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black">
               <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>

          {/* Grid Layout for Sub-items */}
          <div className="grid grid-cols-5 gap-8">
            {menuItem.submenu.map((item, i) => (
              <div key={i} className="flex flex-col">
                {/* Image Section: Only shows if item.image is not null */}
                {item.image && (
                  <Link href={item.path} className="relative aspect-video w-full mb-6 overflow-hidden rounded-sm bg-gray-50 flex items-center justify-center group-hover:opacity-90 transition-opacity">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={120}
                      className="object-contain p-2"
                    />
                  </Link>
                )}

                {/* Sub-Category Title */}
                <Link href={item.path} className="text-sm font-bold text-black uppercase mb-3 hover:text-[#116DB2] transition-colors">
                  {item.title}
                </Link>

                {/* Sub-items/Links List */}
                {item.links && (
                  <ul className="space-y-2">
                    {item.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link href={link.path} className="text-xs font-medium text-gray-500 hover:text-[#116DB2] transition-colors">
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Close Button as seen in design */}
        <button 
          onClick={() => setDropdownToggler(false)}
          className="absolute top-6 right-8 text-gray-400 hover:text-black transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default Dropdown;