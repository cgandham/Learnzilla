import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import NavBar from '../NavBar';
import GradeAnalytics from '../Grades/GradeAnalytics';
import { Link } from 'react-router-dom';
import { Navbar,Nav, NavItem } from 'react-bootstrap' ;
import Sidebar from '../SideBar/SideBar';

import { connect } from 'react-redux';
import { getCourseAssigns } from '../../store/actions/grade.action';

class ViewGrades extends Component {

  constructor(props){
    super(props);


}
componentDidMount() {
   //this.props.getCoursesGrades(localStorage.getItem("roleid"));
   
}

handleClick = (event) => {

   
  if (event.target.classList.contains('export')){
    this.exportTableToCSV();

  }

}

exportTableToCSV() {
  let filename = 'Student-scores.csv';
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
    let data ={};
    let homeWorks = [];
    if(this.props.courseAssignScores){
     homeWorks = this.props.courseAssignScores.filter(x=>x.id != "");
    
    data.scores = this.props.courseAssignScores.filter(x=>x.id != "").map( (x)=>{ return x.studentFinalScore});
    data.categories = this.props.courseAssignScores.filter(x=>x.id != "").map( (x)=>{ return x.studentName});
    

    }
    
    
homeWorks= [
      {
        "id":"5fd97cfa2e2da92eb4786g89",
        "studentFinalScore":"90",
        "studentName": "student1"
      },
      {
       "id":" 5fd97cfa2e2da92eb49db7f1",
       "studentFinalScore":"0",
       "studentName": "student2"
     }
    ]
    data.scores = homeWorks.filter(x=>x.id != "").map( (x)=>{ return x.studentFinalScore});
data.categories = homeWorks.filter(x=>x.id != "").map( (x)=>{ return x.studentName});
    return (
      <>
        <NavBar />
        <Navbar className="sidebar">
              <Navbar.Collapse>
                <Sidebar />
              </Navbar.Collapse>
        </Navbar>
        <>
        <a href="https://arcane-depths-71476.herokuapp.com/" class="btn btn-info btn-lg todo">
              <span class="glyphicon glyphicon glyphicon-bookmark"></span> ADD TODO</a>
        <a onClick={this.handleClick} href="#" class="btn btn-info btn-lg export">
          <span class="glyphicon glyphicon-download-alt"></span> Export
        </a>
         <div className="btn btn-info btn-lg analytics"> 
         <Link to= {{
                        pathname: "/analytics",
                        aboutProps: {
                            data: data
                             }
                    }}>
                        <span className="glyphicon glyphicon-signal"></span> Analytics 
          </Link>
          
         </div>
         <br />
         <h1>Assignment Scores</h1>
         <br />
         <div className="assignTable">
         <Table responsive striped condensed hover >
            <thead>
              <tr>
                <th> </th>
                <th> Student ID</th>
                <th> Student Name </th>
                <th> Student Score  </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {homeWorks.map((c) => {
                return <tr>
                  <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
                  <td> {c.id}</td>
                  <td> {c.studentName}</td>
                  <td> {c.studentFinalScore}</td>
                  <td> 
                      
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
    grades: state.grades.coursesGrades 
})
};

export default connect(reduxProps, { getCourseAssigns })(ViewGrades);