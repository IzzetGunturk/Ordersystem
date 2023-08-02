import { useState } from 'react';

const PlaceOrder = () => {
  const [pizzaOrder, setPizzaOrder] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pizzaOrder, customerName, address })
      });
      const data = await response.json();
      console.log(data.message);
      setOrderPlaced(true);
      setPizzaOrder('');
      setCustomerName('');
      setAddress('');
    } catch (error) {
      console.error('Er is een fout opgetreden bij het plaatsen van de bestelling:', error);
    }
  };

  return (
    <section className='flex flex-col'>
      <form className='mx-auto' onSubmit={handlePlaceOrder}>
        <h1>Plaats een bestelling</h1>
        <label>
          Pizza:
          <select value={pizzaOrder} onChange={(e) => setPizzaOrder(e.target.value)} required>
            <option value="" disabled>Kies een pizza</option>
            <option value="Pizza Margherita">Pizza Margherita</option>
            <option value="Pizza Pepperoni">Pizza Pepperoni</option>
            <option value="Pizza Funghi">Pizza Funghi</option>
          </select>
        </label>
        <br />
        <label>
          Naam klant:
          <input className='rounded border border-gray-300 focus:outline-none focus:border-indigo-500' type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
        </label>
        <br />
        <label>
          Adres klant:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Bestelling plaatsen</button>
      </form>
      {orderPlaced && <p>Bestelling geplaatst</p>}
    </section>
  );
};

export default PlaceOrder;

