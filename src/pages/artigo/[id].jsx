import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { baseUrl } from "./../../assets/baseUrl";
import axios from "axios";

const Artigo = ({ dados }) => {
  console.log(dados);

  return (
    <Box>
      <Text>{dados.title}</Text>
    </Box>
  );
};

export default Artigo;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  try {
    let response = await axios.get(`${baseUrl}/wp-json/mc/v1/posts/${id}`);
    const data = response.data;
    return {
      props: { dados: data },
    };
  } catch (error) {
    console.log(error);
  }
}
