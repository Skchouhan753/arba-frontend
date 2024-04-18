import { Box, Flex, Spacer, Badge, IconButton, Menu, MenuButton, MenuList, MenuItem, Avatar, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { FaShoppingCart, FaUser } from "react-icons/fa";
let cartItemCount = 12;
import profilePic from '../../assets/profile.png' 
const Navbar = () => {
  // Assuming avatarImage holds the URL of the user's avatar image
  // let data = JSON.parse(localStorage.getItem("userdata")) || []
  // console.log(data)
  // const avatarImage = data.avatar; // Replace '' with the URL of the user's avatar image
  const [avatarImage, setAvatarImage] = useState(null);
  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem("userdata"));
    console.log(data);
    if(data){
      setAvatarImage(data.avatar);
    }else{
      setAvatarImage(profilePic);
    }
  },[])
  
  return (
    <Flex p="4" bg="rgb(0,170,195)" alignItems="center">
      <Box>
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
          icon={avatarImage ? <Avatar size="sm" src={avatarImage} /> : <FaUser size={24} color="white" />}
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

export default Navbar;
