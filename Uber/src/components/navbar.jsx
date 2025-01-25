import React from 'react'
import '../output.css'

const Navbar = () => {
    return (
        <>
            <div className='navbar flex justify-between bg-black text-white '>
                <div className="left-nav flex p-5 space-x-12">
                    <div className="uberName text-2xl ml-20">Uber</div>
                    <div className="ride">Ride</div>
                    <div className="drive">Drive</div>
                    <div className="business">Business</div>
                </div>
                <div className="right-nav flex p-5 space-x-12 mr-10 text-lg">
                    <div className="language">
                        <select className='bg-black text-white rounded' name="language" id="lang_id" >
                            <option value="English">Eng</option>
                            <option value="Hindi">Hin</option>
                        </select>
                    </div>
                    <div className="help">Help</div>
                    <div className="profile">Aman</div>
                </div>
            </div>
        </>
    )
}

export default Navbar