'use client';

import {
  Cloud,
  Github,
  LogOut,
  LogIn,
  Settings,
  LayoutDashboard,
  Book,
  UserSquare,
} from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileIcon from '@/public/icons/profile-icon.svg';

interface Props {
  image: string;
  name: string;
  authStatus: boolean;
  pathname: string[];
  id: string;
}

export function ProfileDropdown(props: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-[35px] w-[35px] ml-4 border-neutral-300 dark:border-neutral-700 shadow-sm border">
          <AvatarImage
            src={props.authStatus ? props.image : ProfileIcon}
            alt="Profile Image"
            hidden={!props.image && props.authStatus}
          />

          <AvatarFallback className="text-xs">
            {props.name &&
              props.name
                .split(' ')
                .slice(0, 2)
                .map((x) => x.charAt(0).toUpperCase())
                .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        {props.authStatus && (
          <>
            <DropdownMenuLabel>{props.name || 'My account'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <Link href="/">
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={props.pathname[0] === undefined}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            <span>Home</span>
            <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {props.authStatus && (
          <DropdownMenuGroup>
            <Link href="/courses">
              <DropdownMenuItem
                className="cursor-pointer"
                disabled={props.pathname[0] === 'courses'}
              >
                <Book className="w-4 h-4 mr-2" />
                <span>Courses</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <Link href="/settings">
          <DropdownMenuItem
            className="cursor-auto"
            disabled={props.pathname[0] === 'settings'}
          >
            <Settings className="w-4 h-4 mr-2" />
            <span>Settings</span>
            <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <Link href="/profile">
          <DropdownMenuItem
            className="cursor-auto"
            disabled={props.pathname[0] === 'profile'}
          >
            <UserSquare className="w-4 h-4 mr-2" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="https://github.com/jaredthejellyfish/byteninja/tree/main">
          <DropdownMenuItem className="cursor-pointer">
            <Github className="w-4 h-4 mr-2" />
            <span>GitHub</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-auto" disabled>
          <Cloud className="w-4 h-4 mr-2" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => (props.authStatus ? signOut() : signIn())}
        >
          {props.authStatus ? (
            <LogOut className="w-4 h-4 mr-2" />
          ) : (
            <LogIn className="w-4 h-4 mr-2" />
          )}
          <span>{props.authStatus ? 'Log out' : 'Log in'}</span>
          <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
