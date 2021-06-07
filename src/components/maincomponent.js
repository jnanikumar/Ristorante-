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
import {postFeedback,fetchLeaders,postComment,fetchDishes,fetchComments,fetchPromos} from '../redux/ActionCreator'

import {Switch,Route,Redirect,withRouter} from 'react-router-dom';

import {actions } from 'react-redux-form'
import {TransitionGroup,CSSTransition,Transition } from 'react-transition-group'


const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}


const mapDispatchToProps=(dispatch)=>({
  postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedback:()=>{dispatch(actions.reset('feedback'))},
  fetchComments: () => { dispatch(fetchComments())},
  fetchPromos: () => { dispatch(fetchPromos())},
  fetchLeaders: () => { dispatch(fetchLeaders())},
  postFeedback:(values)=>{dispatch(postFeedback(values))}

  
})



class Main extends Component 
{
  
  constructor(props)
  {
    super(props)

   
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  




  render(){

    const HomePage= ()=>{
      return(
        <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              
              promosLoading={this.props.promotions.isLoading}
              promosErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading={this.props.leaders.isLoading}
              leadersErrMess={this.props.leaders.errMess}/>
      )
    }

    const DishWithId = ({match}) => {
      return(
          <Detail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess} 
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}  />
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
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
      <Switch location={this.props.location}>
        <Route path='/home' component={HomePage} />
        <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
        <Route exact path='/contactus' component={()=><Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedback}/>}/>
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route path='/aboutus' component={()=><About leaders={this.props.leaders}/>}/>
        <Redirect to="/home" />
        
      </Switch>
      </CSSTransition>
      </TransitionGroup>
      <Footer/>
    </div>
    
    
  );
}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));;


