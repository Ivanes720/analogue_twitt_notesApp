import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label: 'Going to learn React', like: false, important: true, id: 1},
                {label: 'That is so good', like: false, important: false, id: 2},
                {label: 'I need a break...', like: false, important: false, id: 3}
            ],
            term: '',
            filter: 'all'


        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToogleImportant=this.onToogleImportant.bind(this);
        this.onToogleLiked=  this.onToogleLiked.bind(this);
        this.onUpdateSearh=  this.onUpdateSearh.bind(this);
        this.onFilterSelect=  this.onFilterSelect.bind(this);
        this.toogleLikeOrImportant=  this.toogleLikeOrImportant.bind(this);

        this.maxId = 4;
    }
    
    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);

            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [...before, ...after];
            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    toogleLikeOrImportant (id, item) {
        this.setState(({data})=>{
       const index =data.findIndex(elem=>elem.id ===id);
       const old =data[index];
       const newItem={...old, [item]: !old[item]};
       const newArr= [...data.slice(0, index), newItem, ... data.slice(index + 1)]
            return {
                data: newArr
            }
             })
           }
    onToogleImportant (id){
        this.toogleLikeOrImportant(id, 'important')
    }

    onToogleLiked (id) {
 this.toogleLikeOrImportant(id, 'like')
    }



    
    searhPost(items, term){
if(term.length === 0){
    return items
} 
return items.filter(  (item)=> {
    return item.label.indexOf(term)>-1
} )

    }
    onUpdateSearh(term){
        this.setState({term})
    }
    filterPost(items, filter) {
        if (filter ==='like') 
        return items.filter(item =>item.like)
        else {
            return items
        }
    }
    onFilterSelect (filter){
        this.setState({filter})
    }
    render() {
        const {data, term,filter}= this.state;
        const liked=data.filter(item=>item.like).length;
        const allPosts=data.length;
        const visiblePosts=this.filterPost(this.searhPost(data, term),filter);
        return (
            <div className="app">
                 <AppHeader
                 liked={liked}
                 allPosts={allPosts}/>
                 <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearh={this.onUpdateSearh}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                 </div>
                 <PostList 
                    posts={visiblePosts} 
                    onDelete={ this.deleteItem}
                    onToogleImportant={this.onToogleImportant}
                    onToogleLiked={  this.onToogleLiked}/>
                 <PostAddForm
                    onAdd={this.addItem}/>
            </div>
         )
    }
}