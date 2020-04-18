import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WorldDetils(props) {
    var details = props.details;
// console.log(detials)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
        <div className = "Summary">
            <Typography className={classes.pos} color="textSecondary">
                Total Cases
            </Typography>
            <Typography className={"Total"} variant="h5" component="h2">
            {details.TotalConfirmed}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            Total Deaths
            </Typography>
            <Typography className={"Deaths"} variant="h5" component="h2">
            {details.TotalDeaths}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            Total Recovered
            </Typography>
            <Typography className={"Recovered"} variant="h5" component="h2">
                {details.TotalRecovered}
            </Typography>
        </div>
        <Card className={classes.root}>
        <CardContent className = "Cases commonCard">
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            Newly Confirmed
            </Typography>
            <Typography variant="h5" component="h2">
            {details.NewConfirmed}
            </Typography>
            
        </CardContent>
        <CardContent className = "Death commonCard">
            <Typography className={classes.pos} color="textSecondary">
            New Deaths
            </Typography>
            <Typography variant="h5" component="h2">
            {details.NewDeaths}
            </Typography>
            
        </CardContent>
        <CardContent className = "Recovery commonCard">
            <Typography className={classes.pos} color="textSecondary">
            NewRecovered
            </Typography>
            <Typography variant="h5" component="h2">
                {details.NewRecovered}
            </Typography>
            
        </CardContent>
        
        </Card>
    </div>
  );
}
