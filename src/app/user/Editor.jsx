import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import CKEditor from 'react-ckeditor-wrapper';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorData: props.template
    };
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      editorData: nextProps.template
    });
  }
  onChange(evt) {
    this.setState({
      editorData: evt,
    });
    this.props.onChangeTemplate({}, this.state.editorData);
  }
  render() {
    return (
      <Card>
        <CardBody>
          <CKEditor 
              value={this.state.editorData}
              onChange={this.onChange.bind(this)} />
        </CardBody>
      </Card>
    );
  }
}
Editor.propTypes = {
  onChangeTemplate: PropTypes.func.isRequired,
  templateEditorId: PropTypes.string,
  template: PropTypes.string,
};
Editor.defaultProps = {
  templateEditorId: `signature-editor-${Math.round(Math.random() * 10000)}`,
};

export default Editor;
