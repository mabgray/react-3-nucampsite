

import React, { Component }  from 'react';
import { Modal, ModalHeader, ModalBody,Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function  RenderCampsite({campsite}){

    return (
        <div className="col-md-5 m-1">
             <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                 
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );

}

function RenderComments({comments, addComment, campsiteId}){
       
    if(comments){
        return (
        <div className="col-md-5 m-1">
            <h4>comments</h4>
            {comments.map(comment => {
                return ( 
                    <div key={comment.id}>
                        <p>{comment.text}</p>
                        <p>{comment.author}
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </p>
                       
                    </div>
                )
            })}
             <CommentForm campsiteId={campsiteId} addComment={addComment} />
        </div>
        )
    } 
        return <div />
           
            
        
    

}



  class CommentForm extends Component {
      constructor(props){
          super(props);
          this.state = {
              isModalOpen: false
          };
          this.toggleModal = this.toggleModal.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);

      }
      toggleModal(){
         
          this.setState({
              isModalOpen: !this.state.isModalOpen
          })
      }
      handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    
    }

        render(){
            return (
                <div>
                   <Button outline onClick={this.toggleModal}>
                        <i className="fa-lg fa fa-pencil">Submit Comment</i> 
                    </Button>)
                  
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader  toggle={this.toggleModal}>Login</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                    <div className="form-group">
                                        <label htmlFor="rating">Rating</label>
                                        <Control.select
                                        className="form-control"
                                        model=".rating"
                                        name="rating"
                                        id="rating"
                                        >
                                            <option >1</option>
                                            <option >2</option>
                                            <option >3</option>
                                            <option >4</option>
                                            <option >5</option>
                                        </Control.select>
                                        
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="author">Name</label>
                                        <Control.text
                                        className="form-control"
                                        model=".author"
                                        name="author"
                                        id="author"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)

                                        }}
                                        >
                                           
                                        </Control.text>
                                        <Errors
                                         className="text-danger"
                                         model=".author"
                                         show="touched"
                                         component="div"
                                         messages={{
                                             minLength: "Name must be at least 2 characters long",
                                             maxLength: "Name must be less than 15 characters"
                                             
                                         }}
                                         />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="author">Comments</label>
                                        <Control.textarea
                                        className="form-control"
                                        model=".comments"
                                        name="comments"
                                        id="comments"
                                        placeholder="add comments here"
                                        rows="6"
                                        >
                                           
                                        </Control.textarea>
                                    </div>
                                    
                                         <Button  type="submit" color="primary">
                                        Submit
                                        </Button>
                                </LocalForm>
                            </ModalBody>

                    </Modal>
                   
                 </div>
                        
                    
            )
            
        
        }

    }
    

    


    function CampsiteInfo(props){


        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }


        
        
        if(props.campsite){
            return (
                <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
            )
        } return <div/>
    }
       
    



export default CampsiteInfo;
