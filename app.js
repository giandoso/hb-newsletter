const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true}));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) =>{
  const {tittle, email} = req.body;
  //Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
      }
    ]
  }
  const postData = JSON.stringify(data);
  console.log(postData);
  const options = {
    url: 'https://us20.api.mailchimp.com/3.0/lists/19dc19554a',
    method: 'POST',
    headers:{
      Authorization: 'auth 51a05dbe5432372ab4c540775ce8d637-us20'
    },
    body: postData
  }

  request (options, (err, response, body) => {
    if(err){
      console.log(err);
      res.redirect('/fail.html');
    }else{
      if(response.statusCode === 200){
        res.redirect('success.html');
      }else{
        console.log(response.statusCode);
        res.redirect('/fail.html');
      }
    }
  });
});

const PORT  = process.env.PORT || 5000;

app.listen(PORT, console.log('Server started on ' + PORT));
