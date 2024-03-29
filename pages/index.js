"use client";
import {useState,useEffect,useRef} from 'react';
import {Banner,CreaterCard,NFTCard} from '../components';
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
      current.scrollLeft -= smallAmount;
    } else {
      current.scrollLeft += smallAmount;
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
        <div className='flex flex-row w-max overflow-x-scroll no-scrollbar select-none' ref={scrollRef}>
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
      <div className='mt-10'>
          <div className='flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start'>
          <h1 className='flex-1 before:font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4'>Best NFTS</h1>
          <div>Search</div>
          </div>
          <div className='mt-3 w-full flex flex-wrap justify-start md:justify-center'>
            {[1,2,3,4,5,6,7,8,9,10].map((i)=>(
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i:i,
                  name:`Nifty NFT ${i}`,
                  price:(10-i*0.534).toFixed(2),
                  seller:`creator${i}`,
                  owner: `owner${i}`,
                  description: 'cool nft on sale',
                }}
              />
            ))
            }
          </div>
      </div>
    </div>
  </div>
);
};

export default Home;