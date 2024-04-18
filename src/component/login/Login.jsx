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
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading effect
  const toast = useToast();
  const navigate = useNavigate()
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      const response = await fetch("https://arba-backend-server.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });
      let data = await response.json()
      // console.log(data);
      let myData = {
        token:data.token,
        fullName:data.fullName,
        avatar:data.avatar
      }
      
      localStorage.setItem("userdata",JSON.stringify(myData))
      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Reset fields and loading state after successful login
      setUsername("");
      setPassword("");
      setIsLoading(false);

      // Show success toast message
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/signup");
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
            </div>
            <h1>APP NAME</h1>
            <Spacer />
            <Input
              type="text"
              placeholder="Username"
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
            Login
          </Button>
          <p className="forgot-password">
            Don&apos;t have account?{" "}
            <Link className="forgot-link" to="/signup">
              Click here
            </Link>
          </p>
          <p className="forgot-password">
            Forgot Your Password?{" "}
            <Link className="forgot-link" to="/forget-password">
              Click here
            </Link>
          </p>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Login;
