import React from 'react';
import {Typography, Fab, TextField, Button} from '@material-ui/core';
import PropTypes  from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {NavLink} from "react-router-dom";

const styles = {
    dialogs: {
        position: 'fixed',
        display: 'flex',
        width: '240px',
        flexDirection: 'column',
        height: 'max-content',
        alignItems: 'center',
        '& > * + *': {
            marginTop: '10px',
        },
    },
    header: {
        fontSize: '24px',
        color: '#430e7be8'
    },
    dialog: {
        width: '150px',
        height: '50px',
        paddingTop: '15px',
        boxShadow: 'inset 0px 0px 13px 1px grey',
        textDecoration: 'none',
        '&:hover':{
            boxShadow: 'inset 0px 0px 13px 3px #24358c',
        }
    },
    link: {
        fontSize: '12px',
        wordWrap: 'break-word',
    },
    activeDialog: {
        //boxShadow: 'inset 0px 0px 13px 3px #24358c',
        backgroundColor: '#9c04fb52',
    },
    chatCreatorWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'slide-up 0.4s ease',
    },
    chatNameInput: {
      width: 'calc(100% - 40px)',
    },
    chatCreateBtn: {
        top: '10px',
    },
    '@keyframes slide-up': {
        '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
        },
        '100%': {
            opacity: '1',
            transform: 'translateY(0)',
        }
    },
    '@media (max-width: 900px)':{
        dialogs: {
            position: 'relative',
        }
    }
};

//renders list of dialogs in left side of screen
class DialogList extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            showInput: false,
            chatName: '',
        };
    }

    //For controlling inputs
    onChange = fieldName => e => this.setState({[fieldName]: e.target.value});

    renderCreateChat() {
        let {classes} = this.props;
        if (!this.state.showInput){
            return (<Fab onClick={() => this.setState({showInput: true})} color="primary" >+</Fab>)
        }else{
            return (
                <div className={classes.chatCreatorWrapper}>
                    <TextField className={classes.chatNameInput} label='Имя чата' variant='outlined' placeholder='Введите имя чата ...' value={this.state.chatName} onChange={this.onChange('chatName')}/>
                    <Button className={classes.chatCreateBtn} onClick={() => this.props.createChat(this.state.chatName)} variant='text'>Создать</Button>
                    <br/>
                    <Fab color='primary' onClick={() => this.setState({showInput: false, chatName: ''})}>↑</Fab>
                </div>
            )
        }
    }

    render(){
        return (
            <div className={this.props.classes.dialogs}>
                <Typography variant="h4" className={this.props.classes.header}>Список диалогов</Typography>
                {this.props.chats.map(chat => (
                    <NavLink
                        key={chat.key}
                        className={this.props.classes.dialog}
                        to={`/${chat.key}`}
                        activeClassName={this.props.classes.activeDialog}
                        isActive={() => this.props.match.params.chatKey === chat.key}
                    >
                        <div >
                            <Typography className={this.props.classes.link} variant="body2">{chat.name}</Typography>
                        </div>
                    </NavLink>
                ))}
                {this.renderCreateChat()}
            </div>
        );
    }
}

DialogList.propTypes = {
    chats: PropTypes.array.isRequired,
    createChat: PropTypes.func.isRequired,
};

export default withStyles(styles)(DialogList)