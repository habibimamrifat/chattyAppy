import React from "react";
import { Link } from "@heroui/link";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarItem,
    NavbarContent,
} from "@heroui/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { ThemeSwitch } from "./theme-switch";

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default function UserHomeNavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        {
            name: "Contacts",
            url: "/userHome",
        },
        {
            name: "Requests",
            url: "/userHome/requests?requestType=incomingRequest",
        },
        {
            name: "Sent Requests",
            url: "/userHome/requests?requestType=outgoingRequest",
        },
        {
            name: "Profile",
            url: "/userHome/viewMyProfile",
        },
        {
            name: "All Friends",
            url: "/userHome/viewAllFriends",
        },
        {
            name: "People You May Know",
            url: "/userHome/viewAllUser",
        },
        {
            name: "Log Out",
            url: "/userHome/logOut",
        },
    ];

    return (
        <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">CHATTY APPY</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">CHATTY APPY</p>
                </NavbarBrand>

                <NavbarItem>
                    <Link color="foreground" href="/userHome">
                        Contacts
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link color="foreground" href="/userHome/requests?requestType=incomingRequest">
                        Requests
                    </Link>
                </NavbarItem>

                <NavbarItem isActive>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered">SEE MORE</Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Action event example">

                            {/* Iterating Over Other Items */}
                            {menuItems.slice(2).map((item) => (
                                <DropdownItem key={item.url}>
                                    <Link
                                        href={item.url}
                                        className={`w-full block ${item.name === "Log Out" ? "text-red-500" : "text-gray-800"}`}
                                    >
                                    {item.name}
                                    </Link>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>


            </NavbarContent>

            <NavbarContent justify="end">
                <ThemeSwitch />
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        <Link
                            className="w-full"
                            color={index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"}
                            href={item.url}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
