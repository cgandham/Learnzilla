import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import NavBar from '../NavBar';
import { Navbar,Nav, NavItem } from 'react-bootstrap' ;
import Sidebar from '../SideBar/SideBar';
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class GradeAnalytics extends Component {

    constructor(props){
        super(props);
        this.state = {
          data: props.location.aboutProps.data
      }
        
    }

    render() {
        //received data from parent
        let scores = this.props.location.aboutProps.data.scores;//[93, 95, 84, 100, 76, 80]; //this.props.Scores 
        let categories = this.props.location.aboutProps.data.categories;//['Assign1', 'Assign2', 'Assign3','4','5','6'] //this.props.categories 
        let options = {
            chart: {
              type: 'spline'
            },
            title: {
              text: 'Scores'
            },
            xAxis: {
                categories: categories
            },
            series: [
              {
                data: scores
              }
            ]
          };
          //rendering chart
        return(
            <>
            <NavBar />
            <Navbar className="sidebar">
              <Navbar.Collapse>
                <Sidebar />
              </Navbar.Collapse>
           </Navbar>
            <div className="chart allChildren">
            <h1>Analytics</h1>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            
            </>
            


        );
      
    }
}

export default GradeAnalytics