import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { DataProvider, useData } from '../../context/DataContext';

describe('DataContext', () => {
  const wrapper = ({ children }) => <DataProvider>{children}</DataProvider>;

  test('createUser adds a new user with blocked set to false', () => {
    const { result } = renderHook(() => useData(), { wrapper });
    const initialLength = result.current.users.length;

    act(() => {
      result.current.createUser({
        name: 'Joao Silva',
        email: 'joao@email.com',
        role: 'client',
      });
    });

    expect(result.current.users.length).toBe(initialLength + 1);
    expect(result.current.users[0]).toMatchObject({
      name: 'Joao Silva',
      email: 'joao@email.com',
      role: 'client',
      blocked: false,
    });
  });

  test('createService creates a non-approved service with zero rating', () => {
    const { result } = renderHook(() => useData(), { wrapper });
    const initialLength = result.current.services.length;

    act(() => {
      result.current.createService({
        title: 'Encanamento',
        description: 'Reparo de canos',
        providerId: 'p_123',
      });
    });

    expect(result.current.services.length).toBe(initialLength + 1);
    expect(result.current.services[0]).toMatchObject({
      title: 'Encanamento',
      approved: false,
      rating: 0,
    });
  });

  test('createRequest creates a request with pendente status', () => {
    const { result } = renderHook(() => useData(), { wrapper });
    const initialLength = result.current.requests.length;

    act(() => {
      result.current.createRequest({
        clientId: 'c_123',
        title: 'Preciso de pintor',
        category: 'Pintura',
      });
    });

    expect(result.current.requests.length).toBe(initialLength + 1);
    expect(result.current.requests[0].status).toBe('pendente');
  });

  test('sendMessage adds a message and updates the conversation lastMessage', () => {
    const { result } = renderHook(() => useData(), { wrapper });
    let conversationId;
    const initialMessageCount = result.current.messages.length;

    act(() => {
      conversationId = result.current.openConversationForRequest('req_123', ['user1', 'user2']);
    });

    act(() => {
      result.current.sendMessage({
        conversationId,
        senderId: 'user1',
        text: 'Oi, tudo bem?',
        time: '10:30',
      });
    });

    expect(result.current.messages.length).toBe(initialMessageCount + 1);

    const updatedConversation = result.current.conversations.find(
      (conversation) => conversation.id === conversationId
    );

    expect(updatedConversation.lastMessage).toBe('Oi, tudo bem?');
  });

  test('updateRequestStatus updates the selected request status', () => {
    const { result } = renderHook(() => useData(), { wrapper });
    let requestId;

    act(() => {
      result.current.createRequest({
        clientId: 'c_123',
        title: 'Preciso de eletricista',
      });
    });

    requestId = result.current.requests[0].id;

    act(() => {
      result.current.updateRequestStatus(requestId, 'aceito');
    });

    const updatedRequest = result.current.requests.find((request) => request.id === requestId);

    expect(updatedRequest.status).toBe('aceito');
  });
});
