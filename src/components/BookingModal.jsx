import React from 'react';

function BookingModal({ isOpen, onClose, onConfirm, event }) {
  if (!isOpen) return null;

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    var formattedMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${formattedMinutes}`

  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 w-[300px] border border-black rounded-lg ">
      <h2 className="text-xl"><strong>///TO BE IMPLEMENTED///</strong></h2>
      <h2 className="text-xl mb-2"><strong>Confirm Booking</strong></h2>
      <p>Are you sure you want to book this slot?</p>
      <p><strong>Start:</strong> {formatTime(event.start)}</p>
      <p><strong>End:</strong> {formatTime(event.end)}</p>
      <div className='flex align-center justify-center mt-4'>
        <button disabled className="mr-4" onClick={onConfirm}>Confirm</button>
        <button className="ml-4" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default BookingModal;
