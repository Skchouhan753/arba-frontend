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
import loginImage from "../../assets/signup-image.png";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import "../login/login.css";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullname] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading effect
  const toast = useToast();
  const navigate = useNavigate();
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    if (
      !fullName ||
      !userName ||
      !email ||
      !password ||
      !confirmPassword ||
      !avatar
    ) {
      toast({
        title: "All Fields Required",
        description: "Please fill in all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        description: "Please make sure the passwords match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Set loading state to true when starting signup request
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://arba-backend-server.onrender.com/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            userName,
            email,
            password,
            avatar,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const data = await response.json();
      console.log("Signup successful:", data);

      // Show success toast message
      toast({
        title: "Signup Successful",
        description: "Your account has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
      // Optionally, you can redirect to another page upon successful signup
    } catch (error) {
      console.error("Signup error:", error);

      // Display an error toast message
      toast({
        title: "Signup Error",
        description: "An error occurred during signup.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // Reset fields and loading state
    setIsLoading(false);
    setFullname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAvatar("");
  };

  const showImage = useBreakpointValue({ base: false, md: true });

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      {showImage && (
        <Box flex="1" order={{ base: "2", md: "1" }}>
          <Image src={loginImage} alt="" h="100%" mt="10" ml="20" />
        </Box>
      )}
      <Box
        flex="1"
        order={{ base: "1", md: "2" }}
        p={{ base: 4, md: 12 }}
        mt="1%"
      >
        <Stack spacing={2}>
          <FormControl id="fullname" isRequired>
            <div className="logo-image"></div>
            <h1>APP NAME</h1>
            <Spacer />
            <Input
              type="text"
              placeholder="Fullname"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
            />
          </FormControl>
          <Spacer />
          <FormControl id="username" isRequired>
            <Input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <Spacer />
          <FormControl id="email" isRequired>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="avatar" isRequired>
            <Input
              type="text"
              placeholder="Avatar link"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
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

          <Spacer />

          <FormControl id="confirm-password" isRequired>
            <InputGroup>
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleSignup}
            isLoading={isLoading} // Show loading spinner when isLoading is true
            loadingText="Signing Up..."
            mt="5"
          >
            Register
          </Button>
          <p className="alreadyhave-account">
            Already have an account?{" "}
            <Link className="signup-link" to="/">
              Login
            </Link>
          </p>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Signup;
