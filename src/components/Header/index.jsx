import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, useColorMode } from "@chakra-ui/react";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      h="60px"
      boxShadow=" rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
      justifyContent="space-between"
      px="30px"
      w="100%"
    >
      <HamburgerIcon
        color={colorMode === "light" ? "black" : "white"}
        boxSize={10}
        my="auto"
      />
      <Flex>
        <Image
          h="35px"
          my="auto"
          w="auto"
          src={colorMode === "light" ? "./logo.svg" : "./logo__reverse.svg"}
        />
        <Box
          w="1px"
          m="5px"
          borderLeft={
            colorMode === "light" ? "1px solid gray" : "1px solid white"
          }
          h="35px"
          my="auto"
        />
        <Image h="15px" my="auto" w="auto" src="./logo_as--gray.svg" />
      </Flex>
      <IconButton
        my="auto"
        bgColor={colorMode === "light" ? "white" : "#1A202C"}
        _hover={{ transition: "opacity 0.2s", opacity: 0.8 }}
        transition="opacity 0.2s"
        _active={{
          backgroundColor: colorMode === "light" ? "white" : "#1A202C",
        }}
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      />
    </Flex>
  );
};
