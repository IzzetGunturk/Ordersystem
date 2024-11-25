import React from 'react'

function header() {
    
  return (
    <header className="bg-[#202020] py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white text-5xl mx-auto">
            <a href='/' className='font-Parisienne text-primary'>Order system</a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default header