"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import "./globals.css";
import Card from '../components/Card/Card';
import { Card_Details } from '../helpers/utils';

const Home = () => {

  return (
    <div className='home__container'>
        <h1 className='select__chat'>Select Type of Chat </h1>
        <div className='card__container'>
          {
            Card_Details.map((card, index) =>  <Card cardDetails={card} key={index}/>)
          }
        </div>
    </div>
  );
};

export default Home;