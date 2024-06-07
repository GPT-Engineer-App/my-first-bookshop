import React, { useState } from "react";
import { Container, Text, VStack, Input, Button, Box, HStack, Image, IconButton, useToast } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash, FaCreditCard } from "react-icons/fa";

const books = [
  { id: 1, title: "Book One", price: 10, img: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2slMjBvbmV8ZW58MHx8fHwxNzE3NzU0MDc2fDA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, title: "Book Two", price: 15, img: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2slMjB0d298ZW58MHx8fHwxNzE3NzU0MDc2fDA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 3, title: "Book Three", price: 20, img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2slMjB0aHJlZXxlbnwwfHx8fDE3MTc3NTQwNzd8MA&ixlib=rb-4.0.3&q=80&w=1080" },
];

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState([]);
  const toast = useToast();

  const handleLogin = () => {
    if (username === "user" && password === "1234") {
      setLoggedIn(true);
    } else {
      toast({
        title: "Invalid credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const addToCart = (book) => {
    setCart([...cart, book]);
    toast({
      title: `${book.title} added to cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const removeFromCart = (book) => {
    setCart(cart.filter((item) => item.id !== book.id));
    toast({
      title: `${book.title} removed from cart`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handlePayment = () => {
    toast({
      title: "Payment successful",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setCart([]);
  };

  if (!loggedIn) {
    return (
      <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Login</Text>
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin}>Login</Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={4}>
      <Text fontSize="3xl" mb={4}>
        My First Book
      </Text>
      <HStack spacing={8} align="start">
        <VStack spacing={4} align="start">
          <Text fontSize="2xl">Books</Text>
          {books.map((book) => (
            <Box key={book.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} width="100%">
              <HStack spacing={4}>
                <Image src={book.img} boxSize="100px" objectFit="cover" />
                <VStack align="start">
                  <Text fontSize="xl">{book.title}</Text>
                  <Text>${book.price}</Text>
                  <Button leftIcon={<FaShoppingCart />} onClick={() => addToCart(book)}>
                    Add to Cart
                  </Button>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
        <VStack spacing={4} align="start">
          <Text fontSize="2xl">Shopping Cart</Text>
          {cart.length === 0 ? (
            <Text>No items in cart</Text>
          ) : (
            cart.map((book) => (
              <Box key={book.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} width="100%">
                <HStack spacing={4}>
                  <Image src={book.img} boxSize="100px" objectFit="cover" />
                  <VStack align="start">
                    <Text fontSize="xl">{book.title}</Text>
                    <Text>${book.price}</Text>
                    <IconButton aria-label="Remove" icon={<FaTrash />} onClick={() => removeFromCart(book)} />
                  </VStack>
                </HStack>
              </Box>
            ))
          )}
          {cart.length > 0 && (
            <Button leftIcon={<FaCreditCard />} colorScheme="teal" onClick={handlePayment}>
              Pay Now
            </Button>
          )}
        </VStack>
      </HStack>
    </Container>
  );
};

export default Index;
