import React,{Component} from 'react'
import {Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle,BreadcrumbItem,Breadcrumb,Button,Modal,Label,Row,Col,ModalHeader,ModalFooter,ModalBody} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { render } from 'react-dom';
import {Link} from 'react-router-dom'
import { Errors,Control,LocalForm } from 'react-redux-form';
import {Loading} from './LoadingComponent'
import {baseUrl} from '../shared/baseUrls'
import  { FadeTransform, Fade, Stagger } from 'react-animation-components';




class Detail extends Component{
    

    constructor(props){
        super(props)
        this.state={
            isopen:false,
            // props:this.props,

        }

        this.toggle=this.toggle.bind(this)
        this.handlesubmition=this.handlesubmition.bind(this)
    }


    toggle=()=>{
        this.setState({isopen:!this.state.isopen})
    }


    handlesubmition=(val)=>{
        // console.log(JSON.stringify(val))
        // alert(JSON.stringify(val))

        this.props.postComment(this.props.dish.id,val.rating,val.author,val.textarea)
        this.toggle()

    }

    

    render(){

        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        
     const CommentForm=()=>{
         return (
             <>
            <Button color="white" size="lg" active onClick={this.toggle} ><span><i className="fa fa-pencil"></i></span>  submit comment</Button>
            <Modal isOpen={this.state.isopen}  >
                <ModalHeader toggle={this.toggle}>submit comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={this.handlesubmition} >
                    <Label htmlFor="rating">Rating</Label>
                    <Row className="form-group">
                                
                                <Col md={12}>
                                    <Control.input type='number' model=".rating" id="rating" name="rating" min='0' max='5' placeholder='Rating' />
                                    
                                </Col>
                    </Row>
                    <Label htmlFor="author">Your Name</Label>
                    <Row className="form-group">
                                
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author" placeholder='Your Name'
                                    show="touched"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                   />
                                   <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 numbers',
                                        maxLength: 'Must be 15 numbers or less',
                                        }}/>
                                    
                                </Col>
                            </Row>
                            <Label htmlFor="textarea" >Comment</Label>
                            <Row className="form-group">
                                
                                <Col md={12}>
                                    <Control.textarea model=".textarea" id="textarea" name="textarea"  rows='7'/>
                                    
                                </Col>
                            </Row>
                            <Label htmlFor="lastname" ></Label>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 0}}>
                                    <Button type="submit" color="primary">
                                    submit
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            
            </>
         )
     }


     if (this.props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{this.props.errMess}</h4>
                </div>
            </div>
        );
    }
 
        

    else if (this.props.dish !=null){
            
            const comment=this.props.comments.map((comment)=>{
                return( 
                     <Fade in>
                     <div>
                        
                          {comment.comment}<br></br>
                          --{comment.author},<br></br>
                          {comment.date}<br></br><br></br>
                      </div>
                      </Fade>
                     
                  )
                  
              })
              

        return(
            
            
        <div className='container'>
            <div className='row'>
            <Breadcrumb>
                
                 <BreadcrumbItem ><Link to='/menu'>Menu</Link></BreadcrumbItem>
                 <BreadcrumbItem>{this.props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            </div>
        <div className='row'>
            <div className='col-12 col-md-5 ml-1'>
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card width='50%'>
                    <CardImg width='100%' src={baseUrl+this.props.dish.image} alt={this.props.dish.name}/>
                    <CardBody>
                    <CardTitle >{this.props.dish.name}</CardTitle>
                    <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
            </Card>
            </FadeTransform>
            
            </div>
            <div className='col-12 col-md-5 ml-2'>
                    <strong>comments</strong>

                <Stagger in>
                {comment}
                </Stagger>
                <CommentForm/>

                
            </div>

        </div>
        </div>
        )
        }

        else{
            return (<div></div>)
        }
    }
}




    



export default Detail