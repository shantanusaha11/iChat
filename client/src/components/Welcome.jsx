import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Robot from '../assets/robot.gif'

const Welcome = () => {

      let navigate =  useNavigate()
      const [userName, setUserName] = useState("")

      useEffect(() => {
        if (!localStorage.getItem("user-info")) {
          return navigate("/login");
        } else {
          return setUserName(JSON.parse(localStorage.getItem("user-info")).user.username);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      
  return (
      <Container>
          <img src={Robot} alt="robot"/>
          <h3>
                Welcome, <span>{userName} !</span>
          </h3>
          <h3>Please select a contact to Chat.</h3>
      </Container>
  )
}

export default Welcome

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 15rem;
  }
  h3{
    padding: 0.5rem;
    display: none;
  }
  @media only screen and (min-width: 720px) {
    img: {
      height: 20rem;
    }
    h3{
      display: inline;
    }
  }
  span {
    color: #4e0eff;
  }
`;