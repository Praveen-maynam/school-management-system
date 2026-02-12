import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LibraryDashBoard from '../screens/non-teaching-staff/library-tools/LibraryDashBoard';
import BookIssueReturnScreen from '../screens/non-teaching-staff/library-tools/BookIssueReturnScreen';
import FineCollectionScreen from '../screens/non-teaching-staff/library-tools/FineCollectionScreen';
import BookSearchScreen from '../screens/non-teaching-staff/library-tools/BookSearchScreen';
import InventoryManagementScreen from '../screens/non-teaching-staff/library-tools/InventoryManagementScreen';
import AddBook from '../screens/non-teaching-staff/library-tools/AddBook';
const LibraryManagerRoute = () => (
  <Routes>
    <Route path="dashboard" element={<LibraryDashBoard />} />
    <Route path="book-issue-return" element={<BookIssueReturnScreen />} />
    <Route path="fine-collection" element={<FineCollectionScreen />} />
    <Route path="book-search" element={<BookSearchScreen />} />
    <Route path="inventory-management" element={<InventoryManagementScreen />} />
    <Route path="add-book" element={<AddBook />} />
  </Routes>
);

export default LibraryManagerRoute;
