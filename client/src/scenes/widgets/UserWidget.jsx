import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "components/UserImage";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";


  const UserWidget = ({userId,picturePath}) =>{
    const [user,setUser] = useState(null);
    const {palette} = useTheme()
    const navaigate = useNavigate()
    const token = useSelector((state)=>state.token)
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main

    const getUser = async ()=>{
        const respone = await fetch(`http://localhost:3001/${userId}`,{
            method : "GET",
            headers : {"Autorization":`bearer ${token}`}
        });
        const userData = await respone.json();
        setUser(userData);
    }

    useEffect(()=>{
        getUser();

    },[]);

    if(!user){
        return null
    }

    const {
        firstName,
        lastName,
        location,
        ocupation,
        viewedProfile,
        impression,
        friends
    } = user




  }