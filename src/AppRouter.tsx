import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { Page } from './components/Page';
import { MeetingsPage } from './pages/MeetingsPage';
import { LinksDocsPage } from './pages/LinksDocsPage';
import { CommitteesPage } from './pages/CommitteesPage';
import { MailingListsPage } from './pages/MailingListsPage';
import { VotesPollsPage } from './pages/VotesPollsPage';
import { PermissionsPage } from './pages/PermissionsPage';
export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Redirect root to meetings page */}
          <Route path="/" element={<Navigate to="/kubernetes/meetings" replace />} />
          {/* Kubernetes routes */}
          <Route path="kubernetes/insights" element={<Page title="Kubernetes Insights" />} />
          <Route path="kubernetes/marketing" element={<Page title="Kubernetes Marketing" />} />
          <Route path="kubernetes/meetings" element={<MeetingsPage />} />
          <Route path="kubernetes/mailing-lists" element={<MailingListsPage />} />
          <Route path="kubernetes/votes-polls" element={<VotesPollsPage />} />
          <Route path="kubernetes/links-docs" element={<LinksDocsPage />} />
          <Route path="kubernetes/committees" element={<CommitteesPage />} />
          <Route path="kubernetes/permissions" element={<PermissionsPage />} />
          {/* PyTorch routes */}
          <Route path="pytorch/insights" element={<Page title="PyTorch Insights" />} />
          <Route path="pytorch/marketing" element={<Page title="PyTorch Marketing" />} />
          <Route path="pytorch/meetings" element={<Page title="PyTorch Meetings" />} />
          <Route path="pytorch/mailing-lists" element={<Page title="PyTorch Mailing Lists" />} />
          <Route path="pytorch/votes-polls" element={<Page title="PyTorch Votes & Polls" />} />
          <Route path="pytorch/links-docs" element={<Page title="PyTorch Links & Docs" />} />
          <Route path="pytorch/committees" element={<Page title="PyTorch Committees" />} />
          <Route path="pytorch/permissions" element={<PermissionsPage />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/kubernetes/meetings" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>;
}