import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import styled from "styled-components";
import Api from '../Api'
import './style.css'


const StyledButton = styled.button`
background-color: #88FCA3;
font-weight: bold;
padding: 10px 30px;
border: none;
min-width: 50px;
margin: 10px;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
border-radius : 5px;
`;


const InfoTd = styled.td`
background-color: #88FCA3;
padding: 15px;
border: none;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
border-radius : 5px;
justify-content: space-between;
flex-direction: column;
display: flex;

`;

const WarningTd = styled.td`
justify-content: space-between;
flex-direction: column;
display: flex;
background-color: #FCE788;
padding: 15px;
border: none;
border-radius : 5px;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const ErrorTd = styled.td`
justify-content: space-between;
flex-direction: column;
display: flex;
background-color: #F56236;
padding: 15px;
border: none;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
border-radius : 5px;

`;

const ClearButton = styled.button`
justify-content: flex-end;
display: flex;
background-color: Transparent;
background-repeat:no-repeat;
font-weight: bold;
border: none;
cursor:pointer;
overflow: hidden;
outline:none;
text-decoration: none;
padding-top: 10px;`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`

const CenterDivv = styled.div`
  display:flex;
  flex-direction:row;
  align-items: start;
`

const GapTable = styled.table`
background : none;

`

let count = 0;

class MessageList extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      hide: [],
      error: 0,
      warning: 0,
      info: 0,
    }
    this.tabOne = React.createRef();
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start();
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages,
        message,
      ],
    }, () => {

      let table = document.getElementById("tableOne");
      let table2 = document.getElementById("tableTwo");
      let table3 = document.getElementById("tableThree");
      this.setState({error : table.rows.length});
      this.setState({warning : table2.rows.length});
      this.setState({info : table3.rows.length});

      console.log(messages);

    })
  }

  clear(i) {
    
    const { hide } = this.state
    this.setState({
      hide: [
        ...hide,
        i
      ]
    });
    console.log(this.state.hide)
    
  }

  render() {
    const isApiStarted = this.api.isStarted();
    return (
      <div>
        <CenterDiv>
          <StyledButton onClick={() => {
            if (isApiStarted) {
              this.api.stop()
            } else {
              this.api.start()
            }
            this.forceUpdate()
          }}> {isApiStarted ? 'STOP' : 'START'} </StyledButton>
          <StyledButton className="dr-btn" onClick={() => this.setState({ messages: [] })}> CLEAR </StyledButton>
        </CenterDiv>
        <br />

        <CenterDivv>
          <GapTable className="incline" id="tableOne" >
            <th>Error Type 1 <br/> Count : {this.state.error} </th>

            <tbody>
             
              {
                this.state.messages.slice().reverse().map((message, i) => {
                  return (message.priority === 1) &&
                    <tr key={i} id={i} className={(this.state.hide.indexOf(i) != -1) ? 'hide' : ''}>
                      <ErrorTd className="td-error">{message.message}
                        
                        <ClearButton onClick={() => this.clear(i)}>Clear</ClearButton>
                      </ErrorTd></tr>
                })
              }
            </tbody>
          </GapTable>

          <GapTable className="incline" id="tableTwo">
            <th>Warning Type 2 <br/> Count : {this.state.warning}</th>


            <tbody>

              {
                this.state.messages.slice().reverse().map((message, i) => {
                  count = count + 1;
                  return (message.priority === 2) &&
                    <tr id={i} key={i} className={(this.state.hide.indexOf(i) != -1) ? 'hide' : ''}>
                      <WarningTd className="td-warning">{message.message}
                        
                        <ClearButton onClick={() => this.clear(i)}>Clear</ClearButton>
                      </WarningTd>
                    </tr>
                })
              }
            </tbody>
          </GapTable>

          <GapTable className="incline" id="tableThree">
            <th>Info Type 3 <br/> Count : {this.state.info} </th>
            <tbody>
              {
                this.state.messages.slice().reverse().map((message, i) => {
                  return (message.priority === 3) &&
                    <tr id={i} key={i} className={(this.state.hide.indexOf(i) != -1) ? 'hide' : ''}>
                      <InfoTd className="td-info"> {message.message}
                        
                        <ClearButton onClick={() => this.clear(i)}>Clear</ClearButton>
                      </InfoTd>
                    </tr>
                })
              }
            </tbody>
          </GapTable>
        </CenterDivv>

      </div >
    )
  }
}

export default MessageList

