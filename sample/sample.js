/**
 * Inner selection item
 */
import React, { Component } from 'react'
import Selection from '../lib/react-drag-select'
import ReactDom from 'react-dom'
import R from 'ramda'

class SelectionItem extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      isSelected: false,
    }
  }
  
  shouldComponentUpdate (nextProps, nextState) {
    return this.state.isSelected !== nextState.isSelected
  }
  
  render () {
    let {className, ...other} = this.props
    if (this.state.isSelected) className += ' rds-item--selected'
    return (
      <div {...{className, ...other}}>
        Item {this.props.data + 1 }
      </div>
    )
  }
}




class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selects: undefined,
      selected: []
    }
  }
  
  render () {
    return (
      <div>
        <button onClick={e => this.setState({selects: true}) }>select all:</button>
        <button onClick={e => this.setState({selects: false}) }>clear all:</button>
        <button onClick={e => this.setState({selects: ['0', '2', '4']}) }>select 1 3 5</button>
        <div style={{margin: 20}}>{this.state.selected.join(' ')}</div>
        <Selection selects={this.state.selects} onSelectionChange={x => { console.log(x); this.setState({selected: x})}}>
          {(subscribeSelection) => (
            <div>
              <SelectionItem className="item" key="asdasd" data="asdasd" ref={subscribeSelection("asdasd")}/>
              {
                R.compose(
                  R.map(i => <SelectionItem className="item" key={i} data={i} ref={subscribeSelection(i)}/>),
                  R.times(R.identity),
                )(65)
              }
            </div>
          )}
        </Selection>
      </div>
    )
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('example'),
)
