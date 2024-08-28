import { createContext, useState } from 'react'
import chatData from '../data'
import { supabase } from '../superbase'
import messageType from '../Utility/messageTypeChecker'

export const ChatContext = createContext({
  chat: [],
  chatInfo: [],
  chatId: '',
  lastMessage: [],
  showPinAudio: false,
  profileInfo: null,
  audio: null,
  pageX: null,
  pageY: null,
  isPin: false,
  friendID: null,
  isRemove: false,
  showContextMenu: false,
  messageID: null,
  messageIDFile: null,
  editContent: '',
  checkMessage: [],
  showCheckBox: false,
  pinMessage: [],
  showPin: false,
  showAlert: false,
  forwardContact: false,
  showReply: false,
  isChatInfo: false,
  showSelfForward: false,
  showFrowardModal: false,
  replyMessage: null,
  forwardSelfMessage: null,
  userMessage: null,
  forwardList: [],
  fileProgress: 0,
  showPreview: {
    show: false,
    type: null,
    src: null,
  },
  fileUrl: '',
  messageType: '',
  senderID: '',
  messageContent: '',
  messageName: '',
  setMessageType: () => {},
  setMessageName: () => {},
  setMessageContent: () => {},
  setSenderID: () => {},
  findUserMessage: () => {},
  filterChat: () => {},
  sendMessageHandler: () => {},
  pinMessageHandler: () => {},
  unpinHandler: () => {},
  findChat: () => {},
  removeMessages: () => {},
  replyMessageHandler: () => {},
  ForwardHandler: () => {},
  ForwardContactHandler: () => {},
  forwardClickHandler: () => {},
  forwardSelfClickHandler: () => {},
  forwardContactClickHandler: () => {},
  contextmenuHandler: () => {},
  checkMessageHandler: () => {},
  displayCheckBoxHandler: () => {},
  removeCheckMessage: () => {},
  removeReactionEmojiHandler: () => {},
  reactionEmojiHandler: () => {},
  selectEditTextMessageHandler: () => {},
  DeleteChat: () => {},
  editHandler: () => {},
  clickRemoveHandler: () => {},
  showCheckBoxHandler: () => {},
  emptyCheckBoxHandler: () => {},
  showPinHandler: () => {},
  showPreviewHandler: () => {},
  setForwardSelfMessage: () => {},
  setFileUrl: () => {},
  setEditContent: () => {},
  setShowReply: () => {},
  setFileProgress: () => {},
  setShowSelfForward: () => {},
  setReplyMessage: () => {},
  setCheckMessage: () => {},
  setShowContextMenu: () => {},
  setShowAlert: () => {},
  setForwardContact: () => {},
  setShowForwardModal: () => {},
  setChat: () => {},
  setChatInfo: () => {},
  setMessageID: () => {},
  setShowPreview: () => {},
  setAudio: () => {},
  contextmenuInfoHandler: () => {},
  setPinMessage: () => {},
  setShowPin: () => {},
  setFriendID: () => {},
  setISChatInfo: () => {},
  setIsPin: () => {},
  setShowCheckBox: () => {},
  setProfileInfo: () => {},
  clearHistory: () => {},
  setLastMessage: () => {},
  deleteMessage: () => {},
  setForwardList: () => {},
})

export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState([])
  const [chatInfo, setChatInfo] = useState([])
  const [lastMessage, setLastMessage] = useState([])
  const [forwardList, setForwardList] = useState([])
  const [fileProgress, setFileProgress] = useState(0)

  const [chatId, setChatId] = useState('')
  const [profileInfo, setProfileInfo] = useState(null)
  const [friendID, setFriendID] = useState(null)
  const [showPinAudio, setShowPinAudio] = useState(false)
  const [pageX, setPageX] = useState(null)
  const [pageY, setPageY] = useState(null)
  const [messageID, setMessageID] = useState(null)
  const [messageIDFile, setMessageIDFile] = useState(null)
  const [showPin, setShowPin] = useState(false)
  const [checkMessage, setCheckMessage] = useState([])
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [showCheckBox, setShowCheckBox] = useState(false)
  const [userMessage, setUserMessage] = useState()
  const [checkForward, setCheckForward] = useState(false)
  const [forwardContact, setForwardContact] = useState(false)
  const [isPin, setIsPin] = useState({})
  const [pinMessage, setPinMessage] = useState([])
  const [forwardSelfMessage, setForwardSelfMessage] = useState(null)
  const [showSelfForward, setShowSelfForward] = useState(false)
  const [showFrowardModal, setShowForwardModal] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [messageContent, setMessageContent] = useState('')
  const [messageName, setMessageName] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [isRemove, setIsRemove] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [replyMessage, setReplyMessage] = useState(null)
  const [audio, setAudio] = useState()
  const [isChatInfo, setISChatInfo] = useState(false)
  const [font, setFont] = useState(16)
  const [chatBg, setChatBg] = useState('')
  const [searchChat, setSearchChat] = useState('')
  const [messageType, setMessageType] = useState('')
  const [senderID, setSenderID] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [showPreview, setShowPreview] = useState({
    show: false,
    type: null,
    src: null,
  })

  const filterChat = (id) => {
    let findChat = chatInfo.map((item) =>
      item.senderid.userid !== id ? item.recipientid : item.senderid
    )
    setChatId(id)
    setProfileInfo(findChat[0])
  }
  const findUserMessage = (id) => {
    const findedMessage = chat?.find((user) => user.id == id)
    setUserMessage(findedMessage)
  }
  const findChat = (chatArr, id) => chatArr.find((item) => item.id == id)
  const sendMessageHandler = (txt, replyMessage = null) => {
    const chats = [...chat]

    const { userName, bgProfile, id, profileImg, relation, messages } = chats[0]
    const message = {
      messageId: crypto.randomUUID(),
      messageDis: txt,
      reaction: null,
      to: userMessage?.userName,
      date: new Date(),
      from: {
        userName,
        bgProfile,
        id,
        profileImg,
        relation,
        date: new Date(),
      },
      read: false,
      send: true,
      check: false,
      edited: false,
      pin: false,
      replyData: replyMessage,
    }
    const newChat = [...chat]

    const findedChat = findChat(newChat, chatId)

    findedChat.messages.push(message)

    setChat(newChat)
  }
  const removeMessages = (id, idFile) => {
    setMessageID(null)

    const newChat = [...chat]

    const findedChat = findChat(newChat, chatId)
    const newMessge = findedChat?.messages

    const findMessage = newMessge?.find((item) => item?.messageId === messageID)

    if (typeof findMessage?.messageDis === 'string') {
      removeMessageText(id, newChat, findedChat, newMessge)
      // if(findMessage.pin){
      //     console.log(findMessage)
      //     findMessage.pin = false
      // const filterPin = pinMessage.filter((item) => item.pin)

      // setPinMessage(filterPin)
      // }
    } else {
      removeMessageFile(id, idFile)
      // if(findMessage.pin){
      //     findMessage.pin = false
      // const filterPin = pinMessage.filter((item)=>item.pin===true)

      // setPinMessage(filterPin)
      // }
    }
  }
  // remove message type===file
  const removeMessageFile = (id, idType) => {
    const newChat = [...chat]

    const findedChat = findChat(newChat, chatId)
    const newMessge = findedChat?.messages

    const findMessage = newMessge?.find((item) => item?.messageId === id)

    const filterMessage = findMessage?.messageDis?.findIndex(
      (item) => item?.id === idType
    )
    const filterAudioMessage = findMessage?.messageDis?.find(
      (item) => item?.src === audio
    )
    if (filterAudioMessage) setAudio(null)

    findMessage?.messageDis?.splice(filterMessage, 1)
    findMessage.pin = false

    const filterPin = pinMessage.filter((item) => item.pin)
    console.log(filterPin)

    setPinMessage(filterPin)
    findedChat.messages = newMessge.filter(
      (item) => item?.messageDis.length !== 0
    )

    setChat(newChat)
  }
  // const removeMessageText = (id, chat, findedChat, newMessage) => {
  //   const findMessage = newMessage?.find(
  //     (item) => item.messageId === id && item?.messageDis
  //   )
  //   findMessage.messageDis = ''
  //   findMessage.pin = false

  //   const filterPin = pinMessage.filter(
  //     (item) => item.pin && item?.messageDis !== ''
  //   )

  //   setPinMessage(filterPin)
  //   findedChat.messages = newMessage.filter(
  //     (item) => item.messageDis !== '' || item.messageDis.length < 0
  //   )

  //   findedChat.messages.messageDis = findMessage
  //   setChat(chat)
  // }
  const deleteMessage = async (id, chatId) => {
    const { data, error } = await supabase
      .from('messages')
      .update({ isDeleted: true })
      .eq('messageid', id)
      .eq('chatID', chatId)
      .select()
    if (error) console.log(error)

    setTimeout(async () => {
      const { error: deleteError } = await supabase
        .from('messages')
        .delete()
        .eq('isDeleted', true)
        // .or('messageid', id)
        .eq('chatID', chatId)
        .select()
      if (deleteError) console.log(deleteError)
    }, 300)
  }
  const forwardSelfMessageHandler = (id) => {
    const newMessage = [...message?.messages]

    const findForwardMessage = newMessage.find((item) => item.messageId === id)

    setForwardSelfMessage({ ...findForwardMessage, ...message })

    setShowSelfForward(true)
  }

  const ForwardHandler = (isCheck = false) => {
    setShowContextMenu(false)
    setShowForwardModal(true)
    isCheck ? setCheckForward(true) : setCheckForward(false)
  }
  const ForwardContactHandler = () => {
    setForwardContact(true)
    setShowForwardModal(true)
  }
  // forward
  const forward = (arr) => {
    const { id, bgProfile, profileImg, relation, userName } = arr

    return { id, bgProfile, profileImg, relation, userName }
  }

  const isCheckForward = (newChat, findedChat, userId, type = 'forward') => {
    const findUserForward = newChat?.find((user) => user.id === userId)

    let copiedItems = null
    if (type === 'forward') {
      findedChat.forEach((item) => {
        item.check = false
      })
      copiedItems = findedChat.map((item) => ({
        ...item,

        forward: forward(userMessage),
      }))
    } else if (type === 'forwardSelf') {
      findedChat.forEach((item) => {
        item.check = false
        item.messageId = crypto.randomUUID()
      })
      copiedItems = findedChat.map((item) => ({
        ...item,

        forwardSelf: forward(userMessage),
      }))
    }

    findUserForward.messages.push(...copiedItems)
  }
  const notCheckForward = (newChat, findedChat, userId, type = 'forward') => {
    const findUserForward = newChat?.find((user) => user.id === userId)

    const { replyData, check = false, ...chatData } = findedChat

    if (type === 'forwardSelf') {
      findUserForward.messages.push({
        ...chatData,
        check,
        messageId: crypto.randomUUID(),
        forwardSelf: forward(userMessage),
      })
    } else if (type === 'forward') {
      console.log(forward(userMessage))
      findUserForward.messages.push({
        ...chatData,
        check,

        forward: forward(userMessage),
      })
    }
  }
  // const forwardClickHandler = (userId) => {
  //   const newChat = [...chat]

  //   setCheckMessage([])
  //   let findChat = null
  //   const newMessages = [...userMessage.messages]
  //   if (!checkForward) {
  //     findChat = newMessages.find((item) => item?.messageId === messageID)

  //     if (userId == chatId) forwardSelfMessageHandler(findChat.messageId)
  //     else {
  //       notCheckForward(newChat, findChat, userId)
  //     }
  //   } else {
  //     findChat = newMessages.filter((item) => item?.check)
  //     isCheckForward(newChat, findChat, userId)
  //   }

  //   setChat(newChat)
  //   setShowForwardModal(false)
  // }
  const forwardClickHandler = async (
    chatId,
    userId,
    recipientId,
    forwardType,
    forwardFormChat
  ) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            senderid: userId,
            recipientid: recipientId,
            chatID: chatId,
            content: !forwardContact ? messageContent : 'Contact',
            name: messageName,
            messageType: !forwardContact?messageType:'text',
            forward_type: forwardType,
            isForward: true,
            forward_from: !forwardContact ?senderID:friendID,
            status: 'send',
            forwardFormChat,
            forwardMessageID:!forwardContact ? messageID:null,
            contact: forwardContact ? friendID : null,
          },
        ])
        .select()
      if (error) throw error

      setShowForwardModal(false)
    } catch (error) {
      console.log(error)
    }
  }
  const multiForwardClickHandler = async (
    chatId,
    userId,
    recipientId,
    forwardType,
    forwardFormChat
  ) => {
    // console.log(chatId);
    const messagesData = []
    for (const checked of checkMessage) {
      let { data: message, error: err } = await supabase
        .from('messages')
        .select('*')
        .eq('messageid', checked)
      if (!message.length) return

      messagesData.push(...message)
    }

    for (const message of messagesData) {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            senderid: userId,
            recipientid: message?.recipientid,
            chatID: chatId,
            content: message?.content,
            name: message?.name,
            messageType: message?.messageType,
            forward_type: forwardType,
            isForward: true,
            forward_from: message?.senderid,
            status: 'send',
            forwardFormChat,
            forwardMessageID: message.messageid,
          },
        ])
        .select()
      if (error) console.log(error)
    }
    setShowForwardModal(false)
    setCheckMessage([])
    setShowCheckBox(false)
  }
  // forward
  const forwardSelfClickHandler = (userId) => {
    let newFindChat = null
    const newChat = [...chat]

    setCheckMessage([])
    // find user for forward message
    const findUserForward = newChat?.find((user) => user.id === userId)
    const newMessages = [...userMessage.messages]

    if (!checkForward) {
      newFindChat = newMessages.find((item) => item?.messageId === messageID)

      if (findChat) {
        notCheckForward(newChat, newFindChat, userId, 'forwardSelf')
      }
    } else {
      newFindChat = newMessages.filter((item) => item?.check)

      isCheckForward(newChat, newFindChat, userId, 'forwardSelf')
    }

    setChat(newChat)
  }
  // forwardContact
  const forwardContactClickHandler = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            senderid: userId,
            recipientid: recipientId,
            chatID: chatId,
            content: messageContent,
            name: messageName,
            messageType: messageType,
            forward_type: 'Contact',
            isForward: true,
            forward_from: senderID,
            status: 'send',
            forwardFormChat,
            forwardMessageID: messageID,
          },
        ])
        .select()
      if (error) throw error

      setShowForwardModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  const contextmenuHandler = (
    e,
    id,
    senderid,
    messageType,
    content,
    name,
    isPin
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setShowContextMenu(false)

    setISChatInfo(false)
    setShowContextMenu(true)
    setPageX(e.pageX)
    setPageY(e.pageY)

    setMessageID(id)
    console.log(id)
    // setMessageIDFile(idFile)
    setMessageContent(content)
    setSenderID(senderid)
    setMessageType(messageType)
    setMessageName(name)
    setIsPin({ mID: id, isPin })
  }
  // const pinMessageHandler = (id, isPin) => {
  //   const newMessage = [...message?.messages]
  //   const findPin = newMessage.find((item) => item.messageId === id)

  //   console.log(findPin)
  //   if (!findPin.pin && pinMessage.length <= 4) {
  //     setIsPin(true)
  //     findPin.pin = true
  //     setPinMessage((prev) => [...prev, findPin])
  //   } else {
  //     setIsPin(false)
  //     findPin.pin = false
  //     const filterPin = pinMessage.filter((item) => item.pin)

  //     setPinMessage(filterPin)
  //   }
  // }
  const pinMessageHandler = async (id, chatId, pin) => {
    if (pin.mID === id && !pin.isPin && pinMessage.length <= 4) {
      const { data: pin, error: pinError } = await supabase
        .from('messages')
        .update({ isPin: true })
        .eq('messageid', id)
        .eq('chatID', chatId)
        .select()
      if (pinError) console.log(pinError)
      setIsPin(true)
    } else {
      const { data: pin, error: pinError } = await supabase
        .from('messages')
        .update({ isPin: false })
        .eq('messageid', id)
        .eq('chatID', chatId)
        .select()
      if (pinError) console.log(pinError)
      setIsPin(false)
    }
  }
  const unpinHandler = () => {
    const newPinMessage = [...pinMessage]
    newPinMessage.forEach((item) => (item.pin = false))

    setPinMessage([])
    setShowPin(false)
  }
  const replyMessageHandler = (id, content, type, name, senderid) => {
    // const newMessage = [...message?.messages]

    // const findReplyMessage = newMessage.find((item) => item.messageId === id)
    // const user = 'Abolfazl'
    // setReplyMessage({ ...findReplyMessage, user })
    setReplyMessage({
      messageid: id,
      content,
      messageType: type,
      name,
      senderid,
    })
    setShowReply(true)
  }

  const checkMessageHandler = (id) => {
    setCheckMessage((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((messageId) => messageId !== id)
        : [...prevSelected, id]
    )
  }
  const displayCheckBoxHandler = (arr) => {
    const isCheck = arr.some((item) => item.check)
    setShowCheckBox(isCheck)
  }

  const removeCheckMessage = async (chatId) => {
    for (const checked of checkMessage) {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('chatID', chatId)
        .eq('messageid', checked)
      if (error) console.log(error)
    }
    setCheckMessage([])
    setShowCheckBox(false)
  }

  const reactionEmojiHandler = (emojiId) => {
    const newChat = [...chat]
    const newMessage = [...message?.messages]
    const findedChat = newChat.find((item) => item.id == chatId)
    const ractionUser = newChat.find((item) => item.relation === 'me')

    const { id, bgProfile, profileImg, relation, userName } = ractionUser
    const findMessage = newMessage.find(
      (message) => message.messageId === messageID
    )

    if (findMessage.reaction === emojiId) {
      findMessage.reaction = {}
    } else {
      findMessage.reaction = {
        reaction: emojiId,
        profile: {
          id,
          bgProfile,
          profileImg,
          relation,
          userName,
        },
      }
    }

    setMessage(newMessage)
    findedChat.messages = newMessage
    setChat(newChat)
  }
  const removeReactionEmojiHandler = (messageid) => {
    const newChat = [...chat]
    const newMessage = [...message?.messages]
    const findedChat = newChat.find((item) => item.id == chatId)

    const findMessage = newMessage.find(
      (message) => message.messageId === messageid
    )

    findMessage.reaction = ''
    setMessage(newMessage)
    findedChat.messages = newMessage
    setChat(newChat)
  }

  const DeleteChat = (id = null) => {
    if (!id) {
      setChat(chat.filter((item) => item.id != chatId))
    } else {
      setChat(chat.filter((item) => item.id != id))
    }
  }
  // edit message type===text
  const selectEditTextMessageHandler = (id, content, type, name) => {
    setEditContent({ messageid: id, content, messageType: type, name })
    // try {
    //   let { data: messages, error } = await supabase
    //     .from('messages')
    //     .select('*')
    //     .eq('messageid', id)
    //     .single()
    //   if (error) throw error

    // } catch (error) {
    //   console.log(error)
    // }
  }
  const clickRemoveHandler = () => {
    setShowAlert(true)
    setIsRemove(true)
    setShowContextMenu(false)
    setIsPin(false)
  }

  const editHandler = async (txt, mId, chatID) => {
    try {
      console.log(messageID)
      const { data, error } = await supabase
        .from('messages')
        .update({ content: txt, isEdited: true })
        .eq('messageid', mId)
        .eq('chatID', chatID)
        .select()
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }
  const showCheckBoxHandler = () => {
    setShowCheckBox((prev) => !prev)
  }
  const emptyCheckBoxHandler = () => {
    setCheckMessage([])
  }
  const showPinHandler = () => {
    setShowPin()
  }
  const showPreviewHandler = (preview) => {
    setShowPreview(preview)
  }
  const contextmenuInfoHandler = (e, id, idFile = null, isInfo = false) => {
    e.preventDefault()
    e.stopPropagation()
    setShowContextMenu(false)

    setPageX(e.pageX)
    setPageY(e.pageY)

    setMessageID(id)
    setMessageIDFile(idFile)

    setISChatInfo(isInfo)
  }
  const clearHistory = () => {
    const newChat = [...chat]
    const findedChat = findChat(newChat, chatId)
    findedChat.messages = []
    setChat(newChat)
  }
  return (
    <ChatContext.Provider
      value={{
        chat,
        chatId,
        profileInfo,
        sendMessageHandler,
        messageID,
        messageIDFile,
        contextmenuHandler,
        filterChat,
        findChat,
        ForwardHandler,
        findUserMessage,
        pinMessage,
        showPin,
        userMessage,
        pinMessageHandler,
        unpinHandler,
        forwardSelfMessage,
        removeMessages,
        forwardClickHandler,
        forwardContactClickHandler,
        forwardSelfClickHandler,
        ForwardContactHandler,
        checkMessageHandler,
        checkMessage,
        replyMessageHandler,
        replyMessage,
        showReply,
        displayCheckBoxHandler,
        DeleteChat,
        reactionEmojiHandler,
        removeCheckMessage,
        removeReactionEmojiHandler,
        editHandler,
        clickRemoveHandler,
        selectEditTextMessageHandler,
        showCheckBoxHandler,
        emptyCheckBoxHandler,
        showPinHandler,
        showPreview,
        showPreviewHandler,
        editContent,
        setForwardSelfMessage,
        setEditContent,
        setShowReply,
        setShowSelfForward,
        setReplyMessage,
        setCheckMessage,
        showContextMenu,
        pageX,
        pageY,
        setShowAlert,
        setShowContextMenu,
        showFrowardModal,
        forwardContact,
        setChat,
        setForwardContact,
        setShowForwardModal,
        isRemove,
        setMessageID,
        setShowPreview,
        audio,
        setAudio,
        showAlert,
        contextmenuInfoHandler,
        setPinMessage,
        setShowPin,
        setISChatInfo,
        isChatInfo,
        isPin,
        setIsPin,
        setShowCheckBox,
        showCheckBox,
        clearHistory,
        font,
        setFont,
        chatBg,
        setChatBg,
        searchChat,
        setSearchChat,
        showPinAudio,
        setShowPinAudio,
        chatInfo,
        setChatInfo,
        setProfileInfo,
        lastMessage,
        setLastMessage,
        friendID,
        setFriendID,
        fileUrl,
        setFileUrl,
        fileProgress,
        setFileProgress,
        deleteMessage,
        senderID,
        messageType,
        messageContent,
        forwardList,
        setForwardList,
        multiForwardClickHandler,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
