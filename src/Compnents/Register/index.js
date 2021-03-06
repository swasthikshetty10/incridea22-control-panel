import React, { useState, useEffect, useContext, useRef } from 'react';
import { loginOrganiser } from '../../firebaseConfig'

function SignUp({ providers }) {
    const errorDisplay = useRef(null)
    const initialFormData = Object.freeze({ email: '', password: '', });
    const [formData, updateFormData] = useState(initialFormData);
    const handleChange = (e) => {
        updateFormData({
            ...formData, [e.target.name]: e.target.value.trim(),
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email: formData.email,
            password: formData.password
        }
    };
    return (
        <div>
            <div className="bg-gray-800 r min-h-screen flex flex-col text-white">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form onSubmit={handleSubmit} className=" px-6 py-8 bg-black bg-opacity-20 backdrop-blur-lg rounded shadow-md w-full">
                        <h1 className="mb-8 text-3xl font-semibold text-center">Register</h1>
                        <input
                            type="email"
                            className="block border dark:text-black  focus:outline-none border-gray-light focus:border-green-500 w-full p-3 rounded mb-4"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email" required />
                        <input
                            type="text"
                            className="block border dark:text-black  focus:outline-none border-gray-light focus:border-green-500 w-full p-3 rounded mb-4"
                            name="full-name"
                            onChange={handleChange}
                            placeholder="Full Name" required />
                        <select name="role" className='block border dark:text-black bg-white focus:outline-none border-gray-light focus:border-green-500 w-full p-3 rounded mb-4'>
                            <option >Jury</option>
                            <option >judge
                            </option>
                        </select>


                        <input
                            type="password"
                            className="block bg-opacity-10 dark:text-black border focus:outline-none border-gray-light focus:border-green-500 w-full p-3 rounded mb-4"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password" required />
                        <input
                            type="password"
                            className="block bg-opacity-10 dark:text-black border focus:outline-none border-gray-light focus:border-green-500 w-full p-3 rounded mb-4"
                            name="password"
                            onChange={handleChange}
                            placeholder="confirm password" required />
                        <div className="text-center"><a className="text-red-500 " ref={errorDisplay}>
                        </a></div>

                        <button
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 text-center py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white hover:bg-green-dark focus:outline-none my-1"
                        >
                            Register</button>
                        <a href="/resetpassword" ><a className="text-blue-500" ></a></a>
                    </form>
                </div>
            </div>
        </div >
    )
}


export default SignUp