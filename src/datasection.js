import React, { Component } from 'react';
import axios from 'axios'
import LoadingOverlay from 'react-loading-overlay';

import Table from './table';
import WorldDetails from './worlddetails';
import CountryDetails from './dialog';
import CountrySelect from './search';


const columns = [
    { id: 'Country', label: 'Country', minWidth: 170 },
    { id: 'TotalConfirmed', label: 'Total Cases', minWidth: 100 },
    { id: 'NewConfirmed', label: 'New Cases', minWidth: 100 },
    { id: 'NewDeaths', label: 'New Deaths', minWidth: 100 },
    { id: 'TotalDeaths', label: 'Total Deaths', minWidth: 100 },
    { id: 'NewRecovered', label: 'Newly Recovered', minWidth: 100 },
    { id: 'TotalRecovered', label: 'Total Recovered', minWidth: 100 },
    
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
            searchValue: ''
        }
        this.Today = new Date();
        var temp  = new Date();
        temp.setDate(temp.getDate() - 1);
        this.Yesterday = (temp);
    }

    componentDidMount(){
        
        this.setState({isLoading: true})
        
        axios.get("https://api.covid19api.com/summary", requestOptions).then((response) => {
            // console.log(response);
            if(response.status === 200){
                this.setState({summaryData: response.data})
                this.setDataForTable();
            }
        })

        this.refreshData()
        
        
        
    }

    refreshData(){
        var self = this;
        setInterval(() => {
            // self.setState({isLoading: true})
            axios.get("https://api.covid19api.com/summary", requestOptions).then((response) => {
            // console.log(response);
            if(response.status === 200){
                self.setState({summaryData: response.data})
                self.setDataForTable();
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
        this.state.summaryData.Countries.map((eachCountry) => {
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
        for (const key in eachData) {
            if (eachData.hasOwnProperty(key)) {
                const element = eachData[key];
                tempObj[key] = element
            }
        }
        // var Country = eachCountry.Country, NewConfirmed = eachCountry.NewConfirmed, TotalConfirmed =  eachCountry.TotalConfirmed, NewDeaths = eachCountry.NewDeaths, TotalDeaths = eachCountry.TotalDeaths, NewRecovered = eachCountry.NewRecovered, TotalRecovered = eachCountry.TotalRecovered, slug = eachCountry.Slug;
        return tempObj;
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
        console.log(row, 'asd')
        var Today = this.formatDateT(this.Today);
        var Yesterday = this.formatDateT(this.Yesterday);
        axios.get("https://api.covid19api.com/country/"+row.Slug+"/status/confirmed/live?from="+Yesterday+"&to="+Today, requestOptions).then((response) => {
            console.log(response);
            if(response.status === 200){
                // self.setState({summaryData: response.data})
                // self.setDataForTable();
                this.setState({countryData: response.data})
                this.buildEachCountryTable()
            }
        })
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
        this.setState({countryTableRow: []})
    }

    onChangeSearch(value){
        console.log(value)
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
                if(eachRow.Country.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) > -1){
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
                {this.state.countryTableRow.length > 0 ? <CountryDetails rows = {this.state.countryTableRow} columns = {countryColumn} tableSelection = {this.state.tableSelection} onCloseDialog = {this.onCloseDialog.bind(this)} currentRow = {this.state.currentRow}/> : null}
                {!this.state.isLoading ? <div className = "Container">  
                    <WorldDetails details = {this.state.summaryData.Global}/>
                    <CountrySelect onChangeSearch = {this.onChangeSearch.bind(this)}/>
                    <Table rows = {this.state.tableRow} columns = {columns} getCurrentSelectedRow = {this.getCurrentSelectedRow.bind(this)} defaultSort = {"TotalConfirmed"}/>
                </div> : null}
            </LoadingOverlay>
        );
    }
}

export default DataSection;