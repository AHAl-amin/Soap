


import navberIcon from '../img/login_icon.png';

const Navbar = () => {
    return (
        <div className="fixed top-8 left-0 right-0 z-50 w-full">
            <div className="roboto flex justify-between items-center md:max-w-[185vh] mx-auto py-3 px-4">
                {/* Logo */}
                <div className=" flex gap-4 items-center">
                    <img src={navberIcon} alt="Logo" className="h-10 w-auto" />
                    <span className='text-[24px] font-bold font-roboto text-[#FFFFFF]'>ShipMate Ai</span>
                </div>

                {/* Buttons */}
                <div className="space-x-3">
                    <button className="text-white bg-[#0A3161] text-xl font-medium py-2 px-4 rounded-xl cursor-pointer">
                        Log In
                    </button>
                    <button className="text-[#0A3161] border border-[#0A3161] text-xl font-medium py-2 px-4 rounded-xl cursor-pointer">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
