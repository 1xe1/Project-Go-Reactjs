import React from 'react'
import './index.css'

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col justify-around items-center min-h-screen p-20">
      <h1 className="block-effect text-8xl md:text-9xl lg:text-10xl" style={{ '--td': '1.2s' }}>
        <div className="block-reveal" style={{ '--bc': '#4040bf', '--d': '.1s' }}>อาจารย์</div>
        <div className="block-reveal" style={{ '--bc': '#bf4060', '--d': '.5s' }}>Anusorn Chaikaew</div>
      </h1>

      <div className="info">
        <p>Change --td (total duration) to increase/decrease the time of the effect in HTML panel.</p>
      </div>

    </div>
    </div>
    
  )
}

export default HomePage