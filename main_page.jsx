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
                <p className="annou">{this.props.currentTier}等奖，第{this.props.currentNo}位:</p>
                <h1 className="currentnum">{this.props.currentNoS}</h1>
            </div>
            </div>
        );
    }
}

class HistoryCard extends React.Component {
    render(){
        return (<div>
                <div className="card">
                        <div className="card-block">
                            {this.props.prizeTier}等奖:{this.props.prizeGoneTo}
                        </div>
                </div>
            </div>
        );
    }
}

class HistoryCardList extends React.Component {
    render(){
        return (<div>
                <HistoryCard prizeTier="3" prizeGoneTo={this.props.history[0]}></HistoryCard>
                <HistoryCard prizeTier="3" prizeGoneTo={this.props.history[1]}></HistoryCard>
                <HistoryCard prizeTier="3" prizeGoneTo={this.props.history[2]}></HistoryCard>
                <HistoryCard prizeTier="2" prizeGoneTo={this.props.history[3]}></HistoryCard>
                <HistoryCard prizeTier="2" prizeGoneTo={this.props.history[4]}></HistoryCard>
            </div>
        );
    }
}
class MainContent extends React.Component {
    constructor() {
        super();
        this.state = {
                history : {
                    prizes: Array(6).fill("TBA")
                },
                currentNo:0,
                currentNoS:0,
                logic:new window.logicm()
        };
    }
    handleWinnerGen(winner){

    }
    handleMessage(e){
      console.log(e.data);
      (()=>{
        const popupv = number => {
          return this.state.logic.getFlashNoS(number);
        };
        if(e.data==="start-counting"){
          let updateFlash = ()=> {
            ($.proxy(c=>{
              let ncurrs=popupv(this.state.currentNo);
              //this.state.currentNoS=ncurrs;
              this.setState({currentNoS:ncurrs});
              if(this.state.logic.isFlashShouldKeep()){
                setTimeout(updateFlash, this.state.logic.getFlashInterval());
              }else{
                let nxtwinner=this.state.logic.getNextWinner();
                this.handleWinnerGen(nxtwinner);
              }

            }))();
          };
          this.state.logic.FlashStart();
          setTimeout(updateFlash, this.state.logic.getFlashInterval());
        }
      })();
    }
    calcTier(no){
      return this.state.logic.noToTier(no);
    }
    render(){
        this.props.tern.onmessage= e => {this.handleMessage(e)} ;
        return (
            <div>
                <div className="row">
                    <div className="col-sm-8">
                        <CurrentCard currentTier={(()=>{return this.calcTier(this.state.currentNo)})()} currentNo={this.state.currentNo} currentNoS={this.state.currentNoS}></CurrentCard>
                    </div>
                    <div className="col-sm-4">
                        <HistoryCardList history={this.state.history.prizes}></HistoryCardList>
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
                <MainContent tern={this.props.tern}></MainContent>
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

const sendmsg=msg=>{
  return mcsender.postMessage(msg);
};
