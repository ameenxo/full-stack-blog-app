"use client"
import { useSocket } from '@/Context/SocketContext'
import React from 'react'
import ListUserMessage from '../listUserMessage/ListUserMessage'

function ChatHeader() {
  const { selectedUser } = useSocket()

  if (selectedUser) {
    return <ListUserMessage messageInfo={selectedUser} />
  }
  return null
}

export default ChatHeader