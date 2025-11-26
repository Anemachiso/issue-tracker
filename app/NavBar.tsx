'use client';

import { Skeleton } from '@/app/components';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {

  return (
    <nav className='border-b mb-5 px-5 py-3'>
        <Container>
            <Flex justify="between">
                <Flex align="center" gap="3">
                <Link href="/"><FaBug /></Link>
                <NavLinks />
                </Flex>
                <AuthStatus />
            </Flex>
        </Container>
    </nav>
  )
};

const NavLinks = () => {

    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ]

    return (
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
    </ul>)
};

const AuthStatus = () => {

    const {status, data: session} = useSession();

    if(status === 'loading') return <Skeleton width="3rem"/>;
    if(status === 'unauthenticated') 
        return <Link className='text-zinc-500' href="/api/auth/signin">Login</Link>

    return (
    <Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <button className="cursor-pointer rounded-full border-none bg-transparent p-0">
                    <Avatar
                    src={session!.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className='cursor-pointer'
                    />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text size="2">
                        {session!.user!.email}
                    </Text> 
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log Out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Box>);
}

export default NavBar