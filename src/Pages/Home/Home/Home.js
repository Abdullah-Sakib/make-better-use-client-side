import React from 'react';
import Advertisement from '../Advertisement/Advertisement';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Advertisement></Advertisement>
      <Categories></Categories>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;