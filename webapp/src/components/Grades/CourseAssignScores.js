import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import NavBar from '../NavBar';
import FeedBack from './AssignFeedback';
import GradeAnalytics from './GradeAnalytics';
import { Link } from 'react-router-dom';
import { Navbar,Nav, NavItem } from 'react-bootstrap' ;
import Sidebar from '../SideBar/SideBar';

import { connect } from 'react-redux';
import { getCourseAssigns } from '../../store/actions/grade.action';
//import { getAvailableCourseAssigns } from '../../store/selectors/grade.selectors';


class CourseAssignScores extends Component {

  constructor(props) {
    super(props);

    console.log(this.props)
}

  componentDidMount() {
    let assigns = [];
    // if(localStorage.getItem("roleid") === "5fd980fe2e2da92eb49db7f7"){
    //   assigns = [
    //     "5fd981a32e2da92eb49db7f8"
    // ]

    // }
    // else{
    //   assigns =  [
    //     "5fd97f752e2da92eb49db7f4",
    //     "5fd9972ba4f11ed95cc1c108",
    //     "5fda7039dd9d461d18cc6a62",
    //     "5fda71194006ba2cb4254e3a"
    // ];
    // }

    assigns =  [
      "5fd97f752e2da92eb49db7f4",
      "5fd9972ba4f11ed95cc1c108",
      "5fda7039dd9d461d18cc6a62",
      "5fda71194006ba2cb4254e3a"
  ];
    //let /this.props.courseAssigns;
    if(assigns){
      assigns = assigns.filter(x=>x.id != "");
      assigns.map((aID)=>{
        this.props.getCourseAssigns(aID);
      });
    }
    
    
  }

   handleClick = (event) => {

   
    if (event.target.classList.contains('export')){
      this.exportTableToCSV();

    }
  }

  exportTableToCSV() {
    let filename = 'scores.csv';
    let csv = [];
    let rows = document.querySelectorAll("table tr");
  
    for (let i = 0; i < rows.length; i++) {
      let row = [];
      let cols = i===0?rows[i].querySelectorAll("th"):rows[i].querySelectorAll("td");
      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }
      csv.push(row.join(","));
    }
  
    // Download CSV file
    this.downloadCSV(csv.join("\n"), filename);
  
  }

  //Export to CSV Functions
downloadCSV(csv, filename) {
  let csvFile;
  let downloadFile;

  // CSV file
  csvFile = new Blob([csv], {
      type: "text/csv"
  });
  if (navigator.msSaveBlob) {    
      navigator.msSaveBlob(csvFile, filename);
  }
  else
  {
      downloadFile = document.createElement("a");      // Download link
      downloadFile.download = filename;// File name    
      downloadFile.href = window.URL.createObjectURL(csvFile);// Create a link to the file    
      downloadFile.style.display = "none";// Hide download link    
      document.body.appendChild(downloadFile);// Add the link to DOM   
      downloadFile.click(); // Click download link
  }
}
  

  render() {
    //pass scores to analytics tab
    let homeWorks = this.props.courseAssignScores.filter(x=>x.id != "" && x["message"] != "assignment not present");//   bordered
    let data ={};
    data.scores = this.props.courseAssignScores.filter(x=>x.id != "").map( (x)=>{ return x.assignmentscrore});
    data.categories = this.props.courseAssignScores.filter(x=>x.id != "").map( (x)=>{ return x.assignmentname});
    return (
      <>
        <NavBar />
        <Navbar className="sidebar">
              <Navbar.Collapse>
                <Sidebar />
              </Navbar.Collapse>
        </Navbar>
        <>
          <div className="btnServices">
          <a href="https://arcane-depths-71476.herokuapp.com/" class="btn btn-info btn-lg todo">
              <span class="glyphicon glyphicon glyphicon-bookmark"></span> ADD TODO</a>
            <a onClick={this.handleClick} href="#" class="btn btn-info btn-lg export">
              <span class="glyphicon glyphicon-download-alt"></span> EXPORT</a>
            <div className="btn btn-info btn-lg analytics">
              <Link to={{
                pathname: "/analytics",
                aboutProps: {
                  data: data
                }
              }}>
                <span className="glyphicon glyphicon-signal"></span> ANALYTICS </Link>
            </div>
        </div>
        
         <br />
         <h1>Assignment Scores</h1>
         <br />
         <div className="assignTable">
         <Table responsive striped condensed hover >
            <thead>
              <tr>
                <th> </th>
                <th> Assignment </th>
                <th> Submitted On </th>
                <th> Score  </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {homeWorks.map((c) => {
                return <tr>
                  <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
                  <td> {c.assignmentname}</td>
                  <td> {c.assignmentenddate}</td>
                  <td> {c.assignmentscrore}</td>
                  <td> <Button data-toggle="tooltip" data-toggle="modal" data-target="#feedbackModal" data-placement="bottom" title="See FeedBack"><span class="glyphicon glyphicon-comment"></span></Button> 
                       <FeedBack feedback={c.feedback}/>
                      
                  </td>
                </tr>

              })}
            </tbody>
          </Table>

         </div>
         </>


      </>
    );
  }

}

const reduxProps = state => {
  return ({
    courseAssignScores: state.grades.CourseAssigns //getAvailableCourseAssigns(state) 
  })
};

export default connect(reduxProps, { getCourseAssigns })(CourseAssignScores);