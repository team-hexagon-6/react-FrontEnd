import React, { Component } from 'react'
import './doctor.css'

class Doctor extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
          patient_id:''
        }
      }

      setPatientId = (event)=>{
        this.setState({
          patient_id : event.target.value
        })
      }

  render() {
    return (
      <div>
          <div className='options'>
          <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={this.state.patient_id}
                onChange={this.setPatientId}
              />
               <button class="btn btn-outline-secondary" type="button" id="button-addon2">Show Patient</button>

            </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className='buttz' id='update' onClick={()=>{}}>Update Account</button>
                </div>
      </div>
    )
  }
}

export default Doctor