import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import brand from "../public/logos/brand.png";

export default function App() {
  return (
    <Navbar isBordered isBlurred={false}>
      <NavbarBrand  >
        <img src={brand} alt="" />
      </NavbarBrand>
     
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

    </Navbar>
  );
}
