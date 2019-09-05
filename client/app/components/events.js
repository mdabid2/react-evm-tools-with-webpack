import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Mailto from 'react-protected-mailto';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import {URL_ADD_EVENT} from '../config';

export default class Events extends Component { 
    constructor(props){
        super(props);
        this.state= {
            events:[]
        }
    };
    deleteEvent = (index) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure want to delete this event: \n\n'+this.state.events[index].eventname,
            buttons: [
                {
                    label: 'YES',
                    onClick: () => {
                        const id = this.state.events[index]._id;
                        axios.delete(URL_ADD_EVENT+id)
                        .then(_d_ => { 
                            this._updateEvents(index, null);
                        });
                    }
                },
                {
                    label: 'NO',
                    onClick: () => {
                        return false;
                    }
                }
            ]
          })
        
    };
    publishedEvent = (index) => {
        confirmAlert({
            title: 'Publish this events',
            message: 'Are you sure want to Publish this event: \n\n'+this.state.events[index].eventname,
            buttons: [
                {
                    label: 'YES',
                    onClick: () => {
                        const id = this.state.events[index]._id;
                        const publishevnt=true;
                        axios.put(URL_ADD_EVENT+id,{publishevnt})
                        .then(events => { 
                            if(events.data.success){
                                axios.get(URL_ADD_EVENT)
                                .then(myEvents => { 
                                    this.setState({ events:myEvents.data});
                                });
                            }
                        });
                    }
                },
                {
                    label: 'NO',
                    onClick: () => {
                        return false;
                    }
                }
            ]
          })
    }
    _updateEvents(index, data) {
        let prevData = this.state.events;
    
        if (data) {
            prevData[index] = data;
            this.setState({
                events: prevData
            });
        } else {
            this.setState({
                events: this.state.events.filter((_, i) => i !== index)
            });
        }
    };
    componentDidMount() {
        axios.get(URL_ADD_EVENT)
        .then(myEvents => { 
            if(typeof myEvents.data === 'object'){
                this.setState({ events:myEvents.data});
            } else {
                console.log("Server Error:", myEvents.data)
            }
        })
        .catch(error => {
            console.log(error.response)
        });
    };
    
    render(){
        const mapHtml=this.state.events.map((element,index) => {
        let urls="/userregistration/"+element._id
    
            return(
                <tr key={element._id}>
                    <td>{element.eventname}</td>
                    <td>{(element.eventdate)} : {element.venue}</td>
                    <td>{element.totalseat}</td>
                    <td>{element.availableseat}</td>
                    <td><Link to={"/editevent/"+element._id} className="pencil" title="Edit Event" /></td>
                    <td><button className="remove" title="Remove Events" onClick={() => this.deleteEvent(index)}/></td>
                    <td>
                    {
                        element.publishevnt
                        ? <Mailto className="link" disabled
                            email='email-to@example.com'
                            headers={
                                { 
                                subject:"Registration Open For: "+element.eventname,
                                body:"Hello All,\n\n\nEvent Descriptions: " + element.eventdetails+"\n\nEvent Date & Venue: "+element.eventdate+' & '+element.venue+"\n\nPlease Register In Events: "+window.location.origin+urls+"\n\n\nRegards,"
                                }
                            }
                        />
                        :<button className="clock" title="Publish Events" onClick={() => this.publishedEvent(index)} />
                    }
                    </td>
                    
                    
                </tr>
            )
        });
        return(
            
            <div className="events">
                <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Event Date & Venue</th>
                    <th>Total Seats</th>
                    <th>Avilable Seats</th>
                    <th>Edit Event</th>
                    <th>Delete Event</th>
                    <th>Shared | Published Event Link</th>
                  </tr>
                </thead>
                <tbody> 
                       {mapHtml}
                </tbody> 
                </table>
            </div>
          
        );
    }
}