import React, { Component } from 'react';
import axios from 'axios'
import LoadingOverlay from 'react-loading-overlay';

import Table from './table';
import WorldDetails from './worlddetails';
import CountryDetails from './dialog';
import CountrySelect from './search';


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

const countryColumn = [
    { id: 'Province', label: 'Province', minWidth: 30 },
    { id: 'City', label: 'City', minWidth: 30 },
    { id: 'Cases', label: 'Cases', minWidth: 30 },
    { id: 'Date', label: 'Date', minWidth: 100 }
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
          
        axios.get("https://covid-193.p.rapidapi.com/countries", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "d57969ed8amsh05ce00a7d1d6949p1fc6d8jsn2cff508d63aa"
            }
        }).then((response) => {
            console.log(response)
            if(response.status === 200){
                this.setState({countrySlug: response.data.response})
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
            console.log(response);
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
        var tempObj = {};
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

    formatDateT(date){
        var today = date;
        var dd = today.getDate();

        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        return yyyy + '-' + mm + '-' + dd + "T00:00:00Z";
        console.log(today);
    }

    getCurrentSelectedRow(row, setSelected){
        
        this.setState({tableSelection: setSelected, currentRow: row})
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
        // console.log(prevState, prevProps, this.state)
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
        // console.log(this.state.tableRow)
        return (
            <LoadingOverlay
            active={this.state.isLoading}
            spinner
            text='Loading your content...'
            >
                {Object.keys(this.state.currentRow).length > 0 ? <CountryDetails onCloseDialog = {this.onCloseDialog.bind(this)} currentRow = {this.state.currentRow} tableSelection = {this.state.tableSelection}/> : null}
                {!this.state.isLoading ? <div className = "Container">  
                    <WorldDetails details = {this.state.worldSummary}/>
                    <CountrySelect  countrySlug = {this.state.countrySlug}  onChangeSearch = {this.onChangeSearch.bind(this)}/>
                    <Table rows = {this.state.tableRow} columns = {columns} getCurrentSelectedRow = {this.getCurrentSelectedRow.bind(this)} defaultSort = {"totalCases"}/>
                </div> : null}
            </LoadingOverlay>
        );
    }
}

export default DataSection;