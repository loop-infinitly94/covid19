import React, { Component } from 'react';
import axios from 'axios';
import Table from './table';
import LoadingOverlay from 'react-loading-overlay';
import * as lib from './lib'

const columns = [
    { id: 'totalCases', label: 'Total Cases', minWidth: 30 },
    { id: 'newCases', label: 'New Cases', minWidth: 30 },
    { id: 'activeCases', label: 'Active Cases', minWidth: 30 },
    { id: 'criticalCases', label: 'Critical Cases', minWidth: 30 },
    { id: 'recovered', label: 'Recovered Cases', minWidth: 30 },
    { id: 'newDeaths', label: 'New Deaths', minWidth: 30 },
    { id: 'totalDeaths', label: 'Total Deaths', minWidth: 30 },
    { id: 'time', label: 'Time', minWidth: 30 }
];

class CountryHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableRow: [],
            summaryData: {},
            isLoading: true,
            tableOrigRow: [],
            country:'',
            isLoading:false
        }
    }

    componentDidMount(){
        // console.log(this.props)
        // var country = this.props.currentCountry.toLowerCase();
        this.setState({country: this.props.currentCountry.toLowerCase()})
        var country = this.props.currentCountry.toLowerCase();
        var currentDate = lib.formatDateT(new Date())
        this.setState({isLoading: true})
        axios.get("https://covid-193.p.rapidapi.com/history?day="+currentDate+"&country="+country, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "d57969ed8amsh05ce00a7d1d6949p1fc6d8jsn2cff508d63aa"
            }
        }).then((response)=>{

            if(response.status === 200){
                this.setState({summaryData: response.data.response})
                this.setDataForTable();
            }
        })
    }

    componentDidUpdate(prevState, prevProps){
        // console.log(prevState, prevProps, this.state)

        if(this.state.country !== this.props.currentCountry.toLowerCase()){
        // console.log(prevProps, 'prePRops', this.state, 'state', this.props, 'propsthis')
            this.setState({country: this.props.currentCountry.toLowerCase()})
            var country = this.props.currentCountry.toLowerCase();
            var currentDate = lib.formatDateT(new Date())
            
            this.setState({country: this.props.currentCountry.toLowerCase()})
        this.setState({isLoading: true})

            axios.get("https://covid-193.p.rapidapi.com/history?day="+currentDate+"&country="+country, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "d57969ed8amsh05ce00a7d1d6949p1fc6d8jsn2cff508d63aa"
                }
            }).then((response)=>{
    
                if(response.status === 200){
                    this.setState({summaryData: response.data.response})
                    this.setDataForTable();
                }
            })
        }
    }

    setDataForTable(){
        var tempArray = [];
        this.state.summaryData.map((eachCountry) => {
            // var largest = eachCountry;
            tempArray.push(this.createData(eachCountry))
        })
        // tempArray.sort(this.compare);
        this.setState({tableRow: tempArray})
        this.setState({tableOrigRow: tempArray})
        this.setState({isLoading: false})
    }

    createData(eachData) {
        // var tempObj = {};
        // console.log(eachData.cases.active)
        // for (const key in eachData) {
        //     if (eachData.hasOwnProperty(key)) {
        //         const element = eachData[key];
        //         tempObj[key] = element
        //     }
        // }
        // var Country = eachData.country, NewConfirmed = eachData.NewConfirmed, TotalCases =  eachData.cases.total, NewDeaths = eachData.NewDeaths, TotalDeaths = eachData.TotalDeaths, NewRecovered = eachData.NewRecovered, TotalRecovered = eachData.TotalRecovered, slug = eachData.Slug;
        if(eachData.country === "All"){
            this.setState({worldSummary: eachData})
        }
        var country = eachData.country;
        var totalCases = eachData.cases.total;
        var newCases = eachData.cases.new;
        var activeCases = eachData.cases.active;
        var criticalCases = eachData.cases.critical;
        var recovered = eachData.cases.recovered;
        var newDeaths = eachData.deaths.new === null ? '' : eachData.deaths.new;
        var totalDeaths = eachData.deaths.total;
        var time = eachData.time;

        return {
            country,
            totalCases,
            newCases,
            activeCases,
            criticalCases,
            recovered,
            newDeaths,
            totalDeaths,
            time
        };
    }

    getCurrentSelectedRow(row, setSelected){
        
        
    }

    render() {
        return (
            <LoadingOverlay
            active={this.state.isLoading}
            spinner
            text='Loading your content...'
            >
            <div>
               {!this.state.isLoading ?  <Table rows = {this.state.tableRow} columns = {columns} getCurrentSelectedRow = {this.getCurrentSelectedRow.bind(this)} defaultSort = {"totalCases"} pagination = {5}/> : null}
            </div>
            </LoadingOverlay>
        );
    }
}

export default CountryHistory;