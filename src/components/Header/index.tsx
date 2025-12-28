// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import CustomSelect from "./CustomSelect";
// import { menuData } from "./menuData";
// import Dropdown from "./Dropdown";
// import { useAppSelector } from "@/redux/store";
// import { useSelector } from "react-redux";
// import { selectTotalPrice } from "@/redux/features/cart-slice";
// import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
// import Image from "next/image";
// import Account from "../svg/account";
// import Cart from "../svg/cart";
// import Globe from "../svg/globe";

// const Header = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [navigationOpen, setNavigationOpen] = useState(false);
//   const [stickyMenu, setStickyMenu] = useState(false);
//   const { openCartModal } = useCartModalContext();

//   const product = useAppSelector((state) => state.cartReducer.items);
//   const totalPrice = useSelector(selectTotalPrice);

//   const handleOpenCartModal = () => {
//     openCartModal();
//   };

//   // Sticky menu
//   const handleStickyMenu = () => {
//     if (window.scrollY >= 80) {
//       setStickyMenu(true);
//     } else {
//       setStickyMenu(false);
//     }
//   };

//   useEffect(() => {
//     // window.addEventListener("scroll", handleStickyMenu);
//   });

//   const options = [
//     { label: "All Categories", value: "0" },
//     { label: "Desktop", value: "1" },
//     { label: "Laptop", value: "2" },
//     { label: "Monitor", value: "3" },
//     { label: "Phone", value: "4" },
//     { label: "Watch", value: "5" },
//     { label: "Mouse", value: "6" },
//     { label: "Tablet", value: "7" },
//   ];

//   return (
//     <header
//       className={`aabsolute left-0 top-0 w-full z-9999 bg-[#F8F8F8] transition-all ease-in-out duration-300 ${
//         stickyMenu && "shadow"
//       }flex flex-row items-center px-8 2xl:px-0`}
//     >
//       <div className="w-full max-w-[1200px] xl:max-w-[1600px] mx-auto flex flex-row justify-between items-center ">
//         <Link className="flex-shrink-0 hidden xl:block" href="/">
//           <Image src="/images/logo/main.png" alt="Logo" width={240} height={36} />
//         </Link>
//         <div className="flex flex-col items-end">
//           <div className="amax-w-[1200px] axl:max-w-[1600px] amx-auto apx-4 sam:px-7.5 axl:px-4">
//             {/* <!-- header top start --> */}
//             <div
//               className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-end ease-out duration-200 ${
//                 stickyMenu ? "py-4" : "pt-6"
//               }`}
//             >
//               {/* <!-- header top left --> */}
//               <div className="xl:w-auto flex-col sm:flex-row w-full flex sm:justify-between sm:items-center gap-5 sm:gap-10 ">
//                 <Link className="flex-shrink-0 xl:hidden" href="/">
//                   <Image
//                     src="/images/logo/main.png"
//                     alt="Logo"
//                     width={219}
//                     height={36}
//                   />
//                 </Link>

//                 <div className="max-w-[475px] w-full">
//                   <form>
//                     <div className="flex items-center">
//                       {/* <CustomSelect options={options} /> */}

//                       <div className="relative max-w-[333px] sm:min-w-[50px] w-full">
//                         {/* <!-- divider --> */}
//                         {/* <span className="absolute left-0 top-1/2 -translate-y-1/2 inline-block w-px h-5.5 bg-gray-4"></span> */}
//                         <input
//                           onChange={(e) => setSearchQuery(e.target.value)}
//                           value={searchQuery}
//                           type="search"
//                           name="search"
//                           id="search"
//                           placeholder="Search"
//                           autoComplete="off"
//                           className="custom-search w-full rounded-lg bg-gray-1  border border-gray-3 py-1 pl-4 pr-10 outline-none ease-in duration-200"
//                         />

//                         <button
//                           id="search-btn"
//                           aria-label="Search"
//                           className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-blue"
//                         >
//                           <svg
//                             className="fill-current"
//                             width="18"
//                             height="18"
//                             viewBox="0 0 18 18"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M17.2687 15.6656L12.6281 11.8969C14.5406 9.28123 14.3437 5.5406 11.9531 3.1781C10.6875 1.91248 8.99995 1.20935 7.19995 1.20935C5.39995 1.20935 3.71245 1.91248 2.44683 3.1781C-0.168799 5.79373 -0.168799 10.0687 2.44683 12.6844C3.71245 13.95 5.39995 14.6531 7.19995 14.6531C8.91558 14.6531 10.5187 14.0062 11.7843 12.8531L16.4812 16.65C16.5937 16.7344 16.7343 16.7906 16.875 16.7906C17.0718 16.7906 17.2406 16.7062 17.3531 16.5656C17.5781 16.2844 17.55 15.8906 17.2687 15.6656ZM7.19995 13.3875C5.73745 13.3875 4.38745 12.825 3.34683 11.7844C1.20933 9.64685 1.20933 6.18748 3.34683 4.0781C4.38745 3.03748 5.73745 2.47498 7.19995 2.47498C8.66245 2.47498 10.0125 3.03748 11.0531 4.0781C13.1906 6.2156 13.1906 9.67498 11.0531 11.7844C10.0406 12.825 8.66245 13.3875 7.19995 13.3875Z"
//                               fill="#0000000"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>

//               {/* <!-- header top right --> */}
//               <div className="flex w-full lg:w-auto items-center gap-7.5">
//                 <div className="hidden xl:flex items-center gap-3.5">
//                   {/* Support block hidden */}
//                 </div>

//                 <div className="flex w-full lg:w-auto justify-between items-center gap-5">
//                   <div className="flex items-center gap-5">
//                     <button
//                       onClick={handleOpenCartModal}
//                       className="flex items-center gap-2.5"
//                     >
//                       <span className="inline-block relative">
//                         <Cart />

//                         <span className="flex items-center justify-center font-normal text-2xs absolute -right-2 -top-2.5 bg-[#116DB2] w-4.5 h-4.5 rounded-full text-white">
//                           {product.length}
//                         </span>
//                       </span>
//                     </button>
//                     <Link href="/signin" className="flex items-center gap-2.5">
//                       <Account />
//                     </Link>
//                     <Globe />
//                   </div>

//                   {/* Hamburger Toggle BTN */}
//                   <button
//                     id="Toggle"
//                     aria-label="Toggler"
//                     className="xl:hidden block"
//                     onClick={() => setNavigationOpen(!navigationOpen)}
//                   >
//                     <span className="block relative cursor-pointer w-5.5 h-5.5">
//                       <span className="du-block absolute right-0 w-full h-full">
//                         <span
//                           className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-[0] ${
//                             !navigationOpen && "!w-full delay-300"
//                           }`}
//                         ></span>
//                         <span
//                           className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${
//                             !navigationOpen && "!w-full delay-400"
//                           }`}
//                         ></span>
//                         <span
//                           className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${
//                             !navigationOpen && "!w-full delay-500"
//                           }`}
//                         ></span>
//                       </span>

//                       <span className="block absolute right-0 w-full h-full rotate-45">
//                         <span
//                           className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${
//                             !navigationOpen && "!h-0 delay-[0] "
//                           }`}
//                         ></span>
//                         <span
//                           className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${
//                             !navigationOpen && "!h-0 dealy-200"
//                           }`}
//                         ></span>
//                       </span>
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//             {/* <!-- header top end --> */}
//           </div>

//           <div className="aborder-t border-gray-3">
//             <div className="max-w-[1200px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-7.5 xl:px-0">
//               <div className="flex items-center justify-end">
//                 <div
//                   className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${
//                     navigationOpen &&
//                     `!visible bg-white shadow-lg border border-gray-3 !h-auto max-h-[400px] overflow-y-scroll rounded-md p-5`
//                   }`}
//                 >
//                   {/* <!-- Main Nav Start --> */}
//                   <nav>
//                     <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
//                       {menuData.map((menuItem, i) =>
//                         menuItem.submenu ? (
//                           <Dropdown
//                             key={i}
//                             menuItem={menuItem}
//                             stickyMenu={stickyMenu}
//                           />
//                         ) : (
//                           <li
//                             key={i}
//                             className="group relative abefore:w-0 abefore:h-[3px] abefore:bg-blue abefore:absolute abefore:left-0 abefore:top-0 abefore:rounded-b-[3px] abefore:ease-out abefore:duration-200 ahover:before:w-full "
//                           >
//                             <Link
//                               href={menuItem.path}
//                               className={`hover:text-[#116DB2] text-[13px] max-height[51px] 2xl:text-[15px] font-semibold text-[#676767] flex ${
//                                 stickyMenu ? "xl:py-4" : "xl:py-6"
//                               }`}
//                             >
//                               {menuItem.title}
//                             </Link>
//                           </li>
//                         )
//                       )}
//                     </ul>
//                   </nav>
//                   {/* //   <!-- Main Nav End --> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useAppSelector } from "@/redux/store";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import Image from "next/image";
import Account from "../svg/account";
import Cart from "../svg/cart";
import Globe from "../svg/globe";
import { useRouter } from "next/navigation";
import { menuService } from "@/services/menuService";
import { MenuDetails } from "@/types/Menu";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const { openCartModal } = useCartModalContext();
  const product = useAppSelector((state) => state.cartReducer.items);
  const router = useRouter();
  const [menuData_, setMenuData] = useState<MenuDetails | null>(null);

  useEffect(() => {
    menuService
      .getMenus()
      .then((data) => {
        // Find the specific menu object named "Header"
        const headerMenu = data.find((m) => m.name === "Header");
        console.log("headerMenu: ", headerMenu);

        // If found, save its ID to state
        if (headerMenu) {
          menuService.getMenuById(headerMenu.id).then(setMenuData);
          console.log("data: ", menuData_);
        }
      })
      .catch(() => {}); // Silent catch
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // Redirect to /search with the query as a parameter
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="relative w-full bg-[#F8F8F8] z-[9999]">
      <div className="max-w-[1600px] mx-auto md:px-8 pt-4">
        {/* Main Flex Container: Logo on left, Actions/Search on right */}
        <div className="flex items-center justify-between">
          {/* LOGO - Stays Left */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-[140px] h-[80px] sm:w-[180px] md:w-[220px] lg:w-[240px]">
              <Image
                src="/images/logo/main-logo.png"
                alt="Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* RIGHT GROUP: Search + Actions + Hamburger */}
          <div className="flex items-center justify-end gap-4 md:gap-7">
            {/* Search Bar - Desktop Only, Max 300px */}
            <div className="hidden lg:flex relative w-full max-w-[300px]">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch} // Trigger on "Enter"
                value={searchQuery}
                type="search"
                placeholder="Search"
                className="w-full rounded-full border border-[#EBEBEB] py-1.5 pl-4 pr-10 outline-none focus:border-[#116DB2] bg-white text-sm transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#116DB2]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.2687 15.6656L12.6281 11.8969C14.5406 9.28123 14.3437 5.5406 11.9531 3.1781C10.6875 1.91248 8.99995 1.20935 7.19995 1.20935C5.39995 1.20935 3.71245 1.91248 2.44683 3.1781C-0.168799 5.79373 -0.168799 10.0687 2.44683 12.6844C3.71245 13.95 5.39995 14.6531 7.19995 14.6531C8.91558 14.6531 10.5187 14.0062 11.7843 12.8531L16.4812 16.65C16.5937 16.7344 16.7343 16.7906 16.875 16.7906C17.0718 16.7906 17.2406 16.7062 17.3531 16.5656C17.5781 16.2844 17.55 15.8906 17.2687 15.6656ZM7.19995 13.3875C5.73745 13.3875 4.38745 12.825 3.34683 11.7844C1.20933 9.64685 1.20933 6.18748 3.34683 4.0781C4.38745 3.03748 5.73745 2.47498 7.19995 2.47498C8.66245 2.47498 10.0125 3.03748 11.0531 4.0781C13.1906 6.2156 13.1906 9.67498 11.0531 11.7844C10.0406 12.825 8.66245 13.3875 7.19995 13.3875Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            {/* Action Items */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button onClick={openCartModal} className="relative group">
                <Cart />
                <span className="absolute -right-2 -top-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#116DB2] text-[10px] font-bold text-white">
                  {product.length}
                </span>
              </button>
              <Link href="/my-account">
                <Account />
              </Link>
              <div className="hidden sm:block">
                <Globe />
              </div>

              {/* Hamburger Button (Tablet/Mobile) */}
              <button
                className="xl:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                onClick={() => setNavigationOpen(!navigationOpen)}
              >
                <span
                  className={`block w-6 h-0.5 bg-[#333] transition-all duration-300 ${navigationOpen ? "rotate-45 translate-y-2" : ""}`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-[#333] transition-all duration-300 ${navigationOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-[#333] transition-all duration-300 ${navigationOpen ? "-rotate-45 -translate-y-2" : ""}`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Mobile Search Section */}
      <div
        className={`xl:block ${navigationOpen ? "block bg-white border-t border-gray-100" : "hidden"}`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <nav className="xl:flex xl:justify-end">
            <ul className="flex flex-col xl:flex-row xl:items-center gap-1 xl:gap-7">
              {/* For Mobile: Search bar appears at the top of the menu list */}
              <li className="lg:hidden py-4 border-b border-gray-100">
                <input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch} // Trigger on "Enter"
                  value={searchQuery}
                  type="search"
                  placeholder="Search"
                  className="w-full rounded-full border border-[#EBEBEB] py-1.5 pl-4 pr-10 outline-none focus:border-[#116DB2] bg-white text-sm transition-all"
                />
              </li>
              {/* {menuData.map((menuItem, i) => (
                <li key={i}>
                  {menuItem.submenu ? (
                    <Dropdown menuItem={menuItem} stickyMenu={false} />
                  ) : (
                    <Link
                      href={menuItem.path}
                      className="block pb-4 pt-2 text-[13px] 2xl:text-[14px] font-bold text-[#676767] uppercase hover:text-[#116DB2] transition-colors"
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))} */}
              {menuData_?.items?.map((menuItem) => (
                <li key={menuItem.id}>
                  {menuItem.parentId !== null ? (
                    <Dropdown menuItem={menuItem} stickyMenu={false} />
                  ) : (
                    <Link
                      href={`/${menuItem.customLink}`} // Prepended / for valid routing
                      className="block pb-4 pt-2 text-[13px] 2xl:text-[14px] font-bold text-[#676767] uppercase hover:text-[#116DB2] transition-colors"
                    >
                      {menuItem.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
