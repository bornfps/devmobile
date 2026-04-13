import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  mockCategories,
  mockConversations,
  mockMessages,
  mockReports,
  mockRequests,
  mockReviews,
  mockServices,
  mockUsers,
} from '../services/mockData';

const DataContext = createContext(null);

const id = (prefix) => `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export function DataProvider({ children }) {
  const [users, setUsers] = useState(mockUsers);
  const [services, setServices] = useState(mockServices);
  const [requests, setRequests] = useState(mockRequests);
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const [reviews] = useState(mockReviews);
  const [reports, setReports] = useState(mockReports);
  const [categories] = useState(mockCategories);

  const createUser = (payload) => setUsers((prev) => [{ id: id('u'), blocked: false, ...payload }, ...prev]);
  const updateUser = (userId, payload) =>
    setUsers((prev) => prev.map((item) => (item.id === userId ? { ...item, ...payload } : item)));
  const blockUser = (userId) =>
    setUsers((prev) => prev.map((item) => (item.id === userId ? { ...item, blocked: true } : item)));

  const createService = (payload) =>
    setServices((prev) => [{ id: id('s'), approved: false, rating: 0, ...payload }, ...prev]);
  const updateService = (serviceId, payload) =>
    setServices((prev) => prev.map((item) => (item.id === serviceId ? { ...item, ...payload } : item)));
  const removeService = (serviceId) => setServices((prev) => prev.filter((item) => item.id !== serviceId));
  const approveService = (serviceId) =>
    setServices((prev) => prev.map((item) => (item.id === serviceId ? { ...item, approved: true } : item)));

  const createRequest = (payload) =>
    setRequests((prev) => [{ id: id('r'), status: 'pendente', ...payload }, ...prev]);
  const updateRequestStatus = (requestId, status) =>
    setRequests((prev) => prev.map((item) => (item.id === requestId ? { ...item, status } : item)));

  const openConversationForRequest = (requestId, participants) => {
    const found = conversations.find((item) => item.requestId === requestId);
    if (found) return found.id;

    const conversationId = id('cv');
    setConversations((prev) => [
      {
        id: conversationId,
        requestId,
        participants,
        lastMessage: '',
      },
      ...prev,
    ]);

    return conversationId;
  };

  const sendMessage = ({ conversationId, senderId, text, time }) => {
    setMessages((prev) => [{ id: id('m'), conversationId, senderId, text, time }, ...prev]);
    setConversations((prev) =>
      prev.map((item) => (item.id === conversationId ? { ...item, lastMessage: text } : item))
    );
  };

  const updateReportStatus = (reportId, status) =>
    setReports((prev) => prev.map((item) => (item.id === reportId ? { ...item, status } : item)));

  const value = useMemo(
    () => ({
      users,
      services,
      requests,
      conversations,
      messages,
      reviews,
      reports,
      categories,
      createUser,
      updateUser,
      blockUser,
      createService,
      updateService,
      removeService,
      approveService,
      createRequest,
      updateRequestStatus,
      openConversationForRequest,
      sendMessage,
      updateReportStatus,
    }),
    [users, services, requests, conversations, messages, reviews, reports, categories]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de DataProvider.');
  }
  return context;
}
