import axios from 'axios';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LabelsPage from './components/labelsPage';
import Navbar from './components/navbar';

const API = 'http://api.emiratesauction.com/v2/phrases?source=mweb';
const savedPhrases = localStorage.getItem('phrases');

class App extends Component {
    state = {
        phrases: []
    }
    componentDidMount = () => {

        //Set default language 
        if (localStorage.getItem('appLanguage') == null) {
            localStorage.setItem('appLanguage', 'ar');
        }
        if (savedPhrases !== null) {

           this.getWithExpiry('phrases')

            console.log('From local storage')

        } else {
            this.getPhrasesFromAPI()
        }

    }
     getWithExpiry = (key) =>{
        var itemStr = localStorage.getItem(key)

        // if the item doesn't exist, return null
        if (!itemStr) {
            return null
        }

        var item = JSON.parse(itemStr)
        var now = new Date()

        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            
            // If the item is expired, delete the item from storage
            localStorage.removeItem(key)
            this.getPhrasesFromAPI()
        }else{
          this.setState({
              phrases: item.value
          })
        }
      
    }
    setWithExpiry = (key, value, ttl) => {
        var now = new Date()

        // `item` is an object which contains the original value
        // as well as the time when it's supposed to expire
        var item = {
            value: value,
            expiry: now.getTime() + ttl,
        }
        localStorage.setItem(key, JSON.stringify(item))
    }

    getPhrasesFromAPI = () => {

        axios.get(API)
            .then(res => {

                console.log('From API');

                //Save data in local storage with Expiration Time [ ex:20 second so I can test it]
                this.setWithExpiry('phrases', res.data.Phrases, 20000)

                this.setState({
                    phrases: res.data.Phrases
                })
            }

            )
    }

    render() {
    
        return (
            <div className="App">
               
                <Navbar
                    navBrand={this.state.phrases[0]}
                    languages={this.state.phrases[1]}
                />

                <Switch>
                    <Route exact path="/" component={() => <LabelsPage labels={this.state.phrases.slice(2, 5)} />} />
                    <Route exact path="/page2" component={() => <LabelsPage labels={this.state.phrases.slice(6, 9)} />} />
                    <Route exact path="/page3" component={() => <LabelsPage labels={this.state.phrases.slice(10, 13)} />} />
                </Switch>
            </div>
        );
    }

}

export default App;
