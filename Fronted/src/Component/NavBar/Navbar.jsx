import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "../Auth/Auth";
import { Hero } from "../Hero/Hero";
import { Footer } from "../Footer/Footer";
import {
  FlowerWishlistThunk,
  GetAllWishlistThunk,
} from "../../Store/Whislist/WhislistApi";

export const Navbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllWishlistThunk());
  }, []);
  return (
    <>
      <Auth />
      <Hero />
      <Footer />
    </>
  );
};
