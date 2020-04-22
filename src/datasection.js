import React, { Component } from 'react';
import axios from 'axios'
import LoadingOverlay from 'react-loading-overlay';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Table from './table';
import WorldDetails from './worlddetails';
import CountryDetails from './dialog';
import CountryNormal from './countrydetailsnormal'
import CountrySelect from './search';
import { useLocation } from 'react-router-dom'
import RssSection from './rsssection';
import HandleUrl from './handleurl'


const columns = [
    { id: 'country', label: 'Country', minWidth: 170 },
    { id: 'totalCases', label: 'Total Cases', minWidth: 30 },
    { id: 'newCases', label: 'New Cases', minWidth: 30 },
    { id: 'activeCases', label: 'Active Cases', minWidth: 30 },
    { id: 'criticalCases', label: 'Critical Cases', minWidth: 30 },
    { id: 'recovered', label: 'Recovered Cases', minWidth: 30 },
    { id: 'newDeaths', label: 'New Deaths', minWidth: 30 },
    { id: 'totalDeaths', label: 'Total Deaths', minWidth: 30 }
    
];





var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

class DataSection extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            isLoadingCountry: true,
            summaryData: [],
            tableRow: [],
            countryData: [],
            countryTableRow: [],
            tableSelection: '',
            currentRow:{},
            searchValue: '',
            worldSummary: {},
            countrySlug:[]
        }
        this.Today = new Date();
        var temp  = new Date();
        temp.setDate(temp.getDate() - 1);
        this.Yesterday = (temp);
    }

    componentDidMount(){
        
        this.setState({isLoading: true})
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

        // axios.get("https://covid-19-statistics.p.rapidapi.com/provinces?iso=CHN", {
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        //         "x-rapidapi-key": "d57969ed8amsh05ce00a7d1d6949p1fc6d8jsn2cff508d63aa"
        //     }
        // }).then(response => {
        //     console.log(response)
        // })
          
        axios.get("https://covid-193.p.rapidapi.com/countries", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "d57969ed8amsh05ce00a7d1d6949p1fc6d8jsn2cff508d63aa"
            }
        }).then((response) => {
            // console.log(response)
            if(response.status === 200){
                this.setState({countrySlug: response.data.response, isLoadingCountry: false})
            }
        })
        // https://bing.com/covid/data
        axios.get("https://covid-193.p.rapidapi.com/statistics", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "d57969ed8amsh05ce00a7d1d6949p1fc6d8jsn2cff508d63aa"
            }
        }).then((response) => {
            // console.log(response);
            if(response.status === 200){
                this.setState({summaryData: response.data.response})
                this.setDataForTable();
            }
        })

        this.refreshData()
        
        
        
    }

    refreshData(){
        var self = this;
        setInterval(() => {
            // self.setState({isLoading: true})
            axios.get("https://covid-193.p.rapidapi.com/statistics", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "d57969ed8amsh05ce00a7d1d6949p1fc6d8jsn2cff508d63aa"
            }
            }).then((response) => {
                console.log(response);
                if(response.status === 200){
                    this.setState({summaryData: response.data.response})
                    this.setDataForTable();
                }
            })
        }, 10 * 60 * 1000);
    }

    // compare(a, b) {
    //     // Use toUpperCase() to ignore character casing
    //     const bandA = a.TotalConfirmed;
    //     const bandB = b.TotalConfirmed;
      
    //     let comparison = 0;
    //     if (bandA < bandB) {
    //       comparison = 1;
    //     } else if (bandA > bandB) {
    //       comparison = -1;
    //     }
    //     return comparison;
    // }

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

        return {
            country,
            totalCases,
            newCases,
            activeCases,
            criticalCases,
            recovered,
            newDeaths,
            totalDeaths,
        };
    }

    getCurrentSelectedRow(row, setSelected){
        
        this.setState({tableSelection: setSelected, currentRow: row})
        localStorage.setItem('currentRow', JSON.stringify(row))
        var elmnt = document.getElementById("DataSource");
        elmnt.scrollIntoView();
        // console.log(row, 'asd')
        // var Today = this.formatDateT(this.Today);
        // var Yesterday = this.formatDateT(this.Yesterday);

        // var currentSelected = [];
        // this.state.countrySlug.map(slug => {
        //     console.log(slug.Country, row.country, slug.Country.indexOf(row.country))
        //     if(slug.Country.indexOf(row.country) > -1){
        //         currentSelected.push(slug)
        //     }
        // })
        // console.log(currentSelected, 'asd')

        // axios.get("https://api.covid19api.com/country/"+row.Slug+"/status/confirmed?from="+Yesterday+"&to="+Today, requestOptions).then((response) => {
        //     console.log(response);
        //     if(response.status === 200){
        //         // self.setState({summaryData: response.data})
        //         // self.setDataForTable();
        //         this.setState({countryData: response.data})
        //         this.buildEachCountryTable()
        //     }
        // })
    }

    buildEachCountryTable(){
        var tempArray = [];
        this.state.countryData.map((eachData) => {
            // var largest = eachCountry;
            tempArray.push(this.createData(eachData))
        })
        this.setState({countryTableRow: tempArray})
    }
    
    onCloseDialog(){
        this.setState({countryTableRow: [], currentRow: {}})
    }

    onChangeSearch(value){
        // console.log(value)
        if(value !== null){
            this.setState({searchValue: value.label})
        }
        else if(value === null ){
            this.setState({searchValue: ""})

        }
        else{
            this.setState({searchValue: value})

        }
    }

    // static getDerivedStateFromProps(props, state){
    //     if(state.searchValue !== this.state.searchValue){
    //         return{
    //             tableRow: this.filterTable()
    //         }
    //     }
    // }

    componentDidUpdate(prevState, prevProps){
        console.log(prevState, prevProps, this.state)
        if(prevProps.searchValue !== this.state.searchValue){
            this.setState({tableRow: this.filterTable()})
        }
    }

    filterTable(){
        var tempArray = [];
        var tempArrayData = [...this.state.tableRow];
        
        if(this.state.searchValue !== ""){
            this.state.tableRow.map((eachRow) => {
                if(eachRow.country.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) > -1){
                    tempArray.push(eachRow)
                }
            })
            // console.log(tempArrayData, this.state.tableRow)
            return tempArray
        } 
        else{
            // console.log(tempArrayData, this.state.tableRow)
            return this.state.tableOrigRow

        }
        // this.setState({tableRow: tempArray})
    }

    render() {
        // console.log(this.state, this.props)
        // let location = useLocation();
        // console.log(this.state.countrySlug, window.location.pathname.split('/'), this.state.countrySlug.includes(window.location.pathname.split('/')[1]));
        var currentRow = (localStorage.getItem('currentRow')) !== null ?  JSON.parse(localStorage.getItem('currentRow')) : this.state.currentRow;
        var currentPath =  currentRow.country === window.location.pathname.split('/')[1]? window.location.pathname : '/404';
        // console.log(currentPath);

        // return <span>Path : {location.pathname}</span>
        return (
            <LoadingOverlay
            active={this.state.isLoading}
            spinner
            text='Loading your content...'
            >

                {/* {Object.keys(this.state.currentRow).length > 0 ? <CountryDetails onCloseDialog = {this.onCloseDialog.bind(this)} currentRow = {this.state.currentRow} tableSelection = {this.state.tableSelection}/> : null} */}
                {!this.state.isLoading ? 
                <div id = "DataSource" >
                {window.location.pathname === '/' ||  window.location.pathname === '/All'? 
                <div><Route exact path={'/'} render={() => { 
                    return (<div className = "Container">
                        <WorldDetails details = {this.state.worldSummary}/>
                        <div className = "comboSelect"><CountrySelect  countrySlug = {this.state.countrySlug}  onChangeSearch = {this.onChangeSearch.bind(this)}/></div>
                        <span className="summaryDate">
                        <p>World Detials</p>
                        </span>
                    <Table rows = {this.state.tableRow} columns = {columns} getCurrentSelectedRow = {this.getCurrentSelectedRow.bind(this)} defaultSort = {"totalCases"} pagination = {10}/></div>)
                }}/>
                <Route exact path={'/All'} render={() => { 
                    return (<div className = "Container">
                        <WorldDetails details = {this.state.worldSummary}/>
                        <div className = "comboSelect"><CountrySelect  countrySlug = {this.state.countrySlug}  onChangeSearch = {this.onChangeSearch.bind(this)}/></div>
                        <span className="summaryDate">
                        <p>World Detials</p>
                        </span>
                    <Table rows = {this.state.tableRow} columns = {columns} getCurrentSelectedRow = {this.getCurrentSelectedRow.bind(this)} defaultSort = {"totalCases"} pagination = {10}/></div>)
                }}/></div>
                :
                <Route exact path={currentPath} render={() => {
                    return (<div className = "Container">  
                    <CountryNormal currentRow = {(localStorage.getItem('currentRow')) !== null ?  JSON.parse(localStorage.getItem('currentRow')) : this.state.currentRow }/>
                    
                    
                    <div className = "comboSelect"><CountrySelect  countrySlug = {this.state.countrySlug}  onChangeSearch = {this.onChangeSearch.bind(this)}/></div>
                    <span className="summaryDate">
                            <p>World Detials</p>
                    </span>
                    <Table rows = {this.state.tableRow} columns = {columns} getCurrentSelectedRow = {this.getCurrentSelectedRow.bind(this)} defaultSort = {"totalCases"} pagination = {10}/>
                </div>)}} /> }
                
               
                </div>
                :
                 null}
                 <Route path = {'/newsfeeds'} key="newsFeed" component={RssSection}/>

<Route path = {'/404'} key="404PAGE" component={HandleUrl}/>
            </LoadingOverlay>
        );
    }
}

export default DataSection;