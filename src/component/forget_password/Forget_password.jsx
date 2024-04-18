
import "./forget_password.css";
import { useState } from "react";
import {
  Box,
  FormControl,
  Input,
  Spacer,
  Image,
  Flex,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  Stack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import loginImage from "../../assets/login-image.png";
import { Link} from "react-router-dom";

function Forget_password() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading effect
  const toast = useToast();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

// const handleForget = ()=>{
//   Navigate("/signup")
// } 


  const handleLogin = async () => {
    if (!username) {
      toast({
        title: "Username Required",
        description: "Please enter a username.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!password) {
      toast({
        title: "Password Required",
        description: "Please enter a password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Set loading state to true when starting API call
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Reset fields and loading state after successful login
      setUsername("");
      setPassword("");
      setIsLoading(false);

      // You can also add logic here to redirect the user after successful login
      // For example: history.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      // Reset loading state on error
      setIsLoading(false);
    }
  };


  const showImage = useBreakpointValue({ base: false, md: true });

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      {showImage && (
        <Box flex="1" order={{ base: "2", md: "1" }}>
          <Image
            src={loginImage}
            alt=""
            objectFit="cover"
            w="80%"
            h="80%"
            mt="10"
            ml="50"
          />
        </Box>
      )}
      <Box
        flex="1"
        order={{ base: "1", md: "2" }}
        p={{ base: 4, md: 12 }}
        mt="2%"
      >
        <Stack spacing={4}>
          <FormControl id="username" isRequired>
            <div className="logo-image">
              {/* <img src={logo} alt="Logo" /> */}
            </div>
            <h1>APP NAME</h1>
            <Spacer />
            <Input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <Spacer />
          <FormControl id="password" isRequired>
            <InputGroup>
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={handlePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            colorScheme="blue"
            className="submitbtn"
            onClick={handleLogin}
            isLoading={isLoading} // Show loading spinner when isLoading is true
            loadingText="Logging In..."
          >
            Reset
          </Button>
          <p className="donthave-account">
            Don&apos;t have an account?{" "}
            <Link className="signup-link" to="/signup">
              Click here
            </Link>
          </p>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Forget_password;
