import * as React from 'react';
import { connect } from 'react-redux';
// import remark from 'remark'
// import reactRenderer from 'remark-react'
const remark = require('remark')
const reactRenderer = require('remark-react')
// import hljs from 'remark-highlight.js'
// import Highlight from 'react-highlight'

import { Connection } from '../models/socket'
import { File } from '../models/file'
import {
  getFile,
  watchFile,
  unwatchFile
} from '../actions/file'

let processor = remark.use(reactRenderer, {createElement: React.createElement})
let process = processor.process.bind(processor)
let options = {
  gfm: true,
  yaml: true,
  commonmark: true,
  footnotes: true,
  breaks: true
}

const styles = require('../styles/content.css')
const githubCSS = require('github-markdown-css')
// const qiitaCSS = require('../styles/qiita-css.scss')

interface Props {
  location: any;
  connection: Connection;
  file: File;
  getFile: Function;
  watchFile: Function;
  unwatchFile: Function;
};
interface State {};

class Markdown extends React.Component<Props, State> {
  componentWillMount() {
    this.props.watchFile()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname != this.props.location.pathname) {
      nextProps.watchFile()
    }
    console.log(this.props.connection.opened, '->', nextProps.connection.opened);
    if (nextProps.connection.opened != this.props.connection.opened) {
      if (nextProps.connection.opened) {
        nextProps.watchFile()
      }
    }
  }

  componentWillUnmount() {
    this.props.unwatchFile()
  }

  render() {
    if (this.props.file == null) {
      return (<div></div>)
    }
    console.log(process(this.props.file.content, options))
    return (
      <div className='markdown-body markdownContent'>{process(this.props.file.content, options)}</div>
    );
  }
}

const ejectRootPath = path => path.replace(/^\//, '')

const mapStateToProps = state => ({
  file: state.file,
  connection: state.connection,
})

const mapDispatchToProps = (dispatch, props) => ({
  watchFile: () => {
    const pathname = ejectRootPath(props.location.pathname)
    dispatch(getFile(pathname))
    dispatch(watchFile(pathname))
  },
  unwatchFile: () => {
    const pathname = ejectRootPath(props.location.pathname)
    dispatch(unwatchFile(pathname))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Markdown)
