import { Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, Input, ModalFooter, Checkbox } from "@heroui/react";
import { CircleStop, CircleArrowUp, ArrowDown } from "lucide-react"
import { useEffect, useState, useRef } from "react";
import { streamGeminiResponse } from "../scripts/streamer"
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'github-markdown-css'
import ClickSpark from "../scripts/clickspark"
import { useRouter } from "next/router";
import 'katex/dist/katex.min.css'


const MarkdownComponent = (content) => {
  return (
    <>
    <div className="markdown-body" style={{marginBottom: "14px"}}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      />
    </div>
    </>
  )
}

const UserMessage = (content) => {
  return (
    <>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{
        width: "fit-content",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        padding: "8px",
        borderRadius: "5px",
        backgroundColor: "#1c1c1c",
        marginBottom: "14px"
      }}>
        {content}
      </div>
    </div>
    </>
  )
}

const ModelMessage = MarkdownComponent

export default function Home() {
  const router = useRouter();
  const [inputContent, setInputContent] = useState("")
  const [currentChat, setCurrentChat] = useState([])
  var [chatId, setChatId] = useState(null)
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  var KeyStateDefault = ""
  try {
    KeyStateDefault = eval("localStorage")?.getItem("geminiAPIKey")
  } catch {}
  const [modalAPIKeyValue, setModalAPIKeyValue] = useState(KeyStateDefault)
  const [isResponding, setIsResponding] = useState(false)
  const [currentStream, setCurrentStream] = useState(null)
  var proDefault = false
  try {
    proDefault = eval("localStorage")?.getItem("usingPro") == "true"
  } catch {}
  const [usingPro, setIsUsingPro] = useState(proDefault)

  const chatboxRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const el = chatboxRef.current;
    if (autoScroll && el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
    }
  }, [currentChat, autoScroll]);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("textarea").focus()
    }, 10)
  }, [])

  useEffect(() => {
    const id = router.query.id
    if (id) {
      var storageChat = window.localStorage.getItem(id)
      if (storageChat) {
        setChatId(id)
        setCurrentChat(JSON.parse(storageChat))
        const el = document.getElementById("chatbox");
        const here = el.scrollTop;
        el.scrollTo({ top: here, behavior: "instant" });
      }
    }
  }, [router.query.id])

  function generateUnsafeUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
  
  function HandleChat() {
    if (chatId == null) {
      var id = generateUnsafeUUID()
      setChatId(id)
      history.pushState({}, "", "/?id="+id)
      return id
    }
    return chatId
  }

  function KeyboardListener(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      if (window.localStorage.getItem("geminiAPIKey") == null || inputContent == "") {
        onOpen()
        return
      }

      chatId = HandleChat()

      setCurrentChat((currentChat) => {
        var newChat = [...currentChat, {role: "user", parts: [{ text: inputContent}]}, {role: "model", parts: [{ text: ""}]}]
        window.localStorage.setItem(chatId, JSON.stringify(newChat))
        return newChat
      })

      setIsResponding(true)

      setTimeout(() => {
        setAutoScroll(true)
      }, 10)

      setInputContent("")

      streamGeminiResponse([...currentChat, {role: "user", parts: [{ text: inputContent}]}], (x) => {
        setCurrentChat((prevChat) => {
          const updatedChat = [...prevChat];
          const lastMessage = { ...updatedChat[updatedChat.length - 1] };
          const lastPart = { ...lastMessage.parts[0] };
        
          lastPart.text += x;
          lastMessage.parts = [lastPart];
          updatedChat[updatedChat.length - 1] = lastMessage;

          window.localStorage.setItem(chatId, JSON.stringify(updatedChat))
        
          return updatedChat;
        });
      }, () => {
        setIsResponding(false)
      })
      try {event.preventDefault()} catch{}
    }

    if (event.code === "Space" && event.altKey) {
      event.preventDefault();
    }

    if (event.code == "Escape") {
      localStorage.setItem("readerId", "")
      setIsResponding(false)
    }
  }

  useEffect(() => {

    document.addEventListener("keydown", KeyboardListener)

    return () => {document.removeEventListener("keydown", KeyboardListener)}
  }, [inputContent])
  const prevScrollTop = useRef(0);
  return (
    <ClickSpark>
    <div style={{minHeight:"100vh", width:"100vw", backgroundColor:"#111", overflowY: "auto", color: "white"}} ref={chatboxRef} id="chatbox" onScroll={(e) => {
      if (!isResponding) {
        return
      }
      const curr = e.target.scrollTop;
      if (curr < prevScrollTop.current) {
        console.log("scrolled up")
        setAutoScroll(false);
      }
      prevScrollTop.current = curr;
    }}>
      <div style={{height:"76vh", "width":"100%"}}>
        <div style={{height:"100%", width:"100%"}} className="flex justify-center items-center">
          <div style={{height:"100%", width:"60%", marginTop:"50px"}}>
            {chatId == null ? <>
            <div style={{height:"100%", width:"100%"}} className="flex justify-center items-center">
              <h1 className="text-4xl">What's on your mind today?</h1>
            </div>
            </> : ""}
            {currentChat.map((item) => {
              if (item.role == "user") {
                return UserMessage(item.parts[0].text)
              } else {
                return ModelMessage(item.parts[0].text)
              }
            })}
            {isResponding && currentChat[currentChat.length - 1].parts[0].text.length == 0 && <p className="shiny-text">Gemini is thinking!</p>}
            <div style={{height:"28vh"}}></div>
          </div>
        </div>
      </div>
      {!autoScroll && <div style={{position:"absolute", bottom:"26vh", width:"100vw"}} className="flex justify-center items-center">
        <Button style={{backgroundColor:"rgb(28, 28, 28)", border:"1px solid rgba(255, 255, 255, 0.14)"}} isIconOnly
          onPress={() => {
            const el = chatboxRef.current;
            const here = el.scrollTop;
            el.scrollTo({ top: here, behavior: "instant" });
            setAutoScroll(true)
          }}
        ><ArrowDown></ArrowDown></Button>
      </div>}
      <div style={{height:"24vh", "width":"100%", position: "fixed"}} className="flex justify-center items-center">
        <div className="flex flex-col" style={{height:"100%", width:"50%", border:"1px solid rgba(255, 255, 255, 0.14)", borderBottom: "none", borderTopLeftRadius:"14px", borderTopRightRadius:"14px", background:"#1c1c1c"}}>
          <div style={{height:"auto", padding:"8px"}} className="flex-1">
            <textarea style={{height:"90%", width:"97.5%", border:"none", padding:"5px", backgroundColor: "#1c1c1c", borderRadius:"14px"}}
              onInput={(x) => {
                setInputContent(x.target.value)
              }}
              value={inputContent}
              placeholder="Write your message here"
              autoFocus
            >

            </textarea>
          </div>
          <div style={{height:"auto"}}>
            <div style={{float:"right", marginRight:"10px", marginBottom:"10px", cursor: "pointer"}} className="flex justify-center items-center"
              onClick={() => {
                if (isResponding) {
                  localStorage.setItem("readerId", "")
                  setIsResponding(false)
                } else {
                  KeyboardListener({"key": "Enter", "shiftKey": false})
                }
              }}
            >
              <Button variant="faded" size="sm" style={{marginRight:"10px"}} onPress={onOpen}>Change API Key</Button>
              {
                !isResponding && <CircleArrowUp opacity={inputContent.length == 0 ? 0.2 : 1} size={28} />
              }
              {
                isResponding && <CircleStop size={28}></CircleStop>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} hideCloseButton shouldCloseOnInteractOutside={false}
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
          <ModalHeader className="flex flex-col gap-1">Enter Gemini API Key</ModalHeader>
          <ModalBody>
            <Input label="API Key" placeholder="Enter your Google Gemini API Key" autoFocus id="api-key" value={modalAPIKeyValue} onInput={(x) => {setModalAPIKeyValue(x.target.value)}} type="password"/>
            <Checkbox id="usingPro" defaultSelected={usingPro}>Pro</Checkbox>
            <p className="text-sm" style={{color: "#A1A1AA", paddingLeft:"2px"}}>The API Key is stored locally in your browser.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={() => {
              window.localStorage.setItem("geminiAPIKey", modalAPIKeyValue)
              window.localStorage.setItem("usingPro", document.getElementById("usingPro").children[0].checked.toString())
              setIsUsingPro(document.getElementById("usingPro").children[0].checked)
              onClose()
            }}>
              Authenticate
            </Button>
          </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    </ClickSpark>
  )
}