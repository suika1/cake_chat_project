import { connect } from 'react-redux';
import MessageForm from '../components/MessageForm';
import { postMessages } from "../actions/MessageActions";
import { withRouter }  from 'react-router';

const mapDispatchToProps = dispatch => {
    return {
        postMessage: (text, name, chatKey, penultimateId) => {
            dispatch(postMessages(text, name, chatKey, penultimateId));
        }
    }
};

const MessageFormContainer = connect(
    null,
    mapDispatchToProps
)(MessageForm);

export default withRouter(MessageFormContainer);