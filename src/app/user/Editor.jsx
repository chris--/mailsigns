import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Button } from 'reactstrap';
import CKEditor from 'react-ckeditor-wrapper';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorData: props.template
    }
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log("editor receive props", nextProps);
    this.setState({
      editorData: nextProps.template
    });
  }
  onChange(evt) {
    this.setState({
      editorData: evt,
    });
  }
  onSave() {
    this.props.onSave({}, this.state.editorData);
  }
  render() {
    return (
      <Card>
        <CardBody>
          <CKEditor 
              value={this.state.editorData}
              onChange={this.onChange.bind(this)} />
            <br />
            <Button 
              color="secondary" 
              size="sm"
              onClick={this.onSave}>Save it
            </Button>
        </CardBody>
      </Card>
    );
  }
}
Editor.propTypes = {
  onSave: PropTypes.func.isRequired,
  templateEditorId: PropTypes.string,
  template: PropTypes.string,
};
Editor.defaultProps = {
  templateEditorId: `signature-editor-${Math.round(Math.random() * 10000)}`,
};

export default Editor;
