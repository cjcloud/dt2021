import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TeamCard from "./teamcard";

require("react-dom");
window.React2 = require("react");
console.log(window.React1 === window.React2);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function FormRow() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <TeamCard></TeamCard>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          {" "}
          <TeamCard></TeamCard>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          {" "}
          <TeamCard></TeamCard>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

const Gridded = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={1}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
};

export default function NestedGrid() {
  return <Gridded />;
}
