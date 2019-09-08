import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

type Props = {
  editing: boolean;
  value: string;
  onEnter: (newValue: string) => void;
}

type State = {
  newValue: string;
}

class FormulaForm extends React.Component<Props, State> {
  private inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = {
      newValue: '',
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.editing && this.props.editing) {
      this.setState({newValue: this.props.value});
      if (this.inputRef.current) {
        this.inputRef.current.focus();
      }
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({newValue: event.currentTarget.value});
  }

  handleEnter = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.props.onEnter(this.state.newValue);
  }

  render() {
    return (
      <form><fieldset disabled={!this.props.editing}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">f(x)=</span>
          </div>
          <input
            ref={this.inputRef}
            type="text"
            className="form-control"
            value={this.props.editing ? this.state.newValue : this.props.value}
            placeholder="Formula"
            autoComplete="off"
            readOnly={!this.props.editing}
            onChange={this.handleChange}
            onFocus={(e) => e.currentTarget.select()}
          />
          <div className="input-group-append">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleEnter}
            >
              Enter
            </button>
          </div>
        </div>
      </fieldset></form>
    );
  }
}

export default FormulaForm;
