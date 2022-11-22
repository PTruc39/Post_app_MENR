import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Silde = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
      };
      return (
        <div>
          <h2> Single Item</h2>
          <Slider {...settings}>
            <div>
              <img height="500px" src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/315478295_593805829214966_9091696562397836950_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=hQI4G6e3pz4AX9ZTMrF&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfDyjcewH0IVArdMfiUtA0RdI8WsKP7vV0JbRbZXxwzxvA&oe=637C23A6" />
            </div>
            <div>
            <img height="500px" src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/315478295_593805829214966_9091696562397836950_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=hQI4G6e3pz4AX9ZTMrF&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfDyjcewH0IVArdMfiUtA0RdI8WsKP7vV0JbRbZXxwzxvA&oe=637C23A6" />
            </div>
            <div>
            <img height="500px" src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/315478295_593805829214966_9091696562397836950_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=hQI4G6e3pz4AX9ZTMrF&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfDyjcewH0IVArdMfiUtA0RdI8WsKP7vV0JbRbZXxwzxvA&oe=637C23A6" />
            </div>
            <div>
            <img height="500px" src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/314906002_592831585979057_2300708361084139711_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=awmC9sKsuxwAX-3_GgD&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfCWiEoKN1M-GSL6bC2nZMbog5vXMgrgU9adz8yljZ5llw&oe=637D7D34" />
            </div>
          </Slider>
        </div>
      );
}

export default Silde