import React,{Component} from 'react'
import {Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle,BreadcrumbItem,Breadcrumb} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { render } from 'react-dom';
import {Link} from 'react-router-dom'

function Detail(props){
    



 
        

        if (props.dish !=null){
            const comment=props.comments.map((comment)=>{
                return( 
                     <div>
                        
                          {comment.comment}<br></br>
                          --{comment.author},<br></br>
                          {comment.date}<br></br><br></br>
                      </div>
                     
                  )
                  
              })

        return(
            
            
        <div className='container'>
            <div className='row'>
            <Breadcrumb>
                
                 <BreadcrumbItem ><Link to='/menu'>Menu</Link></BreadcrumbItem>
                 <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            </div>
        <div className='row'>
            <div className='col-12 col-md-5 ml-1'>
            <Card width='50%'>
                    <CardImg width='100%' src={props.dish.image} alt={props.dish.name}/>
                    <CardBody>
                    <CardTitle >{props.dish.name}</CardTitle>
                    <CardText>{props.dish.description}</CardText>
                    </CardBody>
            </Card>
            
            </div>
            <div className='col-12 col-md-5 ml-2'>
                    <strong>comments</strong>
                {comment}
            </div>

        </div>
        </div>
        )
        }

        else{
            return (<div></div>)
        }
    }




    



export default Detail