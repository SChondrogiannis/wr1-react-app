import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = ( e ) => {
    e.preventDefault();
    console.log('Contact:', name, email, message );
  };

  // Dynamic parsing inputs values. For that the strange name values in the form. 
  const mappingSetters = { setName, setEmail, setMessage };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log( 'handleInputChange',name,value );
    if( mappingSetters[name] ){
      mappingSetters[name](value); 
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Contact Page for testing router</h1>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="setName" value={name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:border-black focus:outline-none sm:text-sm" placeholder=" Insert Name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email </label>
          <input type="email" name="setEmail" value={email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:border-black focus:outline-none sm:text-sm"  placeholder="Insert email" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea name="setMessage" value={message} onChange={handleInputChange}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:border-black focus:outline-none sm:text-sm"  rows="7" placeholder="Insert message" ></textarea>
        </div>
        <div className="text-right">
          <button type="submit" disabled={!name || !email || !message} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500" >Submit</button>
        </div>
      </form>
    </div>
  );
}; 

export default Contact;