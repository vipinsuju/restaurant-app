import React, { useState } from "react";
import { MdOutlineShoppingCart, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/logg.png";
import Avatar from "../img/avatar.png";

import { Link } from "react-router-dom";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:px-16 bg-primary ">
      {/*dektop*/}
      <div className="hidden md:flex w-full h-full items-center justify-between ">
        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={Logo} className=" flex w-10 object-cover " alt="logo" />
          <p className="text-headingColor text-base font-bold mt-4 ">
            Palakkad
          </p>
        </Link>
        <div className="flex items-center gap-8 ">
          <motion.ul
            initial={{ opasity: 0, x: 200 }}
            animate={{ opasity: 1, x: 0 }}
            exit={{ opasity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            
           
          </motion.ul>
          <div
            className="relative flex items-center justify-center "
            onClick={showCart}
          >
            <p className="flex mr-3 text-textColor cursor-pointer " >Your Cart</p>
            <MdOutlineShoppingCart className="text-textColor text-2xl  cursor-pointer" />
            {cartItems.length>0?(
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                
                {cartItems.length}
              </p>
            </div>
            ):""}
            
          </div>

          <div className="relative">
            <motion.img
              onClick={login}
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="User"
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            />
            {isMenu && (
              <motion.div
                initial={{ opasity: 0, scale: 0.6 }}
                animate={{ opasity: 1, scale: 1 }}
                exit={{ opasity: 0, scale: 0.6 }}
                className="w-40 bg-primary shadow-xl absolute  flex flex-col rounded-lg top-12 right-0"
              >
                  
                
                {user && user.email === "connecttovipinsuju@gmail.com" && (
                  <Link to="/createitem">
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base  "
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="m-2 p-2 rounded-md shadow-md text-white bg-red-500 flex items-center gap-3 cursor-pointer hover:bg-red-700 transition-all duration-100 ease-in-out  text-base  "
                  onClick={logout}
                >
                  Logout
                  <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/*mobile*/}
      <div className="flex md:hidden w-full h-full justify-between items-center ">
        <div
          className="relative flex items-center justify-center "
          onClick={showCart}
        >
          <MdOutlineShoppingCart className="text-textColor text-2xl cursor-pointer " />
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
            <p className="text-xs text-white font-semibold">
              {cartItems.length}
            </p>
          </div>
        </div>

        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={Logo} className="w-10 object-cover h-12" alt="logo" />
          <p className="text-headingColor text-base font-semibold mt-4 ">
            Palakkad
          </p>
        </Link>

        <div className="relative">
          <motion.img
            onClick={login}
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="User"
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
          />

          {isMenu && (
            <motion.div
              initial={{ opasity: 0, scale: 0.6 }}
              animate={{ opasity: 1, scale: 1 }}
              exit={{ opasity: 0, scale: 0.6 }}
              className="w-40 bg-primary shadow-xl absolute  flex flex-col rounded-lg top-12 right-0"
            >
              {user && user.email === "connecttovipinsuju@gmail.com" && (
                <Link to="/createitem">
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base  "
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              
              <p
                className="m-2 p-2 rounded-md shadow-md text-white bg-red-500 flex items-center  gap-3 cursor-pointer hover:bg-red-700 transition-all duration-100 ease-in-out   text-base  "
                onClick={logout}
              >
                Logout
                <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
