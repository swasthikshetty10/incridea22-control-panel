import React from 'react'
import { useNavigate } from 'react-router-dom'

function LogoutBtn({auth}) {

	const navigate = useNavigate()
	const handleLogout = async () => {
		await auth.signOut()
		navigate('/')
}

	return (
		<button className='px-2 py-1  rounded-md font-semibold bg-blue-600 hover:bg-blue-800 transition-all ease-in duration-200' onClick={handleLogout}>
			Log Out
		</button>
	)
}

export default LogoutBtn