import React from 'react';


class Home extends React.Component {


    componentDidMount() {

    }

    render(){
      return (
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#"> <span className="glyphicon glyphicon-education"></span> LearnZilla</a>
              </div>
              <ul className="nav navbar-nav">
                <li className="active"><a href="#"><span className="glyphicon glyphicon-home"></span> Who We Are</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="active"><a href="/login"><span className="glyphicon glyphicon-log-in"></span> LOG IN</a></li>
              </ul>
            </div>
          </nav>
          <section>
          </section>
        </div>
      )
    }
}

export default Home;
