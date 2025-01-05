import React, { useState } from 'react';
import Pizza from '../assets/pizza1.jpg';

function menuOrder() {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // open modal button
  const openModal = () => {
    setModalOpen(true);
  };

  // close modal button
  const closeModal = () => {
    setModalOpen(false);
    setOrderPlaced(false)
  };

  // add to cart button
  const addToCart = (item) => {
    setSelectedItems([...selectedItems, item]);
    setTotalPrice(totalPrice + parseFloat(item.price.replace('€', '').replace(',', '.')));
  };

  // delete from cart button
  const deleteFromCart = (itemToRemove) => {
    const updatedItems = selectedItems.filter((item) => item !== itemToRemove);
    setSelectedItems(updatedItems);
    setTotalPrice(totalPrice - parseFloat(pizzaToRemove.price.replace('€', '')));
  };

  // order placing button fetch api
  const orderPlacing = () => {
    if (selectedItems == 0) {
      setErrorMessage('Cart is empty.');
    }
    else {
    fetch('http://localhost:8081/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemsName: selectedItems.map(pizza => pizza.name).join(', '),
        itemsPrice: '€' + totalPrice.toFixed(2),
        tableNumber: 4,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSelectedItems([]);
        setTotalPrice(0);
        setOrderPlaced(true);
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };

  const itemsData = [
    {
      image: Pizza,
      name: 'Pizza Margharita',
      pizzainformation: 'Tomato sauce, mozzarella cheese, fresh basil, olive oil, and salt.',
      price: '€15,00'
    },
    {
      image: Pizza,
      name: 'Pizza Pepperoni',
      pizzainformation: 'Tomato sauce, mozzarella cheese, pepperoni (spicy sausage), olives, and oregano.',
      price: '€15,00'
    },
    {
      image: Pizza,
      name: 'Pizza Funghi',
      pizzainformation: 'Tomato sauce, mozzarella cheese, mushrooms, olive oil, and oregano.',
      price: '€15,00'
    },
    {
      image: Pizza,
      name: 'Pizza Quattro Formaggi',
      pizzainformation: 'Tomato sauce, a mix of four cheeses (such as mozzarella, gorgonzola, Parmesan, and goat cheese), olive oil, and basil.',
      price: '€15,00'
    },
    {
      image: Pizza,
      name: 'Pizza Prosciutto e Funghi',
      pizzainformation: 'Tomato sauce, mozzarella cheese, ham, mushrooms, olive oil, and oregano.',
      price: '€15,00'
    },
    {
      image: Pizza,
      name: 'Pizza Diavola',
      pizzainformation: 'Tomato sauce, mozzarella cheese, spicy salami, red peppers, olive oil, and basil.',
      price: '€15,00'
    },
    {
      image: Pizza,
      name: 'Pizza Hawaii',
      pizzainformation: 'Tomato sauce, mozzarella cheese, ham, pineapple, olive oil, and oregano.',
      price: '€15,00'
    },
    {
      image: Pizza,
      name: 'Pizza Capricciosa',
      pizzainformation: 'Tomato sauce, mozzarella cheese, ham, mushrooms, artichokes, olives, oregano, and olive oil.',
      price: '€15,00'
    },
    {
      image: Pizza,
      name: 'Pizza Tonno',
      pizzainformation: 'Tomato sauce, mozzarella cheese, tuna, red onions, black olives, oregano, and olive oil.',
      price: '€15,00'
    },
  ];

  const drinks = [
    {
      name: 'Cola',
      price: '€2,00'
    },
    {
      name: 'Fanta',
      price: '€2,00'
    },{
      name: 'Pepsi',
      price: '€2,00'
    },
    {
      name: 'Sprite',
      price: '€2,00'
    },{
      name: 'Redbull',
      price: '€2,00'
    }
  ]

  return (
    <>
    <section className="md:px-16 px-6">
      <div className='flex flex-col mt-16'>
        <h1 className='mx-auto p-3 text-5xl font-Parisienne'>Menu</h1>
        <p className='mx-auto text-lg font-Poppins'>Bon appetit!</p>
      </div>
      <div className="mt-16 mb-4 mx-auto flex flex-col gap-8 max-w-[1800px]">
        <div className='flex flex-col'>
          <h1 className='mx-auto p-3 text-5xl font-Parisienne'>Pizza's</h1>
        </div>
          {itemsData.map((item, index) => (
            <div key={index} className="flex md:flex-row flex-col items-center gap-4 border-b border-[#B7B7B7] pb-4">
              <img className="w-20 h-20 object-cover rounded-xl" src={item.image} alt="Pizzaimage" />

              <div className='flex md:flex-row flex-col gap-9 items-center w-full'>
                <div className='flex flex-col flex-grow justify-between md:items-start items-center'>
                  <h2 className='font-semibold text-[24px] font-Poppins'>{item.name}</h2>
                  <p className='font-Poppins md:text-left text-center'>{item.pizzainformation}</p>
                </div>
                <p className='font-poppins font-semibold text-[24px]'>{item.price}</p>
                <button onClick={() => (addToCart(item))} 
                  className='mx-auto flex flex-row gap-2 px-[10px] py-[10px] m-5 bg-buttoncolor hover:bg-[#3d3d3d] transition duration-200 text-primary font-semibold rounded-md cursor-pointer'>
                    Order 
                    <svg className='fill-primary' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                      <path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z"/>
                    </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-16 mb-4 mx-auto flex flex-col gap-8 max-w-[1800px]">
        <div className='flex flex-col'>
          <h1 className='mx-auto p-3 text-5xl font-Parisienne'>Drinks</h1>
        </div>
          {drinks.map((drink, index) => (
            <div key={index} className="flex md:flex-row flex-col items-center gap-4 border-b border-[#B7B7B7] pb-4">

              <div className='flex md:flex-row flex-col gap-9 items-center w-full'>
                <div className='flex flex-col flex-grow justify-between'>
                  <h2 className='font-semibold text-[24px] font-Poppins'>{drink.name}</h2>
                </div>
                <p className='font-poppins font-semibold text-[24px]'>{drink.price}</p>
                <button onClick={() => (addToCart(drink))} 
                  className='mx-auto flex flex-row gap-2 px-[10px] py-[10px] m-5 bg-buttoncolor hover:bg-[#3d3d3d] transition duration-200 text-primary font-semibold rounded-md cursor-pointer'>
                    Order 
                    <svg className='fill-primary' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                      <path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z"/>
                    </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className='sticky bottom-0 flex pb-10'>
        <button className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-400 transition duration-200 text-white rounded-md mx-auto" onClick={() => openModal()}>
          Check orders €{totalPrice.toFixed(2)}
        </button>
      </div>
    </section>

    {modalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 px-5">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-lg max-w-[75rem] w-[50rem] p-5 z-10 overflow-y-scroll max-h-96">
        <div className='flex justify-end sticky top-0'>
          <button
            aria-label='Close' onClick={closeModal}>
            <svg className='fill-black' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
       
        <div className='mb-4'>
          <div>
            <h2 className="text-xl text-black font-semibold">Orders:</h2>
            <ul className='flex flex-col gap-2'>
              {selectedItems.map((items, index) => 
              <li className='flex flex-col border-b border-[#B7B7B7] pb-2' key={index}>
                <div className='flex flex-row justify-between flex-grow'>
                  <p className=''>{items.name}</p> 
                 
                  <div className='flex flex-row gap-6'>                  
                    <p className='ml-4'>{items.price}</p>
                    <button className='text-red-500 ml-4' onClick={() => deleteFromCart(items)}>
                      <svg className='fill-red-600' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              )}
            </ul>
            <hr></hr>
          </div>
          <div className='mt-5'>
            <h2 className="text-xl text-black font-semibold">Table:</h2>
            <p>4</p>
            <hr></hr>
          </div>
          <div>
            <h2 className="pt-5 text-xl text-black font-semibold">Total price:</h2>
            <p>€{totalPrice.toFixed(2)}</p>
            <hr></hr>
          </div>
          <div className='mt-7'>
            <button className='px-4 py-2 bg-buttoncolor hover:bg-[#3d3d3d] transition duration-200 text-primary font-semibold rounded-md flex flex-row gap-2' onClick={orderPlacing}>
              Finish 
              <svg className='fill-primary' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z"/>
              </svg>
            </button>
          </div>
          <div className='mt-5'>
            {orderPlaced && <p>Order placed!</p>}
            <p className='text-red-600'>{errorMessage}</p>
          </div>
        </div>
       </div>
     </div>
    )}
  </>
  )
}

export default menuOrder;
