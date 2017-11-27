import _ from 'lodash'
import React,{Component} from 'react';
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from'youtube-api-search';

const API_KEY = 'AIzaSyDRZ1a3XCeA6KTy40Jiwd5eJqsNfK8vnhA' ;

//create a new component that poduces HTML
//const -- constant Es6 declaration
class App extends Component 
{
    constructor(props)
    {
        super(props);
        this.state={
            videos : [] ,
            selectedVideo : null
        }
    this.videoSearch('hindolam)');
   }

   videoSearch(term) {
    YTSearch({ key:API_KEY, term:term }, (videos) => {
        this.setState({ 
            videos: videos,
            selectedVideo: videos[4] });
    });
   }
    
    render()
   
    {
        const videoSearch =_.debounce((term) => {onSearchTermChange(term)},300);
        return (
        <div>
            <SearchBar onSearchTermChange={term => this.videoSearch(term) } />   
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList 
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos= { this.state.videos } />
        </div>
        );
    }
};


//Take this component generated and 
//put it on the page(in the DOM)
ReactDom.render(<App />, document.querySelector('.container'));

