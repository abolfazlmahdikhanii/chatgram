import { createContext, useCallback, useState } from 'react'
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
  showInfoMenu: false,
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
  type: [],
  link: [],
  voice: [],
  file: [],
  searchText: '',
  searchLoading: false,
  setSearchText: () => {},
  setSearchLoading: () => {},
  setMessageType: () => {},
  setShowInfoMenu: () => {},
  setType: () => {},
  setLink: () => {},
  setVoice: () => {},
  setFile: () => {},
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
  const [type, setType] = useState([])
  const [link, setLink] = useState([])
  const [voice, setVoice] = useState([])
  const [file, setFile] = useState([])
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
  const [searchChat, setSearchChat] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [messageType, setMessageType] = useState('')
  const [senderID, setSenderID] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [showInfoMenu, setShowInfoMenu] = useState(false)
  const [showPreview, setShowPreview] = useState({
    show: false,
    type: null,
    src: null,
  })

  const deleteMessage = async (id, chatId) => {
    const { data, error } = await supabase
      .from('messages')
      .update({ isDeleted: true })
      .eq('messageid', id)
      // .eq('chatID', chatId)
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

  const ForwardHandler = (isCheck = false) => {
    setShowContextMenu(false)
    setShowForwardModal(true)
    isCheck ? setCheckForward(true) : setCheckForward(false)
  }
  const ForwardContactHandler = () => {
    setForwardContact(true)
    setShowForwardModal(true)
  }

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
            messageType: !forwardContact ? messageType : 'text',
            forward_type: forwardType,
            isForward: true,
            forward_from: !forwardContact ? senderID : friendID,
            status: 'send',
            forwardFormChat,
            forwardMessageID: !forwardContact ? messageID : null,
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

  const contextmenuHandler = useCallback(
    (e, id, senderid, messageType, content, name, isPin) => {
      e.preventDefault()
      e.stopPropagation()
      const { clientX, clientY } = event

      // Set initial position
      let x = clientX
      let y = clientY

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Adjust the position if it goes beyond the viewport
      if (clientX + 250 > viewportWidth) {
        x = viewportWidth - 250 // Assuming the context menu width is 150px
      }
      if (clientY + 300 > viewportHeight) {
        y = viewportHeight - 300 // Assuming the context menu height is 100px
      }

      setShowContextMenu(false)

      setISChatInfo(false)
      setShowContextMenu(true)

      setPageX(x)
      setPageY(y)

      setMessageID(id)

      // setMessageIDFile(idFile)
      setMessageContent(content)
      setSenderID(senderid)
      setMessageType(messageType)
      setMessageName(name)
      setIsPin({ mID: id, isPin })
    },
    []
  )

  const pinMessageHandler = async (id, chatId = null, pin, senderid) => {
    if (chatId) {
      if (pin.mID === id && !pin.isPin && pinMessage.length <= 4) {
        const { data: pin, error: pinError } = await supabase
          .from('messages')
          .update({ isPin: true })
          .eq('messageid', id)
          .eq('chatId', chatId)

          .select()
        if (pinError) console.log(pinError)
        setIsPin(true)
      } else {
        const { data: pin, error: pinError } = await supabase
          .from('messages')
          .update({ isPin: false })
          .eq('messageid', id)
          .eq('chatId', chatId)

          .select()
        if (pinError) console.log(pinError)
        setIsPin(false)
      }
    } else {
      if (pin.mID === id && !pin.isPin && pinMessage.length <= 4) {
        const { data: pin, error: pinError } = await supabase
          .from('messages')
          .update({ isPin: true })
          .eq('messageid', id)
          .eq('senderid', senderid)

          .select()
        if (pinError) console.log(pinError)
        setIsPin(true)
      } else {
        const { data: pin, error: pinError } = await supabase
          .from('messages')
          .update({ isPin: false })
          .eq('messageid', id)
          .eq('senderid', senderid)

          .select()
        if (pinError) console.log(pinError)
        setIsPin(false)
      }
    }
  }
  const unpinHandler = async (chatID, senderid) => {
    if (chatID) {
      try {
        const { data, error } = await supabase
          .from('messages')
          .update({ isPin: false })
          .eq('chatID', chatID)

          .select()
        if (error) throw error
        setPinMessage([])
        setShowPin(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const { data, error } = await supabase
          .from('messages')
          .update({ isPin: false })
          .eq('senderid', senderid)

          .select()
        if (error) throw error
        setPinMessage([])
        setShowPin(false)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const replyMessageHandler = (id, content, type, name, senderid) => {
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
        // .eq('chatID', chatId)
        .eq('messageid', checked)
      if (error) console.log(error)
    }
    setCheckMessage([])
    setShowCheckBox(false)
  }
  const reactionEmojiHandler = async (emojiId, msgId, chatID, userInfo) => {
    const { data: emojiData, error: fetchError } = await supabase
      .from('messages')
      .select('reactions')
      .eq('messageid', msgId)

    if (fetchError) {
      console.error(fetchError)
      return
    }

    const reactions = emojiData[0]?.reactions || []
    const existingReaction = reactions.find(
      (reaction) => reaction.userInfos.userid === userInfo.userid
    )

    // Define the user's reaction object for reuse
    const userReaction = {
      emojiId,
      userInfos: {
        userid: userInfo.userid,
        username: userInfo.username,
        email: userInfo.email,
        profile: userInfo.avatar_url,
        bgProfile: userInfo.bgProfile,
      },
    }

    try {
      // Add reaction if no reactions exist or if the user hasn’t reacted yet
      if (!existingReaction) {
        await supabase
          .from('messages')
          .update({ reactions: [...reactions, userReaction] })
          .eq('messageid', msgId)
          .select()
      }
      // Update the user's existing reaction
      else {
        existingReaction.emojiId = emojiId
        await supabase
          .from('messages')
          .update({ reactions })
          .eq('messageid', msgId)
          .select()
      }
    } catch (updateError) {
      console.error(updateError)
    }
  }

  const removeReactionEmojiHandler = async (
    messageid,
    chatID,
    userInfo,
    user
  ) => {
    let { data: emoji, error } = await supabase
      .from('messages')
      .select('*')
      // .eq('chatID', chatID)
      .eq('messageid', messageid)

    if (error) return
    const messages = emoji[0]?.reactions

    const newMessage = [...messages]
    const findedReaction = newMessage.findIndex(
      (item) => item.userInfos.userid === userInfo.userid
    )

    newMessage?.splice(findedReaction, 1)
    const { data, error: err } = await supabase
      .from('messages')
      .update({
        reactions: newMessage,
      })
      // .eq('chatID', chatID)
      .eq('messageid', messageid)
      .select()
    if (err) console.log(err)
  }

  const DeleteChat = async (id) => {
    try {
      const { error } = await supabase
        .from('friendrequests')
        .delete()
        .eq('requestid', id)
        .select()
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }
  // edit message type===text
  const selectEditTextMessageHandler = (id, content, type, name) => {
    setEditContent({ messageid: id, content, messageType: type, name })
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

    const { clientX, clientY } = event

    // Set initial position
    let x = clientX
    let y = clientY

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Adjust the position if it goes beyond the viewport
    if (clientX + 250 > viewportWidth) {
      x = viewportWidth - 250 // Assuming the context menu width is 150px
    }
    if (clientY + 300 > viewportHeight) {
      y = viewportHeight - 300 // Assuming the context menu height is 100px
    }
    setShowContextMenu(false)

    setPageX(x)
    setPageY(y)
    setShowInfoMenu((prev) => !prev)
    setMessageID(id)
    setMessageIDFile(idFile)

    setISChatInfo(isInfo)
  }
  const clearHistory = async (id,senderid) => {
    if(id){

    
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('chatID', id)
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }
  else{
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('senderid', senderid)
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }
  }
  return (
    <ChatContext.Provider
      value={{
        chat,
        chatId,
        profileInfo,
        messageID,
        messageIDFile,
        contextmenuHandler,
        ForwardHandler,
        pinMessage,
        showPin,
        userMessage,
        pinMessageHandler,
        unpinHandler,
        forwardSelfMessage,
        forwardClickHandler,
        forwardContactClickHandler,
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
        file,
        type,
        voice,
        link,
        setFile,
        setType,
        setLink,
        setVoice,
        setShowInfoMenu,
        showInfoMenu,
        setSenderID,
        searchText,
        setSearchText,
        searchLoading,
        setSearchLoading,
        setMessageContent,
        setMessageName,
        setMessageType,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
