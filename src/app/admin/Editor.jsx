import React from 'react';
import AlloyEditor from 'alloyeditor';
import PropTypes from 'prop-types';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    if (props.template) {
      // do nothing
    }
    this.state = {
      data: '',
    };
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.editor = AlloyEditor.editable(this.props.templateEditorId, {
      toolbars: {
        styles: {
          selections: [
            {
              name: 'static',

              // Set all  the buttons you want in your toolbar here
              buttons: ['bold', 'italic', 'image', 'table'],

              // Force selection toolbar to always show this toolbar
              test: () => (true),
            },
          ],
        },
      },
    });
    this.editor.get('nativeEditor').on('change', this.onChange);
  }
  componentWillReceiveProps(nextProps) {
    this.editor.get('nativeEditor').setData(nextProps.template);
  }
  componentWillUnmount() {
    this.editor.destroy();
  }
  onChange(evt) {
    this.setState({
      data: evt.editor.getData(),
    });
  }
  onSave() {
    this.props.onSave({}, this.state.data);
  }
  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">Template Editor</div>
        <div className="panel-body">
          <form>
            <textarea
              style={{ all: 'initial' }}
              id={this.props.templateEditorId}
            />
          </form>
          <button className="btn btn-primary" onClick={this.onSave}>Save</button>
        </div>
      </div>
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
