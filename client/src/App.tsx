import { Switch, Route, Redirect } from "wouter";
import { useAuth } from "./shared/hooks/useAuth";
import { MainLayout } from "./shared/layout/MainLayout";

import LandingPage from "./features/landing/LandingPage";
import AuthPage from "./features/auth/AuthPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import MembersPage from "./features/members/MembersPage";
import EventsPage from "./features/events/EventsPage";
import MessagesPage from "./features/messages/MessagesPage";
import NotificationsPage from "./features/notifications/NotificationsPage";
import ProfilePage from "./features/profile/ProfilePage";
import SettingsPage from "./features/settings/SettingsPage";
import AdsListPage from "./features/ads/AdsListPage";
import AdDetailPage from "./features/ads/AdDetailPage";
import CreateAdPage from "./features/ads/CreateAdPage";
import MyAdsPage from "./features/ads/MyAdsPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/auth" />;
  }

  return <MainLayout>{children}</MainLayout>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Switch>
      <Route path="/">
        <PublicRoute>
          <LandingPage />
        </PublicRoute>
      </Route>

      <Route path="/auth">
        <PublicRoute>
          <AuthPage />
        </PublicRoute>
      </Route>

      <Route path="/dashboard">
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </Route>

      <Route path="/members">
        <ProtectedRoute>
          <MembersPage />
        </ProtectedRoute>
      </Route>

      <Route path="/events">
        <ProtectedRoute>
          <EventsPage />
        </ProtectedRoute>
      </Route>

      <Route path="/messages/:conversationId?">
        <ProtectedRoute>
          <MessagesPage />
        </ProtectedRoute>
      </Route>

      <Route path="/notifications">
        <ProtectedRoute>
          <NotificationsPage />
        </ProtectedRoute>
      </Route>

      <Route path="/profile/:id?">
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      </Route>

      <Route path="/settings">
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      </Route>

      <Route path="/ads">
        <ProtectedRoute>
          <AdsListPage />
        </ProtectedRoute>
      </Route>

      <Route path="/ads/new">
        <ProtectedRoute>
          <CreateAdPage />
        </ProtectedRoute>
      </Route>

      <Route path="/ads/:id">
        <ProtectedRoute>
          <AdDetailPage />
        </ProtectedRoute>
      </Route>

      <Route path="/my-ads">
        <ProtectedRoute>
          <MyAdsPage />
        </ProtectedRoute>
      </Route>

      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
