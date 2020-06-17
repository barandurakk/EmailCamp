import React from "react";
import { connect } from "react-redux";

//action
import { uploadImage } from "../actions/index";

class UserProfile extends React.Component {
  onImageChange = (event) => {
    const imageInInput = event.target.files[0];
    const formData = new FormData();
    formData.append("file", imageInInput);
    this.props.uploadImage(formData);
  };

  renderContent() {
    const { auth } = this.props;
    switch (auth) {
      case null:
        return <div>Loading</div>;

      default:
        return (
          <div>
            <div>{auth.displayName ? auth.displayName : null}</div>
            <input type="file" name="file" id="imageInput" onChange={this.onImageChange} />
          </div>
        );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { uploadImage })(UserProfile);
