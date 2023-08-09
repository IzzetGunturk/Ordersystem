import React from 'react'

function header() {
    
  return (
    <header className="bg-yellow-500 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white text-xl font-bold">
            <a href='/'>🍕 Pizza Italiano</a>
          </div>

          {/* Navigation Menu */}
          <nav className="md:flex space-x-4">
            <a href="/orderlist" className="text-white hover:text-gray-200">Admin</a>
          </nav>

        </div>
      </div>
    </header>
  )
}

export default header