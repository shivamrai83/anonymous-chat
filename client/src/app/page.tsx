"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import "./globals.css";
import Card from '../components/Card/card'
const Home = () => {

  const cardDetails = [
    {
      image: '',
      title: 'Group Chat',
      description: 'You can use the group chat link to share it with your friends and have personal communication.',
    },
    {
      image: '',
      title: 'Personal Chat',
      description: 'You can Use this Room for Private Chat with your Friend.',
    },
    {
      image: '',
      title: 'Global Chat',
      description: 'Any one who is avilable can use this to explore with other people.',
    }
  ]

  return (
    <div className='home__container'>
        <h1 className='select__chat'>Select Type of Chat </h1>
        <div className='card__container'>
          {
            cardDetails.map((card) =>  <Card cardDetails={card}/>)
          }
        </div>
    </div>
  );
};

export default Home;