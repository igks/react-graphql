import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_QUERY } from "../../services/pokemon-query";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Box,
  Tabs,
  Tab,
  Button,
} from "@mui/material";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Detail = () => {
  const history = useHistory();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const backToList = () => {
    history.push("/");
  };

  const loadDetail = (id) => {
    history.push("/detail", { id: id });
  };

  if (history?.location?.state?.id == null) history.push("/");
  const id = history.location.state.id;

  const { loading, data } = useQuery(GET_POKEMON_QUERY, {
    variables: { id },
  });

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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardActionArea>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={data.pokemon.image}
                    alt=""
                    height={350}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography gutterBottom variant="h4" component="div">
                      {data.pokemon.name}
                    </Typography>

                    {data.pokemon.evolutionRequirements != null && (
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontWeight: "bold",
                          fontSize: 14,
                          textAlign: "center",
                          color: "#fa8a39",
                        }}
                        my={3}
                      >
                        {data.pokemon.evolutionRequirements.amount}{" "}
                        {data.pokemon.evolutionRequirements.name} to evolve!
                      </Typography>
                    )}
                  </Box>

                  <Typography
                    color="text.secondary"
                    sx={{ fontWeight: "bold", fontSize: 16 }}
                  >
                    Classification:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.pokemon.classification}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontWeight: "bold", fontSize: 16 }}
                    mt={2}
                  >
                    Types:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.pokemon.types.length > 1
                      ? data.pokemon.types.join(" | ")
                      : data.pokemon.types[0]}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontWeight: "bold", fontSize: 16 }}
                    mt={2}
                  >
                    Dimension:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Weight: {data.pokemon.weight.minimum} -{" "}
                    {data.pokemon.weight.maximum}
                    <br />
                    Height: {data.pokemon.height.minimum} -{" "}
                    {data.pokemon.height.maximum}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontWeight: "bold", fontSize: 16 }}
                    mt={2}
                  >
                    Resistance:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.pokemon.resistant.length > 1
                      ? data.pokemon.resistant.join(", ")
                      : data.pokemon.resistant[0]}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontWeight: "bold", fontSize: 16 }}
                    mt={2}
                  >
                    Weaknesses:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.pokemon.weaknesses.length > 1
                      ? data.pokemon.weaknesses.join(", ")
                      : data.pokemon.weaknesses[0]}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontWeight: "bold", fontSize: 16 }}
                    mt={2}
                  >
                    Miscellaneous:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Flee Rate: {data.pokemon.fleeRate}
                    <br />
                    Maximum CP: {data.pokemon.maxCP}
                    <br />
                    Maximum HP: {data.pokemon.maxHP}
                    <br />
                  </Typography>
                </CardContent>
              </CardActionArea>
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
                  <Button size="small" onClick={backToList}>
                    Back to Albums
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Attacks" {...a11yProps(0)} />
                  <Tab label="Evolutions" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Typography
                  color="text.secondary"
                  sx={{ fontWeight: "bold", fontSize: 16 }}
                  mt={2}
                >
                  Fast Attacks:
                </Typography>
                {data.pokemon.attacks.fast != null &&
                  data.pokemon.attacks.fast.map((attack) => (
                    <Box mb-4 key={attack.name}>
                      <Typography variant="body2" color="text.secondary" mt={2}>
                        {attack.name} - {attack.type}
                        <br />
                        Damage:{" "}
                        <div
                          style={{
                            width: 300,
                            backgroundColor: "#93f5ad",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: 15,
                              width: (attack.damage * 300) / 100,
                              backgroundColor: "red",
                            }}
                          ></div>
                        </div>
                      </Typography>
                    </Box>
                  ))}

                <Typography
                  color="text.secondary"
                  sx={{ fontWeight: "bold", fontSize: 16 }}
                  mt={8}
                >
                  Special Attacks:
                </Typography>
                {data.pokemon.attacks.special != null &&
                  data.pokemon.attacks.special.map((attack) => (
                    <Box mb-4 key={attack.name}>
                      <Typography variant="body2" color="text.secondary" mt={2}>
                        {attack.name} - {attack.type}
                        <br />
                        Damage:{" "}
                        <div
                          style={{
                            width: 300,
                            backgroundColor: "#93f5ad",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: 15,
                              width: (300 * attack.damage) / 100,
                              backgroundColor: "red",
                            }}
                          ></div>
                        </div>
                      </Typography>
                    </Box>
                  ))}
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={2} sx={6}>
                  {data.pokemon.evolutions != null ? (
                    data.pokemon.evolutions.map((evolution) => (
                      <Grid item xs={6} key={evolution.id}>
                        <Card>
                          <CardActionArea>
                            <div style={{ textAlign: "center" }}>
                              <img
                                src={evolution.image}
                                alt={evolution.name}
                                height={200}
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                              >
                                {evolution.name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
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
                              <Button
                                size="small"
                                onClick={() => loadDetail(evolution.id)}
                              >
                                Detail
                              </Button>
                            </Box>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Typography
                      color="text.secondary"
                      sx={{ fontWeight: "bold", fontSize: 16 }}
                      mt={8}
                    >
                      No More Evolution!
                    </Typography>
                  )}
                </Grid>
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Detail;
