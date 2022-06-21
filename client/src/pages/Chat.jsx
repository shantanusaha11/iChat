import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchContacts, URL } from "../api";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from 'socket.io-client';


const Chat = () => {

  document.title = "iChat | start your chat";

  const socket= useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      return navigate("/login");
    } else {
      return setCurrentUser(JSON.parse(localStorage.getItem("user-info")).user);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(URL);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        fetchContacts(currentUser._id).then((data) => {
          setContacts(data.data);
        });
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser, navigate]);


    const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {
          currentChat===undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )
        }
      </div> 
    </Container>
  );
};

export default Chat;


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  scroll-behavior: smooth;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 720px) {
      display: grid;
      grid-template-columns: 25% 75%;
      grid-template-columns: 35% 65%;
    }
  }
`;
