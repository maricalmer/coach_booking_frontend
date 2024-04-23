import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const CoachesCarousel = () => {
  const [coaches, setCoaches] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3000/coaches')
      .then(response => response.json())
      .then(data => setCoaches(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div ref={scrollRef} className="scrollable flex items-center overflow-y-scroll w-full ">
        {coaches.map((coach, index) => (
          <Link key={index} to={`/coaches/${coach.id}/slots`}>
            <div className="min-w-72 min-h-80 rounded overflow-hidden shadow-lg m-4">
              <img className="w-full" src={`https://picsum.photos/seed/${coach.id}/500/300`} alt={`Coach ${coach.name}`} />
              <div className="px-6 py-4 min-h-28">
                <div className="font-bold text-xl mb-2">{coach.name}</div>
                <p className="text-gray-700 text-base">
                  Timezone: {coach.timezone}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center mt-20">
        <button onClick={scrollLeft} className="mr-4 bg-[#2c3e50] hover:bg-[#1e2b37] text-[#fff] font-bold py-2 px-4 rounded inline-flex items-center">
          <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" data-name="Left"/></svg>
        </button>
        <button onClick={scrollRight} className="ml-4 bg-[#2c3e50] hover:bg-[#1e2b37] text-[#fff] font-bold py-2 px-4 rounded inline-flex items-center">
          <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/></svg>
        </button>
      </div>
    </div>
  );
};

export default CoachesCarousel;
