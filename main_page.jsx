/*jshint browser: true*/
/*jshint esversion: 6 */
/*global $, jQuery, alert, ReactDOM, React*/ 
class Header extends React.Component {
    render(){
        return (
            <nav className="navbar navbar-light bg-faded">
            <a className="navbar-brand" href="#">抽奖器</a>
            </nav>
        );
    }
}

class CurrentCard extends React.Component {
    render(){
        return (<div>
            <div className="jumbotron">
                <p className="annou">X等奖，第Y位</p>
                <h1 className="currentnum">123</h1>
            </div>
            </div>
        );
    }
}
class HistoryCardList extends React.Component {
    render(){
        return (<div></div>
        );
    }
}
class MainContent extends React.Component {
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-sm-8">
                        <CurrentCard></CurrentCard>
                    </div>
                    <div className="col-sm-4">
                        <HistoryCardList></HistoryCardList>
                    </div>
                </div>
            </div>
        );
    }
}

class Page extends React.Component {
    render(){
        return (
            <div className="container">
                <Header></Header>
                <MainContent></MainContent>
            </div>
        );
    }
}
const mc = new MessageChannel();
ReactDOM.render(
        <Page tern={mc.port1}/>,
        $("#reactroot")[0]
    );

const mcsender=mc.port2;
