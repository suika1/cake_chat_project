import { connect } from 'react-redux';
import DialogList from '../components/DialogList';
import { createChat } from "../actions/MessageActions";
import { withRouter } from 'react-router';

const mapStateToProps = store => {
    return {
        chats: store.messages.chats,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createChat: (chatName) => dispatch(createChat(chatName)),
    }
};

const DialogListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DialogList);

export default withRouter(DialogListContainer);