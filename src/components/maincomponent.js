import React,{Component}  from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import Menu from './MenuComponent'
import Footer from './FooterComponent'
import Detail from './DishDetailComponent';
import Header from './HeaderComponent'
 
import Home from './HomeComponent'


import Contact from './ContactUsComponent';
import About from './AboutUsComponent';
import {connect} from 'react-redux';


import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component 
{
  
  constructor(props)
  {
    super(props)

   
  }




  render(){

    const HomePage= ()=>{
      return(
        <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
      )
    }

    const DishWithId = ({match}) => {
      return(
          <Detail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
    
    
    return (
    <div className='App'>
      {/* <Navbar dark color='primary'>
        <div className='container'>
          <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar> */}
      <Header/>
      {/* <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)} />
      <Detail dish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]}/> */}

      <Switch>
        <Route path='/home' component={HomePage} />
        <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
        <Route exact path='/contactus' component={Contact}/>
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route path='/aboutus' component={()=><About leaders={this.props.leaders}/>}/>
        <Redirect to="/home" />
        
      </Switch>
      <Footer/>
    </div>
    
    
  );
}
}

export default withRouter(connect(mapStateToProps)(Main));;
