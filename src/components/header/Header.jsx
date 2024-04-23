import React from 'react'
import Container from '../Container'
import { Link, NavLink } from 'react-router-dom'
// import LogoutBtn from './LogoutBtn'

function Header() {
    const authStatus = false
    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        },
        // {
        //   name: 'Login',
        //   slug: "/login",
        //   active: !authStatus
        // },
        // {
        //   name: 'Signup',
        //   slug: "/signup",
        //   active: !authStatus
        // },
      ]
    return (
        <header className='bg-white gray-950 sm:border-b border-slate-500 text-2xl'>
            <Container>
                <nav className='sm:flex justify-between py-3  '>

                    <div className='flex justify-center text-2xl sm:ml-2 mb-2 sm:mb-0 font-bold'>
                        <Link to={'/'}>Test Shala </Link>
                    </div>
                        
                    <div className='flex justify-center border-y pb-1 sm:pb-0 border-slate-500 sm:border-y-0'>
                        <ul className='flex sm:ml-auto'>
                        {navItems.map((menu)=>(
                            menu.active ?
                            (<NavLink key={menu.name} to={menu.slug} className={({isActive})=>`${isActive?'text-yellow-500':''}`}>
                                <li className='mx-3 text-xl hover:text-yellow-500 duration-300'>
                                    {menu.name}
                                </li>
                            </NavLink>)
                            : null
                        ))}
                            {/* {authStatus && <LogoutBtn/>} */}
                        </ul>
                    </div>

                </nav>
            </Container>
        </header>
    )
}

export default Header