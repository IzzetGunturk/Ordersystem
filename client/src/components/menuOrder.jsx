import React, { useState } from 'react';
import Pizza from '../assets/pizza1.jpg';

function menuOrder() {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPizzas, setSelectedPizzas] = useState([]);
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
  const addToCart = (pizza) => {
    setSelectedPizzas([...selectedPizzas, pizza]);
    setTotalPrice(totalPrice + parseFloat(pizza.price.replace('€', '').replace(',', '.')));
  };

  // delete from cart button
  const deleteFromCart = (pizzaToRemove) => {
    const updatedPizzas = selectedPizzas.filter((pizza) => pizza !== pizzaToRemove);
    setSelectedPizzas(updatedPizzas);
    setTotalPrice(totalPrice - parseFloat(pizzaToRemove.price.replace('€', '')));
  };

  // order placing button fetch api
  const orderPlacing = () => {
    if (selectedPizzas == 0) {
      setErrorMessage('Cart is empty.');
    }
    else {
    fetch('http://localhost:8081/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pizzaName: selectedPizzas.map(pizza => pizza.name).join(', '),
        pizzaPrice: '€' + totalPrice.toFixed(2),
        tableNumber: 4,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSelectedPizzas([]);
        setTotalPrice(0);
        setOrderPlaced(true);
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };

  const pizzaData = [
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
  ];

  return (
    <>
    <section className="px-5">
      <div className="mt-20 mb-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-[75rem] mx-auto">
        {pizzaData.map((pizza, index) => (
          <div key={index}>
            <div className="max-w-md flex flex-col justify-between h-full rounded overflow-hidden shadow-lg mx-auto">
              <img className="w-full h-44 object-cover" src={pizza.image} alt="Pizzaimage" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{pizza.name}</div>
                <div className=''>{pizza.pizzainformation}</div>
              </div>
              <div className="px-6 pt-2 pb-2">
                <div className="font-bold text-xl">{pizza.price}</div>
                <button
                  className='mt-7 mb-5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 transition duration-200 text-white rounded-md'
                  onClick={() => addToCart(pizza)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='sticky bottom-0 flex pb-10'>
        <button className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-md mx-auto" onClick={() => openModal()}>
          Check orders €{totalPrice.toFixed(2)}
        </button>
      </div>
    </section>

    {modalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 px-5">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-lg max-w-[75rem] w-96 p-5 z-10 overflow-y-scroll max-h-96">
        <div className='flex justify-end sticky top-0'>
          <button
            className="bg-black text-white py-2 px-4 rounded-md transition duration-200 "
            aria-label='Close' onClick={closeModal}>
            Close
          </button>
        </div>
       
        <div className='mb-4'>
          <div>
            <h2 className="text-xl text-primary font-semibold">Orders:</h2>
            <ul>
              {selectedPizzas.map((pizza, index) => 
              <li className='flex flex-col' key={index}>
                <div className='flex flex-row'>
                  <p className=''>{pizza.name}</p> 
                  <p className='ml-4'>{pizza.price}</p>
                  <button className='text-red-500 ml-4' onClick={() => deleteFromCart(pizza)}>Delete</button>
                </div>
              </li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="pt-5 text-xl text-primary font-semibold">Total price:</h2>
            <p>€{totalPrice.toFixed(2)}</p>
          </div>
          <div className='mt-6'>
            <h2 className="text-xl text-primary font-semibold">Table:</h2>
            <p>4</p>
          </div>
          <div className='mt-7'>
            <button className='px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-md' onClick={orderPlacing}>Bestel!</button>
          </div>
          <div className='mt-5 text-red-600'>
            {orderPlaced && <p>Order placed!</p>}
            {errorMessage}
          </div>
        </div>
       </div>
     </div>
    )}
  </>
  )
}

export default menuOrder;
