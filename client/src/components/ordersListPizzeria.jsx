import React, { useEffect, useState } from 'react';

function OrdersListPizzeria({}) {
  const [dataOrderList, setDataOrderList] = useState([]);
  
  // fetch orderlist api
  useEffect(() => {
    fetch('http://localhost:8081/orderlist')
      .then((res) => res.json())
      .then((data) => {
        setDataOrderList(data);
      })
      .catch((error) => {
        console.error('Error fetching initial orders:', error);
      });

    // Set up WebSocket connection
    const socket = new WebSocket('ws://localhost:8082'); // Replace with your backend WebSocket URL

    // Event listener for WebSocket connection open
    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    // Event listener for WebSocket messages
    socket.onmessage = (event) => {
      const updatedData = JSON.parse(event.data);
      setDataOrderList(updatedData);
    };

    // Clean up the WebSocket connection on unmount
    return () => {
      socket.close();
    };
  }, []);
  
  // order done (delete) button
  const orderDone = (orderId) => {
    // DELETE request
    fetch(`http://localhost:8081/orderlist/${orderId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        setDataOrderList(data);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm bg-white">
              <thead className="border-b font-medium">
                <tr>
                  <th scope="col" className="border px-6 py-4">Pizza</th>
                  <th scope="col" className="border px-6 py-4">Price</th>
                  <th scope="col" className="border px-6 py-4">Table number</th>
                  <th scope="col" className="border px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {dataOrderList.map((order) => (
                  <tr key={order.id}>
                    <td className="border px-6 py-4">{order.pizzaName}</td>
                    <td className="border px-6 py-4">{order.pizzaPrice}</td>
                    <td className="border px-6 py-4">{order.tableNumber}</td>
                    <td className="border px-6 py-4">
                      <button className='bg-green-500 hover:bg-green-400 transition duration-200 text-white px-4 py-2 rounded-md' onClick={() => orderDone(order.id)}>Done</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersListPizzeria;
