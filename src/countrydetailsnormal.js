import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import * as lib from './lib';
import CountryHistory from './countryhistory';

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

export default function CountryNormal(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    // console.log(props);
    
    if(Object.keys(props.currentRow).length > 0){
    return (
        <div>
         <div className = "SummaryContianer">
           <Card className={'SummaryContianer1' + ' ' +classes.root}>
            <CardContent className = "Cases commonCard">
              
                <Typography className={"Total"} variant="h5" component="h2">
                {props.currentRow.country}
                </Typography>
                
            </CardContent>
            </Card>
          <div className = "Summary">
            <Card className={'SummaryContianer1' + ' ' +classes.root}>
            <CardContent className = "Cases commonCard">
              <Typography className={classes.pos}>
                    Total Cases
                </Typography>
                <Typography className={"Total"} variant="h5" component="h2">
                {lib.numberWithCommas(props.currentRow.totalCases)}
                </Typography>
                
            </CardContent>
            <CardContent className = "Death commonCard">
              <Typography className={classes.pos}>
                Total Deaths
                </Typography>
                <Typography className={"Deaths"} variant="h5" component="h2">
                {lib.numberWithCommas(props.currentRow.totalDeaths)}
                </Typography>
                
            </CardContent>
            <CardContent className = "Recovery commonCard">
            <Typography className={classes.pos}>
              Total Recovered
              </Typography>
              <Typography className={"Recovered"} variant="h5" component="h2">
                  {lib.numberWithCommas(props.currentRow.recovered)}
              </Typography>
                
            </CardContent>
            
            </Card>
              
              
              
          </div>
          <div className = "summary2">
            <Card className={'SummaryContianer1' + ' ' +classes.root}>
            <CardContent className = "Cases commonCard">
                <Typography className={classes.title}  gutterBottom>
                Newly Confirmed
                </Typography>
                <Typography variant="h5" component="h2">
                {props.currentRow.newCases}
                </Typography>
                
            </CardContent>
            <CardContent className = "Death commonCard">
                <Typography className={classes.pos} >
                New Deaths
                </Typography>
                <Typography variant="h5" component="h2">
                {props.currentRow.newDeaths}
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
          <div className = "countrySummary">
              <div className = "datePicker">
                <span> Show Summary of Date - </span>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat = {"yyyy-MM-dd"}
                maxDate = {new Date()}
              />
              </div>
              <div className="summaryDate">
              <p>Per Day Update {props.currentRow.country} - {lib.formatDateT(selectedDate)}</p>
              </div>
              <CountryHistory currentCountry = {props.currentRow.country} selectedDate = {selectedDate}/>
            </div>
      </div>
  );
}
  else{
      return null
  }
}
