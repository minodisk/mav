import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {pushState} from 'redux-router'
import * as React from 'react';
const AppBar = require('material-ui/lib/app-bar')
const IconButton = require('material-ui/lib/icon-button')
const IconMenu = require('material-ui/lib/menus/icon-menu')
const MenuItem = require('material-ui/lib/menus/menu-item')
const NavigationClose = require('material-ui/lib/svg-icons/navigation/close')
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert')
const injectTouchTapEvent = require('react-tap-event-plugin');
injectTouchTapEvent();

import TreeNav from '../components/TreeNav';
import * as TodoActions from '../actions/todos';
import { Tree } from '../models/tree';
import { Todo } from '../models/todos';

const styles = require('../styles/app.css')

interface Props {
  todos?: Todo[];
  tree?: Tree;
  dispatch?: Dispatch;
  children: any;
}

interface State {
}

class App extends React.Component<Props, State> {
  render() {
    const { todos, tree, dispatch, children } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    return (
      <div
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <TreeNav
          addTodo={actions.addTodo}
          tree={tree}
        />
        <section className={styles.content}>
          { children }
        </section>
      </div>
    );
  }

  onDragEnter = (e) => {
    console.log('ondragenter:', e)
    this.cancelEvent(e)
  }

  onDragOver = (e) => {
    console.log('ondragover:', e)
    this.cancelEvent(e)
  }

  onDrop = (e) => {
    console.log('ondrop:', e.dataTransfer.files[0].name)
    console.log('ondrop:', e.dataTransfer.files[0].fullPath)
    this.cancelEvent(e)
  }

  cancelEvent(e) {
    e.preventDefault()
    e.stopPropagation()
  }
}

const mapStateToProps = state => ({
  q: state.router.location.query.q,
  todos: state.todos,
  tree: state.tree,
});

export default connect(
  mapStateToProps,
  {pushState}
)(App);
