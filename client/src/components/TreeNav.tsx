import * as React from 'react';
const LeftNav = require('material-ui/lib/left-nav')
const Paper = require('material-ui/lib/paper')

import TodoTextInput from './TodoTextInput';
import Tree from './Tree'
import * as tree from '../models/tree'

const {leftNav, leftNavInner} = require('../styles/file-list.css')

interface Props {
  addTodo:Function;
  tree:tree.Tree;
};

interface State {
  open: boolean
}

export default class TreeNav extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {open: true}
    document.body.addEventListener('keydown', this.onKeyDown, false)
  }

  render() {
    const { tree } = this.props
    return (
      <LeftNav
        className={leftNav}
        width={400}
        open={this.state.open}
      >
        <Paper className={leftNavInner}>
          <Tree
            indent={0}
            tree={tree}
          />
        </Paper>
      </LeftNav>
    );
  }

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case 70: // f
        this.toggleOpen()
        break
    }
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }
}
