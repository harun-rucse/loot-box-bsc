import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardItem from "./CardItem";
import { usePreSale } from "../context/PreSaleContext";

function Card() {
  const { preSalesData: items } = usePreSale();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm relative mt-44 pb-10">
      <img
        src="/images/treasure_overhang.png"
        alt=""
        className="max-w-md w-full h-auto absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <div className="flex items-center justify-center h-12 gap-1 pt-32 p-6">
        <img
          src="/images/svgexport-3.svg"
          alt=""
          className="w-6 h-6 object-contain self-start"
        />
        <div className="font-bold">
          <span className="text-[#a9f0b9] text-4xl uppercase drop-shadow-[-1px_2px_1px_#000000]">
            Loot Boxes
          </span>
        </div>
        <img
          src="/images/svgexport-4.svg"
          alt=""
          className="w-6 h-6 object-contain self-end"
        />
      </div>
      <p className="text-center text-2xl mt-8 mb-10 p-6">
        Discover guaranteed savings with our Token Lootbox deals! Each purchase
        delivers discounted Token tokens, ensuring you get more bang for your
        buck.
      </p>
      <Carousel responsive={responsive} className="pl-10 lg:pl-8">
        {items.map((item, index) => (
          <CardItem key={index} item={item} />
        ))}
      </Carousel>
      ;
    </div>
  );
}

export default Card;
