import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import { getOrganiser, loginOrganiser } from '../../firebaseConfig';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function SignIn({ providers }) {
    const initialFormData = Object.freeze({ email: '', password: '', });
    const [formData, updateFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const userCtx = useContext(AuthContext)
    const handleChange = (e) => {
        if(error) setError('')
        updateFormData({
            ...formData, [e.target.name]: e.target.value.trim(),
        });
    };
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await loginOrganiser(formData.email, formData.password);
            await getOrganiser(res.uid)
            userCtx.setOrganizer()
        } catch (error) {
            setError('Invalid Username/Password')
        }
        setLoading(false)
    };

    useEffect(() => {
        if (userCtx.currentUser) {
            navigate("/events")
        }
    })
    return (
        <div>
            <div className="bg-gray-800 r min-h-screen flex flex-col text-white">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form onSubmit={handleSubmit} className=" px-6 py-8 bg-black bg-opacity-20 backdrop-blur-lg rounded shadow-md w-full">
                        <h1 className="mb-8 text-3xl font-semibold text-center">Log In</h1>
                        <input
                            type="email"
                            className="block border dark:text-black  focus:outline-none border-gray-light focus:border-green-500 w-full p-3 rounded mb-4"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email" required />

                        <input
                            type="password"
                            className="block bg-opacity-10 dark:text-black border focus:outline-none border-gray-light focus:border-green-500 w-full p-3 rounded mb-4"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password" required />
                        <div className="text-center -mt-1 mb-2"><span className="text-red-500 " >
                            {error}
                        </span></div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 text-center py-3 rounded disabled:bg-indigo-500 bg-indigo-600 hover:bg-indigo-700 text-white hover:bg-green-dark focus:outline-none my-1"
                        >
                            {loading ? <> <AiOutlineLoading3Quarters className=" animate-spin text-lg " /> <span className=''>Logging In...</span></> : 'Login'}</button>
                        <a href="/resetpassword" ><a className="  text-blue-500" >Forgot password?</a></a>
                    </form>


                </div>
            </div>
        </div >
    )
}


export default SignIn