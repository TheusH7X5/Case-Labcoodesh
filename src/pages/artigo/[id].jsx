import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { baseUrl } from "./../../assets/baseUrl";
import axios from "axios";
import { Header } from "../../components/HeaderPages";
import Head from "next/head";
import { format, utcToZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";
import { NextSeo } from "next-seo";

const Artigo = ({ dados }) => {
  const utcDate = dados.published;
  const timeZone = "America/Sao_Paulo";

  const date = utcToZonedTime(utcDate, timeZone);
  const formattedDate = format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });

  console.log(dados);

  return (
    <>
      <Head>
        <title>{dados.title}</title>
        <meta name="title" content={dados.title} />
        <meta name="atomik:ads-provider" content={"google"} />
        <meta name="ampUrl" content={`${dados.link}/amp`} />
        <meta name="description" content={dados.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="key1, key2, key3" />
        <meta property="og:title" content={dados.title} />
        <meta property="og:type" content={"article"} />
        <meta property="og:description" content={dados.headline} />
        <meta property="og:image" content={dados.featured_media?.large} />
        <meta property="description" content={dados.excerpt} />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/MejorConSalud"
        />
        <meta property="article:author" content={dados.author.name} />
        <meta property="article:section" content={dados.categories[0].name} />
        <meta property="canonical" content={dados.link} />
      </Head>
      <NextSeo
        title={dados.title}
        description={dados.excerpt}
        canonical={dados.link}
        openGraph={{
          type: "article",
          url: dados.link,
          title: dados.title,
          description: dados.excerpt,
          article: {
            publishedTime: dados.published,
          },
          images: [
            {
              url: dados.featured_media?.large,
              width: 1200,
              height: 800,
              alt: dados.title,
            },
          ],
          site_name: dados.title,
        }}
      />
      <Header />
      <Flex mt="20px" minH="calc(100vh - 60px)" w="100%" pb="20px">
        <Box w="10%"></Box>
        <Box w="55%">
          <Heading as="h2" size="lg" color="#419FB9">
            {dados.title}
          </Heading>
          <Text mt="30px" borderLeft="5px solid #FF93C7" pl="20px">
            {dados.headline}
          </Text>
          <Image
            mt="20px"
            w="100%"
            h="auto"
            mx="auto"
            objectFit="cover"
            src={dados.featured_media?.large}
            borderRadius="sm"
            alt={dados.title}
          />
          <Text mt="10px">{dados.excerpt}</Text>
        </Box>
        <Box pl="20px" w="35%">
          <Text>
            Escrito por{" "}
            <strong style={{ color: "#265E6C" }}>
              <a target="_blank" href={dados.author.link}>
                {dados.author.name}
              </a>
            </strong>
          </Text>
          <Text fontSize="12px" mt="10px">
            Categoria: {dados.categories[0].name}
          </Text>
          <Text fontSize="12px">Data de publicação: {formattedDate}</Text>
        </Box>
      </Flex>
    </>
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


