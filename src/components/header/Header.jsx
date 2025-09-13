import React from 'react'
import Container from '../Container'
import { Link, NavLink } from 'react-router-dom'
import {  BookOpen } from 'lucide-react';

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
        <Container>
            <header className="bg-white shadow-md border-b border-orange-100 mb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900"><Link to={'/'}>TestShala </Link></h1>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            {navItems.map((menu) => (
                                menu.active ?
                                    (<NavLink key={menu.name} to={menu.slug} className={({ isActive }) => `${isActive ? 'text-yellow-500' : ''}`}>
                                        <span className='text-gray-600 hover:text-orange-600 transition-colors'>
                                            {menu.name}
                                        </span>
                                    </NavLink>)
                                    : null
                            ))}
                        </nav>
                    </div>
                </div>
            </header>
        </Container>
    )
}

export default Header