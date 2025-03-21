import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// export default function Header() {
//   const { currentUser } = useSelector((state) => state.user);
//   return (
//     <header className='bg-slate-200 shadow-md'>
//       <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
//        <Link to='/'> {/*going to the homepage without refreshing */}
//       <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
//         <span className='text-slate-500'>Eco</span>
//         <span className='text-slate-700'>Tots</span>
//       </h1>
//       </Link>
//       <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
//         <input type="text" placeholder="Search..." className='bg-transparent
//         focus:outline-none w-24 sm:w-64'
//         />
//         <FaSearch className='text-slate-600' />
//       </form>
//       <ul className='flex gap-4'>
//         <Link to = '/'>
//         <li className='hidden sm:inline text-slate-700 hover:underline'>
//           Home</li>
//           </Link>
//           <Link to= '/about'>
//         <li className='hidden sm:inline text-slate-700 hover:underline'>
//           About</li>
//           </Link>

//           <Link to='/profile'>
//           { currentUser ? (
//             <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />

//           ) : (
//             <li className=' text-slate-700 hover:underline'> Sign in</li>
//           )}
//           </Link>
//       </ul>
//       </div>
     
//     </header>
//   )
// }

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
   const navigate = useNavigate();
   const handleSubmit = (e) => {
     e.preventDefault();
     const urlParams = new URLSearchParams(window.location.search);
     urlParams.set('searchTerm', searchTerm);
     const searchQuery = urlParams.toString();
     navigate(`/search?${searchQuery}`);
   };
 
   useEffect(() => {
     const urlParams = new URLSearchParams(location.search);
     const searchTermFromUrl = urlParams.get('searchTerm');
     if (searchTermFromUrl) {
       setSearchTerm(searchTermFromUrl);
     }
   }, [location.search]);

  return (
    <header className='bg-gradient-to-r from-pink-100 to-yellow-100 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'> {/*going to the homepage without refreshing */}
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-pink-500'>Eco</span>
            <span className='text-yellow-500'>Tots</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-white p-3 rounded-lg flex items-center'>
          <input
            type="text"
            placeholder="Search..."
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
          <FaSearch className='text-pink-500' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-yellow-600 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>  
            <li className='hidden sm:inline text-yellow-600 hover:underline'>
              About
            </li>
          </Link>

          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='text-yellow-600 hover:underline'>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
