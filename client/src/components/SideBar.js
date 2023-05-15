import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SideBar = ({ setSideBarOpen }) => {
  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="flex">
        <div
          className={`${
            open ? "w-56 fixed" : "w-24"
          } bg-dark-purple h-full p-5 pt-8 fixed duration-300`}
        >
          <img
            src="/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
              !open && "rotate-180"
            }`}
            onClick={() => {
              setOpen(!open);
              setSideBarOpen(!open);
            }}
          />
          <img
            src="/logo.png"
            alt=""
            className={`${
              !open && "hidden"
            } h-32 ml-2 origin-left duration-200`}
          />
          <ul className="pt-6">
            <Link href="/">
              <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                <img src={`/Home.png`} className="w-10" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-lg`}
                >
                  Dashboard
                </span>
              </li>
            </Link>
            <Link href="/member-form">
              <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                <img src={`/Form.png`} className="w-10" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-lg`}
                >
                  Registration
                </span>
              </li>
            </Link>
            <Link href="/member-list">
              <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                <span className="w-10 h-8">
                  <img src={`/List.png`} className="w-[35px] ml-[2px] h-8" />
                </span>
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-lg`}
                >
                  Report
                </span>
              </li>
            </Link>
            <li
              onClick={handleClick}
              className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2"
            >
              <img src={`/Logout.png`} className="w-10" />
              <span className={`${!open && "hidden"} origin-left duration-200 text-lg`}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
