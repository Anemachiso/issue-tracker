'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {

    const {status, data: session} = useSession();
    const currentPath = usePathname();
    console.log(currentPath);

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ]
  return (
    <nav className='border-b mb-5 px-5 py-3'>
        <Container>
            <Flex justify="between">
                <Flex align="center" gap="3">
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
                </Flex>
                <Box>
                    { status === 'authenticated' && (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <button className="cursor-pointer rounded-full border-none bg-transparent p-0">
                                    <Avatar
                                    src={session.user!.image!}
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
                                        {session.user!.email}
                                    </Text> 
                                </DropdownMenu.Label>
                                <DropdownMenu.Item>
                                    <Link href="/api/auth/signout">Log Out</Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    )}
                    { status === 'unauthenticated' && (<Link href="/api/auth/signin">Login</Link>) }
                </Box>
            </Flex>
        </Container>
    </nav>
  )
}

export default NavBar