import React, {Component} from 'react';
import './search-panel.css'
export default  class SearchPanel extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.onUpdateSearh=this.onUpdateSearh.bind(this)
    }

    onUpdateSearh(e){
        const term=e.target.value
       this.setState({term}) 
       this.props.onUpdateSearh(term);
       
    }
    render ()  {
        return (
        <input
            className="form-control search-input"
            type="text"
            placeholder="Поиск по записям"
            onChange={this.onUpdateSearh}
        />  )
}
}