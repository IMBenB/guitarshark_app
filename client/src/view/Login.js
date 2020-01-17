import React from 'react';
import './login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: ''
        }
        // this.saveUserName = this.saveUserName.bind(this);
    }
    // saveUserName(e) {
    //     e.preventDefault()
    //     this.setState({
    //         userName: e.target.elements.userName.value,
    //     })
    //     console.log(this.state.userName)
    // }

    render() {
        return (
            <div className='login' >
                <form  onSubmit={(e)=>{e.preventDefault(); this.props.userName(e.target.elements.userName.value, e.target.elements.password.value);

                }}
                // onSubmit={this.saveUserName}
                >
                    <input type='text'  name='userName' placeholder='user name' />
                    <input type='password' name='password' placeholder='password' />
                    
                    <input type='submit' value='login'  />
                </form>
                
            </div>
        )
    }
}

export default Login;