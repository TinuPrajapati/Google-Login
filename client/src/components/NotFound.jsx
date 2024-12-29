import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div class="flex flex-col items-center w-full h-full border-2 border-custom2 bg-white rounded-lg">
            <h1 class="text-[120px] font-extrabold text-gray-700">404</h1>
            <p class="text-2xl font-medium text-gray-600 mb-6">Page Not Found</p>
            <Link to="/login" className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out active:scale-90">
                Go to Login
            </Link>
        </div>
    )
}

export default NotFound