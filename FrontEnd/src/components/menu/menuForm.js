import React, { useState } from 'react';


const MenuForm = () => {

     
  
  const [menu, setMenu] = useState({

    name: '',
    price: '',
    calories: '',
    image: ''
  });

  const { name, price, calories, image } = menu;

  const onChange = (e) => setMenu({ ...menu, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {'Add Menu'}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Price"
        name="price"
        value={price}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Calories"
        name="calories"
        value={calories}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value= {'Add Menu'}
          className="btn btn-primary btn-block"
        />
      </div>
     </form>
  ); }


export default MenuForm;
