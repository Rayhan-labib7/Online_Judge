import React, { useContext, useEffect } from 'react'
import './singlePost.css'
import { useState } from 'react';

import Editor from "@monaco-editor/react";

import spinner from "react-svg-spinner";
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context'; 
export default function SinglePost() {

  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [problem, setProblem] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [timelimit, setTimelimit] = useState("");
  const [createdby, setCreate] = useState("");
  const [problemstatement, setProblemstatement] = useState("");
  const [inputstatement, setInputstatement] = useState("");
  const [outputstatement, setOutputstatement] = useState("");
  const [constraint, setConstraint] = useState("");
  const [sampleinput, setSampleinput] = useState("");
  const [sampleoutput, setSampleoutput] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const [issolved,setIssolved]=useState(false);

  useEffect(() => {

    const getProblem = async () => {
      const res = await axios.get("/addproblem/problemset/" + path)

      const data = {
        constraint: res.data.constraint.replace(/<br\s*\/?>/gi, '\n'),
        problemstatement: res.data.problemstatement.replace(/<br\s*\/?>/gi, '\n'),
        inputstatement: res.data.inputstatement.replace(/<br\s*\/?>/gi, '\n'),
        outputstatement: res.data.outputstatement.replace(/<br\s*\/?>/gi, '\n'),
        timelimit: res.data.timelimit.replace(/<br\s*\/?>/gi, '\n'),
        title: res.data.title.replace(/<br\s*\/?>/gi, '\n'),
        sampleinput: res.data.sampleinput.replace(/<br\s*\/?>/gi, '\n'),
        sampleoutput: res.data.sampleoutput.replace(/<br\s*\/?>/gi, '\n'),
        createdby: res.data.createdby.replace(/<br\s*\/?>/gi, '\n'),
        _id: res.data._id.replace(/<br\s*\/?>/gi, '\n'),
      };
      setProblem(data);

      setTitle(data.title);
      setTimelimit(data.timelimit);
      setProblemstatement(data.problemstatement);
      setInputstatement(data.inputstatement)
      setOutputstatement(data.outputstatement)
      setConstraint(data.constraint)
      setSampleinput(data.sampleinput);
      setSampleoutput(data.sampleoutput);
      setCreate(data.createdby);

    }
    getProblem();
  }, [path])
  const handleUpdate = async () => {
    try {
      await axios.put(`/addproblem/problemset/${problem._id}`, {
        title,
        timelimit,
        createdby,
        problemstatement,
        inputstatement,
        outputstatement,
        constraint,
        sampleinput,
        sampleoutput,
        issolved
      });
      setUpdateMode(false);
    } catch (err) { }
  };
 

   
  const handleDelete = async () => {
    try {

      await axios.delete(`/addproblem/problemset/${problem._id}`, {
        data: { createdby: user.username },
      });
      window.location.replace("/problemset");
    } catch (err) { }
  };
  const [userCode, setUserCode] = useState(``);
  const [userLang, setUserLang] = useState("python");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [run,SetRun]=useState(false)
  const options = {
    fontSize: fontSize
  }

  // Function to call the compile endpoint
  function compile() {
    setLoading(true);
    SetRun(true)
    if (userCode === ``) {
      return
    }

    // Post request to compile endpoint
    axios.post(`/compile`, {
      code: userCode,
      language: userLang,
      input: sampleinput }).then((res) => {
      setUserOutput(res.data.output);
      if(res.data.output.includes(sampleoutput)) {
        setIssolved(true);
        const handleSolved = async () => {
          try {
            await axios.put(`/addproblem/problemset/${problem._id}`, {
              issolved,
           
            });
            console.log("issolved "+issolved)
            setUpdateMode(false);
          } catch (err) { }
        };
        handleSolved();
      }
    }).then(() => {
      setLoading(false);
    })
  }

  function clearOutput() {
    setUserOutput("");
  } 

  return (
    <>
      <div className='siglepost'>
        {
          updateMode ? <table> <tr>
            <td><label>Title : </label></td>
            <td><input
              type="text"
              placeholder='Enter the problem Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            </td>
          </tr> </table> : (

            <h4>Problem Title :  {problem.title}
              {problem.createdby === user?.username && (

                <div className="singlePostEdit">
                  
                   
                  <i
                    className="singlePostIconedit far fa-edit"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                
                  <i
                    className="singlePostIcondelete far fa-trash-alt"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </h4>
          )
        }
        {updateMode ? <tr>
          <td><label>Time Limit :</label></td>
          <td><input
            type="text"
            placeholder='Enter Time limit '
            value={timelimit}
            onChange={e => setTimelimit(e.target.value)}
          /></td>
        </tr> : (
          <h6>Time Limit : {problem.timelimit}</h6>
        )
        }
        {updateMode ? <>
          <div className="statement">
            <div><label>Problem Statement :</label></div>
            <div><textarea
              placeholder='Enter the problem statement'
              className='quill'
              autoFocus={true}
              value={problemstatement}
              onChange={e => setProblemstatement(e.target.value.replace(/\n/g, '<br>'))}
            /></div>
          </div>
        </> : (
          <>
            <h5>Problem Statement:</h5>
            <p className='problemStatement'>
              <pre style={{ fontFamily: 'Poppins', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{problem.problemstatement}</pre>
            </p>
          </>
        )}

        {updateMode ? <div className="statement">
          <div><label>Input Statement :</label></div>
          <div><textarea placeholder='Enter the Input statement'
            className='inputquill'
            value={inputstatement}
            onChange={e => setInputstatement(e.target.value.replace(/\n/g, '<br>'))} /></div>
        </div> : (
          <>
            <h5>Input : </h5>
            <p>
              <pre style={{ fontFamily: 'Poppins', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{problem.inputstatement}</pre>
            </p>
          </>
        )}

        {updateMode ? <div className="statement">
          <div><label>Output Statement :</label></div>
          <div><textarea placeholder='Enter the Output statement'
            className='outputquill'
            value={outputstatement}
            onChange={e => setOutputstatement(e.target.value.replace(/\n/g, '<br>'))} /></div>
        </div> : (
          <>
            <h5>Output :</h5>
            <p>
              <pre style={{ fontFamily: 'Poppins', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{problem.outputstatement}</pre>
            </p>
          </>
        )}

        {updateMode ? <div className="statement">
          <div><label>Constraint :</label></div>
          <div><textarea placeholder='Enter the Constraint'
            className='sampleoutputquill'
            value={constraint}
            onChange={e => setConstraint(e.target.value.replace(/\n/g, '<br>'))} /></div>
        </div> : (
          <>
            <h5>Constraint :</h5>
            <p>
              <pre style={{ fontFamily: 'Poppins', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{problem.constraint}</pre>
            </p>
          </>
        )}
        {updateMode ? <div className="statement">
          <div><label>Sample Input :</label></div>
          <div><textarea placeholder='Enter the sample Input'
            className='samplequill'
            value={sampleinput}
            onChange={e => setSampleinput(e.target.value.replace(/\n/g, '<br>'))} /></div>
        </div> : (
          <>
            <h5>Examples :</h5>
            <h6>Inupt :</h6>
            <p>
              <pre style={{ fontFamily: 'Poppins', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{problem.sampleinput}</pre>
            </p>
          </>
        )}

        {updateMode ? <div className="statement">
          <div><label>Sample Output :</label></div>
          <div><textarea placeholder='Enter the sample Output'
            className='sampleoutputquill'
            value={sampleoutput}
            onChange={e => setSampleoutput(e.target.value.replace(/\n/g, '<br>'))} /></div>
        </div> : (
          <>
            <h6>Output :</h6>
            <p>
              
              
              <pre style={{ fontFamily: 'Poppins', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }} >{problem.sampleoutput}</pre>
            </p>
          </>
        )}
        {
        updateMode && <div className="">
          <button type="submit" class="btn btn-primary m-4" onClick={handleUpdate}>Update Problem</button>
        </div>
        }
        

      </div>

      <h4>Code Compiler :</h4>
      <div className="App">
      
      <Navbar
        userLang={userLang} setUserLang={setUserLang}
        userTheme={userTheme} setUserTheme={setUserTheme}
        fontSize={fontSize} setFontSize={setFontSize}
      />
      <div className="main">
        <div className="left-container">
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python"
            defaultValue="# Enter your code here"
            onChange={(value) => { setUserCode(value) }}
          />
          <button className="run-btn" onClick={() => compile()}>
             Run
          </button>
        </div>
        <div className="right-container">
          <h4 className='output'>Verdict:</h4>
          {loading || !run ? (
            <div className="spinner-box">
              <img src={spinner} alt="Loading..." />
            </div>
          ) : (
            <div className="output-box">
              
              {userOutput === problem.sampleoutput+"\n" ?
      
              
              <h3 className='accepted'>
                Accepted
                
              </h3>: <h3 className='accepted'>Wrong answer</h3>}
          
              <button onClick={() => { clearOutput() }}
                 className="clear-btn">
                 Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    </>
  )
}
