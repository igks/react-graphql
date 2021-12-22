//===================================================
// Date         : 04 Nov 2021
// Author       : I Gusti Kade Sugiantara
// Description  : Main page to show main activity
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS_QUERY } from "../../services/pokemon-query";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";

const Dashboard = () => {
  const history = useHistory();

  const { loading, data } = useQuery(GET_POKEMONS_QUERY);

  const loadDetail = (id) => {
    history.push("/detail", { id: id });
  };

  if (loading)
    return (
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Loading...</h1>
      </Box>
    );

  return (
    <>
      <Container>
        <Typography variant="h2" mb={5}>
          Pokemon Collections
        </Typography>
        <Grid container spacing={4}>
          {data.pokemons.map((pokemon) => (
            <Grid key={pokemon.id} item xs={6} md={3}>
              <Card>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={pokemon.image}
                    alt=""
                    height={200}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {pokemon.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "end",
                      alignItems: "end",
                      width: "100%",
                    }}
                  >
                    <Button size="small" onClick={() => loadDetail(pokemon.id)}>
                      Learn More
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
