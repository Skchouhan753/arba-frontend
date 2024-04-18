import {
  Box,
  Flex,
  Spacer,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  // Avatar,
  Button,
} from "@chakra-ui/react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
let cartItemCount = 12;
const MyNavbar = () => {
  return (
    <Flex p="4" bg="rgb(0,170,195)" alignItems="center">
      <Box>
        {/* <FaShoppingCart size={24} color="white" />
        {cartItemCount > 0 && (
          <Badge colorScheme="red" borderRadius="full" px="2" ml="1">
            {cartItemCount}
          </Badge>
        )} */}
        <Button>Logo</Button>
      </Box>
      <Spacer />
      <Menu>
        <FaShoppingCart size={24} color="white" />
        {cartItemCount > 0 && (
          <Badge colorScheme="red" borderRadius="full" px="2" ml="1">
            {cartItemCount}
          </Badge>
        )}

        <MenuButton
          as={IconButton}
          icon={<FaUser size={24} color="white" />}
          variant="outline"
          ml="5"
        />
        <MenuList>
          <MenuItem>My Store</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default MyNavbar;
