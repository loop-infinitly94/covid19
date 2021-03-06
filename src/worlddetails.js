import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import * as lib from './lib'

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
    <div id = "SummaryContianer" className = "SummaryContianer">
        <div className = "Summary">
          <Card className={'SummaryContianer1' + ' ' +classes.root}>
          <CardContent className = "Cases commonCard">
            <Typography className={classes.pos}>
                  Total Cases
              </Typography>
              <Typography className={"Total"} variant="h5" component="h2">
              {lib.numberWithCommas(details.cases.total)}
              </Typography>
              
          </CardContent>
          <CardContent className = "Death commonCard">
            <Typography className={classes.pos}>
              Total Deaths
              </Typography>
              <Typography className={"Deaths"} variant="h5" component="h2">
              {lib.numberWithCommas(details.deaths.total)}
              </Typography>
              
          </CardContent>
          <CardContent className = "Recovery commonCard">
          <Typography className={classes.pos}>
            Total Recovered
            </Typography>
            <Typography className={"Recovered"} variant="h5" component="h2">
                {lib.numberWithCommas(details.cases.recovered)}
            </Typography>
              
          </CardContent>
          
          </Card>
            
            
            
        </div>
        <div className = "summary2">
          <Card className={'SummaryContianer1' + ' ' +classes.root}>
          <CardContent className = "Cases commonCard">
              <Typography className={classes.title} gutterBottom>
              Newly Confirmed
              </Typography>
              <Typography variant="h5" component="h2">
              {details.cases.new}
              </Typography>
              
          </CardContent>
          <CardContent className = "Death commonCard">
              <Typography className={classes.pos}>
              New Deaths
              </Typography>
              <Typography variant="h5" component="h2">
              {details.deaths.new}
              </Typography>
              
          </CardContent>
          {/* <CardContent className = "Recovery commonCard">
              <Typography className={classes.pos} color="textSecondary">
              NewRecovered
              </Typography>
              <Typography variant="h5" component="h2">
                  {details.cases.recovered}
              </Typography>
              
          </CardContent> */}
          
          </Card>
        </div>
        
    </div>
  );
}
