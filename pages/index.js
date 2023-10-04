"use client";
import { useState,useEffect,useRef } from 'react';
import {Banner,CreaterCard} from '../components';
import images from '../assets';
import { makeId } from '@/utils/makeId';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Home = () => {
  const [hideButtons,sethideButtons] = useState(false);
  const {theme} = useTheme();
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollAble = () => {
    const {current} = scrollRef;
    const {current:parent} = parentRef;

    if(current?.scrollWidth >= parent?.offsetWidth){
      sethideButtons(false);
    }else{
      sethideButtons(true);
    }
  }

  useEffect(()=>{
    isScrollAble();
    window.addEventListener('resize',isScrollAble);

    return () => {
      window.removeEventListener('resize',isScrollAble);
    };
  });

  return (
  <div className="flex justify-center sm:px-4 p-12">
    <div className=" w-full minmd:w-4/5">
      <Banner 
        name='Discover, collect, and sell extraordinary NFTs'
        childStyles='md:text-4xl sm:text-2xl sx=text-xl text-left'
        parentStyles='justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl '
      />

      <div>
        <h1 className='font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0'>Tops Sellers</h1>
        <div className='relative flex-1 max-w-full flex mt-3' ref={parentRef}>
        <div className='flex flex-row w-max overflow-x-scoll no-scrollbar select-none' ref={scrollRef}>
        {[6,7,8,9,10].map((i)=>(
          <CreaterCard 
            key={`creater-${i}`}
            rank={i}
            creatorImage={images[`creator${i}`]}
            creatorName={`creator${i}`}
            creatorEths={10-i*0.5}
          />
        ))}
        {!hideButtons && (
          <>
          <div onClick={() => handleScroll('left')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0">
              <Image src={images.left} layout="fill" objectFit="contain" alt="left-arrow" className={(theme === 'light') ? 'filter invert' : ''} />
          </div>
          <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0">
              <Image src={images.right} layout="fill" objectFit="contain" alt="right-arrow" className={(theme === 'light') ? 'filter invert' : ''} />
          </div>
        </>
        )}
        </div>
        </div>
      </div>

    </div>
  </div>
)}

export default Home;