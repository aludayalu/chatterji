import { Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, Input, ModalFooter, Checkbox, Tooltip } from "@heroui/react";
import { CircleStop, CircleArrowUp, ArrowDown, ArrowRightToLine } from "lucide-react"
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

const UserMessage = (content, i, setInputContent, currentChat, setCurrentChat, setIsResponding) => {
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
  const {isOpen: ChatHistoryModalIsOpen, onOpen: ChatHistoryModalOnOpen, onOpenChange: ChatHistoryModalOnOpenChange, onClose: ChatHistoryModalOnClose} = useDisclosure()
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

  function ChatHistoryKeyboardHandler(event) {
    if (event.key == "ArrowUp") {
        if (selectedItem == 0) return;
        setSelectedItem(selectedItem - 1)
    }

    if (event.key == "ArrowDown") {
        if (selectedItem == ChatHistoryQueryResults.length - 1) {
            return
        }
        setSelectedItem(selectedItem + 1)
    }

    if (event.key == "Enter") {
        try {event.preventDefault()} catch{}

        if (ChatHistoryQueryResults.length == 0) {
            return;
        }

        setSelectedItem(0)
        setChatHistoryInputText("")

        if (ChatHistoryQueryResults[selectedItem].date == "Command") {
            commands[ChatHistoryQueryResults[selectedItem].title]()
            return
        }

        localStorage.setItem("readerId", "")
        setChatId(ChatHistoryQueryResults[selectedItem].id)
        ChatHistoryModalOnClose()
        setIsResponding(false)
        router.push("/?id="+ChatHistoryQueryResults[selectedItem].id)
    }

    if (event.key == "Tab") {
        ChatHistoryModalOnClose()
    }
  }

  function KeyboardListener(event) {
    if (ChatHistoryModalIsOpen) {
        ChatHistoryKeyboardHandler(event)
        return
    }

    if (event.key === "Enter" && !event.shiftKey) {
      if (window.localStorage.getItem("geminiAPIKey") == null || inputContent == "") {
        onOpen()
        return
      }

      chatId = HandleChat()

      setCurrentChat((currentChat) => {
        var newChat = [...currentChat, {role: "user", parts: [{ text: inputContent}]}, {role: "model", parts: [{ text: ""}]}]
        window.localStorage.setItem(chatId, JSON.stringify(newChat))
        window.localStorage.setItem(chatId+"date", parseInt(Number(new Date()) / 1000).toString())
        return newChat
      })

      setIsResponding(true)

      setTimeout(() => {
        setAutoScroll(true)
      }, 10)

      setInputContent("")

      streamGeminiResponse([...currentChat, {role: "user", parts: [{ text: inputContent}]}], (x, id) => {
        x = JSON.parse(x)
        if (x.type != "output") return;
        x =  x.data + "\n\n"
        setCurrentChat((prevChat) => {
          if (window.localStorage.getItem("readerId")!=id) {
            return prevChat
          }
          const updatedChat = [...prevChat];
          const lastMessage = { ...updatedChat[updatedChat.length - 1] };
          const lastPart = { ...lastMessage.parts[0] };
        
          lastPart.text += x;
          lastMessage.parts = [lastPart];
          updatedChat[updatedChat.length - 1] = lastMessage;

          window.localStorage.setItem(chatId, JSON.stringify(updatedChat))

          window.localStorage.setItem(chatId+"date", parseInt(Number(new Date()) / 1000).toString())

          return updatedChat;
        });
      }, () => {
        setIsResponding(false)
      })
      try {event.preventDefault()} catch{}
    }

    if (event.code == "Tab") {
        ChatHistoryModalOnOpen()
        event.preventDefault();
    }

    if (event.code == "Escape") {
      localStorage.setItem("readerId", "")
      setIsResponding(false)
    }

    if (event.key == "/") {
        if (document.activeElement != document.querySelector("textarea")) {
            event.preventDefault()
            document.querySelector("textarea").focus()
        }
    }
  }

  var [selectedItem, setSelectedItem] = useState(0)

  const [ChatHistoryQueryResults, setChatHistoryQueryResults] = useState([])

  useEffect(() => {

    document.addEventListener("keydown", KeyboardListener)

    return () => {document.removeEventListener("keydown", KeyboardListener)}
  }, [inputContent, ChatHistoryModalIsOpen, selectedItem, ChatHistoryQueryResults])

  const prevScrollTop = useRef(0);

  const [chatHistoryInputText, setChatHistoryInputText] = useState("")

  function getGithubTimeDelta(unixTimestampSec) {
        const seconds = Math.floor(Date.now() / 1000) - unixTimestampSec;

        if (seconds < 60) {
            return "just now";
        } else if (seconds < 3600) {
            const mins = Math.floor(seconds / 60);
            return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
        } else if (seconds < 86400) {
            const hours = Math.floor(seconds / 3600);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (seconds < 604800) {
            const days = Math.floor(seconds / 86400);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (seconds < 2592000) {
            const weeks = Math.floor(seconds / 604800);
            return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
        } else if (seconds < 31536000) {
            const months = Math.floor(seconds / 2592000);
            return `${months} month${months !== 1 ? 's' : ''} ago`;
        } else {
            const years = Math.floor(seconds / 31536000);
            return `${years} year${years !== 1 ? 's' : ''} ago`;
        }
  }

  function NewChat() {
    setCurrentChat([])
    setChatId(null)
    ChatHistoryModalOnClose()
    localStorage.setItem("readerId", "")
    setIsResponding(false)
    router.push("/")
    setTimeout(() => {
      document.querySelector("textarea").focus()
    }, 10)
    return
  }

  var commands = {
    "New Chat - Deletes the current chat": () => {
        localStorage.removeItem(chatId+"date")
        localStorage.removeItem(chatId)
        NewChat()
    }
  }

  function GetResults(query) {
    try {eval("localStorage")} catch {
        return
    }
    var results = {}
    for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);
        if (key.endsWith("date")) {
            var chat = localStorage.getItem(key.split("date")[0])
            if (!chat.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim())) {
                continue
            }
            chat = JSON.parse(chat)
            var date = parseInt(localStorage.getItem(key))
            results[date] = {"date": getGithubTimeDelta(date), "title": chat[0].parts[0].text, "chat": chat, "id": key.split("date")[0]}
        }
    }
    
    var sortedResults = Object.keys(results)
        .sort((a, b) => b - a)
        .map(key => results[key]);
    
    var filteredCommands = []

    var commandsKeys = Object.keys(commands)

    for (let index = 0; index < commandsKeys.length; index++) {
        const element = commandsKeys[index];
        if (element.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
            filteredCommands.push({"date": "Command", "title": element, "id": ""})
        }
    }

    return [...filteredCommands]
  }

  useEffect(() => {
    if (ChatHistoryModalIsOpen) {
        setChatHistoryQueryResults(GetResults(chatHistoryInputText))
    }
  }, [ChatHistoryModalIsOpen, chatHistoryInputText])
  var queryInputCurrentWidth = ""

  if (ChatHistoryModalIsOpen) {
    try {
        queryInputCurrentWidth = document.getElementById("queryInput").clientWidth + "px"
    } catch {}
  }

  useEffect(() => {
    setSelectedItem(0)
  }, [chatHistoryInputText])

  return (
    <ClickSpark>
    <div style={{minHeight:"100vh", width:"100vw", backgroundColor:"#111", overflowY: "auto", color: "white"}} ref={chatboxRef} id="chatbox" onScroll={(e) => {
      if (!isResponding) {
        return
      }
      const curr = e.target.scrollTop;
      if (curr + 10 < prevScrollTop.current) {
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
              <div>
                <h1 className="text-4xl mt-10 text-center">Yeti Buddy Your Companion</h1>
                <div className="flex justify-center items-center text-center" style={{color: "#A1A1AA", marginTop: "14px"}}>
                    Press the Tab Key to open the Command Pallette
                </div>
              </div>
            </div>
            </> : ""}
            {currentChat.map((item, i) => {
              if (item.role == "user") {
                return UserMessage(item.parts[0].text, Number(i), setInputContent, currentChat, setCurrentChat, setIsResponding)
              } else {
                return ModelMessage(item.parts[0].text)
              }
            })}
            {isResponding && <p className="shiny-text">Yeti is working!</p>}
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
            <textarea style={{height:"90%", width:"97.5%", border:"none", padding:"5px", backgroundColor: "#1c1c1c"}}
              onInput={(x) => {
                setInputContent(x.target.value)
              }}
              value={inputContent}
              placeholder="Write your message here"
              autoFocus
            >

            </textarea>
          </div>
        </div>
      </div>
    </div>
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}
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
    <Modal isOpen={ChatHistoryModalIsOpen} placement="top" onOpenChange={ChatHistoryModalOnOpenChange} backdrop="blur" hideCloseButton>
        <ModalContent style={{padding:"10px", maxWidth:"100vw", width: "fit-content"}}>
            {
                (onClose) => (
                    <>
                    <textarea id="queryInput" style={{padding: "14px", width:"60vw", fontSize: "20px", borderTopRightRadius: "10px", borderTopLeftRadius: "10px", borderBottomLeftRadius: ChatHistoryQueryResults.length == 0 ? "10px" : null, borderBottomRightRadius: ChatHistoryQueryResults.length == 0 ? "10px" : null}} rows={1} autoFocus
                        value={chatHistoryInputText}
                        placeholder="Write your query here"
                        onInput={(e) => {
                            setChatHistoryInputText(e.target.value)
                        }}
                    ></textarea>
                    {ChatHistoryQueryResults.map((x, i) =>
                        <>
                        <div id={"selection_"+i} style={{width: queryInputCurrentWidth, backgroundColor: selectedItem == i ? "#222" : "#111", padding: "8px", borderBottomRightRadius: i == ChatHistoryQueryResults.length - 1 ? "10px" : "", borderBottomLeftRadius: i == ChatHistoryQueryResults.length - 1 ? "10px" : "", cursor: "pointer"}}
                            onClick={(event) => {
                                if (event.target.id == "") {
                                    event.target = event.target.parentElement
                                }
                                selectedItem = Number(event.target.id.split("selection_")[1])
                                ChatHistoryKeyboardHandler({"key": "Enter"})
                            }}
                            onMouseEnter={(e) => {
                                if (e.target.id == "") {
                                    e.target = e.target.parentElement
                                }
                                e.target.style.backgroundColor = "#222"
                            }}
                            onMouseLeave={(e) => {
                                if (e.target.id == "") {
                                    e.target = e.target.parentElement
                                }
                                e.target.style.backgroundColor = selectedItem == i ? "#222" : "#111"
                            }}
                        >
                            <h1 style={{overflow: "hidden", "whiteSpace": "nowrap", "textOverflow": "ellipsis", display: "block"}}>{x.title.replace(/\n/g, ' ')}</h1>
                            <h2>{x.date}</h2>
                        </div>
                        </>
                    )}
                    </>
                )
            }
        </ModalContent>
    </Modal>
    </ClickSpark>
  )
}