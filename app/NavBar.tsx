'use client';

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const NavBar = () => {

    const {status, data: session} = useSession();
    const currentPath = usePathname();
    console.log(currentPath);

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><FaBug /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
                <li key={link.href}>
                    <Link className={classnames({
                        'text-zinc-900': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true
                        })}
                        href={link.href}>{link.label}
                    </Link>
                </li>)}
        </ul>
        <Box>
            { status === 'authenticated' && (<Link href="/api/auth/signout">Log Out</Link>) }
            { status === 'unauthenticated' && (<Link href="/api/auth/signin">Login</Link>) }
        </Box>
    </nav>
  )
}

export default NavBar