const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; path?: string[] }>;
}

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data) {
    throw new Error('No data returned from GraphQL');
  }

  return result.data;
}

export const queries = {
  getUsers: `
    query GetUsers($pagination: PaginationInput) {
      users(pagination: $pagination) {
        id
        email
        username
        role
        status
        createdAt
      }
    }
  `,

  getUser: `
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        email
        username
        role
        status
        createdAt
      }
    }
  `,

  getProfiles: `
    query GetProfiles {
      profiles {
        id
        username
        email
        name
        displayName
        bio
        city
        location
        interests
        isPublic
        website
        memberSince
        profilePicture {
          url
          filename
        }
      }
    }
  `,

  getPublicProfiles: `
    query GetPublicProfiles {
      publicProfiles {
        id
        username
        email
        name
        displayName
        bio
        city
        location
        interests
        isPublic
        website
        memberSince
        profilePicture {
          url
          filename
        }
      }
    }
  `,

  getProfile: `
    query GetProfile($id: ID!) {
      profile(id: $id) {
        id
        username
        email
        name
        displayName
        bio
        city
        location
        interests
        isPublic
        website
        memberSince
        profilePicture {
          url
          filename
        }
      }
    }
  `,

  getProfileByUsername: `
    query GetProfileByUsername($username: String!) {
      profileByUsername(username: $username) {
        id
        username
        email
        name
        displayName
        bio
        city
        location
        interests
        isPublic
        website
        memberSince
        profilePicture {
          url
          filename
        }
      }
    }
  `,

  getEvents: `
    query GetEvents {
      events {
        id
        title
        description
        date
        time
        location
        maxAttendees
        attendees
        price
        vipOnly
        featured
        category
        eventImage {
          url
          filename
        }
        profilesAttending
      }
    }
  `,

  getFeaturedEvents: `
    query GetFeaturedEvents {
      featuredEvents {
        id
        title
        description
        date
        time
        location
        maxAttendees
        attendees
        price
        vipOnly
        featured
        category
        eventImage {
          url
          filename
        }
        profilesAttending
      }
    }
  `,

  getVipEvents: `
    query GetVipEvents {
      vipEvents {
        id
        title
        description
        date
        time
        location
        maxAttendees
        attendees
        price
        vipOnly
        featured
        category
        eventImage {
          url
          filename
        }
        profilesAttending
      }
    }
  `,

  getUpcomingEvents: `
    query GetUpcomingEvents {
      upcomingEvents {
        id
        title
        description
        date
        time
        location
        maxAttendees
        attendees
        price
        vipOnly
        featured
        category
        eventImage {
          url
          filename
        }
        profilesAttending
      }
    }
  `,

  getEvent: `
    query GetEvent($id: ID!) {
      event(id: $id) {
        id
        title
        description
        date
        time
        location
        maxAttendees
        attendees
        price
        vipOnly
        featured
        category
        eventImage {
          url
          filename
        }
        profilesAttending
      }
    }
  `,

  getConversations: `
    query GetConversations {
      conversations {
        id
        name
        avatarInitial
        lastMessagePreview
        lastMessageTime
        onlineStatus
        unreadCount
        participantProfile
        chatMessages
      }
    }
  `,

  getRecentConversations: `
    query GetRecentConversations($limit: Int!) {
      recentConversations(limit: $limit) {
        id
        name
        avatarInitial
        lastMessagePreview
        lastMessageTime
        onlineStatus
        unreadCount
        participantProfile
        chatMessages
      }
    }
  `,

  getConversation: `
    query GetConversation($id: ID!) {
      conversation(id: $id) {
        id
        name
        avatarInitial
        lastMessagePreview
        lastMessageTime
        onlineStatus
        unreadCount
        participantProfile
        chatMessages
      }
    }
  `,

  getMessagesByConversation: `
    query GetMessagesByConversation($conversationId: ID!) {
      messagesByConversation(conversationId: $conversationId) {
        id
        text
        timeSent
        read
        senderRole
        senderProfile
        conversation
        sentimentAI
        personMentionedAI
        attachments {
          url
          filename
          type
        }
      }
    }
  `,

  getChatMessages: `
    query GetChatMessages {
      chatMessages {
        id
        text
        timeSent
        read
        senderRole
        senderProfile
        conversation
        sentimentAI
        personMentionedAI
        attachments {
          url
          filename
          type
        }
      }
    }
  `,

  getNotifications: `
    query GetNotifications {
      notifications {
        id
        name
        type
        icon
        preview
        action
        timeDisplayAgo
        timestamp
        avatarInitial
        unread
        relatedUserProfile
        priorityScoreAI
      }
    }
  `,

  getUnreadNotifications: `
    query GetUnreadNotifications {
      unreadNotifications {
        id
        name
        type
        icon
        preview
        action
        timeDisplayAgo
        timestamp
        avatarInitial
        unread
        relatedUserProfile
        priorityScoreAI
      }
    }
  `,

  getUnreadNotificationCount: `
    query GetUnreadNotificationCount {
      unreadNotificationCount
    }
  `,

  getNotification: `
    query GetNotification($id: ID!) {
      notification(id: $id) {
        id
        name
        type
        icon
        preview
        action
        timeDisplayAgo
        timestamp
        avatarInitial
        unread
        relatedUserProfile
        priorityScoreAI
      }
    }
  `,

  me: `
    query Me {
      me {
        id
        email
        username
        role
        status
        createdAt
      }
    }
  `,
};

export const mutations = {
  register: `
    mutation Register($registerInput: RegisterInput!) {
      register(registerInput: $registerInput) {
        accessToken
        user {
          id
          email
          username
          role
          status
          createdAt
        }
      }
    }
  `,

  login: `
    mutation Login($loginInput: LoginInput!) {
      login(loginInput: $loginInput) {
        accessToken
        user {
          id
          email
          username
          role
          status
          createdAt
        }
      }
    }
  `,

  createUser: `
    mutation CreateUser($createUserInput: CreateUserInput!) {
      createUser(createUserInput: $createUserInput) {
        id
        email
        username
        role
        status
        createdAt
      }
    }
  `,

  updateUser: `
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
      updateUser(updateUserInput: $updateUserInput) {
        id
        email
        username
        role
        status
        createdAt
      }
    }
  `,

  createProfile: `
    mutation CreateProfile($createProfileInput: CreateProfileInput!) {
      createProfile(createProfileInput: $createProfileInput) {
        id
        username
        email
        name
        displayName
        bio
        city
        location
        interests
        isPublic
        website
      }
    }
  `,

  updateProfile: `
    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {
      updateProfile(updateProfileInput: $updateProfileInput) {
        id
        username
        email
        name
        displayName
        bio
        city
        location
        interests
        isPublic
        website
      }
    }
  `,

  createEvent: `
    mutation CreateEvent($createEventInput: CreateEventInput!) {
      createEvent(createEventInput: $createEventInput) {
        id
        title
        description
        date
        time
        location
        maxAttendees
        attendees
        price
        vipOnly
        featured
        category
      }
    }
  `,

  updateEvent: `
    mutation UpdateEvent($updateEventInput: UpdateEventInput!) {
      updateEvent(updateEventInput: $updateEventInput) {
        id
        title
        description
        date
        time
        location
        maxAttendees
        attendees
        price
        vipOnly
        featured
        category
      }
    }
  `,

  createConversation: `
    mutation CreateConversation($createConversationInput: CreateConversationInput!) {
      createConversation(createConversationInput: $createConversationInput) {
        id
        name
        avatarInitial
        lastMessagePreview
        lastMessageTime
        onlineStatus
        unreadCount
      }
    }
  `,

  updateConversation: `
    mutation UpdateConversation($updateConversationInput: UpdateConversationInput!) {
      updateConversation(updateConversationInput: $updateConversationInput) {
        id
        name
        avatarInitial
        lastMessagePreview
        lastMessageTime
        onlineStatus
        unreadCount
      }
    }
  `,

  markConversationAsRead: `
    mutation MarkConversationAsRead($id: ID!) {
      markConversationAsRead(id: $id) {
        id
        unreadCount
      }
    }
  `,

  createChatMessage: `
    mutation CreateChatMessage($createChatMessageInput: CreateChatMessageInput!) {
      createChatMessage(createChatMessageInput: $createChatMessageInput) {
        id
        text
        timeSent
        read
        senderRole
        senderProfile
        conversation
      }
    }
  `,

  updateChatMessage: `
    mutation UpdateChatMessage($updateChatMessageInput: UpdateChatMessageInput!) {
      updateChatMessage(updateChatMessageInput: $updateChatMessageInput) {
        id
        text
        timeSent
        read
        senderRole
        senderProfile
        conversation
      }
    }
  `,

  markMessageAsRead: `
    mutation MarkMessageAsRead($id: ID!) {
      markMessageAsRead(id: $id) {
        id
        read
      }
    }
  `,

  createNotification: `
    mutation CreateNotification($createNotificationInput: CreateNotificationInput!) {
      createNotification(createNotificationInput: $createNotificationInput) {
        id
        name
        type
        icon
        preview
        action
        timeDisplayAgo
        timestamp
        avatarInitial
        unread
      }
    }
  `,

  updateNotification: `
    mutation UpdateNotification($updateNotificationInput: UpdateNotificationInput!) {
      updateNotification(updateNotificationInput: $updateNotificationInput) {
        id
        name
        type
        icon
        preview
        action
        timeDisplayAgo
        timestamp
        avatarInitial
        unread
      }
    }
  `,

  markNotificationAsRead: `
    mutation MarkNotificationAsRead($id: ID!) {
      markNotificationAsRead(id: $id) {
        id
        unread
      }
    }
  `,
};
