"use client"
import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // For API requests
import "./styles.css";
import { IoSendSharp } from "react-icons/io5";
import { FaMicrophone,FaStop } from "react-icons/fa";
import Aiassistant from "../chatBot/aivoice.gif"
import Aiassistant2 from "../chatBot/robot3.png"
import Image from "next/image";

const VoiceTextInterface = () => {

  const [isRecording, setIsRecording] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [loader1, setloader1] = useState(false);
  const [loader2, setloader2] = useState(false);
  const [loader3, setloader3] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([
    { speaker: "bot", text: "Hi there! How can I help you today?", time: new Date().toLocaleTimeString(), audio: null },
  ]);
  const [viewMode, setViewMode] = useState("voice");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [message, setMessage] = useState("");
  const conversationContainerRef = useRef(null);
 

   
  useEffect(() => {
    if (conversationContainerRef.current) {
      conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
    }
  }, [conversationHistory]);

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsBotSpeaking(false);
      setloader2(false);
    }
  };

  // OpenAI Whisper API Key (Replace with your own key)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        await transcribeAudio(audioBlob, audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.log("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob, audioUrl) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");
    formData.append("model", "whisper-1");
    formData.append("language", "en");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_OPENAI_URI}`, formData, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          "Content-Type": "multipart/form-data",
        },
      });

      
      if(response.data){
        console.log(response.data.text)

    const backendFormData = {
      user_query: response.data.text,
    };

    setloader3(true);
    const backendResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/handle_message`,
      backendFormData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
        console.log("Backend Response:", backendResponse.data.data.queryResponse);
        const transcript = response.data.text;
        addMessage("user", transcript);
        processUserInput(backendResponse.data.data.queryResponse);
      }
    } catch (error) {
      console.log("Error transcribing audio:", error);
      addMessage("bot", "Sorry, I couldn't understand that. Please try again.");
      processUserInput("Sorry, I couldn't understand that. Please try again.")
    }
  };

  const processUserInput = (response) => {
    setloader3(false);
    setIsBotSpeaking(true);
    setloader2(true);
    setTimeout(() => {
      addMessage("bot", response);
      speakResponse(response);
    }, 1500);
  };

  const processUserInput2 = (response) => {
    setIsBotSpeaking(false);
    setTimeout(() => {
      addMessage("bot", response);
      setloader1(false);
      // speakResponse(response);
    }, 1500);
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speakResponse = (text:any) => {
    if (window.speechSynthesis) {
      setloader2(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {setIsBotSpeaking(false);setloader2(false);}
      window.speechSynthesis.speak(utterance);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addMessage = (speaker:any, text:any, audio = null) => {
    setConversationHistory((prev) => [...prev, { speaker, text, time: new Date().toLocaleTimeString(), audio }]);
  };


  const sendMessage = async () => {
    if (message.trim() === "") return;
    addMessage("user", message);
    setMessage("");
    setloader1(true)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/handle_message`,
        { user_query:message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      processUserInput2(response.data.data.queryResponse);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div className="voice-text-interface">
      
      {viewMode === "voice" ? (
        <div className="voice-screen">
           {/* <><Image src={Aiassistant} width="400" height="400" alt="none"/></> */}
          {
            loader3?
            <><div className="loader2"></div></>
            :
            (loader2?
            <><Image src={Aiassistant} width="300" height="300" alt="none"/></>
            :
            <>
            <><Image src={Aiassistant2} width="250" height="250" alt="none"/></>
            {/* <div className="thinking-cloud" id="thinkingCloud">
            <div className="cloud"></div>
            <div className="dot"></div> */}
        {/* </div> */}
        
        <div className="visualizer-container" id="visualizer">
            <div className="visualizer-circle"></div>
            <div className="visualizer-circle"></div>
            <div className="visualizer-circle"></div>
        </div>
        </>)
          }
        
        <div className="chatbotvoices">
            <p className="speaker-title" style={{marginTop:"100px"}}>{isRecording?"Listening...":"Click the microphone to start speaking"}</p>
            <div style={{display:"flex"}}>
            <button onClick={isRecording?stopRecording:startRecording} className={`mic-btn ${isRecording ? "listening" : ""}`}>
              <FaMicrophone style={{ fontSize: "22px" }} />
            </button>
            {isBotSpeaking && (
              <button onClick={stopSpeaking} className="mic-btn stop">
                <FaStop style={{ fontSize: "22px"}} />
              </button>
            )}
            </div>
            {/* {isRecording && <button onClick={stopRecording} className="stop-btn">Stop</button>} */}
            <button onClick={() => setViewMode("chat")} className="toggle-view-btn">
              View Conversation History
            </button>
        </div>
        </div>
      ) : (
        <div className="chat-screen">
          <div className="header">
            <button onClick={() => setViewMode("voice")} className="back-btn">
              Back to Voice Mode
            </button>
            <div className="header-title">Conversation History</div>
          </div> 
          <div className="conversation-container" ref={conversationContainerRef}>
            {conversationHistory.map((msg, index) => (
              <div key={index} className={`message ${msg.speaker}-message`}>
                <div className="message-header">{msg.speaker === "user" ? "You" : "Bot"} • {msg.time}</div>
                <div className="message-bubble">{msg.text}</div>
                {msg.audio && <audio controls src={msg.audio}></audio>}
              </div>
            ))}
            {loader1 && <div className="loader"></div>}
          </div>
           <div className="text-input-container">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="text-input"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loader1) {
                  sendMessage();
                }
              }}
              disabled={loader1} // Disable input when waiting for a response
            />
            <button onClick={sendMessage} className="send-btn" disabled={loader1}>
              <IoSendSharp style={{ fontSize: "22px" }} />
            </button>
          </div>
         </div>
      )}
    </div>
  );
};

export default VoiceTextInterface;

