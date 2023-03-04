import {
  Card,
  CardBody,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const GridComponent = ({ infos }) => {
  return (
    <Grid
      position="relative"
      top="-120px"
      templateColumns="repeat(4, 1fr)"
      gap={8}
    >
      {infos.map((dado) => {
        return (
          <>
            {/* onClick={dado.link} */}
            {dado.length === 0 || dado === null ? (
              <Text>Não existem artigos relacionados ao termo pesquisado!</Text>
            ) : (
              <>
                <Link href={`/artigo/${dado.id}`}>
                  <GridItem mb="20px" mx="auto" w="95%" h="380px">
                    <Card cursor="pointer" key={dado.id} maxW="sm" h="380px">
                      <CardBody>
                        {dado.featured_media?.large == null ? (
                          <Center w="100%" h="175px">
                            <Spinner />
                          </Center>
                        ) : (
                          <Image
                            objectFit="cover"
                            src={dado.featured_media?.large}
                            borderRadius="sm"
                            alt={dado.title}
                          />
                        )}

                        <Stack mt="6" spacing="3">
                          <Heading size="sm">{dado.title}</Heading>
                          <Text>{dado.title}</Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                    </Card>
                  </GridItem>
                </Link>
              </>
            )}
          </>
        );
      })}
    </Grid>
  );
};

export default GridComponent;
