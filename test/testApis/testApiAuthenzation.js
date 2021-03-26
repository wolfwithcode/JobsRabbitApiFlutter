const axios = require('axios')
const LOCAL_HOST = 'http://localhost:3777/api'
const REMOTE_HOST = 'https://haisanmo3-backend.herokuapp.com/api'
const REMOTE_HOST_BK = 'https://haisanmo3-backend-bk.herokuapp.com/api'
// const HOST = 'https://haisanmo3-backend.herokuapp.com/api'
const HOST = LOCAL_HOST;

const email = 'banh0703@gmail.com';
const lastName = 'Nguyễn';
const firstName = 'Xuân Anh';
const username = 'banh0703';
const password = 'hanhphuc';
const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaGxkMTExMUBnLmNvbSIsImlhdCI6MTYwODA5NjczMywiZXhwIjoxNjA4MTAzOTMzfQ.LZGjOY0X_SCLizZVsZ5p_FCs5APIyZf6rwJHmu12bzA' ;

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbndpdGhjb2RlMUBvdXR0bG9vay5jb20iLCJpYXQiOjE2MDk3NTI2OTksImV4cCI6MTYwOTc1NjI5OX0.LH1aTk7WSSutkg4vxzDZyfqv3cL57_gdWsbNDd7e5iM';

const signIn = async () => {
    try {
        const response = await axios.post(HOST+'/auth/signin', {
            email,
            password,
        })
        // console.log('response ', response);
        const {data} = response;
        console.log('data', data);

    } catch (error) {
        console.log('err ', error);
    }
}


const signUp = async () => {
    try {
        const response = await axios.post(HOST+'/auth/signup', {
            email,
            username,
            password,
            firstName,
            lastName,
        })
        // console.log('response ', response);
        const {data} = response;
        console.log('data', data);

    } catch (error) {
        console.log('err ', error);
    }
}


const refreshLogin = async () => {
    try {
        const response = await axios.post(HOST+'/auth/refresh', {           
            refreshToken
        })
        // console.log('response ', response);
        const {data} = response;
        console.log('data', data);

    } catch (error) {
        console.log('err ', error);
    }
}



const resetPassword = async () => {
    const newPassword = 'anhld1';
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    
    const bodyParameters = {
       password: newPassword
    };
    
    try {
        const response = await axios.post(HOST+'/user/updateUserPassword', bodyParameters,
        config)
        // console.log('response ', response);
        const {data} = response;
        console.log('data', data);

    } catch (error) {
        console.log('err ', error);
    }
}


const getPassword = async () => {
    const config = {
        // headers: { Authorization: `Bearer ${accessToken}` }
    };
    
    const bodyParameters = {
    //    password: newPassword
    email
    };
    
    try {
        const response = await axios.post(HOST+'/auth/forgotPassword', bodyParameters,
        config)
        // console.log('response ', response);
        const {data} = response;
        console.log('data', data);

    } catch (error) {
        console.log('err ', error);
    }
}


// signUp();

signIn();

// login();

// refreshLogin();

// resetPassword();

// getPassword()