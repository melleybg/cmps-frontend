import React, {Component} from 'react';
import axios from 'axios'
import './UserPage.css';



class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user ? this.props.user.username : '',

      photo_url: this.props.user ? this.props.user.photo_url : '',
      password: this.props.user ? this.props.user.password : '',
      usernameEdit: this.props.user ? this.props.user.username : '',
      photo_urlEdit: this.props.user ? this.props.user.photo_url : '',
      passwordEdit: this.props.user ? this.props.user.password : ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    }



    componentWillReceiveProps(newProps) {
      console.log(newProps)
      this.setState({
        username: newProps.user.username,
        photo_url: newProps.user.photo_url,
        password: newProps.user.password
      })
    }




    handleChange(e) {
      console.log(`Target is = ${e.target}`);
      console.log(`This is e.target.name = ${e.target.name}`);
      this.setState({
          [e.target.name]:e.target.value

    }, ()=>console.log(`${this.state}`))
  }



  handleUpdate(e) {
    e.preventDefault();
    axios.put(`https://cmps-backend.herokuapp.com/api/users/${this.state.username}`, {
      username: this.state.usernameEdit,
      photo_url: this.state.photo_urlEdit,
      password: this.state.passwordEdit
    })
    console.log(`UserNameEdit from UserPage Update = ${this.state.usernameEdit}`)
    console.log(`Photo_UrlEdit from UserPage Update = ${this.state.photo_urlEdit}`)
    console.log(`PasswordEdit from UserPage Update = ${this.state.passwordEdit}`)
  }

     handleDelete(e) {
      e.preventDefault();
      axios.delete(`https://cmps-backend.herokuapp.com/api/users/${this.state.username}/delete`, {
        username: this.state.username,
        photo_url: this.state.photo_url
      })
      console.log('User Deleted')
    }






  render() {
    return (
    <div className="userPage">

      <p> {this.state.username} </p>
      <img src={this.state.photo_url} alt='Mug Shot'/>


      <div className="editDelete">
      <form onSubmit={this.handleUpdate}>

        <p id="profile">Profile</p>
        <label>
          Username:
          <input name="usernameEdit" type="text"
            value={this.state.usernameEdit}
            onChange={this.handleChange} />
        </label>
          <br/>
        <label>
          Profile Pic:
          <input name="photo_urlEdit" type="text"
            value={this.state.photo_urlEdit}
            onChange={this.handleChange} />
        </label>
        <br/>
        <label>
        Password:
        <input name="passwordEdit" type="text"
          value={this.state.passwordEdit}
          onChange={this.handleChange} />
        </label>
        <br/>
          <input type="submit" value="Edit" />
      </form>

        <button onClick={this.handleDelete}>
          Delete Profile
        </button>
      </div>


      <br/>
    </div>
    )
  }
}

export default UserPage;
