import React from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Bell, TableProperties } from 'lucide-react';

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = true;
    return (
        <div className="flex flex-col h-screen gap-8">
            <header className=" py-2 flex flex-col gap-2">
                <div className="flex flex-col w-full h-fit fixed top-0 bg-white z-10">
                    <div className="px-10 my-2 flex flex-row justify-between items-center">
                        <span className="font-bold text-[20px] pl-10">Task Manager</span>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                        onClick={() => navigate('/')}
                                    >
                                        Home
                                    </NavigationMenuLink>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                        onClick={() => navigate('my-tasks')}
                                    >
                                        My tasks
                                    </NavigationMenuLink>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Search
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <Button onClick={() => navigate('/task')}>New task</Button>
                                <Button onClick={() => navigate('/board')}>
                                    <TableProperties size={'15px'} />
                                </Button>
                                <Button>
                                    <Bell size={'15px'} />
                                </Button>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="w-full border-b-[.5px] border-gray-300 blur-[1px]"></div>
                </div>
            </header>
            <div className="mt-10">{isAuthenticated ? <Outlet /> : <Navigate to="/login" replace={true} />}</div>
        </div>
    );
};

export default Layout;
