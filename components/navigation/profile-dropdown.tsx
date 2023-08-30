'use client';

import {
  Cloud,
  Github,
  LifeBuoy,
  LogOut,
  LogIn,
  Settings,
  LayoutDashboard,
  Book,
} from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
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
import ProfileIcon from '@/public/profile-icon.svg';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils/cn';

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
        <div className="pt-0.5">
          <Skeleton
            className="h-[32px] w-[32px] rounded-full ml-5 border-neutral-800 border"
            hidden={!!props.image || !props.authStatus}
          />

          <Image
            alt="Profile Image"
            src={props.image || ProfileIcon}
            hidden={!props.image && props.authStatus}
            className={cn(
              'rounded-full ml-5 dark:border-neutral-800 border-neutral-300 border',
              !props.authStatus && 'p-1 dark:bg-white',
            )}
            width={35}
            height={35}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        {props.authStatus && (
          <>
            <DropdownMenuLabel>{props.name || 'My account'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <Link href="/">
          <DropdownMenuItem disabled={props.pathname[0] === undefined}>
            <LayoutDashboard className="w-4 h-4 mr-2" />
            <span>Home</span>
            <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>

        {props.authStatus && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/courses">
                <DropdownMenuItem disabled={props.pathname[0] === 'courses'}>
                  <Book className="w-4 h-4 mr-2" />
                  <span>Courses</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem disabled={props.pathname[0] === 'settings'}>
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <Link href="https://github.com/jaredthejellyfish/learncode/tree/main">
          <DropdownMenuItem>
            <Github className="w-4 h-4 mr-2" />
            <span>GitHub</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem disabled>
          <LifeBuoy className="w-4 h-4 mr-2" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="w-4 h-4 mr-2" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
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
